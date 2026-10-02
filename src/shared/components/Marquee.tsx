type Props = React.ComponentPropsWithRef<"div">;

export function Marquee({ children }: Props) {
  return (
    <div className="group h-full w-full overflow-hidden">
      <div className="animate-marquee group-hover:pause-animation flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="false">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="false">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="false">
          {children}
        </div>
      </div>
    </div>
  );
}
