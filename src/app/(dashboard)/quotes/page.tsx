'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  X,
  CalendarDays,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type QuoteStatus = 'generated' | 'sent' | 'selected' | 'paid' | 'expired';

interface QuoteResult {
  insurer: string;
  price: string;
  coverage: string;
  deductible: string;
}

interface Quote {
  id: string;
  clientName: string;
  insuranceType: string;
  date: string;
  resultsCount: number;
  bestPrice: string;
  status: QuoteStatus;
  results: QuoteResult[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const quotes: Quote[] = [
  {
    id: 'Q-001',
    clientName: 'Maria Gonzalez',
    insuranceType: 'Auto',
    date: '2026-02-11',
    resultsCount: 4,
    bestPrice: '$85/mes',
    status: 'sent',
    results: [
      { insurer: 'ASSA', price: '$85/mes', coverage: 'Cobertura Completa', deductible: '$500' },
      { insurer: 'Mapfre', price: '$92/mes', coverage: 'Cobertura Completa', deductible: '$400' },
      { insurer: 'Pan American', price: '$98/mes', coverage: 'Cobertura Completa', deductible: '$300' },
      { insurer: 'Suramericana', price: '$110/mes', coverage: 'Cobertura Premium', deductible: '$250' },
    ],
  },
  {
    id: 'Q-002',
    clientName: 'Carlos Perez',
    insuranceType: 'Auto',
    date: '2026-02-11',
    resultsCount: 3,
    bestPrice: '$92/mes',
    status: 'selected',
    results: [
      { insurer: 'ASSA', price: '$92/mes', coverage: 'Cobertura Completa', deductible: '$500' },
      { insurer: 'Mapfre', price: '$105/mes', coverage: 'Cobertura Completa', deductible: '$400' },
      { insurer: 'General de Seguros', price: '$115/mes', coverage: 'Cobertura Premium', deductible: '$300' },
    ],
  },
  {
    id: 'Q-003',
    clientName: 'Ana Rodriguez',
    insuranceType: 'Salud',
    date: '2026-02-10',
    resultsCount: 5,
    bestPrice: '$145/mes',
    status: 'generated',
    results: [
      { insurer: 'Pan American Life', price: '$145/mes', coverage: 'Plan Individual', deductible: '$1,000' },
      { insurer: 'Mapfre Salud', price: '$160/mes', coverage: 'Plan Individual Plus', deductible: '$800' },
      { insurer: 'BUPA', price: '$175/mes', coverage: 'Plan Gold', deductible: '$500' },
      { insurer: 'Cigna', price: '$190/mes', coverage: 'Plan Global', deductible: '$500' },
      { insurer: 'BlueCross', price: '$210/mes', coverage: 'Plan Premium', deductible: '$250' },
    ],
  },
  {
    id: 'Q-004',
    clientName: 'Juan Martinez',
    insuranceType: 'Hogar',
    date: '2026-02-10',
    resultsCount: 3,
    bestPrice: '$45/mes',
    status: 'paid',
    results: [
      { insurer: 'Suramericana', price: '$45/mes', coverage: 'Proteccion Basica', deductible: '$200' },
      { insurer: 'ASSA', price: '$55/mes', coverage: 'Proteccion Amplia', deductible: '$150' },
      { insurer: 'Mapfre', price: '$62/mes', coverage: 'Todo Riesgo', deductible: '$100' },
    ],
  },
  {
    id: 'Q-005',
    clientName: 'Laura Castillo',
    insuranceType: 'Salud',
    date: '2026-02-09',
    resultsCount: 4,
    bestPrice: '$180/mes',
    status: 'sent',
    results: [
      { insurer: 'Pan American Life', price: '$180/mes', coverage: 'Plan Familiar', deductible: '$1,000' },
      { insurer: 'Mapfre', price: '$195/mes', coverage: 'Plan Familiar Plus', deductible: '$800' },
      { insurer: 'BUPA', price: '$220/mes', coverage: 'Plan Familiar Gold', deductible: '$500' },
      { insurer: 'Cigna', price: '$240/mes', coverage: 'Plan Global Familiar', deductible: '$500' },
    ],
  },
  {
    id: 'Q-006',
    clientName: 'Roberto Diaz',
    insuranceType: 'Viaje',
    date: '2026-02-08',
    resultsCount: 3,
    bestPrice: '$25',
    status: 'expired',
    results: [
      { insurer: 'Assist Card', price: '$25', coverage: '15 dias Basico', deductible: '$50' },
      { insurer: 'World Nomads', price: '$32', coverage: '15 dias Standard', deductible: '$0' },
      { insurer: 'Allianz Travel', price: '$45', coverage: '15 dias Premium', deductible: '$0' },
    ],
  },
  {
    id: 'Q-007',
    clientName: 'Patricia Morales',
    insuranceType: 'Auto',
    date: '2026-02-07',
    resultsCount: 4,
    bestPrice: '$78/mes',
    status: 'paid',
    results: [
      { insurer: 'General de Seguros', price: '$78/mes', coverage: 'Cobertura Basica', deductible: '$700' },
      { insurer: 'ASSA', price: '$88/mes', coverage: 'Cobertura Completa', deductible: '$500' },
      { insurer: 'Mapfre', price: '$95/mes', coverage: 'Cobertura Completa', deductible: '$400' },
      { insurer: 'Suramericana', price: '$105/mes', coverage: 'Cobertura Premium', deductible: '$300' },
    ],
  },
  {
    id: 'Q-008',
    clientName: 'Fernando Vega',
    insuranceType: 'Negocio',
    date: '2026-02-06',
    resultsCount: 2,
    bestPrice: '$320/mes',
    status: 'generated',
    results: [
      { insurer: 'ASSA Comercial', price: '$320/mes', coverage: 'Pyme Basico', deductible: '$2,000' },
      { insurer: 'Suramericana', price: '$385/mes', coverage: 'Pyme Plus', deductible: '$1,500' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<QuoteStatus, { label: string; bg: string; text: string; border: string }> = {
  generated: { label: 'Generada', bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30' },
  sent: { label: 'Enviada', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  selected: { label: 'Seleccionada', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  paid: { label: 'Pagada', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  expired: { label: 'Expirada', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
};

const typeIcons: Record<string, React.ReactNode> = {
  Auto: <Car className="h-4 w-4" />,
  Salud: <Heart className="h-4 w-4" />,
  Hogar: <Home className="h-4 w-4" />,
  Viaje: <Plane className="h-4 w-4" />,
  Negocio: <Briefcase className="h-4 w-4" />,
};

type FilterStatus = 'all' | QuoteStatus;

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'generated', label: 'Generadas' },
  { value: 'sent', label: 'Enviadas' },
  { value: 'selected', label: 'Seleccionadas' },
  { value: 'paid', label: 'Pagadas' },
  { value: 'expired', label: 'Expiradas' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function QuotesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlStatus = searchParams.get('status') as QuoteStatus | null;
  const urlDate = searchParams.get('date');

  const [activeFilter, setActiveFilter] = useState<FilterStatus>(urlStatus ?? 'all');
  const [dateFilter, setDateFilter] = useState<string | null>(urlDate);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state when URL params change
  useEffect(() => {
    if (urlStatus) setActiveFilter(urlStatus);
  }, [urlStatus]);

  useEffect(() => {
    setDateFilter(urlDate);
  }, [urlDate]);

  const clearDateFilter = () => {
    setDateFilter(null);
    // Remove date param from URL without full reload
    const params = new URLSearchParams(searchParams.toString());
    params.delete('date');
    const newUrl = params.toString() ? `/quotes?${params.toString()}` : '/quotes';
    router.replace(newUrl);
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || q.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || q.status === activeFilter;
    const matchesDate = !dateFilter || q.date === dateFilter;
    return matchesSearch && matchesFilter && matchesDate;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-page-title">
            Cotizaciones & Polizas
          </h1>
          <p className="mt-1 text-body">
            {quotes.length} cotizaciones en total
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Buscar por cliente o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="mr-1 h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`shrink-0 pill ${
              activeFilter === opt.value
                ? 'pill-active'
                : 'pill-default'
            }`}
          >
            {opt.label}
          </button>
        ))}

        {/* Date filter chip (clearable) */}
        {dateFilter && (
          <button
            onClick={clearDateFilter}
            className="ml-2 inline-flex shrink-0 items-center gap-1.5 pill pill-active"
          >
            <CalendarDays className="h-3 w-3" />
            {dateFilter}
            <X className="h-3 w-3 ml-0.5" />
          </button>
        )}
      </div>

      {/* Quotes List */}
      <div className="space-y-3">
        {filteredQuotes.map((quote) => {
          const sc = statusConfig[quote.status];
          const isExpanded = expandedId === quote.id;

          return (
            <div
              key={quote.id}
              className="card transition-colors"
            >
              {/* Quote Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : quote.id)}
                className="flex w-full items-center gap-4 text-left"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                  {typeIcons[quote.insuranceType] ?? <FileText className="h-4 w-4" />}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/clients/${quote.id.replace('Q-', 'C-')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-link)] transition-colors"
                    >
                      {quote.clientName}
                    </Link>
                    <span className="text-xs text-[var(--text-tertiary)]">{quote.id}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span>{quote.insuranceType}</span>
                    <span className="text-[var(--border-medium)]">|</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {quote.date}
                    </span>
                    <span className="text-[var(--border-medium)]">|</span>
                    <span>{quote.resultsCount} resultados</span>
                  </div>
                </div>

                {/* Best Price */}
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="flex items-center gap-1 text-sm font-semibold text-[var(--success)] font-data">
                    <DollarSign className="h-3.5 w-3.5" />
                    {quote.bestPrice}
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">Mejor precio</span>
                </div>

                {/* Status */}
                <span className={`shrink-0 badge ${sc.bg} ${sc.text} ${sc.border}`}>
                  {sc.label}
                </span>

                {/* Expand Arrow */}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
                )}
              </button>

              {/* Expanded Results */}
              {isExpanded && (
                <div className="border-t border-[var(--border)] pt-4 mt-4">
                  <h3 className="mb-3 text-card-title">
                    Comparacion de Cotizaciones
                  </h3>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Aseguradora</th>
                          <th>Precio</th>
                          <th>Cobertura</th>
                          <th>Deducible</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.results.map((r, idx) => (
                          <tr key={idx}>
                            <td className="font-medium">
                              <Link
                                href={`/apis/${r.insurer.toLowerCase().replace(/\s+/g, '-')}`}
                                className="link"
                              >
                                {r.insurer}
                              </Link>
                            </td>
                            <td className="font-semibold text-[var(--success)] font-data">{r.price}</td>
                            <td>{r.coverage}</td>
                            <td>{r.deductible}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuotes.length === 0 && (
          <div className="card p-12 text-center">
            <FileText className="mx-auto h-8 w-8 text-[var(--border-medium)]" />
            <p className="mt-3 text-body">No se encontraron cotizaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense>
      <QuotesContent />
    </Suspense>
  );
}
