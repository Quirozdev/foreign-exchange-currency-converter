import { createContext } from "react";
import type { Favorite } from "../model/favorites.types";

interface FavoritesContextProps {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (sendCurrency: string, receiveCurrency: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps | null>(
  null,
);
