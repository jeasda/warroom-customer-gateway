"use client";

// 🧪 Prototype Cart — single design (Shopee/Lazada-style)

import { useState } from "react";
import Link from "next/link";
import {
  PRODUCTS,
  formatBaht,
  discountedPrice,
  Merchandise,
} from "@/lib/mockData";

type CartLine = {
  id: string;
  product: Merchandise;
  variantLabel: string | null;
  accessoryLabels: string[];
  qty: number;
  unitPrice: number;
  selected: boolean;
};

function mockCart(): CartLine[] {
  const p1 = PRODUCTS.find((p) => p.slug === "tshirt-classic-black")!;
  const p2 = PRODUCTS.find((p) => p.slug === "mug-ceramic-logo")!;
  const p3 = PRODUCTS.find((p) => p.slug === "doll-mascot-standard")!;
  return [
    {
      id: "line-1",
      product: p1,
      variantLabel: "M",
      accessoryLabels: [],
      qty: 1,
      unitPrice: discountedPrice(p1),
      selected: true,
    },
    {
      id: "line-2",
      product: p2,
      variantLabel: "ใหญ่",
      accessoryLabels: [],
      qty: 2,
      unitPrice: discountedPrice(p2),
      selected: true,
    },
    {
      id: "line-3",
      product: p3,
      variantLabel: null,
      accessoryLabels: ["หมวก", "ดาบ"],
      qty: 1,
      unitPrice: discountedPrice(p3) + 90 + 120,
      selected: true,
    },
  ];
}

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>(mockCart);

  const allSelected = lines.length > 0 && lines.every((l) => l.selected);
  const selectedLines = lines.filter((l) => l.selected);
  const subtotal = selectedLines.reduce(
    (sum, l) => sum + l.unitPrice * l.qty,
    0
  );

  const toggleAll = (v: boolean) =>
    setLines((ls) => ls.map((l) => ({ ...l, selected: v })));
  const toggleLine = (id: string) =>
    setLines((ls) =>
      ls.map((l) => (l.id === id ? { ...l, selected: !l.selected } : l))
    );
  const changeQty = (id: string, delta: number) =>
    setLines((ls) =>
      ls.map((l) =>
        l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l
      )
    );
  const removeLine = (id: string) =>
    setLines((ls) => ls.filter((l) => l.id !== id));
  const removeSelected = () =>
    setLines((ls) => ls.filter((l) => !l.selected));

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-amber-400 text-neutral-900 px-4 py-2 text-center text-xs font-medium">
        🧪 PROTOTYPE — Cart — single design (Shopee/Lazada-style)
      </div>

      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=A" className="text-xl font-bold">
            WARROOM <span className="text-neutral-400">Shop</span>
          </Link>
          <h1 className="text-lg font-semibold">🛒 ตะกร้าสินค้า</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-3">
          {/* Header bar */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleAll(e.target.checked)}
              />
              เลือกทั้งหมด ({lines.length})
            </label>
            <button
              onClick={removeSelected}
              disabled={selectedLines.length === 0}
              className="text-sm text-red-600 hover:underline disabled:opacity-40"
            >
              ลบที่เลือก
            </button>
          </div>

          {/* Lines */}
          {lines.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-neutral-600">ตะกร้าว่าง</p>
              <Link
                href="/prototype/shop-home?variant=A"
                className="inline-block mt-4 px-4 py-2 bg-neutral-900 text-white rounded-full text-sm"
              >
                กลับไปช้อปต่อ
              </Link>
            </div>
          ) : (
            lines.map((l) => (
              <div
                key={l.id}
                className="bg-white border border-neutral-200 rounded-xl p-4"
              >
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={l.selected}
                    onChange={() => toggleLine(l.id)}
                    className="mt-2"
                  />
                  <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-3xl">
                    {l.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/prototype/product-detail?slug=${l.product.slug}&variant=A`}
                      className="font-medium hover:underline line-clamp-2"
                    >
                      {l.product.name}
                    </Link>
                    <div className="mt-1 text-xs text-neutral-500 space-x-2">
                      {l.variantLabel && (
                        <span className="inline-block px-2 py-0.5 bg-neutral-100 rounded">
                          ไซส์: {l.variantLabel}
                        </span>
                      )}
                      {l.accessoryLabels.length > 0 && (
                        <span className="inline-block px-2 py-0.5 bg-neutral-100 rounded">
                          ของแต่ง: {l.accessoryLabels.join(", ")}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="text-base font-semibold">
                        {formatBaht(l.unitPrice)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeQty(l.id, -1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 hover:bg-neutral-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => changeQty(l.id, 1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 hover:bg-neutral-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeLine(l.id)}
                        className="text-sm text-neutral-400 hover:text-red-600"
                        aria-label="ลบ"
                      >
                        🗑
                      </button>
                    </div>
                    <div className="mt-1 text-right text-sm text-neutral-600">
                      รวม: {formatBaht(l.unitPrice * l.qty)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order summary */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-4 bg-white border border-neutral-200 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">สรุปคำสั่งซื้อ</h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">
                  สินค้า ({selectedLines.length} รายการ)
                </span>
                <span>{formatBaht(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">ค่าจัดส่ง</span>
                <span className="text-neutral-500 text-xs">
                  คำนวณตอนยืนยันออเดอร์
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="font-semibold">รวมสินค้า</span>
              <span className="text-2xl font-bold">{formatBaht(subtotal)}</span>
            </div>
            <p className="text-xs text-neutral-500">
              💡 ระบบไม่รับชำระเงิน ทีม WARROOM จะติดต่อกลับเพื่อแจ้งยอดรวม + ค่าจัดส่ง + เลข PromptPay
            </p>
            <Link
              href="/prototype/checkout"
              className="block text-center px-6 py-3 bg-neutral-900 text-white rounded-full font-semibold hover:bg-neutral-700"
            >
              ดำเนินการต่อ ({selectedLines.length})
            </Link>
            <Link
              href="/prototype/shop-home?variant=A"
              className="block text-center text-sm text-blue-600 hover:underline"
            >
              ← ช้อปต่อ
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
