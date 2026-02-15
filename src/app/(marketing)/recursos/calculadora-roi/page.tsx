import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora ROI — kotkot.ai',
  description: 'Calcula cuánto tiempo y dinero puedes ahorrar automatizando tu brokerage con kotkot.ai.',
};

export default function CalculadoraROIPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Calculadora ROI
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
