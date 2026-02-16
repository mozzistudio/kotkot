'use client';

import { Users, Database, Bell } from '@/components/shared/icon-map';
import { SolutionPageTemplate } from '@/components/marketing/shared/SolutionPageTemplate';

const beforeAfter = {
  before: [
    'Tienes clientes en WhatsApp, Excel, Gmail y post-its',
    'No sabes quién renovó ni quién no',
    'Pierdes oportunidades de venta cruzada',
    'Gastas horas buscando información de clientes',
  ],
  after: [
    'CRM que se llena sólo con cada conversación',
    'Histórico completo de cada cliente automático',
    'Alertas de renovación 30 días antes',
    'Oportunidades identificadas automáticamente',
  ],
};

const stats = [
  {
    icon: Database,
    value: '0',
    label: 'Entradas manuales (todo auto)',
  },
  {
    icon: Users,
    value: '100%',
    label: 'Clientes rastreados',
  },
  {
    icon: Bell,
    value: '30d',
    label: 'Alertas antes de renovación',
  },
];

export function SolucionGestionarClientes() {
  return (
    <SolutionPageTemplate
      breadcrumbLabel="Gestionar Clientes"
      breadcrumbHref="/soluciones/gestionar-clientes"
      badge="Solución"
      title="Cada Conversación es un Cliente. Cada Cliente, un Archivo Completo."
      subtitle="CRM que se llena solo con cada conversación. 0 entrada manual. 100% información."
      painPoint="Tienes clientes en WhatsApp, Excel, y post-its. No sabes quién necesita renovación ni a quién vender más."
      beforeAfter={beforeAfter}
      stats={stats}
      ctaTitle="Organiza tu cartera"
      ctaText="Solicitar demo"
    />
  );
}
