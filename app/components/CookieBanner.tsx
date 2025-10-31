"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "lc_cookie_consent_v1" as const;

function setCookie(name: string, value: string, days = 365) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const saveChoice = useCallback((choice: "accepted" | "declined") => {
    try {
      const payload = { choice, ts: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setCookie("lc_cookie_consent", choice);
    } catch {
      // ignore storage errors
    }
    try {
      window.dispatchEvent(new CustomEvent('lc:consent', { detail: { choice } }));
    } catch {
      // ignore CustomEvent issues
    }
  }, []);

  const onClose = useCallback((choice: "accepted" | "declined") => {
    saveChoice(choice);
    setOpen(false);
    const last = lastActiveRef.current;
    if (last) {
      try { last.focus({ preventScroll: true }); } catch {
        // ignore focus errors
      }
    }
  }, [saveChoice]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return; // already decided
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    } catch {
      // ignore storage errors
    }
  }, []);

  // Listen for external 'manage cookies' requests
  useEffect(() => {
    const handler = () => {
      lastActiveRef.current = (document.activeElement as HTMLElement) ?? null;
      setOpen(true);
    };
    window.addEventListener('lc:manage-cookies', handler as EventListener);
    return () => window.removeEventListener('lc:manage-cookies', handler as EventListener);
  }, []);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose("declined");
      }
    }
    if (open) {
      lastActiveRef.current = (document.activeElement as HTMLElement) ?? null;
      document.addEventListener("keydown", onEsc);
    }
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  

  return (
    <div
      id="cookie-banner"
      /* Tailwind-first styles; keeps old classes off the outer wrapper */
      className={[
        // positioning + safe bottom space
        "fixed inset-x-0 z-[9999] px-3 sm:px-4",
        // prefer a slightly smaller offset on tiny screens and honor safe area
        "bottom-2 sm:bottom-4 pb-[env(safe-area-inset-bottom,0px)]",
        // allow clicks only on the inner card
        "pointer-events-none",
      ].join(' ')}
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      aria-labelledby="cookie-title"
      hidden={!open}
      aria-hidden={!open}
    >
      <div
        className={[
          // layout
          // keep the card comfortably within the viewport on very small screens
          "w-full max-w-[92vw] sm:max-w-[920px] mx-auto grid items-center gap-y-3 gap-x-4",
          // compact default padding; relax a bit at sm+
          "px-3 py-2.5 sm:px-5 sm:py-4 rounded-[14px]",
          // background & effects
          "bg-[rgba(15,23,42,0.9)] text-white backdrop-blur-md",
          "shadow-[0_10px_30px_rgba(0,0,0,.25),_inset_0_1px_0_rgba(255,255,255,.05)]",
          // interaction
          "pointer-events-auto",
          // responsiveness
          "md:[grid-template-columns:1fr_auto] max-h-[40svh] overflow-auto sm:max-h-none sm:overflow-visible",
        ].join(' ')}
      >
        <p
          id="cookie-title"
          className="m-0 text-[13px] sm:text-[0.95rem] leading-snug"
        >
          We use cookies to enhance your browsing experience, serve personalized
          content, and analyze our traffic. By clicking &ldquo;Accept,&rdquo; you consent to
          our use of cookies. See our{' '}
          <a href="/privacy" className="underline underline-offset-2 text-[#c7e0ff]">Privacy Policy</a>{' '}for more.
        </p>
        <div className="flex flex-wrap gap-2 justify-end w-full">
          <button
            id="cookie-decline"
            type="button"
            onClick={() => onClose("declined")}
            className={[
              // ghost-like styling via utilities
              "border border-[var(--light-gray)] text-[var(--navy)] bg-transparent",
              "hover:bg-white/70",
              // sizing
              // use smaller sizing by default; scale at sm+
              "min-w-[5.5rem] text-[0.875rem] sm:text-[0.95rem] px-3 py-2 sm:px-4 sm:py-2 rounded-full",
            ].join(' ')}
          >
            Decline
          </button>
          <button
            id="cookie-accept"
            type="button"
            onClick={() => onClose("accepted")}
            className={[
              // primary coloring via utilities (uses your CSS var color)
              "bg-[var(--accent2)] text-[#0b1220] border border-[var(--accent2)]",
              "hover:brightness-105 shadow",
              // sizing
              "min-w-[5.5rem] text-[0.875rem] sm:text-[0.95rem] px-3 py-2 sm:px-4 sm:py-2 rounded-full",
            ].join(' ')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
