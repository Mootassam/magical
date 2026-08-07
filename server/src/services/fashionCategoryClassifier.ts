/**
 * Maps raw sample-product rows down to the 11 fashion categories the store
 * actually wants. Used both by the live import pipeline
 * (sampleProductImportService.ts) and by the one-time cleanup migration
 * (scripts/normalizeFashionCategories.ts) so the two stay in sync.
 */

export const TARGET_CATEGORIES = [
  "Women Clothing",
  "Accessories",
  "Women Shoes",
  "Girls",
  "Men Shoes",
  "Global Purchase",
  "Women Bags",
  "Men Bags",
  "Lifestyle",
  "Men Clothing",
  "Boys",
] as const;

export type TargetCategory = (typeof TARGET_CATEGORIES)[number];

const BEAUTY_CATEGORY_NAMES = new Set([
  "Skin Care",
  "Make Up",
  "Manicure & Pedicure Products",
  "Hair Care",
  "Bath & Body",
]);

const KIDS_GIRL_RE = /\bgirls?\b/i;
const KIDS_BOY_RE = /\bboys?\b/i;

const WOMEN_RE = /\b(women|womens|woman|ladies|lady|female)\b/i;
const MEN_RE = /\b(men|mens|man|gents|gentlemen|male)\b/i;

const SHOE_RE =
  /\b(shoes?|sneakers?|trainers?|boots?|sandals?|flats?|heels?|loafers?|slippers?|pumps?|wedges?|clogs?|moccasins?|flip.?flops?|espadrilles?|footwear|oxfords?|brogues?|mules?)\b/i;

const BAG_RE =
  /\b(bags?|backpacks?|handbags?|luggage|totes?|satchels?|clutch(es)?|rucksacks?|suitcases?|duffel|holdall|messenger bag|wristlet|crossbody)\b/i;

const ACCESSORY_RE =
  /\b(ring|rings|earrings?|necklaces?|bracelets?|jewellery|jewelry|watch|watches|sunglasses|scarves?|scarf|belts?|hats?|caps?|beanies?|headbands?|hairclips?|hairbands?|hairpins?|brooch(es)?|cufflinks?|wallets?|purses?|ties?|gloves?|keyrings?)\b/i;

const CLOTHING_RE =
  /\b(shirts?|t-?shirts?|dress(es)?|jeans|trousers|pants|jacket|jackets|coats?|hoodies?|hoodie|sweaters?|jumpers?|skirts?|blouses?|tops?|pyjamas?|pajamas?|underwear|lingerie|bras?|socks?|swimwear|swimsuits?|bikinis?|leggings?|shorts|suits?|cardigans?|vests?|tank top|tracksuits?|nightwear|nightdress|romper|jumpsuit|onesie|bodysuit|robe|kimono|blazer|overcoat|parka|fleece|polo|sweatshirts?|tunic|kaftan|playsuit|clothing|apparel)\b/i;

type ProductType = "shoes" | "bags" | "accessories" | "clothing" | null;

function detectType(title: string): ProductType {
  if (SHOE_RE.test(title)) return "shoes";
  if (BAG_RE.test(title)) return "bags";
  if (ACCESSORY_RE.test(title)) return "accessories";
  if (CLOTHING_RE.test(title)) return "clothing";
  return null;
}

type Gender = "women" | "men" | null;

function detectGender(title: string): Gender {
  const isWomen = WOMEN_RE.test(title);
  const isMen = MEN_RE.test(title);
  if (isWomen && !isMen) return "women";
  if (isMen && !isWomen) return "men";
  return null;
}

// Raw UK_data.csv source categories whose titles are worth scanning with the
// type/gender classifier. Everything NOT in this allowlist (and not
// beauty/Boys/Girls, handled separately below) is skipped without inspecting
// the title. This matters because generic words like "bag"/"case"/"strap"
// show up constantly in unrelated departments (e.g. GoPro accessories inside
// the 826k-row "Sports & Outdoors" bucket say "storage bag" / "backpack
// mount"), and scanning those titles would misclassify camera gear as
// fashion items.
const SHOE_GENRE_CATEGORY_NAMES = new Set([
  "Ballet & Dancing Footwear",
  "Basketball Footwear",
  "Boxing Shoes",
  "Climbing Footwear",
  "Cricket Shoes",
  "Cycling Shoes",
  "Golf Shoes",
  "Hockey Shoes",
  "Tennis Shoes",
  "Equestrian Sports Boots",
  "Boating Footwear",
  "Downhill Ski Boots",
  "Snowboard Boots",
]);

// Note: these must match UK_data.csv's own categoryName casing verbatim -
// classifyUkDataRow is called directly with the raw CSV value (mapUkDataRow
// passes record.categoryName as-is, with no capitalize() pass), unlike the
// one-time normalizeFashionCategories.ts migration which looked names up via
// an already-capitalized productCategory document.
const SCAN_ALLOWLIST = new Set<string>([
  "Men",
  "Women",
  "Handmade Clothing, Shoes & Accessories",
  "Luggage and travel gear",
  "Ski Clothing",
  "Gifts for Her",
  "Gifts for Him",
  ...SHOE_GENRE_CATEGORY_NAMES,
]);

