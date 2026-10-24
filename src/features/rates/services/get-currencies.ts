import type { Currency } from "../model/currencies.types";
import { fetchApi } from "@/shared/api/fetch-api";

export async function getCurrencies(): Promise<Currency[]> {
  return fetchApi<Currency[]>("https://api.frankfurter.dev/v2/currencies");
}
