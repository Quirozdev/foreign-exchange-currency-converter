import { Marquee } from "@/shared/components/Marquee";
import { LiveMarketsTickerElement } from "./LiveMarketsTickerElement";
import { useRates } from "../hooks/use-rates";
import { useGetRates } from "../hooks/use-get-rates";
import {
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import {
  filterRatesDataFromCertainDates,
  transformToLiveMarketTickerElement,
} from "../lib/rates";
import type { Rate } from "../model/rates.types";
import { Skeleton } from "@/shared/components/Skeleton";

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

  const filteredSendCurrencyData = filterRatesDataFromCertainDates(
    sendCurrencyData as Rate[],
    [previousDateIsoString, currentDateIsoString],
  );

  const filteredReceiveCurrencyData = filterRatesDataFromCertainDates(
    receiveCurrencyData as Rate[],
    [previousDateIsoString, currentDateIsoString],
  );

  const sendCurrencyLiveMarketTickerElements =
    transformToLiveMarketTickerElement(
      filteredSendCurrencyData,
      previousDateIsoString,
      currentDateIsoString,
    );

  const receiveCurrencyLiveMarketTickerElements =
    transformToLiveMarketTickerElement(
      filteredReceiveCurrencyData,
      previousDateIsoString,
      currentDateIsoString,
    );

  const mixedData = [
    ...sendCurrencyLiveMarketTickerElements,
    ...receiveCurrencyLiveMarketTickerElements,
  ];

  return (
    <div className="min-w-0 flex-1 bg-neutral-700">
      <Marquee speed={60}>
        <div className="flex items-center">
          {mixedData.map((liveMarketTicker) => {
            return (
              <LiveMarketsTickerElement
                key={`${liveMarketTicker.base}-${liveMarketTicker.quote}`}
                {...liveMarketTicker}
              />
            );
          })}
        </div>
      </Marquee>
    </div>
  );
}
