import { useCallback, useLayoutEffect } from "react";
import { getIsPreferDarkTheme, toggleTheme } from "./utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const THEME_STORAGE_KEY = "THEME_STORAGE_KEY" as const;

export const useTheme = () => {
  const [themeState, setThemeState] = useLocalStorage<boolean | null>(
    THEME_STORAGE_KEY,
    null
  );

  const handleToggleTheme = useCallback(() => {
    const nextTheme = !themeState;
    toggleTheme(nextTheme);
    setThemeState(nextTheme);
  }, [themeState, setThemeState]);

  useLayoutEffect(() => {
    if (themeState !== null) {
      toggleTheme(themeState);
    } else {
      const prefersDark = getIsPreferDarkTheme();
      toggleTheme(prefersDark);
      setThemeState(prefersDark);
    }
  }, [themeState, setThemeState]);

  return { theme: themeState, handleToggleTheme };
};
