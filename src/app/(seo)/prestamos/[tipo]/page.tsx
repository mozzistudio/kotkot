/**
 * Loan Product Page
 * Generates individual pages for each loan type
 * Example URLs: /prestamos/personal, /prestamos/hipotecario, /prestamos/auto, etc.
 */

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, ArrowRight } from 'lucide-react';
import { generateLoanProductMetadata } from '@/lib/seo/metadata';
import { generateWebPageSchema, generateFAQSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface LoanProductData {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  rate: { min: string; max: string };
  amount: { min: string; max: string };
  term: { min: string; max: string };
  benefits: string[];
  requirements: string[];
  idealFor: string[];
  faqs: { question: string; answer: string }[];
  relatedTypes: string[];
}

const loanProductsData: Record<string, LoanProductData> = {
  personal: {
    slug: 'personal',
    name: 'Préstamo Personal',
    icon: '💳',
    shortDescription: 'Financiamiento flexible para tus proyectos personales.',
    longDescription: 'El préstamo personal es la opción más versátil para financiar tus proyectos. Desde consolidar deudas hasta cubrir emergencias médicas, remodelar tu hogar o financiar un viaje especial. Los bancos en Panamá ofrecen tasas competitivas y plazos flexibles.',
    rate: { min: '7.5%', max: '18%' },
    amount: { min: '$1,000', max: '$50,000' },
    term: { min: '12 meses', max: '84 meses' },
    benefits: [
      'Sin garantía requerida en la mayoría de los casos',
      'Aprobación rápida, en algunos bancos en 24 horas',
      'Uso libre del dinero para lo que necesites',
      'Tasas fijas durante todo el plazo',
      'Posibilidad de pago anticipado sin penalidad',
      'Desembolso directo a tu cuenta bancaria',
    ],
    requirements: [
      'Ser mayor de 18 años',
      'Cédula de identidad panameña o residencia',
      'Comprobante de ingresos (últimos 3 meses)',
      'Referencias bancarias o comerciales',
      'Historial crediticio favorable',
      'Antigüedad laboral mínima de 6 meses',
    ],
    idealFor: [
      'Consolidación de deudas',
      'Emergencias médicas',
      'Remodelación del hogar',
      'Viajes y vacaciones',
      'Gastos educativos',
      'Eventos especiales',
    ],
    faqs: [
      { question: '¿Cuánto puedo solicitar en un préstamo personal?', answer: 'Los montos varían según el banco y tu capacidad de pago. Generalmente van desde $1,000 hasta $50,000. Algunos bancos pueden ofrecer montos mayores con garantía adicional.' },
      { question: '¿Qué tasa de interés puedo esperar?', answer: 'Las tasas de interés para préstamos personales en Panamá oscilan entre 7.5% y 18% anual, dependiendo del banco, tu historial crediticio y el monto solicitado.' },
      { question: '¿Cuánto tarda la aprobación?', answer: 'La mayoría de los bancos en Panamá aprueban préstamos personales en 24 a 72 horas hábiles. Algunos bancos digitales ofrecen pre-aprobación instantánea.' },
      { question: '¿Puedo pagar anticipadamente sin penalidad?', answer: 'La mayoría de los bancos en Panamá permiten pagos anticipados sin penalidad. Sin embargo, es importante verificar las condiciones específicas de tu contrato.' },
    ],
    relatedTypes: ['hipotecario', 'auto', 'empresarial'],
  },
  hipotecario: {
    slug: 'hipotecario',
    name: 'Préstamo Hipotecario',
    icon: '🏡',
    shortDescription: 'Haz realidad el sueño de tu casa propia.',
    longDescription: 'El préstamo hipotecario te permite adquirir tu vivienda principal, segunda residencia o propiedad de inversión. Panamá ofrece una de las legislaciones más favorables de la región con la Ley de Intereses Preferenciales que otorga tasas reducidas.',
    rate: { min: '4.75%', max: '7.5%' },
    amount: { min: '$30,000', max: '$500,000' },
    term: { min: '5 años', max: '30 años' },
    benefits: [
      'Tasas preferenciales con la Ley de Intereses Preferenciales',
      'Plazos de hasta 30 años',
      'Financiamiento de hasta el 90% del valor de la propiedad',
      'Beneficios fiscales por pago de intereses hipotecarios',
      'Seguro de vida incluido en muchos planes',
      'Posibilidad de refinanciamiento',
    ],
    requirements: [
      'Ser mayor de 18 años',
      'Cédula panameña o residencia permanente',
      'Comprobante de ingresos estables',
      'Historial crediticio favorable',
      'Abono inicial (10% a 30% del valor)',
      'Avalúo de la propiedad',
      'Título de propiedad inscrito en Registro Público',
    ],
    idealFor: [
      'Compra de vivienda principal',
      'Segunda residencia o playa',
      'Propiedad de inversión',
      'Construcción en terreno propio',
      'Refinanciamiento de hipoteca existente',
    ],
    faqs: [
      { question: '¿Qué es la Ley de Intereses Preferenciales?', answer: 'Es una ley panameña que otorga tasas de interés reducidas para préstamos hipotecarios de vivienda principal con valor hasta $120,000. El subsidio puede reducir la tasa hasta en 4 puntos porcentuales durante los primeros años.' },
      { question: '¿Cuánto necesito de abono inicial?', answer: 'Generalmente se requiere entre el 10% y 30% del valor de la propiedad. Para viviendas de interés social, el abono puede ser menor. Algunos bancos ofrecen opciones de financiamiento del 90%.' },
      { question: '¿Puedo usar mi préstamo para construir?', answer: 'Sí, muchos bancos en Panamá ofrecen préstamos de construcción que luego se convierten en hipotecarios una vez finalizada la obra.' },
    ],
    relatedTypes: ['personal', 'auto'],
  },
  auto: {
    slug: 'auto',
    name: 'Préstamo de Auto',
    icon: '🚙',
    shortDescription: 'Financia tu vehículo nuevo o usado.',
    longDescription: 'El préstamo de auto te permite adquirir un vehículo nuevo o usado con tasas competitivas. Los bancos en Panamá ofrecen financiamiento de hasta el 85% del valor del vehículo con plazos flexibles y seguro vehicular incluido.',
    rate: { min: '5.5%', max: '12%' },
    amount: { min: '$5,000', max: '$100,000' },
    term: { min: '12 meses', max: '84 meses' },
    benefits: [
      'Tasas competitivas para vehículos nuevos y usados',
      'Financiamiento de hasta el 85% del valor',
      'Seguro vehicular incluido en muchos planes',
      'Plazos flexibles de hasta 7 años',
      'Aprobación rápida en 24-48 horas',
      'Opciones para vehículos nuevos, usados y comerciales',
    ],
    requirements: [
      'Ser mayor de 18 años',
      'Cédula o residencia panameña',
      'Comprobante de ingresos',
      'Abono inicial (15% a 30%)',
      'Licencia de conducir vigente',
      'Seguro vehicular obligatorio',
    ],
    idealFor: [
      'Vehículo nuevo de agencia',
      'Vehículo usado certificado',
      'Vehículo comercial o de trabajo',
      'Refinanciamiento de auto existente',
    ],
    faqs: [
      { question: '¿Qué porcentaje del auto financian?', answer: 'La mayoría de los bancos financian entre el 70% y 85% del valor del vehículo. Para autos nuevos, el financiamiento suele ser mayor que para usados.' },
      { question: '¿Puedo financiar un auto usado?', answer: 'Sí, la mayoría de los bancos financian vehículos usados con un máximo de 5 a 7 años de antigüedad. Las tasas pueden ser ligeramente más altas que para vehículos nuevos.' },
      { question: '¿El seguro está incluido?', answer: 'Muchos bancos incluyen el seguro vehicular en la cuota mensual como parte del financiamiento. Es obligatorio tener seguro mientras dure el préstamo.' },
    ],
    relatedTypes: ['personal', 'empresarial'],
  },
  empresarial: {
    slug: 'empresarial',
    name: 'Préstamo Empresarial',
    icon: '💼',
    shortDescription: 'Capital para hacer crecer tu negocio.',
    longDescription: 'El préstamo empresarial te brinda el capital necesario para expandir tu negocio, adquirir equipos, capital de trabajo o financiar proyectos comerciales. Los bancos en Panamá ofrecen líneas de crédito y préstamos estructurados para empresas de todos los tamaños.',
    rate: { min: '8.0%', max: '16%' },
    amount: { min: '$10,000', max: '$500,000' },
    term: { min: '12 meses', max: '120 meses' },
    benefits: [
      'Capital de trabajo y líneas de crédito rotativas',
      'Financiamiento para equipos y maquinaria',
      'Préstamos para expansión y remodelación',
      'Tasas preferenciales para PYMES',
      'Asesoría financiera empresarial',
      'Opciones con garantía o sin garantía',
    ],
    requirements: [
      'Empresa legalmente constituida en Panamá',
      'Mínimo 2 años de operación',
      'Estados financieros auditados',
      'Declaraciones de renta',
      'Plan de negocios (para montos grandes)',
      'Garantía real o fiduciaria según el monto',
    ],
    idealFor: [
      'Capital de trabajo',
      'Compra de equipos y maquinaria',
      'Expansión del negocio',
      'Remodelación de local comercial',
      'Importación de mercancía',
      'Proyectos de inversión',
    ],
    faqs: [
      { question: '¿Mi empresa es muy nueva, puedo solicitar?', answer: 'La mayoría de los bancos requieren al menos 2 años de operación. Sin embargo, existen programas especiales para emprendedores y startups a través de entidades como AMPYME.' },
      { question: '¿Qué garantía necesito?', answer: 'Depende del monto. Para montos menores a $25,000, algunos bancos ofrecen préstamos sin garantía real. Para montos mayores, se puede requerir hipoteca, prenda o fianza solidaria.' },
      { question: '¿Cuánto tarda la aprobación?', answer: 'Los préstamos empresariales generalmente tardan entre 5 y 15 días hábiles en aprobarse, dependiendo del monto y la complejidad de la solicitud.' },
    ],
    relatedTypes: ['personal', 'auto'],
  },
};

const allLoanSlugs = Object.keys(loanProductsData);

export async function generateStaticParams() {
  return allLoanSlugs.map((slug) => ({ tipo: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string }>;
}): Promise<Metadata> {
  const { tipo } = await params;
  const product = loanProductsData[tipo];

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El tipo de préstamo que buscas no existe.',
    };
  }

  return generateLoanProductMetadata(
    product.name,
    product.slug,
    product.shortDescription
  );
}

