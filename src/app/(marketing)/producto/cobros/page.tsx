import type { Metadata } from 'next';
import { CobrosPage } from './CobrosPage';

export const metadata: Metadata = {
  title: 'Cobros Automáticos — kotkot.ai',
  description: 'Automatiza el cobro de primas con Yappy, ACH y tarjetas. Olvídate de perseguir pagos manualmente.',
  keywords: 'sistema de cobros, pagos automáticos, procesamiento de pagos, múltiples métodos',
  openGraph: {
    title: 'Cobros Automáticos — kotkot.ai',
    description: 'Procesa pagos de seguros y préstamos de forma segura y rápida.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main>
      <CobrosPage />
    </main>
  );
}
