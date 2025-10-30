"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import heroImg from "../../public/hero.jpg";

export default function Hero() {
  const [imgReady, setImgReady] = useState(false);
  const [show, setShow] = useState(false);
  useHeroReveal(imgReady, setShow);
  return (
    <section className="hero hero--rose hero--bleed reveal" aria-label="Professional cleaning in Park City">
      <div className="hero__bg" aria-hidden="true">
        <Image
          src={heroImg}
          alt=""
          priority
          fill
          sizes="100vw"
          className={show ? "hero__img is-loaded" : "hero__img"}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onLoadingComplete={() => setImgReady(true)}
        />
        <div className={show ? 'hero__wipe is-done' : 'hero__wipe'} />
      </div>
      <div className="hero__overlay" aria-hidden="true"></div>
      <div className="hero__content">
        <div className="hero__panel">
          <h1>
            Professional Cleaning Services for
            <span className="highlight highlight--sunrise">Homes &amp; Offices</span>
          </h1>
          <p className="subhead">Reliable, eco-friendly, and affordable cleaning you can trust.</p>
          <div className="hero__cta">
            <a href="#quote" className="btn btn--cta">Get a Free Quote</a>
            <a href="tel:+18018606299" className="btn btn--ghost">Call (801) 860-6299</a>
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

// Delay the reveal very slightly after the image has decoded
// to avoid any flash or layout jitter. Respects reduced-motion.
export function useHeroReveal(imgReady: boolean, setShow: (v: boolean) => void) {
  useEffect(() => {
    if (!imgReady) return;
    let r1 = 0, r2 = 0, t: any;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReduced ? 0 : 180; // ms
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        t = setTimeout(() => setShow(true), delay);
      });
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); clearTimeout(t); };
  }, [imgReady, setShow]);
}
