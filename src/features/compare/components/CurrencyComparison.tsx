import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useCurrencies } from "@/features/rates/hooks/use-currencies";
import { useRates } from "@/features/rates/hooks/use-rates";
import { FilledStarIcon } from "@/features/rates/icons/FilledStarIcon";
import { StarIcon } from "@/features/rates/icons/StarIcon";
import { convert } from "@/features/rates/lib/currency";
import type { Rate } from "@/features/rates/model/currencies.types";
import { getCurrencyMetadataWithDefaults } from "@/features/rates/utils/currency-metadata";
import { Button } from "@/shared/components/Button";
import { formatNumberToMoney } from "@/shared/utils/numbers";

interface Props {
  rateData: Rate;
}

export function CurrencyComparison({ rateData }: Props) {
  const { currencies } = useCurrencies();

  const { sendValue } = useRates();

  const { addFavorite } = useFavorites();

  const currencyName =
    currencies?.find((currency) => currency.iso_code === rateData.quote)
      ?.name || "-";

  return (
    <div className="rounded-10 flex items-center gap-x-2.5 border border-neutral-500 bg-neutral-600 p-3 md:gap-x-5 md:px-4">
      <img
        src={getCurrencyMetadataWithDefaults(rateData.quote).icon}
        alt={rateData.quote}
        className="h-6 w-6 rounded-full"
      />
      <div className="flex flex-col gap-y-1.5">
        <p className="text-preset-4 text-neutral-50">{rateData.quote}</p>
        <p className="text-preset-5 text-neutral-200">{currencyName}</p>
      </div>
      <div className="ml-auto flex items-center gap-x-2.5 md:gap-x-5">
        <div className="flex flex-col items-end gap-y-1.5">
          <p className="text-preset-3 text-neutral-50">
            {formatNumberToMoney(
              Number(convert(Number(sendValue), rateData.rate, 2)),
            )}
          </p>
          <p className="text-preset-6 text-neutral-200">@ {rateData.rate}</p>
        </div>
        <Button
          onClick={async () => {
            await addFavorite({
              sendCurrency: rateData.base,
              receiveCurrency: rateData.quote,
              rate: rateData.rate,
              date: rateData.date,
            });
          }}
          className="bg-neutral-600 hover:bg-neutral-500 focus:bg-neutral-600"
          icon={<StarIcon />}
          activeIcon={<FilledStarIcon className="text-lime-500" />}
          loadingElement={
            <FilledStarIcon className="animate-spin text-lime-500" />
          }
        />
      </div>
    </div>
  );
}
