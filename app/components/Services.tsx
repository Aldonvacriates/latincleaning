"use client";
import Image from "next/image";
import { useI18n } from "./I18nProvider";

export default function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="section">
      <h2 className="section__title">{t('services.title')}</h2>
      <p className="section__lead">
        From homes to offices and vacation rentals-we make every space shine.
      </p>

      <div className="grid services-grid">
        {/* Residential Cleaning */}
        <article className="card service">
          <div className="card__media">
            <Image
              src="/images/services/residential.jpg"
              alt="Freshly cleaned living room with sunlight"
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
            <span className="badge-icon" aria-hidden="true">
              {/* home icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span className="media-gradient" aria-hidden="true"></span>
          </div>
          <div className="card__body">
            <h3>{t('svc.res.title')}</h3>
            <p>{t('svc.res.desc')}</p>
          </div>
        </article>

        {/* Commercial Cleaning */}
        <article className="card service">
          <div className="card__media">
            <Image
              src="/images/services/commercial.jpg"
              alt="Clean office workspace with tidy desks and glass walls"
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
            <span className="badge-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </span>
            <span className="media-gradient" aria-hidden="true"></span>
          </div>
          <div className="card__body">
            <h3>{t('svc.com.title')}</h3>
            <p>{t('svc.com.desc')}</p>
          </div>
        </article>

        {/* Deep Cleaning */}
        <article className="card service">
          <div className="card__media">
            <Image
              src="/images/services/deep-clean.jpg"
              alt="Sparkling kitchen counters and sink after a deep clean"
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
            <span className="badge-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 12.5c-.5 2.5-2.34 4.54-5.26 5.25L12 21l-4.24-3.25C4.84 17.04 3 15.01 2.5 12.5 2 10.5 3.5 9 5.5 8.5 7.5 8 9 8 11 9l1-1 1 1c2-1 3.5-1.5 5.5-.5s2.5 2 2 4z"></path>
              </svg>
            </span>
            <span className="media-gradient" aria-hidden="true"></span>
          </div>
          <div className="card__body">
            <h3>{t('svc.deep.title')}</h3>
            <p>{t('svc.deep.desc')}</p>
          </div>
        </article>

        {/* Move-in/Move-out */}
        <article className="card service">
          <div className="card__media">
            <Image
              src="/images/services/move.jpg"
              alt="Empty bright room with moving boxes and clean floors"
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
            <span className="badge-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </span>
            <span className="media-gradient" aria-hidden="true"></span>
          </div>
          <div className="card__body">
            <h3>{t('svc.move.title')}</h3>
            <p>{t('svc.move.desc')}</p>
          </div>
        </article>

        {/* Carpet & Upholstery */}
        <article className="card service">
          <div className="card__media">
            <Image
              src="/images/services/carpet.jpg"
              alt="Technician cleaning a light carpet with professional equipment"
              fill
              sizes="(min-width: 900px) 420px, 100vw"
            />
            <span className="badge-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10v0a10 10 0 0 0-10-10z"></path>
                <path d="M12 8l4 4-4 4"></path>
                <path d="M12 12l-4 4"></path>
                <path d="M12 8l-4 4"></path>
                <path d="M12 16l4-4"></path>
              </svg>
            </span>
            <span className="media-gradient" aria-hidden="true"></span>
          </div>
          <div className="card__body">
            <h3>{t('svc.carpet.title')}</h3>
            <p>{t('svc.carpet.desc')}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
