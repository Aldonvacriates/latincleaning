import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section reveal">
      <h2 className="section__title">About Us</h2>
      <div className="about">
        <div>
          <p>
            Latin Cleaning provides reliable, eco‑friendly residential and commercial cleaning
            in Park City and nearby areas. We’re a bilingual team focused on quality,
            safety, and flexibility — from one‑time deep cleans to recurring service.
          </p>
          <p>
            We bring our own supplies, follow your preferences, and stand behind our work
            with a satisfaction guarantee.
          </p>
          <ul className="about__list">
            <li>Licensed and insured professionals</li>
            <li>Pet‑safe and kid‑safe products</li>
            <li>Custom checklists available</li>
          </ul>
        </div>
        <div className="about__media about__media--logo">
          <Image
            src="/images/latincleanf.jpg"
            alt="Latin Cleaning logo"
            width={560}
            height={560}
            sizes="(max-width: 600px) 220px, (max-width: 900px) 320px, 520px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
