'use client';

import { TrendingUp, Zap, Users } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/marketing/shared/SolutionPageTemplate';

const beforeAfter = {
  before: [
    'Para vender más necesitas contratar más gente',
    'Cada contratación suma $15k+ en salarios mensuales',
    'No puedes escalar rentablemente',
    'Estás limitado por tu capacidad de gestión',
  ],
  after: [
    'Un bot maneja 500 conversaciones simultáneas',
    'Crece sin sumar salarios a la nómina',
    'Escala 10x tu capacidad sin costos lineales',
    'El único límite es tu mercado',
  ],
};

const stats = [
  {
    icon: TrendingUp,
    value: '10x',
    label: 'Capacidad de conversaciones',
  },
  {
    icon: Zap,
    value: '$0',
    label: 'Costo de escalar',
  },
  {
    icon: Users,
    value: 'Ilimitada',
    label: 'Escala simultánea',
  },
];

export function SolucionEscalarSinEquipo() {
  return (
    <SolutionPageTemplate
      breadcrumbLabel="Escalar sin Equipo"
      breadcrumbHref="/soluciones/escalar-sin-equipo"
      badge="Solución"
      title="De 50 a 500 Clientes sin Contratar a Nadie"
      subtitle="Un bot que maneja 500 conversaciones simultáneas. 10x capacidad. $0 en costos de personal."
      painPoint="Para vender más necesitas más gente, y más gente cuesta. No puedes escalar rentablemente."
      beforeAfter={beforeAfter}
      stats={stats}
      ctaTitle="Escala sin equipo"
      ctaText="Solicitar demo"
    />
  );
}
