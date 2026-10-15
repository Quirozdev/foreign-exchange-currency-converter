import { useContext } from "react";
import { CurrenciesContext } from "../context/CurrenciesContext";

export function useCurrencies() {
  const context = useContext(CurrenciesContext);
  if (!context) {
    throw new Error("useCurrencies must be used within a CurrenciesProvider");
  }
  return context;
}
