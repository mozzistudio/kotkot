import { CheckCircle, ArrowLeft } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PaymentSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

// ---------------------------------------------------------------------------
// Component (Light theme — server component)
// ---------------------------------------------------------------------------

export default async function PaymentSuccessPage({ params }: PaymentSuccessPageProps) {
  const { orderId } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Animated checkmark circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 animate-scale-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 font-heading animate-fade-in">
          Pago Exitoso!
        </h1>

        <p className="mt-3 text-gray-600 animate-fade-in stagger-1">
          Tu poliza ha sido generada. Recibiras los detalles por WhatsApp.
        </p>

        {/* Order ID */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 animate-fade-in stagger-2">
          <span className="text-sm text-emerald-700">Orden:</span>
          <span className="text-sm font-semibold text-emerald-800 font-mono">
            {orderId}
          </span>
        </div>

        {/* Additional info */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm animate-slide-up stagger-3">
          <h3 className="text-sm font-semibold text-gray-800">Proximos pasos:</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                1
              </span>
              Recibiras tu poliza digital por WhatsApp en los proximos minutos.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                2
              </span>
              Una copia tambien sera enviada a tu correo electronico.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                3
              </span>
              Tu cobertura comienza inmediatamente.
            </li>
          </ul>
        </div>

        {/* Back link */}
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 animate-fade-in stagger-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </a>
      </div>
    </div>
  );
}
