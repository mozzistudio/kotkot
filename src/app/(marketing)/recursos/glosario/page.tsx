import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glosario de Seguros — kotkot.ai',
  description: 'Términos y conceptos clave del sector de seguros y préstamos explicados de forma simple.',
};

export default function GlosarioPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Glosario de Seguros
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
