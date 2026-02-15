'use client';

import { Package, DollarSign, Zap } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/marketing/shared/SolutionPageTemplate';

const beforeAfter = {
  before: [
    'Vendes seguros pero no ofreces préstamos (o viceversa)',
    'Dejas dinero en la mesa con cada cliente',
    'No tienes integración entre productos',
    'Pierdes oportunidades de venta cruzada',
  ],
  after: [
    'Bot ofrece seguros Y préstamos en la misma conversación',
    'Doblas comisión por cliente sin esfuerzo extra',
    'Un solo bot maneja ambos verticales',
    'Maximizas cada interacción con el cliente',
  ],
};

const stats = [
  {
    icon: DollarSign,
    value: '2x',
    label: 'Comisión por cliente',
  },
  {
    icon: Package,
    value: '1',
    label: 'Plataforma',
  },
  {
    icon: Zap,
    value: '0',
    label: 'Trabajo adicional',
  },
];

export function SolucionMultiProducto() {
  return (
    <SolutionPageTemplate
      breadcrumbLabel="Multi-Producto"
      breadcrumbHref="/soluciones/multi-producto"
      badge="Solución"
      title="Seguros + Préstamos. Un Solo Bot. Doble Comisión."
      subtitle="Activa ambos verticales sin esfuerzo adicional. Dobla tu comisión por cliente con una sola plataforma."
      painPoint="Vendes seguros pero no ofreces préstamos, o viceversa. Dejas dinero en la mesa."
      beforeAfter={beforeAfter}
      stats={stats}
      ctaTitle="Multiplica tus ingresos"
      ctaText="Solicitar demo"
    />
  );
}
