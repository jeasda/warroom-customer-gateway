// 🧪 Prototype index — รวม link ไปทุก prototype routes
// ทั้งโฟลเดอร์ /prototype ลบทิ้งได้เมื่อ prototype answers ครบ

import Link from "next/link";

const PROTOTYPES = [
  {
    href: "/prototype/shop-home?variant=A",
    title: "Shop Home",
    desc: "หน้าแรกของร้าน — left menu + featured sections (New / Best / Promo)",
    variants: 3,
  },
  {
    href: "/prototype/catalog-page?variant=A&cat=tshirt",
    title: "Catalog Page",
    desc: "หน้ารวมสินค้าตาม Category/Collection ที่คลิกจาก left menu",
    variants: 3,
  },
  {
    href: "/prototype/product-detail?variant=A&slug=tshirt-classic-black",
    title: "Product Detail",
    desc: "หน้ารายละเอียดสินค้า — Variant Selector pattern A + Add-to-Cart",
    variants: 3,
  },
  {
    href: "/prototype/cart",
    title: "Cart",
    desc: "ตะกร้าสินค้า — Shopee/Lazada-style รายละเอียดครบ",
    variants: 1,
  },
  {
    href: "/prototype/checkout",
    title: "Checkout",
    desc: "หน้า Checkout — ที่อยู่จัดส่ง + รายการสินค้า + สรุป (ไม่มี payment)",
    variants: 1,
  },
  {
    href: "/prototype/order-history?variant=A",
    title: "Order History (Member)",
    desc: "หน้า Order History ของ Member — list/cards/timeline",
    variants: 3,
  },
  {
    href: "/prototype/admin-orders",
    title: "Admin Order List",
    desc: "หน้า Admin จัดการ Order — table + filter by status + transitions",
    variants: 1,
  },
];

export default function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <header className="max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-neutral-900 text-xs font-medium mb-3">
          🧪 PROTOTYPE INDEX
        </div>
        <h1 className="text-3xl font-bold">WARROOM Customer Gateway — Prototypes</h1>
        <p className="mt-2 text-neutral-600">
          Throwaway prototypes สำหรับเลือกหน้าตา UI หลักของระบบ คลิกแต่ละลิงก์เพื่อดู
          สลับ variant ด้วยปุ่ม ← → ที่ floating bar ล่างจอ หรือคีย์บอร์ด ← → ก็ได้
        </p>
      </header>

      <main className="max-w-3xl mx-auto grid gap-3">
        {PROTOTYPES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="block bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-900 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">{p.desc}</p>
              </div>
              <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {p.variants === 1 ? "1 design" : `${p.variants} variants`}
              </span>
            </div>
          </Link>
        ))}
      </main>

      <footer className="max-w-3xl mx-auto mt-12 text-xs text-neutral-500">
        เมื่อตัดสินใจ design เสร็จแล้ว ผู้ใช้ระบุไปทีละหน้า → ลบโฟลเดอร์ <code>/prototype</code> ทั้งหมด เก็บ decision ลง{" "}
        <code>docs/ui-decisions/</code>
      </footer>
    </div>
  );
}
