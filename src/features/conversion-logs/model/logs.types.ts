export interface Log {
  id: string;
  sendCurrency: string;
  sendValue: number;
  receiveCurrency: string;
  receiveValue: number;
  loggedAt: Date;
}

export type StoredLog = Omit<Log, "loggedAt"> & {
  loggedAt: string;
};
