import { useEffect, useReducer, type ReactNode } from "react";
import { getItemOrDefault, setItem } from "@/shared/lib/local-storage";
import { logsReducer } from "../model/logs.reducer";
import { LOGS_STORAGE_KEY } from "../model/logs.constant";
import { type StoredLog, type Log } from "../model/logs.types";
import { LogsContext } from "../context/LogsContext";

interface LogsProviderProps {
  children: ReactNode;
}

export function LogsProvider({ children }: LogsProviderProps) {
  const [logs, dispatch] = useReducer(logsReducer, LOGS_STORAGE_KEY, (key) =>
    getItemOrDefault<StoredLog[]>(key, []).map((log) => {
      return { ...log, loggedAt: new Date(log.loggedAt) };
    }),
  );

  useEffect(() => {
    setItem(LOGS_STORAGE_KEY, logs);
  }, [logs]);

  function alreadyHasLoggedPair(
    log: Pick<
      Log,
      "sendCurrency" | "sendValue" | "receiveCurrency" | "receiveValue"
    >,
  ) {
    return !!logs.find((currentLog) => {
      return (
        currentLog.sendCurrency === log.sendCurrency &&
        currentLog.sendValue === log.sendValue &&
        currentLog.receiveCurrency === log.receiveCurrency &&
        currentLog.receiveValue === log.receiveValue
      );
    });
  }

  function addLog(log: Omit<Log, "id">) {
    const isPairAlreadyLogged = alreadyHasLoggedPair(log);

    if (isPairAlreadyLogged) return;

    dispatch({
      type: "add",
      log: {
        ...log,
        id: crypto.randomUUID(),
      },
    });
  }

  function removeLog(id: string) {
    dispatch({
      type: "remove",
      id,
    });
  }

  function clearLogs() {
    dispatch({
      type: "clear",
    });
  }

  return (
    <LogsContext.Provider
      value={{
        logs,
        alreadyHasLoggedPair,
        addLog,
        removeLog,
        clearLogs,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
}
