import type { ClassValue } from "clsx";
import clsx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "preset-1",
        "preset-1-tablet",
        "preset-2",
        "preset-2-bold",
        "preset-3",
        "preset-3-medium",
        "preset-3-bold",
        "preset-4",
        "preset-5",
        "preset-5-medium",
        "preset-6",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
