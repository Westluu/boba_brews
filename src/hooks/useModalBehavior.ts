import { useEffect, type RefObject } from "react";

export function useModalBehavior<TElement extends HTMLElement>(
  onClose: () => void,
  initialFocusRef?: RefObject<TElement | null>,
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    initialFocusRef?.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [initialFocusRef, onClose]);
}
