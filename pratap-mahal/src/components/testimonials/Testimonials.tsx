'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote: 'Pratap Mahal redefined our understanding of luxury. Every moment felt like stepping into a living painting — the architecture, the service, the silence of the gardens at dawn.',
    name: 'Victoria Harrington',
    location: 'London, United Kingdom',
  },
  {
    quote: 'We chose Pratap Mahal for our wedding, and it surpassed every dream. The Durbar Hall was breathtaking, and the staff treated our families like royalty.',
    name: 'Arjun & Priya Mehta',
    location: 'Mumbai, India',
  },
  {
    quote: 'I have stayed at the world\'s finest hotels — The Ritz, Aman, Oberoi — but Pratap Mahal holds a magic that is entirely its own. A place that lingers in the soul.',
    name: 'Francois Beaumont',
    location: 'Paris, France',
  },
  {
    quote: 'The Maharaja Suite was beyond anything we imagined. Waking up to views of the Aravalli hills, with the scent of jasmine drifting in — pure poetry.',
    name: 'Sarah & James Chen',
    location: 'Singapore',
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const cardWidth = slider.firstElementChild?.clientWidth || 0;
      const gap = 16;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, testimonials.length - 1));
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    if (!sliderRef.current) return;
    const card = sliderRef.current.children[index] as HTMLElement;
    if (card) {
      const offset = card.offsetLeft - sliderRef.current.offsetLeft;
      sliderRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="testimonials" className="relative py-10 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 md:mb-14"
        >
          <span className="section-label block mb-3">Guest Voices</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground">
            Stories of Enchantment
          </h2>
        </motion.div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => goTo(i)}
              className={`luxury-card flex-none w-[82vw] md:w-[42vw] lg:w-[32vw] snap-center p-4 md:p-8 cursor-pointer transition-all duration-500 ${
                activeIndex === i ? '!border-gold/15' : ''
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3 md:mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold/70">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-serif text-[13px] md:text-base text-foreground/75 leading-[1.7] mb-4 md:mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-gold/[0.08]">
                <p className="text-sm text-foreground/90 tracking-wide mb-0.5">{t.name}</p>
                <p className="text-[11px] text-muted tracking-wider">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots + Arrows */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => goTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 disabled:opacity-20 disabled:cursor-default transition-all"
            aria-label="Previous"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeIndex === i ? 'bg-gold w-6' : 'bg-gold/15 w-1.5 hover:bg-gold/30'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(Math.min(testimonials.length - 1, activeIndex + 1))}
            disabled={activeIndex === testimonials.length - 1}
            className="w-8 h-8 rounded-full border border-gold/15 flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold/30 disabled:opacity-20 disabled:cursor-default transition-all"
            aria-label="Next"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
