import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integración Yappy — kotkot.ai',
  description: 'Cobra primas con Yappy. Integración directa para recibir pagos de clientes de forma automática.',
};

export default function YappyIntegracionPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Integración Yappy
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
