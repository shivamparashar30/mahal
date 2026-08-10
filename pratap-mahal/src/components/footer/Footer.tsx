'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const footerLinks = {
  Experience: ['Rooms & Suites', 'Dining', 'Spa & Wellness', 'Weddings', 'Experiences'],
  Discover: ['Our Heritage', 'Architecture', 'Gallery', 'Virtual Tour', 'Awards'],
  Information: ['Getting Here', 'FAQs', 'Privacy Policy', 'Terms of Service', 'Careers'],
};

const socialLinks = [
  { name: 'Instagram', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { name: 'Facebook', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { name: 'Twitter', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M4 4l11.7 16h4.3M4 20L15.7 4H20M6.5 4H4l6 8M17.5 20H20l-6-8"/></svg> },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-footer-content] > *', {
        y: 25, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 92%' },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative pt-24 md:pt-28 pb-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div data-footer-content className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-14 mb-16 md:mb-20">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl tracking-[0.08em] text-gold mb-1">PRATAP MAHAL</h3>
            <span className="text-[9px] tracking-[0.35em] text-muted uppercase block mb-5">by Taj Hotels</span>
            <p className="text-muted text-sm leading-[1.7] max-w-xs mb-6">
              A palace where centuries of royal heritage meet the pinnacle of
              modern luxury, in the heart of Rajasthan.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  className="w-9 h-9 rounded-full border border-gold/10 flex items-center justify-center text-muted hover:text-gold hover:border-gold/25 transition-all duration-300"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-gold/60 mb-5">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-foreground transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gold/6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted/50 tracking-wider">
            &copy; {new Date().getFullYear()} Pratap Mahal by Taj Hotels. All rights reserved.
          </p>
          <p className="text-[11px] text-muted/30 tracking-wider">A Heritage Grand Hotel</p>
        </div>
      </div>
    </footer>
  );
}
