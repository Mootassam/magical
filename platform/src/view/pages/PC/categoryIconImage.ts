// Maps the 11 fixed storefront categories to the curated icon artwork in
// platform/public/icons/categories/ (served as static files by Vite).
const CATEGORY_ICON_IMAGES: Record<string, string> = {
  "Women Clothing": "/icons/categories/women-clothing.png",
  Accessories: "/icons/categories/accessories.png",
  "Women Shoes": "/icons/categories/women-shoes.png",
  Girls: "/icons/categories/girls.png",
  "Men Shoes": "/icons/categories/men-shoes.png",
  "Global Purchase": "/icons/categories/global-purchase.png",
  "Women Bags": "/icons/categories/women-bags.png",
  "Men Bags": "/icons/categories/men-bags.png",
  Lifestyle: "/icons/categories/lifestyle.png",
  "Men Clothing": "/icons/categories/men-clothing.png",
  Boys: "/icons/categories/boys.png",
};

export default function categoryIconImage(name: string): string | null {
  return CATEGORY_ICON_IMAGES[name] || null;
}
