'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from '@/lib/gsap';

const FRAME_START = 1;
const FRAME_END = 240;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1;

function getFrameSrc(i: number) {
  return `/vdo-frames/frame_${String(i).padStart(3, '0')}.jpg`;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const displayFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded >= TOTAL_FRAMES * 0.3) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    const fallback = setTimeout(() => setIsLoaded(true), 5000);
    return () => clearTimeout(fallback);
  }, []);

  // Draw a frame on the canvas with cover-fit (preserves aspect ratio, crops to fill)
  const drawFrame = useCallback((frameIndex: number) => {
    if (frameIndex === drawnFrameRef.current) return;
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img?.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;

    let sx, sy, sw, sh;
    if (canvasAspect > imgAspect) {
      sw = img.naturalWidth;
      sh = img.naturalWidth / canvasAspect;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    } else {
      sh = img.naturalHeight;
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    drawnFrameRef.current = frameIndex;
  }, []);

  // Canvas sizing + ScrollTrigger + lerped render loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawnFrameRef.current = -1; // force redraw
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw first frame
    drawFrame(0);

    // ScrollTrigger — no pin, just tracks progress
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Lerped render loop for ultra-smooth frame transitions
    let running = true;
    let raf = 0;
    const loop = () => {
      if (!running) return;

      const target = progressRef.current * (TOTAL_FRAMES - 1);
      // Lerp — smoothly approach target frame
      displayFrameRef.current += (target - displayFrameRef.current) * 0.12;

      const frameIndex = Math.min(
        Math.max(Math.round(displayFrameRef.current), 0),
        TOTAL_FRAMES - 1
      );
      drawFrame(frameIndex);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, [isLoaded, drawFrame]);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[200vh] md:h-[400vh] w-full">
      {/* Sticky viewport — pinned via CSS, no ScrollTrigger pin */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Subtle gradient overlay — only where text sits, keeps video vibrant */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 18%, transparent 55%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0.45) 100%)
            `,
          }}
        />

        {/* Loading */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-5 md:gap-8">
                <div className="text-center">
                  <h2 className="font-serif text-2xl md:text-5xl tracking-[0.1em] text-gold mb-2">
                    PRATAP MAHAL
                  </h2>
                  <p className="text-[10px] tracking-[0.4em] text-muted uppercase">by Taj</p>
                </div>
                <div className="relative w-36 md:w-48 h-[1.5px] bg-dark-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        {isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.35em] uppercase text-white/80 font-light mb-2 md:mb-4 block"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              A Taj Hotel
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="font-serif text-[clamp(2rem,8vw,7rem)] leading-[0.95] tracking-[0.02em] text-white mb-2 md:mb-4"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Pratap Mahal
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="w-10 md:w-14 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-2 md:mb-4"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-serif text-[clamp(0.85rem,2.5vw,1.4rem)] text-white/80 tracking-[0.05em] font-light mb-6 md:mb-10"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
            >
              Royal Heritage. Modern Luxury.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="#contact" className="btn-gold-filled">Book Your Stay</a>
              <a href="#about" className="btn-gold">Discover More</a>
            </motion.div>
          </div>
        )}

        {/* Scroll indicator */}
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-light"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
            >
              Scroll to explore
            </span>
            <svg
              className="w-4 h-4 text-white/50 animate-scroll-bounce"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}
