'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const stats = [
  { value: '200+', label: 'Years of Heritage' },
  { value: '42', label: 'Luxury Suites' },
  { value: '5-Star', label: 'Excellence' },
  { value: '12', label: 'Acres of Gardens' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-about-heading]', {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about-heading]', start: 'top 85%' },
      });

      gsap.from('[data-about-deco]', {
        scaleY: 0, opacity: 0, transformOrigin: 'top', duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about-deco]', start: 'top 85%' },
      });

      gsap.from('[data-about-text] > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about-text]', start: 'top 82%' },
      });

      gsap.from('[data-about-stat]', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about-stats]', start: 'top 88%' },
      });

      gsap.to('[data-about-image]', {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        {/* Heading */}
        <div data-about-heading className="mb-16 md:mb-24">
          <span className="section-label block mb-4">About the Palace</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] text-foreground leading-[1.1] max-w-4xl">
            A Legacy of <span className="text-gradient-gold">Grandeur</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Image */}
          <div className="relative">
            <div
              data-about-deco
              className="absolute -left-4 md:-left-6 top-0 w-[1px] h-full bg-gradient-to-b from-gold via-gold/20 to-transparent"
            />
            <div className="relative overflow-hidden aspect-[3/4] rounded-md bg-dark-card">
              <div
                data-about-image
                className="absolute inset-[-15%] bg-gradient-to-br from-gold/8 via-dark-card to-gold/4"
              />
              <div className="absolute inset-0 dot-pattern opacity-40" />
              {/* Decorative corner elements */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-gold/20" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-gold/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                <span className="text-xs tracking-[0.3em] uppercase text-gold/70">Est. 1803</span>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div data-about-text className="flex flex-col gap-6 lg:pt-8">
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
              luxuries. The result is an experience that transcends mere
              hospitality — it is an immersion into living history.
            </p>
            <p className="text-sm md:text-base text-muted leading-[1.8]">
              From the hand-painted frescoes adorning the grand corridors to the
              reflection pools that mirror the Aravalli hills at sunset, every
              detail has been curated to evoke a sense of wonder, serenity, and
              regal splendour.
            </p>

            <div className="w-12 h-[1px] bg-gold/30 my-2" />

            <blockquote className="font-serif text-lg md:text-xl text-gold/70 italic leading-relaxed">
              &ldquo;Where history breathes and luxury lives&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Stats */}
        <div
          data-about-stats
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-24 md:mt-32 pt-12 border-t border-gold/8"
        >
          {stats.map((stat) => (
            <div key={stat.label} data-about-stat className="text-center md:text-left">
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-gradient-gold block mb-2">
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-muted font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
