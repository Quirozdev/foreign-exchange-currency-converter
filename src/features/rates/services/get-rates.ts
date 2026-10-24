import { generateUrlWithOptions } from "@/shared/lib/url";
import type { Rate } from "../model/rates.types";
import { fetchApi } from "@/shared/api/fetch-api";

export async function getRates(
  baseCurrencyCode?: string,
  quoteCurrencyCode?: string,
  from?: string,
  to?: string,
): Promise<Rate[]> {
  const url = generateUrlWithOptions({
    baseUrl: "https://api.frankfurter.dev/v2/rates",
    queryParams: {
      base: baseCurrencyCode,
      quotes: quoteCurrencyCode,
      from: from,
      to: to,
    },
  });
  return fetchApi<Rate[]>(url);
}
