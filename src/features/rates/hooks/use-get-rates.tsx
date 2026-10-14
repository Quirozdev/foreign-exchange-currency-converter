import { useFetch } from "@/shared/hooks/use-fetch";
import { getRates } from "../services/get-rates";

interface Props {
  baseCurrencyCode?: string;
  quoteCurrencyCode?: string;
}

export function useGetRates(props?: Props) {
  const { isLoading, data, error } = useFetch({
    queryFn: async () => {
      return getRates(props?.baseCurrencyCode, props?.quoteCurrencyCode);
    },
    queryKey: [
      "rate-between-currencies",
      props?.baseCurrencyCode,
      props?.quoteCurrencyCode,
    ],
  });

  return { isLoading, data, error };
}
