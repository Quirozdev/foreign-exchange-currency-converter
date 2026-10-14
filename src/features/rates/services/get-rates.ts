import { generateUrlWithOptions } from "@/shared/lib/url";
import type { Rate } from "../model/currencies.types";

export async function getRates(
  baseCurrencyCode?: string,
  quoteCurrencyCode?: string,
): Promise<Rate> {
  const url = generateUrlWithOptions("https://api.frankfurter.dev/v2/rate", [
    baseCurrencyCode,
    quoteCurrencyCode,
  ]);

  const response = await fetch(url);

  const data = await response.json();

  return data;
}
