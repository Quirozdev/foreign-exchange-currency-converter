import { useCallback, useEffect, useRef, useState } from "react";

interface Props<T> {
  queryFn: () => Promise<T>;
  queryKey: unknown[];
}

export function useFetch<T>({ queryFn, queryKey }: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const latestRequestId = useRef(0);

  const serializedQueryKey = JSON.stringify(queryKey);

  const refetch = useCallback(async () => {
    const currentRequestId = ++latestRequestId.current;

    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const data = await queryFn();

      if (currentRequestId !== latestRequestId.current) {
        return;
      }

      setData(data);
    } catch (error) {
      if (currentRequestId !== latestRequestId.current) {
        return;
      }

      setError(error);
    } finally {
      if (currentRequestId === latestRequestId.current) {
        setIsLoading(false);
      }
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
