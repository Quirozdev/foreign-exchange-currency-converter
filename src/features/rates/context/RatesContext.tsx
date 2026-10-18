import { createContext } from "react";

interface RatesContextProps {
  sendCurrency: string;
  changeSendCurrency: (currency: string) => void;
  sendValue: string;
  changeSendValue: (value: string) => void;
  receiveCurrency: string;
  changeReceiveCurrency: (currency: string) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
}

export const RatesContext = createContext<RatesContextProps | null>(null);
