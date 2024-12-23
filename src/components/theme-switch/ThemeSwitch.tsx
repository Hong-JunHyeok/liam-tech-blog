"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDarkMode } from "./hooks";

function ThemeSwitch() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      className="fixed bottom-5 right-5 p-3 rounded-full shadow-lg focus:outline-none transition-all z-50"
      onClick={setDarkMode}
    >
      {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}

export default ThemeSwitch;
