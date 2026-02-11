'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/conversations': 'Conversaciones',
  '/quotes': 'Cotizaciones',
  '/ingresos': 'Ingresos',
  '/clients': 'Clientes',
  '/bot': 'Mi Agente',
  '/apis': 'Aseguradoras',
  '/whatsapp': 'WhatsApp',
  '/analytics': 'Analytics',
  '/settings': 'Configuracion',
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const pageTitle =
    PAGE_TITLES[pathname] ||
    Object.entries(PAGE_TITLES).find(([key]) => pathname.startsWith(key + '/'))?.[1] ||
    'Dashboard';

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-[#0d1117]/80 backdrop-blur-xl border-b border-[#1e293b]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger + Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-lg font-semibold text-white">{pageTitle}</h1>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cotizaciones, clientes..."
              className="w-full rounded-lg pl-10 pr-4 py-2 text-sm bg-[#1e293b]/50 border border-[#1e293b] text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-slate-500 bg-[#0d1117] border border-[#1e293b]">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            {/* Red dot badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0d1117]" />
          </button>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                JP
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden sm:block ${
                  profileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#0d1117] border border-[#1e293b] shadow-xl shadow-black/30 overflow-hidden"
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[#1e293b]">
                    <p className="text-sm font-medium text-white">Juan Perez</p>
                    <p className="text-xs text-slate-500">juan@correduria.com</p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      href="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Configuracion
                    </Link>
                    <div className="my-1 h-px bg-[#1e293b]" />
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        // Placeholder: would call Supabase signOut
                        console.log('Logout');
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesion
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
