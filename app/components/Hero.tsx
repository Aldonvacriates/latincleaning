"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
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
  const { t } = useI18n();
  const [imgReady, setImgReady] = useState(false);
  const { ref, inView } = useInView<HTMLElement>("0px 0px -20% 0px", 0.05);
  const show = useHeroReveal(imgReady, inView);

  return (
      <section
        ref={ref}
        aria-label="Professional cleaning in Park City"
        className={[
        "relative w-[100dvw] [margin-inline:calc(50%-50dvw)] min-h-[calc(100svh-var(--header-height))] grid items-center overflow-clip",
        "mb-[clamp(1.5rem,5vw,3rem)] px-[clamp(1rem,4vw,3rem)] isolate",
        "reveal",
      ].join(' ')}
      >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={heroImg}
          alt=""
          priority
          fill
          quality={85}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 100vw"
          className={[
            "transition-opacity duration-150 ease-out",
            imgReady ? "opacity-100" : "opacity-0",
          ].join(' ')}
          style={{ objectFit: "cover", objectPosition: "center" }}
          onLoadingComplete={() => setImgReady(true)}
        />
        {/* Wipe reveal over image (theme-aware) */}
        <div
          className={[
            "absolute inset-0 pointer-events-none transition-transform duration-700 ease-out transition-opacity",
            show ? "translate-x-full opacity-0" : "translate-x-0 opacity-100",
          ].join(' ')}
          style={{ background: "var(--hero-wipe)" }}
          aria-hidden="true"
        />
      </div>

      {/* Global overlay (theme-aware) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--hero-overlay), radial-gradient(1200px 700px at 18% 68%, rgba(14, 22, 40, .18) 0%, rgba(14, 22, 40, .08) 60%, rgba(14, 22, 40, 0) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-[2] max-w-[72ch] text-[color:var(--navy)] dark:text-[#e6edf3]">
        <div
          className={[
            "rounded-2xl backdrop-blur-2xl",
            "py-[clamp(16px,2.8vw,26px)] px-[clamp(18px,3.2vw,32px)] max-w-[640px]",
          ].join(' ')}
          style={{
            background: 'var(--hero-card-bg)',
            border: '1px solid var(--hero-card-border)',
            boxShadow: 'var(--hero-card-shadow)'
          }}
        >
          <h1 className="font-extrabold tracking-[-0.01em] leading-[1.03] m-0 text-[clamp(36px,6.8vw,68px)]">
            {t('hero.title.pre')}{" "}
            <span
              className={[
                "px-[0.22em] py-[0.04em] rounded-[.38em] box-decoration-clone",
                "bg-[color:var(--hero-pill-bg)] text-[color:var(--hero-pill-text)] shadow-sm",
              ].join(' ')}
            >
              {t('hero.title.hl')}
            </span>
          </h1>
          <p className="mt-3 mb-6 text-[1.06rem] md:text-[1.18rem]">{t('hero.sub')}</p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#quote"
              className="inline-block rounded-full px-5 py-3 font-semibold shadow bg-[color:var(--accent1)] text-white hover:brightness-105"
            >
              {t('hero.cta.quote')}
            </a>
            <a
              href="tel:+18018606299"
              className="inline-block rounded-full px-5 py-3 font-semibold shadow border hover:brightness-105"
              style={{
                background: 'var(--cta-secondary-bg)',
                color: 'var(--cta-secondary-text)',
                borderColor: 'var(--cta-secondary-border)'
              }}
            >
              {t('hero.cta.call')}
            </a>
          </div>

          <ul className="mt-6 grid gap-1.5 text-[0.95rem] p-0 list-none">
            <li>{t('hero.d1')}</li>
            <li>{t('hero.d2')}</li>
            <li>{t('hero.d3')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
