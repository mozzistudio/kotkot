import { GradientBackground } from '@/components/ui/GradientBackground';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GradientBackground className="flex items-center justify-center min-h-screen p-4">
      {children}
    </GradientBackground>
  );
}
