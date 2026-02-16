'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  Users,
  Building2,
  FileText,
  MessageSquare,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/conversations': 'Conversaciones',
  '/app/quotes': 'Cotizaciones',
  '/app/ingresos': 'Ingresos',
  '/app/clients': 'Clientes',
  '/app/bot': 'Mi Agente',
  '/app/apis': 'Aseguradoras',
  '/app/whatsapp': 'WhatsApp',
  '/app/analytics': 'Analytics',
  '/app/settings': 'Configuracion',
};

// ---------------------------------------------------------------------------
// Search Data (demo — in production this would come from Supabase)
// ---------------------------------------------------------------------------

interface SearchItem {
  type: 'client' | 'insurer' | 'quote' | 'conversation' | 'policy';
  label: string;
  sublabel: string;
  href: string;
}

const searchableItems: SearchItem[] = [
  // Clients
  { type: 'client', label: 'Maria Gonzalez', sublabel: '+507 6234-5678', href: '/app/clients/C-001' },
  { type: 'client', label: 'Carlos Perez', sublabel: '+507 6345-6789', href: '/app/clients/C-002' },
  { type: 'client', label: 'Ana Rodriguez', sublabel: '+507 6456-7890', href: '/app/clients/C-003' },
  { type: 'client', label: 'Juan Martinez', sublabel: '+507 6567-8901', href: '/app/clients/C-004' },
  { type: 'client', label: 'Laura Castillo', sublabel: '+507 6678-9012', href: '/app/clients/C-005' },
  { type: 'client', label: 'Roberto Diaz', sublabel: '+507 6789-0123', href: '/app/clients/C-006' },
  { type: 'client', label: 'Patricia Morales', sublabel: '+507 6890-1234', href: '/app/clients/C-007' },
  { type: 'client', label: 'Fernando Vega', sublabel: '+507 6901-2345', href: '/app/clients/C-008' },
  // Insurers
  { type: 'insurer', label: 'ASSA Compania de Seguros', sublabel: 'API activa · 48 polizas', href: '/app/apis/assa' },
  { type: 'insurer', label: 'Mapfre Panama', sublabel: 'API activa · 35 polizas', href: '/app/apis/mapfre' },
  { type: 'insurer', label: 'Pan American Life', sublabel: 'API activa · 28 polizas', href: '/app/apis/pan-american-life' },
  { type: 'insurer', label: 'Seguros Suramericana', sublabel: 'API activa · 22 polizas', href: '/app/apis/suramericana' },
  { type: 'insurer', label: 'General de Seguros', sublabel: 'Error · 15 polizas', href: '/app/apis/general-de-seguros' },
  { type: 'insurer', label: 'Worldwide Medical', sublabel: 'API activa · 8 polizas', href: '/app/apis/worldwide-medical' },
  { type: 'insurer', label: 'BUPA Panama', sublabel: 'No conectada', href: '/app/apis/bupa' },
  { type: 'insurer', label: 'Cigna International', sublabel: 'No conectada', href: '/app/apis/cigna' },
  // Quotes
  { type: 'quote', label: 'Q-001 · Maria Gonzalez', sublabel: 'Auto · $85/mes · Enviada', href: '/app/quotes?status=sent' },
  { type: 'quote', label: 'Q-002 · Carlos Perez', sublabel: 'Auto · $92/mes · Seleccionada', href: '/app/quotes?status=selected' },
  { type: 'quote', label: 'Q-003 · Ana Rodriguez', sublabel: 'Salud · $145/mes · Generada', href: '/app/quotes?status=generated' },
  { type: 'quote', label: 'Q-004 · Juan Martinez', sublabel: 'Hogar · $45/mes · Pagada', href: '/app/quotes?status=paid' },
  { type: 'quote', label: 'Q-005 · Laura Castillo', sublabel: 'Salud · $180/mes · Enviada', href: '/app/quotes?status=sent' },
  { type: 'quote', label: 'Q-006 · Roberto Diaz', sublabel: 'Viaje · $25 · Expirada', href: '/app/quotes?status=expired' },
  { type: 'quote', label: 'Q-007 · Patricia Morales', sublabel: 'Auto · $78/mes · Pagada', href: '/app/quotes?status=paid' },
  { type: 'quote', label: 'Q-008 · Fernando Vega', sublabel: 'Negocio · $320/mes · Generada', href: '/app/quotes?status=generated' },
  // Conversations
  { type: 'conversation', label: 'Maria Gonzalez', sublabel: 'Seguro de auto · Activa', href: '/app/conversations?id=1' },
  { type: 'conversation', label: 'Carlos Perez', sublabel: 'Esperando pago · ASSA', href: '/app/conversations?id=2' },
  { type: 'conversation', label: 'Ana Rodriguez', sublabel: 'Salud · Transferida a humano', href: '/app/conversations?id=3' },
  { type: 'conversation', label: 'Juan Martinez', sublabel: 'Hogar · Cerrada', href: '/app/conversations?id=4' },
  { type: 'conversation', label: 'Laura Castillo', sublabel: 'Salud familiar · Activa', href: '/app/conversations?id=5' },
  // Policies
  { type: 'policy', label: 'POL-001 · Maria Gonzalez', sublabel: 'Auto · ASSA · $85/mes', href: '/app/quotes?status=paid' },
  { type: 'policy', label: 'POL-002 · Juan Martinez', sublabel: 'Hogar · Suramericana · $45/mes', href: '/app/quotes?status=paid' },
  { type: 'policy', label: 'POL-003 · Patricia Morales', sublabel: 'Auto · General de Seguros · $78/mes', href: '/app/quotes?status=paid' },
];

