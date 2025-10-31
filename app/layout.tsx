import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Latin Cleaning',
    template: '%s · Latin Cleaning',
  },
  description: 'Professional cleaning services in Park City, UT — residential, commercial, move-in/out, deep cleaning, carpet & upholstery.',
  metadataBase: new URL('https://latinclean.online'),
  openGraph: {
    title: 'Latin Cleaning',
    description: 'Professional cleaning services in Park City, UT — residential, commercial, move-in/out, deep cleaning, carpet & upholstery.',
    url: 'https://latinclean.online',
    siteName: 'Latin Cleaning',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Latin Cleaning' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latin Cleaning',
    description: 'Professional cleaning services in Park City, UT',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/Favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Montserrat } from 'next/font/google';
import CookieBanner from './components/CookieBanner';
import RevealProvider from './components/RevealProvider';
import AnalyticsConsent from './components/AnalyticsConsent';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import I18nProvider from './components/I18nProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Favicon.png" />
        <link rel="alternate icon" href="/favicon.svg" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#a8cde7" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b1220" />
      </head>
      <body className={montserrat.className}>
        {/* Animated site background */}
        <div className="site-bg" aria-hidden="true">
          <div className="site-bg__gradient" />
          <div className="site-bg__sparkles" />
        </div>
        <I18nProvider>
          <Header />
          <SmoothScrollProvider />
          <RevealProvider />
          {children}
          <CookieBanner />
          <AnalyticsConsent />
          <Footer />
        </I18nProvider>
        {/* Floating WhatsApp bubble */}
        <a
          href="https://wa.me/18018606299?text=Hello%20Latin%20Cleaning!%20I%27d%20like%20a%20quote."
          className="whatsapp-float"
          target="_blank"
          rel="noopener"
          aria-label="Chat with Latin Cleaning on WhatsApp (opens in new tab)"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M19.11 17.51c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.18.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
            <path d="M26.9 5.1A13.87 13.87 0 0 0 16 1.5C8.54 1.5 2.5 7.54 2.5 15c0 2.35.61 4.66 1.78 6.7L2 30l8.46-2.22A13.93 13.93 0 0 0 16 28.5C23.46 28.5 29.5 22.46 29.5 15c0-3.72-1.45-7.22-3.6-9.9zM16 26.25c-2.2 0-4.26-.65-5.98-1.78l-.43-.27-5.02 1.32 1.35-4.89-.29-.5A10.98 10.98 0 0 1 5 15c0-6.07 4.93-11 11-11s11 4.93 11 11-4.93 11-11 11z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
