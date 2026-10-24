import { useFetch } from "@/shared/hooks/use-fetch";
import { getRates } from "../services/get-rates";

interface Props {
  baseCurrencyCode?: string;
  quoteCurrencyCode?: string;
  from?: string;
  to?: string;
}

export function useGetRates(props?: Props) {
  const { isLoading, data, error, refetch } = useFetch({
    queryFn: async () => {
      return getRates(
        props?.baseCurrencyCode,
        props?.quoteCurrencyCode,
        props?.from,
        props?.to,
      );
    },
    queryKey: [
      "rates",
      props?.baseCurrencyCode,
      props?.quoteCurrencyCode,
      props?.from,
      props?.to,
    ],
  });

  return { isLoading, data, error, refetch };
}
