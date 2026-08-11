'use client';

import { motion } from 'framer-motion';

const restaurants = [
  {
    name: 'Durbar',
    cuisine: 'Royal Indian Fine Dining',
    description:
      'Centuries-old recipes from the royal kitchens of Rajasthan, reimagined beneath crystal chandeliers.',
    hours: '7 PM – 11 PM',
    accent: '#C4943A',
    icon: '✦',
  },
  {
    name: 'The Courtyard',
    cuisine: 'Mediterranean & International',
    description:
      'Al fresco dining in the palace\'s historic courtyard, surrounded by centuries-old arches.',
    hours: '12 PM – 10:30 PM',
    accent: '#6B9B7D',
    icon: '❋',
  },
  {
    name: 'Sheesh Mahal',
    cuisine: 'Cocktail Lounge & Bar',
    description:
      'Bespoke cocktails inspired by Rajasthani botanicals in an intimate lounge of mirror mosaics.',
    hours: '5 PM – 1 AM',
    accent: '#7B6BA0',
    icon: '◆',
  },
];

export default function Dining() {
  return (
    <section id="dining" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        {/* Hero banner */}
        <div className="relative h-[30vh] md:h-[40vh] mb-10 md:mb-14 overflow-hidden rounded-lg">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 35% 35%, rgba(196,148,58,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 70%, rgba(140,60,30,0.08) 0%, transparent 45%),
                linear-gradient(135deg, #1a1408 0%, #0f0c06 50%, #0b0a06 100%)
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-gold/30 to-transparent" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-gold/20" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="section-label block mb-3">Culinary Excellence</span>
            <h2 className="font-serif text-[clamp(1.75rem,6vw,4rem)] text-foreground mb-3 leading-[1.1]">
              A Feast for <span className="text-gradient-gold">the Senses</span>
            </h2>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              Three distinctive venues, each a journey through flavour and artistry.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {restaurants.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="luxury-card group"
            >
              <div className="relative h-36 md:h-44 overflow-hidden">
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    background: `
                      radial-gradient(ellipse at 50% 40%, ${r.accent}20 0%, transparent 55%),
                      linear-gradient(135deg, #16140e 0%, #0c0b08 100%)
                    `,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl text-gold/10 group-hover:text-gold/20 transition-colors duration-500">{r.icon}</span>
                </div>
              </div>

              <div className="p-5">
                <span className="text-[8px] tracking-[0.25em] uppercase text-gold/50 block mb-1">
                  {r.cuisine}
                </span>
                <h3 className="font-serif text-lg text-foreground mb-2">{r.name}</h3>
                <p className="text-muted text-sm leading-[1.7] mb-4">{r.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gold/8">
                  <span className="text-[10px] text-muted tracking-wider">{r.hours}</span>
                  <a href="#contact" className="text-[10px] tracking-[0.12em] uppercase text-gold/60 hover:text-gold transition-colors">
                    Reserve &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
