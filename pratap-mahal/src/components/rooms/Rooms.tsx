'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const rooms = [
  {
    name: 'The Maharaja Suite',
    description:
      'An opulent 2,400 sq ft sanctuary with hand-painted murals, private terrace, and a plunge pool overlooking the Aravalli hills.',
    size: '2,400 sq ft',
    price: '85,000',
    features: ['Private Terrace', 'Plunge Pool', 'Butler Service'],
    accent: '#B8860B',
  },
  {
    name: 'Royal Heritage Room',
    description:
      'Adorned with antique furnishings and traditional Rajasthani craftsmanship. Every modern comfort in 800 sq ft of royal elegance.',
    size: '800 sq ft',
    price: '35,000',
    features: ['Garden View', 'Antique Decor', 'Luxury Bath'],
    accent: '#A0926B',
  },
  {
    name: 'Grand Palace Suite',
    description:
      'Vaulted ceilings, a private dining room, and floor-to-ceiling windows framing the majestic courtyard fountain.',
    size: '1,600 sq ft',
    price: '62,000',
    features: ['Courtyard View', 'Dining Room', 'Jacuzzi'],
    accent: '#C4A35A',
  },
  {
    name: 'Courtyard Pavilion',
    description:
      'An intimate retreat surrounded by jasmine gardens with handcrafted teak furniture and a private meditation alcove.',
    size: '650 sq ft',
    price: '28,000',
    features: ['Garden Access', 'Rain Shower', 'Meditation Alcove'],
    accent: '#8B7D5B',
  },
];

export default function Rooms() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section id="rooms" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />
      {/* Ambient glow */}
      <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-gold/[0.02] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 35 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="section-label block mb-3">Accommodations</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground mb-3">
            Royal Accommodations
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Each room is a chapter in the palace&apos;s grand narrative.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="luxury-card group"
            >
              {/* Visual area */}
              <div className="relative h-44 md:h-52 overflow-hidden">
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    background: `
                      radial-gradient(ellipse at ${30 + i * 10}% ${35 + i * 5}%, ${room.accent}22 0%, transparent 55%),
                      radial-gradient(ellipse at ${70 - i * 5}% ${70 + i * 3}%, ${room.accent}11 0%, transparent 50%),
                      linear-gradient(135deg, #1a1710 0%, #0e0d0a 100%)
                    `,
                  }}
                />
                {/* Decorative arch pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
                  <div className="w-32 h-48 border-t-[60px] border-t-gold/30 rounded-t-full border-l border-r border-gold/20" />
                </div>
                <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price badge */}
                <div className="absolute top-3 right-3 glass rounded-md px-2.5 py-1">
                  <span className="text-[11px] text-gold font-medium">&#8377;{room.price}</span>
                  <span className="text-[8px] text-muted block leading-tight">/night</span>
                </div>

                {/* Room name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent">
                  <h3 className="font-serif text-lg text-foreground">{room.name}</h3>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-gold/50">{room.size}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <p className="text-muted text-sm leading-[1.7] mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm bg-dark-secondary text-muted border border-gold/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 group/btn">
                  Reserve Now
                  <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
