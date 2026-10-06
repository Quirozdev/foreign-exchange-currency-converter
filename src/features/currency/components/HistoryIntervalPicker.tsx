import { cn } from "@/shared/lib/cn";
import { intervals } from "@/shared/model/intervals.constants";
import type { Interval } from "@/shared/model/intervals.types";

interface Props {
  selectedInterval: Interval;
  onSelect: (interval: Interval) => void;
}

export function HistoryIntervalPicker({ selectedInterval, onSelect }: Props) {
  return (
    <div className="rounded-8 flex w-fit items-center bg-neutral-700 p-0.5">
      {intervals.map((interval) => {
        return (
          <button
            key={interval.value}
            className={cn(
              "text-preset-5 grid cursor-pointer place-items-center px-4 py-3 text-neutral-200",
              selectedInterval === interval.value &&
                "rounded-8 bg-neutral-500 text-neutral-50",
            )}
            onClick={() => onSelect(interval.value)}
          >
            {interval.label}
          </button>
        );
      })}
    </div>
  );
}
