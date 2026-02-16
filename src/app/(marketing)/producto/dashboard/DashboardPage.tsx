'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Eye, AlertCircle, Download } from '@/components/shared/icon-map';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

const features = [
  {
    icon: TrendingUp,
    title: 'Métricas en Tiempo Real',
    description: 'Conversiones, ingresos, tasa de cierre. Actualizado cada segundo.',
  },
  {
    icon: Eye,
    title: 'Visibilidad 360°',
    description: 'Visualiza todos tus KPIs en un solo dashboard personalizable.',
  },
  {
    icon: BarChart3,
    title: 'Análisis Profundos',
    description: 'Entiende tendencias, patrones y oportunidades en tus datos.',
  },
  {
    icon: Zap,
    title: 'Acciones Rápidas',
    description: 'Ejecuta acciones directamente desde el dashboard sin cambiar de página.',
  },
  {
    icon: AlertCircle,
    title: 'Alertas Inteligentes',
    description: 'Recibe notificaciones de eventos importantes. Nunca pierdas oportunidades.',
  },
  {
    icon: Download,
    title: 'Reportes Automáticos',
    description: 'Genera reportes diarios, semanales o mensuales automaticamente.',
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

const itemVariants = {
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

export function DashboardPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Producto', href: '/producto' }, { label: 'Dashboard', href: '/producto/dashboard' }]} />

      <PageHero
        badge="ANALYTICS"
        title="Dashboard que Habla tu Lenguaje"
        subtitle="Visualiza todas tus métricas en tiempo real. De un vistazo, conoce exactamente qué está funcionando."
      />

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Características Principales
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Conoce tu negocio al detalle
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <div className="h-full rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-dark-blue)]">
                    <feature.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Las Métricas que Importan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Monitorea lo que realmente acelera tu negocio
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              { title: 'Tasa de Conversión', description: 'De leads a clientes. Entiende tu embudo.' },
              { title: 'Ingreso Mensual', description: 'Visualiza tendencias de ingresos en tiempo real.' },
              { title: 'Satisfacción del Cliente', description: 'NPS, reviews y feedback de clientes.' },
              { title: 'Mejor Fuente de Leads', description: 'Cuál canal genera más conversiones.' },
              { title: 'Tiempo Promedio de Cierre', description: 'Cuán rápido cierras deals.' },
              { title: 'ROI de Campañas', description: 'Cuál es el retorno de cada esfuerzo.' },
            ].map((metric, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6">
                  <h3 className="font-heading font-semibold text-[var(--text-primary)]">
                    {metric.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Actúa Sin Cambiar de Página
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Quick actions para tareas frecuentes
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
          >
            {[
              'Crear nuevo lead directamente',
              'Enviar cotización a cliente',
              'Programar seguimiento',
              'Cerrar venta',
              'Descargar reporte',
              'Compartir con equipo',
            ].map((action, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
                  <svg className="h-5 w-5 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[var(--text-secondary)]">{action}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Ve tu Negocio Claramente"
        subtitle="Datos en tiempo real, decisiones más inteligentes"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
