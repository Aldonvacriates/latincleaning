"use client";
import Image from "next/image";
import { useI18n } from "./I18nProvider";

export default function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section reveal">
      <h2 className="section__title">{t('about.title')}</h2>
      <div className="about">
        <div>
          <p>
            {/* Keep brief generic copy; could be localized further if needed */}
            {t('why.title')}
          </p>
          <p>{t('hero.sub')}</p>
          <ul className="about__list">
            <li>Licensed and insured professionals</li>
            <li>Pet‑safe and kid‑safe products</li>
            <li>Custom checklists available</li>
          </ul>
        </div>
        <div className="about__media about__media--logo">
          <Image
            src="/images/latincleanf.jpg"
            alt="Latin Cleaning logo"
            width={560}
            height={560}
            sizes="(max-width: 600px) 220px, (max-width: 900px) 320px, 520px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
