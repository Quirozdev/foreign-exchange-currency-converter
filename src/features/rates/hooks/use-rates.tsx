import { useContext } from "react";
import { RatesContext } from "../context/RatesContext";

export function useRates() {
  const context = useContext(RatesContext);
  if (!context) {
    throw new Error("useRates must be used within a RatesProvider");
  }
  return context;
}
