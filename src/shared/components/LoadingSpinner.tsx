import { cn } from "../lib/cn";

type Props = React.ComponentPropsWithRef<"span">;

export function LoadingSpinner({ className, ...props }: Props) {
  return (
    <span
      className={cn(
        "h-4 w-4 animate-spin rounded-full border-t border-r border-lime-500",
        className,
      )}
      {...props}
    ></span>
  );
}
