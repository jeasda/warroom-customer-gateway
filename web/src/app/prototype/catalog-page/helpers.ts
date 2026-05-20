import {
  PRODUCTS,
  CATEGORIES,
  COLLECTIONS,
  Category,
  Collection,
} from "@/lib/mockData";

export type ResolvedCatalog = {
  title: string;
  emoji: string;
  items: typeof PRODUCTS;
  source: "category" | "collection" | "all";
};

export function resolveCatalog(sp: URLSearchParams): ResolvedCatalog {
  const cat = sp.get("cat") as Category | null;
  const col = sp.get("col") as Collection | null;

  if (cat) {
    const found = CATEGORIES.find((c) => c.id === cat);
    if (found) {
      return {
        title: found.label,
        emoji: found.emoji,
        items: PRODUCTS.filter((p) => p.category === cat),
        source: "category",
      };
    }
  }
  if (col) {
    const found = COLLECTIONS.find((c) => c.id === col);
    if (found) {
      return {
        title: found.label,
        emoji: found.emoji,
        items: PRODUCTS.filter((p) => p.collections.includes(col)),
        source: "collection",
      };
    }
  }
  return {
    title: "สินค้าทั้งหมด",
    emoji: "🛍️",
    items: PRODUCTS,
    source: "all",
  };
}
