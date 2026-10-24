import { getCurrencies } from "../services/get-currencies";
import { useFetch } from "@/shared/hooks/use-fetch";

export function useGetCurrencies() {
  const { isLoading, data, error, refetch } = useFetch({
    queryFn: getCurrencies,
    queryKey: ["currencies"],
  });

  return { isLoading, data, error, refetch };
}
