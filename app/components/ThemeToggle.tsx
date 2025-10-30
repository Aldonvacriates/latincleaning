"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | null;
const STORAGE_KEY = "theme";

function applyTheme(next: Theme) {
  const root = document.documentElement;
  if (!next) {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", next);
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        applyTheme(stored);
      } else {
        setTheme(null);
        applyTheme(null);
      }
    } catch {
      // no-op
    }
  }, []);

  // Persist and apply on change
  useEffect(() => {
    try {
      if (theme === "light" || theme === "dark") {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        applyTheme(null);
      }
    } catch {
      // no-op
    }
  }, [theme]);

  // Compute current effective dark state (respect system when theme === null)
  const isDark = (() => {
    if (theme) return theme === "dark";
    if (typeof window !== "undefined") {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  })();

  return (
    <div className="theme-switch" role="group" aria-label="Theme">
      <button
        type="button"
        className="theme-switch__btn"
        aria-pressed={theme === null}
        onClick={() => setTheme(null)}
        title="Use system theme"
      >
        Auto
      </button>
      <button
        type="button"
        className="theme-switch__btn"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
        title="Use light theme"
      >
        Light
      </button>
      <button
        type="button"
        className="theme-switch__btn"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
        title="Use dark theme"
      >
        Dark
      </button>
    </div>
  );
}
