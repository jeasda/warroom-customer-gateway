"use client";

// 🧪 Prototype Admin Order List — single design
// Table with filter by status + status transition + audit-light footer

import { useState } from "react";
import Link from "next/link";
import { formatBaht } from "@/lib/mockData";
import {
  MOCK_ORDERS,
  MockOrderStatus,
  statusColor,
  formatThaiDate,
  orderTotal,
} from "../order-history/mockOrders";

const STATUSES: ("ทั้งหมด" | MockOrderStatus)[] = [
  "ทั้งหมด",
  "รอติดต่อ",
  "ยืนยัน",
  "รอชำระ",
  "กำลังจัดส่ง",
  "จัดส่งแล้ว",
];

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<"ทั้งหมด" | MockOrderStatus>("ทั้งหมด");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    filter === "ทั้งหมด"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === filter);

  const selected = MOCK_ORDERS.find((o) => o.id === selectedId);

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="bg-amber-400 text-neutral-900 px-4 py-2 text-center text-xs font-medium">
        🧪 PROTOTYPE — Admin Order List — single design
      </div>

      {/* Admin top bar */}
      <header className="bg-neutral-900 text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-6">
          <Link href="/prototype" className="font-bold text-lg">
            WARROOM <span className="text-neutral-400">Admin</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-white/60 hover:text-white">Dashboard</Link>
            <Link href="#" className="text-white font-semibold">Orders</Link>
            <Link href="#" className="text-white/60 hover:text-white">Merchandise</Link>
            <Link href="#" className="text-white/60 hover:text-white">Members</Link>
            <Link href="#" className="text-white/60 hover:text-white">Blog</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-white/60">admin@warroom.local</span>
            <button className="text-white/60 hover:text-white">ออกจากระบบ</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-6 grid lg:grid-cols-12 gap-4">
        {/* Left: table */}
        <section className={`bg-white border border-neutral-200 rounded-xl ${selected ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-xl font-bold">Orders</h1>
            <div className="flex gap-1 flex-wrap text-sm">
              {STATUSES.map((s) => {
                const count =
                  s === "ทั้งหมด"
                    ? MOCK_ORDERS.length
                    : MOCK_ORDERS.filter((o) => o.status === s).length;
                return (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1.5 rounded-full ${
                      filter === s
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 hover:bg-neutral-200"
                    }`}
                  >
                    {s} <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-600">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">เลขออเดอร์</th>
                  <th className="text-left px-4 py-3 font-semibold">วันที่</th>
                  <th className="text-left px-4 py-3 font-semibold">Member</th>
                  <th className="text-left px-4 py-3 font-semibold">รายการ</th>
                  <th className="text-right px-4 py-3 font-semibold">ยอดรวม</th>
                  <th className="text-left px-4 py-3 font-semibold">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedId(o.id)}
                    className={`border-t border-neutral-100 cursor-pointer hover:bg-neutral-50 ${
                      selectedId === o.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-medium">{o.id}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {formatThaiDate(o.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                          👤
                        </div>
                        <span className="text-neutral-700">สมชาย ใจดี</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {o.lines.length} รายการ
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatBaht(orderTotal(o))}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-neutral-500 text-sm">
              ไม่มี Order ในสถานะนี้
            </div>
          )}
        </section>

        {/* Right: order detail drawer */}
        {selected && (
          <aside className="lg:col-span-5">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 lg:sticky lg:top-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono font-bold">{selected.id}</div>
                  <div className="text-xs text-neutral-500">
                    {formatThaiDate(selected.createdAt)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 text-xl"
                  aria-label="ปิด"
                >
                  ×
                </button>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                  Member
                </h3>
                <div className="text-sm">สมชาย ใจดี</div>
                <div className="text-xs text-neutral-500">📞 081-234-5678</div>
                <div className="text-xs text-neutral-500">
                  📍 123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                  รายการ
                </h3>
                <div className="space-y-2">
                  {selected.lines.map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded flex items-center justify-center">
                        {l.product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-1">
                          {l.product.name}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {l.variant && `ไซส์ ${l.variant} · `}
                          จำนวน {l.qty} ·{" "}
                          {formatBaht(l.price * l.qty)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between font-semibold">
                <span>ยอดสินค้า</span>
                <span>{formatBaht(orderTotal(selected))}</span>
              </div>

              {/* Status transition controls */}
              <div>
                <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                  เปลี่ยนสถานะ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(["ยืนยัน", "รอชำระ", "กำลังจัดส่ง", "จัดส่งแล้ว"] as MockOrderStatus[])
                    .filter((s) => s !== selected.status)
                    .map((s) => (
                      <button
                        key={s}
                        className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-full"
                      >
                        → {s}
                      </button>
                    ))}
                  <button className="px-3 py-1.5 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-full">
                    ยกเลิก
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-2">
                  Audit Log
                </h3>
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>📝 admin@warroom สร้าง Order — {formatThaiDate(selected.createdAt)}</li>
                  {selected.status !== "รอติดต่อ" && (
                    <li>✓ admin@warroom mark "{selected.status}" — เมื่อกี้</li>
                  )}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
