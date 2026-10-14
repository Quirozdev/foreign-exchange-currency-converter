export function CompareSectionEmpty() {
  return (
    <section className="flex flex-col items-center gap-y-4 px-4 py-10">
      <p className="text-preset-2 text-center text-neutral-100">
        No comparison available
      </p>
      <p className="text-preset-4 text-center text-neutral-200">
        Enter an amount in SEND above to see what your money is worth in other
        currencies.
      </p>
    </section>
  );
}
