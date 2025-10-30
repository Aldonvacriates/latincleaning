"use client";
import { useId, useState } from "react";
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
      <h2 className="section__title">Pricing &amp; Free Quote</h2>

      <form className="form" onSubmit={onSubmit} aria-describedby={`${formId}-status`}>
        <div className="grid quote-grid">
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setField('name', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.name || ''}</span>
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.email || ''}</span>
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={(e) => setField('phone', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.phone || ''}</span>
          </label>
          <label className="field">
            <span>Service Type</span>
            <select name="type" value={data.type} onChange={(e) => setField('type', e.target.value)} required>
              <option value="">Select…</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Deep Cleaning</option>
              <option>Move-in/Move-out</option>
              <option>Carpet &amp; Upholstery</option>
            </select>
            <span className="error" role="alert">{errors.type || ''}</span>
          </label>
          <label className="field">
            <span>Preferred Date</span>
            <input type="date" name="date" value={data.date} onChange={(e) => setField('date', e.target.value)} required />
            <span className="error" role="alert">{errors.date || ''}</span>
          </label>
          <label className="field">
            <span>Preferred Time</span>
            <input type="time" name="time" value={data.time} onChange={(e) => setField('time', e.target.value)} required />
            <span className="error" role="alert">{errors.time || ''}</span>
          </label>
          <label className="field field--full">
            <span>Details</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Details"
              value={data.message}
              onChange={(e) => setField('message', e.target.value)}
              required
            />
            <span className="error" role="alert">{errors.message || ''}</span>
          </label>
        </div>

        <button id="quoteSubmit" className="btn btn--primary" type="submit" disabled={status.kind === 'loading'} aria-busy={status.kind === 'loading'}>
          {status.kind === 'loading' ? 'Sending…' : 'Request Quote'}
        </button>
        <div id={`${formId}-status`} className={`form-status${status.kind === 'error' ? ' is-error' : status.kind === 'success' ? ' is-success' : ''}`} role="status" aria-live="polite">{status.msg}</div>
      </form>
    </section>
  );
}
