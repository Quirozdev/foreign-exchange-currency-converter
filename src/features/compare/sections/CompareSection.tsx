import { useGetRates } from "@/features/rates/hooks/use-get-rates";
import { formatDateToIsoStringWithoutTime } from "@/shared/lib/dates";
import { CurrencyComparison } from "../components/CurrencyComparison";
import { CompareSectionSkeleton } from "../components/CompareSectionSkeleton";
import { CompareSectionEmpty } from "../components/CompareSectionEmpty";
import { useRates } from "@/features/rates/hooks/use-rates";

export function CompareSection() {
  const { sendCurrency, sendValue } = useRates();

  const {
    isLoading,
    data: rates,
    error,
  } = useGetRates({
    baseCurrencyCode: sendCurrency,
    from: formatDateToIsoStringWithoutTime(new Date()),
    to: formatDateToIsoStringWithoutTime(new Date()),
  });

  if (isLoading) {
    return <CompareSectionSkeleton />;
  }

  if (
    !sendValue ||
    Number(sendValue) === 0 ||
    error ||
    !rates ||
    rates.length === 0
  ) {
    return <CompareSectionEmpty />;
  }

  const ratesWithoutOwnSendCurrency = rates.filter(
    (rateData) => rateData.quote !== sendCurrency,
  );

  return (
    <section className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 p-4 md:gap-y-5 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
        <div className="flex items-center gap-x-3">
          <p className="text-preset-4 text-neutral-200 uppercase">
            Multi-Currency
          </p>
          <p className="text-preset-3-medium text-neutral-50 uppercase">
            {sendValue} from {sendCurrency}
          </p>
        </div>
        <p className="text-preset-5 text-neutral-50 uppercase opacity-70">
          {ratesWithoutOwnSendCurrency.length} pairs
        </p>
      </div>
      <div className="flex max-h-162.5 scrollbar-thin scrollbar-thumb-neutral-200 flex-col gap-y-3 overflow-y-auto p-1">
        {ratesWithoutOwnSendCurrency.map((rateData) => {
          return (
            <CurrencyComparison key={rateData.quote} rateData={rateData} />
          );
        })}
      </div>
    </section>
  );
}
