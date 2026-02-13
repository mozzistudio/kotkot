import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const linkGroups: FooterLinkGroup[] = [
  {
    title: 'Seguros',
    links: [
      { label: 'Seguro de Auto', href: '/seguros/auto' },
      { label: 'Seguro de Salud', href: '/seguros/salud' },
      { label: 'Seguro de Vida', href: '/seguros/vida' },
      { label: 'Seguro de Hogar', href: '/seguros/hogar' },
      { label: 'Ver Todas', href: '/seguros' },
    ],
  },
  {
    title: 'Préstamos',
    links: [
      { label: 'Préstamo Personal', href: '/prestamos/personal' },
      { label: 'Préstamo Hipotecario', href: '/prestamos/hipotecario' },
      { label: 'Préstamo de Auto', href: '/prestamos/auto' },
      { label: 'Ver Todos', href: '/prestamos' },
    ],
  },
  {
    title: 'Producto',
    links: [
      { label: 'Funcionalidades', href: '#funcionalidades' },
      { label: 'Precios', href: '#precios' },
      { label: 'Para Brokers', href: '/para-brokers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Casos de Éxito', href: '/casos-de-exito' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/40 bg-gradient-to-b from-white/30 to-white/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand Column - Spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Comparador inteligente de seguros y préstamos en Latinoamérica.
              Encuentra las mejores opciones en minutos.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/demo"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Solicitar Demo →
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-6">
              <Link
                href="/politica-privacidad"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Contacto
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 kotkot.ai. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
