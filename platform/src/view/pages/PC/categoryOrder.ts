// Single source of truth for how categories are ordered across the PC
// storefront (header nav, home sidebar, classification sidebar) - this is a
// women's-fashion storefront, so women's categories should always lead
// instead of whatever order the DB happens to return.
export const CATEGORY_PRIORITY_ORDER = [
  "Women Clothing",
  "Women Shoes",
  "Women Bags",
  "Accessories",
  "Lifestyle",
  "Global Purchase",
  "Girls",
  "Boys",
  "Men Clothing",
  "Men Shoes",
  "Men Bags",
];

// Sorts categories by the priority order above. Anything not in the list
// (e.g. a newly added category) is appended at the end, in whatever order it
// was already in, instead of being dropped.
export function sortCategoriesByPriority<T extends { name: string }>(categories: T[]): T[] {
  return [...categories].sort((a, b) => {
    const rank = (name: string) => {
      const index = CATEGORY_PRIORITY_ORDER.indexOf(name);
      return index === -1 ? CATEGORY_PRIORITY_ORDER.length : index;
    };
    return rank(a.name) - rank(b.name);
  });
}
