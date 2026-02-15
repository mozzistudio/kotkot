import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparativas — kotkot.ai',
  description: 'Compara kotkot.ai con otras plataformas y herramientas para brokers de seguros y préstamos.',
};

export default function ComparativasPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Comparativas
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
