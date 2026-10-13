import { cn } from "../lib/cn";

type Props = React.ComponentPropsWithRef<"div">;

export function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-4 h-11 w-full animate-pulse bg-neutral-500",
        className,
      )}
      {...props}
    ></div>
  );
}
