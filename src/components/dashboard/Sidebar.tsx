'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  DollarSign,
  Users,
  Bot,
  Plug,
  Smartphone,
  BarChart3,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/app/dashboard' },
  { icon: MessageSquare, label: 'Conversaciones', href: '/app/conversations' },
  { icon: FileText, label: 'Cotizaciones', href: '/app/quotes' },
  { icon: DollarSign, label: 'Ingresos', href: '/app/ingresos' },
  { icon: Users, label: 'Clientes', href: '/app/clients' },
  { icon: Bot, label: 'Mi Agente', href: '/app/bot' },
  { icon: Plug, label: 'Aseguradoras', href: '/app/apis' },
  { icon: Smartphone, label: 'WhatsApp', href: '/app/whatsapp' },
  { icon: BarChart3, label: 'Analytics', href: '/app/analytics' },
  { icon: Settings, label: 'Configuracion', href: '/app/settings' },
] as const;

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--dark-blue)]">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
        <Link href="/app/dashboard" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-button)] bg-[var(--accent)]">
            <svg viewBox="0 0 32 32" fill="none" className="h-[18px] w-[18px]">
              <path d="M9 6v20" stroke="var(--dark-blue)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10-10" stroke="var(--dark-blue)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10 10" stroke="var(--dark-blue)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-heading text-lg font-bold text-white">
            kotkot<span className="font-normal text-white/40">.ai</span>
          </span>
        </Link>

        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-[var(--radius-button)] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Cerrar menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-button)] text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[rgba(202,255,4,0.10)] text-[var(--accent)] font-semibold border-l-[3px] border-l-[var(--accent)]'
                  : 'text-white/65 hover:text-white/90 hover:bg-white/[0.06]'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[var(--accent)]' : 'text-white/50 group-hover:text-white/80'
                }`}
              />
              <span>{item.label}</span>

              {/* Notification badge for Conversaciones */}
              {item.href === '/app/conversations' && (
                <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[var(--accent)] text-[var(--dark-blue)] text-[10px] font-bold">
                  12
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Broker profile */}
      <div className="px-3 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-button)] hover:bg-white/[0.06] transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[var(--dark-blue-lighter)] flex items-center justify-center text-white font-bold text-sm shrink-0">
            JP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Juan Perez</p>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[var(--radius-badge)] text-[10px] font-bold bg-[var(--accent)] text-[var(--dark-blue)]">
                PRO
              </span>
              <span className="text-[11px] text-white/40 truncate">Broker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-[220px] lg:flex-col bg-[var(--dark-blue)] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -220 }}
            animate={{ x: 0 }}
            exit={{ x: -220 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-[220px] flex flex-col bg-[var(--dark-blue)] z-50 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
