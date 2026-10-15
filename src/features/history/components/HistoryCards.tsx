import { cn } from "@/shared/lib/cn";
import { HistoryCardsContainer } from "./HistoryCardsContainer";
import { calculateChangePercentageBetweenRates } from "@/features/rates/lib/rates";

interface Props {
  firstRate: number;
  lastRate: number;
}

export function HistoryCards({ firstRate, lastRate }: Props) {
  const change = Number((lastRate - firstRate).toFixed(4));
  const changePercentage = calculateChangePercentageBetweenRates(
    lastRate,
    firstRate,
  ).toFixed(2);

  return (
    <HistoryCardsContainer>
      <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
        <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
          Open
        </p>
        <p className="text-preset-2 text-neutral-50">{firstRate}</p>
      </div>
      <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
        <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
          Last
        </p>
        <p className="text-preset-2 text-neutral-50">{lastRate}</p>
      </div>
      <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
        <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
          Change
        </p>
        <p
          className={cn(
            "text-preset-2",
            change >= 0 ? "text-green-500" : "text-red-500",
          )}
        >
          {change >= 0 ? "+" : undefined}
          {change}
        </p>
      </div>
      <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
        <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
          % Change
        </p>
        <p
          className={cn(
            "text-preset-2 text-green-500",
            change >= 0 ? "text-green-500" : "text-red-500",
          )}
        >
          {change >= 0 ? "▲" : "▼"} {change >= 0 ? "+" : undefined}
          {changePercentage}%
        </p>
      </div>
    </HistoryCardsContainer>
  );
}
