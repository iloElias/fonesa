import { useRef } from "react";

export const useDebounce = (fn: CallableFunction, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  return (...args: unknown[]) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }
};
