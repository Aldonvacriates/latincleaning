"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

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
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Latin Cleaning">
          <Image src="/images/latincleanf.jpg" alt="Latin Cleaning logo" className="brand__logo" width={40} height={40} priority />
          <span className="brand__text">Latin Cleaning</span>
        </a>

        <button
          ref={btnRef}
          className="menu-toggle"
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

        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#about">About</a>
          <a href="#findus">Find Us</a>
          <a href="#quote">Pricing &amp; Quote</a>
          <a href="https://sites.google.com/view/latincleaning/home">Google</a>
          <a href="https://www.instagram.com/latinclean/" target="_blank" rel="noopener" aria-label="Instagram (opens in new tab)">
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
              style={{ verticalAlign: "middle", marginRight: 8 }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <circle cx="12" cy="12" r="3"></circle>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Instagram
          </a>
        </nav>

        <a className="btn btn--cta header-cta" href="#quote">Book Now</a>
      </header>

      {/* Backdrop behind the mobile nav; clicking closes the menu */}
      <div
        className="mobile-backdrop"
        aria-hidden="true"
        data-open={open}
        onClick={() => setOpenSafe(false)}
      />

      <nav
        ref={navRef}
        id="mobile-nav"
        className="mobile-nav"
        aria-hidden={!open}
        aria-label="Mobile navigation"
        data-open={open}
      >
        <a href="#services">Services</a>
        <a href="#why">Why Us</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#about">About</a>
        <a href="#findus">Find Us</a>
        <a href="#quote">Pricing &amp; Quote</a>
        <a href="https://sites.google.com/view/latincleaning/home">Google</a>
        <a href="https://www.instagram.com/latinclean/" target="_blank" rel="noopener" aria-label="Instagram (opens in new tab)">
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
            style={{ verticalAlign: "middle", marginRight: 8 }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Instagram
        </a>
      </nav>
    </>
  );
}
