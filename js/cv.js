// CV preview page (cv.html). English is in the HTML; cv.html?lang=de
// switches the preview, the download links and the page's own text to German.

const CV_VERSIONS = {
  en: {
    htmlLang: "en",
    pageTitle: "CV | Sushma Koodali",
    title: "CV · English",
    pdf: "assets/documents/SushmaKoodali_EN.pdf",
    downloadName: "SushmaKoodali_CV_EN.pdf",
    preview: "assets/documents/SushmaKoodali_EN_preview.jpg",
    previewAlt: "Preview of Sushma Koodali's CV in English",
    download: "↓ Download PDF",
    open: "Open in new tab ↗",
  },
  de: {
    htmlLang: "de",
    pageTitle: "Lebenslauf | Sushma Koodali",
    title: "Lebenslauf · Deutsch",
    pdf: "assets/documents/SushmaKoodali_DE.pdf",
    downloadName: "SushmaKoodali_Lebenslauf_DE.pdf",
    preview: "assets/documents/SushmaKoodali_DE_preview.jpg",
    previewAlt: "Vorschau des Lebenslaufs von Sushma Koodali auf Deutsch",
    download: "↓ PDF herunterladen",
    open: "In neuem Tab öffnen ↗",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = new URLSearchParams(location.search).get("lang") === "de" ? "de" : "en";
  const cv = CV_VERSIONS[lang];

  document.documentElement.lang = cv.htmlLang;
  document.title = cv.pageTitle;
  document.querySelector(".cv-title").textContent = cv.title;

  const download = document.querySelector(".cv-download");
  download.href = cv.pdf;
  download.download = cv.downloadName;
  download.textContent = cv.download;

  const open = document.querySelector(".cv-open");
  open.href = cv.pdf;
  open.textContent = cv.open;

  const preview = document.querySelector(".cv-preview img");
  preview.src = cv.preview;
  preview.alt = cv.previewAlt;

  document.querySelectorAll(".cv-lang a").forEach((link) => {
    if (link.dataset.lang === lang) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
});
