import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM para Brokers — kotkot.ai',
  description: 'Gestiona tu cartera de clientes, pólizas y renovaciones en un solo lugar. CRM diseñado para brokers de seguros.',
};

export default function CRMPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          CRM para Brokers
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
