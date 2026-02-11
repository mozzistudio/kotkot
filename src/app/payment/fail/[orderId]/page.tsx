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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Red X circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 animate-scale-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/30">
            <XCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 font-heading animate-fade-in">
          Pago No Completado
        </h1>

        <p className="mt-3 text-gray-600 animate-fade-in stagger-1">
          Hubo un problema con tu pago. Por favor intenta nuevamente.
        </p>

        {/* Order ID */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 animate-fade-in stagger-2">
          <span className="text-sm text-red-700">Orden:</span>
          <span className="text-sm font-semibold text-red-800 font-mono">
            {orderId}
          </span>
        </div>

        {/* Possible reasons */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm animate-slide-up stagger-3">
          <h3 className="text-sm font-semibold text-gray-800">Posibles causas:</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              Fondos insuficientes en la cuenta
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              La transaccion fue rechazada por el banco
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              Tiempo de espera agotado durante el procesamiento
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              Datos de pago incorrectos
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in stagger-4">
          <a
            href={`/payment/retry/${orderId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar Pago
          </a>

          <a
            href="https://wa.me/50761000001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar Soporte
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
