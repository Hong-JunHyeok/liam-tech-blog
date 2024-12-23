import { useState, useEffect } from "react";

export const useLocalStorage = <T = unknown>(key: string, initialValue?: T) => {
  const getSavedValue = (): T | null => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue === null) {
        return initialValue ?? null;
      }
      return JSON.parse(savedValue) as T;
    } catch (error) {
      console.error(`잘못된 LocalStorage Key를 전달했습니다. "${key}":`, error);
      return initialValue ?? null;
    }
  };

  const setSavedValue = (value: T | null) => {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(
        `Error setting localStorage value for key "${key}":`,
        error
      );
    }
  };

  const [state, setState] = useState<T | null>(() => getSavedValue());

  const changeStateWithStorage = (value: T | null) => {
    setSavedValue(value);
    setState(value);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setState(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [state, changeStateWithStorage] as const;
};