/**
 * Classifies a UK_data.csv-style row (title + its own raw categoryName) into
 * one of the 11 target categories, or null if it doesn't belong in any of
 * them (electronics, home, garden, tools, generic "Sports & Outdoors" gear,
 * etc, all resolve to null here).
 */
export function classifyUkDataRow(
  title: string,
  rawCategoryName: string | null
): TargetCategory | null {
  const t = title || "";

  // Fragrances get their own bucket (Global Purchase) rather than being
  // folded into the generic Lifestyle catch-all, matching perfume.csv rows
  // (see mapPerfumeRow) so fragrance products aren't buried in Lifestyle.
  if (rawCategoryName === "Fragrances") return "Global Purchase";

  if (rawCategoryName && BEAUTY_CATEGORY_NAMES.has(rawCategoryName)) {
    return "Lifestyle";
  }

  if (rawCategoryName === "Boys") return "Boys";
  if (rawCategoryName === "Girls") return "Girls";

  const isWomenShoeCategory = /^Women.?s Sports & Outdoor Shoes$/i.test(rawCategoryName || "");
  const isMenShoeCategory = /^Men.?s Sports & Outdoor Shoes$/i.test(rawCategoryName || "");
  const isJewelleryCategory =
    rawCategoryName === "Handmade Jewellery" || rawCategoryName === "Made in Italy Handmade";
  const isGiftForHer = rawCategoryName === "Gifts For Her";
  const isGiftForHim = rawCategoryName === "Gifts For Him";
  const isShoeGenreCategory = SHOE_GENRE_CATEGORY_NAMES.has(rawCategoryName || "");
  const isClothingCategory = rawCategoryName === "Ski Clothing";

  const inScanScope =
    (rawCategoryName && SCAN_ALLOWLIST.has(rawCategoryName)) ||
    isWomenShoeCategory ||
    isMenShoeCategory ||
    isJewelleryCategory;

  if (!inScanScope) return null;

  let type = detectType(t);
  if (!type && isJewelleryCategory) type = "accessories";
  if (!type && (isWomenShoeCategory || isMenShoeCategory || isShoeGenreCategory)) type = "shoes";
  if (!type && isClothingCategory) type = "clothing";
  if (!type && (rawCategoryName === "Men" || rawCategoryName === "Women")) type = "clothing";
  // Note: "Luggage And Travel Gear" deliberately has no forced type="bags"
  // fallback like the others - it also contains unrelated items (locks,
  // umbrellas, gift codes), so bag membership relies solely on BAG_RE
  // actually matching a bag-ish word in the title.

  if (!type) return null;

  // Kids signal takes priority over adult gender, but only for items that are
  // actually clothing/shoes/bags/accessories (avoids pulling in toys etc).
  const isGirl = KIDS_GIRL_RE.test(t);
  const isBoy = KIDS_BOY_RE.test(t);
  if (isGirl && !isBoy) return "Girls";
  if (isBoy && !isGirl) return "Boys";
  if (isBoy && isGirl) return "Lifestyle"; // ambiguous kids item

  let gender = detectGender(t);
  if (!gender && isWomenShoeCategory) gender = "women";
  if (!gender && isMenShoeCategory) gender = "men";
  if (!gender && isGiftForHer) gender = "women";
  if (!gender && isGiftForHim) gender = "men";
  // "Men"/"Women" are Amazon's own curated gender departments, so trust that
  // even when the title itself has no explicit gender word (e.g. brand-only
  // titles like "Kalenji Ekiden Comfort Prime 2011").
  if (!gender && rawCategoryName === "Women") gender = "women";
  if (!gender && rawCategoryName === "Men") gender = "men";

  if (type === "accessories") return "Accessories";

  if (!gender) return "Lifestyle"; // unisex/ambiguous fashion item

  if (type === "shoes") return gender === "women" ? "Women Shoes" : "Men Shoes";
  if (type === "bags") return gender === "women" ? "Women Bags" : "Men Bags";
  if (type === "clothing") return gender === "women" ? "Women Clothing" : "Men Clothing";

  return null;
}

/**
 * Classifies a fashion.csv row from its own structured Gender
 * (Men/Women/Boys/Girls) and Category (Apparel/Footwear) columns - no title
 * parsing needed, this dataset is already clean.
 */
export function classifyFashionRow(
  gender: string | null,
  category: string | null
): TargetCategory | null {
  const g = (gender || "").trim();
  const isFootwear = (category || "").trim().toLowerCase() === "footwear";

  if (g === "Girls") return "Girls";
  if (g === "Boys") return "Boys";
  if (g === "Women") return isFootwear ? "Women Shoes" : "Women Clothing";
  if (g === "Men") return isFootwear ? "Men Shoes" : "Men Clothing";
  return null;
}

/**
 * Classifies a clothing.csv row (title only - the file has no separate
 * gender column) into Women/Men Clothing by scanning the title for a
 * gender word, the same way classifyUkDataRow does for UK_data.csv. Every
 * row in clothing.csv is already a garment, so this never returns null -
 * titles with no clear gender signal fall back to Lifestyle, matching how
 * ambiguous fashion items are already handled elsewhere in this file.
 */
export function classifyClothingRow(title: string): TargetCategory {
  const gender = detectGender(title || "");
  if (gender === "women") return "Women Clothing";
  if (gender === "men") return "Men Clothing";
  return "Lifestyle";
}
