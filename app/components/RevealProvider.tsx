"use client";
import { useEffect } from "react";

export default function RevealProvider() {
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }
    }, { threshold: 0.12 });

    const els = document.querySelectorAll<HTMLElement>('.reveal');
    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}

