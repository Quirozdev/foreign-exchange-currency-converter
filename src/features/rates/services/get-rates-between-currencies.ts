import type { Rate } from "../model/currencies.types";

export async function getRateBetweenCurrencies(
  baseCurrencyCode: string,
  quoteCurrencyCode: string,
): Promise<Rate> {
  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${baseCurrencyCode}/${quoteCurrencyCode}`,
  );

  const data = await response.json();

  return data;
}
