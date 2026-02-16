'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@/components/shared/icon-map';

const dashboardViews = [
  {
    id: 'dashboard',
    title: 'Dashboard Principal',
    description:
      'Métricas en tiempo real: conversaciones activas, cotizaciones del día, pólizas vendidas e ingresos.',
    screenshot: '/screenshots/dashboard-main.png',
    features: [
      'Stats cards',
      'Conversaciones recientes',
      'Actividad semanal',
      'Acciones rápidas',
    ],
  },
  {
    id: 'conversations',
    title: 'Conversaciones',
    description:
      'Chat en tiempo real con clientes. El bot maneja cotizaciones mientras tú supervisas o intervienes.',
    screenshot: '/screenshots/conversations.png',
    features: [
      'Chat en vivo',
      'Filtros por estado',
      'Toma de control',
      'Historial completo',
    ],
  },
  {
    id: 'clients',
    title: 'Clientes',
    description:
      'CRM completo con tags, búsqueda avanzada y seguimiento de pólizas por cliente.',
    screenshot: '/screenshots/clients.png',
    features: [
      'Gestión de clientes',
      'Tags personalizables',
      'Búsqueda instantánea',
      'Pólizas activas',
    ],
  },
  {
    id: 'quotes',
    title: 'Cotizaciones',
    description:
      'Todas las cotizaciones generadas por tu bot. Filtra por aseguradora, estado y tipo de seguro.',
    screenshot: '/screenshots/quotes.png',
    features: [
      'Histórico completo',
      'Filtros avanzados',
      'Exportar reportes',
      'Comparación de precios',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description:
      'Gráficos de conversión, productos más vendidos, fuentes de leads y rendimiento del bot.',
    screenshot: '/screenshots/analytics.png',
    features: [
      'Gráficos interactivos',
      'Conversión por canal',
      'Productos top',
      'Rendimiento IA',
    ],
  },
];

export function DashboardScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === dashboardViews.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dashboardViews.length - 1 : prev - 1
    );
  };

  const currentView = dashboardViews[currentIndex];

  return (
    <section className="mx-auto max-w-7xl mb-24">
      {/* Tab Selector */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {dashboardViews.map((view, idx) => (
          <button
            key={view.id}
            onClick={() => setCurrentIndex(idx)}
            className={`shrink-0 rounded-[var(--radius-button)] px-6 py-3 text-sm font-semibold transition-all ${
              currentIndex === idx
                ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            {view.title}
          </button>
        ))}
      </div>

      {/* Screenshot Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating Container */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border)] shadow-2xl"
          >
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1.5 text-xs text-[var(--text-tertiary)]">
                kotkot.ai/{currentView.id}
              </div>
            </div>

            {/* Screenshot Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-[var(--text-tertiary)] text-lg">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">
                  {currentView.id === 'dashboard' && '📊'}
                  {currentView.id === 'conversations' && '💬'}
                  {currentView.id === 'clients' && '👥'}
                  {currentView.id === 'quotes' && '📋'}
                  {currentView.id === 'analytics' && '📈'}
                </div>
                <p className="font-semibold text-[var(--text-secondary)]">
                  {currentView.title}
                </p>
                <p className="text-sm text-[var(--text-tertiary)] mt-2">
                  Screenshot: {currentView.screenshot}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {currentView.title}
            </h3>
            <p className="mt-2 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {currentView.description}
            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {currentView.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-[var(--accent-light)] px-4 py-1.5 text-sm font-medium text-[var(--text-primary)]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={goToPrev}
          className="rounded-full border-2 border-[var(--border)] p-3 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {dashboardViews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-[var(--accent)]'
                  : 'w-2 bg-[var(--border-medium)] hover:bg-[var(--accent)]'
              }`}
              aria-label={`Go to screenshot ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="rounded-full border-2 border-[var(--border)] p-3 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
