// Content for the portfolio. Edit these lists to update the site —
// js/main.js renders them into the page.

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
    category: "Backend & Data",
    items: ["Core Java", "MongoDB"],
  },
  {
    category: "Tools & Practices",
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
    description:
      "Lab management system for an R&D laboratory with refill notifications, access approvals, a chemical dispenser simulator for real-time data, and automated email notifications for orders.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "MongoDB"],
    images: [], // screenshot files in assets/images/projects/
    repo: "https://github.com/Koodali-Sushma/chemical-tracking-system",
    demo: "https://chemical-tracking-system.vercel.app/",
  },
  {
    title: "Plant Pal",
    description:
      "Mobile-first plant care app with full CRUD: browse and bookmark plants, search by name, filter by light, water and fertilising season, and add your own plants with a photo.",
    tags: ["Next.js", "Tailwind CSS"],
    device: "mobile",
    images: [
      { src: "plant-pal-1.png", caption: "My Plants: your saved collection" },
      { src: "plant-pal-2.png", caption: "Search plants by name" },
      { src: "plant-pal-3.png", caption: "Filter by light, water and fertilising season" },
      { src: "plant-pal-4.png", caption: "Filters applied" },
      { src: "plant-pal-5.png", caption: "Add a plant: upload a photo and enter its names" },
      { src: "plant-pal-6.png", caption: "Add a plant: choose water, light and fertiliser needs" },
      { src: "plant-pal-7.png", caption: "Add a plant: care notes, then save" },
    ],
    repo: "https://github.com/Koodali-Sushma/Plant-pal-app",
    demo: "https://plant-pal-app.vercel.app/",
  },
  {
    title: "Art Gallery",
    description:
      "Desktop art gallery app built on an art API (mobile layout in progress): a daily Art of the Day spotlight, a gallery of framed paintings with hover details, artwork pages with a colour palette and comments, and a favourites collection.",
    tags: ["Next.js", "React", "styled-components", "REST API"],
    images: [
      { src: "art-gallery-1.jpg", caption: "Explore the gallery: hover a painting for details" },
      { src: "art-gallery-2.jpg", caption: "Artwork page with artist, genre, year and colour palette" },
      { src: "art-gallery-3.jpg", caption: "Leave and read comments on an artwork" },
      { src: "art-gallery-4.jpg", caption: "Your favourite artworks" },
      { src: "art-gallery-5.jpg", caption: "Art of the Day on a phone (mobile layout in progress)" },
    ],
    repo: "https://github.com/Koodali-Sushma/art-gallery",
    demo: "https://art-gallery-studio.vercel.app",
  },
  {
    title: "Rick and Morty App",
    description:
      "Character browser for the Rick and Morty API: search characters by name, page through results, and see each character's status, type and number of episode appearances.",
    tags: ["JavaScript", "HTML", "CSS", "REST API"],
    images: [
      { src: "rick-and-morty-1.jpg", caption: "Browse all characters, page by page" },
      { src: "rick-and-morty-2.jpg", caption: "Search results for “jerry”" },
    ],
    repo: "https://github.com/Koodali-Sushma/rick-and-morty-app",
    demo: "https://koodali-sushma.github.io/rick-and-morty-app/",
  },
  {
    title: "Portfolio Website (this site)",
    description:
      "Built to explore Claude and get hands-on experience developing a website with AI, writing very little code by hand. I described each design and change in plain language (starting from a hand-drawn sketch), reviewed what Claude Code built, and refined it step by step: honeycomb menu, floating panels and a screenshot gallery in vanilla JavaScript.",
    tags: ["JavaScript", "HTML", "CSS", "Claude Code", "AI-assisted development"],
    images: [
      { src: "portfolio-1.jpg", caption: "Homepage: photo, honeycomb menu and the About panel" },
      { src: "portfolio-2.jpg", caption: "Projects panel with screenshot covers and links" },
    ],
    repo: "https://github.com/Koodali-Sushma/portfolio",
    demo: "https://sushma-koodali.vercel.app",
  },
];
