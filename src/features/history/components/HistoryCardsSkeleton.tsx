import { Skeleton } from "@/shared/components/Skeleton";
import { HistoryCardsContainer } from "./HistoryCardsContainer";

export function HistoryCardsSkeleton() {
  return (
    <HistoryCardsContainer>
      <Skeleton className="rounded-16 h-20.5" />
      <Skeleton className="rounded-16 h-20.5" />
      <Skeleton className="rounded-16 h-20.5" />
      <Skeleton className="rounded-16 h-20.5" />
    </HistoryCardsContainer>
  );
}
