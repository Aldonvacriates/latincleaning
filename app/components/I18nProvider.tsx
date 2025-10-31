"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translate, type Lang } from "../i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);
const KEY = "lang";

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (l: Lang) => setLangState(l);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(KEY) as Lang | null);
      const initial: Lang = saved ?? (navigator.language?.startsWith("es") ? "es" : "en");
      setLangState(initial);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch {
      // ignore storage errors
    }
    try {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
    } catch {
      // ignore DOM errors
    }
  }, [lang]);

  const value: Ctx = useMemo(() => ({
    lang,
    setLang,
    t: (key: string) => translate(lang, key),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
