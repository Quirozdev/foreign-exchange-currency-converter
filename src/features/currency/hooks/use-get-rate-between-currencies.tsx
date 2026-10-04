import { useEffect, useState } from "react";
import type { Rate } from "../model/currencies.types";
import { getRateBetweenCurrencies } from "../services/get-rate-between-currencies";

interface Props {
  baseCurrencyCode: string;
  quoteCurrencyCode: string;
}

export function useGetRateBetweenCurrencies({
  baseCurrencyCode,
  quoteCurrencyCode,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Rate | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getRateBetweenCurrencies(
          baseCurrencyCode,
          quoteCurrencyCode,
        );
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [baseCurrencyCode, quoteCurrencyCode]);

  return { isLoading, data, error };
}
