import type { ReactNode } from "react";
import { CurrenciesContext } from "../context/CurrenciesContext";
import { useGetCurrencies } from "../hooks/use-get-currencies";

interface CurrenciesProviderProps {
  children: ReactNode;
}

export function CurrenciesProvider({ children }: CurrenciesProviderProps) {
  const { isLoading, data: currencies } = useGetCurrencies();

  return (
    <CurrenciesContext.Provider
      value={{ currencies: currencies, isLoadingCurrencies: isLoading }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
}
