import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestiona tu Cartera de Clientes — kotkot.ai',
  description: 'Administra pólizas, renovaciones y comunicaciones con clientes desde un solo CRM diseñado para brokers.',
};

export default function GestionarClientesPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Gestiona tu Cartera de Clientes
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
