import { useEffect, type RefObject } from "react";

interface Props {
  ref: RefObject<HTMLElement | null>;
  ignoreElements?: RefObject<HTMLElement | null>[];
  onClickOutside: (e: PointerEvent) => void;
}

export function useClickOutside({
  ref,
  onClickOutside,
  ignoreElements,
}: Props) {
  useEffect(() => {
    function handleOutsideClick(e: PointerEvent) {
      const element = ref.current;

      if (!element) return;

      if (ignoreElements && ignoreElements.length > 0) {
        for (let i = 0; i < ignoreElements.length; i++) {
          if (ignoreElements[i].current?.contains(e.target as Node)) return;
        }
      }

      if (!element?.contains(e.target as Node)) {
        onClickOutside(e);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [ref, ignoreElements, onClickOutside]);
}
