import { AmountInput } from "../components/AmountInput";
import { ExchangeButton } from "../components/ExchangeButton";
import { Button } from "@/shared/components/Button";
import { FilledStarIcon } from "../icons/FilledStarIcon";
import { CheckIcon } from "../icons/CheckIcon";
import { CurrencyButton } from "./CurrencyButton";
import { convert } from "../lib/currency";
import type { Rate } from "../model/currencies.types";
import { Skeleton } from "@/shared/components/Skeleton";
import { useGetRateBetweenCurrencies } from "../hooks/use-get-rates-between-currencies";
import { useRates } from "../hooks/use-rates";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useLogs } from "@/features/conversion-logs/hooks/use-logs";

export function CheckRateSection() {
  const {
    sendCurrency,
    changeSendCurrency,
    sendValue,
    changeSendValue,
    receiveCurrency,
    changeReceiveCurrency,
  } = useRates();

  const { addFavorite, removeFavorite, alreadyHasPair } = useFavorites();

  const { addLog, alreadyHasLoggedPair } = useLogs();

  const { isLoading, data } = useGetRateBetweenCurrencies({
    baseCurrencyCode: sendCurrency,
    quoteCurrencyCode: receiveCurrency,
  });

  function handleExchangeCurrencies() {
    changeSendCurrency(receiveCurrency);
    changeReceiveCurrency(sendCurrency);
  }

  const isPairAlreadyFavorited = alreadyHasPair({
    sendCurrency,
    receiveCurrency,
  });

  const receiveValue =
    sendValue && data ? convert(Number(sendValue), data.rate) : "";

  const isPairAlreadyLogged = alreadyHasLoggedPair({
    sendCurrency,
    sendValue: Number(sendValue),
    receiveCurrency,
    receiveValue: Number(receiveValue),
  });

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
                onChange={(e) => changeSendValue(e.target.value)}
              />
              <CurrencyButton
                selectedCurrencyCode={sendCurrency}
                onCurrencyChange={(currency) =>
                  changeSendCurrency(currency.iso_code)
                }
              />
            </div>
          </div>

          <ExchangeButton onClick={handleExchangeCurrencies} />

          <div className="rounded-16 flex flex-1 flex-col gap-y-5 border border-neutral-500 bg-neutral-600 p-4 md:p-5">
            <p className="text-preset-4 text-neutral-100 uppercase">Receive</p>
            <div className="flex items-center justify-between gap-x-16">
              {isLoading ? (
                <Skeleton />
              ) : (
                <AmountInput
                  value={receiveValue}
                  className="border-none text-lime-500"
                  disabled
                />
              )}

              <CurrencyButton
                selectedCurrencyCode={receiveCurrency}
                onCurrencyChange={(currency) =>
                  changeReceiveCurrency(currency.iso_code)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-4 border-t border-dashed border-neutral-500 p-4 md:flex-row md:items-center md:justify-between md:px-5">
          {isLoading ? (
            <Skeleton className="h-2.5 w-32" />
          ) : (
            <p className="text-preset-6 text-center text-neutral-50">
              1 {sendCurrency} = {convert(1, (data as Rate).rate, 4)}{" "}
              {receiveCurrency}
            </p>
          )}

          <div className="flex items-center justify-center gap-x-2">
            {isLoading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              <>
                <Button
                  isActive={isPairAlreadyFavorited}
                  icon={<FilledStarIcon />}
                  activeIcon={<FilledStarIcon />}
                  text="FAVORITE"
                  activeText="FAVORITED"
                  loadingElement={
                    <span className="text-preset-5-medium">Loading...</span>
                  }
                  onClick={async () => {
                    if (isPairAlreadyFavorited) {
                      removeFavorite(sendCurrency, receiveCurrency);
                    } else {
                      await addFavorite({
                        sendCurrency: sendCurrency,
                        receiveCurrency: receiveCurrency,
                        rate: (data as Rate)?.rate,
                        date: (data as Rate)?.date,
                      });
                    }
                  }}
                />
                <Button
                  isActive={isPairAlreadyLogged}
                  disabled={!receiveValue}
                  onClick={() => {
                    addLog({
                      sendCurrency,
                      sendValue: Number(sendValue),
                      receiveCurrency,
                      receiveValue: Number(receiveValue),
                      loggedAt: new Date(),
                    });
                  }}
                  text="LOG CONVERSION"
                  activeIcon={<CheckIcon />}
                  activeText="Logged"
                  className="outline-lime-500 hover:outline-lime-500 hover:not-focus:bg-lime-800"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
