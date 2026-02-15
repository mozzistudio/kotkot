import type { Metadata } from 'next';
import { SolucionVenderPorWhatsApp } from './SolucionVenderPorWhatsApp';

export const metadata: Metadata = {
  title: 'Convierte WhatsApp en tu Mejor Vendedor — kotkot.ai',
  description:
    'Bot de ventas 24/7 en WhatsApp. Responde, cotiza y cierra automaticamente. 3x más conversiones. 98% satisfacción.',
  keywords: 'bot de ventas WhatsApp, atención al cliente automática, vender en WhatsApp',
  openGraph: {
    title: 'Convierte WhatsApp en tu Mejor Vendedor — kotkot.ai',
    description:
      'Tu bot responde al instante, 24/7. Cotiza, cierra y cobra mientras tú duermes.',
    type: 'website',
  },
};

export default function VenderPorWhatsAppPage() {
  return <SolucionVenderPorWhatsApp />;
}
