export interface Favorite {
  sendCurrency: string;
  receiveCurrency: string;
  rate: number;
  date: string;
  changePercentage: number;
}

export type FavoritePair = Pick<Favorite, "sendCurrency" | "receiveCurrency">;
