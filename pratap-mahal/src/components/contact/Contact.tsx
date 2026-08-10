'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-contact-heading] > *', {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-contact-heading]', start: 'top 85%' },
      });

      gsap.from('[data-contact-info]', {
        x: -40, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-contact-grid]', start: 'top 82%' },
      });

      gsap.from('[data-contact-form]', {
        x: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-contact-grid]', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <div data-contact-heading className="text-center mb-16 md:mb-24">
          <span className="section-label block mb-4">Reservations</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-5">
            Begin Your Journey
          </h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Our dedicated concierge team awaits to curate your perfect royal
            experience at Pratap Mahal.
          </p>
        </div>

        <div data-contact-grid className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Contact Info */}
          <div data-contact-info className="flex flex-col gap-8">
            {/* Map placeholder */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-card border border-gold/6">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-amber-950/15" />
              <div className="absolute inset-0 dot-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-gold/50">Pratap Mahal, Udaipur</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/60 block mb-3">Address</span>
                <p className="text-foreground/65 text-sm leading-[1.8]">
                  Pratap Mahal by Taj<br />Lake Palace Road<br />Udaipur, Rajasthan 313001<br />India
                </p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/60 block mb-3">Contact</span>
                <p className="text-foreground/65 text-sm leading-[1.8]">
                  +91 294 252 8800<br />reservations@pratapmahal.taj.com
                </p>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/60 block mb-2 mt-5">Concierge</span>
                <p className="text-foreground/65 text-sm">Available 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div data-contact-form>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Full Name</label>
                  <input type="text" className="luxury-input" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Email</label>
                  <input type="email" className="luxury-input" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Check-in</label>
                  <input type="date" className="luxury-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Check-out</label>
                  <input type="date" className="luxury-input" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Phone</label>
                  <input type="tel" className="luxury-input" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Room Type</label>
                  <select className="luxury-input appearance-none" defaultValue="">
                    <option value="" disabled>Select a room</option>
                    <option value="maharaja">The Maharaja Suite</option>
                    <option value="heritage">Royal Heritage Room</option>
                    <option value="grand">Grand Palace Suite</option>
                    <option value="courtyard">Courtyard Pavilion</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.25em] uppercase text-gold/60">Special Requests</label>
                <textarea
                  rows={4}
                  className="luxury-input resize-none"
                  placeholder="Anniversary celebration, dietary requirements, airport transfer..."
                />
              </div>

              <button type="submit" className="btn-gold-filled mt-1 w-full sm:w-auto self-start">
                Request Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
