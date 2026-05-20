"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, COLLECTIONS } from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";
import { resolveCatalog } from "./helpers";

export const VariantA_NAME = "A — Sidebar + Standard Grid + Sort top";

export default function VariantA() {
  const sp = useSearchParams();
  const params = new URLSearchParams(sp.toString());
  const catalog = resolveCatalog(params);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=A" className="text-xl font-bold">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <button className="text-neutral-600">🔍 ค้นหา</button>
            <button>🛒 (0)</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs">
              LINE Login
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3">
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                        sp.get("cat") === c.id
                          ? "bg-neutral-900 text-white"
                          : "hover:bg-neutral-100"
                      }`}
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                        sp.get("col") === c.id
                          ? "bg-neutral-900 text-white"
                          : "hover:bg-neutral-100"
                      }`}
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

        <main className="col-span-12 lg:col-span-9">
          <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-neutral-200">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>{catalog.emoji}</span> {catalog.title}
              <span className="text-sm font-normal text-neutral-500">
                ({catalog.items.length} รายการ)
              </span>
            </h1>
            <select className="text-sm px-3 py-1.5 border border-neutral-300 rounded-lg bg-white">
              <option>เรียง: แนะนำ</option>
              <option>ราคาต่ำ → สูง</option>
              <option>ราคาสูง → ต่ำ</option>
              <option>ใหม่ล่าสุด</option>
            </select>
          </div>

          {catalog.items.length === 0 ? (
            <p className="text-neutral-500">ไม่มีสินค้าในหมวดนี้</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {catalog.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
