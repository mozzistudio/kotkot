"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  hover = true,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`${hover ? "glass-card" : "glass-container"} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
