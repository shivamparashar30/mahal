'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Shorter duration = less lag between input and response
      // Still feels smooth but much more responsive
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic ease-out, snappier
      orientation: 'vertical',
      smoothWheel: true,
      // Lower multiplier = finer control during frame animation
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Lenis feeds smoothed scroll position to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement;
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href');
      if (!id) return;
      const el = document.querySelector(id);
      if (el) {
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
