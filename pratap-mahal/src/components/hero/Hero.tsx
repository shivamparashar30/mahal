'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const FRAME_COUNT = 206;
const getFramePath = (index: number) =>
  `/frames-jpg/frame_${String(index).padStart(3, '0')}.jpg`;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bitmapsRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawCacheRef = useRef<{ w: number; h: number; dw: number; dh: number; dx: number; dy: number } | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const computeDrawRect = useCallback((canvasW: number, canvasH: number, imgW: number, imgH: number) => {
    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;
    let dw: number, dh: number, dx: number, dy: number;

    if (canvasRatio > imgRatio) {
      dw = canvasW;
      dh = dw / imgRatio;
      dx = 0;
      dy = (canvasH - dh) / 2;
    } else {
      dh = canvasH;
      dw = dh * imgRatio;
      dx = (canvasW - dw) / 2;
      dy = 0;
    }

    return { w: canvasW, h: canvasH, dw, dh, dx, dy };
  }, []);

  const startRenderLoop = useCallback(() => {
    const loop = () => {
      const target = targetFrameRef.current;
      if (target !== currentFrameRef.current) {
        const ctx = ctxRef.current;
        const bitmap = bitmapsRef.current[target];
        const cache = drawCacheRef.current;

        if (ctx && bitmap && cache) {
          ctx.drawImage(bitmap, cache.dx, cache.dy, cache.dw, cache.dh);
          currentFrameRef.current = target;
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;
    const bitmaps: (ImageBitmap | HTMLImageElement)[] = new Array(FRAME_COUNT);
    const supportsImageBitmap = typeof createImageBitmap === 'function';
    let lastReportedProgress = 0;

    const onFrameReady = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
      if (pct >= lastReportedProgress + 5 || loadedCount === FRAME_COUNT) {
        lastReportedProgress = pct;
        if (!cancelled) setLoadProgress(pct);
      }
      if (loadedCount === FRAME_COUNT && !cancelled) {
        bitmapsRef.current = bitmaps;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i + 1);
      img.onload = () => {
        if (cancelled) return;
        if (supportsImageBitmap) {
          createImageBitmap(img).then((bmp) => {
            if (cancelled) { bmp.close(); return; }
            bitmaps[i] = bmp;
            onFrameReady();
          });
        } else {
          bitmaps[i] = img;
          onFrameReady();
        }
      };
    }

    return () => {
      cancelled = true;
      bitmaps.forEach((b) => {
        if (b && 'close' in b) (b as ImageBitmap).close();
      });
    };
  }, []);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctxRef.current = ctx;

    const updateSize = () => {
      const dpr = 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      const sampleBitmap = bitmapsRef.current[0];
      const imgW = sampleBitmap
        ? ('naturalWidth' in sampleBitmap ? sampleBitmap.naturalWidth : sampleBitmap.width)
        : 1280;
      const imgH = sampleBitmap
        ? ('naturalHeight' in sampleBitmap ? sampleBitmap.naturalHeight : sampleBitmap.height)
        : 720;

      drawCacheRef.current = computeDrawRect(w * dpr, h * dpr, imgW, imgH);
      currentFrameRef.current = -1;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [computeDrawRect]);

  // Animations after load
  useEffect(() => {
    if (!isLoaded || !sectionRef.current || !canvasRef.current) return;

    const dpr = 1;
    const sampleBitmap = bitmapsRef.current[0];
    if (sampleBitmap) {
      const imgW = 'naturalWidth' in sampleBitmap ? sampleBitmap.naturalWidth : sampleBitmap.width;
      const imgH = 'naturalHeight' in sampleBitmap ? sampleBitmap.naturalHeight : sampleBitmap.height;
      drawCacheRef.current = computeDrawRect(
        window.innerWidth * dpr,
        window.innerHeight * dpr,
        imgW, imgH
      );
    }

    targetFrameRef.current = 0;
    currentFrameRef.current = -1;
    startRenderLoop();

    const ctx = gsap.context(() => {
      const loadingEl = sectionRef.current!.querySelector('[data-loading]') as HTMLElement;
      if (loadingEl) {
        gsap.to(loadingEl, {
          opacity: 0, duration: 0.6, ease: 'power2.inOut',
          onComplete: () => { loadingEl.style.display = 'none'; },
        });
      }

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.4, ease: 'power2.out' }
      );

      // scrub: true — Lenis already smooths scroll, no double-smoothing
      const frameObj = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3800',
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          anticipatePin: 1,
          onRefresh: () => {
            // Force Lenis to recalculate page height after pin spacer is added
            window.dispatchEvent(new Event('resize'));
          },
        },
      });

      tl.to(frameObj, {
        value: FRAME_COUNT - 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          targetFrameRef.current = Math.round(frameObj.value);
        },
      }, 0);

      // Title fade out over first 15%
      tl.to(titleRef.current, {
        opacity: 0, y: -40, duration: 0.15, ease: 'power2.in',
      }, 0);
      tl.to(scrollRef.current, {
        opacity: 0, duration: 0.08, ease: 'power2.in',
      }, 0);

      // Tagline: in at 45%, out at 72%
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.12, ease: 'power3.out' },
        0.45
      );
      tl.to(taglineRef.current, {
        opacity: 0, y: -30, duration: 0.12, ease: 'power2.in',
      }, 0.72);

      // CTA: in at 82%
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.14, ease: 'power3.out' },
        0.82
      );
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [isLoaded, startRenderLoop, computeDrawRect]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)
          `,
        }}
      />

      {/* Loading */}
      <div
        data-loading
        className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-5xl tracking-[0.1em] text-gold mb-2">
              PRATAP MAHAL
            </h2>
            <p className="text-[10px] tracking-[0.4em] text-muted uppercase">by Taj</p>
          </div>
          <div className="relative w-48 h-[1.5px] bg-dark-secondary rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p
            className="text-xs tracking-[0.2em] text-muted tabular-nums"
            style={{ animation: 'pulse-gold 2s ease-in-out infinite' }}
          >
            {loadProgress}%
          </p>
        </div>
      </div>

      {/* Title */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="section-label mb-4 block">A Taj Hotel</span>
        <h1 className="font-serif text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[0.02em] text-white mb-4">
          Pratap Mahal
        </h1>
        <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
        <p className="font-serif text-[clamp(0.9rem,2.5vw,1.4rem)] text-white/70 tracking-[0.05em] font-light">
          Royal Heritage. Modern Luxury.
        </p>
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="section-label mb-4 block">Experience</span>
        <h2 className="font-serif text-[clamp(1.5rem,5vw,3.5rem)] text-white max-w-3xl leading-[1.15]">
          Timeless grandeur in the heart of Rajasthan
        </h2>
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 md:pb-32 text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 mb-6">
          {['Luxury Stay', 'Fine Dining', 'Royal Weddings'].map((item) => (
            <span
              key={item}
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50 font-light"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#contact" className="btn-gold-filled">Book Your Stay</a>
          <a href="#about" className="btn-gold">Discover More</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-light">
          Scroll to explore
        </span>
        <svg
          className="w-4 h-4 text-white/35 animate-scroll-bounce"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
