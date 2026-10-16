import { useRates } from "@/features/rates/hooks/use-rates";
import { cn } from "../lib/cn";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  sendCurrency: string;
  receiveCurrency: string;
}

export function CurrencyPairSetterContainer({
  sendCurrency,
  receiveCurrency,
  className,
  children,
  ...props
}: Props) {
  const { changeSendCurrency, changeReceiveCurrency } = useRates();

  function setFavoriteCurrencyPair() {
    changeSendCurrency(sendCurrency);
    changeReceiveCurrency(receiveCurrency);
  }

  return (
    <div
      onClick={setFavoriteCurrencyPair}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setFavoriteCurrencyPair();
        }
      }}
      tabIndex={0}
      className={cn(
        "rounded-10 flex items-center justify-between border border-neutral-500 bg-neutral-600 p-3 outline-none focus:shadow-[0_0_0_2px_var(--color-neutral-900),0_0_0_4px_var(--color-lime-500)] md:px-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
