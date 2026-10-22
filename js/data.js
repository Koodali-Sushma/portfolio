// Content for the portfolio. Edit these lists to update the site —
// js/main.js renders them into the page.
//
// Any text can be a plain string (same in both languages, e.g. "React") or
// { en: "…", de: "…" } for English and German versions.

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    category: { en: "Backend & Data", de: "Backend & Daten" },
    items: ["Core Java", "MongoDB"],
  },
  {
    category: { en: "Tools & Practices", de: "Tools & Methoden" },
    items: ["Git", "SDLC", "OOP"],
  },
];

// Projects. For each one you can add:
//   images: screenshot file names in assets/images/projects/, first one is
//           the cover. Plain names, or { src, caption } to add a caption:
//           ["plant-buddy-1.webp", { src: "plant-buddy-2.webp", caption: "Edit a plant" }]
//   repo:   GitHub repository URL (shows a "Code" button)
//   demo:   live site URL (shows a "Live demo" button)
//   device: "mobile" for phone screenshots: the cover shows three phone
//           screens side by side and the viewer opens in a tall frame
const projects = [
  {
    title: "Chemical Tracking System",
    description: {
      en: "Lab management system for an R&D laboratory with refill notifications, access approvals, a chemical dispenser simulator for real-time data, and automated email notifications for orders.",
      de: "Laborverwaltungssystem für ein F&E-Labor mit Nachfüll-Benachrichtigungen, Zugriffsfreigaben, einem Chemikalien-Dispenser-Simulator für Echtzeitdaten und automatischen E-Mail-Benachrichtigungen für Bestellungen.",
    },
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "MongoDB"],
    images: [], // screenshot files in assets/images/projects/
    repo: "https://github.com/Koodali-Sushma/chemical-tracking-system",
    demo: "https://chemical-tracking-system.vercel.app/",
  },
  {
    title: "Plant Pal",
    description: {
      en: "Mobile-first plant care app with full CRUD: browse and bookmark plants, search by name, filter by light, water and fertilising season, and add your own plants with a photo.",
      de: "Mobile-First-App zur Pflanzenpflege mit vollständigen CRUD-Funktionen: Pflanzen durchsuchen und merken, nach Namen suchen, nach Licht, Wasser und Düngezeit filtern und eigene Pflanzen mit Foto hinzufügen.",
    },
    tags: ["Next.js", "Tailwind CSS"],
    device: "mobile",
    images: [
      {
        src: "plant-pal-1.png",
        caption: { en: "My Plants: your saved collection", de: "Meine Pflanzen: die gespeicherte Sammlung" },
      },
      {
        src: "plant-pal-2.png",
        caption: { en: "Search plants by name", de: "Pflanzen nach Namen suchen" },
      },
      {
        src: "plant-pal-3.png",
        caption: {
          en: "Filter by light, water and fertilising season",
          de: "Nach Licht, Wasser und Düngezeit filtern",
        },
      },
      {
        src: "plant-pal-4.png",
        caption: { en: "Filters applied", de: "Aktive Filter" },
      },
      {
        src: "plant-pal-5.png",
        caption: {
          en: "Add a plant: upload a photo and enter its names",
          de: "Pflanze hinzufügen: Foto hochladen und Namen eingeben",
        },
      },
      {
        src: "plant-pal-6.png",
        caption: {
          en: "Add a plant: choose water, light and fertiliser needs",
          de: "Pflanze hinzufügen: Wasser-, Licht- und Düngebedarf wählen",
        },
      },
      {
        src: "plant-pal-7.png",
        caption: {
          en: "Add a plant: care notes, then save",
          de: "Pflanze hinzufügen: Pflegehinweise eintragen und speichern",
        },
      },
    ],
    repo: "https://github.com/Koodali-Sushma/Plant-pal-app",
    demo: "https://plant-pal-app.vercel.app/",
  },
  {
    title: "Art Gallery",
    description: {
      en: "Desktop art gallery app built on an art API (mobile layout in progress): a daily Art of the Day spotlight, a gallery of framed paintings with hover details, artwork pages with a colour palette and comments, and a favourites collection.",
      de: "Desktop-App für eine Kunstgalerie auf Basis einer Kunst-API (mobiles Layout in Arbeit): ein tägliches „Kunstwerk des Tages“, eine Galerie gerahmter Gemälde mit Details beim Darüberfahren, Detailseiten mit Farbpalette und Kommentaren sowie eine Favoritensammlung.",
    },
    tags: ["Next.js", "React", "styled-components", "REST API"],
    images: [
      {
        src: "art-gallery-1.jpg",
        caption: {
          en: "Explore the gallery: hover a painting for details",
          de: "Galerie erkunden: Details beim Darüberfahren mit der Maus",
        },
      },
      {
        src: "art-gallery-2.jpg",
        caption: {
          en: "Artwork page with artist, genre, year and colour palette",
          de: "Detailseite mit Künstler, Genre, Jahr und Farbpalette",
        },
      },
      {
        src: "art-gallery-3.jpg",
        caption: {
          en: "Leave and read comments on an artwork",
          de: "Kommentare zu einem Kunstwerk schreiben und lesen",
        },
      },
      {
        src: "art-gallery-4.jpg",
        caption: { en: "Your favourite artworks", de: "Lieblingskunstwerke" },
      },
      {
        src: "art-gallery-5.jpg",
        caption: {
          en: "Art of the Day on a phone (mobile layout in progress)",
          de: "Kunstwerk des Tages auf dem Smartphone (mobiles Layout in Arbeit)",
        },
      },
    ],
    repo: "https://github.com/Koodali-Sushma/art-gallery",
    demo: "https://art-gallery-studio.vercel.app",
  },
  {
    title: "Rick and Morty App",
    description: {
      en: "Character browser for the Rick and Morty API: search characters by name, page through results, and see each character's status, type and number of episode appearances.",
      de: "Charakter-Browser für die Rick-and-Morty-API: Charaktere nach Namen suchen, durch die Ergebnisse blättern und Status, Typ und Anzahl der Episodenauftritte jedes Charakters sehen.",
    },
    tags: ["JavaScript", "HTML", "CSS", "REST API"],
    images: [
      {
        src: "rick-and-morty-1.jpg",
        caption: { en: "Browse all characters, page by page", de: "Alle Charaktere seitenweise durchsuchen" },
      },
      {
        src: "rick-and-morty-2.jpg",
        caption: { en: "Search results for “jerry”", de: "Suchergebnisse für „jerry“" },
      },
    ],
    repo: "https://github.com/Koodali-Sushma/rick-and-morty-app",
    demo: "https://koodali-sushma.github.io/rick-and-morty-app/",
  },
  {
    title: { en: "Portfolio Website (this site)", de: "Portfolio-Website (diese Seite)" },
    description: {
      en: "Built to explore Claude and get hands-on experience developing a website with AI, writing very little code by hand. I described each design and change in plain language (starting from a hand-drawn sketch), reviewed what Claude Code built, and refined it step by step: honeycomb menu, floating panels and a screenshot gallery in vanilla JavaScript.",
      de: "Entstanden, um Claude kennenzulernen und praktische Erfahrung mit KI-gestützter Webentwicklung zu sammeln – mit sehr wenig selbst geschriebenem Code. Ich habe jedes Design und jede Änderung in einfacher Sprache beschrieben (ausgehend von einer Handskizze), die Umsetzung von Claude Code geprüft und Schritt für Schritt verfeinert: Waben-Menü, schwebende Panels und eine Screenshot-Galerie in reinem JavaScript.",
    },
    tags: [
      "JavaScript",
      "HTML",
      "CSS",
      "Claude Code",
      { en: "AI-assisted development", de: "KI-gestützte Entwicklung" },
    ],
    images: [
      {
        src: "portfolio-1.jpg",
        caption: {
          en: "Homepage: photo, honeycomb menu and the About panel",
          de: "Startseite: Foto, Waben-Menü und das Über-mich-Panel",
        },
      },
      {
        src: "portfolio-2.jpg",
        caption: {
          en: "Projects panel with screenshot covers and links",
          de: "Projekte-Panel mit Screenshot-Vorschauen und Links",
        },
      },
    ],
    repo: "https://github.com/Koodali-Sushma/portfolio",
    demo: "https://sushma-koodali.vercel.app",
  },
];
