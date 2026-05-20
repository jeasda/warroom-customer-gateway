"use client";

import Link from "next/link";
import { formatBaht } from "@/lib/mockData";
import {
  MOCK_ORDERS,
  statusColor,
  formatThaiDate,
  orderTotal,
} from "./mockOrders";

export const VariantA_NAME = "A — Compact List (table-like)";

export default function VariantA() {
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

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-3 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-600 uppercase">
            <div className="col-span-3">เลขออเดอร์ / วันที่</div>
            <div className="col-span-5">รายการ</div>
            <div className="col-span-2 text-right">ยอดรวม</div>
            <div className="col-span-2 text-right">สถานะ</div>
          </div>
          {MOCK_ORDERS.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-12 px-4 py-4 border-b border-neutral-100 hover:bg-neutral-50 items-center"
            >
              <div className="col-span-3">
                <div className="font-mono text-sm font-medium">{o.id}</div>
                <div className="text-xs text-neutral-500">
                  {formatThaiDate(o.createdAt)}
                </div>
              </div>
              <div className="col-span-5 text-sm text-neutral-700 line-clamp-2">
                {o.lines.map((l, i) => (
                  <span key={i}>
                    {l.product.emoji} {l.product.name}
                    {l.variant && ` (${l.variant})`}
                    {i < o.lines.length - 1 && " · "}
                  </span>
                ))}
              </div>
              <div className="col-span-2 text-right font-semibold">
                {formatBaht(orderTotal(o))}
              </div>
              <div className="col-span-2 text-right">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
                {o.trackingNo && (
                  <div className="text-xs text-neutral-500 mt-1">
                    {o.trackingNo}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