export default async function LoanProductPage({
  params,
}: {
  params: Promise<{ tipo: string }>;
}) {
  const { tipo } = await params;
  const product = loanProductsData[tipo];

  if (!product) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        schema={[
          generateFAQSchema(product.faqs),
          generateWebPageSchema(
            `${product.name} en Panamá`,
            product.shortDescription,
            `https://kotkot.ai/prestamos/${product.slug}`,
            [
              { name: 'Préstamos', url: 'https://kotkot.ai/prestamos' },
              {
                name: product.name,
                url: `https://kotkot.ai/prestamos/${product.slug}`,
              },
            ]
          ),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Préstamos', url: 'https://kotkot.ai/prestamos' },
            {
              name: product.name,
              url: `https://kotkot.ai/prestamos/${product.slug}`,
            },
          ]}
          className="mb-8"
        />

        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-5xl mb-4">{product.icon}</div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            {product.name} en Panamá
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-[#6b7280]">
            {product.longDescription}
          </p>

          {/* Key Terms */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <GlassCard className="p-6 text-center">
              <p className="text-sm text-[#9ca3af] mb-1">Tasa de interés</p>
              <p className="text-2xl font-bold text-[#111827]">{product.rate.min}</p>
              <p className="text-sm text-[#6b7280]">hasta {product.rate.max}</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <p className="text-sm text-[#9ca3af] mb-1">Monto</p>
              <p className="text-2xl font-bold text-[#111827]">{product.amount.min}</p>
              <p className="text-sm text-[#6b7280]">hasta {product.amount.max}</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <p className="text-sm text-[#9ca3af] mb-1">Plazo</p>
              <p className="text-2xl font-bold text-[#111827]">{product.term.min}</p>
              <p className="text-sm text-[#6b7280]">hasta {product.term.max}</p>
            </GlassCard>
          </div>

          <a
            href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20comparar%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[#CAFF04] px-8 py-4 text-lg font-semibold text-[#111827] hover:bg-[#b8e600] transition-colors border border-[rgba(202,255,4,0.40)]"
          >
            Comparar Opciones por WhatsApp
          </a>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">Beneficios</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 rounded-[12px] border border-[#e5e7eb] bg-white p-4">
                <Check className="h-5 w-5 flex-shrink-0 text-[#059669] mt-0.5" />
                <span className="text-[#111827]">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ideal For */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">Ideal para</h2>
          <div className="flex flex-wrap gap-3">
            {product.idealFor.map((use, index) => (
              <Badge key={index} color="lime">
                {use}
              </Badge>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">Requisitos</h2>
          <GlassCard className="p-8">
            <ul className="space-y-3">
              {product.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Badge color="gray" className="mt-0.5 flex-shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="text-[#6b7280]">{req}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {product.faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="mb-3 text-lg font-bold text-[#111827]">
                  {faq.question}
                </h3>
                <p className="text-[#6b7280]">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">
            También te puede interesar
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {product.relatedTypes.map((relatedSlug) => {
              const related = loanProductsData[relatedSlug];
              if (!related) return null;
              return (
                <Link key={relatedSlug} href={`/prestamos/${relatedSlug}`} className="group">
                  <GlassCard className="p-6 transition-all hover:scale-[1.02]">
                    <div className="mb-3 text-3xl">{related.icon}</div>
                    <h3 className="mb-2 text-lg font-bold text-[#111827] group-hover:text-[#059669]">
                      {related.name}
                    </h3>
                    <p className="text-sm text-[#6b7280]">{related.shortDescription}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#059669]">
                      Ver más <ArrowRight className="h-4 w-4" />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl">
          <GlassCard className="bg-[#CAFF04] p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#111827]">
              ¿Listo para solicitar tu {product.name.toLowerCase()}?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
              Compara tasas y condiciones de los principales bancos de Panamá
              en minutos por WhatsApp.
            </p>
            <a
              href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20solicitar%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#111827] px-8 py-4 text-lg font-semibold text-white hover:bg-[#1f2937] transition-colors"
            >
              Solicitar Ahora por WhatsApp
            </a>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
