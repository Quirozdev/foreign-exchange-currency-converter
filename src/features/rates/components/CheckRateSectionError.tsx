import { Button } from "@/shared/components/Button";

interface Props {
  isRetrying: boolean;
  onRetry: () => void;
}

export function CheckRateSectionError({ isRetrying, onRetry }: Props) {
  return (
    <section className="flex flex-col gap-y-4">
      <h1 className="text-preset-2 text-neutral-50 uppercase">
        Check the rate
      </h1>
      <div className="rounded-20 flex h-112.5 flex-col items-center justify-center gap-y-4 bg-neutral-700 px-4 py-10 shadow-[0_12px_40px_0_rgba(0,0,0,0.4)] md:h-56">
        <p className="text-preset-2 text-center text-neutral-100">
          An error ocurred
        </p>
        <p className="text-preset-4 text-center text-neutral-200">
          We failed to retrieve exchange rate between the currencies.
        </p>
        <Button
          isActive={isRetrying}
          text="Retry"
          activeText="Retrying..."
          onClick={onRetry}
        />
      </div>
    </section>
  );
}
