import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Banco General — Ofrece Préstamos Banco General con kotkot',
  description: 'Conecta Banco General a tu agente IA. El banco más grande de Panamá.',
};

export default function BancoGeneralPage() {
  return (
    <IntegrationPageTemplate
      companyName="Banco General"
      companyType="Banco"
      overview="Banco General es el banco privado más grande de Panamá. La integración con kotkot te permite ofrecer préstamos personales, hipotecarios y empresariales con pre-calificación automática."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Préstamo Personal: cotización rápida con tasas competitivas',
            'Préstamo Hipotecario: simulador para compra de vivienda',
            'Préstamo de Auto: financiamiento de vehículos',
            'Préstamo Empresarial: capital de trabajo para negocios',
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
            'Cotización en tiempo real directo desde Banco General a WhatsApp',
        },
      ]}
    />
  );
}
