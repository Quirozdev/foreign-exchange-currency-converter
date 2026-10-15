import { useState, type ReactNode } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { getItemOrDefault, setItem } from "@/shared/lib/local-storage";
import { FAVORITES_STORAGE_KEY } from "../model/favorites.constant";
import type { Favorite } from "../model/favorites.types";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState(
    getItemOrDefault<Favorite[]>(FAVORITES_STORAGE_KEY, []),
  );

  function addFavorite(favorite: Favorite) {
    const updatedFavorites = [...favorites, favorite];
    setItem(FAVORITES_STORAGE_KEY, updatedFavorites);
    setFavorites(updatedFavorites);
  }

  function removeFavorite(sendCurrency: string, receiveCurrency: string) {
    const updatedFavorites = favorites.filter((currentFavorite) => {
      return !(
        currentFavorite.sendCurrency === sendCurrency &&
        currentFavorite.receiveCurrency === receiveCurrency
      );
    });
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
