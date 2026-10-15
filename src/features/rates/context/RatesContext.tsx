import { createContext } from "react";

interface RatesContext {
  sendCurrency: string;
  changeSendCurrency: (currency: string) => void;
  sendValue: string;
  changeSendValue: (value: string) => void;
  receiveCurrency: string;
  changeReceiveCurrency: (currency: string) => void;
}

export const RatesContext = createContext<RatesContext | null>(null);
