import { getRateBetweenCurrencies } from "../services/get-rate-between-currencies";
import { useFetch } from "@/shared/hooks/use-fetch";

interface Props {
  baseCurrencyCode: string;
  quoteCurrencyCode: string;
}

export function useGetRateBetweenCurrencies({
  baseCurrencyCode,
  quoteCurrencyCode,
}: Props) {
  const { isLoading, data, error } = useFetch({
    queryFn: async () => {
      return getRateBetweenCurrencies(baseCurrencyCode, quoteCurrencyCode);
    },
    queryKey: ["rate-between-currencies", baseCurrencyCode, quoteCurrencyCode],
  });

  return { isLoading, data, error };
}
