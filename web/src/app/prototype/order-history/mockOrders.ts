import { PRODUCTS, discountedPrice, Merchandise } from "@/lib/mockData";

export type MockOrderStatus =
  | "รอติดต่อ"
  | "ยืนยัน"
  | "รอชำระ"
  | "กำลังจัดส่ง"
  | "จัดส่งแล้ว";

export type MockOrderLine = {
  product: Merchandise;
  variant: string | null;
  accessories: string[];
  qty: number;
  price: number;
};

export type MockOrder = {
  id: string;
  createdAt: string; // ISO date
  status: MockOrderStatus;
  trackingNo?: string;
  lines: MockOrderLine[];
  cancelled?: boolean;
};

function line(slug: string, variant: string | null, qty: number, accessories: string[] = []) {
  const p = PRODUCTS.find((p) => p.slug === slug)!;
  const extras = accessories.length * 100;
  return { product: p, variant, accessories, qty, price: discountedPrice(p) + extras };
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "WR-2026-0042",
    createdAt: "2026-05-18T10:23:00Z",
    status: "รอติดต่อ",
    lines: [
      line("tshirt-classic-black", "M", 1),
      line("mug-ceramic-logo", "ใหญ่", 2),
    ],
  },
  {
    id: "WR-2026-0040",
    createdAt: "2026-05-15T14:11:00Z",
    status: "รอชำระ",
    lines: [line("doll-mascot-standard", null, 1, ["หมวก", "ดาบ"])],
  },
  {
    id: "WR-2026-0036",
    createdAt: "2026-05-10T09:05:00Z",
    status: "กำลังจัดส่ง",
    trackingNo: "TH123456789",
    lines: [
      line("tshirt-tactical-camo", "L", 1),
      line("tshirt-operator-white", "M", 1),
    ],
  },
  {
    id: "WR-2026-0028",
    createdAt: "2026-04-22T16:50:00Z",
    status: "จัดส่งแล้ว",
    trackingNo: "TH987654321",
    lines: [line("mug-tumbler-stainless", "เล็ก", 1)],
  },
  {
    id: "WR-2026-0019",
    createdAt: "2026-03-30T11:30:00Z",
    status: "จัดส่งแล้ว",
    trackingNo: "TH555111222",
    cancelled: false,
    lines: [line("tshirt-limited-edition", "XL", 1)],
  },
];

export function statusColor(s: MockOrderStatus): string {
  switch (s) {
    case "รอติดต่อ":
      return "bg-neutral-100 text-neutral-700";
    case "ยืนยัน":
      return "bg-blue-100 text-blue-700";
    case "รอชำระ":
      return "bg-amber-100 text-amber-800";
    case "กำลังจัดส่ง":
      return "bg-purple-100 text-purple-700";
    case "จัดส่งแล้ว":
      return "bg-emerald-100 text-emerald-700";
  }
}

export function formatThaiDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear() + 543;
  const m = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."][d.getMonth()];
  return `${d.getDate()} ${m} ${y}`;
}

export function orderTotal(o: MockOrder): number {
  return o.lines.reduce((s, l) => s + l.price * l.qty, 0);
}
