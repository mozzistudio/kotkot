import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard & Analytics — kotkot.ai',
  description: 'Visualiza tus ventas, comisiones y rendimiento en tiempo real con reportes detallados y analíticas avanzadas.',
};

export default function DashboardPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Dashboard & Analytics
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
