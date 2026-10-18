import { useCallback, type ReactNode } from "react";
import { CurrenciesContext } from "../context/CurrenciesContext";
import { useGetCurrencies } from "../hooks/use-get-currencies";

interface CurrenciesProviderProps {
  children: ReactNode;
}

export function CurrenciesProvider({ children }: CurrenciesProviderProps) {
  const { isLoading, data: currencies } = useGetCurrencies();

  const isValidCurrency = useCallback(
    (currency: string) => {
      return (
        currencies?.some((current) => current.iso_code === currency) ?? false
      );
    },
    [currencies],
  );

  return (
    <CurrenciesContext.Provider
      value={{
        currencies: currencies,
        isLoadingCurrencies: isLoading,
        isValidCurrency,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
}
