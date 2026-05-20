"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  COLLECTIONS,
  getProductsByCollection,
} from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";

export const VariantC_NAME = "C — Drawer Menu + Search-first";

export default function VariantC() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Slim top bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="เปิดเมนู"
            className="w-9 h-9 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-xl"
          >
            ☰
          </button>
          <Link href="/prototype/shop-home?variant=C" className="text-lg font-bold whitespace-nowrap">
            WARROOM
          </Link>
          {/* Big search */}
          <div className="flex-1 max-w-2xl mx-2">
            <input
              type="search"
              placeholder="🔍 ค้นหา เสื้อ แก้ว ตุ๊กตา…"
              className="w-full px-4 py-2 border border-neutral-300 rounded-full text-sm focus:border-neutral-900 focus:outline-none"
            />
          </div>
          <button className="text-neutral-600 hover:text-neutral-900">🛒 (0)</button>
          <button className="hidden md:inline-flex px-3 py-1.5 rounded-full bg-emerald-500 text-white font-medium text-xs">
            LINE Login
          </button>
        </div>
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">เมนู</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 text-xl"
                aria-label="ปิด"
              >
                ×
              </button>
            </div>
            <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
              หมวดสินค้า
            </h3>
            <ul className="space-y-1 mb-6">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/prototype/catalog-page?cat=${c.id}&variant=C`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm"
                  >
                    <span>{c.emoji}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
              Collections
            </h3>
            <ul className="space-y-1">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/prototype/catalog-page?col=${c.id}&variant=C`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm"
                  >
                    <span>{c.emoji}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {COLLECTIONS.map((col) => {
          const items = getProductsByCollection(col.id).slice(0, 4);
          return (
            <section key={col.id}>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span>{col.emoji}</span> {col.label}
                </h2>
                <Link
                  href={`/prototype/catalog-page?col=${col.id}&variant=C`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ดูทั้งหมด →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
