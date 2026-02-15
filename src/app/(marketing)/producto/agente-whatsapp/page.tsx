import type { Metadata } from 'next';
import { AgenteWhatsAppPage } from './AgenteWhatsAppPage';

export const metadata: Metadata = {
  title: 'Agente IA WhatsApp — kotkot.ai',
  description: 'Atiende clientes 24/7 por WhatsApp con IA. Responde preguntas, envía cotizaciones y agenda citas automáticamente.',
  keywords: 'bot WhatsApp, agente IA, atención al cliente 24/7, cotizaciones automáticas',
  openGraph: {
    title: 'Agente IA WhatsApp — kotkot.ai',
    description: 'Tu vendedor 24/7. Cotiza, atiende y cierra ventas en WhatsApp automáticamente.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main>
      <AgenteWhatsAppPage />
    </main>
  );
}
