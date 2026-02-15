import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración WhatsApp Business API — kotkot.ai',
  description: 'Conecta tu bot con la API oficial de WhatsApp Business. Conversaciones automatizadas, mensajes masivos y más.',
  keywords: 'WhatsApp Business API, bot WhatsApp, automatización WhatsApp',
};

export default function WhatsAppPage() {
  return (
    <IntegrationPageTemplate
      companyName="WhatsApp Business"
      companyType="Pagos"
      overview="WhatsApp Business API es la solución oficial de Meta para empresas. Con kotkot, obtienes acceso completo a la API de WhatsApp sin necesidad de configuraciones técnicas complejas."
      features={[
        {
          title: 'Funcionalidades disponibles',
          items: [
            'Conversaciones automatizadas: tu bot responde mensajes 24/7 en WhatsApp',
            'Mensajes masivos: envía notificaciones y promociones a tu base de clientes',
            'Plantillas aprobadas: usa templates pre-aprobados por WhatsApp para notificaciones',
            'Multimedia: envía imágenes, PDFs, videos y documentos automáticamente',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Conexión directa: kotkot maneja toda la infraestructura técnica de WhatsApp',
            'Número verificado: obtén tu check verde de verificación de negocio',
            'Gestión de conversaciones: todas las conversaciones se registran en tu CRM de kotkot',
            'Cumplimiento de políticas: kotkot asegura que cumplas con las políticas de WhatsApp',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu número de WhatsApp Business',
          description:
            'Vincula tu número de teléfono empresarial con kotkot. Nosotros manejamos la conexión con Meta y la infraestructura técnica.',
        },
        {
          number: '2',
          title: 'Configura tu bot y flujos de conversación',
          description:
            'Diseña las conversaciones de tu bot, define respuestas automáticas y configura integraciones con tus productos.',
        },
        {
          number: '3',
          title: 'Empieza a atender clientes en WhatsApp',
          description:
            'Tu bot de WhatsApp responde preguntas, cotiza productos, cierra ventas y cobra pagos automáticamente.',
        },
      ]}
    />
  );
}
