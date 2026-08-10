'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const experiences = [
  {
    title: 'Royal Spa',
    description: 'Ancient Ayurvedic therapies and modern wellness rituals in a serene palace sanctuary surrounded by lotus ponds.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <circle cx="16" cy="16" r="6" /><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
      </svg>
    ),
  },
  {
    title: 'Heritage Pool',
    description: 'A temperature-controlled infinity pool overlooking the Aravalli hills, flanked by sandstone pavilions and cabanas.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M4 20c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0M4 26c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0M10 14V8a4 4 0 018 0v6" />
      </svg>
    ),
  },
  {
    title: 'Horse Riding',
    description: 'Explore the palace grounds and surrounding countryside on magnificent Marwari horses, guided by expert riders.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M6 26l4-10 6-2 4 2 2-4 4-2 2 4M8 16c2-4 6-8 10-8M22 12l-2 6M12 14l-2 8" />
        <circle cx="22" cy="8" r="2" />
      </svg>
    ),
  },
  {
    title: 'Royal Dinner',
    description: 'A private dining experience under the stars, set in the palace\'s ancient hunting grounds with live folk performances.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M16 4v6M12 10h8M10 10c0 6 2 10 6 14 4-4 6-8 6-14" />
        <path d="M6 28h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Garden Walk',
    description: 'Stroll through 12 acres of Mughal-inspired gardens featuring rare orchids, reflecting pools, and sculpted topiaries.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M16 28V16M16 16c-4-2-8-6-6-10s6-2 6 2c0-4 4-6 6-2s-2 8-6 10" />
        <path d="M10 28h12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Camel Safari',
    description: 'Journey into the golden Thar Desert at sunrise, discovering ancient temples and villages along historic caravan routes.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M4 24h2l2-6 4-2 2 2h4l2-2 4 2 2 6h2M12 18v-4l2-4h4l2 4v4" />
        <circle cx="16" cy="8" r="2" />
      </svg>
    ),
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-exp-heading] > *', {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-exp-heading]', start: 'top 85%' },
      });

      const cards = gsap.utils.toArray('[data-exp-card]') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.9, delay: (i % 3) * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experiences" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12 relative">
        <div data-exp-heading className="text-center mb-16 md:mb-24">
          <span className="section-label block mb-4">Curated for You</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-5">
            Royal Experiences
          </h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Discover a world of extraordinary moments, each designed to immerse
            you in the heritage and splendour of Rajasthan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              data-exp-card
              className="luxury-card group relative p-7 md:p-8"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-[6px] bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/4 group-hover:to-transparent transition-all duration-600 pointer-events-none" />

              <div className="relative">
                <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {exp.icon}
                </div>
                <h3 className="font-serif text-lg md:text-xl text-foreground mb-3">{exp.title}</h3>
                <p className="text-muted text-sm leading-[1.7] mb-5">{exp.description}</p>
                <span className="text-[11px] tracking-[0.15em] uppercase text-gold/50 group-hover:text-gold transition-colors duration-400">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
