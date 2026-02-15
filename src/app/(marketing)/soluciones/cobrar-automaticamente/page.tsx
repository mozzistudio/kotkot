import type { Metadata } from 'next';
import { SolucionCobrarAutomaticamente } from './SolucionCobrarAutomaticamente';

export const metadata: Metadata = {
  title: 'Cobranza Automática para Seguros — kotkot.ai',
  description:
    'Links de pago automáticos después de cada venta. 95% de pagos a tiempo. Cero llamadas de seguimiento.',
  keywords: 'cobranza automática, sistema de pago seguros, automatización de cobranza',
  openGraph: {
    title: 'Cobranza Automática para Seguros — kotkot.ai',
    description:
      'Link de pago enviado automáticamente. Cobra sin perseguir a nadie.',
    type: 'website',
  },
};

export default function CobrarAutomaticamentePage() {
  return <SolucionCobrarAutomaticamente />;
}
