'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const restaurants = [
  {
    name: 'Durbar',
    cuisine: 'Royal Indian Fine Dining',
    description:
      'A regal dining experience beneath crystal chandeliers, featuring centuries-old recipes from the royal kitchens of Rajasthan, reimagined for the modern palate.',
    hours: '7:00 PM - 11:00 PM',
    gradient: 'from-amber-900/35 via-orange-950/20 to-stone-950',
  },
  {
    name: 'The Courtyard',
    cuisine: 'Mediterranean & International',
    description:
      'Al fresco dining in the palace\'s historic central courtyard, surrounded by centuries-old arches and the gentle melody of flowing fountains.',
    hours: '12:00 PM - 10:30 PM',
    gradient: 'from-emerald-950/30 via-stone-900/30 to-amber-950/15',
  },
  {
    name: 'Sheesh Mahal',
    cuisine: 'Cocktail Lounge & Bar',
    description:
      'An intimate lounge adorned with mirror mosaics, offering bespoke cocktails inspired by Rajasthani botanicals and a curated selection of rare spirits.',
    hours: '5:00 PM - 1:00 AM',
    gradient: 'from-indigo-950/30 via-purple-950/15 to-stone-950',
  },
];

export default function Dining() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-dining-heading] > *', {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-dining-heading]', start: 'top 80%' },
      });

      const cards = gsap.utils.toArray('[data-dining-card]') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 1, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });

      gsap.to('[data-dining-hero]', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="dining" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        {/* Hero Image Area */}
        <div className="relative h-[45vh] md:h-[55vh] mb-16 md:mb-24 overflow-hidden rounded-lg">
          <div data-dining-hero className="absolute inset-[-15%] bg-gradient-to-br from-amber-900/20 via-stone-900 to-red-950/15" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20" />

          <div data-dining-heading className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="section-label block mb-4">Culinary Excellence</span>
            <h2 className="font-serif text-[clamp(2rem,6vw,5rem)] text-foreground mb-5 leading-[1.1]">
              A Feast for<br />
              <span className="text-gradient-gold">the Senses</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-lg leading-relaxed">
              Three distinctive dining venues, each a journey through flavour,
              tradition, and artistry.
            </p>
          </div>
        </div>

        {/* Restaurant Cards */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.name} data-dining-card className="luxury-card group">
              <div className="relative h-48 md:h-56 overflow-hidden rounded-t-[5px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${restaurant.gradient} group-hover:scale-105 transition-transform duration-700 ease-out`} />
                <div className="absolute inset-0 dot-pattern opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
              </div>

              <div className="p-6 md:p-7">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold/60 block mb-2">
                  {restaurant.cuisine}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                  {restaurant.name}
                </h3>
                <p className="text-muted text-sm leading-[1.7] mb-5">
                  {restaurant.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gold/8">
                  <span className="text-[11px] text-muted tracking-wider">{restaurant.hours}</span>
                  <a href="#contact" className="text-[11px] tracking-[0.12em] uppercase text-gold hover:text-gold-light transition-colors">
                    Reserve &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
