'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const rooms = [
  {
    name: 'The Maharaja Suite',
    description:
      'An opulent sanctuary spanning 2,400 sq ft, featuring hand-painted murals, a private terrace overlooking the palace gardens, and a plunge pool with Aravalli views.',
    size: '2,400 sq ft',
    price: '85,000',
    features: ['Private Terrace', 'Plunge Pool', 'Butler Service', 'Heritage Frescoes'],
    gradient: 'from-amber-900/30 via-orange-950/20 to-stone-950',
  },
  {
    name: 'Royal Heritage Room',
    description:
      'Adorned with antique furnishings and traditional Rajasthani craftsmanship, each room offers a window into the palace\'s storied past with every modern comfort.',
    size: '800 sq ft',
    price: '35,000',
    features: ['Garden View', 'Antique Decor', 'Luxury Bath', 'Minibar'],
    gradient: 'from-stone-800/40 via-amber-950/20 to-stone-950',
  },
  {
    name: 'Grand Palace Suite',
    description:
      'A living masterpiece with vaulted ceilings, a private dining room, and floor-to-ceiling windows framing the majestic courtyard fountain.',
    size: '1,600 sq ft',
    price: '62,000',
    features: ['Courtyard View', 'Dining Room', 'Walk-in Closet', 'Jacuzzi'],
    gradient: 'from-yellow-950/25 via-stone-900/30 to-amber-950/20',
  },
  {
    name: 'Courtyard Pavilion',
    description:
      'An intimate retreat surrounded by fragrant jasmine gardens, featuring handcrafted teak furniture and a private meditation alcove.',
    size: '650 sq ft',
    price: '28,000',
    features: ['Garden Access', 'Meditation Alcove', 'Teak Furnishings', 'Rain Shower'],
    gradient: 'from-stone-900/40 via-amber-900/15 to-yellow-950/20',
  },
];

export default function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-rooms-heading] > *', {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-rooms-heading]', start: 'top 85%' },
      });

      const cards = gsap.utils.toArray('[data-room-card]') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 1, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="rooms" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        {/* Heading */}
        <div data-rooms-heading className="text-center mb-16 md:mb-24">
          <span className="section-label block mb-4">Accommodations</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-5">
            Royal Accommodations
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Each room is a chapter in the palace&apos;s grand narrative, offering an
            unparalleled blend of heritage and contemporary elegance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {rooms.map((room) => (
            <div key={room.name} data-room-card className="luxury-card group">
              {/* Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} group-hover:scale-105 transition-transform duration-700 ease-out`} />
                <div className="absolute inset-0 dot-pattern opacity-30" />
                {/* Corner accents */}
                <div className="absolute top-5 left-5 w-8 h-8 border-l border-t border-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price */}
                <div className="absolute top-5 right-5 glass rounded-md px-3 py-1.5">
                  <span className="text-xs text-gold font-medium tracking-wide">
                    &#8377;{room.price}
                  </span>
                  <span className="text-[10px] text-muted block leading-tight">/night</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1.5">
                  {room.name}
                </h3>
                <span className="text-[11px] tracking-[0.2em] uppercase text-gold/50 block mb-4">
                  {room.size}
                </span>
                <p className="text-muted text-sm leading-[1.7] mb-5">
                  {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm bg-dark-secondary text-muted border border-gold/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="btn-gold text-[11px] py-3 px-6">Reserve Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
