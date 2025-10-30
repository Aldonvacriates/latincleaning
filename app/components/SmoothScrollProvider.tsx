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
    // Initial measure
    setScrollVar();

    // Keep header offset in sync with actual header height changes
    const onResize = () => setScrollVar();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // Observe header size directly (covers font load, safe‑area changes, etc.)
    const header = document.querySelector<HTMLElement>('.site-header');
    let ro: ResizeObserver | undefined;
    try {
      if (header && 'ResizeObserver' in window) {
        ro = new ResizeObserver(() => setScrollVar());
        ro.observe(header);
      }
    } catch {}

    // After fonts load, recalc (prevents jump when font swaps in)
    try {
      // @ts-ignore experimental typing in some TS versions
      document.fonts?.ready?.then?.(() => setScrollVar());
    } catch {}

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      try { ro?.disconnect(); } catch {}
    };
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

  // Header transparency on scroll (sticky, blurred, more clear when scrolling)
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!header) return;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      header.classList.toggle('is-scrolled', y > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy: highlight nav link for section in view
  useEffect(() => {
    const ids = [
      'services',
      'why',
      'testimonials',
      'about',
      'findus',
      'quote',
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const links = (id: string) =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[href="#${id}"]`));

    let ticking = false;
    const getHeaderOffset = () => {
      const v = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-offset') || '0',
        10
      );
      return isNaN(v) ? 0 : v;
    };

    const setActive = (id: string | null) => {
      ids.forEach((x) => links(x).forEach((a) => a.classList.toggle('is-active', x === id)));
    };

    const update = () => {
      ticking = false;
      const offset = getHeaderOffset() + 12;
      let current: string | null = null;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= offset && r.bottom > offset) {
          current = el.id;
        }
      }

      // If none matched, pick the first section below the header
      if (!current) {
        let minTop = Infinity;
        for (const el of sections) {
          const t = el.getBoundingClientRect().top - offset;
          if (t >= 0 && t < minTop) {
            minTop = t;
            current = el.id;
          }
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    requestAnimationFrame(update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
