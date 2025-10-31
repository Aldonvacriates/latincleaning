"use client";
import Image from "next/image";
import ManageCookiesLink from "./ManageCookiesLink";
import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--navy)] text-white mt-9 py-9 px-6 dark:bg-[#0b1220] dark:text-[#e6edf3]">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 max-w-[1200px] mx-auto">
        <div>
          <h4>{t('footer.contact')}</h4>
          <ul>
            <li><a className="text-[var(--accent1)] no-underline hover:opacity-90" href="tel:+18018606299">Phone: (801) 860-6299</a></li>
            <li>
              <a className="text-[var(--accent1)] no-underline hover:opacity-90" href="mailto:hello@latinclean.online">Email: hello@latinclean.online</a>
            </li>
            <li>
              <a className="text-[var(--accent1)] no-underline hover:opacity-90" href="https://wa.me/18018606299?text=Hello%20Latin%20Cleaning!%20I%27d%20like%20a%20quote." target="_blank" rel="noopener">
                WhatsApp: +1 801-860-6299
              </a>
            </li>
            <li>
              <a className="text-[var(--accent1)] no-underline hover:opacity-90" href="#findus" aria-label="Scroll to the Find Us section">
                Location: Park City, Utah, USA
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.quick')}</h4>
          <ul>
            <li><a className="text-[var(--accent1)] no-underline hover:opacity-90" href="#services">{t('nav.services')}</a></li>
            <li><a className="text-[var(--accent1)] no-underline hover:opacity-90" href="#about">{t('nav.about')}</a></li>
            <li><a className="text-[var(--accent1)] no-underline hover:opacity-90" href="/privacy">{t('footer.privacy')}</a></li>
            <li>
              <a className="text-[var(--accent1)] no-underline hover:opacity-90" href="https://instagram.com/Latin_cleaning0" target="_blank" rel="noopener">{t('nav.instagram')}</a>
            </li>
            <li>
              <ManageCookiesLink />
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start">
          <Image className="w-14 h-14 rounded-[10px] mb-2 border border-[rgba(255,255,255,0.2)] dark:border-[rgba(248,250,252,0.18)]" src="/Favicon.png" alt="Latin Cleaning logo small" width={40} height={40} />
          <p className="opacity-80">© <span>{year}</span> Latin Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
