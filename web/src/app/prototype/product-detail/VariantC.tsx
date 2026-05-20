"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Merchandise,
  PRODUCTS,
  formatBaht,
  discountedPrice,
  getStockTier,
  stockTierColor,
} from "@/lib/mockData";
import ProductCard from "@/components/shop/ProductCard";

export const VariantC_NAME = "C — Mobile-first Stack + Bottom Sticky CTA";

export default function VariantC({ product }: { product: Merchandise }) {
  const [variantId, setVariantId] = useState<string | null>(null);
  const [accIds, setAccIds] = useState<string[]>([]);

  const selected = product.variants?.find((v) => v.id === variantId);
  const tier = selected ? getStockTier(selected.stock) : null;
  const basePrice = discountedPrice(product);
  const accPrice = (product.accessories ?? [])
    .filter((a) => accIds.includes(a.id))
    .reduce((sum, a) => sum + (a.priceAddTHB ?? 0), 0);
  const totalPrice = basePrice + accPrice;
  const canAdd = product.variants ? !!selected && selected.stock > 0 : true;

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href={`/prototype/catalog-page?cat=${product.category}&variant=C`}
            className="w-9 h-9 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
            aria-label="ย้อนกลับ"
          >
            ←
          </Link>
          <div className="flex-1 text-sm font-medium truncate">{product.name}</div>
          <button>🛒</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Hero image stack */}
        <div className="bg-white">
          <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-300 flex items-center justify-center">
            <span className="text-[10rem]">{product.emoji}</span>
          </div>
          <div className="flex gap-2 px-4 py-3 overflow-x-auto">
            {["📦", "📐", "🎁", "💚", "📸"].map((e, i) => (
              <div
                key={i}
                className={`shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${
                  i === 0
                    ? "border-2 border-neutral-900 bg-neutral-50"
                    : "border border-neutral-200 bg-white"
                }`}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white mt-2 px-4 py-5 space-y-2">
          <h1 className="text-xl font-bold">{product.name}</h1>
          {product.discountPercent ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">
                {formatBaht(basePrice)}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                {formatBaht(product.priceTHB)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                -{product.discountPercent}%
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold">{formatBaht(basePrice)}</span>
          )}
          <p className="text-sm text-neutral-600">{product.description}</p>
        </div>

        {product.variants && (
          <div className="bg-white mt-2 px-4 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">ไซส์</h3>
              <button className="text-xs text-blue-600 underline">ตารางไซส์</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v) => {
                const isSel = v.id === variantId;
                const isOOS = v.stock === 0;
                return (
                  <button
                    key={v.id}
                    disabled={isOOS}
                    onClick={() => setVariantId(v.id)}
                    className={[
                      "min-w-[60px] px-4 py-2 rounded-full border-2 text-sm font-medium",
                      isSel
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white",
                      isOOS && "opacity-40 line-through cursor-not-allowed",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
            {selected && tier && (
              <p className={`text-xs ${stockTierColor(tier)}`}>
                ไซส์ {selected.label} — {tier}
              </p>
            )}
          </div>
        )}

        {product.accessories && (
          <div className="bg-white mt-2 px-4 py-5">
            <h3 className="font-semibold mb-3">ของแต่งเพิ่มเติม</h3>
            <div className="space-y-2">
              {product.accessories.map((a) => {
                const checked = accIds.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-200 active:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setAccIds((prev) =>
                            e.target.checked
                              ? [...prev, a.id]
                              : prev.filter((id) => id !== a.id)
                          )
                        }
                      />
                      {a.label}
                    </span>
                    <span className="text-sm text-neutral-600">
                      +{formatBaht(a.priceAddTHB ?? 0)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="bg-white mt-2 px-4 py-5">
            <h3 className="font-semibold mb-3">สินค้าที่คล้ายกัน</h3>
            <div className="grid grid-cols-2 gap-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3 z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div>
            <div className="text-xs text-neutral-500">รวม</div>
            <div className="text-lg font-bold">{formatBaht(totalPrice)}</div>
          </div>
          <button
            disabled={!canAdd}
            onClick={() => alert(`[Prototype] Add ${product.name} to cart`)}
            className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-full font-semibold disabled:opacity-30"
          >
            {canAdd ? "เพิ่มลงตะกร้า" : "เลือกไซส์ก่อน"}
          </button>
        </div>
      </div>
    </div>
  );
}
