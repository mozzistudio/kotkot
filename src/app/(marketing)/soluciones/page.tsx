import type { Metadata } from 'next';
import { SolucionesHub } from './SolucionesHub';

export const metadata: Metadata = {
  title: 'Soluciones para Brokers — kotkot.ai',
  description: 'Soluciones específicas para los retos diarios de brokers de seguros y préstamos en Latinoamérica.',
  keywords: 'soluciones brokers, automatización seguros, vender por WhatsApp, cobros automáticos',
  openGraph: {
    title: 'Soluciones para Brokers — kotkot.ai',
    description: 'Descubre cómo kotkot.ai resuelve tus problemas más comunes con IA y automatización.',
    type: 'website',
  },
};

export default function SolucionesPage() {
  return (
    <main>
      <SolucionesHub />
    </main>
  );
}
