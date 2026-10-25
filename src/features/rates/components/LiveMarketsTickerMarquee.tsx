import { Marquee } from "@/shared/components/Marquee";
import { useRates } from "../hooks/use-rates";
import { useGetRates } from "../hooks/use-get-rates";
import {
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import { Skeleton } from "@/shared/components/Skeleton";
import { LiveMarketsTickerContainer } from "./LiveMarketsTickerContainer";
import { LiveMarketsTickerError } from "./LiveMarketsTickerError";

export function LiveMarketsTickerMarquee() {
  const { sendCurrency, receiveCurrency } = useRates();

  const currentDate = new Date();
  const currentDateIsoString = formatDateToIsoStringWithoutTime(currentDate);
  const previousDateIsoString = formatDateToIsoStringWithoutTime(
    subtractFromDate(currentDate, { days: 1 }),
  );

  const {
    data: sendCurrencyData,
    isLoading: isLoadingSendCurrencyData,
    error: sendCurrencyDataError,
    refetch: refetchSendCurrencyData,
  } = useGetRates({
    baseCurrencyCode: sendCurrency,
    from: previousDateIsoString,
    to: currentDateIsoString,
  });

  const {
    data: receiveCurrencyData,
    isLoading: isLoadingReceiveCurrencyData,
    error: receiveCurrencyDataError,
    refetch: refetchReceiveCurrencyData,
  } = useGetRates({
    baseCurrencyCode: receiveCurrency,
    from: previousDateIsoString,
    to: currentDateIsoString,
  });

  if (isLoadingSendCurrencyData || isLoadingReceiveCurrencyData) {
    return <Skeleton className="h-8.5 rounded-none md:h-10" />;
  }

  if (
    sendCurrencyDataError ||
    receiveCurrencyDataError ||
    sendCurrencyData === null ||
    receiveCurrencyData === null
  ) {
    return (
      <LiveMarketsTickerError
        isRetrying={isLoadingSendCurrencyData && isLoadingReceiveCurrencyData}
        onRetry={async () => {
          await refetchSendCurrencyData();
          await refetchReceiveCurrencyData();
        }}
      />
    );
  }

  return (
    <div className="min-w-0 flex-1 bg-neutral-700">
      <Marquee speed={60}>
        <LiveMarketsTickerContainer
          baseRatesData={sendCurrencyData}
          quoteRatesData={receiveCurrencyData}
          previousDateIsoString={previousDateIsoString}
          currentDateIsoString={currentDateIsoString}
        />
      </Marquee>
    </div>
  );
}
