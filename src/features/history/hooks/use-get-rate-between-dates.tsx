import { useFetch } from "@/shared/hooks/use-fetch";
import { getRatesBetweenDates } from "../services/get-rates-between-dates";

interface Props {
  baseCurrencyCode: string;
  quoteCurrencyCode: string;
  from: string;
  to: string;
}

export function useGetRateBetweenDates({
  baseCurrencyCode,
  quoteCurrencyCode,
  from,
  to,
}: Props) {
  const { isLoading, data, error } = useFetch({
    queryFn: async () => {
      return getRatesBetweenDates(
        baseCurrencyCode,
        quoteCurrencyCode,
        from,
        to,
      );
    },
    queryKey: [
      "rate-between-dates",
      baseCurrencyCode,
      quoteCurrencyCode,
      from,
      to,
    ],
  });

  return { isLoading, data, error };
}
