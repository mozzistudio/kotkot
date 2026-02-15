import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Allianz — Vende Seguros Allianz con kotkot',
  description: 'Conecta Allianz a tu bot. Seguros globales con presencia en LATAM.',
};

export default function AllianzPage() {
  return (
    <IntegrationPageTemplate
      companyName="Allianz"
      companyType="Aseguradora"
      overview="Allianz es una de las aseguradoras más grandes del mundo con amplia presencia en Latinoamérica. La integración con kotkot te permite vender seguros globales con cotización en tiempo real."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización instantánea con cobertura completa e internacional',
            'Seguros de vida: pólizas con opciones de cobertura global',
            'Seguros de hogar: protección residencial y de contenido',
            'Seguros de viaje: cobertura internacional con asistencia 24/7',
            'Seguros empresariales: soluciones corporativas y de responsabilidad civil',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas Allianz al instante',
            'Cobertura internacional: ofrece seguros con alcance global',
            'Multi-moneda: cotización en diferentes divisas',
            'Emisión digital: emite pólizas directamente desde WhatsApp',
            'Soporte 24/7: asistencia al cliente en múltiples países',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Conecta tus credenciales',
          description:
            'Ingresa tu API key o credenciales en el dashboard de kotkot',
        },
        {
          number: '2',
          title: 'Configura tus productos',
          description:
            'Selecciona qué productos quieres que tu bot ofrezca',
        },
        {
          number: '3',
          title: 'Tu bot empieza a vender',
          description:
            'Cotización en tiempo real directo desde Allianz a WhatsApp',
        },
      ]}
    />
  );
}
