export interface Rate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export interface LiveMarketTickerElement {
  base: string;
  quote: string;
  previousRate: number;
  currentRate: number;
  changePercentage: number;
}
