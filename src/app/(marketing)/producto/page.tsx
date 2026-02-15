import type { Metadata } from 'next';
import { ProductoHub } from './ProductoHub';

export const metadata: Metadata = {
  title: 'Plataforma kotkot.ai — Automatiza tu Brokerage',
  description: 'Plataforma completa para brokers de seguros y préstamos en Latinoamérica. Agente IA, CRM, cotizaciones automáticas, y más.',
  keywords: 'plataforma automatización, agente IA WhatsApp, CRM para brokers, sistema de cobros, dashboard analytics',
  openGraph: {
    title: 'Plataforma kotkot.ai — Automatiza tu Brokerage',
    description: 'Agente IA, CRM, pagos y analytics en una sola plataforma diseñada para brokers.',
    type: 'website',
  },
};

export default function ProductoPage() {
  return (
    <main>
      <ProductoHub />
    </main>
  );
}
