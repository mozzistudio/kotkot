'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LayoutDashboard, Users, PlusCircle, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/quotes/new', label: 'Nueva Cotización', icon: PlusCircle },
  { href: '/demo', label: 'Demo del Bot', icon: MessageSquare },
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const plan = session?.user?.plan || 'starter';

  const planLabels: Record<string, string> = {
    starter: 'Starter',
    pro: 'Pro',
    enterprise: 'Enterprise',
  };

  const planColors: Record<string, string> = {
    starter: 'bg-slate-100 text-slate-700',
    pro: 'bg-brand-light text-brand',
    enterprise: 'bg-purple-100 text-purple-700',
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-200',
          'md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-2xl mr-2">🦊</span>
          <span className="text-lg font-bold text-brand">CotiFácil</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand/10 text-brand border-l-3 border-brand'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', planColors[plan])}>
            Plan {planLabels[plan]}
          </span>
        </div>
      </aside>
    </>
  );
}
