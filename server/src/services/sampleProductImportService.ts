import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import XLSX from "xlsx";
import MongooseRepository from "../database/repositories/mongooseRepository";
import ProductCategoryRepository from "../database/repositories/productCategoryRepository";
import AuditLogRepository from "../database/repositories/auditLogRepository";

// Sample product data now ships as static files in the admin app instead of
// being fetched from Hugging Face / DummyJSON / Fake Store on every import.
// Defaults to the sibling admin/public/data folder in this monorepo checkout;
// override with SAMPLE_PRODUCTS_DATA_DIR if admin and server are deployed
// separately.
const DEFAULT_DATA_DIR = path.resolve(
  __dirname,
  "../../../admin/public/data"
);
const DATA_DIR = process.env.SAMPLE_PRODUCTS_DATA_DIR || DEFAULT_DATA_DIR;

const FASHION_CSV = path.join(DATA_DIR, "fashion.csv");
const LAPTOPS_XLSX = path.join(DATA_DIR, "Laptops.xlsx");
const UK_DATA_CSV = path.join(DATA_DIR, "UK_data.csv");

const BATCH_SIZE = 500;
// UK_data.csv is ~2.2M rows - bigger batches keep the round trips to Mongo
// down for a file this size.
const LARGE_BATCH_SIZE = 1000;

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

async function importCsvFile(filePath, Product, mapRow, batchSize = BATCH_SIZE) {
  let created = 0;
  let skipped = 0;
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
  // UK_data.csv is large enough (~2.2M rows) that importing it can take
  // longer than an HTTP request/reverse-proxy is willing to wait, so it
  // runs in the background after the response is sent. This guards against
  // starting a second run for the same tenant while one is still going.
  static runningTenants = new Set<string>();

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
      const tenantKey = String(currentTenant.id);

      if (SampleProductImportService.runningTenants.has(tenantKey)) {
        backgroundImport = { dataset: "UK_data.csv", status: "already-running" };
      } else {
        SampleProductImportService.runningTenants.add(tenantKey);
        backgroundImport = { dataset: "UK_data.csv", status: "started" };

        importCsvFile(
          UK_DATA_CSV,
          Product,
          (record) => mapUkDataRow(record, ctx),
          LARGE_BATCH_SIZE
        )
          .then(({ created, skipped }) =>
            AuditLogRepository.log(
              {
                entityName: "product",
                entityId: "sample-data-import",
                action: AuditLogRepository.CREATE,
                values: {
                  source: "sample-data-import",
                  dataset: "UK_data.csv",
                  productsCreated: created,
                  productsSkipped: skipped,
                },
              },
              options
            )
          )
          .catch((error) => {
            console.error(
              "sampleProductImportService: UK_data.csv background import failed",
              error
            );
          })
          .finally(() => {
            SampleProductImportService.runningTenants.delete(tenantKey);
          });
      }
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
}

export default SampleProductImportService;
