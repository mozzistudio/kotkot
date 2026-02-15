import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webinars para Brokers — kotkot.ai',
  description: 'Webinars gratuitos sobre venta digital, automatización y tendencias del sector de seguros.',
};

export default function WebinarsPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Webinars para Brokers
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
