"use client";

const STORAGE_KEY = "lc_cookie_consent_v1" as const;

export default function ManageCookiesLink() {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = "lc_cookie_consent=; Max-Age=0; Path=/; SameSite=Lax";
    } catch {}
    window.dispatchEvent(new Event('lc:manage-cookies'));
  }

  return (
    <a href="#" onClick={onClick} aria-label="Manage cookie preferences">Manage Cookies</a>
  );
}
