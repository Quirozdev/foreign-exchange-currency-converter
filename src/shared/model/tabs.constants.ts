import type { TabValue } from "./tabs.types";

export const tabs: { label: string; value: TabValue; count?: number }[] = [
  {
    label: "History",
    value: "history",
  },
  {
    label: "Compare",
    value: "compare",
  },
  {
    label: "Favorites",
    value: "favorites",
    count: 10,
  },
  {
    label: "Log",
    value: "log",
    count: 8,
  },
] as const;
