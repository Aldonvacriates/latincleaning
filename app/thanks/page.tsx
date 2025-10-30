export const metadata = { title: 'Thank You - Latin Cleaning' };

export default function ThanksPage() {
  return (
    <main className="section" role="status" aria-live="polite">
      <div className="form" style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>We&apos;ve received your request and will get back to you shortly.</p>
        <p>
          If this is urgent, call us at{' '}
          <a href="tel:+18018606299">(801) 860-6299</a>.
        </p>
        <p>
          <a className="btn btn--primary" href="/">Back to Home</a>
        </p>
      </div>
    </main>
  );
}

