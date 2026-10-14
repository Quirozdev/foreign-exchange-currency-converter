import { Skeleton } from "@/shared/components/Skeleton";
import { HistoryCardsSkeleton } from "./HistoryCardsSkeleton";

type Props = React.ComponentPropsWithoutRef<"section">;

export function HistorySectionSkeleton({ children }: Props) {
  return (
    <section className="flex flex-col gap-y-4 overflow-hidden md:gap-y-5">
      <div className="flex flex-col gap-y-5 xl:flex-row xl:items-center">
        <HistoryCardsSkeleton />
        {children}
      </div>
      <Skeleton className="rounded-16 h-96" />
    </section>
  );
}
