import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay > 0) {
      const id = setInterval(callbackRef.current, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
