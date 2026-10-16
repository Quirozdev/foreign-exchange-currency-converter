import {
  extractDateComponentsFromIsoStringDateWithoutTime,
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import type { Favorite } from "../model/favorites.types";
import { calculateChangePercentageBetweenRates } from "@/features/rates/lib/rates";
import { getRates } from "@/features/rates/services/get-rates";

export async function calculateFavoritePercentageChange(
  favorite: Omit<Favorite, "changePercentage">,
) {
  const { day, month, year } =
    extractDateComponentsFromIsoStringDateWithoutTime(favorite.date);
  const currentDate = new Date(year, month, day);
  // should be 2 elements, the first one the previous day and the last (second one) the current day
  const rates = await getRates(
    favorite.sendCurrency,
    favorite.receiveCurrency,
    formatDateToIsoStringWithoutTime(
      subtractFromDate(currentDate, { days: 1 }),
    ),
    favorite.date,
  );
  return calculateChangePercentageBetweenRates(
    rates[rates.length - 1].rate,
    rates[0].rate,
  );
}
