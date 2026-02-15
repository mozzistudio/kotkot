'use client';

import { CreditCard, Link2, CheckCircle } from 'lucide-react';
import { SolutionPageTemplate } from '@/components/marketing/shared/SolutionPageTemplate';

const beforeAfter = {
  before: [
    'Llamas 3 veces para cobrar una prima de $200',
    'El cliente se molesta por las llamadas insistentes',
    'Pierdes tiempo persiguiendo pagos',
    'Algunos clientes nunca pagan',
  ],
  after: [
    'Link de pago enviado automáticamente después de cada venta',
    'Cliente paga al instante sin necesidad de llamadas',
    'Cobras 95% de los pagos en plazo',
    'El cliente está satisfecho (no lo persigues)',
  ],
};

const stats = [
  {
    icon: Link2,
    value: '0',
    label: 'Llamadas de seguimiento',
  },
  {
    icon: CreditCard,
    value: 'Al instante',
    label: 'Links de pago generados',
  },
  {
    icon: CheckCircle,
    value: '95%',
    label: 'Pagos a tiempo',
  },
];

export function SolucionCobroAutomatico() {
  return (
    <SolutionPageTemplate
      breadcrumbLabel="Cobro Automático"
      breadcrumbHref="/soluciones/cobro-automatico"
      badge="Solución"
      title="Cobra sin Perseguir a Nadie"
      subtitle="Link de pago automático después de cada venta. 95% de pagos a tiempo. Cero llamadas de seguimiento."
      painPoint="Llamas 3 veces para cobrar una prima de $200. Pierdes tiempo y el cliente se molesta."
      beforeAfter={beforeAfter}
      stats={stats}
      ctaTitle="Automatiza tu cobranza"
      ctaText="Solicitar demo"
    />
  );
}
