import { useEffect } from "react";

interface Props {
  key: string;
  onKeyDown: (e: KeyboardEvent) => void;
}

export function useKeyDown({ key, onKeyDown }: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === key) {
        onKeyDown(e);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onKeyDown]);
}
