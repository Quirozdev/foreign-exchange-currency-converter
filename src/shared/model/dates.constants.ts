import type { DateParams } from "./dates.types";
import type { Interval } from "./intervals.types";

export const MONTHS: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const intervalToDateParamsMapping: Record<
  Interval,
  Partial<DateParams>
> = {
  "1-day": { days: 1 },
  "1-week": { days: 7 },
  "1-month": { months: 1 },
  "3-months": { months: 3 },
  "1-year": { years: 1 },
  "5-years": { years: 5 },
};
