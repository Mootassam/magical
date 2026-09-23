import Company from "../models/company";

// One-time, self-healing fix: the company schema used to default
// `defaultBalance` to 50 (it's now 0 - see database/models/company.ts), so
// any company document created before that change still has the old "50"
// stored on it. userRepository.createFromAuthMobile reads that value as the
// starting balance for every self-registered account, so new signups kept
// getting a 50 balance even after the schema default was fixed - schema
// defaults only apply to brand-new documents, never retroactively to ones
// that already exist. Runs on every server boot (idempotent - once a
// company's defaultBalance is "0" this matches nothing and is a no-op), so
// production gets corrected automatically on the next deploy/restart
// instead of requiring someone to manually edit it in the admin panel.
export async function normalizeDefaultBalance(database) {
  const result = await Company(database).updateMany(
    { defaultBalance: { $in: ["50", 50] } },
    { $set: { defaultBalance: "0" } }
  );

  const fixed = (result as any).nModified ?? (result as any).modifiedCount ?? 0;
  if (fixed > 0) {
    console.log(
      `normalizeDefaultBalance: reset defaultBalance from 50 to 0 on ${fixed} company document(s).`
    );
  }
}
