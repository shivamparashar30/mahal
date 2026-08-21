'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Years of Heritage' },
  { value: '42', label: 'Luxury Suites' },
  { value: '5-Star', label: 'Excellence' },
  { value: '12', label: 'Acres of Gardens' },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-10 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 md:mb-14"
        >
          <span className="section-label block mb-3">About the Palace</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground leading-[1.1] max-w-4xl">
            A Legacy of <span className="text-gradient-gold">Grandeur</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="absolute -left-3 md:-left-5 top-0 w-[1px] h-full bg-gradient-to-b from-gold via-gold/20 to-transparent" />
            <div className="relative overflow-hidden aspect-[3/4] md:aspect-[3/4] lg:aspect-[4/5] rounded-md bg-dark-card">
              <img
                src="/images/about.jpg"
                alt="Pratap Mahal palace exterior"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/20" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/20" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/80 via-background/30 to-transparent">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/60">Est. 1803</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3 md:gap-4 lg:pt-4"
          >
            <p className="text-base md:text-lg text-foreground/80 leading-[1.8] font-light">
              Nestled in the golden sands of Rajasthan, Pratap Mahal stands as a
              testament to the magnificence of Rajput architecture and the
              timeless pursuit of perfection. Every archway, every courtyard,
              every intricate jali screen whispers tales of a glorious past.
            </p>
            <p className="text-sm md:text-base text-muted leading-[1.8]">
              Originally built in 1803 for the Maharaja of Udaipur, this
              palatial estate has been meticulously restored by Taj Hotels,
              blending centuries of royal heritage with the finest contemporary
              luxuries.
            </p>
            <p className="text-sm md:text-base text-muted leading-[1.8]">
              From the hand-painted frescoes to the reflection pools that mirror
              the Aravalli hills at sunset, every detail evokes wonder and regal splendour.
            </p>

            <div className="w-12 h-[1px] bg-gold/30 my-1" />

            <blockquote className="font-serif text-base md:text-xl text-gold/60 italic leading-relaxed">
              &ldquo;Where history breathes and luxury lives&rdquo;
            </blockquote>
          </motion.div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-20 pt-6 md:pt-8 border-t border-gold/[0.08]"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-center md:text-left"
            >
              <span className="font-serif text-xl md:text-3xl lg:text-4xl text-gradient-gold block mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-light">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
