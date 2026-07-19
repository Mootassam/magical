import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import XLSX from "xlsx";
import MongooseRepository from "../database/repositories/mongooseRepository";
import ProductCategoryRepository from "../database/repositories/productCategoryRepository";
import AuditLogRepository from "../database/repositories/auditLogRepository";
import SampleProductImportRun from "../database/models/sampleProductImportRun";

// Sample product data ships as static files read straight off the server's
// own disk instead of being fetched from Hugging Face / DummyJSON / Fake
// Store on every import (and instead of living under admin/public/data,
// which used to get bundled into every admin build - these files are
// hundreds of MB and are never served to the browser). Defaults to this
// sibling server/data folder; override with SAMPLE_PRODUCTS_DATA_DIR if the
// files live elsewhere on the deployed server.
const DEFAULT_DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_DIR = process.env.SAMPLE_PRODUCTS_DATA_DIR || DEFAULT_DATA_DIR;

const FASHION_CSV = path.join(DATA_DIR, "fashion.csv");
const LAPTOPS_XLSX = path.join(DATA_DIR, "Laptops.xlsx");
const UK_DATA_CSV = path.join(DATA_DIR, "UK_data.csv");

const BATCH_SIZE = 500;
// UK_data.csv is ~2.2M rows - bigger batches keep the round trips to Mongo
// down for a file this size.
const LARGE_BATCH_SIZE = 1000;
const UK_DATA_DATASET = "UK_data.csv";
// If a "running" import hasn't updated its progress in this long, it almost
// certainly died with the process (e.g. a dev-server restart) rather than
// still being genuinely in flight - safe to treat as resumable.
const STALE_RUN_MS = 3 * 60 * 1000;

function capitalize(value) {
  if (!value) {
    return value;
  }

  return value
    .toString()
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function randomPrice() {
  return Math.round((10 + Math.random() * 490) * 100) / 100;
}

function toPositiveNumber(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0
    ? Math.round(parsed * 100) / 100
    : null;
}

function toHttpUrl(value) {
  return value && value.toString().startsWith("http")
    ? value.toString()
    : undefined;
}

// Resolves a raw category label (e.g. a CSV "Gender"/"categoryName" value)
// to a productCategory id, creating the category the first time it's seen
// and reusing an in-memory cache for the rest of the run.
class CategoryResolver {
  private options: any;
  private cache = new Map<string, any>();
  created = 0;

  constructor(options) {
    this.options = options;
  }

  async resolve(rawName) {
    const name = capitalize(rawName) || "General";
    const key = name.toLowerCase();

    let id = this.cache.get(key);

    if (!id) {
      const { record, created } =
        await ProductCategoryRepository.findOrCreateByName(
          name,
          this.options
        );
      id = record.id || record._id;
      this.cache.set(key, id);

      if (created) {
        this.created += 1;
      }
    }

    return id;
  }
}

async function insertBatch(Product, docs) {
  if (!docs.length) {
    return { created: 0, skipped: 0 };
  }

  try {
    const inserted = await Product.insertMany(docs, { ordered: false });
    return { created: inserted.length, skipped: 0 };
  } catch (error) {
    const writeErrors = error.writeErrors || [];
    const duplicates = writeErrors.filter(
      (writeError) =>
        writeError.code === 11000 ||
        (writeError.err && writeError.err.code === 11000)
    ).length;
    const otherFailures = writeErrors.length - duplicates;

    if (otherFailures > 0) {
      console.error(
        `sampleProductImportService: ${otherFailures} row(s) in a batch failed for non-duplicate reasons`,
        writeErrors.find(
          (writeError) =>
            writeError.code !== 11000 &&
            !(writeError.err && writeError.err.code === 11000)
        )
      );
    }

    const created = Array.isArray(error.insertedDocs)
      ? error.insertedDocs.length
      : docs.length - writeErrors.length;

    return { created, skipped: duplicates };
  }
}

async function importCsvFile(
  filePath,
  Product,
  mapRow,
  {
    batchSize = BATCH_SIZE,
    skipRows = 0,
    onProgress,
  }: { batchSize?: number; skipRows?: number; onProgress?: (progress: {
    rowsProcessed: number;
    created: number;
    skipped: number;
  }) => void | Promise<void> } = {}
) {
  let created = 0;
  let skipped = 0;
  let rowsProcessed = 0;
  let batch: any[] = [];

  const parser = fs
    .createReadStream(filePath)
    .pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        bom: true,
        relax_column_count: true,
      })
    );

  for await (const record of parser) {
    rowsProcessed += 1;

    // Resuming a previously-interrupted run: fast-forward past rows already
    // accounted for (already inserted or already counted as skipped) rather
    // than re-attempting them.
    if (rowsProcessed <= skipRows) {
      continue;
    }

    let doc;

    try {
      doc = await mapRow(record);
    } catch (error) {
      continue;
    }

    if (!doc) {
      continue;
    }

    batch.push(doc);

    if (batch.length >= batchSize) {
      const result = await insertBatch(Product, batch);
      created += result.created;
      skipped += result.skipped;
      batch = [];

      if (onProgress) {
        await onProgress({ rowsProcessed, created, skipped });
      }
    }
  }

  if (batch.length) {
    const result = await insertBatch(Product, batch);
    created += result.created;
    skipped += result.skipped;
  }

  if (onProgress) {
    await onProgress({ rowsProcessed, created, skipped });
  }

  return { created, skipped, rowsProcessed };
}

