import { useFetch } from "@/shared/hooks/use-fetch";
import { getRates } from "../services/get-rates";

interface Props {
  baseCurrencyCode?: string;
  quoteCurrencyCode?: string;
}

export function useGetRates({ baseCurrencyCode, quoteCurrencyCode }: Props) {
  const { isLoading, data, error } = useFetch({
    queryFn: async () => {
      return getRates(baseCurrencyCode, quoteCurrencyCode);
    },
    queryKey: ["rate-between-currencies", baseCurrencyCode, quoteCurrencyCode],
  });

  return { isLoading, data, error };
}
