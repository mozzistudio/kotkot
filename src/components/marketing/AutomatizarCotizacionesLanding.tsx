'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  MessageSquare,
  Moon,
  Send,
  TrendingUp,
  XCircle,
  Zap,
} from '@/components/shared/icon-map';
import Link from 'next/link';

import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const painPoints = [
  {
    icon: Clock,
    title: '30 minutos por cotización',
    text: 'Abres 5 portales, ingresas los mismos datos 5 veces, copias resultados a mano y armas el comparativo en Excel.',
  },
  {
    icon: XCircle,
    title: 'Errores que te cuestan ventas',
    text: 'Un dígito mal copiado, una prima incorrecta, y el cliente pierde confianza. O peor: compra con la competencia.',
  },
  {
    icon: Moon,
    title: 'Clientes perdidos fuera de horario',
    text: 'El 40% de las consultas llegan después de las 8pm. Si no contestas al instante, otro corredor lo hará.',
  },
];

const flowSteps = [
  {
    icon: MessageSquare,
    title: 'Cliente escribe por WhatsApp',
    text: 'Tu cliente pide una cotización de seguro o préstamo. Tu bot responde al instante — a cualquier hora.',
  },
  {
    icon: ClipboardList,
    title: 'Bot recopila la información',
    text: 'Preguntas inteligentes para obtener exactamente los datos que necesita: vehículo, monto, plazo, coberturas.',
  },
  {
    icon: Zap,
    title: 'Cotización simultánea en 25+ instituciones',
    text: 'En segundos, tu bot consulta todas tus aseguradoras y bancos conectados. Sin abrir un solo portal.',
  },
  {
    icon: Send,
    title: 'Comparativo enviado al cliente',
    text: 'El cliente recibe un comparativo claro directo en WhatsApp. Elige, paga, y tú cobras tu comisión. Todo automático.',
  },
];

const manualMetrics = [
  ['Tiempo por cotización', '30 min'],
  ['Cotizaciones por día', '10-15'],
  ['Disponibilidad', '8 horas'],
  ['Errores de transcripción', 'Frecuentes'],
  ['Portales consultados', '3-5'],
];

const automatedMetrics = [
  ['Tiempo por cotización', '< 30 seg'],
  ['Cotizaciones por día', 'Ilimitadas'],
  ['Disponibilidad', '24/7'],
  ['Errores', '0'],
  ['Instituciones consultadas', '25+'],
];

const insuranceProducts = [
  'Auto',
  'Salud',
  'Vida',
  'Hogar',
  'Empresarial',
  'Viaje',
  'Responsabilidad Civil',
  'Accidentes',
];

const loanProducts = [
  'Personal',
  'Hipotecario',
  'Auto',
  'Consolidación',
  'Empresarial',
  'Leasing',
];

