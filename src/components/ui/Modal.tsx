'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalVariant = 'glass' | 'dark';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  variant?: ModalVariant;
  className?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const variantClasses: Record<ModalVariant, string> = {
  glass:
    'backdrop-blur-2xl bg-white/70 border border-white/40 shadow-2xl',
  dark:
    'bg-gray-900 border border-gray-700 shadow-2xl',
};

const titleVariantClasses: Record<ModalVariant, string> = {
  glass: 'text-gray-900',
  dark: 'text-gray-100',
};

const closeButtonVariantClasses: Record<ModalVariant, string> = {
  glass: 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50',
  dark: 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50',
};

export function Modal({
  open,
  onClose,
  children,
  title,
  variant = 'glass',
  className = '',
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative z-10 w-full max-w-lg rounded-2xl p-6 ${variantClasses[variant]} ${className}`}
          >
            {/* Header */}
            {(title != null) && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${titleVariantClasses[variant]}`}>
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className={`rounded-lg p-1.5 transition-colors ${closeButtonVariantClasses[variant]}`}
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Close button when no title */}
            {title == null && (
              <button
                onClick={onClose}
                className={`absolute right-4 top-4 rounded-lg p-1.5 transition-colors ${closeButtonVariantClasses[variant]}`}
                aria-label="Fechar modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Content */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
