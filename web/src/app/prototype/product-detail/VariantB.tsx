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

export const VariantB_NAME = "B — Sticky Image + Scrolling Info (Apple/Shopify-modern)";

export default function VariantB({ product }: { product: Merchandise }) {
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
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=B" className="text-xl font-bold">
            WARROOM
          </Link>
          <button>🛒 (0)</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-12 gap-12">
        {/* Sticky image column */}
        <div className="md:col-span-7">
          <div className="md:sticky md:top-20 space-y-3">
            <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-3xl flex items-center justify-center">
              <span className="text-[12rem]">{product.emoji}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["📦", "📐", "🎁", "💚"].map((e, i) => (
                <div
                  key={i}
                  className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center text-3xl opacity-60"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling info column */}
        <div className="md:col-span-5 space-y-8 md:py-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Big price */}
          <div>
            {product.discountPercent ? (
              <>
                <span className="text-4xl font-bold text-red-600">
                  {formatBaht(basePrice)}
                </span>
                <span className="ml-3 text-lg text-neutral-400 line-through">
                  {formatBaht(product.priceTHB)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold">{formatBaht(basePrice)}</span>
            )}
          </div>

          {product.variants && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider">
                  เลือกไซส์
                </span>
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

          {product.accessories && (
            <div className="space-y-3">
              <span className="text-sm font-semibold uppercase tracking-wider">
                ของแต่ง
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.accessories.map((a) => {
                  const checked = accIds.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() =>
                        setAccIds((prev) =>
                          checked
                            ? prev.filter((id) => id !== a.id)
                            : [...prev, a.id]
                        )
                      }
                      className={`p-3 rounded-xl border-2 text-left ${
                        checked
                          ? "border-neutral-900 bg-neutral-50"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <div className="text-sm font-medium">{a.label}</div>
                      <div className="text-xs text-neutral-500">
                        +{formatBaht(a.priceAddTHB ?? 0)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-neutral-600">รวมทั้งหมด</span>
              <span className="text-2xl font-bold">{formatBaht(totalPrice)}</span>
            </div>
            <button
              disabled={!canAdd}
              onClick={() => alert(`[Prototype] Add ${product.name} to cart`)}
              className="w-full px-6 py-3 bg-neutral-900 text-white rounded-full font-semibold disabled:opacity-30"
            >
              {canAdd ? "เพิ่มลงตะกร้า" : "เลือกไซส์ก่อน"}
            </button>
          </div>

          <details className="border-t border-neutral-200 pt-4">
            <summary className="text-sm font-medium cursor-pointer">
              รายละเอียดเพิ่มเติม
            </summary>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1 list-disc list-inside">
              <li>วัสดุ Cotton 100% (สำหรับเสื้อ)</li>
              <li>ผลิตในประเทศไทย</li>
              <li>จัดส่งภายใน 3-5 วันทำการหลังยืนยัน</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
