import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Yappy — kotkot.ai',
  description: 'Cobra pagos con Yappy desde WhatsApp. Transferencias instantáneas y automatizadas en Panamá.',
  keywords: 'cobrar con Yappy, integración Yappy, pagos automáticos Yappy',
};

export default function YappyPage() {
  return (
    <IntegrationPageTemplate
      companyName="Yappy"
      companyType="Pagos"
      overview="Yappy es la plataforma de pagos móviles líder en Panamá. Con kotkot, puedes cobrar pagos automáticamente a través de Yappy directamente desde tu bot de WhatsApp."
      features={[
        {
          title: 'Funcionalidades disponibles',
          items: [
            'Cobros automáticos: tu bot envía solicitudes de pago por Yappy automáticamente',
            'Enlaces de pago: genera links de pago Yappy personalizados para cada cliente',
            'Confirmación instantánea: tu bot detecta cuando el pago fue recibido y continúa el proceso',
            'Recordatorios de pago: notificaciones automáticas para pagos pendientes',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Integración nativa: kotkot se conecta directamente con la API de Yappy',
            'Recibos automáticos: tu bot envía comprobantes de pago al instante',
            'Reconciliación automática: todos los pagos se registran en tu dashboard de kotkot',
            'Multi-moneda: soporte para pagos en USD y otras monedas disponibles en Yappy',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta Yappy Business',
          description:
            'Vincula tu cuenta de Yappy Business con kotkot. Necesitas tener una cuenta comercial activa de Yappy.',
        },
        {
          number: '2',
          title: 'Configura métodos de pago en tu bot',
          description:
            'Define montos, plazos de pago y personaliza los mensajes de solicitud de pago que tu bot enviará.',
        },
        {
          number: '3',
          title: 'Cobra pagos automáticamente',
          description:
            'Tu bot solicita pagos por Yappy, confirma transferencias y envía recibos sin que tengas que hacer nada.',
        },
      ]}
    />
  );
}
