import type { Favorite } from "./favorites.types";

type FavoritesAction =
  | { type: "upsert"; favorite: Favorite }
  | { type: "remove"; sendCurrency: string; receiveCurrency: string };

type FavoritePair = Pick<Favorite, "sendCurrency" | "receiveCurrency">;

function isSamePair(a: FavoritePair, b: FavoritePair) {
  return (
    a.sendCurrency === b.sendCurrency && a.receiveCurrency === b.receiveCurrency
  );
}

export function favoritesReducer(state: Favorite[], action: FavoritesAction) {
  switch (action.type) {
    case "upsert": {
      const alreadyHasPair = state.some((current) => {
        return isSamePair(current, action.favorite);
      });

      return alreadyHasPair
        ? state.map((current) => {
            return isSamePair(current, action.favorite)
              ? action.favorite
              : current;
          })
        : [...state, action.favorite];
    }

    case "remove": {
      return state.filter((current) => {
        return !(
          current.sendCurrency === action.sendCurrency &&
          current.receiveCurrency === action.receiveCurrency
        );
      });
    }
  }
}
