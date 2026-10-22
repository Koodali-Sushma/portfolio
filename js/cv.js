// CV preview page (cv.html): shows the English or German CV to match the site
// language (js/i18n.js), and switches when the EN | DE toggle is used.

const CV_VERSIONS = {
  en: {
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

function showCv(lang) {
  const cv = CV_VERSIONS[lang];

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

  // Keep the address shareable: it always names the CV being shown
  history.replaceState(null, "", `cv.html?lang=${lang}`);
}

document.addEventListener("DOMContentLoaded", () => {
  showCv(siteLang.get());
  document.addEventListener("langchange", (event) => showCv(event.detail.lang));
});
