import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración ASSA — Vende Seguros ASSA con kotkot',
  description: 'Conecta la API de ASSA Compañía de Seguros a tu bot de WhatsApp. Cotiza auto, salud, vida, hogar y empresarial en tiempo real.',
};

export default function ASSAPage() {
  return (
    <IntegrationPageTemplate
      companyName="ASSA"
      companyType="Aseguradora"
      overview="ASSA Compañía de Seguros es la aseguradora más grande de Panamá con más de 75 años de experiencia. La integración con kotkot te permite cotizar en tiempo real todas sus líneas de productos."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de Auto: cotización instantánea con cobertura completa',
            'Seguros de Salud: planes individuales y familiares',
            'Seguros de Vida: pólizas temporales y permanentes',
            'Seguros de Hogar: protección para propiedad y contenido',
            'Seguros Empresariales: soluciones para negocios',
            'Responsabilidad Civil: cobertura profesional y comercial',
            'Seguros de Accidentes: protección contra accidentes personales',
          ],
        },
        {
          title: 'Qué puedes hacer con esta integración',
          items: [
            'Cotización en tiempo real: tu bot consulta tarifas ASSA al instante',
            'Comparador multi-producto: compara diferentes tipos de seguros automáticamente',
            'Consulta de estado de pólizas: verifica el estado de pólizas existentes',
            'Alertas de renovación: notifica a clientes cuando su póliza está por vencer',
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
            'Cotización en tiempo real directo desde ASSA a WhatsApp',
        },
      ]}
    />
  );
}
