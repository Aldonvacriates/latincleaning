"use client";
import MapEmbed from "./MapEmbed";
import { useI18n } from "./I18nProvider";

export default function FindUs() {
  const { t } = useI18n();
  return (
    <section id="findus" className="px-6 py-14 max-w-[1200px] mx-auto reveal">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-2">{t('findus.title')}</h2>
      <p className="text-center opacity-85 max-w-[700px] mx-auto mt-1 mb-8">We proudly serve Park City, Utah and nearby areas.</p>

      <div className="bg-white border border-[color:var(--light-gray)] rounded-2xl shadow p-[clamp(1rem,2.5vw,1.5rem)]">
        <div className="grid gap-5 lg:[grid-template-columns:1fr_1.35fr] items-start">
          <div>
            <h3 className="m-1 text-[1.15rem]">{t('findus.serviceArea')}</h3>
            <ul className="flex flex-wrap gap-2 list-none p-0 my-1" aria-label="Areas we commonly serve">
              {[
                'Park City','Deer Valley','Canyons Village','Kimball Junction','Snyderville','Silver Summit','Heber City','Midway'
              ].map((city) => (
                <li
                  key={city}
                  className="relative px-3 py-1.5 pl-5 rounded-full border border-[color:var(--light-gray)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] text-[color:var(--navy)] font-semibold shadow-[0_2px_8px_rgba(2,6,23,.06)] text-[.92rem]"
                >
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[color:var(--accent1)] shadow-[0_0_0_3px_rgba(244,143,177,.18)]" />
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[#475569] text-[.92rem]" aria-label="Nearby areas note">{t('findus.more')}</p>

            <ul className="list-none p-2 mt-2 grid gap-2 rounded-[14px] border border-[color:var(--light-gray)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)]" aria-label="Contact details">
              <li className="grid [grid-template-columns:36px_1fr] items-start gap-2 p-1.5 rounded-[12px]">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,.6)]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-[.92rem] mb-0.5">{t('findus.address')}</div>
                  <div className="font-bold text-[color:var(--accent1)]">Park City, Utah, USA</div>
                </div>
              </li>
              <li className="grid [grid-template-columns:36px_1fr] items-start gap-2 p-1.5 rounded-[12px]">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,.6)]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.57 3.26a2 2 0 0 1-.54 1.84L9.91 11.09a16 16 0 0 0 6 6l1.27-1.21a2 2 0 0 1 1.84-.54l3.26.57A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-[.92rem] mb-0.5">{t('findus.phone')}</div>
                  <div><a className="font-bold text-[color:var(--accent1)] no-underline" href="tel:+18018606299">(801) 860-6299</a></div>
                </div>
              </li>
              <li className="grid [grid-template-columns:36px_1fr] items-start gap-2 p-1.5 rounded-[12px]">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,.6)]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" fill="none"/>
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-[.92rem] mb-0.5">{t('findus.email')}</div>
                  <div><a className="font-bold text-[color:var(--accent1)] no-underline" href="mailto:hello@latinclean.online">hello@latinclean.online</a></div>
                </div>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-2 mt-3 [@media(max-width:272px)]:grid-cols-1">
              <a className="inline-block text-center rounded-full px-4 py-2.5 font-semibold shadow bg-[color:var(--accent1)] text-black" href="tel:+18018606299">{t('findus.call')}</a>
              <a className="inline-block text-center rounded-full px-4 py-2.5 font-semibold shadow bg-[color:var(--accent1)] text-black" href="mailto:hello@latinclean.online">{t('findus.mail')}</a>
              <a
                className="col-span-2 inline-block text-center rounded-full px-4 py-2.5 font-semibold shadow bg-[color:var(--accent1)] text-black"
                href="https://www.google.com/maps/search/?api=1&query=Park+City%2C+UT"
                target="_blank"
                rel="noopener"
                aria-label="Open Park City, Utah in Google Maps (opens in new tab)"
              >
                {t('findus.maps')}
              </a>
            </div>
          </div>
          <div>
            <MapEmbed query="Park City, Utah, USA" zoom={12} />
          </div>
        </div>
      </div>
    </section>
  );
}
