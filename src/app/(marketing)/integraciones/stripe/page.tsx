import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Stripe — Cobra con Tarjeta desde kotkot',
  description: 'Acepta pagos con tarjeta de crédito y débito internacionalmente.',
};

export default function StripePage() {
  return (
    <IntegrationPageTemplate
      companyName="Stripe"
      companyType="Pagos"
      overview="Stripe es la plataforma de pagos internacionales más utilizada globalmente. Integra Stripe con kotkot para aceptar pagos con tarjeta de crédito y débito desde WhatsApp."
      features={[
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Pagos con tarjeta de crédito y débito: acepta Visa, MasterCard, Amex y más',
            'Facturación recurrente: configura suscripciones y cobros mensuales automáticos',
            'Multi-moneda: acepta pagos en 135+ monedas',
            'Seguimiento de pagos: rastrea transacciones en tiempo real',
            'Gestión de reembolsos: procesa devoluciones desde tu dashboard',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta Stripe',
          description:
            'Vincula tu cuenta de Stripe con kotkot de forma segura',
        },
        {
          number: '2',
          title: 'Configura tu moneda',
          description:
            'Define las monedas que aceptarás y tus productos',
        },
        {
          number: '3',
          title: 'Acepta pagos globales',
          description:
            'Tu bot genera checkout links y cobra con tarjeta automáticamente',
        },
      ]}
    />
  );
}
