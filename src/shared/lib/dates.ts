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

export function extractDateComponentsFromIsoStringDateWithoutTime(
  date: string,
) {
  const [year, month, day] = date.split("-");
  return { year: Number(year), month: Number(month) - 1, day: Number(day) };
}

export function formatIsoStringToLongDateString(date: string) {
  console.log(date);
  const { month, day } =
    extractDateComponentsFromIsoStringDateWithoutTime(date);
  const parsedMonth = MONTHS[month];
  const parsedDay = day < 9 ? `0${day}` : day;
  return `${parsedMonth} ${parsedDay}`;
}
