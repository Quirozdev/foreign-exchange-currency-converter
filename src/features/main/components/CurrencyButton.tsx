import ChevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { currencies } from "../model/currencies.constants";

interface Props {
  selectedCurrencyCode: string;
}

export function CurrencyButton({ selectedCurrencyCode }: Props) {
  const selectedCurrency = currencies.find(
    (currency) => currency.code === selectedCurrencyCode,
  )!;

  return (
    <button className="rounded-8 flex shrink-0 cursor-pointer items-center gap-x-2 bg-neutral-500 p-2.5 outline outline-neutral-400 hover:bg-neutral-400 hover:outline-0 focus:shadow-[0_0_0_3px_var(--color-neutral-600),0_0_0_4px_var(--color-lime-500)]">
      <img
        src={selectedCurrency.icon}
        alt={`${selectedCurrency.name} icon`}
        className="h-5 w-5 rounded-full"
      />
      <p className="text-preset-4 text-neutral-50">{selectedCurrency.code}</p>
      <img src={ChevronDownIcon} alt="Chevron down icon" />
    </button>
  );
}