async function importXlsxFile(filePath, Product, mapRow, batchSize = BATCH_SIZE) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

  let created = 0;
  let skipped = 0;
  let batch: any[] = [];

  for (const record of rows) {
    let doc;

    try {
      doc = await mapRow(record);
    } catch (error) {
      continue;
    }

    if (!doc) {
      continue;
    }

    batch.push(doc);

    if (batch.length >= batchSize) {
      const result = await insertBatch(Product, batch);
      created += result.created;
      skipped += result.skipped;
      batch = [];
    }
  }

  if (batch.length) {
    const result = await insertBatch(Product, batch);
    created += result.created;
    skipped += result.skipped;
  }

  return { created, skipped };
}

function baseFields(ctx, price, categoryId) {
  return {
    price,
    amount: String(price),
    category: categoryId,
    type: "normal",
    tenant: ctx.currentTenant.id,
    createdBy: ctx.currentUser.id,
    updatedBy: ctx.currentUser.id,
  };
}

// fashion.csv columns: ProductId,Gender,Category,SubCategory,ProductType,
// Colour,Usage,ProductTitle,Image,ImageURL - categorized by Gender
// (Men/Women/Boys/Girls) as requested.
async function mapFashionRow(record, ctx) {
  const title = (record.ProductTitle || "").toString().trim();

  if (!title) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve(record.Gender);
  const description = [record.ProductType, record.Colour, record.Usage]
    .filter(Boolean)
    .join(" - ");
  const price = randomPrice();

  return {
    title: title.slice(0, 500),
    description: description.slice(0, 2000),
    image: toHttpUrl(record.ImageURL),
    importHash: `import:fashion-csv:${record.ProductId}`,
    ...baseFields(ctx, price, categoryId),
  };
}

// Laptops.xlsx columns: Product Name,ProductID,Product image,Actual price,
// Discount price,Stars,Rating,Reviews,Description,Link - single "Laptops"
// category, priced from the discount (falling back to the list price).
async function mapLaptopRow(record, ctx) {
  const title = (record["Product Name"] || "").toString().trim();

  if (!title) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve("Laptops");
  const price =
    toPositiveNumber(record["Discount price"]) ||
    toPositiveNumber(record["Actual price"]) ||
    randomPrice();

  return {
    title: title.slice(0, 500),
    description: (record["Description"] || "").toString().slice(0, 2000),
    image: toHttpUrl(record["Product image"]),
    importHash: `import:laptops-xlsx:${record.ProductID}`,
    ...baseFields(ctx, price, categoryId),
  };
}

