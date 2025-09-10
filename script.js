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

// Mobile menu toggle with improved body scroll lock that preserves page position
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
if (menuToggle && mobileNav) {
  const toggleMenu = (forceState) => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const newState = typeof forceState === "boolean" ? forceState : !isExpanded;
    if (newState === isExpanded) return;

    // Opening: store scroll position and fix body in place (preserve visual position)
    if (newState) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("is-locked");
    } else {
      // Closing: remove fixed positioning and restore previous scroll position
      document.body.classList.remove("is-locked");
      const prev = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      // restore scroll synchronously
      window.scrollTo(0, prev);
      delete document.body.dataset.scrollY;
    }

    // update accessible attributes and mobile sheet state
    menuToggle.setAttribute("aria-expanded", String(newState));
    mobileNav.setAttribute("aria-hidden", String(!newState));
    mobileNav.setAttribute("aria-expanded", String(newState));
  };
  menuToggle.addEventListener("click", () => toggleMenu());

  // Close menu first, then instant jump (no animation)
  mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) return;
      e.preventDefault();
      // Close menu and then jump — since we restore scroll immediately, a short timeout
      // ensures the DOM has updated before we jump to the target.
      toggleMenu(false);
      setTimeout(() => {
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }, 40);
    });
  });
}

// Year
document.getElementById("year")?.append?.(new Date().getFullYear());

// Reveal on scroll - gentle fade-in with reduced-motion fallback
(() => {
  const prefersReduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  )?.matches;
  if (prefersReduced) return; // skip reveals entirely
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

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

// Analytics hook can be added here if consent is accepted (left intentionally blank for static site)
