interface Props {
  sendCurrency: string;
  receiveCurrency: string;
}

export function HistorySectionEmpty({ sendCurrency, receiveCurrency }: Props) {
  return (
    <section className="flex flex-col items-center gap-y-4 px-4 py-10">
      <p className="text-preset-2 text-center text-neutral-100">
        No chart data available
      </p>
      <p className="text-preset-4 text-center text-neutral-200">
        We couldn't load rate history for {sendCurrency}/{receiveCurrency} right
        now. This usually clears up in a minute.
      </p>
    </section>
  );
}
