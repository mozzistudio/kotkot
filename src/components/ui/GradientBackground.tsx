interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ children, className = '' }: GradientBackgroundProps) {
  return (
    <div className={`gradient-mesh-bg min-h-screen ${className}`}>
      {children}
    </div>
  );
}
