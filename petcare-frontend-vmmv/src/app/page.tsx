import Hero from '@/components/landing/Hero';
import WhyPetCare from '@/components/landing/WhyPetCare';
import ProcessSection from '@/components/landing/ProcessSection';
import Benefits from '@/components/landing/Benefits';
import FinalCTA from '@/components/landing/FinalCTA';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 scroll-smooth">
        <section id="inicio" className="scroll-mt-24">
          <Hero />
        </section>

        <WhyPetCare />

        <section id="como-funciona" className="scroll-mt-24">
          <ProcessSection />
        </section>

        <section id="servicios" className="scroll-mt-24">
          <Benefits />
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}