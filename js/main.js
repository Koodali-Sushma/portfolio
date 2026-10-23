// Entry point: renders data from js/data.js and wires up page interactions.

// Current site language ("en" or "de"), managed by js/i18n.js
const currentLang = () => (window.siteLang ? window.siteLang.get() : "en");

// Text in js/data.js is a plain string or { en: "…", de: "…" }
function tr(text) {
  return text && typeof text === "object" ? text[currentLang()] || text.en : text;
}

// Interface text used on the project cards and in the screenshot viewer
const UI_TEXT = {
  en: {
    comingSoon: "Screenshots coming soon",
    count: (n) => `${n} screenshot${n > 1 ? "s" : ""}`,
    countWithVideo: (n) => `${n} screenshot${n > 1 ? "s" : ""} + ▶ video`,
    view: (n, title) => `View ${n} screenshot${n > 1 ? "s" : ""} of ${title}`,
    code: "Code",
    demo: "Live demo ↗",
    screenshot: "screenshot",
  },
  de: {
    comingSoon: "Screenshots folgen in Kürze",
    count: (n) => `${n} Screenshot${n > 1 ? "s" : ""}`,
    countWithVideo: (n) => `${n} Screenshot${n > 1 ? "s" : ""} + ▶ Video`,
    view: (n, title) => `${n} Screenshot${n > 1 ? "s" : ""} von ${title} ansehen`,
    code: "Code",
    demo: "Live-Demo ↗",
    screenshot: "Screenshot",
  },
};
const ui = () => UI_TEXT[currentLang()];

function tagList(items) {
  return `<ul class="tag-list">${items.map((item) => `<li>${tr(item)}</li>`).join("")}</ul>`;
}

function renderSkills(container, skillGroups) {
  container.innerHTML = skillGroups
    .map(
      (group) => `
        <div class="skill-card">
          <h3>${tr(group.category)}</h3>
          ${tagList(group.items)}
        </div>`
    )
    .join("");
}

const PROJECT_IMAGE_DIR = "assets/images/projects/";

// Plain file names live in the projects folder; full paths/URLs are used as-is
const projectFile = (file) => (file.includes("/") ? file : PROJECT_IMAGE_DIR + file);

