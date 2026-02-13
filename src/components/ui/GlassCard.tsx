'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, borderColor: 'rgba(202, 255, 4, 0.40)' } : undefined}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`bg-white border border-[#e5e7eb] rounded-[16px] p-6 transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}
