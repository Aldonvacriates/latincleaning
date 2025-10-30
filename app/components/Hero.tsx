"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroImg from "../../public/hero.jpg";

/** Small hook: are we (at least partially) in view? */
function useInView<T extends Element>(
  rootMargin = "0px",
  threshold: number | number[] = 0.1
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: assume visible
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => entry && setInView(entry.isIntersecting),
      { root: null, rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView } as const;
}

/** Reveal after image decode + first paint (+ optional delay), respecting reduced-motion */
function useHeroReveal(ready: boolean, gate: boolean) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ready || !gate || show) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const delay = prefersReduced ? 0 : 180;

    let r1 = 0,
      r2 = 0;
    let t: ReturnType<typeof setTimeout> | undefined;

    // Double rAF ensures we run *after* paint, preventing flash/jitter.
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        t = setTimeout(() => setShow(true), delay);
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      if (t) clearTimeout(t);
    };
  }, [ready, gate, show]);

  return show;
}

export default function Hero() {
  const [imgReady, setImgReady] = useState(false);
  const { ref, inView } = useInView<HTMLElement>("0px 0px -20% 0px", 0.05);
  const show = useHeroReveal(imgReady, inView);

  return (
    <section
      ref={ref}
      className="hero hero--rose hero--bleed reveal"
      aria-label="Professional cleaning in Park City"
    >
      <div className="hero__bg" aria-hidden="true">
        <Image
          src={heroImg}
          alt="" // decorative background
          priority
          fill
          quality={85}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 100vw"
          className={show ? "hero__img is-loaded" : "hero__img"}
          style={{ objectFit: "cover", objectPosition: "center" }}
          onLoadingComplete={() => setImgReady(true)}
        />
        <div className={show ? "hero__wipe is-done" : "hero__wipe"} />
      </div>

      <div className="hero__overlay" aria-hidden="true"></div>

      <div className="hero__content">
        <div className="hero__panel">
          <h1>
            Professional Cleaning Services for{" "}
            <span className="highlight highlight--sunrise">
              Homes &amp; Offices
            </span>
          </h1>
          <p className="subhead">
            Reliable, eco-friendly, and affordable cleaning you can trust.
          </p>

          <div className="hero__cta">
            <a href="#quote" className="btn btn--cta">
              Get a Free Quote
            </a>
            <a href="tel:+18018606299" className="btn btn--ghost">
              Call (801) 860-6299
            </a>
          </div>

          <ul className="hero__details">
            <li>24/7 Emergency or scheduled</li>
            <li>Bilingual support (English &amp; Español)</li>
            <li>One-time, weekly, bi-weekly, or monthly!</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
