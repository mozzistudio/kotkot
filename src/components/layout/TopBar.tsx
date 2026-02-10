'use client';

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, ChevronDown, User, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/quotes/new': 'Nueva Cotización',
  '/demo': 'Demo del Bot',
  '/settings': 'Configuración',
};

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const title = pageTitles[pathname] ||
    (pathname.startsWith('/leads/') ? 'Detalle del Lead' : 'CotiFácil');

  const brandName = session?.user?.brandName || 'CotiFácil';
  const primaryColor = session?.user?.primaryColor || '#2D8C4E';
  const initials = brandName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3" ref={dropdownRef}>
        <span className="hidden sm:block text-sm text-slate-600">{brandName}</span>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: primaryColor }}
          >
            {initials}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-4 top-14 bg-white rounded-lg shadow-lg border border-slate-200 py-1 w-48">
            <Link
              href="/settings"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <User className="w-4 h-4" />
              Perfil
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
