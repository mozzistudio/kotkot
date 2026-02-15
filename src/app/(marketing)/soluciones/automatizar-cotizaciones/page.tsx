import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatiza Cotizaciones — kotkot.ai',
  description: 'Genera cotizaciones de múltiples aseguradoras en segundos. Envía propuestas profesionales automáticamente.',
};

export default function AutomatizarCotizacionesPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Automatiza Cotizaciones
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
