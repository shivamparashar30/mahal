'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const rooms = [
  {
    name: 'The Maharaja Suite',
    description:
      'An opulent 2,400 sq ft sanctuary with hand-painted murals, private terrace, and a plunge pool overlooking the Aravalli hills.',
    size: '2,400 sq ft',
    price: '85,000',
    features: ['Private Terrace', 'Plunge Pool', 'Butler Service', 'Personal Butler', '24/7 Concierge'],
    image: '/images/suite-maharaja.jpg',
    details: 'Step into a world of unparalleled grandeur. The Maharaja Suite features a king-size four-poster bed with hand-embroidered linens, a private study with antique furnishings, a marble bathroom with a rain shower and soaking tub, and a secluded terrace with panoramic views of the Aravalli hills.',
  },
  {
    name: 'Royal Heritage Room',
    description:
      'Adorned with antique furnishings and traditional Rajasthani craftsmanship. Every modern comfort in 800 sq ft of royal elegance.',
    size: '800 sq ft',
    price: '35,000',
    features: ['Garden View', 'Antique Decor', 'Luxury Bath', 'Mini Bar', 'Heritage Artwork'],
    image: '/images/suite-heritage.jpg',
    details: 'Each Royal Heritage Room is individually designed to reflect a chapter of Rajasthani history. Original artwork, handcrafted furniture, and curated antiques fill the space, while modern amenities like high-speed WiFi and premium bedding ensure absolute comfort.',
  },
  {
    name: 'Grand Palace Suite',
    description:
      'Vaulted ceilings, a private dining room, and floor-to-ceiling windows framing the majestic courtyard fountain.',
    size: '1,600 sq ft',
    price: '62,000',
    features: ['Courtyard View', 'Dining Room', 'Jacuzzi', 'Walk-in Wardrobe', 'Lounge Area'],
    image: '/images/suite-grand.jpg',
    details: 'The Grand Palace Suite offers an expansive living space with separate bedroom, lounge, and dining areas. Floor-to-ceiling windows flood the room with natural light, while the private Jacuzzi and walk-in wardrobe add touches of indulgent luxury.',
  },
  {
    name: 'Courtyard Pavilion',
    description:
      'An intimate retreat surrounded by jasmine gardens with handcrafted teak furniture and a private meditation alcove.',
    size: '650 sq ft',
    price: '28,000',
    features: ['Garden Access', 'Rain Shower', 'Meditation Alcove', 'Organic Amenities'],
    image: '/images/suite-courtyard.jpg',
    details: 'Designed for serenity, the Courtyard Pavilion opens directly onto the jasmine gardens. Wake to birdsong and the fragrance of tropical flowers. The meditation alcove and organic bath amenities make this the perfect wellness retreat.',
  },
];

export default function Rooms() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  return (
    <section id="rooms" className="relative py-10 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px gold-line" />
      <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-gold/[0.02] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 35 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6 md:mb-14"
        >
          <span className="section-label block mb-3">Accommodations</span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4rem)] text-foreground mb-3">
            Royal Accommodations
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Each room is a chapter in the palace&apos;s grand narrative.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="luxury-card group cursor-pointer"
              onClick={() => setSelectedRoom(i)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Price badge */}
                <div className="absolute top-3 right-3 glass rounded-md px-2.5 py-1">
                  <span className="text-[11px] text-gold font-medium">&#8377;{room.price}</span>
                  <span className="text-[8px] text-muted block leading-tight">/night</span>
                </div>

                {/* Room name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent">
                  <h3 className="font-serif text-lg text-foreground">{room.name}</h3>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-gold/50">{room.size}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5 md:p-5">
                <p className="text-muted text-[13px] md:text-sm leading-[1.7] mb-3 md:mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                  {room.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm bg-dark-secondary text-muted border border-gold/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-gold/60 group-hover:text-gold transition-colors duration-300">
                  View Details
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card rounded-lg border border-gold/10 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full image */}
              <div className="relative aspect-[3/2] md:aspect-[16/9] w-full overflow-hidden">
                <img
                  src={rooms[selectedRoom].image}
                  alt={rooms[selectedRoom].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark-card to-transparent" />

                {/* Price */}
                <div className="absolute top-4 right-4 glass rounded-md px-3 py-1.5">
                  <span className="text-sm text-gold font-medium">&#8377;{rooms[selectedRoom].price}</span>
                  <span className="text-[9px] text-muted block leading-tight">/night</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 md:p-8 -mt-8 relative">
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold/60 block mb-2">
                  {rooms[selectedRoom].size}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  {rooms[selectedRoom].name}
                </h3>

                <p className="text-foreground/70 text-sm md:text-base leading-[1.8] mb-3">
                  {rooms[selectedRoom].description}
                </p>
                <p className="text-muted text-sm leading-[1.8] mb-6">
                  {rooms[selectedRoom].details}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {rooms[selectedRoom].features.map((f) => (
                    <span
                      key={f}
                      className="text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm bg-dark-secondary text-foreground/60 border border-gold/8"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#contact" onClick={() => setSelectedRoom(null)} className="btn-gold-filled">
                    Reserve This Room
                  </a>
                  <button onClick={() => setSelectedRoom(null)} className="btn-gold">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/60 hover:text-gold transition-colors z-10"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
