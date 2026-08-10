'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { AnimatePresence, motion } from 'framer-motion';

const galleryItems = [
  { title: 'The Grand Entrance', category: 'Architecture', height: 'h-72 md:h-80', gradient: 'from-amber-900/40 to-stone-950' },
  { title: 'Royal Suite Interior', category: 'Rooms', height: 'h-80 md:h-96', gradient: 'from-stone-800/50 to-amber-950/20' },
  { title: 'Palace at Sunset', category: 'Exterior', height: 'h-64 md:h-72', gradient: 'from-orange-900/30 to-rose-950/15' },
  { title: 'Durbar Dining Hall', category: 'Dining', height: 'h-72 md:h-80', gradient: 'from-red-950/25 to-amber-950/15' },
  { title: 'The Lotus Pool', category: 'Leisure', height: 'h-80 md:h-96', gradient: 'from-cyan-950/20 to-stone-950' },
  { title: 'Heritage Courtyard', category: 'Architecture', height: 'h-64 md:h-72', gradient: 'from-yellow-950/25 to-stone-900/30' },
  { title: 'Sheesh Mahal Lounge', category: 'Dining', height: 'h-72 md:h-80', gradient: 'from-indigo-950/25 to-purple-950/15' },
  { title: 'Garden Pavilion', category: 'Gardens', height: 'h-80 md:h-96', gradient: 'from-emerald-950/25 to-stone-950' },
  { title: 'Wedding Setup', category: 'Celebrations', height: 'h-64 md:h-72', gradient: 'from-rose-950/25 to-amber-950/15' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-gallery-heading] > *', {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-gallery-heading]', start: 'top 85%' },
      });

      const items = gsap.utils.toArray('[data-gallery-item]') as HTMLElement[];
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0, duration: 0.8, delay: (i % 3) * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <div data-gallery-heading className="text-center mb-16 md:mb-24">
          <span className="section-label block mb-4">Visual Journey</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-5">The Gallery</h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            A curated collection of moments that capture the essence of Pratap
            Mahal — its beauty, heritage, and timeless allure.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          {galleryItems.map((item, i) => (
            <div
              key={item.title}
              data-gallery-item
              onClick={() => setLightboxIndex(i)}
              className={`group relative ${item.height} mb-4 md:mb-5 overflow-hidden cursor-pointer break-inside-avoid rounded-md bg-dark-card`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-700 ease-out`} />
              <div className="absolute inset-0 dot-pattern opacity-25" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/55 transition-all duration-500 flex items-end">
                <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-1">{item.category}</span>
                  <h4 className="font-serif text-base text-foreground">{item.title}</h4>
                </div>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-[88vw] max-w-4xl aspect-video bg-dark-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${galleryItems[lightboxIndex].gradient}`} />
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-background/85 to-transparent">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-1">
                  {galleryItems[lightboxIndex].category}
                </span>
                <h4 className="font-serif text-xl md:text-2xl text-foreground">
                  {galleryItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/60 hover:text-gold transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            {/* Prev/Next */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-gold transition-colors"
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {lightboxIndex < galleryItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-gold transition-colors"
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-muted">
              {lightboxIndex + 1} / {galleryItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
