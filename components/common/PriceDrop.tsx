
import { getEffectivePrice, isValidPriceDrop, type PriceValue } from "@/utils/pricing";

export type PriceDropProps = {
  price: PriceValue;
  specialPrice?: PriceValue;
  adjustment?: number;
  className?: string;
  formatPrice?: (price: number) => string;
  showArrow?: boolean;
};

const defaultFormatPrice = (price: number) =>
  `$${price.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const PriceDrop = ({
  price,
  specialPrice,
  adjustment = 0,
  className,
  formatPrice = defaultFormatPrice,
  showArrow = true,
}: PriceDropProps) => {
  const originalPrice = getEffectivePrice(price);

  if (originalPrice === null || originalPrice <= 0) {
    return null;
  }

  const hasPriceDrop = isValidPriceDrop(price, specialPrice);
  const currentPrice = (hasPriceDrop
    ? getEffectivePrice(specialPrice)
    : originalPrice) ?? originalPrice;
  const safeAdjustment = Number.isFinite(adjustment) ? adjustment : 0;

  if (!hasPriceDrop) {
    return (
      <span className={className}>
        {formatPrice(currentPrice + safeAdjustment)}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-nowrap items-center justify-end gap-1">
      {showArrow && (
        <span
          aria-hidden="true"
          className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#00a650]"
        >
          <svg
            width="7"
            height="7"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L6 6M6 6V3.5M6 6H3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      <span className={className}>
        {formatPrice(currentPrice + safeAdjustment)}
      </span>

      <span className="text-[12px] mt-1 lg:text-[12px] font-normal text-gray-500 line-through">
        {formatPrice(originalPrice + safeAdjustment)}
      </span>
    </span>
  );
};
