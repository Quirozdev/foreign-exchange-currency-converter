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

export const SECOND_TO_MS = 1000;
export const MINUTE_TO_MS = 60 * SECOND_TO_MS;
export const HOUR_TO_MS = 60 * MINUTE_TO_MS;
export const DAY_TO_MS = 24 * HOUR_TO_MS;
// aproximations
export const YEAR_TO_MS = 365.25 * DAY_TO_MS;
export const MONTH_TO_MS = YEAR_TO_MS / 12;

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
