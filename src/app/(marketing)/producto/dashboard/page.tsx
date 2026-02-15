import type { Metadata } from 'next';
import { DashboardPage } from './DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard & Analytics — kotkot.ai',
  description: 'Visualiza tus ventas, comisiones y rendimiento en tiempo real con reportes detallados y analíticas avanzadas.',
  keywords: 'dashboard analytics, reportes de ventas, métricas en tiempo real, KPIs brokers',
  openGraph: {
    title: 'Dashboard & Analytics — kotkot.ai',
    description: 'Visualiza todas tus métricas en tiempo real y toma decisiones basadas en datos.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main>
      <DashboardPage />
    </main>
  );
}
