import type { Log } from "./logs.types";

type LogsAction =
  | { type: "add"; log: Log }
  | { type: "remove"; id: string }
  | { type: "clear" };

export function logsReducer(state: Log[], action: LogsAction) {
  switch (action.type) {
    case "add": {
      return [...state, action.log];
    }
    case "remove": {
      return state.filter((current) => {
        return !(current.id === action.id);
      });
    }
    case "clear": {
      return [];
    }
  }
}
