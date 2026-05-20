"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Merchandise,
  formatBaht,
  discountedPrice,
  getStockTier,
  stockTierColor,
} from "@/lib/mockData";

export const VariantA_NAME = "A — Classic 2-col (image left, info right)";

export default function VariantA({ product }: { product: Merchandise }) {
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

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=A" className="text-xl font-bold">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <button>🛒 (0)</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-neutral-500">
        <Link href="/prototype/shop-home?variant=A" className="hover:underline">หน้าแรก</Link>
        {" / "}
        <Link href={`/prototype/catalog-page?cat=${product.category}&variant=A`} className="hover:underline">
          {product.category}
        </Link>
        {" / "}
        <span className="text-neutral-900">{product.name}</span>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-2xl flex items-center justify-center">
          <span className="text-9xl">{product.emoji}</span>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
          </div>

          {/* Price */}
          <div>
            {product.discountPercent ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-red-600">
                  {formatBaht(basePrice)}
                </span>
                <span className="text-base text-neutral-400 line-through">
                  {formatBaht(product.priceTHB)}
                </span>
                <span className="text-sm px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                  ลด {product.discountPercent}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">{formatBaht(basePrice)}</span>
            )}
          </div>

          {/* Variant chip selector (pattern A) */}
          {product.variants && (
            <div className="space-y-3 pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">เลือกไซส์</label>
                <button className="text-xs text-blue-600 underline">ตารางไซส์</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => {
                  const isSelected = v.id === variantId;
                  const isOOS = v.stock === 0;
                  return (
                    <button
                      key={v.id}
                      disabled={isOOS}
                      onClick={() => setVariantId(v.id)}
                      className={[
                        "min-w-[60px] px-4 py-2 rounded-full border-2 text-sm font-medium",
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-300 bg-white hover:border-neutral-500",
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

          {/* Accessory multi-select (for dolls) */}
          {product.accessories && (
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <label className="text-sm font-medium">ของแต่งเพิ่มเติม (เลือกได้หลายอย่าง)</label>
              <div className="space-y-2">
                {product.accessories.map((a) => {
                  const checked = accIds.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer ${
                        checked
                          ? "border-neutral-900 bg-neutral-50"
                          : "border-neutral-200 hover:bg-neutral-50"
                      }`}
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

          {/* Total + Add to cart */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            {(accPrice > 0 || product.discountPercent) && (
              <div className="text-sm text-neutral-600 space-y-0.5">
                <div className="flex justify-between">
                  <span>สินค้า</span>
                  <span>{formatBaht(basePrice)}</span>
                </div>
                {accPrice > 0 && (
                  <div className="flex justify-between">
                    <span>ของแต่ง ({accIds.length})</span>
                    <span>+{formatBaht(accPrice)}</span>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-neutral-600">รวม</span>
              <span className="text-2xl font-bold">{formatBaht(totalPrice)}</span>
            </div>
            <button
              disabled={!canAdd}
              onClick={() => alert(`[Prototype] Add ${product.name} to cart`)}
              className="w-full px-6 py-3 bg-neutral-900 text-white rounded-full font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700"
            >
              {canAdd ? "เพิ่มลงตะกร้า" : "เลือกไซส์ก่อน"}
            </button>
            <Link
              href="/prototype/cart"
              className="block text-center text-sm text-blue-600 hover:underline"
            >
              ไปที่ตะกร้า →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
