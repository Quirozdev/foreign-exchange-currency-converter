import { useState, type ReactNode } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { getItemOrDefault, setItem } from "@/shared/lib/local-storage";
import { FAVORITES_STORAGE_KEY } from "../model/favorites.constant";
import type { Favorite } from "../model/favorites.types";
import { getRates } from "@/features/rates/services/get-rates";
import {
  extractDateComponentsFromIsoStringDateWithoutTime,
  formatDateToIsoStringWithoutTime,
  subtractFromDate,
} from "@/shared/lib/dates";
import { calculateChangePercentageBetweenRates } from "@/features/rates/lib/rates";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState(() =>
    getItemOrDefault<Favorite[]>(FAVORITES_STORAGE_KEY, []),
  );

  function alreadyHasPair(favorite: Omit<Favorite, "changePercentage">) {
    return !!favorites.find((currentFavorite) => {
      return (
        currentFavorite.sendCurrency === favorite.sendCurrency &&
        currentFavorite.receiveCurrency === favorite.receiveCurrency
      );
    });
  }

  function getFavoritesWithoutPair(
    favorites: Favorite[],
    sendCurrency: string,
    receiveCurrency: string,
  ) {
    return favorites.filter((currentFavorite) => {
      return !(
        currentFavorite.sendCurrency === sendCurrency &&
        currentFavorite.receiveCurrency === receiveCurrency
      );
    });
  }

  async function calculateFavoritePercentageChange(
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

  async function addFavorite(favorite: Omit<Favorite, "changePercentage">) {
    const changePercentage = await calculateFavoritePercentageChange(favorite);
    const favoriteWithChangePercentage: Favorite = {
      ...favorite,
      changePercentage,
    };
    const updatedFavorites = alreadyHasPair(favoriteWithChangePercentage)
      ? favorites.map((currentFavorite) => {
          if (
            currentFavorite.sendCurrency ===
              favoriteWithChangePercentage.sendCurrency &&
            currentFavorite.receiveCurrency ===
              favoriteWithChangePercentage.receiveCurrency
          ) {
            return favoriteWithChangePercentage;
          }
          return currentFavorite;
        })
      : [...favorites, favoriteWithChangePercentage];
    setItem(FAVORITES_STORAGE_KEY, updatedFavorites);
    setFavorites(updatedFavorites);
  }

  function removeFavorite(sendCurrency: string, receiveCurrency: string) {
    const updatedFavorites = getFavoritesWithoutPair(
      favorites,
      sendCurrency,
      receiveCurrency,
    );
    setItem(FAVORITES_STORAGE_KEY, updatedFavorites);
    setFavorites(updatedFavorites);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
