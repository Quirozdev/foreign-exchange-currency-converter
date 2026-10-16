import { createContext } from "react";
import type { Favorite } from "../model/favorites.types";

interface FavoritesContextProps {
  favorites: Favorite[];
  addFavorite: (favorite: Omit<Favorite, "changePercentage">) => Promise<void>;
  removeFavorite: (sendCurrency: string, receiveCurrency: string) => void;
  alreadyHasPair: (
    favorite: Omit<Favorite, "changePercentage" | "rate" | "date">,
  ) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps | null>(
  null,
);
