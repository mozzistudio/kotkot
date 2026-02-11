import { Hero } from '@/components/marketing/Hero';
import { Stats } from '@/components/marketing/Stats';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { InsurersLogos } from '@/components/marketing/InsurersLogos';
import { Pricing } from '@/components/marketing/Pricing';
import { Testimonials } from '@/components/marketing/Testimonials';
import { CTASection } from '@/components/marketing/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <InsurersLogos />
      <Pricing />
      <Testimonials />
      <CTASection />
    </>
  );
}
