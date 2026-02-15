import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración MAPFRE — kotkot.ai',
  description: 'Vende seguros MAPFRE con automatización completa. Acceso directo al catálogo completo de productos.',
  keywords: 'vender seguros MAPFRE automatizado, integración MAPFRE, bot seguros MAPFRE',
};

export default function MAPFREPage() {
  return (
    <IntegrationPageTemplate
      companyName="MAPFRE"
      companyType="Aseguradora"
      overview="MAPFRE es una de las aseguradoras más grandes de Latinoamérica y el mundo. Con kotkot, accedes a todo su catálogo de productos y automatizas el proceso completo de venta."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cobertura completa, terceros, y planes personalizados',
            'Seguros de hogar: protección para tu propiedad y contenido',
            'Seguros de salud: planes individuales, familiares y empresariales',
            'Seguros de vida: protección financiera para tu familia',
            'Seguros para empresas: responsabilidad civil, daños y más',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'Cotización instantánea: precios actualizados en tiempo real desde la API de MAPFRE',
            'Comparador de planes: tu bot compara automáticamente coberturas y precios',
            'Emisión automática: pólizas emitidas al instante tras confirmar el pago',
            'Gestión de siniestros: tu bot ayuda a tus clientes a reportar incidentes',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tu cuenta de corredor MAPFRE',
          description:
            'Vincula tus credenciales API de MAPFRE con kotkot. Todo el proceso es seguro y cumple con estándares de protección de datos.',
        },
        {
          number: '2',
          title: 'Personaliza tu catálogo',
          description:
            'Elige qué productos MAPFRE ofrecer, configura descuentos especiales y define reglas de cotización personalizadas.',
        },
        {
          number: '3',
          title: 'Vende 24/7 en piloto automático',
          description:
            'Tu bot atiende clientes, cotiza seguros MAPFRE, emite pólizas y cobra pagos sin que tengas que estar presente.',
        },
      ]}
    />
  );
}
