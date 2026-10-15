import { useState, type ReactNode } from "react";
import { RatesContext } from "../context/RatesContext";

interface RatesProviderProps {
  children: ReactNode;
}

export function RatesProvider({ children }: RatesProviderProps) {
  const [sendCurrency, setSendCurrency] = useState<string>("USD");
  const [sendValue, setSendValue] = useState<string>("");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("EUR");

  function changeSendCurrency(currency: string) {
    setSendCurrency(currency);
  }

  function changeSendValue(value: string) {
    setSendValue(value);
  }

  function changeReceiveCurrency(currency: string) {
    setReceiveCurrency(currency);
  }

  return (
    <RatesContext
      value={{
        sendCurrency,
        changeSendCurrency,
        sendValue,
        changeSendValue,
        receiveCurrency,
        changeReceiveCurrency,
      }}
    >
      {children}
    </RatesContext>
  );
}
