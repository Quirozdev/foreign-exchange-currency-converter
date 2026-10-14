export interface Currency {
  end_date: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  start_date: string;
  symbol: string;
}

export interface Rate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
