export const toggleTheme = (on: boolean): void => {
  const htmlEl = document.querySelector("html");
  if (!htmlEl) return;

  if (on) {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }
};

export const getIsDarkMode = (): boolean => {
  const htmlEl = document.querySelector("html");
  if (!htmlEl) return false;
  return htmlEl.classList.contains("dark");
};

export const getIsPreferDarkTheme = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
