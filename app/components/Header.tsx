"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "./I18nProvider";

function lockBodyScroll(lock: boolean) {
  const html = document.documentElement;
  if (lock) {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.dataset.scrollY = String(scrollY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.classList.add("is-locked");
    html.style.overflow = 'hidden';
  } else {
    document.body.classList.remove("is-locked");
    const prev = parseInt(document.body.dataset.scrollY || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    html.style.overflow = '';
    window.scrollTo(0, prev);
    delete document.body.dataset.scrollY;
  }
}

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const startYRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const orientRef = useRef<null | 'x' | 'y'>(null);
  const lastYRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const lastVyRef = useRef<number>(0);
  const draggingRef = useRef(false);

  const setOpenSafe = useCallback((next: boolean) => {
    setOpen((prev) => {
      if (prev === next) return prev;
      // Defer to next frame to avoid layout thrash
      requestAnimationFrame(() => lockBodyScroll(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      e.preventDefault();
      setOpenSafe(false);
      setTimeout(() => {
        document.querySelector<HTMLElement>(href)?.scrollIntoView({ behavior: "auto", block: "start" });
      }, 40);
    };
    links.forEach((l) => l.addEventListener("click", onClick));
    return () => links.forEach((l) => l.removeEventListener("click", onClick));
  }, [setOpenSafe]);

  useEffect(() => {
    return () => {
      // cleanup lock if component unmounts while open
      if (open) lockBodyScroll(false);
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "site-header",
          "top-0 z-[999] flex items-center justify-between gap-6 w-full max-w-[100vw]",
          "px-4 lg:px-6",
          "min-h-[var(--header-height)]",
          // Theme-aware glass navbar
          "backdrop-blur-md transition-colors duration-200",
          // Subtle base shadow in light; none in dark (handled on scroll)
          "shadow-[0_2px_10px_rgba(2,6,23,0.08)] dark:shadow-none",
          // Light uses glass panel color; Dark starts solid black until scrolled
          "bg-[color:var(--hero-card-bg)] text-[color:var(--navy)] border border-[color:var(--hero-card-border)]",
          "dark:bg-[#0b1220] dark:text-[#e6edf3] dark:border-transparent",
          // On scroll, slightly clearer + more blur per theme
          "[&.is-scrolled]:backdrop-blur-[12px]",
          "[&.is-scrolled]:bg-[color:var(--hero-card-bg)]",
          "[&.is-scrolled]:shadow-[0_2px_12px_rgba(2,6,23,0.12)] dark:[&.is-scrolled]:shadow-[0_2px_12px_rgba(2,6,23,0.25)]",
        ].join(' ')}
      >
        <a
          href="#top"
          className="brand flex items-center gap-3 no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-bold min-w-0"
          aria-label="Latin Cleaning"
        >
          <Image
            src="/images/latincleanf.jpg"
            alt="Latin Cleaning logo"
            className="brand__logo w-10 h-10 rounded-[10px] object-cover shadow"
            width={40}
            height={40}
            priority
          />
          <span className="brand__text hidden min-[520px]:inline">Latin Cleaning</span>
        </a>

        <button
          ref={btnRef}
          className={[
            "menu-toggle",
            // Tailwind
            "block xl:hidden text-[color:var(--navy)] dark:text-[#e6edf3] w-10 h-10 shrink-0",
          ].join(' ')}
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpenSafe(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <ThemeToggle />
        <LanguageToggle />
        {/* CTA visible on all screens */}
        <a href="#quote" className="header-cta btn btn--pink">Book Now</a>

        <nav className="nav hidden xl:flex flex-1 justify-end gap-4 min-w-0">
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#services">{t('nav.services')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#why">{t('nav.why')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#testimonials">{t('nav.testimonials')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#about">{t('nav.about')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#findus">{t('nav.findus')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] [&.is-active]:text-[color:var(--accent1)] transition-colors" href="#quote">{t('nav.quote')}</a>
          <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] transition-colors" href="https://sites.google.com/view/latincleaning/home">Google</a>
          <a className="no-underline inline-flex items-center text-[color:var(--navy)] dark:text-[#e6edf3] font-semibold opacity-85 text-[0.95rem] lg:text-[1rem] py-3 px-2 hover:opacity-100 hover:text-[color:var(--accent1)] transition-colors" href="https://www.instagram.com/latinclean/" target="_blank" rel="noopener" aria-label="Instagram (opens in new tab)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="mr-2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <circle cx="12" cy="12" r="3"></circle>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            {t('nav.instagram')}
          </a>
        </nav>

        {/* Mobile/Tablet CTA is rendered earlier (xl:hidden). Desktop CTA is inside the nav. */}
      </header>

      {/* Backdrop behind the mobile nav; clicking closes the menu */}
      <div
        className={[
          "mobile-backdrop",
          // Tailwind
          "fixed inset-0 z-30 bg-[rgba(15,23,42,0.45)] backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          "dark:bg-[rgba(2,6,23,0.6)]",
        ].join(' ')}
        aria-hidden="true"
        data-open={open}
        onClick={() => setOpenSafe(false)}
      />

      <nav
        ref={navRef}
        id="mobile-nav"
        className={[
          "mobile-nav",
          // Tailwind layout and effects
          "fixed inset-0 h-[100dvh] z-40 flex flex-col items-center justify-center gap-6 md:gap-8",
          "overflow-y-auto overflow-x-hidden overscroll-contain touch-auto",
          "pt-[calc(env(safe-area-inset-top)+8px)] pb-[env(safe-area-inset-bottom)]",
          "bg-white/95 backdrop-blur-lg dark:bg-[rgba(10,15,25,0.95)]",
          // Transition and state
          "transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-y-[var(--nav-shift,0px)] opacity-100" : "-translate-y-full opacity-0",
        ].join(' ')}
        aria-hidden={!open}
        aria-label="Mobile navigation"
        data-open={open}
        onTouchStart={(e) => {
          if (!open) return;
          if (e.touches.length !== 1) return;
          const t = e.touches[0];
          startYRef.current = t.clientY;
          startXRef.current = t.clientX;
          lastYRef.current = t.clientY;
          lastTsRef.current = performance.now();
          lastVyRef.current = 0;
          orientRef.current = null;
          draggingRef.current = true;
          // Reset any previous drag amounts
          navRef.current?.style.setProperty('--nav-shift', '0px');
          navRef.current?.setAttribute('data-dragging', 'true');
        }}
        onTouchMove={(e) => {
          if (!open || !draggingRef.current) return;
          if (e.touches.length !== 1) return;
          const t = e.touches[0];
          const sx = startXRef.current;
          const sy = startYRef.current;
          if (sx == null || sy == null) return;
          const dx = t.clientX - sx;
          const dy = t.clientY - sy;
          if (orientRef.current == null) {
            const adx = Math.abs(dx), ady = Math.abs(dy);
            if (adx < 6 && ady < 6) return; // wait for intent
            orientRef.current = adx > ady ? 'x' : 'y';
          }
          if (orientRef.current === 'y') {
            // vertical drag to close (swipe up)
            try { e.preventDefault(); } catch {
              // ignore
            }
            const deltaY = Math.min(0, dy); // only allow dragging upward
            const min = -Math.floor(window.innerHeight * 0.85);
            const shift = Math.max(deltaY, min);
            navRef.current?.style.setProperty('--nav-shift', `${shift}px`);
            const now = performance.now();
            const prevY = lastYRef.current;
            const prevT = lastTsRef.current;
            if (prevY != null && prevT != null) {
              const dt = Math.max(1, now - prevT);
              lastVyRef.current = (t.clientY - prevY) / dt; // px per ms
            }
            lastYRef.current = t.clientY;
            lastTsRef.current = now;
          }
        }}
        onTouchEnd={() => {
          if (!open) return;
          const valy = navRef.current?.style.getPropertyValue('--nav-shift') || '0';
          const shiftY = parseInt(valy, 10) || 0;
          draggingRef.current = false;
          startYRef.current = null;
          startXRef.current = null;
          const vy = lastVyRef.current; // px/ms
          const shouldClose = Math.abs(shiftY) > window.innerHeight * 0.18 || vy < -0.7; // fast upward flick or distance
          const nav = navRef.current;
          if (nav) nav.removeAttribute('data-dragging');
          if (shouldClose) {
            // Animate remaining distance at roughly the user's swipe velocity
            const remaining = Math.max(0, window.innerHeight - Math.abs(shiftY));
            const speed = Math.max(0.35, Math.min(2.0, Math.abs(vy))); // px/ms
            const duration = Math.max(120, Math.min(360, Math.round(remaining / speed)));
            if (nav) {
              nav.style.transition = `transform ${duration}ms linear, opacity ${duration}ms linear`;
            }
            requestAnimationFrame(() => {
              nav?.style.setProperty('--nav-shift', '0px');
              setOpenSafe(false);
              // Clear inline transition after it completes
              setTimeout(() => { if (nav) nav.style.transition = ''; }, duration + 50);
            });
          } else {
            // Snap back smoothly
            if (nav) nav.style.transition = `transform 160ms ease-out`;
            nav?.style.setProperty('--nav-shift', '0px');
            setTimeout(() => { if (nav) nav.style.transition = ''; }, 200);
          }
          orientRef.current = null;
        }}
        onTouchCancel={() => {
          if (!open) return;
          draggingRef.current = false;
          startYRef.current = null;
          startXRef.current = null;
          navRef.current?.style.setProperty('--nav-shift', '0px');
          navRef.current?.removeAttribute('data-dragging');
          orientRef.current = null;
        }}
      >
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#services">{t('nav.services')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#why">{t('nav.why')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#testimonials">{t('nav.testimonials')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#about">{t('nav.about')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#findus">{t('nav.findus')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="#quote">{t('nav.quote')}</a>
        <a className="no-underline text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="https://sites.google.com/view/latincleaning/home">Google</a>
        <a className="no-underline inline-flex items-center text-[color:var(--navy)] dark:text-[#e6edf3] text-xl md:text-[1.25rem] lg:text-[1.5rem] font-semibold p-3 md:p-4 hover:text-[color:var(--accent1)] transition" href="https://www.instagram.com/latinclean/" target="_blank" rel="noopener" aria-label="Instagram (opens in new tab)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="mr-2"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          {t('nav.instagram')}
        </a>

        {/* CTA kept outside nav to avoid duplicates */}

        {/* (toggle removed from mobile sheet as requested) */}
      </nav>
    </>
  );
}
