'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="relative py-10 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 md:mb-16"
        >
          <span className="section-label block mb-3">Reservations</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground mb-4">
            Begin Your Journey
          </h2>
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Our dedicated concierge team awaits to curate your perfect royal experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-4 md:gap-6"
          >
            {/* Map placeholder */}
            <div className="relative aspect-[16/9] md:aspect-[16/10] rounded-lg overflow-hidden bg-dark-card border border-gold/6 img-placeholder shimmer-overlay">
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 50%, rgba(140,120,70,0.1) 0%, transparent 55%),
                    linear-gradient(135deg, #14120d 0%, #0e0c08 100%)
                  `,
                }}
              />
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold/50">Pratap Mahal, Udaipur</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold/60 block mb-2">Address</span>
                <p className="text-foreground/65 text-sm leading-[1.8]">
                  Pratap Mahal by Taj<br />Lake Palace Road<br />Udaipur, Rajasthan<br />313001
                </p>
              </div>
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold/60 block mb-2">Contact</span>
                <p className="text-foreground/65 text-sm leading-[1.8]">
                  +91 294 252 8800<br />reservations@pratapmahal.taj.com
                </p>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold/60 block mb-1 mt-4">Concierge</span>
                <p className="text-foreground/65 text-sm">Available 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Full Name</label>
                  <input type="text" className="luxury-input" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Email</label>
                  <input type="email" className="luxury-input" placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Check-in</label>
                  <input type="date" className="luxury-input" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Check-out</label>
                  <input type="date" className="luxury-input" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Phone</label>
                  <input type="tel" className="luxury-input" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Room Type</label>
                  <select className="luxury-input appearance-none" defaultValue="">
                    <option value="" disabled>Select a room</option>
                    <option value="maharaja">The Maharaja Suite</option>
                    <option value="heritage">Royal Heritage Room</option>
                    <option value="grand">Grand Palace Suite</option>
                    <option value="courtyard">Courtyard Pavilion</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] tracking-[0.25em] uppercase text-gold/60">Special Requests</label>
                <textarea
                  rows={3}
                  className="luxury-input resize-none"
                  placeholder="Anniversary celebration, dietary requirements..."
                />
              </div>

              <button type="submit" className="btn-gold-filled mt-1 w-full sm:w-auto self-start">
                Request Reservation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
