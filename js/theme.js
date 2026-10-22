// Light / dark mode.
//
// Loaded in <head> without "defer", so the theme is set before the page is
// drawn (no flash of the wrong colours). Sets <html data-theme="light|dark">;
// css/styles.css swaps its colour variables for dark mode.
//   - First visit: follows the device setting (prefers-color-scheme).
//   - After clicking the sun/moon button (.theme-toggle): the choice is
//     remembered in localStorage and used on every page.

(function () {
  const STORAGE_KEY = "site-theme";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function saved() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch {
      return null; // storage blocked: just follow the device setting
    }
  }

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  apply(saved() || (systemDark.matches ? "dark" : "light"));

  // Follow device changes until the visitor picks a theme themselves
  systemDark.addEventListener("change", (event) => {
    if (!saved()) apply(event.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", () => {
    apply(document.documentElement.dataset.theme);
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // not remembered, but the page still switches
        }
        apply(next);
      });
    });
  });
})();
