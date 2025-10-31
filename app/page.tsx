import Hero from "./components/Hero";
import Services from "./components/Services";
import Why from "./components/Why";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Quote from "./components/QuoteTailwind";
import BeforeAfter from "./components/BeforeAfter";
import FindUs from "./components/FindUs";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Services />
      <BeforeAfter />
      <Why />
      <Testimonials />
      <About />
      <FindUs />
      <Quote />
    </main>
  );
}