const groupConfig: Record<SearchItem['type'], { label: string; icon: React.ReactNode }> = {
  client: { label: 'Clientes', icon: <Users className="h-3.5 w-3.5" /> },
  insurer: { label: 'Aseguradoras', icon: <Building2 className="h-3.5 w-3.5" /> },
  quote: { label: 'Cotizaciones', icon: <FileText className="h-3.5 w-3.5" /> },
  conversation: { label: 'Conversaciones', icon: <MessageSquare className="h-3.5 w-3.5" /> },
  policy: { label: 'Polizas', icon: <Shield className="h-3.5 w-3.5" /> },
};

const groupOrder: SearchItem['type'][] = ['client', 'insurer', 'quote', 'conversation', 'policy'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pageTitle =
    PAGE_TITLES[pathname] ||
    Object.entries(PAGE_TITLES).find(([key]) => pathname.startsWith(key + '/'))?.[1] ||
    'Dashboard';

  // Filter results
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchableItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sublabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Group results by type
  const grouped = useMemo(() => {
    const groups: Partial<Record<SearchItem['type'], SearchItem[]>> = {};
    for (const item of results) {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type]!.push(item);
    }
    return groups;
  }, [results]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchItem[] = [];
    for (const type of groupOrder) {
      if (grouped[type]) flat.push(...grouped[type]!);
    }
    return flat;
  }, [grouped]);

  const hasResults = flatResults.length > 0;
  const showDropdown = searchOpen && searchQuery.trim().length > 0;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Keyboard shortcut "/" to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToResult = useCallback(
    (item: SearchItem) => {
      setSearchQuery('');
      setSearchOpen(false);
      router.push(item.href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || !hasResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      navigateToResult(flatResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[var(--border-default)]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger + Page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-lg font-semibold text-[var(--text-primary)]">{pageTitle}</h1>
        </div>

        {/* Center: Search with dropdown */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar cotizaciones, clientes..."
              className="w-full rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-sm bg-white border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--dark-blue)] focus:ring-1 focus:ring-[rgba(12,30,53,0.15)] focus:outline-none transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-[var(--text-muted)] bg-white border border-[var(--border-default)]">
                /
              </kbd>
            </div>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 max-h-[420px] overflow-y-auto rounded-[var(--radius-md)] bg-white border border-[var(--border-default)] shadow-2xl shadow-black/10"
              >
                {hasResults ? (
                  <div className="py-2">
                    {groupOrder.map((type) => {
                      const items = grouped[type];
                      if (!items || items.length === 0) return null;
                      const config = groupConfig[type];

                      return (
                        <div key={type}>
                          {/* Group Header */}
                          <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                            {config.icon}
                            {config.label}
                            <span className="ml-auto text-[10px] font-normal normal-case text-[var(--text-muted)]">
                              {items.length}
                            </span>
                          </div>

                          {/* Group Items */}
                          {items.map((item) => {
                            const flatIdx = flatResults.indexOf(item);
                            const isSelected = flatIdx === selectedIndex;

                            return (
                              <button
                                key={item.href + item.label}
                                onClick={() => navigateToResult(item)}
                                onMouseEnter={() => setSelectedIndex(flatIdx)}
                                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  isSelected
                                    ? 'bg-[var(--dark-blue-surface)] text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                                }`}
                              >
                                <div className="min-w-0 flex-1">
                                  <p className={`text-sm font-medium truncate ${isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-[var(--text-secondary)] truncate">{item.sublabel}</p>
                                </div>
                                <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-opacity ${isSelected ? 'opacity-100 text-[var(--text-primary)]' : 'opacity-0'}`} />
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search className="mx-auto h-6 w-6 text-[var(--text-muted)]" />
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      No se encontraron resultados para &quot;{searchQuery}&quot;
                    </p>
                  </div>
                )}

                {/* Footer hint */}
                <div className="border-t border-[var(--border-default)] px-4 py-2 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span>
                    <kbd className="rounded bg-[var(--surface-hover)] px-1 py-0.5 font-mono">↑↓</kbd> navegar
                    <span className="mx-2">·</span>
                    <kbd className="rounded bg-[var(--surface-hover)] px-1 py-0.5 font-mono">Enter</kbd> seleccionar
                    <span className="mx-2">·</span>
                    <kbd className="rounded bg-[var(--surface-hover)] px-1 py-0.5 font-mono">Esc</kbd> cerrar
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            {/* Red dot badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--error)] ring-2 ring-white" />
          </button>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--dark-blue)] flex items-center justify-center text-white font-bold text-xs">
                JP
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 hidden sm:block ${
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
                  className="absolute right-0 top-full mt-2 w-56 rounded-[var(--radius-md)] bg-white border border-[var(--border-default)] shadow-xl shadow-black/10 overflow-hidden"
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[var(--border-default)]">
                    <p className="text-sm font-medium text-[var(--text-primary)]">Juan Perez</p>
                    <p className="text-xs text-[var(--text-secondary)]">juan@correduria.com</p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      href="/app/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Perfil
                    </Link>
                    <Link
                      href="/app/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Configuracion
                    </Link>
                    <div className="my-1 h-px bg-[var(--border-default)]" />
                    <button
                      onClick={() => {
                        setProfileOpen(false);
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
