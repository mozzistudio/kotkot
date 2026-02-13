import { XCircle, RefreshCw, ArrowLeft, MessageCircle } from 'lucide-react';

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
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444]">
            <XCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#111827] font-heading animate-fade-in">
          Pago No Completado
        </h1>

        <p className="mt-3 text-[#6b7280] animate-fade-in stagger-1">
          Hubo un problema con tu pago. Por favor intenta nuevamente.
        </p>

        {/* Order ID */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2 animate-fade-in stagger-2">
          <span className="text-sm text-[#6b7280]">Orden:</span>
          <span className="text-sm font-semibold text-[#111827] font-mono">
            {orderId}
          </span>
        </div>

        {/* Possible reasons */}
        <div className="mt-8 rounded-[16px] border border-[#e5e7eb] bg-white p-5 text-left animate-slide-up stagger-3">
          <h3 className="text-sm font-semibold text-[#111827]">Posibles causas:</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef4444]" />
              Fondos insuficientes en la cuenta
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef4444]" />
              La transaccion fue rechazada por el banco
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef4444]" />
              Tiempo de espera agotado durante el procesamiento
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef4444]" />
              Datos de pago incorrectos
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in stagger-4">
          <a
            href={`/payment/retry/${orderId}`}
            className="inline-flex items-center gap-2 rounded-[16px] bg-[#CAFF04] px-6 py-3 text-sm font-semibold text-[#111827] transition-all hover:bg-[#b8e604]"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar Pago
          </a>

          <a
            href="https://wa.me/50761000001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[16px] border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#111827] transition-all hover:bg-[#f9fafb]"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar Soporte
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6b7280] transition-colors hover:text-[#111827]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
