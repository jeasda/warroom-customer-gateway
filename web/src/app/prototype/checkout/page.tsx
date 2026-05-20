"use client";

// 🧪 Prototype Checkout — single design (no payment in system)

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS, formatBaht, discountedPrice } from "@/lib/mockData";

function mockLines() {
  const p1 = PRODUCTS.find((p) => p.slug === "tshirt-classic-black")!;
  const p2 = PRODUCTS.find((p) => p.slug === "mug-ceramic-logo")!;
  const p3 = PRODUCTS.find((p) => p.slug === "doll-mascot-standard")!;
  return [
    { product: p1, variant: "M", accessories: [] as string[], qty: 1, price: discountedPrice(p1) },
    { product: p2, variant: "ใหญ่", accessories: [], qty: 2, price: discountedPrice(p2) },
    { product: p3, variant: null, accessories: ["หมวก", "ดาบ"], qty: 1, price: discountedPrice(p3) + 90 + 120 },
  ];
}

export default function CheckoutPage() {
  const [lines] = useState(mockLines());
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 p-6 flex items-center justify-center">
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 max-w-md text-center">
          <p className="text-6xl mb-4">✅</p>
          <h1 className="text-2xl font-bold">ส่ง Order เรียบร้อย</h1>
          <p className="mt-2 text-sm text-neutral-600">
            ทีม WARROOM จะติดต่อกลับทาง LINE ภายใน 24 ชม.
            เพื่อแจ้งยอดรวม + ค่าจัดส่ง + เลข PromptPay
          </p>
          <p className="mt-3 text-xs text-neutral-500">
            สถานะปัจจุบัน: <span className="font-medium">รอติดต่อ</span>
          </p>
          <Link
            href="/prototype/order-history?variant=A"
            className="mt-6 inline-block px-4 py-2 bg-neutral-900 text-white rounded-full text-sm"
          >
            ดูประวัติคำสั่งซื้อ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      <div className="bg-amber-400 text-neutral-900 px-4 py-2 text-center text-xs font-medium">
        🧪 PROTOTYPE — Checkout — single design
      </div>

      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/cart" className="text-sm text-blue-600 hover:underline">
            ← กลับไปตะกร้า
          </Link>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-12 gap-4"
      >
        {/* Left: form */}
        <div className="lg:col-span-7 space-y-3">
          {/* Section: Shipping address */}
          <section className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              📍 ที่อยู่จัดส่ง
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-2">
                <span className="text-sm text-neutral-600">ชื่อผู้รับ *</span>
                <input
                  required
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-neutral-600">เบอร์โทร *</span>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="0812345678"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <div />
              <label className="col-span-2">
                <span className="text-sm text-neutral-600">ที่อยู่ บรรทัด 1 *</span>
                <input
                  required
                  type="text"
                  placeholder="บ้านเลขที่ ซอย ถนน"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label className="col-span-2">
                <span className="text-sm text-neutral-600">ที่อยู่ บรรทัด 2</span>
                <input
                  type="text"
                  placeholder="(ถ้ามี)"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-neutral-600">แขวง/ตำบล *</span>
                <input
                  required
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-neutral-600">เขต/อำเภอ *</span>
                <input
                  required
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-neutral-600">จังหวัด *</span>
                <input
                  required
                  type="text"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
              <label>
                <span className="text-sm text-neutral-600">รหัสไปรษณีย์ *</span>
                <input
                  required
                  type="text"
                  pattern="[0-9]{5}"
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-neutral-600 pt-1">
              <input type="checkbox" defaultChecked /> บันทึกเป็นที่อยู่เริ่มต้น
            </label>
          </section>

          {/* Section: Note */}
          <section className="bg-white border border-neutral-200 rounded-xl p-5">
            <h2 className="font-semibold mb-2">📝 โน้ตถึงทีม (ไม่บังคับ)</h2>
            <textarea
              rows={3}
              placeholder="เช่น ฝากห่อของขวัญ, โทรก่อนส่ง, ฯลฯ"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
            />
          </section>

          {/* Section: Notice about payment */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
            <p className="font-semibold">⚠️ ระบบไม่รับชำระเงิน</p>
            <p className="mt-1 text-xs">
              เมื่อกดยืนยัน Order ทีม WARROOM จะติดต่อกลับทาง LINE ภายใน 24 ชม.
              เพื่อแจ้งยอดรวม + ค่าจัดส่ง + เลข PromptPay หลังจากนั้นโอนเงินตามที่ตกลง แล้วของจะถูกจัดส่งให้
            </p>
          </section>
        </div>

        {/* Right: order summary */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-4 bg-white border border-neutral-200 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">รายการสินค้า</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-2xl">
                    {l.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-2">
                      {l.product.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {l.variant && `ไซส์ ${l.variant}`}
                      {l.accessories.length > 0 && ` · ${l.accessories.join(", ")}`}
                      {" · "}จำนวน {l.qty}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {formatBaht(l.price * l.qty)}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-neutral-200 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">รวมสินค้า</span>
                <span>{formatBaht(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">ค่าจัดส่ง</span>
                <span className="text-neutral-500 text-xs">
                  คำนวณตอนติดต่อกลับ
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="font-semibold">ยอดรวมสินค้า</span>
              <span className="text-2xl font-bold">{formatBaht(subtotal)}</span>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-neutral-900 text-white rounded-full font-semibold hover:bg-neutral-700"
            >
              ยืนยันคำสั่งซื้อ
            </button>
            <p className="text-xs text-neutral-500 text-center">
              สถานะเริ่มต้น: <span className="font-medium">รอติดต่อ</span>
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
