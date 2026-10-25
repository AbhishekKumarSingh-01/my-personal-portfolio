/* =========================================================
   Abhishek Kumar Singh: Portfolio script
   1. CONFIG (edit this)   2. Project data (edit this)
   3. Helpers  4. Features
   ========================================================= */
"use strict";
document.documentElement.classList.add("js");

/* ---------------------------------------------------------
   1. CONTACT CONFIGURATION: put your real details here.
   - whatsappNumber: digits only, with country code, no "+",
     spaces or dashes. Example for India: "919876543210"
   - email: your real email address
   - social links: full URLs (https://...). Leave "" to hide an icon.
   --------------------------------------------------------- */
const CONTACT_CONFIG = {
  whatsappNumber: "919311328406",
  email: "abhishek.work.aks@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhishek-478b99187?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/AbhishekKumarSingh-01",
  instagram: "https://www.instagram.com/abhisheksingh_345?obrf=NWoxaWRwNWlmOGFi",
  youtube: "",
  telegram: ""
};

/* ---------------------------------------------------------
   2. PROJECTS: add, remove or edit entries here.
   - viewUrl / githubUrl: leave "" to hide that button.
   - image: path to a file inside assets/images/
   --------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Magic Glove — AI Sign Language System",
    description: "An AI-assisted sign language project exploring how flex sensors, motion sensors, an ESP32 microcontroller, and machine learning can help recognize sign language gestures.",
    tech: ["ESP32", "Python", "Machine Learning", "TensorFlow Lite", "Flex Sensors", "MPU6050"],
    image: "assets/images/project-1.jpg",
    imageAlt: "Placeholder image for the Magic Glove project",
    viewUrl: "",   // e.g. "https://your-demo-link"
    githubUrl: ""  // e.g. "https://github.com/your-username/your-repo"
  },
  {
    title: "School Management System",
    description: "A student project concept for managing school-related information using Java, SQL, and database management principles.",
    tech: ["Java", "SQL", "DBMS"],
    image: "assets/images/project-2.jpg",
    imageAlt: "Placeholder image for the School Management System project",
    viewUrl: "",
    githubUrl: ""
  },
  {
    title: "Personal Portfolio Website",
    description: "A responsive personal website designed to present my skills, projects, services, experience, and contact information.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "assets/images/project1.jpg",
    imageAlt: "Placeholder image for the portfolio website project",
    viewUrl: "",
    githubUrl: ""
  },
  {
    title: "Digital Content Management",
    description: "A collection of work involving educational video editing, digital content organization, and online platform management.",
    tech: ["Video Editing", "Classplus", "Website Management", "Social Media"],
    image: "assets/images/project-4.jpg",
    imageAlt: "Placeholder image for the digital content management work",
    viewUrl: "",
    githubUrl: ""
  }
];

/* ---------------------------------------------------------
   3. HELPERS
   --------------------------------------------------------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const isWhatsappConfigured = () => /^\d{8,15}$/.test(CONTACT_CONFIG.whatsappNumber);
const isEmailConfigured = () =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_CONFIG.email) &&
  CONTACT_CONFIG.email.toLowerCase() !== "your_email@example.com";
const isLinkConfigured = (url) => typeof url === "string" && /^https?:\/\//i.test(url.trim());

const whatsappUrl = (text) => `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
const mailtoUrl = (subject, body) =>
  `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const GREETING = "Hello Abhishek, I visited your portfolio website and would like to connect.";

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
}

/* ---------------------------------------------------------
   4. FEATURES
   --------------------------------------------------------- */

/* ----- Footer year ----- */
$("#year").textContent = new Date().getFullYear();

/* ----- Mobile menu ----- */
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

function setMenu(open) {
  navMenu.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
$$("a", navMenu).forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("open")) { setMenu(false); navToggle.focus(); }
});
window.addEventListener("resize", () => { if (window.innerWidth > 860) setMenu(false); });

/* ----- Active navigation link ----- */
const sections = $$("main section[id]");
const navLinks = $$(".nav-links a");
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        const active = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("active", active);
        if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => navObserver.observe(s));
}

