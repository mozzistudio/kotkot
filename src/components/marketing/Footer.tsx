import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const linkGroups: FooterLinkGroup[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Agente WhatsApp', href: '/producto/agente-whatsapp' },
      { label: 'CRM', href: '/producto/crm' },
      { label: 'Dashboard', href: '/producto/dashboard' },
      { label: 'Cobros', href: '/producto/cobros' },
      { label: 'Integraciones', href: '/integraciones' },
    ],
  },
  {
    title: 'Soluciones',
    links: [
      { label: 'Automatizar cotizaciones', href: '/soluciones/automatizar-cotizaciones' },
      { label: 'Vender por WhatsApp', href: '/soluciones/vender-por-whatsapp' },
      { label: 'Gestionar clientes', href: '/soluciones/gestionar-clientes' },
      { label: 'Cobrar automáticamente', href: '/soluciones/cobro-automatico' },
      { label: 'Escalar sin equipo', href: '/soluciones/escalar-sin-equipo' },
      { label: 'Multi-producto', href: '/soluciones/multi-producto' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guías', href: '/recursos/guias' },
      { label: 'Glosario', href: '/recursos/glosario' },
      { label: 'Casos de éxito', href: '/casos-de-exito' },
      { label: 'Calculadora ROI', href: '/recursos/calculadora-roi' },
      { label: 'Comparativas', href: '/comparativas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Partners', href: '/partners' },
      { label: 'Precios', href: '/precios' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--dark-blue)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column - Spans 2 columns on desktop */}
          <div className="sm:col-span-2">
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
            <div className="mt-6">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--accent-hover)] border border-[rgba(202,255,4,0.40)] transition-colors"
              >
                <span>Solicitar Demo</span>
                <ArrowRight className="h-4 w-4" />
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
            <p className="text-sm text-white/40">
              © 2026 kotkot.ai
            </p>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
