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
(() => {
  const STORAGE_KEY = "lc_cookie_consent_v1";
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  let lastActive = null;

  const saved = localStorage.getItem(STORAGE_KEY);

  // Helpers
  function setCookie(name, value, days = 365) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  function saveChoice(choice) {
    const payload = { choice, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setCookie("lc_cookie_consent", choice);
  }

  function openBanner() {
    // Don’t show if already decided
    if (saved) return;

    lastActive = document.activeElement;
    banner.hidden = false;
    banner.setAttribute("aria-hidden", "false");

    // Move focus to Accept for keyboard users after paint
    requestAnimationFrame(() => {
      acceptBtn?.focus({ preventScroll: true });
    });

    // Trap Escape to close as decline
    document.addEventListener("keydown", onEsc);
  }

  function closeBanner(choice) {
    saveChoice(choice);
    banner.hidden = true;
    banner.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onEsc);
    if (lastActive && lastActive instanceof HTMLElement) {
      lastActive.focus({ preventScroll: true });
    }
  }

  function onEsc(e) {
    if (e.key === "Escape" && !banner.hidden) {
      closeBanner("declined");
    }
  }

  // Wire buttons
  acceptBtn?.addEventListener("click", () => closeBanner("accepted"));
  declineBtn?.addEventListener("click", () => closeBanner("declined"));

  // Show after a short delay so it doesn’t clash with initial animations
  if (!saved) {
    setTimeout(openBanner, 600);
  }
})();

// After parsing saved choice:
try {
  const parsed = saved ? JSON.parse(saved) : null;
  if (parsed?.choice === 'accepted') {
    // loadAnalytics(); // your function that injects analytics script
  }
} catch {}