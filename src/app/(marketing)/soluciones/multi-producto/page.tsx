import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende Seguros y Préstamos — kotkot.ai',
  description: 'Ofrece múltiples productos a tus clientes desde una sola plataforma. Maximiza tus ingresos por cliente.',
};

export default function MultiProductoPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Vende Seguros y Préstamos
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