// UK_data.csv columns: asin,title,imgUrl,productURL,stars,reviews,price,
// isBestSeller,boughtInLastMonth,categoryName - categorized directly by the
// dataset's own categoryName column (e.g. "Hi-Fi Speakers").
async function mapUkDataRow(record, ctx) {
  const title = (record.title || "").toString().trim();

  if (!title) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve(record.categoryName);
  const price = toPositiveNumber(record.price) || randomPrice();

  return {
    title: title.slice(0, 500),
    description: "",
    image: toHttpUrl(record.imgUrl),
    importHash: `import:uk-data-csv:${record.asin}`,
    ...baseFields(ctx, price, categoryId),
  };
}

class SampleProductImportService {
  static async run(options) {
    if (!fs.existsSync(DATA_DIR)) {
      throw new Error(
        `Sample product data directory not found at ${DATA_DIR}. Set the SAMPLE_PRODUCTS_DATA_DIR environment variable, or place fashion.csv, Laptops.xlsx and UK_data.csv there.`
      );
    }

    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const Product = options.database.model("product");
    const categoryResolver = new CategoryResolver(options);
    const ctx = { categoryResolver, currentTenant, currentUser };

    const datasetSummaries: any[] = [];
    let productsCreated = 0;
    let productsSkipped = 0;

    if (fs.existsSync(FASHION_CSV)) {
      const { created, skipped } = await importCsvFile(
        FASHION_CSV,
        Product,
        (record) => mapFashionRow(record, ctx)
      );
      productsCreated += created;
      productsSkipped += skipped;
      datasetSummaries.push({ dataset: "fashion.csv", imported: created });
    }

    if (fs.existsSync(LAPTOPS_XLSX)) {
      const { created, skipped } = await importXlsxFile(
        LAPTOPS_XLSX,
        Product,
        (record) => mapLaptopRow(record, ctx)
      );
      productsCreated += created;
      productsSkipped += skipped;
      datasetSummaries.push({ dataset: "Laptops.xlsx", imported: created });
    }

    let backgroundImport: any = null;

    if (fs.existsSync(UK_DATA_CSV)) {
      backgroundImport = await SampleProductImportService._startOrResumeUkDataImport(
        Product,
        ctx,
        options
      );
    }

    await AuditLogRepository.log(
      {
        entityName: "product",
        entityId: "sample-data-import",
        action: AuditLogRepository.CREATE,
        values: {
          source: "sample-data-import",
          categoriesCreated: categoryResolver.created,
          productsCreated,
          productsSkipped,
          datasets: datasetSummaries,
          backgroundImport,
        },
      },
      options
    );

    return {
      categoriesCreated: categoryResolver.created,
      productsCreated,
      productsSkipped,
      datasets: datasetSummaries,
      backgroundImport,
    };
  }

