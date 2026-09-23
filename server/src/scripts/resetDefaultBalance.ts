/**
 * One-time fix: the company schema used to default `defaultBalance` to 50
 * (see database/models/company.ts), so every company document created
 * before that default was changed to 0 already has 50 stored on it - and
 * since userRepository.createFromAuthMobile reads that value as the
 * starting balance for every self-registered account, new signups keep
 * getting a 50 balance even after the schema default is fixed (schema
 * defaults only apply when a document is first created, not retroactively).
 * This sets defaultBalance to 0 on any company document that still has the
 * old 50 default.
 *
 * Usage:
 *   npx ts-node --transpile-only src/scripts/resetDefaultBalance.ts --dry-run
 *   npx ts-node --transpile-only src/scripts/resetDefaultBalance.ts --commit
 *
 * Run this against the environment you actually want fixed - point
 * DATABASE_CONNECTION (in .env, or as an env var override) at that
 * database before running, since it connects with whatever
 * DATABASE_CONNECTION resolves to.
 */

import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { MongoClient, Db } from "mongodb";

const DRY_RUN = !process.argv.includes("--commit");

async function main() {
  const uri = process.env.DATABASE_CONNECTION;
  if (!uri) throw new Error("DATABASE_CONNECTION not set");

  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db();

  console.log(DRY_RUN ? "=== DRY RUN (no writes) ===" : "=== COMMIT (writing changes) ===");

  const companies = await db
    .collection("company")
    .find({ defaultBalance: { $in: ["50", 50] } })
    .toArray();

  console.log(`Found ${companies.length} company document(s) with defaultBalance = 50:`);
  for (const c of companies) {
    console.log(`  _id=${c._id} tenant=${c.tenant} name=${c.name || "(unnamed)"}`);
  }

  if (!companies.length) {
    console.log("Nothing to do.");
    await client.close();
    return;
  }

  if (!DRY_RUN) {
    const result = await db
      .collection("company")
      .updateMany({ defaultBalance: { $in: ["50", 50] } }, { $set: { defaultBalance: "0" } });
    console.log(`Updated ${result.modifiedCount} document(s) to defaultBalance = "0".`);
  }

  await client.close();
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
