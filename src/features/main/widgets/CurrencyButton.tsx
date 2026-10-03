import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { currencies } from "../model/currencies.constants";
import type { Currency } from "../model/currencies.types";
import { useRef, useState } from "react";
import { CurrencyPicker } from "./CurrencyPicker";

interface Props {
  selectedCurrencyCode: string;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencyButton({
  selectedCurrencyCode,
  onCurrencyChange,
}: Props) {
  const [isSelectorVisible, setIsSelectorVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === selectedCurrencyCode,
  )!;

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        className="rounded-8 flex shrink-0 cursor-pointer items-center gap-x-2 bg-neutral-500 p-2.5 outline outline-neutral-400 hover:bg-neutral-400 hover:outline-0 focus:shadow-[0_0_0_3px_var(--color-neutral-600),0_0_0_4px_var(--color-lime-500)]"
        onClick={() => setIsSelectorVisible((prev) => !prev)}
      >
        <img
          src={selectedCurrency.icon}
          alt={`${selectedCurrency.name} icon`}
          className="h-5 w-5 rounded-full"
        />
        <p className="text-preset-4 text-neutral-50">{selectedCurrency.code}</p>
        <img src={ChevronDownIcon} alt="Chevron down icon" />
      </button>

      {isSelectorVisible && (
        <CurrencyPicker
          onCurrencyChange={onCurrencyChange}
          selectedCurrencyCode={selectedCurrencyCode}
          onHidePicker={() => setIsSelectorVisible(false)}
          currencyButtonRef={buttonRef}
        />
      )}
    </div>
  );
}