// Screenshots can be listed as "file.webp" or { src: "file.webp", caption: "…" };
// a video as { src: "demo.mp4", poster: "demo-poster.jpg", caption: "…" }
function getProjectImages(project) {
  return (project.images || []).map((image) => {
    const { src, caption = "", poster } = typeof image === "string" ? { src: image } : image;
    const isVideo = /\.(mp4|webm)$/i.test(src);
    return {
      src: projectFile(src),
      caption: tr(caption),
      isVideo,
      poster: poster ? projectFile(poster) : "",
      // still image to show on the card cover
      thumb: isVideo && poster ? projectFile(poster) : projectFile(src),
    };
  });
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function projectCover(project, index) {
  const images = getProjectImages(project);

  // No screenshots yet: a coloured placeholder with the project's initials
  if (images.length === 0) {
    return `
      <div class="project-cover is-placeholder" aria-hidden="true">
        <span>${initials(tr(project.title))}</span>
        <small>${ui().comingSoon}</small>
      </div>`;
  }

  const count = images.length;
  const mobile = project.device === "mobile";
  // Optional "cover" in js/data.js picks the cover image; otherwise the first
  const coverImage =
    (project.cover && images.find((image) => image.src.endsWith("/" + project.cover))) || images[0];
  // Phone screenshots: show up to three screens side by side.
  // Desktop screenshots: the first one fills the cover.
  const preview = mobile
    ? `<span class="cover-phones">${images
        .slice(0, 3)
        .map((image) => `<img src="${image.thumb}" alt="" loading="lazy" />`)
        .join("")}</span>`
    : `<img src="${coverImage.thumb}" alt="" loading="lazy" />`;

  // Badge: "13 screenshots", or "12 screenshots + video" when there is a video
  const videos = images.filter((image) => image.isVideo).length;
  const shots = count - videos;
  const badge = videos ? ui().countWithVideo(shots) : count > 1 ? ui().count(count) : "";

  return `
    <button
      class="project-cover${mobile ? " is-mobile" : ""}"
      data-project="${index}"
      aria-label="${ui().view(count, tr(project.title))}"
    >
      ${preview}
      ${badge ? `<span class="cover-badge">${badge}</span>` : ""}
    </button>`;
}

const GITHUB_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;

function projectLinks(project) {
  const links = [];
  if (project.repo) {
    links.push(
      `<a class="project-link" href="${project.repo}" target="_blank" rel="noopener">${GITHUB_ICON}${ui().code}</a>`
    );
  }
  if (project.demo) {
    links.push(
      `<a class="project-link" href="${project.demo}" target="_blank" rel="noopener">${ui().demo}</a>`
    );
  }
  return links.length ? `<div class="project-links">${links.join("")}</div>` : "";
}

function renderProjects(container, projectList) {
  container.innerHTML = projectList
    .map(
      (project, index) => `
        <article class="project-card">
          ${projectCover(project, index)}
          <h3>${tr(project.title)}</h3>
          <p>${tr(project.description)}</p>
          ${tagList(project.tags)}
          ${projectLinks(project)}
        </article>`
    )
    .join("");
}

// Click a project cover to browse its screenshots in a full-size viewer.
// Uses the native <dialog>, so Esc closes it and focus stays inside.
function setupLightbox(projectList) {
  const dialog = document.getElementById("lightbox");
  const image = dialog.querySelector(".lightbox-image");
  const video = dialog.querySelector(".lightbox-video");
  const title = dialog.querySelector(".lightbox-title");
  const caption = dialog.querySelector(".lightbox-caption");
  const counter = dialog.querySelector(".lightbox-counter");
  const prev = dialog.querySelector(".lightbox-prev");
  const next = dialog.querySelector(".lightbox-next");
  let images = [];
  let current = 0;
  let projectTitle = "";

  const render = () => {
    const shot = images[current];
    const label = `${projectTitle}, ${current + 1}${shot.caption ? `: ${shot.caption}` : ""}`;

    // Show either the <img> or the <video> for this slide
    image.hidden = shot.isVideo;
    video.hidden = !shot.isVideo;
    video.pause();
    if (shot.isVideo) {
      video.poster = shot.poster;
      video.src = shot.src;
      video.setAttribute("aria-label", label);
      // The demo has no sound, so it can start playing on its own (muted)
      video.play().catch(() => {});
    } else {
      video.removeAttribute("src");
      video.load(); // stops any download of the video
      image.src = shot.src;
      image.alt = `${projectTitle}, ${ui().screenshot} ${current + 1}${shot.caption ? `: ${shot.caption}` : ""}`;
    }
    title.textContent = projectTitle;
    caption.textContent = shot.caption;
    counter.textContent = `${current + 1} / ${images.length}`;
    prev.hidden = next.hidden = counter.hidden = images.length < 2;
  };

  const step = (direction) => {
    current = (current + direction + images.length) % images.length;
    render();
  };

  document.addEventListener("click", (event) => {
    const cover = event.target.closest(".project-cover[data-project]");
    if (!cover) return;
    const project = projectList[cover.dataset.project];
    images = getProjectImages(project);
    projectTitle = tr(project.title);
    current = 0;
    dialog.classList.toggle("is-mobile", project.device === "mobile"); // tall phone frame
    render();
    dialog.showModal();
  });

  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("keydown", (event) => {
    if (images.length < 2) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  // Clicking the dark area around the viewer closes it
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Stop the video whenever the viewer closes (×, Esc or outside click)
  dialog.addEventListener("close", () => video.pause());
}

// Show the back-to-top button once the honeycomb menu has scrolled out of view
function setupBackToTop() {
  const button = document.querySelector(".back-to-top");
  const hero = document.getElementById("home");

  new IntersectionObserver(([entry]) => {
    button.classList.toggle("visible", !entry.isIntersecting);
  }).observe(hero);
}

// Place coloured dots along a spiral that winds outward around the photo.
// Positions are in % of the avatar size, so the spiral scales with it.
function drawSpiralDots(container) {
  const colors = ["#6963db", "#fc7e7c", "#ffb84d", "#4dabf7", "#b86bd6"];
  const count = 40;
  const turns = 2.25;
  const startRadius = 0.56; // just outside the photo edge (photo radius = 0.5)
  const endRadius = 0.82;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 → 1 along the spiral
    const angle = t * turns * 2 * Math.PI;
    const radius = startRadius + (endRadius - startRadius) * t;
    const size = 10 - 6 * t; // dots shrink as the spiral moves outward

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.left = `${50 + radius * 100 * Math.cos(angle)}%`;
    dot.style.top = `${50 + radius * 100 * Math.sin(angle)}%`;
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.background = colors[i % colors.length];
    container.appendChild(dot);
  }
}

// Every few seconds, move each honeycomb button to the next slot clockwise.
// Pauses while the visitor is pointing at or tabbing through the menu.
function setupHoneycombRotation() {
  const honeycomb = document.querySelector(".honeycomb");
  const hexes = honeycomb.querySelectorAll(".hex");
  const nextSlot = { 1: "2", 2: "4", 4: "3", 3: "1" }; // clockwise
  let paused = false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  honeycomb.addEventListener("mouseenter", () => (paused = true));
  honeycomb.addEventListener("mouseleave", () => (paused = false));
  honeycomb.addEventListener("focusin", () => (paused = true));
  honeycomb.addEventListener("focusout", () => (paused = false));

  setInterval(() => {
    if (paused) return;
    hexes.forEach((hex) => {
      hex.dataset.slot = nextSlot[hex.dataset.slot];
    });
  }, 15000);
}

// Floating card: show one panel at a time. Any link to #about, #skills,
// #projects or #contact (honeycomb buttons, "View my work") switches panels.
function setupShowcase() {
  const card = document.querySelector(".showcase-card");
  const panels = card.querySelectorAll(".panel");
  const panelIds = [...panels].map((panel) => panel.id);
  const hexes = document.querySelectorAll(".hex");

  const show = (id, { scroll = false, updateUrl = true } = {}) => {
    panels.forEach((panel) => (panel.hidden = panel.id !== id));
    card.dataset.active = id; // drives the card's colour in CSS
    hexes.forEach((hex) => {
      const active = hex.getAttribute("href") === `#${id}`;
      hex.classList.toggle("active", active);
      if (active) hex.setAttribute("aria-current", "true");
      else hex.removeAttribute("aria-current");
    });
    if (updateUrl) history.replaceState(null, "", `#${id}`);
    if (scroll) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (!panelIds.includes(id)) return;
    event.preventDefault();
    show(id, { scroll: true });
  });

  // Open the panel named in the URL (e.g. index.html#projects), else About
  const fromUrl = location.hash.slice(1);
  show(panelIds.includes(fromUrl) ? fromUrl : "about", { updateUrl: false });
}

// Resume menu: close it when clicking elsewhere, pressing Esc, or picking a language
function setupCvMenu() {
  const menu = document.querySelector(".cv-menu");
  if (!menu) return;

  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => (menu.open = false));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupCvMenu();
  setupShowcase();
  setupHoneycombRotation();
  drawSpiralDots(document.querySelector(".avatar-dots"));
  setupBackToTop();
  renderSkills(document.getElementById("skills-list"), skills);
  renderProjects(document.getElementById("projects-list"), projects);
  setupLightbox(projects);

  // EN | DE toggle: redraw the cards built from js/data.js in the new language
  document.addEventListener("langchange", () => {
    renderSkills(document.getElementById("skills-list"), skills);
    renderProjects(document.getElementById("projects-list"), projects);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
});
