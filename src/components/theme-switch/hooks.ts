import { useCallback, useState } from "react";
import { getIsDarkMode, toggleTheme } from "./utils";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => getIsDarkMode());

  const changeTheme = useCallback(() => {
    toggleTheme();
    setDarkMode((prev) => !prev);
  }, []);

  return [darkMode, changeTheme] as const;
};
