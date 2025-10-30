import MapEmbed from "./MapEmbed";

export default function FindUs() {
  return (
    <section id="findus" className="section reveal findus">
      <h2 className="section__title">Find Us</h2>
      <p className="section__lead">We proudly serve Park City, Utah and nearby areas.</p>

      <div className="findus__card">
        <div className="grid findus__grid">
          <div className="findus__info">
            <h3 className="findus__heading">Service Area</h3>
            <ul className="chips chips--fancy" aria-label="Areas we commonly serve">
              <li className="chip">Park City</li>
              <li className="chip">Deer Valley</li>
              <li className="chip">Canyons Village</li>
              <li className="chip">Kimball Junction</li>
              <li className="chip">Snyderville</li>
              <li className="chip">Silver Summit</li>
              <li className="chip">Heber City</li>
              <li className="chip">Midway</li>
            </ul>
            <p className="chips__note" aria-label="Nearby areas note">…and more nearby areas too!</p>

            <ul className="findus__meta" aria-label="Contact details">
              <li className="findus__item">
                <span className="findus__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <div>
              <div className="findus__label">Address</div>
                  <div className="findus__city">Park City, Utah, USA</div>
                </div>
              </li>
              <li className="findus__item">
                <span className="findus__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.57 3.26a2 2 0 0 1-.54 1.84L9.91 11.09a16 16 0 0 0 6 6l1.27-1.21a2 2 0 0 1 1.84-.54l3.26.57A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <div>
                  <div className="findus__label">Phone</div>
                  <div><a href="tel:+18018606299">(801) 860-6299</a></div>
                </div>
              </li>
              <li className="findus__item">
                <span className="findus__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" fill="none"/>
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <div className="findus__label">Email</div>
                  <div><a href="mailto:hello@latinclean.online">hello@latinclean.online</a></div>
                </div>
              </li>
            </ul>

            <div className="findus__actions">
              <a className="btn btn--pink btn--half" href="tel:+18018606299">Call Us</a>
              <a className="btn btn--pink btn--half" href="mailto:hello@latinclean.online">Email Us</a>
              <a
                className="btn btn--pink btn--full"
                href="https://www.google.com/maps/search/?api=1&query=Park+City%2C+UT"
                target="_blank"
                rel="noopener"
                aria-label="Open Park City, Utah in Google Maps (opens in new tab)"
              >
                Open in Google Maps
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
