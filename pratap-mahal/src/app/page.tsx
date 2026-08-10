'use client';

import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Rooms from '@/components/rooms/Rooms';
import Dining from '@/components/dining/Dining';
import Experiences from '@/components/experiences/Experiences';
import Weddings from '@/components/weddings/Weddings';
import Gallery from '@/components/gallery/Gallery';
import Testimonials from '@/components/testimonials/Testimonials';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Dining />
        <Experiences />
        <Weddings />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
