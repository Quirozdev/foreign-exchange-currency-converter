import { MONTHS } from "../model/dates.constants";
import type { DateParams } from "../model/dates.types";

export function extractDateComponentsFromIsoStringDateWithoutTime(
  date: string,
) {
  const [year, month, day] = date.split("-");
  return { year: Number(year), month: Number(month) - 1, day: Number(day) };
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
