export const metadata = { title: 'Thank You - Latin Cleaning' };

import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="px-6 py-14 max-w-[1200px] mx-auto" role="status" aria-live="polite">
      <div className="max-w-[860px] mx-auto bg-white border border-[color:var(--light-gray)] rounded-2xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p>We&apos;ve received your request and will get back to you shortly.</p>
        <p className="mt-2">
          If this is urgent, call us at{' '}
          <a className="font-semibold text-[color:var(--accent1)] no-underline" href="tel:+18018606299">(801) 860-6299</a>.
        </p>
        <p className="mt-4">
          <Link className="inline-block rounded-full px-5 py-3 font-semibold shadow bg-[color:var(--accent2)] text-[#0b1220] border border-[color-mix(in_oklab,var(--accent2)_65%,black_35%)] hover:brightness-105" href="/">Back to Home</Link>
        </p>
      </div>
    </main>
  );
}
