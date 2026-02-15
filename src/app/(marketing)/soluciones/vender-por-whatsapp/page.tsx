import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vende por WhatsApp — kotkot.ai',
  description: 'Atiende, cotiza y vende seguros directamente por WhatsApp con IA. Cierra más ventas donde están tus clientes.',
};

export default function VenderWhatsAppPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Vende por WhatsApp
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
