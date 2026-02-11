"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-soft shadow-[0_4px_16px_rgba(230,57,70,0.3)]",
  secondary:
    "bg-primary text-white hover:bg-primary-light shadow-[0_4px_16px_rgba(29,53,87,0.3)]",
  ghost:
    "bg-transparent border-2 border-primary-light text-primary hover:bg-primary hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] font-bold text-[15px] tracking-[0.02em] cursor-pointer transition-colors duration-200";

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