/* ----- Scroll reveal ----- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("visible")); return; }
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => revealObserver.observe(el));
}

/* ----- Render projects ----- */
function renderProjects() {
  const grid = $("#projectsGrid");
  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card project-card reveal";

    const media = document.createElement("div");
    media.className = "project-media";
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.imageAlt || project.title;
    img.width = 800; img.height = 500; img.loading = "lazy";
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "project-body";

    const title = document.createElement("h3");
    title.textContent = project.title;
    const desc = document.createElement("p");
    desc.textContent = project.description;

    const tags = document.createElement("ul");
    tags.className = "tech-tags";
    tags.setAttribute("aria-label", "Technologies used");
    project.tech.forEach((t) => { const li = document.createElement("li"); li.textContent = t; tags.appendChild(li); });

    body.append(title, desc, tags);

    const buttons = document.createElement("div");
    buttons.className = "btn-row";
    buttons.style.marginTop = "var(--space-2)";

    if (isLinkConfigured(project.viewUrl)) {
      const view = document.createElement("a");
      view.className = "btn btn-primary btn-sm";
      view.href = project.viewUrl; view.target = "_blank"; view.rel = "noopener noreferrer";
      view.textContent = "View Project";
      view.setAttribute("aria-label", `View project: ${project.title}`);
      buttons.appendChild(view);
    }
    if (isLinkConfigured(project.githubUrl)) {
      const gh = document.createElement("a");
      gh.className = "btn btn-ghost btn-sm";
      gh.href = project.githubUrl; gh.target = "_blank"; gh.rel = "noopener noreferrer";
      gh.innerHTML = '<i class="fa-brands fa-github" aria-hidden="true"></i> GitHub';
      gh.setAttribute("aria-label", `GitHub repository: ${project.title}`);
      buttons.appendChild(gh);
    }
    if (buttons.children.length) body.appendChild(buttons);
    else console.info(`[Portfolio] "${project.title}" has no viewUrl/githubUrl yet, so its buttons are hidden.`);

    card.append(media, body);
    grid.appendChild(card);
  });
}

/* ----- Social links ----- */
const SOCIALS = [
  { key: "linkedin",  label: "LinkedIn",  icon: "fa-brands fa-linkedin-in" },
  { key: "github",    label: "GitHub",    icon: "fa-brands fa-github" },
  { key: "instagram", label: "Instagram", icon: "fa-brands fa-instagram" },
  { key: "youtube",   label: "YouTube",   icon: "fa-brands fa-youtube" },
  { key: "telegram",  label: "Telegram",  icon: "fa-brands fa-telegram" },
  { key: "email",     label: "Email",     icon: "fa-solid fa-envelope" }
];

function renderSocials() {
  $$("[data-social]").forEach((list) => {
    SOCIALS.forEach(({ key, label, icon }) => {
      let href;
      if (key === "email") href = isEmailConfigured() ? `mailto:${CONTACT_CONFIG.email}` : "";
      else href = isLinkConfigured(CONTACT_CONFIG[key]) ? CONTACT_CONFIG[key] : "";
      if (!href) return; // not configured: icon stays hidden

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.setAttribute("aria-label", label);
      a.title = label;
      if (key !== "email") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      a.innerHTML = `<i class="${icon}" aria-hidden="true"></i>`;
      li.appendChild(a);
      list.appendChild(li);
    });
    if (!list.children.length) list.hidden = true;
  });
}

