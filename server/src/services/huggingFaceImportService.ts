import axios from "axios";
import MongooseRepository from "../database/repositories/mongooseRepository";
import ProductCategoryRepository from "../database/repositories/productCategoryRepository";
import AuditLogRepository from "../database/repositories/auditLogRepository";

const DATASETS_SERVER = "https://datasets-server.huggingface.co";

// Number of stratified sample points taken across each Hugging Face
// dataset's full row range, and how many rows are pulled from each sample
// point. This keeps requests spread across the whole dataset (most of
// these HF datasets are stored sorted/grouped by source category) so a
// single import run picks up a wide spread of categories instead of only
// the first N consecutive rows.
const OFFSETS_PER_DATASET = 8;
const ROWS_PER_OFFSET = 20;
const HTTP_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Public dataset APIs (Hugging Face's datasets-server in particular)
// occasionally throw transient 5xx/network errors - retry those with
// backoff, but fail fast on 4xx (bad dataset id, gated dataset, etc.)
// since retrying won't help.
async function fetchWithRetry(url) {
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await axios.get(url, { timeout: HTTP_TIMEOUT_MS });
    } catch (error) {
      lastError = error;

      const status = error.response?.status;
      const isRetryable = !status || status >= 500;

      if (!isRetryable || attempt === MAX_RETRIES - 1) {
        throw error;
      }

      await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
    }
  }

  throw lastError;
}

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

function extractMyntraCategory(description) {
  if (!description) {
    return null;
  }

  const words = description.trim().split(/\s+/);
  // Dataset rows follow "{gender} {masterCategory} {subCategory} {articleType} ..."
  return words[2] || words[1] || null;
}

function parseJsonArraySafely(value) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function buildOffsets(totalRows) {
  const offsets: number[] = [];
  const maxOffset = Math.max(totalRows - ROWS_PER_OFFSET, 0);
  const step = Math.floor(maxOffset / OFFSETS_PER_DATASET) || 1;

  for (let i = 0; i < OFFSETS_PER_DATASET; i++) {
    const offset = Math.min(i * step, maxOffset);
    offsets.push(offset);
  }

  return Array.from(new Set(offsets));
}

async function fetchHuggingFaceDatasetSize(id) {
  const url = `${DATASETS_SERVER}/size?dataset=${encodeURIComponent(id)}`;

  const response = await fetchWithRetry(url);
  const numRows =
    response?.data?.size?.splits?.[0]?.num_rows ||
    response?.data?.size?.dataset?.num_rows;

  if (!numRows) {
    throw new Error(`Could not determine size of dataset ${id}`);
  }

  return numRows;
}

async function fetchHuggingFaceRows({ id, config, split }) {
  const totalRows = await fetchHuggingFaceDatasetSize(id);
  const offsets = buildOffsets(totalRows);
  const results = [];

  for (const offset of offsets) {
    try {
      const url =
        `${DATASETS_SERVER}/rows?dataset=${encodeURIComponent(id)}` +
        `&config=${encodeURIComponent(config)}` +
        `&split=${encodeURIComponent(split)}` +
        `&offset=${offset}&length=${ROWS_PER_OFFSET}`;

      const response = await fetchWithRetry(url);
      const rows = response?.data?.rows || [];
      results.push(...rows.map((entry) => entry.row));
    } catch (error) {
      // Skip this offset, keep collecting from the others.
      continue;
    }
  }

  return results;
}

// DummyJSON and Fake Store API are dedicated e-commerce sample-data APIs
// (no auth, no rate limiting, stable schemas) - a much more reliable
// fallback than Hugging Face's dataset-viewer backend, which is prone to
// outages independent of anything in this codebase.
async function fetchDummyJsonProducts() {
  const response = await fetchWithRetry(
    "https://dummyjson.com/products?limit=0"
  );

  return response?.data?.products || [];
}

async function fetchFakeStoreProducts() {
  const response = await fetchWithRetry("https://fakestoreapi.com/products");

  return Array.isArray(response?.data) ? response.data : [];
}

