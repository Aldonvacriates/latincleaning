"use client";
import { useI18n } from "./I18nProvider";

export default function Testimonials() {
  const { t } = useI18n();
  return (
    <section id="testimonials" className="px-6 py-14 max-w-[1200px] mx-auto reveal">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-6">{t('testimonials.title')}</h2>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))] gap-4 max-w-[900px] mx-auto">
        <figure className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[rgba(2,6,23,0.07)] bg-white shadow-[0_6px_18px_rgba(2,6,23,0.06)] transition hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(2,6,23,0.12)] hover:border-[rgba(2,6,23,0.12)] flex flex-col gap-2 p-6 mx-auto">
          <blockquote className="m-0 mb-2">
            "They left our office spotless before a big client visit. Super reliable!"
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Morgan R.</figcaption>
        </figure>
        <figure className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[rgba(2,6,23,0.07)] bg-white shadow-[0_6px_18px_rgba(2,6,23,0.06)] transition hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(2,6,23,0.12)] hover:border-[rgba(2,6,23,0.12)] flex flex-col gap-2 p-6 mx-auto">
          <blockquote className="m-0 mb-2">
            "Best deep clean we've had. Friendly team and great communication."
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Alex P.</figcaption>
        </figure>
        <figure className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[rgba(2,6,23,0.07)] bg-white shadow-[0_6px_18px_rgba(2,6,23,0.06)] transition hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(2,6,23,0.12)] hover:border-[rgba(2,6,23,0.12)] flex flex-col gap-2 p-6 mx-auto">
          <blockquote className="m-0 mb-2">
            "On time, thorough, and the house smelled amazing. Highly recommend!"
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Jamie L.</figcaption>
        </figure>
      </div>
    </section>
  );
}
