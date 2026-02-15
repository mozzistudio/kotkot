import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración BAC — Ofrece Préstamos BAC con kotkot',
  description: 'Conecta BAC Credomatic a tu bot. Préstamos personales, hipotecarios y de auto.',
};

export default function BACPage() {
  return (
    <IntegrationPageTemplate
      companyName="BAC"
      companyType="Banco"
      overview="BAC Credomatic es uno de los grupos bancarios más grandes de Centroamérica. La integración con kotkot te permite ofrecer préstamos personales, hipotecarios y de auto con pre-calificación automática."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Préstamo Personal: cotización instantánea con cálculo de cuotas mensuales',
            'Préstamo Hipotecario: simulador de créditos para compra de vivienda',
            'Préstamo de Auto: financiamiento para vehículos nuevos y usados',
            'Consolidación de Deudas: unificación de créditos con mejor tasa',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Pre-calificación automática: evalúa elegibilidad del cliente en segundos',
            'Comparador de tasas: compara diferentes opciones de préstamos',
            'Seguimiento de aplicación: rastrea el estado de cada solicitud',
            'Cálculo de cuotas: simulador en tiempo real con amortización',
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
            'Cotización en tiempo real directo desde BAC a WhatsApp',
        },
      ]}
    />
  );
}
