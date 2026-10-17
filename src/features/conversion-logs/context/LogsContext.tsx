import { createContext } from "react";
import type { Log } from "../model/logs.types";

interface LogsContextProps {
  logs: Log[];
  alreadyHasLoggedPair: (
    log: Pick<
      Log,
      "sendCurrency" | "sendValue" | "receiveCurrency" | "receiveValue"
    >,
  ) => boolean;
  addLog: (log: Omit<Log, "id">) => void;
  removeLog: (id: string) => void;
  clearLogs: () => void;
}

export const LogsContext = createContext<LogsContextProps | null>(null);
