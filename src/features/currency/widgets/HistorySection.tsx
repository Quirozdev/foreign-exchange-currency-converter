import { useState } from "react";
import { HistoryIntervalPicker } from "../components/HistoryIntervalPicker";
import { intervals } from "@/shared/model/intervals.constants";
import type { Interval } from "@/shared/model/intervals.types";
import { HistoryChart } from "../components/HistoryChart";
import { useGetRateBetweenDates } from "../hooks/use-get-rate-between-dates";

interface Props {
  sendCurrency: string;
  receiveCurrency: string;
}

export function HistorySection({ sendCurrency, receiveCurrency }: Props) {
  const [selectedInterval, setSelectedInterval] = useState<Interval>(
    intervals[2].value,
  );

  const { isLoading, data } = useGetRateBetweenDates({
    baseCurrencyCode: sendCurrency,
    quoteCurrencyCode: receiveCurrency,
    from: "2026-09-12",
    to: "2026-10-12",
  });

  return (
    <section className="flex flex-col gap-y-4 md:gap-y-5">
      <div className="flex flex-col gap-y-5 xl:flex-row xl:items-center">
        <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 md:gap-4">
          <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
            <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
              Open
            </p>
            <p className="text-preset-2 text-neutral-50">0.8516</p>
          </div>
          <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
            <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
              Last
            </p>
            <p className="text-preset-2 text-neutral-50">0.8530</p>
          </div>
          <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
            <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
              Change
            </p>
            <p className="text-preset-2 text-green-500">+0.0014</p>
          </div>
          <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
            <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
              % Change
            </p>
            <p className="text-preset-2 text-green-500">▲ +0.16%</p>
          </div>
        </div>
        <HistoryIntervalPicker
          selectedInterval={selectedInterval}
          onSelect={setSelectedInterval}
        />
      </div>
      <div className="rounded-16 flex flex-col gap-y-5 border border-neutral-600 bg-neutral-700 px-3 py-4 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-preset-3-medium text-neutral-50">USD/EUR</p>
          <p className="text-preset-5 text-neutral-50">
            0.8530 · MAY 14 16:00 CET
          </p>
        </div>

        {isLoading ? <></> : <HistoryChart ratesHistory={data} />}
      </div>
    </section>
  );
}
