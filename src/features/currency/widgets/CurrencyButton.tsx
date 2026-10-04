import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import type { Currency } from "../model/currencies.types";
import { useCallback, useRef, useState } from "react";
import { CurrencyPicker } from "./CurrencyPicker";
import { useGetCurrencies } from "../hooks/use-get-currencies";
import { getCurrencyFlagSrc } from "../utils/get-currency-flag-src";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { cn } from "@/shared/lib/cn";

interface Props {
  selectedCurrencyCode: string;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencyButton({
  selectedCurrencyCode,
  onCurrencyChange,
}: Props) {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { isLoading, data: currencies } = useGetCurrencies();

  const hidePicker = useCallback(() => {
    setIsPickerVisible(false);
  }, []);

  if (isLoading || !currencies) return null;

  const selectedCurrency = currencies.find(
    (currency) => currency.iso_code === selectedCurrencyCode,
  )!;

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        disabled={isLoading}
        className={cn(
          "rounded-8 flex shrink-0 cursor-pointer items-center gap-x-2 bg-neutral-500 p-2.5 outline outline-neutral-400 hover:bg-neutral-400 hover:outline-0 focus:shadow-[0_0_0_3px_var(--color-neutral-600),0_0_0_4px_var(--color-lime-500)] disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:outline disabled:outline-neutral-300",
          isLoading && "min-w-24",
        )}
        onClick={() => setIsPickerVisible((prev) => !prev)}
      >
        {!isLoading ? (
          <>
            <img
              src={getCurrencyFlagSrc(selectedCurrency.iso_code)}
              className="h-5 w-5 rounded-full"
            />
            <p className="text-preset-4 text-neutral-50">
              {selectedCurrency?.iso_code}
            </p>
            <img src={ChevronDownIcon} alt="Chevron down icon" />
          </>
        ) : (
          <LoadingSpinner className="mx-auto" />
        )}
      </button>

      {isPickerVisible && (
        <CurrencyPicker
          currencies={currencies}
          onCurrencyChange={onCurrencyChange}
          selectedCurrencyCode={selectedCurrencyCode}
          onHidePicker={hidePicker}
          currencyButtonRef={buttonRef}
        />
      )}
    </div>
  );
}