const DATASETS = [
  {
    id: "milistu/AMAZON-Products-2023",
    fetch: () =>
      fetchHuggingFaceRows({
        id: "milistu/AMAZON-Products-2023",
        config: "default",
        split: "train",
      }),
    map: (row) => ({
      key: row.parent_asin || row.title,
      title: row.title,
      description: row.description,
      price: row.price,
      image: row.image,
      category: row.main_category || (row.categories && row.categories[0]),
    }),
  },
  {
    id: "VashuTheGreat2/E-Commerce-Product-Recommendation",
    fetch: () =>
      fetchHuggingFaceRows({
        id: "VashuTheGreat2/E-Commerce-Product-Recommendation",
        config: "default",
        split: "train",
      }),
    map: (row) => ({
      key: row.id,
      title: row.name,
      description: row.product_search_description,
      price: row.price,
      image: row.image_url,
      category:
        extractMyntraCategory(row.product_search_description) || row.usage,
    }),
  },
  {
    id: "jason1966/PromptCloudHQ_flipkart-products",
    fetch: () =>
      fetchHuggingFaceRows({
        id: "jason1966/PromptCloudHQ_flipkart-products",
        config: "default",
        split: "train",
      }),
    map: (row) => {
      const tree = parseJsonArraySafely(row.product_category_tree);
      let category = tree.length ? tree[0].split(">>")[0].trim() : null;

      // Some rows have a malformed single-segment tree that's really just
      // the product name (no ">>" separators) - too long to be a real
      // category, so drop it and let the "General" fallback take over.
      if (category && category.length > 40) {
        category = null;
      }

      const images = parseJsonArraySafely(row.image);

      return {
        key: row.uniq_id,
        title: row.product_name,
        description: row.description,
        price: row.retail_price,
        image: images[0] || null,
        category,
      };
    },
  },
  {
    id: "dummyjson/products",
    fetch: () => fetchDummyJsonProducts(),
    map: (row) => ({
      key: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      image: row.thumbnail || (Array.isArray(row.images) && row.images[0]),
      category: row.category,
    }),
  },
  {
    id: "fakestoreapi/products",
    fetch: () => fetchFakeStoreProducts(),
    map: (row) => ({
      key: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      image: row.image,
      category: row.category,
    }),
  },
];

class HuggingFaceImportService {
  static async run(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const Product = options.database.model("product");
    const categoryCache = new Map();

    let categoriesCreated = 0;
    let productsCreated = 0;
    let productsSkipped = 0;
    const datasetSummaries = [];

    for (const dataset of DATASETS) {
      let rows = [];

      try {
        rows = await dataset.fetch();
      } catch (error) {
        datasetSummaries.push({
          dataset: dataset.id,
          error: error.message || "Failed to fetch dataset",
          imported: 0,
        });
        continue;
      }

      let importedFromDataset = 0;

      for (const rawRow of rows) {
        let normalized;

        try {
          normalized = dataset.map(rawRow);
        } catch (error) {
          continue;
        }

        if (
          !normalized ||
          !normalized.title ||
          !normalized.image ||
          !normalized.image.toString().startsWith("http")
        ) {
          continue;
        }

        // A category name should be a short label, not a stray full
        // sentence/description that slipped through a dataset's mapper.
        const rawCategory =
          normalized.category && normalized.category.length <= 40
            ? normalized.category
            : null;
        const categoryName = capitalize(rawCategory) || "General";
        const categoryKey = categoryName.toLowerCase();

        let categoryId = categoryCache.get(categoryKey);

        if (!categoryId) {
          const { record: categoryRecord, created } =
            await ProductCategoryRepository.findOrCreateByName(
              categoryName,
              options
            );
          categoryId = categoryRecord.id || categoryRecord._id;
          categoryCache.set(categoryKey, categoryId);

          if (created) {
            categoriesCreated += 1;
          }
        }

        const price =
          typeof normalized.price === "number" && normalized.price > 0
            ? Math.round(normalized.price * 100) / 100
            : randomPrice();

        const importHash = `import:${dataset.id}:${normalized.key || normalized.title}`;

        try {
          await Product.create(
            [
              {
                title: normalized.title.toString().slice(0, 500),
                description: (normalized.description || "")
                  .toString()
                  .slice(0, 2000),
                image: normalized.image,
                price,
                amount: String(price),
                category: categoryId,
                type: "normal",
                tenant: currentTenant.id,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
                importHash,
              },
            ],
            options
          );

          productsCreated += 1;
          importedFromDataset += 1;
        } catch (error) {
          if (error.code === 11000) {
            productsSkipped += 1;
            continue;
          }

          throw error;
        }
      }

      datasetSummaries.push({
        dataset: dataset.id,
        imported: importedFromDataset,
      });
    }

    await AuditLogRepository.log(
      {
        entityName: "product",
        entityId: "huggingface-import",
        action: AuditLogRepository.CREATE,
        values: {
          source: "huggingface-import",
          categoriesCreated,
          productsCreated,
          productsSkipped,
          datasets: datasetSummaries,
        },
      },
      options
    );

    return {
      categoriesCreated,
      productsCreated,
      productsSkipped,
      datasets: datasetSummaries,
    };
  }
}

export default HuggingFaceImportService;