  // UK_data.csv (~2.2M rows) runs in the background after the response is
  // sent, since it takes far longer than an HTTP request/reverse-proxy is
  // willing to wait. Progress is persisted to the database (not kept only
  // in memory) so that if the server process dies mid-import - a dev-server
  // restart, a deploy, a crash - the next click on "Import" resumes from
  // where it left off instead of silently having imported an incomplete
  // dataset with no record of it.
  static async _startOrResumeUkDataImport(Product, ctx, options) {
    const database = options.database;
    const tenantId = ctx.currentTenant.id;

    const existing = await SampleProductImportRun(database).findOne({
      tenant: tenantId,
      dataset: UK_DATA_DATASET,
    });

    if (existing && existing.status === "running") {
      const isStale =
        Date.now() - new Date(existing.updatedAt).getTime() > STALE_RUN_MS;

      if (!isStale) {
        return {
          dataset: UK_DATA_DATASET,
          status: "already-running",
          rowsProcessed: existing.rowsProcessed,
        };
      }
      // Otherwise the previous "running" record is stale (its process died
      // without ever marking it failed/completed) - fall through and
      // resume it below.
    }

    if (existing && existing.status === "completed") {
      return {
        dataset: UK_DATA_DATASET,
        status: "already-completed",
        rowsProcessed: existing.rowsProcessed,
        productsCreated: existing.productsCreated,
      };
    }

    const skipRows = existing ? existing.rowsProcessed : 0;
    const baseCreated = existing ? existing.productsCreated : 0;
    const baseSkipped = existing ? existing.productsSkipped : 0;
    const resuming = Boolean(existing);

    const run = await SampleProductImportRun(database).findOneAndUpdate(
      { tenant: tenantId, dataset: UK_DATA_DATASET },
      {
        $set: {
          status: "running",
          errorMessage: null,
          startedAt: existing?.startedAt || new Date(),
        },
        $setOnInsert: {
          rowsProcessed: 0,
          productsCreated: 0,
          productsSkipped: 0,
        },
      },
      { upsert: true, new: true }
    );

    const runId = run._id;

    importCsvFile(UK_DATA_CSV, Product, (record) => mapUkDataRow(record, ctx), {
      batchSize: LARGE_BATCH_SIZE,
      skipRows,
      onProgress: async ({ rowsProcessed, created, skipped }) => {
        await SampleProductImportRun(database)
          .updateOne(
            { _id: runId },
            {
              $set: {
                rowsProcessed,
                productsCreated: baseCreated + created,
                productsSkipped: baseSkipped + skipped,
              },
            }
          )
          .catch(() => {});
      },
    })
      .then(async ({ created, skipped, rowsProcessed }) => {
        const finalCreated = baseCreated + created;
        const finalSkipped = baseSkipped + skipped;

        await SampleProductImportRun(database).updateOne(
          { _id: runId },
          {
            $set: {
              status: "completed",
              rowsProcessed,
              productsCreated: finalCreated,
              productsSkipped: finalSkipped,
              finishedAt: new Date(),
            },
          }
        );

        await AuditLogRepository.log(
          {
            entityName: "product",
            entityId: "sample-data-import",
            action: AuditLogRepository.CREATE,
            values: {
              source: "sample-data-import",
              dataset: UK_DATA_DATASET,
              productsCreated: finalCreated,
              productsSkipped: finalSkipped,
            },
          },
          options
        );
      })
      .catch(async (error) => {
        console.error(
          "sampleProductImportService: UK_data.csv background import failed",
          error
        );

        await SampleProductImportRun(database)
          .updateOne(
            { _id: runId },
            {
              $set: {
                status: "failed",
                errorMessage: String(error?.message || error).slice(0, 500),
              },
            }
          )
          .catch(() => {});
      });

    return {
      dataset: UK_DATA_DATASET,
      status: resuming ? "resumed" : "started",
      rowsProcessed: skipRows,
    };
  }

  // Lets the admin UI poll for live progress on the UK_data.csv background
  // import instead of only ever seeing a one-time "started" toast.
  static async getStatus(options) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const run = await SampleProductImportRun(options.database).findOne({
      tenant: currentTenant.id,
      dataset: UK_DATA_DATASET,
    });

    if (!run) {
      return { dataset: UK_DATA_DATASET, status: "not-started" };
    }

    return {
      dataset: UK_DATA_DATASET,
      status: run.status,
      rowsProcessed: run.rowsProcessed,
      productsCreated: run.productsCreated,
      productsSkipped: run.productsSkipped,
      errorMessage: run.errorMessage,
      startedAt: run.startedAt,
      finishedAt: run.finishedAt,
      updatedAt: run.updatedAt,
    };
  }
}

export default SampleProductImportService;
