import { useCallback, useEffect, useState } from "react";

type ElementSize = {
  height: number;
  width: number;
};

const DEFAULT_SIZE: ElementSize = {
  height: 0,
  width: 0,
};

export function useElementSize<T extends HTMLElement>() {
  const [element, setElement] = useState<T | null>(null);
  const [size, setSize] = useState<ElementSize>(DEFAULT_SIZE);
  const ref = useCallback((node: T | null) => {
    setElement(node);

    if (!node) {
      setSize(DEFAULT_SIZE);
    }
  }, []);

  useEffect(() => {
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      setSize({
        height: rect.height,
        width: rect.width,
      });
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      setSize({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    updateSize();
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return { ref, size };
}
