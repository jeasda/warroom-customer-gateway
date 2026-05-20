"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, COLLECTIONS, formatBaht, discountedPrice } from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";
import { resolveCatalog } from "./helpers";

export const VariantC_NAME = "C — Hero Featured + Mosaic Grid";

export default function VariantC() {
  const sp = useSearchParams();
  const params = new URLSearchParams(sp.toString());
  const catalog = resolveCatalog(params);
  const [featured, ...rest] = catalog.items;

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=C" className="text-xl font-bold">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <button className="text-neutral-600">🔍</button>
            <button>🛒 (0)</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs">
              LINE Login
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto text-sm">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/prototype/catalog-page?cat=${c.id}&variant=C`}
              className={`px-3 py-1 rounded-full whitespace-nowrap ${
                sp.get("cat") === c.id
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100"
              }`}
            >
              {c.emoji} {c.label}
            </Link>
          ))}
          <span className="border-l border-neutral-300 mx-1" />
          {COLLECTIONS.map((c) => (
            <Link
              key={c.id}
              href={`/prototype/catalog-page?col=${c.id}&variant=C`}
              className={`px-3 py-1 rounded-full whitespace-nowrap ${
                sp.get("col") === c.id
                  ? "bg-neutral-900 text-white"
                  : "bg-amber-100"
              }`}
            >
              {c.emoji} {c.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span>{catalog.emoji}</span> {catalog.title}
          </h1>
          <select className="text-sm px-3 py-1.5 border border-neutral-300 rounded-lg bg-white">
            <option>เรียง: แนะนำ</option>
            <option>ใหม่ล่าสุด</option>
            <option>ราคา ↑</option>
            <option>ราคา ↓</option>
          </select>
        </div>

        {catalog.items.length === 0 && (
          <p className="text-neutral-500 p-6 text-center bg-white rounded-xl">
            ไม่มีสินค้าในหมวดนี้
          </p>
        )}

        {featured && (
          <Link
            href={`/prototype/product-detail?slug=${featured.slug}&variant=A`}
            className="block group relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 aspect-[2/1] flex items-end p-6"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl opacity-30">{featured.emoji}</span>
            </div>
            <div className="relative z-10 bg-white/95 backdrop-blur rounded-xl p-4 max-w-md">
              <span className="text-xs font-medium text-red-600">⭐ Featured</span>
              <h2 className="text-xl font-bold mt-1">{featured.name}</h2>
              <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                {featured.description}
              </p>
              <p className="text-2xl font-bold mt-2">
                {formatBaht(discountedPrice(featured))}
              </p>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {rest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
