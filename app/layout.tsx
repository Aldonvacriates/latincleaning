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
      </body>
    </html>
  );
}
