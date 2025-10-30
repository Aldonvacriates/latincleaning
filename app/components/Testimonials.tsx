export default function Testimonials() {
  return (
    <section id="testimonials" className="section reveal">
      <h2 className="section__title">What Our Customers Say</h2>
      <div className="grid testimonials-grid">
        <figure className="card testimonial">
          <blockquote>
            &ldquo;They left our office spotless before a big client visit. Super reliable!&rdquo;
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Morgan R.</figcaption>
        </figure>
        <figure className="card testimonial">
          <blockquote>
            &ldquo;Best deep clean we&apos;ve had. Friendly team and great communication.&rdquo;
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Alex P.</figcaption>
        </figure>
        <figure className="card testimonial">
          <blockquote>
            &ldquo;On time, thorough, and the house smelled amazing. Highly recommend!&rdquo;
          </blockquote>
          <div className="stars" aria-label="5 star rating">★★★★★</div>
          <figcaption>- Jamie L.</figcaption>
        </figure>
      </div>
    </section>
  );
}
