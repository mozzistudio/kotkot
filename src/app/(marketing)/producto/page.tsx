import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plataforma kotkot.ai — Automatiza tu Brokerage',
  description: 'Plataforma completa para brokers de seguros y préstamos en Latinoamérica. Agente IA, CRM, cotizaciones automáticas, y más.',
};

export default function ProductoPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Plataforma kotkot.ai
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
