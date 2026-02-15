import type { Metadata } from 'next';
import { SolucionMultiProducto } from './SolucionMultiProducto';

export const metadata: Metadata = {
  title: 'Venta Cruzada Automática — kotkot.ai',
  description:
    'Vende seguros y préstamos en una sola conversación. Dobla tu comisión. Un bot para todos los productos.',
  keywords: 'venta cruzada, multi-producto seguros, oferta cruzada automática',
  openGraph: {
    title: 'Venta Cruzada Automática — kotkot.ai',
    description:
      'Seguros + Préstamos. Un solo bot. Doble comisión.',
    type: 'website',
  },
};

export default function MultiProductoPage() {
  return <SolucionMultiProducto />;
}
