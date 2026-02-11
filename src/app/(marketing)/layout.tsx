import { GradientBackground } from '@/components/ui/GradientBackground';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <GradientBackground>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </GradientBackground>
  );
}
