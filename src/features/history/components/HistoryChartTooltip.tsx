import type { TooltipContentProps } from "recharts";
import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import { getCurrencyMetadataWithDefaults } from "@/features/rates/utils/currency-metadata";
import { useRates } from "@/features/rates/hooks/use-rates";

type Props = TooltipContentProps;

export function HistoryChartTooltip({ active, payload, label }: Props) {
  const { sendCurrency, receiveCurrency } = useRates();

  if (active && payload && payload.length) {
    const sendCurrencyMetadata = getCurrencyMetadataWithDefaults(sendCurrency);
    const receiveCurrencyMetadata =
      getCurrencyMetadataWithDefaults(receiveCurrency);

    return (
      <div className="rounded-8 text-preset-5 flex flex-col gap-y-2 bg-neutral-900 p-3 text-center">
        <div className="flex items-center justify-between gap-4">
          <img
            src={sendCurrencyMetadata.icon}
            alt={sendCurrency}
            className="h-5 w-5"
          />
          <img src={ArrowRightIcon} alt="Arrow Right icon" />
          <img
            src={receiveCurrencyMetadata.icon}
            alt={receiveCurrency}
            className="h-5 w-5"
          />
        </div>
        <div>
          <p className="text-neutral-200">{label}</p>
          {payload.map((pld) => (
            <div key={pld.dataKey as string}>
              <div style={{ color: pld.color }}>Rate {pld.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
