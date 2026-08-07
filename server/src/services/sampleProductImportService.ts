import fs from "fs";
import path from "path";
import crypto from "crypto";
import { parse } from "csv-parse";
import MongooseRepository from "../database/repositories/mongooseRepository";
import ProductCategoryRepository from "../database/repositories/productCategoryRepository";
import AuditLogRepository from "../database/repositories/auditLogRepository";
import SampleProductImportRun from "../database/models/sampleProductImportRun";
import {
  TARGET_CATEGORIES,
  classifyUkDataRow,
  classifyFashionRow,
  classifyClothingRow,
} from "./fashionCategoryClassifier";

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
const UK_DATA_CSV = path.join(DATA_DIR, "UK_data.csv");
const PERFUME_CSV = path.join(DATA_DIR, "perfume.csv");
const CLOTHING_CSV = path.join(DATA_DIR, "clothing.csv");

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

// perfume.csv/clothing.csv have no natural per-row id (unlike fashion.csv's
// ProductId or UK_data.csv's asin), so the title is hashed to build a stable
// dedupe key instead - the same title always resolves to the same
// importHash across runs.
function hashTitle(title) {
  return crypto.createHash("sha1").update(title).digest("hex").slice(0, 16);
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
// Colour,Usage,ProductTitle,Image,ImageURL - Gender (Men/Women/Boys/Girls)
// and Category (Apparel/Footwear) map directly onto one of the 11 target
// fashion categories; rows that don't resolve to one are skipped.
async function mapFashionRow(record, ctx) {
  const title = (record.ProductTitle || "").toString().trim();

  if (!title) {
    return null;
  }

  const targetCategory = classifyFashionRow(record.Gender, record.Category);

  if (!targetCategory) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve(targetCategory);
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

// UK_data.csv columns: asin,title,imgUrl,productURL,stars,reviews,price,
// isBestSeller,boughtInLastMonth,categoryName - the dataset's own
// categoryName is Amazon's full general-merchandise taxonomy (electronics,
// home, garden, etc), so each row is classified from its title text down to
// one of the 11 target fashion categories; rows that don't belong to any of
// them (electronics, home goods, generic "Sports & Outdoors" gear, etc) are
// skipped rather than imported.
async function mapUkDataRow(record, ctx) {
  const title = (record.title || "").toString().trim();

  if (!title) {
    return null;
  }

  const targetCategory = classifyUkDataRow(title, record.categoryName || null);

  if (!targetCategory) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve(targetCategory);
  const price = toPositiveNumber(record.price) || randomPrice();

  return {
    title: title.slice(0, 500),
    description: "",
    image: toHttpUrl(record.imgUrl),
    importHash: `import:uk-data-csv:${record.asin}`,
    ...baseFields(ctx, price, categoryId),
  };
}

// perfume.csv columns: title,description,imageUrl,price - fragrances map
// onto "Global Purchase", the same category UK_data.csv's own "Fragrances"
// rows resolve to (see classifyUkDataRow), so perfumes get their own visible
// bucket instead of being buried in the much larger Lifestyle category.
async function mapPerfumeRow(record, ctx) {
  const title = (record.title || "").toString().trim();

  if (!title) {
    return null;
  }

  const categoryId = await ctx.categoryResolver.resolve("Global Purchase");
  const price = toPositiveNumber(record.price) || randomPrice();

  return {
    title: title.slice(0, 500),
    description: (record.description || "").toString().trim().slice(0, 2000),
    image: toHttpUrl(record.imageUrl),
    importHash: `import:perfume-csv:${hashTitle(title)}`,
    ...baseFields(ctx, price, categoryId),
  };
}

// clothing.csv columns: title,description,imageUrl,price - the file has no
// separate gender column, so classifyClothingRow scans the title itself and
// resolves to one of the existing Women Clothing/Men Clothing/Lifestyle
// categories (never a new one).
async function mapClothingRow(record, ctx) {
  const title = (record.title || "").toString().trim();

  if (!title) {
    return null;
  }

  const targetCategory = classifyClothingRow(title);
  const categoryId = await ctx.categoryResolver.resolve(targetCategory);
  const price = toPositiveNumber(record.price) || randomPrice();

  return {
    title: title.slice(0, 500),
    description: (record.description || "").toString().trim().slice(0, 2000),
    image: toHttpUrl(record.imageUrl),
    importHash: `import:clothing-csv:${hashTitle(title)}`,
    ...baseFields(ctx, price, categoryId),
  };
}

class SampleProductImportService {
  static async run(options) {
    if (!fs.existsSync(DATA_DIR)) {
      throw new Error(
        `Sample product data directory not found at ${DATA_DIR}. Set the SAMPLE_PRODUCTS_DATA_DIR environment variable, or place fashion.csv and UK_data.csv there.`
      );
    }

    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const Product = options.database.model("product");
    const categoryResolver = new CategoryResolver(options);
    const ctx = { categoryResolver, currentTenant, currentUser };

    // Ensure all 11 target categories exist up front, even ones no row ends
    // up mapping to (e.g. "Global Purchase" has no matching source data) -
    // so the storefront always has the full fixed category list to show.
    for (const name of TARGET_CATEGORIES) {
      await categoryResolver.resolve(name);
    }

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

    if (fs.existsSync(PERFUME_CSV)) {
      const { created, skipped } = await importCsvFile(
        PERFUME_CSV,
        Product,
        (record) => mapPerfumeRow(record, ctx)
      );
      productsCreated += created;
      productsSkipped += skipped;
      datasetSummaries.push({ dataset: "perfume.csv", imported: created });
    }

    if (fs.existsSync(CLOTHING_CSV)) {
      const { created, skipped } = await importCsvFile(
        CLOTHING_CSV,
        Product,
        (record) => mapClothingRow(record, ctx)
      );
      productsCreated += created;
      productsSkipped += skipped;
      datasetSummaries.push({ dataset: "clothing.csv", imported: created });
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
