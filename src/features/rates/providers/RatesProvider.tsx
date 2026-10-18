import { useCallback, useEffect, useState, type ReactNode } from "react";
import { RatesContext } from "../context/RatesContext";

interface RatesProviderProps {
  children: ReactNode;
}

export function RatesProvider({ children }: RatesProviderProps) {
  const [sendCurrency, setSendCurrency] = useState<string>("USD");
  const [sendValue, setSendValue] = useState<string>("");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("EUR");
  const [isInitialized, setIsInitialized] = useState(false);

  const changeSendCurrency = useCallback((currency: string) => {
    setSendCurrency(currency);
  }, []);

  const changeSendValue = useCallback((value: string) => {
    setSendValue(value);
  }, []);

  const changeReceiveCurrency = useCallback((currency: string) => {
    setReceiveCurrency(currency);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const url = new URL(window.location.href);
    url.searchParams.set("sendCurrency", sendCurrency);
    url.searchParams.set("receiveCurrency", receiveCurrency);
    window.history.replaceState({}, "", url);
  }, [isInitialized, sendCurrency, receiveCurrency]);

  return (
    <RatesContext.Provider
      value={{
        sendCurrency,
        changeSendCurrency,
        sendValue,
        changeSendValue,
        receiveCurrency,
        changeReceiveCurrency,
        isInitialized,
        setIsInitialized,
      }}
    >
      {children}
    </RatesContext.Provider>
  );
}
