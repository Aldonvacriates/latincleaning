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
  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const newState = !isExpanded;
    menuToggle.setAttribute("aria-expanded", String(newState));
    mobileNav.setAttribute("aria-hidden", String(!newState));
    mobileNav.setAttribute("aria-expanded", String(newState));
    document.body.classList.toggle("is-locked", newState);
  };
  menuToggle.addEventListener("click", toggleMenu);
  // Close menu when clicking a link (mobile)
  mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        toggleMenu();
      }
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

// Quote form validation (simple + progressive enhancement)
const form = document.getElementById("quoteForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("quoteSubmit");

function setErr(field, msg) {
  const wrap = field.parentElement;
  wrap.querySelector(".error").textContent = msg || "";
  wrap.classList.toggle("is-error", Boolean(msg));
}
function clearErr() {
  form.querySelectorAll(".field").forEach((wrap) => {
    wrap.classList.remove("is-error");
    const err = wrap.querySelector(".error");
    if (err) err.textContent = "";
  });
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
  // Disable button & show pending state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusEl.className = "form-status";
  statusEl.textContent = "";

  // Submit via fetch to Formspree (graceful fallback if blocked)
  fetch(form.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(r)))
    .then(() => {
      statusEl.className = "form-status is-success";
      statusEl.textContent =
        "Thanks! Your request was received. We will contact you shortly.";
      form.reset();
    })
    .catch(() => {
      statusEl.className = "form-status is-error";
      statusEl.textContent =
        "There was a problem sending your request. Please try again or call us.";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Request Quote";
    });
});

// Before/After slider
const range = document.querySelector(".ba__range");
const overlay = document.querySelector(".ba__overlay");
range?.addEventListener("input", () => {
  overlay.style.width = range.value + "%";
});
