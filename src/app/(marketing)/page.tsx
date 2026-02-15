import { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { InsurersLogos } from '@/components/marketing/InsurersLogos';
import { ProblemSolution } from '@/components/marketing/ProblemSolution';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Testimonials } from '@/components/marketing/Testimonials';
import { Pricing } from '@/components/marketing/Pricing';
import { PartnersTeaser } from '@/components/marketing/PartnersTeaser';
import { CTASection } from '@/components/marketing/CTASection';

export const metadata: Metadata = {
  title: 'kotkot.ai — Automatiza la Venta de Seguros y Préstamos con IA',
  description:
    'Bot de WhatsApp con IA para corredores de seguros y préstamos. Cotiza, compara y cierra ventas 24/7. 25+ aseguradoras y bancos en Latinoamérica.',
  openGraph: {
    title: 'kotkot.ai — Automatiza la Venta de Seguros y Préstamos con IA',
    description:
      'Bot de WhatsApp con IA para corredores de seguros y préstamos. Cotiza, compara y cierra ventas 24/7. 25+ aseguradoras y bancos en Latinoamérica.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <InsurersLogos />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PartnersTeaser />
      <Pricing />
      <CTASection />
    </>
  );
}
