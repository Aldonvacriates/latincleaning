"use client";
import Image from "next/image";
import { useState } from "react";

export default function BeforeAfter() {
  const [pct, setPct] = useState(50);
  return (
    <section className="px-6 py-14 max-w-[1200px] mx-auto reveal" aria-label="Before and after cleaning results">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-4">Before &amp; After</h2>
      <div className="relative overflow-hidden rounded-[18px] shadow border border-[color:var(--light-gray)] mx-auto" style={{ maxWidth: 1000 }}>
        {/* Base (After) */}
        <div className="relative [aspect-ratio:16/10]" aria-hidden>
          <Image src="/images/services/deep-clean.jpg" alt="After cleaning" fill sizes="(min-width: 900px) 1000px, 100vw" style={{ objectFit: 'cover' }} />
        </div>
        {/* Overlay (Before) */}
        <div
          className="absolute inset-0 [transition:width_.1s_ease-out]"
          style={{ width: pct + '%', borderRight: '2px solid #fff', boxShadow: '0 0 0 4px var(--accent1)' }}
        >
          <div className="relative h-full w-full">
            <Image src="/images/services/bna.jpg" alt="Before cleaning" fill sizes="(min-width: 900px) 1000px, 100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        {/* Range control covering the image (hidden track/thumb) */}
        <input
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize appearance-none z-10"
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
