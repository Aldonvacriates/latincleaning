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
    } catch {
      // ignore ResizeObserver errors
    }

    // After fonts load, recalc (prevents jump when font swaps in)
    try {
      document.fonts?.ready?.then?.(() => setScrollVar());
    } catch {
      // ignore font readiness errors
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      try { ro?.disconnect(); } catch {
        // ignore cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    // Take control of scroll restoration to avoid odd initial offsets
    const prev = history.scrollRestoration;
    try { history.scrollRestoration = 'manual'; } catch {
      // ignore unsupported
    }

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
      try { history.scrollRestoration = prev as ScrollRestoration; } catch {
        // ignore unsupported
      }
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

  // Scrollspy: highlight nav link for section in view (IO-based for precision)
  useEffect(() => {
    const ids = ['services', 'why', 'testimonials', 'about', 'findus', 'quote'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const links = (id: string) =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[href="#${id}"]`));

    const setActive = (id: string | null) => {
      ids.forEach((x) => links(x).forEach((a) => a.classList.toggle('is-active', x === id)));
    };

    const computeHeaderOffset = () => {
      const v = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset') || '0', 10);
      return isNaN(v) ? 0 : v;
    };

    let io: IntersectionObserver | null = null;
    const ratios = new Map<string, number>();

    const init = () => {
      const headerOffset = computeHeaderOffset();
      if (io) io.disconnect();
      // Focus on the upper 55% of viewport; compensate for sticky header
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          // Pick the id with the largest ratio
          let best: string | null = null;
          let bestR = 0;
          for (const id of ids) {
            const r = ratios.get(id) || 0;
            if (r > bestR + 0.001) { // small hysteresis
              bestR = r;
              best = id;
            }
          }
          // Fallback: first section below header when none intersect
          if (!best) {
            let minTop = Infinity;
            for (const el of sections) {
              const t = el.getBoundingClientRect().top - headerOffset;
              if (t >= 0 && t < minTop) { minTop = t; best = el.id; }
            }
          }
          setActive(best);
        },
        {
          // Shrink bottom to center-ish so the active state matches what user sees
          root: null,
          rootMargin: `-${headerOffset}px 0px -45% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );
      sections.forEach((s) => io!.observe(s));
    };

    init();
    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (io) io.disconnect();
    };
  }, []);

  return null;
}
