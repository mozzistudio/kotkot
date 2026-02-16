'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Building2,
  CheckCircle,
  ChevronDown,
  CreditCard,
  GraduationCap,
  MessageSquare,
  Palette,
  Plug,
  TrendingUp,
  Users,
} from '@/components/shared/icon-map';
import type { LucideIcon } from '@/components/shared/icon-map';

const ease = [0.22, 1, 0.36, 1] as const;

const opportunityCards: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Building2,
    title: 'Escala sin desarrollar',
    text: 'No necesitas un equipo de tecnología. Despliega una plataforma probada bajo tu marca en semanas, no en meses. Sin código, sin servidores, sin dolores de cabeza técnicos.',
  },
  {
    icon: Users,
    title: 'Activa cada broker de tu red',
    text: 'Cada corredor de tu organización recibe su propio bot de WhatsApp, CRM y dashboard. Tú ves todo desde arriba: métricas, comisiones, rendimiento.',
  },
  {
    icon: TrendingUp,
    title: 'Nuevo revenue stream',
    text: 'Monetiza la tecnología. Ofrece la plataforma como valor agregado a tus brokers, o cobrales una cuota mensual. Tu marca, tu pricing, tu negocio.',
  },
];

const includedCards: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Palette,
    title: 'Branding completo',
    text: 'Tu logo, colores, tipografía y dominio. Tus brokers nunca ven la marca kotkot.',
  },
  {
    icon: MessageSquare,
    title: 'Bot IA en WhatsApp por broker',
    text: 'Cada broker de tu red recibe un agente IA que cotiza, compara y cierra ventas 24/7 en WhatsApp.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard centralizado',
    text: 'Vista global de todos tus brokers: conversaciones, conversiones, comisiones, rendimiento. Filtros por región, producto y período.',
  },
  {
    icon: CreditCard,
    title: 'Cobros automáticos',
    text: 'Yappy, Stripe y más. El bot genera links de pago al instante. Tú trackeas cada transacción.',
  },
  {
    icon: Plug,
    title: 'Integraciones a medida',
    text: 'Conecta las aseguradoras y bancos que trabajan con tu red. APIs estándar o integraciones custom.',
  },
  {
    icon: GraduationCap,
    title: 'E-learning incluido',
    text: 'Plataforma de formación para tu equipo admin y tus brokers. Onboarding autónomo, sin depender de nadie.',
  },
];

const faqs = [
  {
    q: '¿Mis brokers ven la marca kotkot?',
    a: 'No. Tu plataforma white label lleva tu logo, tus colores, tu dominio. kotkot es invisible para tus brokers y sus clientes.',
  },
  {
    q: '¿Cuánto toma el despliegue?',
    a: 'Depende de la complejidad del proyecto. Un despliegue estándar se completa en pocas semanas. Lo definimos juntos en el kickoff.',
  },
  {
    q: '¿Puedo cobrar a mis brokers lo que quiera?',
    a: 'Sí. Tú defines tu propio pricing. Muchos partners cobran $199-299/mes por broker y conservan la diferencia.',
  },
  {
    q: '¿Qué pasa con las integraciones de aseguradoras?',
    a: 'Las integraciones son opcionales y se configuran por proyecto. Si tu red ya trabaja con ASSA, MAPFRE, SURA, las conectamos directamente.',
  },
  {
    q: '¿Hay un mínimo de brokers?',
    a: 'Sí. El programa white label requiere un mínimo de 25 brokers activos y un contrato de 12 meses.',
  },
  {
    q: '¿Quién da soporte a los brokers?',
    a: 'Tu equipo admin, con el apoyo de nuestra plataforma e-learning. Nosotros te damos soporte a ti — tú le das soporte a tus brokers.',
  },
  {
    q: '¿Puedo tener exclusividad territorial?',
    a: 'Sí. La exclusividad por país o región está disponible con un compromiso de volumen mínimo.',
  },
];

