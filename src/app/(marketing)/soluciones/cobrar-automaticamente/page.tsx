import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cobra Automáticamente — kotkot.ai',
  description: 'Automatiza el cobro de primas con Yappy, ACH y tarjetas. Mejora tu flujo de caja sin perseguir clientes.',
};

export default function CobrarAutomaticamentePage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Cobra Automáticamente
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
