import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface Props extends React.ComponentPropsWithRef<"button"> {
  icon?: ReactNode;
  text?: string;
  activeIcon?: ReactNode;
  activeText?: string;
  loadingElement?: ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
}

export function Button({
  className,
  icon,
  text,
  activeIcon,
  activeText,
  loadingElement,
  disabled,
  onClick,
  ...props
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      disabled={disabled || isLoading}
      className={cn(
        "rounded-8 flex cursor-pointer items-center justify-center gap-x-2 bg-neutral-600 px-3 py-2 text-neutral-50 outline outline-neutral-500 hover:bg-neutral-500 hover:outline-neutral-400 focus:shadow-[0_0_0_3px_var(--color-neutral-700),0_0_0_4px_var(--color-lime-500)] disabled:cursor-not-allowed disabled:text-neutral-200 disabled:outline-neutral-300",
        isActive &&
          "bg-lime-500 text-neutral-900 outline-lime-500 hover:bg-lime-500 hover:opacity-80",
        className,
      )}
      onClick={async (e) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          await onClick?.(e);
        } finally {
          setIsLoading(false);
        }
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
      {!isLoading && icon && !isActive && icon}
      {!isLoading && activeIcon && isActive && activeIcon}
      {!isLoading && text && !isActive && (
        <span className="text-preset-5-medium">{text}</span>
      )}
      {!isLoading && activeText && isActive && (
        <span className="text-preset-5-medium">{activeText}</span>
      )}
      {isLoading && loadingElement}
    </button>
  );
}
