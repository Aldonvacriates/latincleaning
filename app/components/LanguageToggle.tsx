"use client";
import { useI18n } from "./I18nProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const toggle = () => setLang(lang === "en" ? "es" : "en");
  const aria = lang === "en" ? "Cambiar a espa\u00f1ol" : "Switch to English";
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center w-9 h-9 ml-1.5 rounded-full border border-white/15 font-bold tracking-[.5px] text-[#e6edf3] hover:brightness-110 order-[6] bg-white/10 backdrop-blur-sm"
      aria-label={aria}
      title={aria}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

