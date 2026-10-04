import { useEffect, useState } from "react";
import { getCurrencies } from "../services/get-currencies";
import type { Currency } from "../model/currencies.types";

export function useGetCurrencies() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Currency[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getCurrencies();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { isLoading, data, error };
}
