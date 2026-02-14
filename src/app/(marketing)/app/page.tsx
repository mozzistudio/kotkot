import type { Metadata } from 'next';
import { AppHero } from '@/components/marketing/AppHero';
import { DashboardScreenshots } from '@/components/marketing/DashboardScreenshots';
import { AppFeatures } from '@/components/marketing/AppFeatures';
import { AppCTA } from '@/components/marketing/AppCTA';

export const metadata: Metadata = {
  title: 'App — kotkot.ai | Tu Centro de Comando Financiero',
  description:
    'Gestiona seguros, préstamos, conversaciones y clientes desde una plataforma moderna. Dashboard en tiempo real, análisis, y automatización.',
};

export default function AppPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <AppHero />
      <DashboardScreenshots />
      <AppFeatures />
      <AppCTA />
    </div>
  );
}
