import { createContext } from "react";
import type { Currency } from "../model/currencies.types";

interface CurrenciesContextProps {
  currencies: Currency[] | null;
  isLoadingCurrencies: boolean;
  isValidCurrency: (currency: string) => boolean;
}

export const CurrenciesContext = createContext<CurrenciesContextProps | null>(
  null,
);
