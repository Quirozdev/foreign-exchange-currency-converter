type Props = React.ComponentPropsWithoutRef<"div">;

export function HistoryCardsContainer({ children }: Props) {
  return (
    <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 md:gap-4">
      {children}
    </div>
  );
}
