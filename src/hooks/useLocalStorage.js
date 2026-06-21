"use client";

import { useEffect, useState, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const updateValue = useCallback(
    (newValue) => {
      setValue((prev) => {
        const resolved =
          typeof newValue === "function" ? newValue(prev) : newValue;

        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (error) {
          console.error(`Error writing localStorage key "${key}":`, error);
        }

        return resolved;
      });
    },
    [key],
  );

  return [value, updateValue, hydrated];
}
