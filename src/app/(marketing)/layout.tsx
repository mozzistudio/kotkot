import { GradientBackground } from '@/components/ui/GradientBackground';
import { SEONavbar } from '@/components/seo/layout/SEONavbar';
import { Footer } from '@/components/marketing/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <GradientBackground>
      <SEONavbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </GradientBackground>
  );
}
