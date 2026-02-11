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
      whileHover={hover ? { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
