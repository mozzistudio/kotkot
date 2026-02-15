import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración BAC — kotkot.ai',
  description: 'Vende préstamos personales y tarjetas de crédito BAC desde WhatsApp. Cotización automática en segundos.',
  keywords: 'vender préstamos BAC automatizado, integración BAC, bot préstamos BAC',
};

export default function BACPage() {
  return (
    <IntegrationPageTemplate
      companyName="BAC"
      companyType="Banco"
      overview="BAC es uno de los bancos líderes en Centroamérica. Con kotkot, puedes vender préstamos personales y tarjetas de crédito BAC de forma completamente automatizada a través de WhatsApp."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Préstamos personales: cotización instantánea con cálculo de cuotas en tiempo real',
            'Tarjetas de crédito: comparador de tarjetas con beneficios y tasas',
            'Préstamos hipotecarios: simulación de créditos para compra de vivienda',
            'Préstamos para vehículos: financiamiento de autos nuevos y usados',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Cotización en tiempo real: tasas actualizadas y cálculo de cuotas al instante',
            'Pre-aprobación automática: tu bot evalúa elegibilidad básica del cliente',
            'Solicitud digital: el cliente puede aplicar directo desde WhatsApp',
            'Seguimiento de aplicaciones: notificaciones automáticas sobre el estado de la solicitud',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tus credenciales de referidor BAC',
          description:
            'Ingresa tus credenciales de referidor o agente BAC en kotkot. La información está protegida con encriptación de grado bancario.',
        },
        {
          number: '2',
          title: 'Configura productos y comisiones',
          description:
            'Selecciona qué productos BAC quieres promover, define tus comisiones y personaliza los mensajes de venta.',
        },
        {
          number: '3',
          title: 'Tu bot cotiza y refiere clientes automáticamente',
          description:
            'Tu bot de WhatsApp cotiza préstamos, tarjetas de crédito y envía aplicaciones a BAC. Tú recibes comisiones por cada cliente referido.',
        },
      ]}
    />
  );
}
