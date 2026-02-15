import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integración Stripe — kotkot.ai',
  description: 'Cobra primas con tarjetas de crédito. Integración con Stripe para pagos internacionales.',
};

export default function StripeIntegracionPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Integración Stripe
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
