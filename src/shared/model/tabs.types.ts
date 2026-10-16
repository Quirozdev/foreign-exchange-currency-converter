export type TabValue = "history" | "compare" | "favorites" | "log";

export interface Tab {
  label: string;
  value: TabValue;
  count?: number;
}
