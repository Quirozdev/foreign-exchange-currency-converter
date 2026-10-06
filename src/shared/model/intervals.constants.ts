import type { Interval } from "./intervals.types";

export const intervals: { label: string; value: Interval }[] = [
  {
    label: "1D",
    value: "1-day",
  },
  {
    label: "1W",
    value: "1-week",
  },
  {
    label: "1M",
    value: "1-month",
  },
  {
    label: "3M",
    value: "3-months",
  },
  {
    label: "1Y",
    value: "1-year",
  },
  {
    label: "5Y",
    value: "5-years",
  },
] as const;
