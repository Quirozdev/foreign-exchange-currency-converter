import { SearchInput } from "../components/SearchInput";
import { CurrencyItem } from "../components/CurrencyItem";
import type { Currency } from "../model/currencies.types";
import { useRef, useState, type RefObject } from "react";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { useKeyDown } from "@/shared/hooks/use-key-down";
import { currenciesMetadata } from "../model/currencies.constants";
import { getCurrencyMetadataWithDefaults } from "../utils/currency-metadata";

interface Props {
  currencies: Currency[];
  selectedCurrencyCode: string;
  onCurrencyChange: (currency: Currency) => void;
  onHidePicker: () => void;
  currencyButtonRef: RefObject<HTMLElement | null>;
}

export function CurrencyPicker({
  currencies,
  selectedCurrencyCode,
  onCurrencyChange,
  onHidePicker,
  currencyButtonRef,
}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const lowerCaseSearchQuery = searchQuery.toLowerCase();

  const filteredCurrencies = currencies
    .filter(
      (currency) =>
        currency.name.toLowerCase().includes(lowerCaseSearchQuery) ||
        currency.iso_code.toLowerCase().includes(lowerCaseSearchQuery),
    )
    .sort((a, b) => {
      const aPopularity = getCurrencyMetadataWithDefaults(a.iso_code).popular;
      const bPopularity = getCurrencyMetadataWithDefaults(b.iso_code).popular;
      if (aPopularity === true && bPopularity === false) {
        return -1;
      } else if (aPopularity === false && bPopularity === true) {
        return 1;
      }
      return 0;
    });
  const popularCurrencies = filteredCurrencies.filter(
    (currency) => currenciesMetadata[currency.iso_code]?.popular,
  );
  const otherCurrencies = filteredCurrencies.filter(
    (currency) => !currenciesMetadata[currency.iso_code]?.popular,
  );

  const selectAdjacentCurrency = (direction: "up" | "down") => {
    if (filteredCurrencies.length === 0) return;

    const element = containerRef.current?.querySelector(":focus");

    // if the input is focused just focus the first or last currency element
    if (element && element.tagName === "INPUT") {
      const index = direction === "down" ? 0 : filteredCurrencies.length - 1;

      const currencyElement = containerRef.current?.querySelector(
        `#${filteredCurrencies[index].iso_code}`,
      ) as HTMLElement;

      onCurrencyChange(filteredCurrencies[index]);
      currencyElement?.focus();
      return;
    }

    const currentSelectedIndex = filteredCurrencies.findIndex(
      (currency) => currency.iso_code === selectedCurrencyCode,
    );

    let adjacentElementIndex = currentSelectedIndex;

    if (direction === "down") {
      adjacentElementIndex =
        (adjacentElementIndex + 1) % filteredCurrencies.length;
    } else {
      adjacentElementIndex =
        (adjacentElementIndex - 1) % filteredCurrencies.length;
      if (adjacentElementIndex < 0) {
        adjacentElementIndex =
          filteredCurrencies.length - Math.abs(adjacentElementIndex);
      }
    }

    // because i put the id of each currency item as their code i can search by this
    const adjacentCurrencyElement = containerRef.current?.querySelector(
      `#${filteredCurrencies[adjacentElementIndex].iso_code}`,
    ) as HTMLElement;

    onCurrencyChange(filteredCurrencies[adjacentElementIndex]);
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
      <SearchInput
        placeholder="Search currencies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus={true}
      />
      <div className="flex flex-col gap-y-1">
        {popularCurrencies.length > 0 && (
          <div className="flex items-center justify-between border-b border-neutral-500 p-2">
            <p className="text-preset-5 text-neutral-200 uppercase">Popular</p>
            <p className="text-preset-5 text-neutral-200">
              {popularCurrencies.length}
            </p>
          </div>
        )}
        <div className="flex flex-col">
          {popularCurrencies.map((popularCurrency) => {
            return (
              <CurrencyItem
                id={popularCurrency.iso_code}
                key={popularCurrency.iso_code}
                currency={popularCurrency}
                isSelected={popularCurrency.iso_code === selectedCurrencyCode}
                onPick={(currency) => {
                  onCurrencyChange(currency);
                  onHidePicker();
                }}
                tabIndex={-1}
              />
            );
          })}
        </div>
        {otherCurrencies.length > 0 && (
          <div className="flex items-center justify-between border-b border-neutral-500 p-2">
            <p className="text-preset-5 text-neutral-200 uppercase">
              Other Currencies
            </p>
            <p className="text-preset-5 text-neutral-200">
              {otherCurrencies.length}
            </p>
          </div>
        )}
        <div className="flex flex-col">
          {otherCurrencies.map((otherCurrency) => {
            return (
              <CurrencyItem
                id={otherCurrency.iso_code}
                key={otherCurrency.iso_code}
                currency={otherCurrency}
                isSelected={otherCurrency.iso_code === selectedCurrencyCode}
                onPick={(currency) => {
                  onCurrencyChange(currency);
                  onHidePicker();
                }}
                tabIndex={-1}
              />
            );
          })}
        </div>
        {popularCurrencies.length === 0 && otherCurrencies.length === 0 && (
          <p className="text-preset-5 text-center text-neutral-200">
            No currencies found
          </p>
        )}
      </div>
    </div>
  );
}
