/**
 * Para Brokers Page
 * Information page for insurance brokers and agents
 */

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Users, TrendingUp, Smartphone, Award, BarChart3, Phone } from 'lucide-react';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateWebPageSchema } from '@/lib/seo/schema';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Para Brokers - Plataforma para Agentes de Seguros | kotkot.ai',
  description:
    'Únete a kotkot.ai como broker de seguros. Accede a múltiples aseguradoras, herramientas digitales, y genera más ventas con nuestra plataforma de comparación.',
  keywords: [
    'brokers seguros panama',
    'agentes seguros',
    'plataforma brokers',
    'herramientas broker seguros',
    'vender seguros online',
  ],
  canonical: 'https://kotkot.ai/para-brokers',
});

const benefits = [
  {
    icon: Users,
    title: 'Acceso a Múltiples Aseguradoras',
    description:
      'Compara y cotiza productos de más de 10 aseguradoras desde una sola plataforma.',
  },
  {
    icon: Smartphone,
    title: 'Herramientas Digitales',
    description:
      'Aplicación móvil, cotizador instantáneo, y gestión de clientes en un solo lugar.',
  },
  {
    icon: TrendingUp,
    title: 'Aumenta tus Ventas',
    description:
      'Recibe leads cualificados de clientes buscando seguros activamente en nuestra plataforma.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de Análisis',
    description:
      'Visualiza tus ventas, comisiones, y rendimiento en tiempo real con reportes detallados.',
  },
  {
    icon: Award,
    title: 'Soporte y Capacitación',
    description:
      'Accede a capacitaciones gratuitas sobre productos y técnicas de venta digital.',
  },
  {
    icon: Shield,
    title: 'Comisiones Competitivas',
    description:
      'Mantén tus comisiones actuales y gana bonos por volumen de ventas mensuales.',
  },
];

const features = [
  {
    title: 'Cotizador Multi-Aseguradora',
    description:
      'Genera cotizaciones de múltiples aseguradoras en segundos para cualquier tipo de seguro.',
    list: [
      'Comparación lado a lado',
      'Personalización de coberturas',
      'Envío automático de cotizaciones',
      'Seguimiento de propuestas',
    ],
  },
  {
    title: 'Gestión de Clientes (CRM)',
    description:
      'Administra tu cartera de clientes, renovaciones, y comunicaciones desde un solo lugar.',
    list: [
      'Base de datos de clientes',
      'Recordatorios de renovación',
      'Historial de pólizas',
      'Comunicación automatizada',
    ],
  },
  {
    title: 'Portal de Comisiones',
    description:
      'Visualiza tus comisiones en tiempo real y accede a reportes detallados de tus ventas.',
    list: [
      'Dashboard de comisiones',
      'Reportes mensuales',
      'Proyección de ingresos',
      'Exportación de datos',
    ],
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Regístrate',
    description: 'Completa el formulario de registro con tu información de broker y credenciales.',
  },
  {
    step: 2,
    title: 'Verificación',
    description: 'Nuestro equipo verifica tu licencia de broker (1-2 días hábiles).',
  },
  {
    step: 3,
    title: 'Capacitación',
    description: 'Accede a capacitación gratuita sobre el uso de la plataforma (2 horas).',
  },
  {
    step: 4,
    title: 'Comienza a Vender',
    description: 'Empieza a cotizar, vender, y gestionar tus clientes desde kotkot.ai.',
  },
];

export default function ParaBrokersPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Para Brokers', url: '/para-brokers' },
  ];

  const schemaData = generateWebPageSchema(
    'Para Brokers - Plataforma para Agentes de Seguros',
    'Únete a kotkot.ai como broker de seguros. Accede a múltiples aseguradoras y herramientas digitales.',
    'https://kotkot.ai/para-brokers',
    breadcrumbItems
  );

  return (
    <>
      <SchemaMarkup schema={schemaData} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(202,255,4,0.15)] px-4 py-2 text-sm font-semibold text-[#111827]">
            <Shield className="h-4 w-4" />
            Plataforma para Brokers
          </div>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Vende Más Seguros con
            <span className="block text-[#111827] font-bold">
              Herramientas Digitales
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 md:text-xl">
            Únete a kotkot.ai y accede a múltiples aseguradoras, cotizador instantáneo,
            CRM integrado, y leads cualificados. Todo lo que necesitas para crecer tu negocio.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/50760000000?text=Hola%2C%20quiero%20registrarme%20como%20broker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#CAFF04] px-6 py-3 text-lg font-semibold text-[#111827] hover:bg-[#b8e600] transition-colors"
            >
              <Phone className="h-5 w-5" />
              Contáctanos por WhatsApp
            </a>
            <Link
              href="/seguros"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[rgba(202,255,4,0.40)] bg-[#CAFF04] px-6 py-3 text-lg font-semibold text-[#111827] hover:bg-[#b8e600] transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Beneficios para Brokers
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[rgba(202,255,4,0.15)] p-3">
                  <benefit.icon className="h-6 w-6 text-[#111827]" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Características de la Plataforma
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <GlassCard key={feature.title} className="p-6">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mb-4 text-gray-600">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 text-[#059669]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            ¿Cómo Empezar?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <GlassCard key={step.step} className="p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#CAFF04] text-xl font-bold text-[#111827]">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Aseguradoras Disponibles */}
        <div className="mb-16">
          <GlassCard className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Aseguradoras Disponibles
            </h2>
            <p className="mb-6 text-gray-600">
              Accede a productos de las principales aseguradoras de Panamá
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['ASSA', 'MAPFRE', 'Sura', 'Bupa', 'Acerta', 'Fedpa', 'Atlas', 'Generali', 'Banistmo Seguros', 'Vivir Seguros'].map(
                (company) => (
                  <div
                    key={company}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
          </GlassCard>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                ¿Cuánto cuesta usar la plataforma?
              </h3>
              <p className="text-gray-600">
                La plataforma es completamente gratuita para brokers registrados. No hay
                costos de suscripción ni tarifas mensuales.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                ¿Cómo funcionan las comisiones?
              </h3>
              <p className="text-gray-600">
                Mantienes tus comisiones actuales con cada aseguradora. Además, ofrecemos
                bonos adicionales por volumen de ventas mensuales.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                ¿Necesito licencia de broker?
              </h3>
              <p className="text-gray-600">
                Sí, debes tener una licencia de broker vigente emitida por la
                Superintendencia de Seguros de Panamá.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                ¿Cuánto tiempo toma la activación?
              </h3>
              <p className="text-gray-600">
                El proceso de verificación toma 1-2 días hábiles. Después de la
                capacitación, puedes comenzar a usar la plataforma inmediatamente.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* CTA Section */}
        <GlassCard className="p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            ¿Listo para Crecer tu Negocio?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
            Únete a kotkot.ai hoy y comienza a vender más seguros con herramientas
            digitales de última generación.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20registrarme%20como%20broker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#CAFF04] px-8 py-4 text-lg font-semibold text-[#111827] hover:bg-[#b8e600] transition-colors"
          >
            <Phone className="h-5 w-5" />
            Contáctanos por WhatsApp
          </a>
        </GlassCard>
      </div>
    </>
  );
}
