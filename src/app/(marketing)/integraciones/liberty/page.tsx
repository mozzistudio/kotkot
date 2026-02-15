import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Liberty — Vende Seguros Liberty con kotkot',
  description: 'Conecta Liberty a tu bot. Seguros de auto y hogar.',
};

export default function LibertyPage() {
  return (
    <IntegrationPageTemplate
      companyName="Liberty"
      companyType="Aseguradora"
      overview="Liberty es una aseguradora especializada en seguros de auto y hogar. La integración con kotkot te permite vender estos seguros con cotización automática y emisión digital."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización instantánea con cobertura completa y terceros',
            'Seguros de hogar: protección completa para propiedad y contenido',
            'Seguros de motocicleta: cobertura especializada para motos',
            'Asistencia vial: servicios de grúa y asistencia en carretera',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas Liberty al instante',
            'Cotización de auto simplificada: proceso rápido con pocos datos',
            'Emisión digital: emite pólizas directamente desde WhatsApp',
            'Renovaciones automáticas: gestiona renovaciones de pólizas',
            'Descuentos por paquete: ofrece descuentos al combinar auto y hogar',
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
            'Cotización en tiempo real directo desde Liberty a WhatsApp',
        },
      ]}
    />
  );
}
