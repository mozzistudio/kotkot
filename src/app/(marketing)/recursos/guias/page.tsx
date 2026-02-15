import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guías para Brokers — kotkot.ai',
  description: 'Guías prácticas sobre venta de seguros, marketing digital, y gestión de clientes para brokers.',
};

export default function GuiasPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Guías para Brokers
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
