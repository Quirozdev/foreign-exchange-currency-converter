import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import { FilledStarIcon } from "@/features/rates/icons/FilledStarIcon";
import { Button } from "@/shared/components/Button";
import { cn } from "@/shared/lib/cn";
import { useFavorites } from "../hooks/use-favorites";
import { CurrencyPairSetterContainer } from "@/shared/components/CurrencyPairSetterContainer";

interface Props {
  sendCurrency: string;
  receiveCurrency: string;
  rate: number;
  changePercentage: number;
}

export function FavoritePair({
  sendCurrency,
  receiveCurrency,
  rate,
  changePercentage,
}: Props) {
  const { removeFavorite } = useFavorites();

  return (
    <CurrencyPairSetterContainer
      sendCurrency={sendCurrency}
      receiveCurrency={receiveCurrency}
    >
      <div className="flex items-center gap-x-2">
        <p className="text-preset-4 text-neutral-50">{sendCurrency}</p>
        <img src={ArrowRightIcon} alt="Arrow right icon" />
        <p className="text-preset-4 text-neutral-50">{receiveCurrency}</p>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="flex flex-col items-end gap-y-2.5">
          <p className="text-preset-3 text-neutral-50">{rate}</p>
          <p
            className={cn(
              "text-preset-6",
              changePercentage > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {changePercentage > 0 ? "▲" : "▼"} {changePercentage > 0 && "+"}
            {changePercentage.toFixed(2)}
          </p>
        </div>
        <Button
          isActive={true}
          onClick={(e) => {
            e.stopPropagation();
            removeFavorite(sendCurrency, receiveCurrency);
          }}
          className="bg-neutral-600 outline-lime-500 hover:bg-neutral-500 focus:bg-neutral-600"
          icon={<FilledStarIcon className="text-lime-500" />}
          activeIcon={<FilledStarIcon className="text-lime-500" />}
        />
      </div>
    </CurrencyPairSetterContainer>
  );
}
