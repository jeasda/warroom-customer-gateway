// 🧪 Prototype-only ProductCard — ใช้ใน shop-home / catalog prototypes
// เมื่อ promote ออกจาก prototype ค่อย refactor เป็น production component

import Link from "next/link";
import {
  Merchandise,
  formatBaht,
  discountedPrice,
  getStockTier,
  stockTierColor,
} from "@/lib/mockData";

type Props = {
  product: Merchandise;
  variant?: "default" | "compact";
};

export default function ProductCard({ product, variant = "default" }: Props) {
  const finalPrice = discountedPrice(product);
  const hasDiscount =
    product.discountPercent !== undefined && product.discountPercent > 0;

  // อ่าน stock ของ Variant แรก เป็น hint
  const firstVariantStock = product.variants?.[0]?.stock;
  const tier =
    firstVariantStock !== undefined ? getStockTier(firstVariantStock) : null;

  const isCompact = variant === "compact";

  return (
    <Link
      href={`/prototype/product-detail?slug=${product.slug}&variant=A`}
      className="group block bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-900 hover:shadow-md transition"
    >
      <div
        className={`relative w-full ${
          isCompact ? "aspect-square" : "aspect-square"
        } bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center`}
      >
        <span className="text-5xl">{product.emoji}</span>
        {hasDiscount && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
            -{product.discountPercent}%
          </span>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h3
          className={`font-medium text-neutral-900 line-clamp-2 ${
            isCompact ? "text-sm" : "text-sm"
          }`}
        >
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-red-600">
                {formatBaht(finalPrice)}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {formatBaht(product.priceTHB)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-neutral-900">
              {formatBaht(finalPrice)}
            </span>
          )}
        </div>
        {tier && (
          <p className={`text-xs ${stockTierColor(tier)}`}>{tier}</p>
        )}
      </div>
    </Link>
  );
}
