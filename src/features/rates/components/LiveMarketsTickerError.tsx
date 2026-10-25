import { Button } from "@/shared/components/Button";

interface Props {
  isRetrying: boolean;
  onRetry: () => void;
}

export function LiveMarketsTickerError({ isRetrying, onRetry }: Props) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-x-4 bg-neutral-700 pl-4">
      <p className="text-preset-5 hidden text-center text-neutral-200 md:inline-block">
        We failed to retrieve the live markets ticker information.
      </p>
      <Button
        isActive={isRetrying}
        text="Retry"
        activeText="Retrying..."
        onClick={onRetry}
      />
    </div>
  );
}
