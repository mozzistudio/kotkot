'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import WhatsAppMockup from './WhatsAppMockup';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mockupVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 },
  },
};

const stats = [
  { value: '3x', label: 'Más ventas cerradas' },
  { value: '25+', label: 'Aseguradoras y Bancos' },
  { value: '24/7', label: 'Automatización' },
];

const avatars = [
  { initials: 'JP', bg: 'bg-[var(--dark-blue)]' },
  { initials: 'MR', bg: 'bg-[var(--dark-blue-light)]' },
  { initials: 'AL', bg: 'bg-[var(--dark-blue-lighter)]' },
  { initials: 'SC', bg: 'bg-[var(--dark-blue)]' },
];

const words = [
  'Seguro de Auto',
  'Préstamo Hipotecario',
  'Seguro de Salud',
  'Préstamo Personal',
  'Seguro de Vida',
  'Seguro Empresarial',
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* --- Left: Text Content --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start lg:col-span-7"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-info-bg)] border border-[rgba(12,30,53,0.12)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--dark-blue)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
              </span>
              Automatización para Brokers
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-heading text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--dark-blue)] sm:text-[52px] lg:text-[56px] xl:text-[64px]"
          >
            Automatiza la venta de{' '}
            <span className="inline-block min-w-[300px] text-left">
              <span className="text-[var(--dark-blue)]">{currentText}</span>
              <span className="cursor-blink">|</span>
            </span>
            <br className="hidden sm:block" />
            {' '}por{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">WhatsApp</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                className="absolute bottom-[0.06em] left-[-3%] h-[0.4em] w-[106%] origin-left -skew-y-[1deg] rounded-[4px] bg-[var(--accent)]"
              />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--text-secondary)] sm:text-xl"
          >
            Tu bot IA cotiza, compara y cierra ventas{' '}
            <span className="font-semibold text-[var(--dark-blue)]">24/7</span>.{' '}
            Tú creces tu cartera.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              href="/demo"
              size="lg"
              className="bg-[var(--color-action-dark-bg)] text-[var(--color-action-dark-fg)] hover:bg-[var(--color-action-dark-hover)]"
              arrow
            >
              Solicitar Demo
            </Button>
            <Button
              href="/seguros"
              variant="secondary"
              size="lg"
              className="border-[var(--color-info-fg)] text-[var(--color-info-fg)] hover:bg-[var(--color-info-bg)]"
            >
              <Play className="h-4 w-4" />
              Ver cómo funciona
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={itemVariants} className="mt-8 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {avatars.map((user, i) => (
                <div
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white ${user.bg} text-[10px] font-bold text-white`}
                >
                  {user.initials}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[var(--text-secondary)]">
                Usado por <span className="font-semibold text-[var(--dark-blue)]">500+</span> brokers
              </span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-8 border-t border-[var(--border-default)] pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-2xl font-bold tracking-tight text-[var(--dark-blue)]">
                    {stat.value}
                  </span>
                </div>
                <span className="pl-3.5 text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- Right: WhatsApp Mockup --- */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center lg:col-span-5"
        >
          <WhatsAppMockup />
        </motion.div>
      </div>
    </section>
  );
}
