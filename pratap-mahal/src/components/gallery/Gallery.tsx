'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const galleryItems = [
  { title: 'The Grand Entrance', category: 'Architecture', gradient: 'radial-gradient(ellipse at 35% 40%, rgba(180,140,60,0.18) 0%, transparent 55%), linear-gradient(135deg, #1a1508 0%, #0f0d08 100%)' },
  { title: 'Royal Suite Interior', category: 'Rooms', gradient: 'radial-gradient(ellipse at 55% 35%, rgba(160,130,90,0.14) 0%, transparent 55%), linear-gradient(135deg, #15130e 0%, #0e0c08 100%)' },
  { title: 'Palace at Sunset', category: 'Exterior', gradient: 'radial-gradient(ellipse at 60% 50%, rgba(200,120,60,0.16) 0%, transparent 55%), linear-gradient(135deg, #1a1208 0%, #100c06 100%)' },
  { title: 'Durbar Dining Hall', category: 'Dining', gradient: 'radial-gradient(ellipse at 40% 45%, rgba(160,80,40,0.14) 0%, transparent 55%), linear-gradient(135deg, #18100a 0%, #0e0a06 100%)' },
  { title: 'The Lotus Pool', category: 'Leisure', gradient: 'radial-gradient(ellipse at 50% 40%, rgba(60,140,160,0.12) 0%, transparent 55%), linear-gradient(135deg, #0e1415 0%, #0a0e0f 100%)' },
  { title: 'Heritage Courtyard', category: 'Architecture', gradient: 'radial-gradient(ellipse at 45% 50%, rgba(170,140,70,0.14) 0%, transparent 55%), linear-gradient(135deg, #16140e 0%, #0e0c08 100%)' },
];

const heights = ['h-48 md:h-64', 'h-56 md:h-72', 'h-44 md:h-56', 'h-52 md:h-68', 'h-56 md:h-72', 'h-48 md:h-60'];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="section-label block mb-3">Visual Journey</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground mb-4">The Gallery</h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Moments that capture the essence of Pratap Mahal — its beauty, heritage, and timeless allure.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="columns-2 lg:columns-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setLightboxIndex(i)}
              className={`group relative ${heights[i]} mb-3 md:mb-4 overflow-hidden cursor-pointer break-inside-avoid rounded-md bg-dark-card img-placeholder`}
            >
              <div
                className="absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ background: item.gradient }}
              />
              <div className="absolute inset-0 dot-pattern opacity-20" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-500 flex items-end">
                <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-gold block mb-0.5">{item.category}</span>
                  <h4 className="font-serif text-sm text-foreground">{item.title}</h4>
                </div>
              </div>
            </motion.div>
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
              className="relative w-[90vw] max-w-4xl aspect-video bg-dark-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0" style={{ background: galleryItems[lightboxIndex].gradient }} />
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 bg-gradient-to-t from-background/85 to-transparent">
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold block mb-1">
                  {galleryItems[lightboxIndex].category}
                </span>
                <h4 className="font-serif text-lg md:text-xl text-foreground">
                  {galleryItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground/60 hover:text-gold transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-gold transition-colors"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {lightboxIndex < galleryItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-gold transition-colors"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-muted">
              {lightboxIndex + 1} / {galleryItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
