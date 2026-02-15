import type { Metadata } from 'next';
import { PartnersPage } from '@/components/marketing/PartnersPage';

export const metadata: Metadata = {
  title: 'Programa White Label para Corredurías — kotkot.ai',
  description:
    'Despliega la plataforma kotkot bajo tu propia marca. Bot IA de WhatsApp, CRM y cobros automáticos para cada broker de tu red. Desde $99/broker/mes.',
  openGraph: {
    title: 'Programa White Label para Corredurías — kotkot.ai',
    description:
      'Despliega la plataforma kotkot bajo tu propia marca. Bot IA de WhatsApp, CRM y cobros automáticos para cada broker de tu red.',
  },
};

export default function PartnersMarketingPage() {
  return <PartnersPage />;
}
