import type { Currency } from "../model/currencies.types";

export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch("https://api.frankfurter.dev/v2/currencies");

  const data = await response.json();
  return data;
}
