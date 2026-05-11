import { useLenisInit } from '@/hooks/useLenis';
import Navigation from '@/sections/Navigation';
import CursorSpotlight from '@/sections/CursorSpotlight';
import Hero from '@/sections/Hero';
import Manifesto from '@/sections/Manifesto';
import ProofOfWork from '@/sections/ProofOfWork';
import Work from '@/sections/Work';
import Skills from '@/sections/Skills';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function App() {
  useLenisInit();

  return (
    <>
      <CursorSpotlight />
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <ProofOfWork />
        <Work />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
