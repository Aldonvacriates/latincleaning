"use client";
import Image from "next/image";
import ManageCookiesLink from "./ManageCookiesLink";
import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer__grid">
        <div>
          <h4>{t('footer.contact')}</h4>
          <ul>
            <li><a href="tel:+18018606299">Phone: (801) 860-5172</a></li>
            <li>
              <a href="mailto:hello@latinclean.online">Email: hello@latinclean.online</a>
            </li>
            <li>
              <a href="https://wa.me/18018606299?text=Hello%20Latin%20Cleaning!%20I%27d%20like%20a%20quote." target="_blank" rel="noopener">
                WhatsApp: +1 801-860-6299
              </a>
            </li>
            <li>
              <a href="#findus" aria-label="Scroll to the Find Us section">
                Location: Park City, Utah, USA
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.quick')}</h4>
          <ul>
            <li><a href="#services">{t('nav.services')}</a></li>
            <li><a href="#about">{t('nav.about')}</a></li>
            <li><a href="/privacy">{t('footer.privacy')}</a></li>
            <li>
              <a href="https://instagram.com/Latin_cleaning0" target="_blank" rel="noopener">{t('nav.instagram')}</a>
            </li>
            <li>
              <ManageCookiesLink />
            </li>
          </ul>
        </div>
        <div className="footer__brand">
          <Image src="/Favicon.png" alt="Latin Cleaning logo small" width={40} height={40} />
          <p>© <span>{year}</span> Latin Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
