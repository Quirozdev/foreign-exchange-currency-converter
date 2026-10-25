import { useEffect, useReducer, type ReactNode } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { getItemOrDefault, setItem } from "@/shared/lib/local-storage";
import { FAVORITES_STORAGE_KEY } from "../model/favorites.constant";
import type { FavoritePair } from "../model/favorites.types";
import { favoritesReducer } from "../model/favorites.reducer";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    FAVORITES_STORAGE_KEY,
    (key) => getItemOrDefault<FavoritePair[]>(key, []),
  );

  useEffect(() => {
    setItem(FAVORITES_STORAGE_KEY, favorites);
  }, [favorites]);

  function alreadyHasPair(favorite: FavoritePair) {
    return !!favorites.find((currentFavorite) => {
      return (
        currentFavorite.sendCurrency === favorite.sendCurrency &&
        currentFavorite.receiveCurrency === favorite.receiveCurrency
      );
    });
  }

  async function addFavorite(favorite: FavoritePair) {
    dispatch({
      type: "upsert",
      favorite,
    });
  }

  function removeFavorite(sendCurrency: string, receiveCurrency: string) {
    dispatch({
      type: "remove",
      sendCurrency,
      receiveCurrency,
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        alreadyHasPair,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
