'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign, Zap } from '@/components/shared/icon-map';
import { useState, useEffect } from 'react';

export default function CalculadoraROIPage() {
  // Input states
  const [quotesPerDay, setQuotesPerDay] = useState(20);
  const [minutesPerQuote, setMinutesPerQuote] = useState(15);
  const [closingRate, setClosingRate] = useState(20);
  const [avgCommission, setAvgCommission] = useState(150);

  // Calculated results
  const [hoursSaved, setHoursSaved] = useState(0);
  const [extraSales, setExtraSales] = useState(0);
  const [extraRevenue, setExtraRevenue] = useState(0);
  const [roiMonths, setRoiMonths] = useState(0);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    // Hours saved per week
    const totalMinutesPerDay = quotesPerDay * minutesPerQuote;
    const hoursPerWeek = (totalMinutesPerDay * 5) / 60;
    const savedHours = hoursPerWeek * 0.75; // 75% time saved with automation

    // Extra sales per month (24/7 availability + faster response = 50% more opportunities)
    const currentSalesPerMonth = quotesPerDay * 20 * (closingRate / 100);
    const additionalSales = currentSalesPerMonth * 0.5;

    // Extra revenue per month
    const additionalRevenue = additionalSales * avgCommission;

    // ROI calculation (assuming kotkot costs $199/month)
    const monthlyCost = 199;
    const monthsToROI = monthlyCost / additionalRevenue;

    setHoursSaved(Math.round(savedHours * 10) / 10);
    setExtraSales(Math.round(additionalSales));
    setExtraRevenue(Math.round(additionalRevenue));
    setRoiMonths(Math.max(0.1, Math.round(monthsToROI * 10) / 10));
  }, [quotesPerDay, minutesPerQuote, closingRate, avgCommission]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Recursos', href: '/recursos' },
          { label: 'Calculadora ROI', href: '' },
        ]}
      />

      <PageHero
        badge="ROI Calculator"
        title="Calculadora de ROI — ¿Cuánto más ganas con kotkot?"
        subtitle="Descubre cuántas horas ahorras y cuántos ingresos adicionales puedes generar automatizando tu correduría"
        ctaText="Solicitar Demo"
        ctaHref="/demo"
      />

      {/* Calculator Section */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-8">
                <h2 className="mb-6 font-heading text-2xl font-bold text-[var(--text-primary)]">
                  Tu situación actual
                </h2>

                <div className="space-y-6">
                  {/* Quotes per day */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      ¿Cuántas cotizaciones haces por día?
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={quotesPerDay}
                      onChange={(e) => setQuotesPerDay(Number(e.target.value))}
                      className="w-full accent-[var(--accent)]"
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">5</span>
                      <span className="font-bold text-[var(--dark-blue)]">{quotesPerDay}</span>
                      <span className="text-[var(--text-muted)]">50</span>
                    </div>
                  </div>

                  {/* Minutes per quote */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      ¿Cuántos minutos toma cada cotización?
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={minutesPerQuote}
                      onChange={(e) => setMinutesPerQuote(Number(e.target.value))}
                      className="w-full accent-[var(--accent)]"
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">5 min</span>
                      <span className="font-bold text-[var(--dark-blue)]">{minutesPerQuote} min</span>
                      <span className="text-[var(--text-muted)]">30 min</span>
                    </div>
                  </div>

                  {/* Closing rate */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      ¿Cuál es tu tasa de cierre actual?
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={closingRate}
                      onChange={(e) => setClosingRate(Number(e.target.value))}
                      className="w-full accent-[var(--accent)]"
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">5%</span>
                      <span className="font-bold text-[var(--dark-blue)]">{closingRate}%</span>
                      <span className="text-[var(--text-muted)]">40%</span>
                    </div>
                  </div>

                  {/* Average commission */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      ¿Cuál es tu comisión promedio por venta?
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      step="10"
                      value={avgCommission}
                      onChange={(e) => setAvgCommission(Number(e.target.value))}
                      className="w-full rounded-[var(--radius-input)] border border-[var(--border-default)] bg-white px-4 py-3 font-semibold text-[var(--text-primary)] transition-all focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]"
                    />
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      Entre $50 y $1000
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-gradient-to-br from-[var(--accent-light)] to-white p-8">
                <h2 className="mb-6 font-heading text-2xl font-bold text-[var(--text-primary)]">
                  Tu potencial con kotkot
                </h2>

                <div className="space-y-6">
                  {/* Hours saved */}
                  <motion.div
                    key={hoursSaved}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-[var(--text-secondary)]">
                        Horas ahorradas por semana
                      </h3>
                    </div>
                    <p className="text-4xl font-extrabold text-[var(--dark-blue)]">
                      {hoursSaved}h
                    </p>
                  </motion.div>

                  {/* Extra sales */}
                  <motion.div
                    key={extraSales}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="rounded-xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-[var(--text-secondary)]">
                        Ventas adicionales por mes
                      </h3>
                    </div>
                    <p className="text-4xl font-extrabold text-[var(--dark-blue)]">
                      +{extraSales}
                    </p>
                  </motion.div>

                  {/* Extra revenue */}
                  <motion.div
                    key={extraRevenue}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="rounded-xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-[var(--text-secondary)]">
                        Ingresos adicionales por mes
                      </h3>
                    </div>
                    <p className="text-4xl font-extrabold text-[var(--dark-blue)]">
                      ${extraRevenue.toLocaleString()}
                    </p>
                  </motion.div>

                  {/* ROI */}
                  <motion.div
                    key={roiMonths}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] p-6 shadow-xl"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-[var(--text-primary)]">
                        <Zap className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        ROI de kotkot en
                      </h3>
                    </div>
                    <p className="text-4xl font-extrabold text-[var(--text-primary)]">
                      {roiMonths < 1 ? '<1' : roiMonths} {roiMonths === 1 ? 'mes' : 'meses'}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--text-primary)]/80">
                      Basado en $199/mes
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-10 text-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--dark-blue)] bg-[var(--dark-blue)] px-8 py-4 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[var(--dark-blue-light)] hover:shadow-xl"
            >
              ¿Te gusta lo que ves? Solicitar Demo
            </a>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Convierte estos números en realidad"
        subtitle="Agenda tu demo personalizada y empieza a automatizar hoy mismo"
      />
    </>
  );
}
