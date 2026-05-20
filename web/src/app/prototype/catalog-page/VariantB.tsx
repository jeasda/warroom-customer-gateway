"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, COLLECTIONS } from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";
import { resolveCatalog } from "./helpers";

export const VariantB_NAME = "B — Facet Filters (Shopee-style) + Grid";

export default function VariantB() {
  const sp = useSearchParams();
  const params = new URLSearchParams(sp.toString());
  const catalog = resolveCatalog(params);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=B" className="text-xl font-bold">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <input
            type="search"
            placeholder="ค้นหา…"
            className="px-3 py-1.5 border border-neutral-300 rounded-full text-sm w-72"
          />
          <div className="flex items-center gap-3 text-sm">
            <button>🛒 (0)</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs">
              LINE Login
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-neutral-500">
        <Link href="/prototype/shop-home?variant=B" className="hover:underline">หน้าแรก</Link>
        {" / "}
        <span className="text-neutral-900">{catalog.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6 grid grid-cols-12 gap-4">
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-white border border-neutral-200 rounded-xl p-4 sticky top-20 space-y-5">
            <div>
              <h3 className="text-sm font-bold mb-2">🎯 หมวดสินค้า</h3>
              <ul className="space-y-1 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/prototype/catalog-page?cat=${c.id}&variant=B`}
                      className={`block px-2 py-1 rounded ${
                        sp.get("cat") === c.id
                          ? "text-red-600 font-semibold"
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      {c.emoji} {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">🔥 Collections</h3>
              <ul className="space-y-1 text-sm">
                {COLLECTIONS.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/prototype/catalog-page?col=${c.id}&variant=B`}
                      className={`block px-2 py-1 rounded ${
                        sp.get("col") === c.id
                          ? "text-red-600 font-semibold"
                          : "hover:bg-neutral-50"
                      }`}
                    >
                      {c.emoji} {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">💰 ราคา</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="ต่ำสุด"
                  className="w-20 px-2 py-1 border border-neutral-300 rounded text-sm"
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="สูงสุด"
                  className="w-20 px-2 py-1 border border-neutral-300 rounded text-sm"
                />
              </div>
              <button className="mt-2 w-full px-3 py-1.5 bg-red-500 text-white rounded text-sm">
                ใช้
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">📦 สถานะ</h3>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> เฉพาะมีสินค้าพร้อมส่ง
              </label>
              <label className="flex items-center gap-2 text-sm mt-1">
                <input type="checkbox" /> มีโปรโมชั่น
              </label>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9">
          <div className="bg-white border border-neutral-200 rounded-xl p-3 mb-3 flex items-center justify-between text-sm">
            <span className="text-neutral-700">
              เรียงตาม:
              <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded">
                แนะนำ
              </button>
              <button className="ml-1 px-3 py-1 hover:bg-neutral-100 rounded">
                ใหม่ล่าสุด
              </button>
              <button className="ml-1 px-3 py-1 hover:bg-neutral-100 rounded">
                ขายดี
              </button>
              <button className="ml-1 px-3 py-1 hover:bg-neutral-100 rounded">
                ราคา ↑
              </button>
              <button className="ml-1 px-3 py-1 hover:bg-neutral-100 rounded">
                ราคา ↓
              </button>
            </span>
            <span className="text-neutral-500">{catalog.items.length} รายการ</span>
          </div>

          {catalog.items.length === 0 ? (
            <p className="text-neutral-500 p-6 text-center bg-white rounded-xl">
              ไม่มีสินค้าในหมวดนี้
            </p>
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
