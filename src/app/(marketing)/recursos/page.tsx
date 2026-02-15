import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursos para Brokers — kotkot.ai',
  description: 'Guías, webinars, calculadoras y recursos gratuitos para brokers de seguros y préstamos en Latinoamérica.',
};

export default function RecursosPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Recursos para Brokers
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
