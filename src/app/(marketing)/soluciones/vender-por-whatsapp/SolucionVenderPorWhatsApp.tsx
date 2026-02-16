'use client';

import { MessageCircle, Clock, Zap } from '@/components/shared/icon-map';
import { SolutionPageTemplate } from '@/components/marketing/shared/SolutionPageTemplate';

const beforeAfter = {
  before: [
    'Tus clientes te escriben a las 11pm y no les contestas hasta mañana',
    'Se van con la competencia mientras duermes',
    'Pierdes ventas por disponibilidad limitada',
    'No puedes atender más clientes sin contratar',
  ],
  after: [
    'Tu bot responde al instante, 24/7',
    'Cotiza automaticamente según criterios predefinidos',
    'Cierra ventas mientras duermen',
    'Escala sin depender de tu disponibilidad',
  ],
};

const stats = [
  {
    icon: Clock,
    value: '24/7',
    label: 'Disponibilidad automática',
  },
  {
    icon: Zap,
    value: '98%',
    label: 'Satisfacción de clientes',
  },
  {
    icon: MessageCircle,
    value: '3x',
    label: 'Más conversiones',
  },
];

export function SolucionVenderPorWhatsApp() {
  return (
    <SolutionPageTemplate
      breadcrumbLabel="Vender por WhatsApp"
      breadcrumbHref="/soluciones/vender-por-whatsapp"
      badge="Solución"
      title="Convierte WhatsApp en tu Mejor Vendedor"
      subtitle="Tu bot responde al instante, 24/7. Cotiza, cierra y cobra mientras tú duermes."
      painPoint="Tus clientes te escriben a las 11pm y no les contestas hasta mañana. Pierdes ventas por no estar disponible."
      beforeAfter={beforeAfter}
      stats={stats}
      ctaTitle="Activa tu bot vendedor"
      ctaText="Solicitar demo"
    />
  );
}
