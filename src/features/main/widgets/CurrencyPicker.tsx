import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { currencies } from "../model/currencies.constants";
import { SearchInput } from "../components/SearchInput";
import { CurrencyItem } from "../components/CurrencyItem";
import type { Currency } from "../model/currencies.types";
import { useState } from "react";

interface Props {
  selectedCurrencyCode: string;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencyPicker({
  selectedCurrencyCode,
  onCurrencyChange,
}: Props) {
  const [isSelectorVisible, setIsSelectorVisible] = useState<boolean>(false);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === selectedCurrencyCode,
  )!;

  const popularCurrencies = currencies.filter((currency) => currency.popular);
  const otherCurrencies = currencies.filter((currency) => !currency.popular);

  return (
    <div className="relative shrink-0">
      <button
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
        <div className="rounded-8 fixed left-1/2 z-10 mt-5 flex min-w-77.5 -translate-x-1/2 flex-col gap-y-2.5 border border-neutral-400 bg-neutral-600 p-2 shadow-[0_20px_60px_0_rgba(10,10,10,0.5)] md:absolute md:right-0 md:left-auto md:translate-x-0">
          <SearchInput placeholder="Search currencies..." />
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center justify-between border-b border-neutral-500 p-2">
              <p className="text-preset-5 text-neutral-200 uppercase">
                Popular
              </p>
              <p className="text-preset-5 text-neutral-200">3</p>
            </div>
            <div className="flex flex-col">
              {popularCurrencies.map((popularCurrency) => {
                return (
                  <CurrencyItem
                    key={popularCurrency.code}
                    currency={popularCurrency}
                    isSelected={popularCurrency.code === selectedCurrencyCode}
                    onSelect={onCurrencyChange}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between border-b border-neutral-500 p-2">
              <p className="text-preset-5 text-neutral-200 uppercase">
                Other Currencies
              </p>
              <p className="text-preset-5 text-neutral-200">52</p>
            </div>
            <div className="flex flex-col">
              {otherCurrencies.map((otherCurrency) => {
                return (
                  <CurrencyItem
                    key={otherCurrency.code}
                    currency={otherCurrency}
                    isSelected={otherCurrency.code === selectedCurrencyCode}
                    onSelect={onCurrencyChange}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
