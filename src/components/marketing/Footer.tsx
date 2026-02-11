import { Shield } from 'lucide-react';

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const linkGroups: FooterLinkGroup[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Funcionalidades', href: '#funcionalidades' },
      { label: 'Precios', href: '#precios' },
      { label: 'Demo', href: '/demo' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '/about' },
      { label: 'Casos de Éxito', href: '/cases' },
      { label: 'Contacto', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/privacy' },
      { label: 'Términos de Servicio', href: '/terms' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de Ayuda', href: '/help' },
      { label: 'API Docs', href: '/docs/api' },
      { label: 'Status', href: '/status' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/30 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 lg:grid-cols-12">
          {/* --- Brand column --- */}
          <div className="md:col-span-6 lg:col-span-4">
            <a href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-105">
                <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
                Coti<span className="text-emerald-600">Fácil</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Tu agente de seguros que nunca duerme
            </p>
          </div>

          {/* --- Link columns --- */}
          {linkGroups.map((group) => (
            <div key={group.title} className="md:col-span-3 lg:col-span-2">
              <h4 className="font-heading text-sm font-semibold text-slate-900">
                {group.title}
              </h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors duration-200 hover:text-emerald-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Bottom bar --- */}
        <div className="divider-gradient mt-12" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-400">
            Hecho para Latinoamérica {'\u{1F30E}'}
          </p>
          <p className="text-sm text-slate-400">
            &copy; 2026 CotiFácil. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
