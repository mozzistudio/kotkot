import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Qualitas — Vende Seguros Qualitas con kotkot',
  description: 'Conecta Qualitas a tu bot. Especialistas en seguro de auto.',
};

export default function QualitasPage() {
  return (
    <IntegrationPageTemplate
      companyName="Qualitas"
      companyType="Aseguradora"
      overview="Qualitas es la aseguradora especializada en seguros de auto más grande de México y Latinoamérica. La integración con kotkot te permite vender seguros de auto con cotización instantánea."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cotización especializada con múltiples opciones de cobertura',
            'Cobertura amplia: protección total para tu vehículo',
            'Seguro básico: cobertura de terceros económica',
            'Asistencia vial: grúa y asistencia en carretera incluida',
            'Seguros de flotas: soluciones para empresas con múltiples vehículos',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas Qualitas al instante',
            'Especialización en auto: experiencia optimizada para seguros vehiculares',
            'Múltiples opciones de cobertura: compara diferentes niveles',
            'Emisión inmediata: pólizas digitales al instante',
            'Red de talleres: acceso a red autorizada de reparación',
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
            'Cotización en tiempo real directo desde Qualitas a WhatsApp',
        },
      ]}
    />
  );
}
