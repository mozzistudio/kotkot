import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración ASSA — kotkot.ai',
  description: 'Vende seguros ASSA automatizado. Cotización en tiempo real, emisión de pólizas y comisiones automáticas.',
  keywords: 'vender seguros ASSA automatizado, integración ASSA, bot seguros ASSA',
};

export default function ASSAPage() {
  return (
    <IntegrationPageTemplate
      companyName="ASSA"
      companyType="Aseguradora"
      overview="ASSA Compañía de Seguros es una de las aseguradoras líderes en Centroamérica. Con kotkot, puedes vender seguros ASSA de forma automatizada 24/7 a través de WhatsApp."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización instantánea con cálculo de prima en tiempo real',
            'Seguros de salud: planes individuales y familiares con comparador de coberturas',
            'Seguros de vida: pólizas temporales y permanentes con emisión automática',
            'Seguros comerciales: protección para negocios y empresas',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Cotización en tiempo real: tu bot consulta las tarifas actualizadas de ASSA al instante',
            'Emisión de pólizas: emite pólizas directamente desde la conversación de WhatsApp',
            'Cobro automático: integración con Yappy y tarjetas para cobrar el primer pago',
            'Renovaciones automáticas: tu bot recuerda y gestiona renovaciones de pólizas',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tus credenciales API',
          description:
            'Ingresa tus credenciales de corredor ASSA en el dashboard de kotkot. Tu información está encriptada y segura.',
        },
        {
          number: '2',
          title: 'Configura los productos en tu dashboard',
          description:
            'Selecciona qué seguros de ASSA quieres vender, define tus márgenes de comisión y personaliza mensajes.',
        },
        {
          number: '3',
          title: 'Tu bot empieza a vender automáticamente',
          description:
            'Tu bot de WhatsApp cotiza, emite pólizas y cobra pagos de ASSA sin que tengas que intervenir.',
        },
      ]}
    />
  );
}
