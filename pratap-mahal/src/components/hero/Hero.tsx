'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Auto-detect frame count from public/frames
const FRAME_COUNT = 139;
const getFramePath = (index: number) =>
  `/frames-jpg/frame_${String(index).padStart(3, '0')}.jpg`;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Performance-critical refs (no state to avoid re-renders)
  const bitmapsRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawCacheRef = useRef<{ w: number; h: number; dw: number; dh: number; dx: number; dy: number } | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-compute cover-mode draw dimensions (cached, only recalc on resize)
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

  // rAF render loop — decoupled from scroll, runs at display refresh rate
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

  // Preload all frames + create ImageBitmaps for hardware-accelerated drawing
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;
    const bitmaps: (ImageBitmap | HTMLImageElement)[] = new Array(FRAME_COUNT);
    const supportsImageBitmap = typeof createImageBitmap === 'function';

    // Batch progress updates to reduce React re-renders
    let lastReportedProgress = 0;

    const onFrameReady = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
      // Only update state every 5% to reduce re-renders during loading
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
      // Clean up ImageBitmaps
      bitmaps.forEach((b) => {
        if (b && 'close' in b) (b as ImageBitmap).close();
      });
    };
  }, []);

  // Canvas setup + resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get context once, cache it
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,      // hint: don't sync with DOM compositor
    });
    if (!ctx) return;
    ctxRef.current = ctx;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      // Pre-compute cover-mode draw dimensions
      // Use first loaded bitmap's natural size (all frames same size)
      const sampleBitmap = bitmapsRef.current[0];
      const imgW = sampleBitmap
        ? ('naturalWidth' in sampleBitmap ? sampleBitmap.naturalWidth : sampleBitmap.width)
        : 1280;
      const imgH = sampleBitmap
        ? ('naturalHeight' in sampleBitmap ? sampleBitmap.naturalHeight : sampleBitmap.height)
        : 720;

      drawCacheRef.current = computeDrawRect(w * dpr, h * dpr, imgW, imgH);

      // Force re-draw current frame after resize
      currentFrameRef.current = -1;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [computeDrawRect]);

  // Start render loop + GSAP animations after load
  useEffect(() => {
    if (!isLoaded || !sectionRef.current || !canvasRef.current) return;

    // Recompute draw cache now that bitmaps are loaded
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Draw first frame immediately
    targetFrameRef.current = 0;
    currentFrameRef.current = -1;

    // Start the decoupled rAF render loop
    startRenderLoop();

    const ctx = gsap.context(() => {
      // Fade out loading
      const loadingEl = sectionRef.current!.querySelector('[data-loading]') as HTMLElement;
      if (loadingEl) {
        gsap.to(loadingEl, {
          opacity: 0, duration: 0.8, ease: 'power2.inOut',
          onComplete: () => { loadingEl.style.display = 'none'; },
        });
      }

      // Title entrance
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.6, delay: 0.6, ease: 'power3.out' }
      );

      // Scroll indicator
      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.8, ease: 'power2.out' }
      );

      // Scroll-driven timeline
      // scrub: 0.15 — very low because Lenis already smooths the scroll position.
      // Lenis provides smooth interpolated scroll → ScrollTrigger.update() →
      // GSAP scrub just needs to respond quickly to the already-smooth value.
      const frameObj = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=5000',
          pin: true,
          scrub: 0.15,
          anticipatePin: 1,
        },
      });

      // Frame animation — only sets target, rAF loop does the actual drawing
      tl.to(frameObj, {
        value: FRAME_COUNT - 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          targetFrameRef.current = Math.round(frameObj.value);
        },
      }, 0);

      // Title + scroll indicator fade out
      tl.to(titleRef.current, {
        opacity: 0, y: -50, duration: 0.2, ease: 'power2.in',
      }, 0);
      tl.to(scrollRef.current, {
        opacity: 0, duration: 0.08, ease: 'power2.in',
      }, 0);

      // Tagline in (50%) → out (78%)
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' },
        0.5
      );
      tl.to(taglineRef.current, {
        opacity: 0, y: -40, duration: 0.1, ease: 'power2.in',
      }, 0.78);

      // CTA in (86%)
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' },
        0.86
      );
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [isLoaded, startRenderLoop, computeDrawRect]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full">
      {/* Canvas — GPU-accelerated layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ willChange: 'contents' }}
      />

      {/* Gradient overlays — composited on GPU via will-change */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.6) 100%)',
          willChange: 'auto',
        }}
      />

      {/* Loading Screen */}
      <div
        data-loading
        className="absolute inset-0 z-30 bg-background flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-10">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-5xl tracking-[0.1em] text-gold mb-3">
              PRATAP MAHAL
            </h2>
            <p className="text-xs tracking-[0.4em] text-muted uppercase">by Taj</p>
          </div>
          <div className="relative w-56 h-[2px] bg-dark-secondary rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p
            className="text-sm tracking-[0.2em] text-muted tabular-nums"
            style={{ animation: 'pulse-gold 2s ease-in-out infinite' }}
          >
            {loadProgress}%
          </p>
        </div>
      </div>

      {/* Title Phase */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="section-label mb-5 block">A Taj Hotel</span>
        <h1 className="font-serif text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95] tracking-[0.02em] text-white mb-5">
          Pratap Mahal
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-5" />
        <p className="font-serif text-[clamp(1rem,2.5vw,1.5rem)] text-white/75 tracking-[0.05em] font-light">
          Royal Heritage. Modern Luxury.
        </p>
      </div>

      {/* Tagline Phase */}
      <div
        ref={taglineRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="section-label mb-5 block">Experience</span>
        <h2 className="font-serif text-[clamp(1.75rem,5vw,3.75rem)] text-white max-w-3xl leading-[1.15]">
          Timeless grandeur in the heart of Rajasthan
        </h2>
      </div>

      {/* CTA Phase */}
      <div
        ref={ctaRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-28 md:pb-36 text-center px-6 opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
          {['Luxury Stay', 'Fine Dining', 'Royal Weddings'].map((item) => (
            <span
              key={item}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60 font-light"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="btn-gold-filled">Book Your Stay</a>
          <a href="#about" className="btn-gold">Discover More</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-light">
          Scroll to explore
        </span>
        <svg
          className="w-5 h-5 text-white/40 animate-scroll-bounce"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
