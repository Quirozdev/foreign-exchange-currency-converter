import { currencies } from "../model/currencies.constants";
import { SearchInput } from "../components/SearchInput";
import { CurrencyItem } from "../components/CurrencyItem";
import type { Currency } from "../model/currencies.types";
import { useRef, type RefObject } from "react";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { useKeyDown } from "@/shared/hooks/use-key-down";

interface Props {
  selectedCurrencyCode: string;
  onCurrencyChange: (currency: Currency) => void;
  onHidePicker: () => void;
  currencyButtonRef: RefObject<HTMLElement | null>;
}

export function CurrencyPicker({
  selectedCurrencyCode,
  onCurrencyChange,
  onHidePicker,
  currencyButtonRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const popularCurrencies = currencies.filter((currency) => currency.popular);
  const otherCurrencies = currencies.filter((currency) => !currency.popular);

  const selectAdjacentCurrency = (direction: "up" | "down") => {
    const element = containerRef.current?.querySelector(":focus");

    // if the input is focused dont make arrows move selections
    if (element && element.tagName === "INPUT") return;

    const currentSelectedIndex = currencies.findIndex(
      (currency) => currency.code === selectedCurrencyCode,
    );

    let adjacentElementIndex = currentSelectedIndex;

    if (direction === "down") {
      adjacentElementIndex = (adjacentElementIndex + 1) % currencies.length;
    } else {
      adjacentElementIndex = (adjacentElementIndex - 1) % currencies.length;
      if (adjacentElementIndex < 0) {
        adjacentElementIndex =
          currencies.length - Math.abs(adjacentElementIndex);
      }
    }

    // because i put the id of each currency item as their code i can search by this
    const adjacentCurrencyElement = containerRef.current?.querySelector(
      `#${currencies[adjacentElementIndex].code}`,
    ) as HTMLElement;

    onCurrencyChange(currencies[adjacentElementIndex]);
    adjacentCurrencyElement?.focus();
  };

  useClickOutside({
    ref: containerRef,
    ignoreElements: [currencyButtonRef],
    onClickOutside: onHidePicker,
  });

  useKeyDown({
    key: "Escape",
    onKeyDown: onHidePicker,
  });

  useKeyDown({
    key: "ArrowDown",
    onKeyDown: () => selectAdjacentCurrency("down"),
  });

  useKeyDown({
    key: "ArrowUp",
    onKeyDown: () => selectAdjacentCurrency("up"),
  });

  return (
    <div
      ref={containerRef}
      className="rounded-8 fixed left-1/2 z-10 mt-5 flex min-w-77.5 -translate-x-1/2 flex-col gap-y-2.5 border border-neutral-400 bg-neutral-600 p-2 shadow-[0_20px_60px_0_rgba(10,10,10,0.5)] md:absolute md:right-0 md:left-auto md:translate-x-0"
    >
      <SearchInput placeholder="Search currencies..." />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center justify-between border-b border-neutral-500 p-2">
          <p className="text-preset-5 text-neutral-200 uppercase">Popular</p>
          <p className="text-preset-5 text-neutral-200">3</p>
        </div>
        <div className="flex flex-col">
          {popularCurrencies.map((popularCurrency) => {
            return (
              <CurrencyItem
                id={popularCurrency.code}
                key={popularCurrency.code}
                currency={popularCurrency}
                isSelected={popularCurrency.code === selectedCurrencyCode}
                onPick={onCurrencyChange}
                tabIndex={-1}
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
                id={otherCurrency.code}
                key={otherCurrency.code}
                currency={otherCurrency}
                isSelected={otherCurrency.code === selectedCurrencyCode}
                onPick={onCurrencyChange}
                tabIndex={-1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