export function PartnersPage() {
  const [openFaq, setOpenFaq] = useState(faqs[0]?.q ?? '');

  const tiers = [
    { name: 'Starter', brokers: '1-25', price: '$129' },
    { name: 'Growth', brokers: '26-75', price: '$99', popular: true },
    { name: 'Scale', brokers: '76-150', price: '$79' },
  ];

  return (
    <div className="bg-[var(--surface-page)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden bg-[var(--dark-blue)] px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex rounded-full border border-[rgba(202,255,4,0.35)] bg-[rgba(202,255,4,0.15)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              Programa White Label
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              White Label para Corredurías: Tu Marca, Cada Broker Automatizado.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Despliega una plataforma completa de automatización de seguros y préstamos bajo tu propia marca. Tus brokers venden con IA por WhatsApp. Tú controlas todo desde un dashboard centralizado.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/demo"
                className="inline-flex items-center rounded-[var(--radius-button)] border border-[rgba(202,255,4,0.4)] bg-[var(--accent)] px-8 py-4 text-base font-bold text-[var(--text-primary)] transition hover:bg-[var(--accent-hover)]"
              >
                Solicitar Propuesta →
              </a>
              <a href="#precios" className="text-base font-semibold text-white underline-offset-4 hover:underline">
                Ver precios ↓
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-4 backdrop-blur"
          >
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#0a1728]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-[10px] bg-[var(--accent)]" />
                  <span className="text-sm font-semibold text-white">[Tu Marca]</span>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Admin Central</span>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {["Brokers Activos", "Conversión", "Cobros"].map((item, i) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/60">{item}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{['126', '32%', '$74k'][i]}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Red Multi-Broker</p>
                  <div className="mt-3 space-y-2">
                    {[1, 2, 3].map((row) => (
                      <div key={row} className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-[var(--accent)]"
                          style={{ width: `${55 + row * 12}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--dark-blue)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto max-w-3xl text-center font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Tu correduría tiene los brokers. Nosotros tenemos la tecnología.
          </motion.h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {opportunityCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-info-bg)]">
                  <card.icon className="h-6 w-6 text-[var(--dark-blue)]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">{card.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-[var(--text-secondary)]">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
          >
            Todo lo que incluye tu plataforma White Label
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-70px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {includedCards.map((feature) => (
              <motion.div
                key={feature.title}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-[var(--surface-hover)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-info-bg)]">
                  <feature.icon className="h-6 w-6 text-[var(--dark-blue)]" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--surface-panel)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            De la firma al despliegue en 4 pasos
          </h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden border-t border-dashed border-[var(--border-strong)] md:block" />
            {[
              ['01', 'Kickoff & Branding', 'Definimos tu identidad visual, dominio y configuración base.'],
              ['02', 'Setup técnico', 'Desplegamos tu instancia, configuramos los accesos admin y conectamos tu primer grupo de brokers.'],
              ['03', 'Integraciones', 'Conectamos las aseguradoras y bancos que necesitas. APIs, tablas tarifarias o integraciones custom.'],
              ['04', 'Go Live', 'Tus brokers reciben acceso. Tu bot empieza a vender. Soporte activo durante el lanzamiento.'],
            ].map(([n, title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease }}
                className="relative rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--accent-light)] text-sm font-extrabold text-[var(--dark-blue)]">
                  {n}
                </div>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="bg-[var(--color-info-bg)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-extrabold text-[var(--text-primary)]">Pricing transparent. Sin sorpresas.</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">Un modelo simple: setup + mensualidad por broker + comisión por transacción.</p>
          </div>

          <div className="mt-10 rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-white p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-heading text-2xl font-bold">Setup & Despliegue</h3>
              <span className="rounded-full bg-[var(--accent-light)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--dark-blue)]">Pago único</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Branding completo (logo, colores, dominio)',
                'Despliegue de instancia multi-tenant',
                'Dashboard admin centralizado',
                'Acceso a plataforma e-learning',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <CheckCircle className="h-5 w-5 text-[var(--dark-blue)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-7 text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">$8,000 — $12,000</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Según complejidad del branding y configuración</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-[var(--radius-card)] border-2 bg-white p-7 ${tier.popular ? 'border-[var(--accent)] shadow-[0_8px_26px_rgba(202,255,4,0.25)]' : 'border-[var(--border-default)]'}`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--radius-button)] bg-[var(--accent)] px-4 py-1 text-xs font-extrabold uppercase">Popular</span>
                )}
                <h4 className="font-heading text-2xl font-bold">{tier.name}</h4>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{tier.brokers} brokers</p>
                <div className="mt-4 text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">{tier.price}</div>
                <p className="text-sm text-[var(--text-secondary)]">por broker/mes</p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
                  {['Bot IA WhatsApp (1 numéro inclus)', 'CRM + Dashboard + Analytics', 'Cobros automáticos', 'Soporte e-learning'].map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--dark-blue)]" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">150+ brokers: Contactar para pricing personalizado · Numéros WhatsApp adicionales: $29/mes por numéro</p>

          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-2xl font-bold">Integraciones & Setup Técnico</h3>
              <span className="rounded-full bg-[var(--surface-panel)] px-3 py-1 text-xs font-semibold">Opcional · Por proyecto</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-muted)]">
                    <th className="py-2">Servicio</th><th className="py-2">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Integración aseguradora (API estándar)', '$500 — $1,000'],
                    ['Integración banco (API estándar)', '$500 — $1,000'],
                    ['Integración custom (API no-estándar, scraping)', '$1,500 — $3,000'],
                    ['Conexión WhatsApp Business API', '$200/número'],
                    ['Setup pasarela de pago', '$200/broker'],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--border-subtle)]">
                      <td className="py-3 text-[var(--text-secondary)]">{row[0]}</td>
                      <td className="py-3 font-semibold text-[var(--text-primary)]">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">Mantenimiento opcional de integraciones custom: $100-200/mes</p>
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-7">
            <h3 className="font-heading text-2xl font-bold">Comisión por transacción</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Frais del procesador + 1% kotkot</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-muted)]">
                    <th className="py-2">Método</th><th className="py-2">Procesador</th><th className="py-2">+ kotkot</th><th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Yappy', '~1.07%', '+1%', '~2.07%'],
                    ['Stripe (local)', '2.9% + $0.30', '+1%', '3.9% + $0.30'],
                    ['Stripe (internacional)', '3.9% + $0.30', '+1%', '4.9% + $0.30'],
                    ['Neopayment / Tilopay', 'Según contrato', '+1%', 'Variable + 1%'],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--border-subtle)]">
                      {row.map((cell) => (
                        <td key={cell} className="py-3 text-[var(--text-secondary)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">Mínimo mensual: $100/broker activo en módulo de cobros</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Stripe no disponible en Panamá directamente. Alternativas locales: Yappy, Neopayment, Tilopay.</p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-white p-8 text-center">
            <p className="text-xl font-semibold text-[var(--text-primary)]">Un partner con 50 brokers genera ~$8,385/mes de MRR. En 12 meses: más de $100,000 en revenue recurrente.</p>
            <a href="/recursos/calculadora-roi" className="mt-5 inline-flex items-center font-semibold text-[var(--dark-blue)] underline underline-offset-4">Calcula tu ROI →</a>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Preguntas frecuentes</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => {
              const isOpen = faq.q === openFaq;
              return (
                <div key={faq.q} className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white">
                  <button
                    onClick={() => setOpenFaq(isOpen ? '' : faq.q)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-[var(--text-primary)]">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--text-secondary)]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark-blue)] px-4 py-20 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-5xl">Tu red de brokers merece tecnología de punta</h2>
          <p className="mt-4 text-lg text-white/75">Habla con nuestro equipo y recibe una propuesta personalizada en 48h.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/demo" className="rounded-[var(--radius-button)] bg-[var(--accent)] px-8 py-3.5 font-bold text-[var(--text-primary)] hover:bg-[var(--accent-hover)]">Solicitar Propuesta →</a>
            <a href="https://wa.me/50760000000" className="rounded-[var(--radius-button)] border border-white/40 px-8 py-3.5 font-semibold text-white hover:bg-white/10">Escríbenos por WhatsApp →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
