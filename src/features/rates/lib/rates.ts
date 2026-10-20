import type { LiveMarketTickerElement, Rate } from "../model/rates.types";

export function calculateChangePercentageBetweenRates(
  firstRate: number,
  secondRate: number,
) {
  return ((firstRate - secondRate) / Math.abs(firstRate)) * 100;
}

export function filterRatesDataFromCertainDates(
  ratesData: Rate[],
  dates: string[],
) {
  return ratesData.filter((rateData) => {
    return dates.includes(rateData.date);
  });
}

export function transformToLiveMarketTickerElement(
  data: Rate[],
  from: string,
  to: string,
): LiveMarketTickerElement[] {
  const liveMarketTickerMap = new Map<
    string,
    Partial<LiveMarketTickerElement>
  >();

  for (let i = 0; i < data.length; i++) {
    const rateData = data[i];
    if (!liveMarketTickerMap.has(`${rateData.base}-${rateData.quote}`)) {
      liveMarketTickerMap.set(`${rateData.base}-${rateData.quote}`, {
        base: rateData.base,
        quote: rateData.quote,
        previousRate: rateData.date === from ? rateData.rate : undefined,
        currentRate: rateData.date === to ? rateData.rate : undefined,
      });
    } else {
      const saved = liveMarketTickerMap.get(
        `${rateData.base}-${rateData.quote}`,
      );

      liveMarketTickerMap.set(`${rateData.base}-${rateData.quote}`, {
        base: saved?.base as string,
        quote: saved?.quote as string,
        previousRate: saved?.previousRate
          ? saved.previousRate
          : rateData.date === from
            ? rateData.rate
            : undefined,
        currentRate: saved?.currentRate
          ? saved.currentRate
          : rateData.date === to
            ? rateData.rate
            : undefined,
      });
    }
  }

  const liveMarketTickerElements: LiveMarketTickerElement[] = [];

  for (const value of liveMarketTickerMap.values()) {
    if (value.previousRate === undefined || value.currentRate === undefined) {
      continue;
    }
    liveMarketTickerElements.push({
      ...value,
      changePercentage: calculateChangePercentageBetweenRates(
        value.currentRate,
        value.previousRate,
      ),
    } as LiveMarketTickerElement);
  }

  return liveMarketTickerElements;
}
