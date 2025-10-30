"use client";
import { useEffect } from "react";

function getHeaderHeight() {
  const header = document.querySelector<HTMLElement>('.site-header');
  return header ? header.offsetHeight : 0;
}

function setScrollVar() {
  const h = getHeaderHeight();
  const offset = Math.max(0, h + 12);
  document.documentElement.style.setProperty('--header-offset', `${offset}px`);
}

export default function SmoothScrollProvider() {
  useEffect(() => {
    setScrollVar();
    const onResize = () => setScrollVar();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // Take control of scroll restoration to avoid odd initial offsets
    const prev = history.scrollRestoration;
    try { history.scrollRestoration = 'manual'; } catch {}

    const smoothTo = (hash: string, behavior: ScrollBehavior = 'smooth') => {
      if (!hash || hash === '#') return;
      const id = hash.startsWith('#') ? hash.slice(1) : hash;
      const el = document.getElementById(id);
      if (!el) return;
      const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || getHeaderHeight();
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior });
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.length < 2) return;
      e.preventDefault();
      // Close mobile menu if open
      const btn = document.querySelector<HTMLButtonElement>('.menu-toggle');
      const nav = document.getElementById('mobile-nav');
      if (btn?.getAttribute('aria-expanded') === 'true' && nav) {
        btn.click();
      }
      // Scroll with offset
      smoothTo(href, 'smooth');
      // Update URL hash without jumping
      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onClick);

    // Handle initial position after layout settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (window.location.hash) {
          smoothTo(window.location.hash, 'auto');
        } else {
          // Ensure we start at the exact top
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    });

    // Handle hash changes (if any programmatic updates)
    const onHash = () => smoothTo(window.location.hash, 'auto');
    window.addEventListener('hashchange', onHash);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHash);
      try { history.scrollRestoration = prev as ScrollRestoration; } catch {}
    };
  }, []);

  return null;
}