export function AutomatizarCotizacionesLanding() {
  return (
    <main className="bg-[var(--surface-page)] text-[var(--text-primary)]">
      <section className="bg-gradient-to-b from-[var(--color-info-bg)] to-[var(--surface-page)] px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: 'Soluciones', href: '/soluciones' },
              { label: 'Automatizar Cotizaciones', href: '/soluciones/automatizar-cotizaciones' },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--accent-light)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--dark-blue)]">
              Solución
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Deja de Cotizar Manualmente en 5 Portales Diferentes
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              Tu bot IA consulta 25+ aseguradoras y bancos en segundos y envía el comparativo directo al cliente por WhatsApp. Sin portales, sin copy-paste, sin errores.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-[var(--text-on-accent)] transition-all duration-200 hover:bg-[var(--accent-hover)]"
              >
                Automatiza tus cotizaciones →
              </Link>
              <a
                href="#como-funciona"
                className="text-base font-semibold text-[var(--dark-blue)] transition-colors hover:text-[var(--text-primary)]"
              >
                Ver cómo funciona ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="text-center font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
          >
            ¿Te suena familiar?
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.article
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easing, delay: index * 0.08 }}
                  className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger-fg)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-[var(--text-primary)]">{point.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">{point.text}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
            className="mt-10 flex items-center justify-center gap-2 text-center text-lg font-bold text-[var(--color-danger-fg)]"
          >
            <Clock className="h-5 w-5" />
            Resultado: ~4 horas al día en tareas que no generan ingresos.
          </motion.p>
        </div>
      </section>

      <section id="como-funciona" className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="text-center font-heading text-3xl font-bold sm:text-4xl"
          >
            Con kotkot, cotizas en segundos
          </motion.h2>

          <div className="relative mt-12 grid gap-5 md:grid-cols-4">
            <div className="pointer-events-none absolute top-7 hidden h-px w-full border-t border-dashed border-[var(--border-strong)] md:block" />
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easing, delay: index * 0.1 }}
                  className="relative rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--text-on-accent)]">
                      {index + 1}
                    </span>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{step.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="text-center font-heading text-3xl font-bold sm:text-4xl"
          >
            El mismo broker. Resultados muy diferentes.
          </motion.h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easing }}
              className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--surface-panel)] p-6"
            >
              <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Manual</h3>
              <ul className="mt-6 space-y-4">
                {manualMetrics.map(([label, value]) => (
                  <li key={label} className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <XCircle className="h-4 w-4 text-[var(--text-muted)]" />
                      <span className="text-sm sm:text-base">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easing, delay: 0.08 }}
              className="rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-[var(--surface-elevated)] p-6 shadow-sm"
            >
              <h3 className="font-heading text-2xl font-bold text-[var(--dark-blue)]">Con kotkot</h3>
              <ul className="mt-6 space-y-4">
                {automatedMetrics.map(([label, value]) => (
                  <li key={label} className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-success-fg)]" />
                      <span className="text-sm sm:text-base">{label}</span>
                    </div>
                    <span className="text-base font-extrabold text-[var(--dark-blue)] sm:text-lg">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            Productos que tu bot cotiza automáticamente
          </motion.h2>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">Seguros</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {insuranceProducts.map((product) => (
                <span
                  key={product}
                  className="rounded-full border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">Préstamos</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {loanProducts.map((product) => (
                <span
                  key={product}
                  className="rounded-full border border-[var(--accent)] bg-[var(--accent-light)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-8 text-base font-medium text-[var(--text-secondary)]">25+ aseguradoras y 15+ bancos conectados</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="text-center font-heading text-3xl font-bold sm:text-4xl"
          >
            Brokers que ya automatizaron sus cotizaciones
          </motion.h2>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.08 }}
            className="mt-10 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-8 sm:p-10"
          >
            <p className="font-heading text-5xl leading-none text-[var(--accent)]">“</p>
            <blockquote className="mt-2 text-lg leading-relaxed text-[var(--text-primary)] sm:text-xl">
              Antes cotizaba en ASSA, MAPFRE y SURA una por una. Ahora mi bot lo hace en 10 segundos y me envía el comparativo listo. Gano 3 horas al día.
            </blockquote>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Carlos M.</p>
                <p className="text-sm text-[var(--text-secondary)]">Corredor de Seguros, Panamá</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent-light)] px-4 py-2 text-sm font-bold text-[var(--dark-blue)]">
                <TrendingUp className="h-4 w-4" />
                3 horas/día ahorradas
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="rounded-[var(--radius-card)] bg-[var(--surface-inverse)] px-6 py-12 text-center sm:px-10 sm:py-16"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-inverse)] sm:text-4xl">
              Automatiza tus cotizaciones en 48 horas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-inverse)] opacity-80">
              Setup en 15 minutos. Sin código. Sin integración técnica.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-[var(--text-on-accent)] transition-all duration-200 hover:bg-[var(--accent-hover)]"
              >
                Solicitar Demo Gratis →
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--text-inverse)] px-7 py-3.5 text-base font-semibold text-[var(--text-inverse)] transition-colors hover:bg-[var(--dark-blue-light)]"
              >
                Ver precios →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
