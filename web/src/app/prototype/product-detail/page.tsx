"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PrototypeSwitcher from "@/components/PrototypeSwitcher";
import { getProductBySlug, PRODUCTS } from "@/lib/mockData";
import VariantA, { VariantA_NAME } from "./VariantA";
import VariantB, { VariantB_NAME } from "./VariantB";
import VariantC, { VariantC_NAME } from "./VariantC";

const VARIANTS = [
  { key: "A", name: VariantA_NAME, Component: VariantA },
  { key: "B", name: VariantB_NAME, Component: VariantB },
  { key: "C", name: VariantC_NAME, Component: VariantC },
];

function ProductDetailProto() {
  const sp = useSearchParams();
  const key = (sp.get("variant") ?? "A").toUpperCase();
  const slug = sp.get("slug") ?? PRODUCTS[0].slug;
  const v = VARIANTS.find((x) => x.key === key) ?? VARIANTS[0];
  const V = v.Component;
  const product = getProductBySlug(slug) ?? PRODUCTS[0];

  return (
    <>
      <div className="bg-amber-400 text-neutral-900 px-4 py-2 text-center text-xs font-medium">
        🧪 PROTOTYPE — Product Detail — ← → สลับ — ลอง ?slug=tshirt-classic-black | mug-ceramic-logo | doll-mascot-standard
      </div>
      <V product={product} />
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
      <ProductDetailProto />
    </Suspense>
  );
}
