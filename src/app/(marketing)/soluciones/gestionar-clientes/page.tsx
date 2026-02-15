import type { Metadata } from 'next';
import { SolucionGestionarClientes } from './SolucionGestionarClientes';

export const metadata: Metadata = {
  title: 'CRM Automático para Seguros — kotkot.ai',
  description:
    'CRM que se llena solo. 0 entrada manual. Alertas de renovación, historial completo de clientes, venta cruzada automática.',
  keywords: 'CRM seguros, gestión de clientes automática, sistema CRM para seguros',
  openGraph: {
    title: 'CRM Automático para Seguros — kotkot.ai',
    description:
      'Cada conversación es un cliente. Cada cliente, un archivo completo.',
    type: 'website',
  },
};

export default function GestionarClientesPage() {
  return <SolucionGestionarClientes />;
}
