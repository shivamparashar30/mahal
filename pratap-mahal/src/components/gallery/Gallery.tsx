'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const galleryItems = [
  { title: 'The Grand Entrance', category: 'Architecture', image: '/images/gallery-entrance.jpg', aspect: 'aspect-[2/3]' },
  { title: 'Royal Suite Interior', category: 'Rooms', image: '/images/gallery-suite.jpg', aspect: 'aspect-[2/3]' },
  { title: 'Heritage Courtyard', category: 'Architecture', image: '/images/gallery-courtyard.jpg', aspect: 'aspect-[2/3]' },
  { title: 'Durbar Dining Hall', category: 'Dining', image: '/images/dining-hall.jpg', aspect: 'aspect-[3/4]' },
  { title: 'The Lotus Pool', category: 'Leisure', image: '/images/gallery-pool.jpg', aspect: 'aspect-[4/5]' },
  { title: 'Palace Chamber', category: 'Rooms', image: '/images/gallery-room.jpg', aspect: 'aspect-[4/5]' },
];

// Desktop masonry heights — varied for visual interest
const desktopHeights = ['h-[340px] lg:h-[420px]', 'h-[280px] lg:h-[360px]', 'h-[300px] lg:h-[380px]', 'h-[260px] lg:h-[340px]', 'h-[300px] lg:h-[380px]', 'h-[280px] lg:h-[340px]'];

function GalleryCard({ item, index, onClick }: { item: typeof galleryItems[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative ${desktopHeights[index]} overflow-hidden cursor-pointer break-inside-avoid mb-4 rounded-md bg-dark-card`}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Always-visible subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/50 to-transparent" />

      {/* Info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <span className="text-[9px] tracking-[0.25em] uppercase text-gold block mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {item.category}
        </span>
        <h4 className="font-serif text-sm md:text-base text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative py-10 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 md:mb-16"
        >
          <span className="section-label block mb-3">Visual Journey</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground mb-4">The Gallery</h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Moments that capture the essence of Pratap Mahal — its beauty, heritage, and timeless allure.
          </p>
        </motion.div>

        {/* Mobile/Tablet: Horizontal scroll */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar lg:hidden -mx-5 px-5"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setLightboxIndex(i)}
              className="flex-none w-[72vw] sm:w-[55vw] md:w-[42vw] snap-center cursor-pointer group"
            >
              <div className={`relative ${item.aspect} overflow-hidden rounded-md bg-dark-card`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <span className="text-[8px] tracking-[0.25em] uppercase text-gold block mb-0.5">{item.category}</span>
                  <h4 className="font-serif text-sm text-white">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Masonry with parallax */}
        <div className="hidden lg:block columns-3 gap-4">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.title}
              item={item}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
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
              className="relative w-[90vw] max-w-3xl max-h-[85vh] bg-dark-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
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
