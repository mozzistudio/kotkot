import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende ASSA con kotkot — kotkot.ai',
  description: 'Integración directa con ASSA. Cotiza y vende seguros ASSA desde kotkot.ai sin copiar y pegar.',
};

export default function ASSAIntegracionPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Vende ASSA con kotkot
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
