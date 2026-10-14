import { cn } from "@/shared/lib/cn";

type Props = React.ComponentPropsWithRef<"input">;

export function AmountInput({ className, ...props }: Props) {
  return (
    <input
      type="number"
      min={0}
      className={cn(
        "text-preset-1 focus:rounded-8 md:text-preset-1-tablet w-full [appearance:textfield] border-b border-neutral-600 text-neutral-50 outline-none placeholder:text-neutral-200 hover:not-focus:border-neutral-200 focus:shadow-[0_0_0_2px_var(--color-neutral-600),0_0_0_4px_var(--color-lime-500)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        className,
      )}
      placeholder="0"
      {...props}
    />
  );
}
