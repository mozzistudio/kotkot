import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración MAPFRE — Vende Seguros MAPFRE con kotkot',
  description: 'Conecta MAPFRE a tu bot. Cotiza seguros generales y de vida automáticamente.',
};

export default function MAPFREPage() {
  return (
    <IntegrationPageTemplate
      companyName="MAPFRE"
      companyType="Aseguradora"
      overview="MAPFRE es una aseguradora global con fuerte presencia en Latinoamérica. La integración con kotkot te permite vender seguros generales y de vida con cotización en tiempo real a través de WhatsApp."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización instantánea con cobertura amplia, terceros y todo riesgo',
            'Seguros de vida: pólizas individuales y familiares con emisión digital',
            'Seguros de hogar: protección completa para propiedad y contenido',
            'Seguros de viaje: cobertura internacional y regional',
            'Seguros empresariales: responsabilidad civil, daños y protección comercial',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas MAPFRE al instante',
            'Comparador de coberturas: compara diferentes opciones de cobertura automáticamente',
            'Emisión digital de pólizas: emite pólizas directamente desde WhatsApp',
            'Opciones de cobertura internacional: ofrece seguros con alcance global',
            'Seguro de flotas: soluciones especiales para múltiples vehículos',
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
            'Cotización en tiempo real directo desde MAPFRE a WhatsApp',
        },
      ]}
    />
  );
}
