"use client";
import Image from "next/image";
import { useState } from "react";

export default function BeforeAfter() {
  const [pct, setPct] = useState(50);
  return (
    <section className="section beforeafter reveal" aria-label="Before and after cleaning results">
      <h2 className="section__title">Before &amp; After</h2>
      <div className="ba" style={{ maxWidth: 1000, marginInline: 'auto', borderRadius: 18 }}>
        {/* Base (After) */}
        <div style={{ position: 'relative', aspectRatio: '16/10' }} aria-hidden>
          <Image src="/images/services/deep-clean.jpg" alt="After cleaning" fill sizes="(min-width: 900px) 1000px, 100vw" style={{ objectFit: 'cover' }} />
        </div>
        {/* Overlay (Before) */}
        <div className="ba__overlay" style={{ width: pct + '%', position: 'absolute', inset: 0 }}>
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <Image src="/images/services/bna.jpg" alt="Before cleaning" fill sizes="(min-width: 900px) 1000px, 100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        {/* Range control covering the image */}
        <input
          className="ba__range"
          type="range"
          min={0}
          max={100}
          value={pct}
          aria-label="Reveal before and after"
          onChange={(e) => setPct(Number(e.target.value))}
        />
      </div>
    </section>
  );
}

