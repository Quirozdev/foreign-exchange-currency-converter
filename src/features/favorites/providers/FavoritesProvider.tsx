import { useState, type ReactNode } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { getItemOrDefault, setItem } from "@/shared/lib/local-storage";
import { FAVORITES_STORAGE_KEY } from "../model/favorites.constant";
import type { Favorite } from "../model/favorites.types";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState(() =>
    getItemOrDefault<Favorite[]>(FAVORITES_STORAGE_KEY, []),
  );

  function alreadyHasPair(favorite: Favorite) {
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

  function addFavorite(favorite: Favorite) {
    const updatedFavorites = alreadyHasPair(favorite)
      ? favorites.map((currentFavorite) => {
          if (
            currentFavorite.sendCurrency === favorite.sendCurrency &&
            currentFavorite.receiveCurrency === favorite.receiveCurrency
          ) {
            return favorite;
          }
          return currentFavorite;
        })
      : [...favorites, favorite];
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
