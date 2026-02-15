import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Stripe — kotkot.ai',
  description: 'Cobra con tarjetas de crédito y débito desde WhatsApp. Pagos internacionales con Stripe.',
  keywords: 'cobrar con Stripe, pagos con tarjeta WhatsApp, integración Stripe',
};

export default function StripePage() {
  return (
    <IntegrationPageTemplate
      companyName="Stripe"
      companyType="Pagos"
      overview="Stripe es la plataforma de pagos en línea más utilizada del mundo. Con kotkot, puedes aceptar pagos con tarjetas de crédito y débito internacionalmente directamente desde tu bot de WhatsApp."
      features={[
        {
          title: 'Funcionalidades disponibles',
          items: [
            'Pagos con tarjeta: acepta Visa, MasterCard, American Express y más',
            'Enlaces de pago: genera checkout links de Stripe personalizados',
            'Pagos recurrentes: configura suscripciones y cobros automáticos mensuales',
            'Pagos internacionales: cobra en múltiples monedas y países',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'API completa de Stripe: acceso a todas las funcionalidades de Stripe desde tu bot',
            'Seguridad PCI: cumplimiento automático con estándares de seguridad de pagos',
            'Webhooks automáticos: tu bot recibe notificaciones instantáneas de pagos exitosos',
            'Reembolsos automáticos: procesa devoluciones desde tu dashboard de kotkot',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta de Stripe',
          description:
            'Vincula tu cuenta de Stripe con kotkot usando OAuth seguro. Si no tienes cuenta, te ayudamos a crear una.',
        },
        {
          number: '2',
          title: 'Configura productos y precios',
          description:
            'Define qué productos vendes, sus precios, monedas aceptadas y configura opciones de pago recurrente si aplica.',
        },
        {
          number: '3',
          title: 'Cobra pagos globalmente desde WhatsApp',
          description:
            'Tu bot envía links de pago de Stripe, confirma transacciones y emite recibos automáticamente a tus clientes.',
        },
      ]}
    />
  );
}
