import type { Metadata } from 'next';

import { AutomatizarCotizacionesLanding } from '@/components/marketing/AutomatizarCotizacionesLanding';

export const metadata: Metadata = {
  title: 'Automatiza Cotizaciones de Seguros y Préstamos — kotkot.ai',
  description:
    'Deja de cotizar manualmente en 5 portales. Tu bot IA consulta 25+ aseguradoras y bancos en segundos y envía el comparativo por WhatsApp.',
  openGraph: {
    title: 'Automatiza Cotizaciones de Seguros y Préstamos — kotkot.ai',
    description:
      'Deja de cotizar manualmente en 5 portales. Tu bot IA consulta 25+ aseguradoras y bancos en segundos.',
  },
};

export default function AutomatizarCotizacionesPage() {
  return <AutomatizarCotizacionesLanding />;
}
