import { useState } from "react";
import { AmountInput } from "../components/AmountInput";
import { ExchangeButton } from "../components/ExchangeButton";
import { Button } from "@/shared/components/Button";
import { FilledStarIcon } from "../icons/FilledStarIcon";
import { CheckIcon } from "../icons/CheckIcon";
import { CurrencyButton } from "./CurrencyButton";
import { useGetRateBetweenCurrencies } from "../hooks/use-get-rate-between-currencies";
import { convert } from "../lib/currency";

export function CheckRateSection() {
  const [sendValue, setSendValue] = useState<string>("");
  const [sendCurrency, setSendCurrency] = useState<string>("USD");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("EUR");

  const { isLoading, data } = useGetRateBetweenCurrencies({
    baseCurrencyCode: sendCurrency,
    quoteCurrencyCode: receiveCurrency,
  });

  function handleExchangeCurrencies() {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  }

  return (
    <section className="flex flex-col gap-y-4">
      <h1 className="text-preset-2 text-neutral-50 uppercase">
        Check the rate
      </h1>
      <div className="rounded-20 bg-neutral-700 shadow-[0_12px_40px_0_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-center gap-y-4 p-4 md:flex-row md:gap-x-6 md:p-5">
          <div className="rounded-16 flex flex-1 flex-col gap-y-5 border border-neutral-500 bg-neutral-600 p-4 md:p-5">
            <p className="text-preset-4 text-neutral-100 uppercase">Send</p>
            <div className="flex items-center justify-between gap-x-16">
              <AmountInput
                value={sendValue}
                onChange={(e) => setSendValue(e.target.value)}
              />
              <CurrencyButton
                selectedCurrencyCode={sendCurrency}
                onCurrencyChange={(currency) =>
                  setSendCurrency(currency.iso_code)
                }
              />
            </div>
          </div>

          <ExchangeButton onClick={handleExchangeCurrencies} />

          <div className="rounded-16 flex flex-1 flex-col gap-y-5 border border-neutral-500 bg-neutral-600 p-4 md:p-5">
            <p className="text-preset-4 text-neutral-100 uppercase">Receive</p>
            <div className="flex items-center justify-between gap-x-16">
              {isLoading ? (
                <div className="rounded-4 h-11 w-full animate-pulse bg-neutral-500"></div>
              ) : (
                <AmountInput
                  value={
                    sendValue ? convert(Number(sendValue), data?.rate) : ""
                  }
                  className="border-none text-lime-500"
                  disabled
                />
              )}

              <CurrencyButton
                selectedCurrencyCode={receiveCurrency}
                onCurrencyChange={(currency) =>
                  setReceiveCurrency(currency.iso_code)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-4 border-t border-dashed border-neutral-500 p-4 md:flex-row md:items-center md:justify-between md:px-5">
          {isLoading ? (
            <div className="rounded-4 h-2.5 w-32 animate-pulse bg-neutral-500"></div>
          ) : (
            <p className="text-preset-6 text-center text-neutral-50">
              1 {sendCurrency} = {convert(1, data?.rate, 4)} {receiveCurrency}
            </p>
          )}

          <div className="flex items-center justify-center gap-x-2">
            <Button
              icon={<FilledStarIcon />}
              activeIcon={<FilledStarIcon />}
              text="FAVORITE"
              activeText="FAVORITED"
            />
            <Button
              text="LOG CONVERSION"
              activeIcon={<CheckIcon />}
              activeText="Logged"
              className="outline-lime-500 hover:bg-lime-800 hover:outline-lime-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
