export const metadata = {
  title: 'Latin Cleaning',
  description: 'Professional Cleaning Services',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
} as const;

import '../styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Montserrat } from 'next/font/google';
import CookieBanner from './components/CookieBanner';
import RevealProvider from './components/RevealProvider';
import AnalyticsConsent from './components/AnalyticsConsent';
import SmoothScrollProvider from './components/SmoothScrollProvider';

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
        <Header />
        <SmoothScrollProvider />
        <RevealProvider />
        {children}
        <CookieBanner />
        <AnalyticsConsent />
        <Footer />
      </body>
    </html>
  );
}
