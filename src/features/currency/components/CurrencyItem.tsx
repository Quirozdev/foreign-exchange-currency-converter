import type { Currency } from "../model/currencies.types";
import CheckIcon from "@/assets/images/icon-check.svg";
import { getCurrencyFlagSrc } from "../utils/get-currency-flag-src";

interface Props extends React.ComponentPropsWithRef<"button"> {
  currency: Currency;
  isSelected: boolean;
  onPick: (currency: Currency) => void;
}

export function CurrencyItem({
  currency,
  isSelected,
  onPick,
  ...props
}: Props) {
  return (
    <button
      key={currency.iso_code}
      className="rounded-4 flex items-center gap-x-3 border border-neutral-600 bg-neutral-600 px-2 py-3 outline-none hover:border-neutral-200 focus:border-lime-500"
      onClick={() => onPick(currency)}
      {...props}
    >
      <img
        src={getCurrencyFlagSrc(currency.iso_code)}
        alt={currency.name}
        className="h-5 w-5 rounded-full"
      />
      <p className="text-preset-4 text-neutral-50">{currency.iso_code}</p>
      <p className="text-preset-5 flex-1 text-neutral-200">{currency.name}</p>
      {isSelected && <img src={CheckIcon} alt="Check icon" />}
    </button>
  );
}
