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
              "text-preset-5 hover:rounded-8 grid cursor-pointer place-items-center px-4 py-3 text-neutral-200 hover:bg-neutral-300 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)]",
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
