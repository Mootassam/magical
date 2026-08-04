/**
 * One-time cleanup migration: collapses the ~296 raw categories produced by the
 * UK_data.csv sample import down to the 11 fashion categories the store actually
 * wants, deleting everything else (electronics, home, garden, tools, generic
 * "Sports & Outdoors" gear, etc).
 *
 * Classification is done per-product from the title text (type: clothing / shoes /
 * bags / accessories, and gender: men / women / boys / girls), because the raw
 * "Men" / "Women" categories in this dataset are themselves a mix of clothing,
 * shoes, bags and accessories rather than a single product type.
 *
 * Usage:
 *   npx ts-node --transpile-only src/scripts/normalizeFashionCategories.ts --dry-run
 *   npx ts-node --transpile-only src/scripts/normalizeFashionCategories.ts --commit
 */

import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { MongoClient, Db, ObjectId } from "mongodb";
import {
  TARGET_CATEGORIES,
  TargetCategory,
  classifyUkDataRow as classify,
} from "../services/fashionCategoryClassifier";

const DRY_RUN = !process.argv.includes("--commit");
const BATCH_SIZE = 2000;

async function main() {
  const uri = process.env.DATABASE_CONNECTION;
  if (!uri) throw new Error("DATABASE_CONNECTION not set");

  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db();

  console.log(DRY_RUN ? "=== DRY RUN (no writes) ===" : "=== COMMIT (writing changes) ===");

  const tenants = await db.collection("products").distinct("tenant");
  if (tenants.length !== 1) {
    throw new Error(`Expected exactly 1 tenant, found ${tenants.length}: ${tenants.join(", ")}`);
  }
  const tenantId = tenants[0];
  console.log("Tenant:", tenantId.toString());

  // Load raw category id -> name map.
  const rawCategories = await db.collection("productcategories").find({ tenant: tenantId }).toArray();
  const categoryNameById = new Map<string, string>();
  rawCategories.forEach((c) => categoryNameById.set(c._id.toString(), c.name));

  // Ensure the 11 target categories exist; build name -> _id map.
  const targetCategoryId = new Map<TargetCategory, ObjectId>();
  for (const name of TARGET_CATEGORIES) {
    const existing = rawCategories.find((c) => c.name === name);
    if (existing) {
      targetCategoryId.set(name, existing._id);
      continue;
    }
    if (DRY_RUN) {
      // Fake id for reporting purposes only.
      targetCategoryId.set(name, new ObjectId());
      continue;
    }
    const now = new Date();
    const result = await db.collection("productcategories").insertOne({
      name,
      tenant: tenantId,
      createdAt: now,
      updatedAt: now,
    });
    targetCategoryId.set(name, result.insertedId);
    console.log(`Created category "${name}"`);
  }

  const cursor = db
    .collection("products")
    .find({ tenant: tenantId }, { projection: { title: 1, name: 1, category: 1 } })
    .batchSize(BATCH_SIZE);

  const counts: Record<string, number> = {};
  TARGET_CATEGORIES.forEach((c) => (counts[c] = 0));
  counts["DELETED"] = 0;

  let updateOps: any[] = [];
  let deleteIds: ObjectId[] = [];
  let processed = 0;

  async function flush() {
    if (updateOps.length && !DRY_RUN) {
      await db.collection("products").bulkWrite(updateOps, { ordered: false });
    }
    if (deleteIds.length && !DRY_RUN) {
      await db.collection("products").deleteMany({ _id: { $in: deleteIds } });
    }
    updateOps = [];
    deleteIds = [];
  }

  for await (const p of cursor) {
    const title: string = p.title || p.name || "";
    const rawCatId = p.category ? p.category.toString() : null;
    const rawCatName = rawCatId ? categoryNameById.get(rawCatId) || null : null;

    const target = classify(title, rawCatName);

    if (!target) {
      counts["DELETED"]++;
      deleteIds.push(p._id);
    } else {
      counts[target]++;
      const newCatId = targetCategoryId.get(target)!;
      if (rawCatId !== newCatId.toString()) {
        updateOps.push({
          updateOne: { filter: { _id: p._id }, update: { $set: { category: newCatId } } },
        });
      }
    }

    processed++;
    if (updateOps.length >= BATCH_SIZE || deleteIds.length >= BATCH_SIZE) {
      await flush();
    }
    if (processed % 200000 === 0) {
      console.log(`...processed ${processed.toLocaleString()}`);
    }
  }
  await flush();

  console.log("\n=== Result ===");
  console.log("Total processed:", processed.toLocaleString());
  for (const c of TARGET_CATEGORIES) {
    console.log(`  ${c}: ${counts[c].toLocaleString()}`);
  }
  console.log(`  DELETED: ${counts["DELETED"].toLocaleString()}`);
  const kept = processed - counts["DELETED"];
  console.log(`Kept ${kept.toLocaleString()} / ${processed.toLocaleString()}`);

  if (!DRY_RUN) {
    const delRes = await db.collection("productcategories").deleteMany({
      tenant: tenantId,
      name: { $nin: TARGET_CATEGORIES as unknown as string[] },
    });
    console.log(`Removed ${delRes.deletedCount} obsolete category documents.`);
  }

  await client.close();
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
