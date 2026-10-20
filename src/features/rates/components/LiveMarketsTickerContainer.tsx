import { useMemo } from "react";
import type { Rate } from "../model/rates.types";
import { LiveMarketsTickerElement } from "./LiveMarketsTickerElement";
import {
  filterRatesDataFromCertainDates,
  transformToLiveMarketTickerElement,
} from "../lib/rates";
import { shuffle } from "@/shared/lib/arrays";

interface Props {
  baseRatesData: Rate[];
  quoteRatesData: Rate[];
  previousDateIsoString: string;
  currentDateIsoString: string;
}

export function LiveMarketsTickerContainer({
  baseRatesData,
  quoteRatesData,
  previousDateIsoString,
  currentDateIsoString,
}: Props) {
  const shuffledData = useMemo(() => {
    const filteredSendCurrencyData = filterRatesDataFromCertainDates(
      baseRatesData,
      [previousDateIsoString, currentDateIsoString],
    );

    const filteredReceiveCurrencyData = filterRatesDataFromCertainDates(
      quoteRatesData,
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

    return shuffle([
      ...sendCurrencyLiveMarketTickerElements,
      ...receiveCurrencyLiveMarketTickerElements,
    ]);
  }, [
    currentDateIsoString,
    previousDateIsoString,
    quoteRatesData,
    baseRatesData,
  ]);

  return (
    <div className="flex items-center">
      {shuffledData.map((liveMarketTicker) => {
        return (
          <LiveMarketsTickerElement
            key={`${liveMarketTicker.base}-${liveMarketTicker.quote}`}
            {...liveMarketTicker}
          />
        );
      })}
    </div>
  );
}