/* ----- Email buttons and configuration warnings ----- */
function setupContactActions() {
  const warnings = [];
  if (!isWhatsappConfigured()) warnings.push("WhatsApp number is not set (CONTACT_CONFIG.whatsappNumber in js/script.js).");
  if (!isEmailConfigured()) warnings.push("Email address is not set (CONTACT_CONFIG.email in js/script.js).");

  if (warnings.length) {
    console.warn("[Portfolio] Contact setup incomplete:\n- " + warnings.join("\n- "));
    // Visible only while you are on localhost or opening the file directly
    const isDev = ["localhost", "127.0.0.1", ""].includes(location.hostname);
    const box = $("#configWarning");
    if (isDev) { box.hidden = false; box.textContent = "Development notice: " + warnings.join(" "); }
  }

  $$('[data-action="email"]').forEach((link) => {
    if (isEmailConfigured()) {
      link.href = mailtoUrl("Hello from your portfolio website", "Hello Abhishek,\n\n");
    } else {
      link.addEventListener("click", (e) => { e.preventDefault(); showToast("Email is not configured yet. Please use the contact form."); });
    }
  });

  // Floating WhatsApp button
  const wa = $("#waFloat");
  if (isWhatsappConfigured()) {
    wa.href = whatsappUrl(GREETING);
  } else {
    wa.removeAttribute("target");
    wa.addEventListener("click", (e) => { e.preventDefault(); showToast("WhatsApp is not configured yet. Please use the contact form."); });
  }
}

/* ----- Service buttons: preselect service and jump to the form ----- */
function setupServiceButtons() {
  $$("[data-service]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const service = btn.dataset.service;
      $("#service").value = service;
      if (!$("#subject").value.trim()) $("#subject").value = `Enquiry about ${service}`;
      showForm();
      $("#contact").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => $("#name").focus({ preventScroll: true }), 500);
    });
  });
}

/* ----- Contact form ----- */
const form = $("#contactForm");
const result = $("#formResult");
const submitBtn = $("#submitBtn");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s\-()]{7,18}$/;

const validators = {
  name:    (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  email:   (v) => (!v.trim() ? "Please enter your email address." : EMAIL_PATTERN.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."),
  phone:   (v) => (!v.trim() || PHONE_PATTERN.test(v.trim()) ? "" : "Enter a valid phone number, or leave this field empty."),
  service: (v) => (v ? "" : "Please choose a service."),
  subject: (v) => (v.trim().length >= 3 ? "" : "Please enter a subject."),
  message: (v) => (v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters.")
};

function validateField(name) {
  const input = form.elements[name];
  const error = validators[name](input.value);
  $(`#${name}-error`).textContent = error;
  input.setAttribute("aria-invalid", error ? "true" : "false");
  return !error;
}

Object.keys(validators).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => validateField(name));
  input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateField(name); });
});

function getFormData() {
  return Object.fromEntries(Object.keys(validators).map((n) => [n, form.elements[n].value.trim()]));
}

function buildMessage(d) {
  return [
    GREETING,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Service: ${d.service}`,
    `Subject: ${d.subject}`,
    "",
    "Message:",
    d.message
  ].filter((line) => line !== null).join("\n");
}

function showForm() { form.hidden = false; result.hidden = true; }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = Object.keys(validators).map(validateField).every(Boolean);
  if (!allValid) {
    const firstInvalid = $('[aria-invalid="true"]', form);
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Short loading state, then show the message for review (nothing is sent yet)
  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  $(".btn-label", submitBtn).textContent = "Preparing…";

  setTimeout(() => {
    $("#messagePreview").textContent = buildMessage(getFormData());
    $("#sendWhatsapp").disabled = !isWhatsappConfigured();
    $("#sendEmail").disabled = !isEmailConfigured();
    form.hidden = true;
    result.hidden = false;
    result.focus();
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
    $(".btn-label", submitBtn).textContent = "Review my message";
    if (!isWhatsappConfigured() || !isEmailConfigured()) {
      showToast("Some send options are disabled because contact details are not configured yet.");
    }
  }, 600);
});

$("#sendWhatsapp").addEventListener("click", () => {
  if (!isWhatsappConfigured()) { showToast("WhatsApp number is not configured yet."); return; }
  window.open(whatsappUrl(buildMessage(getFormData())), "_blank", "noopener");
});

$("#sendEmail").addEventListener("click", () => {
  if (!isEmailConfigured()) { showToast("Email address is not configured yet."); return; }
  const d = getFormData();
  window.location.href = mailtoUrl(d.subject, buildMessage(d));
});

$("#editMessage").addEventListener("click", () => { showForm(); $("#name").focus(); });

/* ----- Back to top ----- */
$("#backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ----- Start everything ----- */
renderProjects();
renderSocials();
setupContactActions();
setupServiceButtons();
initReveal();