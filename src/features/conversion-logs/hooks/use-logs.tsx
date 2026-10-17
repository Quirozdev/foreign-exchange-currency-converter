import { useContext } from "react";
import { LogsContext } from "../context/LogsContext";

export function useLogs() {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error("useLogs must be used within a LogsProvider");
  }
  return context;
}
