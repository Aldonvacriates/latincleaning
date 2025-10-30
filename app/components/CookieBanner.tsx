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
    } catch {}
  }, []);

  const onClose = useCallback((choice: "accepted" | "declined") => {
    saveChoice(choice);
    setOpen(false);
    const last = lastActiveRef.current;
    if (last) {
      try { last.focus({ preventScroll: true }); } catch {}
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
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      aria-labelledby="cookie-title"
      hidden={!open}
      aria-hidden={!open}
    >
      <div className="cookie-banner__content">
        <p id="cookie-title">
          We use cookies to enhance your browsing experience, serve personalized
          content, and analyze our traffic. By clicking &ldquo;Accept,&rdquo; you consent to
          our use of cookies. See our
          {" "}
          <a href="/privacy" className="cookie-link">Privacy Policy</a>
          {" "}for more.
        </p>
        <div className="cookie-banner__actions">
          <button id="cookie-decline" className="btn btn--ghost" type="button" onClick={() => onClose("declined")}>
            Decline
          </button>
          <button id="cookie-accept" className="btn btn--primary" type="button" onClick={() => onClose("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
