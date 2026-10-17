export function LogSectionEmpty() {
  return (
    <section className="flex flex-col items-center gap-y-4 px-4 py-10">
      <p className="text-preset-2 text-center text-neutral-100">
        No conversions logged yet
      </p>
      <p className="text-preset-4 text-center text-neutral-200">
        Every conversion is recorded here automatically when you tap LOG
        CONVERSION. Your log is private to this session and this browser.
      </p>
    </section>
  );
}
