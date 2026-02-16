import { XCircle, RefreshCw, ArrowLeft, MessageCircle } from '@/components/shared/icon-map';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaymentFailPageProps {
  params: Promise<{ orderId: string }>;
}

// ---------------------------------------------------------------------------
// Component (Light theme — server component)
// ---------------------------------------------------------------------------

export default async function PaymentFailPage({ params }: PaymentFailPageProps) {
  const { orderId } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        {/* Red X circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[rgba(239,68,68,0.15)] animate-scale-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--error)]">
            <XCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-heading animate-fade-in">
          Pago No Completado
        </h1>

        <p className="mt-3 text-[var(--text-secondary)] animate-fade-in stagger-1">
          Hubo un problema con tu pago. Por favor intenta nuevamente.
        </p>

        {/* Order ID */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-white px-4 py-2 animate-fade-in stagger-2">
          <span className="text-sm text-[var(--text-secondary)]">Orden:</span>
          <span className="text-sm font-semibold text-[var(--text-primary)] font-mono">
            {orderId}
          </span>
        </div>

        {/* Possible reasons */}
        <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-5 text-left animate-slide-up stagger-3">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Posibles causas:</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--error)]" />
              Fondos insuficientes en la cuenta
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--error)]" />
              La transaccion fue rechazada por el banco
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--error)]" />
              Tiempo de espera agotado durante el procesamiento
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--error)]" />
              Datos de pago incorrectos
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in stagger-4">
          <a
            href={`/payment/retry/${orderId}`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--action-primary-hover)]"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar Pago
          </a>

          <a
            href="https://wa.me/50761000001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--surface-panel)]"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar Soporte
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
