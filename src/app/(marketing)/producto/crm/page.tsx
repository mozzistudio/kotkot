import type { Metadata } from 'next';
import { CRMPage } from './CRMPage';

export const metadata: Metadata = {
  title: 'CRM para Brokers — kotkot.ai',
  description: 'Gestiona tu cartera de clientes, pólizas y renovaciones en un solo lugar. CRM diseñado para brokers de seguros.',
  keywords: 'CRM brokers, gestión de clientes, pipeline de ventas, automatización de seguimientos',
  openGraph: {
    title: 'CRM para Brokers — kotkot.ai',
    description: 'Centraliza tus clientes, oportunidades e interacciones en una plataforma poderosa.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main>
      <CRMPage />
    </main>
  );
}
