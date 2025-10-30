"use client";
import { useI18n } from "./I18nProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const toggle = () => setLang(lang === "en" ? "es" : "en");
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
      title={lang === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}
