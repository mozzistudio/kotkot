import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Banco General — kotkot.ai',
  description: 'Vende préstamos hipotecarios y personales de Banco General en automático desde WhatsApp.',
  keywords: 'vender préstamos Banco General automatizado, integración Banco General, bot préstamos',
};

export default function BancoGeneralPage() {
  return (
    <IntegrationPageTemplate
      companyName="Banco General"
      companyType="Banco"
      overview="Banco General es uno de los bancos más grandes de Panamá. Con kotkot, puedes automatizar la cotización y referencia de préstamos hipotecarios y personales directamente desde WhatsApp."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Préstamos hipotecarios: simulación de cuotas para compra de vivienda',
            'Préstamos personales: cotización rápida con tasas competitivas',
            'Préstamos comerciales: financiamiento para negocios y emprendedores',
            'Líneas de crédito: opciones flexibles para tus clientes',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Simulador de cuotas: calcula pagos mensuales en tiempo real según monto y plazo',
            'Comparador de productos: tu bot compara automáticamente diferentes opciones de préstamos',
            'Captura de información: recolecta datos del cliente y los envía a Banco General',
            'Notificaciones de aprobación: tu bot informa al cliente cuando su préstamo es aprobado',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta de referidor',
          description:
            'Vincula tus credenciales de referidor de Banco General. Todo el proceso es seguro y cumple con regulaciones bancarias.',
        },
        {
          number: '2',
          title: 'Personaliza la experiencia de cotización',
          description:
            'Configura rangos de préstamos, plazos disponibles y personaliza los mensajes que tu bot enviará a tus clientes.',
        },
        {
          number: '3',
          title: 'Automatiza referencias de préstamos',
          description:
            'Tu bot cotiza, recolecta información del cliente y envía aplicaciones a Banco General. Tú recibes comisiones automáticamente.',
        },
      ]}
    />
  );
}
