import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración SURA — Vende Seguros SURA con kotkot',
  description: 'Integra Seguros SURA a tu agente IA. Cotiza seguros y ARL.',
};

export default function SURAPage() {
  return (
    <IntegrationPageTemplate
      companyName="SURA"
      companyType="Aseguradora"
      overview="SURA es una aseguradora líder en Colombia y toda Latinoamérica. La integración con kotkot te permite vender seguros, ARL y soluciones financieras con cotización automática."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización instantánea con cobertura completa y asistencia vial',
            'Seguros de salud: planes médicos individuales, familiares y empresariales',
            'Seguros de vida: protección financiera con múltiples opciones de cobertura',
            'ARL (Riesgos Laborales): afiliación y cotización de seguros ocupacionales',
            'Seguros empresariales: protección integral para negocios',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas SURA al instante',
            'Integración ARL: afiliación y gestión de riesgos laborales',
            'Evaluación de riesgos: análisis automático de perfil del cliente',
            'Emisión digital: emite pólizas directamente desde la conversación',
            'Multi-producto: vende varios tipos de seguros en una sola interacción',
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
            'Cotización en tiempo real directo desde SURA a WhatsApp',
        },
      ]}
    />
  );
}
