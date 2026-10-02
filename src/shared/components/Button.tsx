import { cn } from "../lib/cn";

interface Props extends React.ComponentPropsWithRef<"button"> {
  icon?: string;
  text?: string;
}

export function Button({ className, icon, text, ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-8 flex cursor-pointer items-center justify-center gap-x-2 bg-neutral-600 px-3 py-2 text-neutral-50 outline outline-neutral-500 hover:bg-neutral-500 hover:outline-neutral-400 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)] disabled:text-neutral-200 disabled:outline-neutral-300",
        className,
      )}
      {...props}
    >
      {icon && <img src={icon} alt={text} />}
      {text && <span className="text-preset-5-medium block">{text}</span>}
    </button>
  );
}
