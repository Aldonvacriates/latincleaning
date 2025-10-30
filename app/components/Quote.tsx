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

export default function Quote() {
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
    <section id="quote" className="section reveal">
      <h2 className="section__title">{t('quote.title')}</h2>

      <form className="form" onSubmit={onSubmit} aria-describedby={`${formId}-status`}>
        <div className="grid quote-grid">
          <label className="field">
            <span>{t('quote.name')}</span>
            <input
              type="text"
              name="name"
              placeholder={t('quote.name')}
              value={data.name}
              onChange={(e) => setField('name', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.name || ''}</span>
          </label>
          <label className="field">
            <span>{t('quote.email')}</span>
            <input
              type="email"
              name="email"
              placeholder={t('quote.email')}
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.email || ''}</span>
          </label>
          <label className="field">
            <span>{t('quote.phone')}</span>
            <input
              type="tel"
              name="phone"
              placeholder={t('quote.phone')}
              value={data.phone}
              onChange={(e) => setField('phone', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.phone || ''}</span>
          </label>
          <label className="field">
            <span>{t('quote.type')}</span>
            <select name="type" value={data.type} onChange={(e) => setField('type', e.target.value)} required>
              <option value="">{t('quote.select')}</option>
              <option>{t('quote.residential')}</option>
              <option>{t('quote.commercial')}</option>
              <option>{t('quote.deep')}</option>
              <option>{t('quote.move')}</option>
              <option>{t('quote.carpet')}</option>
            </select>
            <span className="error" role="alert">{errors.type || ''}</span>
          </label>
          <label className="field">
            <span>{t('quote.date')}</span>
            <input type="date" name="date" value={data.date} onChange={(e) => setField('date', e.target.value)} required />
            <span className="error" role="alert">{errors.date || ''}</span>
          </label>
          <label className="field">
            <span>{t('quote.time')}</span>
            <input type="time" name="time" value={data.time} onChange={(e) => setField('time', e.target.value)} required />
            <span className="error" role="alert">{errors.time || ''}</span>
          </label>
          <label className="field field--full">
            <span>{t('quote.details')}</span>
            <textarea
              name="message"
              rows={4}
              placeholder={t('quote.details')}
              value={data.message}
              onChange={(e) => setField('message', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.message || ''}</span>
          </label>
        </div>

        <button id="quoteSubmit" className="btn btn--primary" type="submit" disabled={status.kind === 'loading'} aria-busy={status.kind === 'loading'}>
          {status.kind === 'loading' ? 'Sending…' : t('quote.submit')}
        </button>
        <div id={`${formId}-status`} className={`form-status${status.kind === 'error' ? ' is-error' : status.kind === 'success' ? ' is-success' : ''}`} role="status" aria-live="polite">{status.msg}</div>
      </form>
    </section>
  );
}
