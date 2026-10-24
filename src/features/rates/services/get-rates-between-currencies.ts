import { fetchApi } from "@/shared/api/fetch-api";
import type { Rate } from "../model/rates.types";

export async function getRateBetweenCurrencies(
  baseCurrencyCode: string,
  quoteCurrencyCode: string,
): Promise<Rate> {
  return fetchApi<Rate>(
    `https://api.frankfurter.dev/v2/rate/${baseCurrencyCode}/${quoteCurrencyCode}`,
  );
}
