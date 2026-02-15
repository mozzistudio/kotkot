'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const insuranceProducts = [
  {
    slug: 'auto',
    name: 'Seguro de Auto',
    icon: '🚗',
    description: 'Protección completa para tu vehículo con las mejores aseguradoras',
    features: ['Todo Riesgo', 'Robo Total', 'Asistencia Vial'],
  },
  {
    slug: 'salud',
    name: 'Seguro de Salud',
    icon: '🏥',
    description: 'Cobertura médica amplia con red de hospitales y clínicas',
    features: ['Hospitalización', 'Consultas', 'Medicamentos'],
  },
  {
    slug: 'vida',
    name: 'Seguro de Vida',
    icon: '🛡️',
    description: 'Protección financiera para tu familia en cualquier momento',
    features: ['Muerte Natural', 'Accidental', 'Invalidez'],
  },
  {
    slug: 'hogar',
    name: 'Seguro de Hogar',
    icon: '🏠',
    description: 'Protege tu casa y tus bienes contra cualquier eventualidad',
    features: ['Incendio', 'Robo', 'Daños Naturales'],
  },
  {
    slug: 'viaje',
    name: 'Seguro de Viaje',
    icon: '✈️',
    description: 'Viaja tranquilo con cobertura médica y asistencia internacional',
    features: ['Emergencias', 'Equipaje', 'Cancelación'],
  },
  {
    slug: 'mascota',
    name: 'Seguro de Mascota',
    icon: '🐾',
    description: 'Salud y bienestar para tu mejor amigo de cuatro patas',
    features: ['Veterinario', 'Cirugías', 'Vacunas'],
  },
  {
    slug: 'empresarial',
    name: 'Seguro Empresarial',
    icon: '🏢',
    description: 'Protección integral para tu negocio y empleados',
    features: ['RC General', 'Propiedad', 'Empleados'],
  },
  {
    slug: 'responsabilidad-civil',
    name: 'Responsabilidad Civil',
    icon: '⚖️',
    description: 'Cobertura legal contra daños a terceros',
    features: ['Daños Materiales', 'Lesiones', 'Defensa Legal'],
  },
  {
    slug: 'accidentes-personales',
    name: 'Accidentes Personales',
    icon: '🚑',
    description: 'Cobertura 24/7 contra accidentes',
    features: ['Muerte Accidental', 'Invalidez', 'Gastos Médicos'],
  },
  {
    slug: 'ahorro',
    name: 'Seguro de Ahorro',
    icon: '💰',
    description: 'Ahorra mientras te proteges con rendimientos garantizados',
    features: ['Ahorro Programado', 'Protección', 'Retiros'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function InsuranceProducts() {
  return (
    <section className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-[rgba(12,30,53,0.15)] bg-[var(--color-info-bg)] px-4 py-2 text-sm font-semibold text-[var(--dark-blue)]">
            <span>✨</span>
            10 Tipos de Seguros Disponibles
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Productos que tu <span className="text-[var(--text-primary)]">Bot Puede Vender</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Configura tu agente IA para vender estos productos automáticamente.
            Compara 10+ aseguradoras y ofrece la mejor opción a tus clientes.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {insuranceProducts.map((product) => (
            <motion.div key={product.slug} variants={cardVariants}>
              <Link
                href={`/seguros/${product.slug}`}
                className="group block h-full rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--dark-blue)] hover:bg-[var(--surface-hover)]"
              >
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-info-bg)] text-3xl transition-transform duration-300 group-hover:scale-110">
                  {product.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-1.5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                    >
                      <span className="text-[var(--text-primary)]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--text-primary)] group-hover:gap-2 transition-all">
                  Configurar
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/seguros"
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--dark-blue)] bg-white px-8 py-4 text-lg font-semibold text-[var(--dark-blue)] transition-all duration-200 hover:bg-[var(--dark-blue-surface)]"
          >
            Ver Todas las Aseguradoras
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
