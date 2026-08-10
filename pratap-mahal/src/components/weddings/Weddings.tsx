'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const stats = [
  { value: '2000+', label: 'Guest Capacity' },
  { value: '7', label: 'Exclusive Venues' },
  { value: '100%', label: 'Bespoke Planning' },
];

const venues = [
  {
    name: 'The Grand Durbar Hall',
    capacity: '1,200 Guests',
    description: 'A magnificent hall with 40-foot ceilings, adorned with crystal chandeliers and gold leaf detailing.',
  },
  {
    name: 'Palace Lawns',
    capacity: '2,000 Guests',
    description: 'Open-air splendour beneath the stars, surrounded by torchlit pathways and the palace silhouette.',
  },
  {
    name: 'The Mirror Pavilion',
    capacity: '400 Guests',
    description: 'An intimate venue of shimmering mirrors and candlelight, perfect for close ceremonies and receptions.',
  },
];

export default function Weddings() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-wedding-bg]', {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.from('[data-wedding-content] > *', {
        y: 60, opacity: 0, duration: 1.3, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-wedding-content]', start: 'top 80%' },
      });

      gsap.from('[data-wedding-stat]', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-wedding-stats]', start: 'top 88%' },
      });

      gsap.from('[data-wedding-card]', {
        y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-wedding-cards]', start: 'top 88%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="weddings" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      {/* Full-height parallax hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <div data-wedding-bg className="absolute inset-[-20%] bg-gradient-to-br from-rose-950/25 via-amber-950/30 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div data-wedding-content className="relative text-center px-5 md:px-10 max-w-3xl mx-auto">
          <span className="section-label block mb-5">Destination Weddings</span>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] text-foreground leading-[1] mb-7">
            A Royal <span className="text-gradient-gold italic">Celebration</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/55 max-w-xl mx-auto mb-10 leading-relaxed">
            Transform your most precious moment into a grand affair befitting
            royalty. Seven magnificent venues, each steeped in history, await.
          </p>

          <div data-wedding-stats className="flex flex-wrap justify-center gap-10 md:gap-16 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} data-wedding-stat className="text-center">
                <span className="font-serif text-2xl md:text-3xl text-gradient-gold block mb-1">{stat.value}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-gold-filled">Plan Your Wedding</a>
        </div>
      </div>

      {/* Venue cards */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12 py-24 md:py-32">
        <div data-wedding-cards className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {venues.map((venue) => (
            <div key={venue.name} data-wedding-card className="luxury-card group p-7 md:p-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold/50 block mb-3">{venue.capacity}</span>
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-3 group-hover:text-gold transition-colors duration-500">
                {venue.name}
              </h3>
              <p className="text-muted text-sm leading-[1.7]">{venue.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
