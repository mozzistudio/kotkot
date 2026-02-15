import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Yappy — Cobra con Yappy desde kotkot',
  description: 'Genera links de pago Yappy automáticamente después de cada venta.',
};

export default function YappyPage() {
  return (
    <IntegrationPageTemplate
      companyName="Yappy"
      companyType="Pagos"
      overview="Yappy es la plataforma de pagos instantáneos más popular de Panamá, desarrollada por Banco General. Conecta Yappy a kotkot para generar links de pago automáticamente después de cada venta."
      features={[
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Generación automática de links de pago: tu bot crea enlaces Yappy al cerrar cada venta',
            'Confirmación instantánea: detecta pagos completados en tiempo real',
            'Seguimiento de pagos: rastrea todos los pagos desde tu dashboard',
            'Reconciliación automática: todos los cobros se registran automáticamente',
            'Notificaciones al cliente: envía recibos y confirmaciones por WhatsApp',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta Yappy',
          description:
            'Vincula tu cuenta comercial de Yappy con kotkot',
        },
        {
          number: '2',
          title: 'Configura cobro automático',
          description:
            'Define cuándo y cómo tu bot genera links de pago',
        },
        {
          number: '3',
          title: 'Cobra sin esfuerzo',
          description:
            'Tu bot genera links, confirma pagos y envía recibos automáticamente',
        },
      ]}
    />
  );
}
