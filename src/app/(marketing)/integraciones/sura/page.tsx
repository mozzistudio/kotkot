import type { Metadata } from 'next';
import { IntegrationPageTemplate } from '@/components/marketing/shared/IntegrationPageTemplate';

export const metadata: Metadata = {
  title: 'Integración Seguros SURA — kotkot.ai',
  description: 'Integración directa con SURA. Vende seguros de vida, salud, auto y más en automático desde WhatsApp.',
  keywords: 'vender seguros SURA automatizado, integración SURA, bot seguros SURA',
};

export default function SURAPage() {
  return (
    <IntegrationPageTemplate
      companyName="Seguros SURA"
      companyType="Aseguradora"
      overview="SURA es líder en seguros en América Latina. Con kotkot, conectas directamente con el catálogo completo de SURA y automatizas todo el proceso de ventas desde WhatsApp."
      features={[
        {
          title: 'Productos disponibles',
          items: [
            'Seguros de auto: cobertura amplia, robo, daños a terceros y asistencia vial',
            'Seguros de salud: planes médicos individuales, familiares y corporativos',
            'Seguros de vida: protección financiera con coberturas flexibles',
            'Seguros de accidentes personales: protección 24/7 para tus clientes',
          ],
        },
        {
          title: 'Capacidades de integración',
          items: [
            'API en tiempo real: cotizaciones actualizadas al segundo',
            'Emisión digital: pólizas emitidas y enviadas por correo automáticamente',
            'Renovaciones inteligentes: tu bot detecta pólizas próximas a vencer y ofrece renovación',
            'Cross-sell automático: tu bot sugiere productos complementarios de SURA',
          ],
        },
      ]}
      steps={[
        {
          number: '1',
          title: 'Vincula tu cuenta de corredor SURA',
          description:
            'Conecta tus credenciales de corredor SURA con kotkot. La integración toma menos de 5 minutos.',
        },
        {
          number: '2',
          title: 'Configura productos y comisiones',
          description:
            'Selecciona qué seguros de SURA quieres ofrecer, ajusta tus márgenes y personaliza la experiencia de venta.',
        },
        {
          number: '3',
          title: 'Deja que tu bot haga el trabajo',
          description:
            'Tu bot cotiza, emite pólizas de SURA y cobra pagos automáticamente. Tú solo recibes notificaciones de ventas cerradas.',
        },
      ]}
    />
  );
}
