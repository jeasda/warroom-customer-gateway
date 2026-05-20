"use client";

// 🧪 Reusable switcher สำหรับ prototype routes — ลบเมื่อ promote prototype จบทั้งหมด

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Props = {
  variants: { key: string; name: string }[];
  current: string;
};

export default function PrototypeSwitcher({ variants, current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const idx = Math.max(
    0,
    variants.findIndex((v) => v.key === current)
  );
  const currentVariant = variants[idx];

  const go = useCallback(
    (delta: number) => {
      const next = (idx + delta + variants.length) % variants.length;
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", variants[next].key);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [idx, variants, router, pathname, searchParams]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      role="toolbar"
      aria-label="Prototype variant switcher"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-2 py-2 rounded-full bg-neutral-900 text-white shadow-2xl border border-white/20"
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous variant"
        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg"
      >
        ←
      </button>
      <div className="px-3 text-sm whitespace-nowrap">
        <span className="opacity-60 mr-2">PROTOTYPE</span>
        <span className="font-semibold">{currentVariant.name}</span>
      </div>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next variant"
        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg"
      >
        →
      </button>
    </div>
  );
}
