import { useEffect, useRef, useState } from "react";

type Props = React.ComponentPropsWithRef<"div"> & {
  speed?: number;
};

export function Marquee({ children, speed = 60 }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    function updateDuration() {
      const distance = (content as HTMLDivElement).getBoundingClientRect()
        .width;
      setDuration(distance / speed);
    }

    updateDuration();

    const observer = new ResizeObserver(updateDuration);
    observer.observe(content);

    return () => observer.disconnect();
  }, [speed]);

  return (
    <div className="group h-full w-full overflow-hidden">
      <div
        className="animate-marquee group-hover:pause-animation flex w-max motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        <div ref={contentRef} className="flex shrink-0">
          {children}
        </div>
        <div aria-hidden="true" className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
