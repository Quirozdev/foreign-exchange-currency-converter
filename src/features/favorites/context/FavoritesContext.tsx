import { createContext } from "react";
import type { FavoritePair } from "../model/favorites.types";

interface FavoritesContextProps {
  favorites: FavoritePair[];
  addFavorite: (favorite: FavoritePair) => Promise<void>;
  removeFavorite: (sendCurrency: string, receiveCurrency: string) => void;
  alreadyHasPair: (favorite: FavoritePair) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps | null>(
  null,
);
