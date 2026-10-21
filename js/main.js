// Entry point: renders data from js/data.js and wires up page interactions.

function renderSkills(container, skillGroups) {
  container.innerHTML = skillGroups
    .map(
      (group) => `
        <div class="skill-card">
          <h3>${group.category}</h3>
          <ul class="tag-list">
            ${group.items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>`
    )
    .join("");
}

const PROJECT_IMAGE_DIR = "assets/images/projects/";

// Screenshots can be listed as "file.webp" or { src: "file.webp", caption: "…" }
function getProjectImages(project) {
  return (project.images || []).map((image) => {
    const { src, caption = "" } = typeof image === "string" ? { src: image } : image;
    // Plain file names live in the projects folder; full paths/URLs are used as-is
    return { src: src.includes("/") ? src : PROJECT_IMAGE_DIR + src, caption };
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
        <span>${initials(project.title)}</span>
        <small>Screenshots coming soon</small>
      </div>`;
  }

  const count = images.length;
  const mobile = project.device === "mobile";
  // Phone screenshots: show up to three screens side by side.
  // Desktop screenshots: the first one fills the cover.
  const preview = mobile
    ? `<span class="cover-phones">${images
        .slice(0, 3)
        .map((image) => `<img src="${image.src}" alt="" loading="lazy" />`)
        .join("")}</span>`
    : `<img src="${images[0].src}" alt="" loading="lazy" />`;

  return `
    <button
      class="project-cover${mobile ? " is-mobile" : ""}"
      data-project="${index}"
      aria-label="View ${count} screenshot${count > 1 ? "s" : ""} of ${project.title}"
    >
      ${preview}
      ${count > 1 ? `<span class="cover-badge">${count} screenshots</span>` : ""}
    </button>`;
}

const GITHUB_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;

function projectLinks(project) {
  const links = [];
  if (project.repo) {
    links.push(
      `<a class="project-link" href="${project.repo}" target="_blank" rel="noopener">${GITHUB_ICON}Code</a>`
    );
  }
  if (project.demo) {
    links.push(
      `<a class="project-link" href="${project.demo}" target="_blank" rel="noopener">Live demo ↗</a>`
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
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul class="tag-list">
            ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
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
    image.src = shot.src;
    image.alt = `${projectTitle}, screenshot ${current + 1}${shot.caption ? `: ${shot.caption}` : ""}`;
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
    projectTitle = project.title;
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
  document.getElementById("year").textContent = new Date().getFullYear();
});
