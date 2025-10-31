"use client";
import Image from "next/image";
import { useI18n } from "./I18nProvider";

export default function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="px-6 py-14 max-w-[1200px] mx-auto reveal">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-4">{t('about.title')}</h2>
      <div className="grid gap-6 items-center lg:[grid-template-columns:1.1fr_0.9fr]">
        <div>
          <p>{t('why.title')}</p>
          <p>{t('hero.sub')}</p>
          <ul className="list-none p-0 mt-3">
            <li className="mb-2">Licensed and insured professionals</li>
            <li className="mb-2">Pet-safe and kid-safe products</li>
            <li className="mb-2">Custom checklists available</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/latincleanf.jpg"
            alt="Latin Cleaning logo"
            width={560}
            height={560}
            sizes="(max-width: 600px) 220px, (max-width: 900px) 320px, 520px"
            priority
            className="w-[clamp(220px,32vw,520px)] h-auto max-w-full rounded-[12px] border border-[color:var(--light-gray)] shadow"
          />
        </div>
      </div>
    </section>
  );
}
