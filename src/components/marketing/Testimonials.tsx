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
      'Mis ventas aumentaron 40% con kotkot. El bot cotiza seguros mientras yo duermo y los clientes reciben respuesta inmediata.',
    name: 'Carlos M.',
    title: 'Corredor de Seguros',
    country: 'Panamá',
    flag: '\u{1F1F5}\u{1F1E6}',
    initials: 'CM',
    color: 'bg-[var(--dark-blue)] text-white',
  },
  {
    quote:
      'Ahorro 3 horas diarias en cotizaciones manuales. Ahora puedo enfocarme en cerrar más ventas y crecer mi cartera.',
    name: 'María G.',
    title: 'Directora de Correduría',
    country: 'Colombia',
    flag: '\u{1F1E8}\u{1F1F4}',
    initials: 'MG',
    color: 'bg-[var(--dark-blue)] text-white',
  },
  {
    quote:
      'El mejor ROI para mi negocio financiero. Recuperé la inversión en menos de 2 meses vendiendo más seguros y préstamos.',
    name: 'Roberto L.',
    title: 'CEO Correduría',
    country: 'México',
    flag: '\u{1F1F2}\u{1F1FD}',
    initials: 'RL',
    color: 'bg-[var(--dark-blue)] text-white',
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
    <section className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Brokers que ya automatizaron su negocio
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
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-[var(--surface-hover)]"
            >
              <StarRating />

              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-[var(--border-default)] pt-5">
                {/* Avatar */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] ${t.color} text-sm font-bold`}
                >
                  {t.initials}
                </div>

                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
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
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6"
            >
              <StarRating />

              <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--text-primary)]">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-[var(--border-default)] pt-5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] ${testimonials[currentIndex].color} text-sm font-bold`}
                >
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-[var(--text-primary)]">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
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
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border-default)] bg-white text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir a testimonio ${i + 1}`}
                  className={`h-2 rounded-[var(--radius-button)] transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-[var(--dark-blue)]'
                      : 'w-2 bg-[var(--border-default)] hover:bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label="Siguiente testimonio"
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border-default)] bg-white text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
