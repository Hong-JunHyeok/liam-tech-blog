"use client";
import { useTheme } from "./hooks";
import { CgDarkMode } from "react-icons/cg";

function ThemeSwitch() {
  const { handleToggleTheme } = useTheme();

  return (
    <button
      key="theme-swtich"
      className="p-3 rounded-full shadow-lg focus:outline-none text-text dark:text-text-dark bg-background dark:bg-background-dark/50"
      onClick={handleToggleTheme}
      suppressHydrationWarning
    >
      <CgDarkMode />
    </button>
  );
}

export default ThemeSwitch;
