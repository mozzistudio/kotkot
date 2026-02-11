'use client';

import { motion } from 'framer-motion';
import { CircleUser, Plug, Smartphone, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: CircleUser,
    title: 'Regístrate',
    description: 'Crea tu cuenta y elige tu plan. Setup en 2 minutos.',
  },
  {
    number: 2,
    icon: Plug,
    title: 'Conecta APIs',
    description:
      'Conecta tus aseguradoras con tus credenciales API o sube tablas de tarifas.',
  },
  {
    number: 3,
    icon: Smartphone,
    title: 'Conecta WhatsApp',
    description:
      'Vincula tu número de WhatsApp Business con Meta Embedded Signup.',
  },
  {
    number: 4,
    icon: Rocket,
    title: '¡Listo!',
    description: 'Tu agente IA está vendiendo seguros 24/7 en WhatsApp.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
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

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative px-4 py-24 sm:py-32">
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
            De registro a primera venta en{' '}
            <span className="text-gradient-primary">15 minutos</span>
          </h2>
        </motion.div>

        {/* --- Steps: Horizontal on desktop, vertical on mobile --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          {/* Connecting line — horizontal (desktop) */}
          <div className="absolute top-[3.25rem] left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] hidden h-0.5 border-t-2 border-dashed border-emerald-200 lg:block" />

          {/* Connecting line — vertical (mobile/tablet) */}
          <div className="absolute top-16 bottom-16 left-[1.6875rem] w-0.5 border-l-2 border-dashed border-emerald-200 lg:hidden" />

          {/* Desktop grid (horizontal) */}
          <div className="hidden grid-cols-4 gap-8 lg:grid">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Numbered circle */}
                <div className="relative z-10 mb-5 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                  <span className="font-heading text-xl font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
                  <step.icon className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile/tablet stack (vertical) */}
          <div className="flex flex-col gap-10 lg:hidden">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex items-start gap-5 pl-2"
              >
                {/* Numbered circle */}
                <div className="relative z-10 flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                  <span className="font-heading text-lg font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <step.icon className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
