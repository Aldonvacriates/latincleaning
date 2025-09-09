// Smooth scroll (optional)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu toggle with body lock
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
if (menuToggle && mobileNav) {
  const toggleMenu = (forceState) => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const newState = typeof forceState === "boolean" ? forceState : !isExpanded;
    if (newState === isExpanded) return;
    menuToggle.setAttribute("aria-expanded", String(newState));
    mobileNav.setAttribute("aria-hidden", String(!newState));
    mobileNav.setAttribute("aria-expanded", String(newState));
    document.body.classList.toggle("is-locked", newState);
  };
  menuToggle.addEventListener("click", () => toggleMenu());
  // Override smooth scroll for mobile nav so we close first, THEN scroll
  mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) return;
      e.preventDefault();
      // Close menu first
      toggleMenu(false);
      // Allow layout to reflow after body unlock
      setTimeout(() => {
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 40);
    });
  });
}

// Year
document.getElementById("year")?.append?.(new Date().getFullYear());

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Quote form validation (simple)
const form = document.getElementById("quoteForm");
const statusEl = document.getElementById("formStatus");

function setErr(field, msg) {
  field.parentElement.querySelector(".error").textContent = msg || "";
}

function clearErr() {
  form.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
}
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErr();
  const data = Object.fromEntries(new FormData(form).entries());
  let ok = true;
  if (!data.name?.trim()) {
    setErr(form.elements.name, "Please enter your name.");
    ok = false;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) {
    setErr(form.elements.email, "Enter a valid email.");
    ok = false;
  }
  if ((data.phone || "").replace(/\D/g, "").length < 10) {
    setErr(form.elements.phone, "Enter a valid phone number.");
    ok = false;
  }
  ["type", "date", "time", "message"].forEach((k) => {
    if (!String(data[k] || "").trim()) {
      setErr(form.elements[k], "Required.");
      ok = false;
    }
  });
  if (!ok) {
    statusEl.className = "form-status is-error";
    statusEl.textContent = "Please fix the highlighted fields and try again.";
    return;
  }
  statusEl.className = "form-status is-success";
  statusEl.textContent =
    "Thanks! Your request was received. We will contact you shortly.";
  form.reset();
});

// Before/After slider
const range = document.querySelector(".ba__range");
const overlay = document.querySelector(".ba__overlay");
range?.addEventListener("input", () => {
  overlay.style.width = range.value + "%";
});

// Cookie consent
(function cookieConsent() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;
  const ACCEPTED = "cookie_consent_v1";
  const hasChoice = localStorage.getItem(ACCEPTED);
  if (!hasChoice) {
    banner.hidden = false;
  }
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  const hide = () => {
    banner.hidden = true;
  };
  acceptBtn?.addEventListener("click", () => {
    localStorage.setItem(ACCEPTED, "accepted");
    hide();
  });
  declineBtn?.addEventListener("click", () => {
    localStorage.setItem(ACCEPTED, "declined");
    hide();
  });
  // ESC to close (treat as decline)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !banner.hidden) {
      localStorage.setItem(ACCEPTED, "declined");
      hide();
    }
  });
})();
