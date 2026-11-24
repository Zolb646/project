const themeKey = "portfolio-theme";
const darkPreference = "(prefers-color-scheme: dark)";

// Restore the override in the document head before the page is painted.
export const themeInitScript = `try {
  const theme = localStorage.getItem("${themeKey}");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch {}`;

export function isDarkTheme() {
  const theme = document.documentElement.dataset.theme;
  return theme === "dark" || (theme === undefined && window.matchMedia(darkPreference).matches);
}

export function subscribeToTheme(onChange: () => void) {
  const system = window.matchMedia(darkPreference);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  system.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    system.removeEventListener("change", onChange);
  };
}

export function toggleTheme() {
  const theme = isDarkTheme() ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(themeKey, theme);
  } catch {
    // The selection still applies to the current page.
  }
}
