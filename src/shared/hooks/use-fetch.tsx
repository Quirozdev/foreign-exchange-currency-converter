import { useCallback, useEffect, useState } from "react";

interface Props<T> {
  queryFn: () => Promise<T>;
  queryKey: unknown[];
}

export function useFetch<T>({ queryFn, queryKey }: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const serializedQueryKey = JSON.stringify(queryKey);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const data = await queryFn();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    async function fetchFn() {
      await refetch();
    }
    fetchFn();
  }, [serializedQueryKey]);

  return { isLoading, data, error, refetch };
}
