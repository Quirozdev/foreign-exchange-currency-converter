import { cn } from "@/shared/lib/cn";
import type { LiveMarketTickerElement } from "../model/rates.types";

export function LiveMarketsTickerElement({
  base,
  quote,
  currentRate,
  changePercentage,
}: LiveMarketTickerElement) {
  return (
    <div className="flex w-fit shrink-0 items-center gap-x-2.5 border-r border-neutral-500 px-3 py-3 md:px-5">
      <p className="text-preset-6 md:text-preset-5 text-neutral-200 uppercase">
        {base}/{quote}
      </p>
      <p className="text-preset-6 md:text-preset-5-medium text-neutral-50">
        {currentRate.toFixed(2)}
      </p>
      <p
        className={cn(
          "text-preset-6 md:text-preset-5",
          changePercentage > 0 ? "text-green-500" : "text-red-500",
        )}
      >
        {changePercentage > 0 ? "▲" : "▼"} {changePercentage > 0 && "+"}
        {changePercentage.toFixed(2)}
      </p>
    </div>
  );
}
