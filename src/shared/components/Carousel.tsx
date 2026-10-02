type Props = React.ComponentPropsWithRef<"div">;

export function Carousel({ children }: Props) {
  return <div className="h-full w-full overflow-hidden">{children}</div>;
}
