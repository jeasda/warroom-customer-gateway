"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PrototypeSwitcher from "@/components/PrototypeSwitcher";
import VariantA, { VariantA_NAME } from "./VariantA";
import VariantB, { VariantB_NAME } from "./VariantB";
import VariantC, { VariantC_NAME } from "./VariantC";

const VARIANTS = [
  { key: "A", name: VariantA_NAME, Component: VariantA },
  { key: "B", name: VariantB_NAME, Component: VariantB },
  { key: "C", name: VariantC_NAME, Component: VariantC },
];

function OrderHistoryProto() {
  const sp = useSearchParams();
  const key = (sp.get("variant") ?? "A").toUpperCase();
  const v = VARIANTS.find((x) => x.key === key) ?? VARIANTS[0];
  const V = v.Component;
  return (
    <>
      <div className="bg-amber-400 text-neutral-900 px-4 py-2 text-center text-xs font-medium">
        🧪 PROTOTYPE — Order History (Member) — ← → สลับ variant
      </div>
      <V />
      <PrototypeSwitcher
        variants={VARIANTS.map(({ key, name }) => ({ key, name }))}
        current={v.key}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <OrderHistoryProto />
    </Suspense>
  );
}
