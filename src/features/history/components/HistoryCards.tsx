import { HistoryCardsContainer } from "./HistoryCardsContainer";
import { calculateChangePercentageBetweenRates } from "@/features/rates/lib/rates";
import { HistoryCard } from "./HistoryCard";

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
      <HistoryCard type="rate" label="Open" rate={firstRate} />
      <HistoryCard type="rate" label="Last" rate={lastRate} />
      <HistoryCard type="change" label="Change" change={change} />
      <HistoryCard
        type="change-percentage"
        label="% Change"
        change={change}
        changePercentage={Number(changePercentage)}
      />
    </HistoryCardsContainer>
  );
}
