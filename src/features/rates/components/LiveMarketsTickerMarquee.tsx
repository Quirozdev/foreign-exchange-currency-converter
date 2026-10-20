import { Marquee } from "@/shared/components/Marquee";
import { useRates } from "../hooks/use-rates";
import { useGetRates } from "../hooks/use-get-rates";
import {
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import type { Rate } from "../model/rates.types";
import { Skeleton } from "@/shared/components/Skeleton";
import { LiveMarketsTickerContainer } from "./LiveMarketsTickerContainer";

export function LiveMarketsTickerMarquee() {
  const { sendCurrency, receiveCurrency } = useRates();

  const currentDate = new Date();
  const currentDateIsoString = formatDateToIsoStringWithoutTime(currentDate);
  const previousDateIsoString = formatDateToIsoStringWithoutTime(
    subtractFromDate(currentDate, { days: 1 }),
  );

  const { data: sendCurrencyData, isLoading: isLoadingSendCurrencyData } =
    useGetRates({
      baseCurrencyCode: sendCurrency,
      from: previousDateIsoString,
      to: currentDateIsoString,
    });

  const { data: receiveCurrencyData, isLoading: isLoadingReceiveCurrencyData } =
    useGetRates({
      baseCurrencyCode: receiveCurrency,
      from: previousDateIsoString,
      to: currentDateIsoString,
    });

  if (isLoadingSendCurrencyData || isLoadingReceiveCurrencyData) {
    return <Skeleton className="h-8.5 rounded-none md:h-10" />;
  }

  return (
    <div className="min-w-0 flex-1 bg-neutral-700">
      <Marquee speed={60}>
        <LiveMarketsTickerContainer
          baseRatesData={sendCurrencyData as Rate[]}
          quoteRatesData={receiveCurrencyData as Rate[]}
          previousDateIsoString={previousDateIsoString}
          currentDateIsoString={currentDateIsoString}
        />
      </Marquee>
    </div>
  );
}
