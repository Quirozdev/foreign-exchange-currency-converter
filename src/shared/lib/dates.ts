import {
  DAY_TO_MS,
  HOUR_TO_MS,
  MINUTE_TO_MS,
  MONTH_TO_MS,
  MONTHS,
  SECOND_TO_MS,
  YEAR_TO_MS,
} from "../model/dates.constants";
import type { DateParams } from "../model/dates.types";

export function extractDateComponentsFromIsoStringDateWithoutTime(
  date: string,
) {
  const [year, month, day] = date.split("-");
  return { year: Number(year), month: Number(month) - 1, day: Number(day) };
}

export function extractDatePartsFromDate(date: Date) {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);

  const values = new Map(dateParts.map(({ type, value }) => [type, value]));

  return {
    timeZoneName: values.get("timeZoneName"),
    year: values.get("year"),
    month: values.get("month"),
    day: values.get("day"),
    hour: values.get("hour"),
    minute: values.get("minute"),
  };
}

export function formatIsoStringToLongDateString(
  date: string,
  withYear: boolean = false,
) {
  const { year, month, day } =
    extractDateComponentsFromIsoStringDateWithoutTime(date);
  const parsedMonth = MONTHS[month];
  const parsedDay = day < 9 ? `0${day}` : day;
  if (withYear) {
    return `${parsedMonth} ${parsedDay}, ${year}`;
  }
  return `${parsedMonth} ${parsedDay}`;
}

export function formatDateToIsoStringWithoutTime(date: Date) {
  let day: number | string = date.getDate();
  let month: number | string = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}

export function subtractFromDate(
  date: Date,
  { years, months, days }: Partial<DateParams>,
) {
  const result = new Date(date);
  if (years) {
    result.setFullYear(result.getFullYear() - years);
  }
  if (months) {
    result.setMonth(result.getMonth() - months);
  }
  if (days) {
    result.setDate(result.getDate() - days);
  }
  return result;
}

export function getDifferenceBetweenDatesInMilliseconds(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

// this function aproximates the differences
export function getDifferencePartsBetweenDates(from: Date, to: Date) {
  let remainingMs = getDifferenceBetweenDatesInMilliseconds(to, from);

  const years = Math.floor(remainingMs / YEAR_TO_MS);
  remainingMs %= YEAR_TO_MS;

  const months = Math.floor(remainingMs / MONTH_TO_MS);
  remainingMs %= MONTH_TO_MS;

  const days = Math.floor(remainingMs / DAY_TO_MS);
  remainingMs %= DAY_TO_MS;

  const hours = Math.floor(remainingMs / HOUR_TO_MS);
  remainingMs %= HOUR_TO_MS;

  const minutes = Math.floor(remainingMs / MINUTE_TO_MS);
  remainingMs %= MINUTE_TO_MS;

  const seconds = Math.floor(remainingMs / SECOND_TO_MS);

  return { years, months, days, hours, minutes, seconds };
}

export function getRelativeTimeStringValueBetweenDates(from: Date, to: Date) {
  const { years, months, days, hours, minutes, seconds } =
    getDifferencePartsBetweenDates(from, to);

  if (years > 0 || months > 0 || days > 0) {
    const extracted = extractDatePartsFromDate(from);
    const extractedMonthIndex = Number(extracted.month as string);
    return `${extracted.day} ${MONTHS[extractedMonthIndex - 1]}`;
  } else if (hours > 0) {
    return `${hours}H`;
  } else if (minutes > 0) {
    return `${minutes}M`;
  } else {
    return `${seconds}S`;
  }
}
