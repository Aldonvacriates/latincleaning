"use client";
import { useId, useState } from "react";
import { useI18n } from "./I18nProvider";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  time: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  type: "",
  date: "",
  time: "",
  message: "",
};

export default function QuoteTailwind() {
  const { t } = useI18n();
  const formId = useId();
  const router = useRouter();
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<{ kind: 'idle' | 'error' | 'success' | 'loading'; msg: string }>({ kind: 'idle', msg: '' });

  const setField = (k: keyof FormState, v: string) => setData((d) => ({ ...d, [k]: v }));

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) next.email = 'Enter a valid email.';
    if (data.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number.';
    (['type', 'date', 'time', 'message'] as (keyof FormState)[]).forEach((k) => {
      if (!String(data[k] || '').trim()) next[k] = 'Required.';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'idle', msg: '' });
    if (!validate()) {
      setStatus({ kind: 'error', msg: 'Please fix the highlighted fields and try again.' });
      return;
    }
    setStatus({ kind: 'loading', msg: '' });
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Bad response');
        const j = await res.json();
        if (!j.ok) throw new Error('Error');
        router.push('/thanks');
      })
      .catch(() => {
        setStatus({ kind: 'error', msg: 'Something went wrong. Please try again.' });
      });
  }

  return (
    <section id="quote" className="px-6 py-14 max-w-[1200px] mx-auto reveal">
      <h2 className="text-center font-bold text-[clamp(24px,3.2vw,40px)] mb-4">{t('quote.title')}</h2>

      <form
        className="max-w-[860px] mx-auto bg-white border border-[color:var(--light-gray)] rounded-2xl shadow p-6"
        onSubmit={onSubmit}
        aria-describedby={`${formId}-status`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.name')}</span>
            <input
              type="text"
              name="name"
              placeholder={t('quote.name')}
              value={data.name}
              onChange={(e) => setField('name', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.name ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.name || ''}</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.email')}</span>
            <input
              type="email"
              name="email"
              placeholder={t('quote.email')}
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.email ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.email || ''}</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.phone')}</span>
            <input
              type="tel"
              name="phone"
              placeholder={t('quote.phone')}
              value={data.phone}
              onChange={(e) => setField('phone', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.phone ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.phone || ''}</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.type')}</span>
            <select
              name="type"
              value={data.type}
              onChange={(e) => setField('type', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.type ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            >
              <option value="">{t('quote.select')}</option>
              <option>{t('quote.residential')}</option>
              <option>{t('quote.commercial')}</option>
              <option>{t('quote.deep')}</option>
              <option>{t('quote.move')}</option>
              <option>{t('quote.carpet')}</option>
            </select>
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.type || ''}</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.date')}</span>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={(e) => setField('date', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.date ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.date || ''}</span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-[0.92rem]">{t('quote.time')}</span>
            <input
              type="time"
              name="time"
              value={data.time}
              onChange={(e) => setField('time', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.time ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.time || ''}</span>
          </label>
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="font-semibold text-[0.92rem]">{t('quote.details')}</span>
            <textarea
              name="message"
              rows={4}
              placeholder={t('quote.details')}
              value={data.message}
              onChange={(e) => setField('message', e.target.value)}
              required
              className={`appearance-none w-full rounded-[12px] border px-3.5 py-3 bg-[color:var(--field-bg)] text-[color:var(--field-text)] border-[color:var(--field-border)] shadow-[inset_0_-1px_0_rgba(2,6,23,.02)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:border-[color:var(--focus-ring)] ${errors.message ? 'border-[#d32f2f] ring-2 ring-[#d32f2f]/30' : ''}`}
            />
            <span className="text-[#d32f2f] min-h-[1.1em] text-[0.85rem]" role="alert">{errors.message || ''}</span>
          </label>
        </div>

        <button
          id="quoteSubmit"
          type="submit"
          disabled={status.kind === 'loading'}
          aria-busy={status.kind === 'loading'}
          className="inline-block rounded-full px-5 py-3 font-semibold shadow bg-[color:var(--accent2)] text-[#0b1220] border border-[color-mix(in_oklab,var(--accent2)_65%,black_35%)] hover:brightness-105 disabled:opacity-65 disabled:cursor-not-allowed"
        >
          {status.kind === 'loading' ? 'Sending.' : t('quote.submit')}
        </button>
        <div
          id={`${formId}-status`}
          role="status"
          aria-live="polite"
          className={[
            "mt-3 font-semibold px-3 py-2 rounded-[12px]",
            status.kind === 'idle' ? 'hidden' : '',
            status.kind === 'error' ? 'block bg-[#ffebee] border border-[#ef9a9a] text-[#d32f2f]' : '',
            status.kind === 'success' ? 'block bg-[#e8f5e9] border border-[#c8e6c9] text-[#388e3c]' : '',
          ].join(' ')}
        >
          {status.msg}
        </div>
      </form>
    </section>
  );
}

