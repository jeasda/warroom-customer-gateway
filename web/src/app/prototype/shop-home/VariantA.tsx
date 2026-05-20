"use client";

import Link from "next/link";
import {
  CATEGORIES,
  COLLECTIONS,
  COLLECTIONS as _,
  getProductsByCollection,
} from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";

export const VariantA_NAME = "A — Left Sidebar Sticky";

export default function VariantA() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home" className="text-xl font-bold tracking-tight">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <button className="text-neutral-600 hover:text-neutral-900">🔍 ค้นหา</button>
            <button className="text-neutral-600 hover:text-neutral-900">🛒 ตะกร้า (0)</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-500 text-white font-medium text-xs">
              LINE Login
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-3 hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <nav>
              <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                หมวดสินค้า
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/prototype/catalog-page?cat=${c.id}&variant=A`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm"
                    >
                      <span>{c.emoji}</span>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                Collections
              </h3>
              <ul className="space-y-1">
                {COLLECTIONS.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/prototype/catalog-page?col=${c.id}&variant=A`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm"
                    >
                      <span>{c.emoji}</span>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 lg:col-span-9 space-y-8">
          {COLLECTIONS.map((col) => {
            const items = getProductsByCollection(col.id).slice(0, 4);
            return (
              <section key={col.id}>
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>{col.emoji}</span> {col.label}
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                <div className="mt-2 flex justify-end">
                  <Link
                    href={`/prototype/catalog-page?col=${col.id}&variant=A`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ดูทั้งหมด →
                  </Link>
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
