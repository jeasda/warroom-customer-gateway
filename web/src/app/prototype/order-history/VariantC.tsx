"use client";

import Link from "next/link";
import { formatBaht } from "@/lib/mockData";
import {
  MOCK_ORDERS,
  MockOrder,
  statusColor,
  formatThaiDate,
  orderTotal,
} from "./mockOrders";

export const VariantC_NAME = "C — Vertical Timeline grouped by month";

function monthKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear() + 543}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(iso: string): string {
  const d = new Date(iso);
  const m = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ][d.getMonth()];
  return `${m} ${d.getFullYear() + 543}`;
}

export default function VariantC() {
  // group by month
  const groups: { key: string; label: string; orders: MockOrder[] }[] = [];
  for (const o of MOCK_ORDERS) {
    const k = monthKey(o.createdAt);
    let g = groups.find((x) => x.key === k);
    if (!g) {
      g = { key: k, label: monthLabel(o.createdAt), orders: [] };
      groups.push(g);
    }
    g.orders.push(o);
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/prototype/shop-home?variant=A" className="text-xl font-bold">
            WARROOM
          </Link>
          <h1 className="text-lg font-semibold">📋 ประวัติคำสั่งซื้อ</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-neutral-200" />
          {groups.map((g) => (
            <div key={g.key} className="mb-8">
              <div className="relative mb-4">
                <div className="absolute -left-[1.625rem] top-1.5 w-3 h-3 rounded-full bg-neutral-900 ring-4 ring-neutral-50" />
                <h2 className="text-base font-semibold text-neutral-900">{g.label}</h2>
              </div>

              <div className="space-y-3">
                {g.orders.map((o) => (
                  <div
                    key={o.id}
                    className="relative bg-white border border-neutral-200 rounded-xl p-4"
                  >
                    <div className="absolute -left-[1.375rem] top-5 w-2 h-2 rounded-full bg-neutral-400 ring-4 ring-neutral-50" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-sm font-semibold">
                          {o.id}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {formatThaiDate(o.createdAt)}
                        </div>
                        <div className="mt-2 text-sm text-neutral-700">
                          {o.lines.length} รายการ ·{" "}
                          {o.lines.slice(0, 2).map((l) => l.product.emoji).join(" ")}
                          {o.lines.length > 2 && " ..."}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                            o.status
                          )}`}
                        >
                          {o.status}
                        </span>
                        <div className="mt-2 font-bold">
                          {formatBaht(orderTotal(o))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
