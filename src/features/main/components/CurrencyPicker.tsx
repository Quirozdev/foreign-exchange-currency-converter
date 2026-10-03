import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { currencies } from "../model/currencies.constants";
import { SearchInput } from "./SearchInput";

interface Props {
  selectedCurrencyCode: string;
}

export function CurrencyPicker({ selectedCurrencyCode, ...props }: Props) {
  const selectedCurrency = currencies.find(
    (currency) => currency.code === selectedCurrencyCode,
  )!;

  return (
    <div className="relative">
      <button
        className="rounded-8 flex shrink-0 cursor-pointer items-center gap-x-2 bg-neutral-500 p-2.5 outline outline-neutral-400 hover:bg-neutral-400 hover:outline-0 focus:shadow-[0_0_0_3px_var(--color-neutral-600),0_0_0_4px_var(--color-lime-500)]"
        {...props}
      >
        <img
          src={selectedCurrency.icon}
          alt={`${selectedCurrency.name} icon`}
          className="h-5 w-5 rounded-full"
        />
        <p className="text-preset-4 text-neutral-50">{selectedCurrency.code}</p>
        <img src={ChevronDownIcon} alt="Chevron down icon" />
      </button>

      <div className="rounded-8 absolute top-full right-0 z-10 mt-5 flex min-h-10 min-w-40 flex-col gap-y-2.5 bg-neutral-600 p-2 shadow-[0_20px_60px_0_rgba(10,10,10,0.5)] outline outline-neutral-400">
        <SearchInput placeholder="Search currencies..." />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between border-b border-neutral-500 p-2">
            <p className="text-preset-5 text-neutral-200 uppercase">Popular</p>
            <p className="text-preset-5 text-neutral-200">3</p>
          </div>
          <div className="flex items-center justify-between border-b border-neutral-500 p-2">
            <p className="text-preset-5 text-neutral-200 uppercase">
              Other Currencies
            </p>
            <p className="text-preset-5 text-neutral-200">52</p>
          </div>
        </div>
      </div>
    </div>
  );
}
