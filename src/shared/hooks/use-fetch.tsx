import { useEffect, useState } from "react";

interface Props<T> {
  queryFn: () => Promise<T>;
  queryKey: unknown[];
}

export function useFetch<T>({ queryFn, queryKey }: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const serializedQueryKey = JSON.stringify(queryKey);

  useEffect(() => {
    async function fetchFn() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await queryFn();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFn();
  }, [serializedQueryKey]);

  return { isLoading, data, error };
}
