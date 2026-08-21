'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '2000+', label: 'Guest Capacity' },
  { value: '7', label: 'Venues' },
  { value: '100%', label: 'Bespoke' },
];

const venues = [
  {
    name: 'The Grand Durbar Hall',
    capacity: '1,200 Guests',
    description: 'A magnificent hall with 40-foot ceilings, crystal chandeliers and gold leaf detailing.',
  },
  {
    name: 'Palace Lawns',
    capacity: '2,000 Guests',
    description: 'Open-air splendour beneath the stars, surrounded by torchlit pathways.',
  },
  {
    name: 'The Mirror Pavilion',
    capacity: '400 Guests',
    description: 'Shimmering mirrors and candlelight for intimate ceremonies and receptions.',
  },
];

export default function Weddings() {
  return (
    <section id="weddings" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      {/* Hero */}
      <div className="relative flex items-center justify-center overflow-hidden py-14 md:py-28 lg:py-32">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 40% 35%, rgba(180,80,90,0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 65% 65%, rgba(201,169,110,0.08) 0%, transparent 45%),
              linear-gradient(135deg, #14100e 0%, #0b0a06 100%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        {/* Decorative circles */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="w-[250px] md:w-[400px] h-[250px] md:h-[400px] border border-gold rounded-full" />
          <div className="absolute w-[180px] md:w-[300px] h-[180px] md:h-[300px] border border-gold rounded-full rotate-45" />
          <div className="absolute w-[120px] md:w-[200px] h-[120px] md:h-[200px] border border-gold rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="relative text-center px-5 md:px-10 max-w-3xl mx-auto"
        >
          <span className="section-label block mb-3 md:mb-4">Destination Weddings</span>
          <h2 className="font-serif text-[clamp(1.75rem,6vw,4.5rem)] text-foreground leading-[1.05] mb-3 md:mb-4">
            A Royal <span className="text-gradient-gold italic">Celebration</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/50 max-w-xl mx-auto mb-5 md:mb-8 leading-relaxed">
            Transform your most precious moment into a grand affair befitting royalty.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-6 md:mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <span className="font-serif text-xl md:text-2xl text-gradient-gold block mb-0.5">{stat.value}</span>
                <span className="text-[8px] tracking-[0.2em] uppercase text-muted">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <a href="#contact" className="btn-gold-filled">Plan Your Wedding</a>
        </motion.div>
      </div>

      {/* Venue cards */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12 pb-10 md:pb-24">
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="luxury-card group p-4 md:p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="relative">
                <span className="text-[8px] tracking-[0.25em] uppercase text-gold/50 block mb-2">{venue.capacity}</span>
                <h3 className="font-serif text-base md:text-lg text-foreground mb-2 group-hover:text-gold transition-colors duration-500">
                  {venue.name}
                </h3>
                <p className="text-muted text-sm leading-[1.7]">{venue.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
