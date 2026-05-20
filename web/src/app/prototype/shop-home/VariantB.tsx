"use client";

import Link from "next/link";
import {
  CATEGORIES,
  COLLECTIONS,
  getProductsByCollection,
} from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";

export const VariantB_NAME = "B — Top Horizontal Tabs + Hero Banner";

export default function VariantB() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=B" className="text-xl font-bold tracking-tight">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <input
              type="search"
              placeholder="ค้นหาสินค้า…"
              className="px-3 py-1.5 border border-neutral-300 rounded-full text-sm w-48"
            />
            <button className="text-neutral-600 hover:text-neutral-900">🛒 (0)</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-500 text-white font-medium text-xs">
              LINE Login
            </button>
          </div>
        </div>

        {/* Top nav pills — all in horizontal row */}
        <nav className="max-w-7xl mx-auto px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/prototype/catalog-page?cat=${c.id}&variant=B`}
                className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-sm whitespace-nowrap"
              >
                {c.emoji} {c.label}
              </Link>
            ))}
            <span className="border-l border-neutral-300 mx-1" />
            {COLLECTIONS.map((c) => (
              <Link
                key={c.id}
                href={`/prototype/catalog-page?col=${c.id}&variant=B`}
                className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-sm whitespace-nowrap"
              >
                {c.emoji} {c.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero banner */}
        <section className="relative aspect-[4/1] rounded-2xl overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-700 flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-sm opacity-80">เปิดร้าน WARROOM</p>
            <h1 className="text-3xl md:text-5xl font-bold">ของที่ระลึกอย่างเป็นทางการ</h1>
            <p className="mt-2 opacity-80">เสื้อยืด · แก้ว · ตุ๊กตามาสคอต</p>
          </div>
        </section>

        {COLLECTIONS.map((col) => {
          const items = getProductsByCollection(col.id).slice(0, 4);
          return (
            <section key={col.id}>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>{col.emoji}</span> {col.label}
                </h2>
                <Link
                  href={`/prototype/catalog-page?col=${col.id}&variant=B`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ดูทั้งหมด →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
