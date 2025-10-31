"use client";
import { useEffect } from "react";

const STORAGE_KEY = "lc_cookie_consent_v1" as const;

function hasAccepted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { choice } = JSON.parse(raw) as { choice?: string };
    return choice === 'accepted';
  } catch {
    // ignore storage or JSON parse errors
    return false;
  }
}

function loadGA(gaId: string) {
  if (!gaId) return;
  if (document.getElementById('ga-consent-loader')) return;
  const s = document.createElement('script');
  s.id = 'ga-consent-loader';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  const inline = document.createElement('script');
  inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`;
  document.head.appendChild(inline);
}

function loadPlausible(domain: string) {
  if (!domain) return;
  if (document.getElementById('pl-consent-loader')) return;
  const s = document.createElement('script');
  s.id = 'pl-consent-loader';
  s.defer = true;
  s.setAttribute('data-domain', domain);
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}

export default function AnalyticsConsent() {
  useEffect(() => {
    const enable = () => {
      const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
      const plDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '';
      if (gaId) loadGA(gaId);
      else if (plDomain) loadPlausible(plDomain);
    };
    if (hasAccepted()) enable();
    const onConsent = (e: Event) => {
      try {
        const ce = e as CustomEvent;
        if (ce.detail?.choice === 'accepted') enable();
      } catch {
        // ignore invalid custom events
      }
    };
    window.addEventListener('lc:consent', onConsent as EventListener);
    return () => window.removeEventListener('lc:consent', onConsent as EventListener);
  }, []);
  return null;
}
