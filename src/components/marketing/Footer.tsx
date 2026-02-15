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
    <footer className="relative bg-[var(--dark-blue)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand Column - Spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)]">
                <svg viewBox="0 0 32 32" fill="none" className="h-[18px] w-[18px]">
                  <path d="M9 6v20" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M9 16l10-10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M9 16l10 10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                kotkot<span className="font-normal text-white/50">.ai</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Plataforma de automatización para corredores de seguros y préstamos en Latinoamérica.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/demo"
                className="text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors"
              >
                Solicitar Demo →
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-white mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
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
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-6">
              <Link
                href="/politica-privacidad"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Contacto
              </Link>
            </div>
            <p className="text-sm text-white/40">
              © 2026 kotkot.ai. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
