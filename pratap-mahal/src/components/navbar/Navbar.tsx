'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Stay', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Weddings', href: '#weddings' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const scrollY = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection('#' + sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out',
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'glass-strong py-3' : 'py-5 md:py-6'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="group flex flex-col leading-tight">
            <span className="font-serif text-lg md:text-xl tracking-[0.12em] text-gold group-hover:text-gold-light transition-colors duration-300">
              PRATAP MAHAL
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] text-muted uppercase">
              by Taj
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[12px] tracking-[0.14em] uppercase py-1 transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-gold'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Book Now + Hamburger */}
          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden md:inline-flex text-[12px] tracking-[0.14em] uppercase px-5 py-2 border border-gold/50 text-gold rounded-sm hover:bg-gold hover:text-background transition-all duration-400"
            >
              Book Now
            </a>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-2.5 -mr-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-gold origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block w-6 h-[1.5px] bg-gold"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-gold origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-7"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`font-serif text-2xl md:text-3xl tracking-[0.08em] transition-colors ${
                  activeSection === link.href ? 'text-gold' : 'text-foreground/70 hover:text-gold'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              className="btn-gold-filled mt-4"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
