import { i18n, i18nExists } from "../../../../i18n";

// Category names come straight from the database (server/data/*.csv), not
// from the dictionary, so a plain i18n() call would return the untranslated
// key when the exact name isn't mapped. Falling back to the raw name keeps
// unmapped/custom categories readable instead of showing a dotted key path.
export function categoryLabel(name?: string): string {
  if (!name) {
    return name as any;
  }

  const key = `estore.categories.${name}`;
  return i18nExists(key) ? i18n(key) : name;
}
