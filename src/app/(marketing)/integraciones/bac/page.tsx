import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende Préstamos BAC con kotkot — kotkot.ai',
  description: 'Integración con BAC Credomatic. Cotiza préstamos BAC desde kotkot.ai.',
};

export default function BACIntegracionPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Vende Préstamos BAC con kotkot
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
