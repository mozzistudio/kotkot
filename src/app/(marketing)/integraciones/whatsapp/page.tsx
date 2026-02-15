import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración WhatsApp Business API — kotkot',
  description: 'Conecta tu número de WhatsApp Business a kotkot con Meta Embedded Signup.',
};

export default function WhatsAppPage() {
  return (
    <IntegrationPageTemplate
      companyName="WhatsApp Business"
      companyType="Pagos"
      overview="Integración oficial de WhatsApp Business API vía Meta. Tu bot opera en tu propio número de negocio con toda la infraestructura manejada por kotkot."
      features={[
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Soporte multi-número: conecta múltiples números de WhatsApp Business',
            'Mensajes de plantilla: envía notificaciones pre-aprobadas por Meta',
            'Compartir multimedia: envía imágenes, PDFs, videos y documentos',
            'Confirmaciones de lectura: rastrea cuándo tus mensajes son leídos',
            'Encriptación end-to-end: todas las conversaciones están protegidas',
            'Negocio verificado por Meta: obtén el check verde oficial',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Vincula tu número',
          description:
            'Conecta tu número de WhatsApp Business usando Meta Embedded Signup',
        },
        {
          number: '2',
          title: 'Personaliza tu agente',
          description:
            'Configura tu bot IA con tu catálogo de productos y flujos de conversación',
        },
        {
          number: '3',
          title: 'Empieza a vender',
          description:
            'Tu bot atiende clientes 24/7 en WhatsApp con IA conversacional',
        },
      ]}
    />
  );
}
