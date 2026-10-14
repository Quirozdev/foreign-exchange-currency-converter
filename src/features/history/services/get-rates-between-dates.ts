import type { Rate } from "../../currency/model/currencies.types";

export async function getRatesBetweenDates(
  baseCurrencyCode: string,
  quoteCurrencyCode: string,
  from: string,
  to: string,
): Promise<Rate[]> {
  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${baseCurrencyCode}&quotes=${quoteCurrencyCode}&from=${from}&to=${to}`,
  );

  const data = await response.json();

  return data;
}
