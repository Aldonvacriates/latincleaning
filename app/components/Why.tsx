"use client";
import { useI18n } from "./I18nProvider";

export default function Why() {
  const { t } = useI18n();
  return (
    <section id="why" className="px-6 py-14 max-w-[1200px] mx-auto bg-[rgba(168,205,231,0.2)] rounded-2xl reveal">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-6">{t('why.title')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[{
          key:'f1', icon:(
            <>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
              <path d="M12 8v4l3 3"></path>
            </>
          )},
          {key:'f2', icon:(
            <>
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.35L22 7.65V19z"></path>
              <line x1="16" y1="3" x2="16" y2="9"></line>
              <line x1="16" y1="8" x2="22" y2="8"></line>
              <line x1="10" y1="12" x2="10" y2="18"></line>
            </>
          )},
          {key:'f3', icon:(
            <>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </>
          )},
          {key:'f4', icon:(
            <>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </>
          )},].map((f, _i) => (
          <article key={f.key} className="bg-white p-6 rounded-2xl shadow border border-[color:var(--light-gray)]">
            <div className="w-[52px] h-[52px] rounded-[12px] mb-2.5 bg-[color:var(--accent2)] shadow-[inset_0_0_0_4px_#fff,0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[color:var(--navy)]">
                {f.icon}
              </svg>
            </div>
            <h3 className="m-0 font-semibold">{t(`why.${f.key}.t`)}</h3>
            <p className="m-0 text-[#475569] text-[.96rem] leading-[1.55]">{t(`why.${f.key}.d`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
