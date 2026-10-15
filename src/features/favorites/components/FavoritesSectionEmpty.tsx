export function FavoritesSectionEmpty() {
  return (
    <section className="flex flex-col items-center gap-y-4 px-4 py-10">
      <p className="text-preset-2 text-center text-neutral-100">
        No pinned pairs yet
      </p>
      <p className="text-preset-4 text-center text-neutral-200">
        Pin a pair to track its rate here. Tap the star icon on any conversion
        or comparison row.
      </p>
    </section>
  );
}
