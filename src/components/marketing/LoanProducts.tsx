'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const loanProducts = [
  {
    slug: 'personal',
    name: 'Préstamo Personal',
    icon: '💵',
    description: 'Financia tus proyectos personales con tasas competitivas',
    features: ['Hasta $50K', 'Tasa desde 8%', 'Sin garantía'],
  },
  {
    slug: 'hipotecario',
    name: 'Préstamo Hipotecario',
    icon: '🏡',
    description: 'Compra tu casa con planes flexibles de hasta 30 años',
    features: ['Hasta 30 años', 'Tasa fija o variable', 'Hasta 90% LTV'],
  },
  {
    slug: 'auto',
    name: 'Préstamo de Auto',
    icon: '🚗',
    description: 'Financia tu vehículo nuevo o usado con aprobación rápida',
    features: ['Hasta 7 años', 'Entrega en 48h', '0% inicial'],
  },
  {
    slug: 'empresarial',
    name: 'Préstamo Empresarial',
    icon: '🏢',
    description: 'Capital de trabajo para hacer crecer tu negocio',
    features: ['Hasta $500K', 'Flujo flexible', 'Plazos personalizados'],
  },
  {
    slug: 'consolidacion',
    name: 'Consolidación de Deudas',
    icon: '💳',
    description: 'Une todas tus deudas en un solo pago mensual',
    features: ['Reduce tu cuota', 'Tasa más baja', 'Simplifica pagos'],
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

export function LoanProducts() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-[rgba(202,255,4,0.40)] bg-[rgba(202,255,4,0.15)] px-4 py-2 text-sm font-semibold text-[#111827]">
            <span>💰</span>
            5 Tipos de Préstamos Disponibles
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            Compara <span className="text-[#059669]">Préstamos</span> al
            Instante
          </h2>
          <p className="mt-4 text-lg text-[#6b7280]">
            Desde préstamos personales hasta hipotecarios. Compara 15+ bancos y
            obtén aprobación en minutos.
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
          {loanProducts.map((product) => (
            <motion.div key={product.slug} variants={cardVariants}>
              <Link
                href={`/prestamos/${product.slug}`}
                className="group block h-full rounded-[16px] border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(202,255,4,0.40)] hover:bg-[#f3f4f6]"
              >
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)] text-3xl transition-transform duration-300 group-hover:scale-110">
                  {product.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-[#111827] group-hover:text-[#059669] transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-1.5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-[#6b7280]"
                    >
                      <span className="text-[#059669]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#059669] group-hover:gap-2 transition-all">
                  Comparar bancos
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
            href="/prestamos"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#e5e7eb] bg-white px-8 py-4 text-lg font-semibold text-[#111827] transition-all duration-200 hover:bg-[#f3f4f6]"
          >
            Ver Todos los Bancos
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
