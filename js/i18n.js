// Site language: English ("en") or German ("de").
//
// Loaded in <head> without "defer", so the right language is set before the
// page is drawn (no flash of the other language). How the pages use it:
//   - Text in both languages sits side by side, marked data-only="en" /
//     data-only="de"; css/styles.css hides the one that isn't active.
//   - Attributes (aria-label, title, alt, content) use data-i18n-attrs plus
//     data-en / data-de, e.g.
//       <a data-i18n-attrs="aria-label,title" data-en="Back to top" data-de="Nach oben">
//   - The EN | DE buttons in the header carry data-set-lang.
//   - Other scripts call siteLang.get() and listen for the "langchange" event.
// The choice is remembered (localStorage); cv.html?lang=de and the like set it.

(function () {
  const STORAGE_KEY = "site-lang";
  const LANGS = ["en", "de"];

  function load() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch {
      // storage can be blocked (private mode etc.): fall back to English
    }
    return "en";
  }

  function save(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // not remembered, but the page still switches
    }
  }

  let lang = load();
  document.documentElement.lang = lang;

  function apply() {
    const root = document.documentElement;
    root.lang = lang;

    // Page title, stored on <html data-title-en / data-title-de>
    const title = root.dataset[lang === "de" ? "titleDe" : "titleEn"];
    if (title) document.title = title;

    document.querySelectorAll("[data-i18n-attrs]").forEach((el) => {
      const value = el.dataset[lang];
      if (value === undefined) return;
      el.dataset.i18nAttrs.split(",").forEach((attr) => el.setAttribute(attr.trim(), value));
    });

    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });
  }

  function set(value) {
    if (!LANGS.includes(value) || value === lang) return;
    lang = value;
    save(lang);
    apply();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.siteLang = { get: () => lang, set };

  // A language chosen through the URL (e.g. the Resume menu) is remembered too
  if (new URLSearchParams(location.search).get("lang") === lang) save(lang);

  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.addEventListener("click", () => set(button.dataset.setLang));
    });
  });
})();
