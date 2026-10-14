import { useState } from "react";
import { HistoryIntervalPicker } from "../components/HistoryIntervalPicker";
import { intervals } from "@/shared/model/intervals.constants";
import type { Interval } from "@/shared/model/intervals.types";
import { HistoryChart } from "../components/HistoryChart";
import {
  extractDatePartsFromDate,
  formatDateToIsoStringWithoutTime,
  formatIsoStringToLongDateString,
  subtractFromDate,
} from "@/shared/lib/dates";
import { HistoryCards } from "../components/HistoryCards";
import { intervalToDateParamsMapping } from "@/shared/model/dates.constants";
import { HistorySectionSkeleton } from "../components/HistorySectionSkeleton";
import { HistorySectionEmpty } from "../components/HistorySectionEmpty";
import { useGetRates } from "@/features/rates/hooks/use-get-rates";

interface Props {
  sendCurrency: string;
  receiveCurrency: string;
}

export function HistorySection({ sendCurrency, receiveCurrency }: Props) {
  const [selectedInterval, setSelectedInterval] = useState<Interval>(
    intervals[2].value,
  );

  const to = new Date();

  const from = subtractFromDate(
    to,
    intervalToDateParamsMapping[selectedInterval],
  );

  const { isLoading, data, error } = useGetRates({
    baseCurrencyCode: sendCurrency,
    quoteCurrencyCode: receiveCurrency,
    from: formatDateToIsoStringWithoutTime(from),
    to: formatDateToIsoStringWithoutTime(to),
  });

  if (isLoading) {
    return (
      <HistorySectionSkeleton>
        <HistoryIntervalPicker
          selectedInterval={selectedInterval}
          onSelect={setSelectedInterval}
        />
      </HistorySectionSkeleton>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <HistorySectionEmpty
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
      />
    );
  }

  const firstRate = Number(data[0].rate.toFixed(4));
  const lastRate = Number(data[data.length - 1].rate.toFixed(4));

  const { hour, minute, timeZoneName } = extractDatePartsFromDate(to);

  return (
    <section className="flex flex-col gap-y-4 overflow-hidden md:gap-y-5">
      <div className="flex flex-col gap-y-5 xl:flex-row xl:items-center">
        <HistoryCards firstRate={firstRate} lastRate={lastRate} />
        <HistoryIntervalPicker
          selectedInterval={selectedInterval}
          onSelect={setSelectedInterval}
        />
      </div>
      <div className="rounded-16 flex flex-col gap-y-5 border border-neutral-600 bg-neutral-700 px-3 py-4 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-preset-3-medium text-neutral-50">
            {sendCurrency}/{receiveCurrency}
          </p>
          <p className="text-preset-5 text-neutral-50 opacity-70">
            {lastRate} ·{" "}
            {formatIsoStringToLongDateString(
              formatDateToIsoStringWithoutTime(to),
            ).toUpperCase()}{" "}
            {hour}:{minute} {timeZoneName}
          </p>
        </div>
        <HistoryChart
          ratesHistory={data}
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
        />
      </div>
    </section>
  );
}
