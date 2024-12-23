export const toggleTheme = (): void => {
  const htmlEl = document.querySelector("html");
  if (!htmlEl) return;
  htmlEl.classList.toggle("dark");
};

export const getIsDarkMode = (): boolean => {
  const htmlEl = document.querySelector("html");
  if (!htmlEl) return false;
  return htmlEl.classList.contains("dark");
};
