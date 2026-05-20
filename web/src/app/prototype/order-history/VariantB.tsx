"use client";

import Link from "next/link";
import { formatBaht } from "@/lib/mockData";
import {
  MOCK_ORDERS,
  statusColor,
  formatThaiDate,
  orderTotal,
} from "./mockOrders";

export const VariantB_NAME = "B — Cards with item thumbnails";

export default function VariantB() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=A" className="text-xl font-bold">
            WARROOM
          </Link>
          <h1 className="text-lg font-semibold">📋 ประวัติคำสั่งซื้อ</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 text-sm">
          {["ทั้งหมด", "รอติดต่อ", "ยืนยัน", "รอชำระ", "กำลังจัดส่ง", "จัดส่งแล้ว"].map(
            (label, i) => (
              <button
                key={i}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                  i === 0
                    ? "bg-neutral-900 text-white"
                    : "bg-white border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {MOCK_ORDERS.map((o) => (
          <div
            key={o.id}
            className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 hover:border-neutral-400 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-sm font-semibold">{o.id}</div>
                <div className="text-xs text-neutral-500">
                  สั่งเมื่อ {formatThaiDate(o.createdAt)}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                  o.status
                )}`}
              >
                {o.status}
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {o.lines.map((l, i) => (
                <div key={i} className="flex gap-2 shrink-0 max-w-xs">
                  <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-2xl">
                    {l.product.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium line-clamp-1">
                      {l.product.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {l.variant ? `ไซส์ ${l.variant} · ` : ""}จำนวน {l.qty}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div className="text-sm text-neutral-600">
                {o.lines.length} รายการ
                {o.trackingNo && (
                  <span className="ml-2 px-2 py-0.5 bg-neutral-100 rounded text-xs">
                    {o.trackingNo}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-500">ยอดรวม</div>
                <div className="text-lg font-bold">
                  {formatBaht(orderTotal(o))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="text-xs px-3 py-1.5 bg-neutral-100 rounded-full hover:bg-neutral-200">
                ดูรายละเอียด
              </button>
              {o.status === "รอติดต่อ" && (
                <button className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-full hover:bg-red-100">
                  ยกเลิก
                </button>
              )}
              {o.status === "จัดส่งแล้ว" && (
                <button className="text-xs px-3 py-1.5 bg-neutral-100 rounded-full hover:bg-neutral-200">
                  สั่งซื้อซ้ำ
                </button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
