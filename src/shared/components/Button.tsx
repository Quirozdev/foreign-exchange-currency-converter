import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface Props extends React.ComponentPropsWithRef<"button"> {
  icon?: ReactNode;
  text?: string;
  activeIcon?: ReactNode;
  activeText?: string;
}

export function Button({
  className,
  icon,
  text,
  activeIcon,
  activeText,
  onClick,
  ...props
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      className={cn(
        "rounded-8 flex cursor-pointer items-center justify-center gap-x-2 bg-neutral-600 px-3 py-2 text-neutral-50 outline outline-neutral-500 hover:bg-neutral-500 hover:outline-neutral-400 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)] disabled:text-neutral-200 disabled:outline-neutral-300",
        isActive &&
          "bg-lime-500 text-neutral-900 outline-lime-500 hover:bg-lime-500! hover:opacity-80",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
        setIsActive(true);
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 2000);
      }}
      {...props}
    >
      {icon && !isActive && icon}
      {activeIcon && isActive && activeIcon}
      {text && !isActive && (
        <span className="text-preset-5-medium">{text}</span>
      )}
      {activeText && isActive && (
        <span className="text-preset-5-medium">{activeText}</span>
      )}
    </button>
  );
}
