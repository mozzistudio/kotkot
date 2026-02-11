'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  country: string;
  flag: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'CotiFácil transformó mi correduría. Ahora vendo seguros mientras duermo.',
    name: 'Carlos M.',
    title: 'Corredor',
    country: 'Panamá',
    flag: '\u{1F1F5}\u{1F1E6}',
    initials: 'CM',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    quote:
      'Mis clientes aman poder cotizar por WhatsApp. Las ventas aumentaron 40%.',
    name: 'María G.',
    title: 'Directora',
    country: 'Colombia',
    flag: '\u{1F1E8}\u{1F1F4}',
    initials: 'MG',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    quote:
      'El mejor ROI en tecnología que he hecho para mi negocio de seguros.',
    name: 'Roberto L.',
    title: 'CEO',
    country: 'México',
    flag: '\u{1F1F2}\u{1F1FD}',
    initials: 'RL',
    color: 'from-emerald-500 to-teal-400',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Lo que dicen nuestros{' '}
            <span className="text-gradient-primary">corredores</span>
          </h2>
        </motion.div>

        {/* --- Desktop grid (3 cards) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden grid-cols-3 gap-6 md:grid"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="glass-card flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
            >
              <StarRating />

              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-white/40 pt-5">
                {/* Avatar */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white shadow-md`}
                >
                  {t.initials}
                </div>

                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.title}, {t.country} {t.flag}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Mobile carousel (single card) --- */}
        <div className="relative md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass-card flex flex-col p-7"
            >
              <StarRating />

              <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-slate-700">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-white/40 pt-5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} text-sm font-bold text-white shadow-md`}
                >
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-slate-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonials[currentIndex].title},{' '}
                    {testimonials[currentIndex].country}{' '}
                    {testimonials[currentIndex].flag}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={goToPrev}
              aria-label="Anterior testimonio"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/50 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/70 hover:text-slate-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir a testimonio ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-emerald-500'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label="Siguiente testimonio"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/50 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/70 hover:text-slate-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
