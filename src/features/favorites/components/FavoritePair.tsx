import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import { FilledStarIcon } from "@/features/rates/icons/FilledStarIcon";
import { Button } from "@/shared/components/Button";
import { cn } from "@/shared/lib/cn";
import { useFavorites } from "../hooks/use-favorites";
import { CurrencyPairSetterContainer } from "@/shared/components/CurrencyPairSetterContainer";
import { useGetRates } from "@/features/rates/hooks/use-get-rates";
import {
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import { calculateChangePercentageBetweenRates } from "@/features/rates/lib/rates";
import { Skeleton } from "@/shared/components/Skeleton";

interface Props {
  sendCurrency: string;
  receiveCurrency: string;
}

export function FavoritePair({ sendCurrency, receiveCurrency }: Props) {
  const { removeFavorite } = useFavorites();

  const currentDate = new Date();

  const { data: rateData, isLoading } = useGetRates({
    baseCurrencyCode: sendCurrency,
    quoteCurrencyCode: receiveCurrency,
    from: formatDateToIsoStringWithoutTime(
      subtractFromDate(currentDate, { days: 1 }),
    ),
    to: formatDateToIsoStringWithoutTime(currentDate),
  });

  if (isLoading) {
    return <Skeleton className="h-16" />;
  }

  const rate = rateData ? rateData[rateData.length - 1].rate : null;

  const changePercentage = rateData
    ? calculateChangePercentageBetweenRates(
        rateData[rateData.length - 1].rate,
        rateData[0].rate,
      )
    : null;

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
          {rate !== null ? (
            <p className="text-preset-3 text-neutral-50">{rate}</p>
          ) : (
            <p className="text-preset-3 text-neutral-50">Unknown Rate</p>
          )}
          {changePercentage !== null ? (
            <p
              className={cn(
                "text-preset-6",
                changePercentage > 0 ? "text-green-500" : "text-red-500",
              )}
            >
              {changePercentage > 0 ? "▲" : "▼"} {changePercentage > 0 && "+"}
              {changePercentage.toFixed(2)}
            </p>
          ) : (
            <p className="text-preset-6 text-red-500">Unknown % Change</p>
          )}
        </div>
        <Button
          aria-label="Remove pair from favorites"
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
