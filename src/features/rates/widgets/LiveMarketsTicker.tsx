import { Skeleton } from "@/shared/components/Skeleton";
import { LiveMarketsTickerMarquee } from "../components/LiveMarketsTickerMarquee";
import { useRates } from "../hooks/use-rates";

export function LiveMarketsTicker() {
  const { isInitialized } = useRates();

  return (
    <div className="flex">
      <div className="flex shrink-0 items-center justify-center gap-x-2 bg-lime-500 px-2 py-3 md:px-4">
        <div className="h-[6px] w-[6px] rounded-full bg-neutral-900"></div>
        <p className="text-preset-6 md:text-preset-5-medium text-neutral-900 uppercase">
          Live Markets
        </p>
      </div>
      {!isInitialized ? (
        <Skeleton className="h-8.5 rounded-none md:h-10" />
      ) : (
        <LiveMarketsTickerMarquee />
      )}
    </div>
  );
}
