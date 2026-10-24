import { cn } from "@/shared/lib/cn";

type RateHistoryCard = {
  type: "rate";
  label: string;
  rate: number;
};

type ChangeHistoryCard = {
  type: "change";
  label: string;
  change: number;
};

type ChangePercentageHistoryCard = {
  type: "change-percentage";
  label: string;
  change: number;
  changePercentage: number;
};

type Props = RateHistoryCard | ChangeHistoryCard | ChangePercentageHistoryCard;

export function HistoryCard(props: Props) {
  return (
    <div className="rounded-16 flex flex-col gap-y-4 border border-neutral-600 bg-neutral-700 px-5 py-3">
      <p className="text-preset-4 text-neutral-50 uppercase opacity-70">
        {props.label}
      </p>
      {props.type === "rate" ? (
        <p className="text-preset-2 text-neutral-50">{props.rate}</p>
      ) : props.type === "change" ? (
        <p
          className={cn(
            "text-preset-2",
            props.change >= 0 ? "text-green-500" : "text-red-500",
          )}
        >
          {props.change >= 0 ? "+" : undefined}
          {props.change}
        </p>
      ) : props.type === "change-percentage" ? (
        <p
          className={cn(
            "text-preset-2",
            props.change >= 0 ? "text-green-500" : "text-red-500",
          )}
        >
          {props.change >= 0 ? "▲" : "▼"} {props.change >= 0 ? "+" : undefined}
          {props.changePercentage}%
        </p>
      ) : null}
    </div>
  );
}
