// 🧪 PROTOTYPE mock data — ไม่ใช่ schema จริง
// ใช้ใน prototype routes เท่านั้น (ลบทั้งไฟล์ได้เมื่อต่อ Supabase จริง)

export type Category = "tshirt" | "mug" | "doll";
export type Collection = "new" | "best" | "promo";

export type StockTier = "พร้อมส่ง" | "เหลือน้อย" | "หมดชั่วคราว";

export type VariantOption = {
  id: string;
  label: string; // S, M, L, XL หรือ เล็ก, ใหญ่
  stock: number;
};

export type AccessoryOption = {
  id: string;
  label: string;
  priceAddTHB?: number;
};

export type Merchandise = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceTHB: number;
  discountPercent?: number; // เฉพาะ Promo
  category: Category;
  collections: Collection[];
  variants?: VariantOption[];
  accessories?: AccessoryOption[];
  emoji: string; // image placeholder
};

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "tshirt", label: "เสื้อยืด", emoji: "👕" },
  { id: "mug", label: "ถ้วยและแก้ว", emoji: "☕" },
  { id: "doll", label: "ตุ๊กตา WARROOM", emoji: "🧸" },
];

export const COLLECTIONS: { id: Collection; label: string; emoji: string }[] = [
  { id: "new", label: "สินค้ามาใหม่", emoji: "✨" },
  { id: "best", label: "สินค้าขายดี", emoji: "🔥" },
  { id: "promo", label: "สินค้าโปรโมชั่น", emoji: "🏷️" },
];

const SHIRT_VARIANTS = (): VariantOption[] => [
  { id: "s", label: "S", stock: 12 },
  { id: "m", label: "M", stock: 8 },
  { id: "l", label: "L", stock: 2 },
  { id: "xl", label: "XL", stock: 0 },
];

const MUG_VARIANTS = (): VariantOption[] => [
  { id: "sm", label: "เล็ก", stock: 15 },
  { id: "lg", label: "ใหญ่", stock: 4 },
];

const DOLL_ACCESSORIES = (): AccessoryOption[] => [
  { id: "hat", label: "หมวก", priceAddTHB: 90 },
  { id: "armor", label: "เสื้อเกราะ", priceAddTHB: 150 },
  { id: "sword", label: "ดาบ", priceAddTHB: 120 },
  { id: "siren", label: "ไซเรนติดหัว", priceAddTHB: 200 },
];

export const PRODUCTS: Merchandise[] = [
  {
    id: "p001",
    slug: "tshirt-classic-black",
    name: "เสื้อยืดโลโก้ WARROOM Classic Black",
    description: "เสื้อยืดคอกลม Cotton 100% สกรีนโลโก้ที่อก สีดำ",
    priceTHB: 590,
    category: "tshirt",
    collections: ["new", "best"],
    variants: SHIRT_VARIANTS(),
    emoji: "👕",
  },
  {
    id: "p002",
    slug: "tshirt-tactical-camo",
    name: "เสื้อยืด WARROOM Tactical Camo",
    description: "เสื้อยืดลายพราง พิมพ์ลายเฉพาะรุ่น Limited",
    priceTHB: 690,
    category: "tshirt",
    collections: ["new"],
    variants: SHIRT_VARIANTS(),
    emoji: "🥷",
  },
  {
    id: "p003",
    slug: "tshirt-operator-white",
    name: "เสื้อยืด WARROOM Operator White",
    description: "เสื้อยืดสีขาว สกรีนลาย Operator",
    priceTHB: 590,
    discountPercent: 10,
    category: "tshirt",
    collections: ["best", "promo"],
    variants: SHIRT_VARIANTS(),
    emoji: "👔",
  },
  {
    id: "p004",
    slug: "tshirt-limited-edition",
    name: "เสื้อยืด WARROOM Limited Edition",
    description: "เสื้อยืดรุ่นพิเศษ ผลิตจำนวนจำกัด",
    priceTHB: 890,
    discountPercent: 20,
    category: "tshirt",
    collections: ["promo"],
    variants: SHIRT_VARIANTS(),
    emoji: "⭐",
  },
  {
    id: "p005",
    slug: "mug-ceramic-logo",
    name: "แก้วเซรามิก WARROOM โลโก้",
    description: "แก้วเซรามิกใส่กาแฟ พิมพ์โลโก้ WARROOM",
    priceTHB: 290,
    category: "mug",
    collections: ["best"],
    variants: MUG_VARIANTS(),
    emoji: "☕",
  },
  {
    id: "p006",
    slug: "mug-tumbler-stainless",
    name: "แก้ว Tumbler WARROOM Stainless",
    description: "แก้วเก็บอุณหภูมิ Stainless steel มีฝาปิด",
    priceTHB: 490,
    category: "mug",
    collections: ["new"],
    variants: MUG_VARIANTS(),
    emoji: "🥤",
  },
  {
    id: "p007",
    slug: "mug-coffee-black-edition",
    name: "แก้วกาแฟ WARROOM Black Edition",
    description: "แก้วกาแฟสีดำเงา ขอบทอง",
    priceTHB: 390,
    discountPercent: 15,
    category: "mug",
    collections: ["promo"],
    variants: MUG_VARIANTS(),
    emoji: "🖤",
  },
  {
    id: "p008",
    slug: "doll-mascot-standard",
    name: "ตุ๊กตา Mascot WARROOM Standard",
    description: "ตุ๊กตามาสคอตประจำ WARROOM ขนาด 25 cm",
    priceTHB: 1290,
    category: "doll",
    collections: ["new", "best"],
    accessories: DOLL_ACCESSORIES(),
    emoji: "🧸",
  },
  {
    id: "p009",
    slug: "doll-mascot-tactical",
    name: "ตุ๊กตา Mascot WARROOM Tactical",
    description: "ตุ๊กตามาสคอตเวอร์ชั่น Tactical ดูดุดัน",
    priceTHB: 1490,
    discountPercent: 10,
    category: "doll",
    collections: ["promo"],
    accessories: DOLL_ACCESSORIES(),
    emoji: "🪖",
  },
];

export function getStockTier(stock: number): StockTier {
  if (stock === 0) return "หมดชั่วคราว";
  if (stock <= 5) return "เหลือน้อย";
  return "พร้อมส่ง";
}

export function stockTierColor(tier: StockTier): string {
  switch (tier) {
    case "พร้อมส่ง":
      return "text-emerald-600";
    case "เหลือน้อย":
      return "text-amber-600";
    case "หมดชั่วคราว":
      return "text-neutral-400";
  }
}

export function formatBaht(n: number): string {
  return `฿${n.toLocaleString("en-US")}`;
}

export function discountedPrice(p: Merchandise): number {
  if (!p.discountPercent) return p.priceTHB;
  return Math.round(p.priceTHB * (1 - p.discountPercent / 100));
}

export function getProductsByCollection(c: Collection): Merchandise[] {
  return PRODUCTS.filter((p) => p.collections.includes(c));
}

export function getProductsByCategory(c: Category): Merchandise[] {
  return PRODUCTS.filter((p) => p.category === c);
}

export function getProductBySlug(slug: string): Merchandise | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
