import { MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Seguros", href: "#seguros" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "https://wa.me/+50769784955" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20">
      <div className="glass-container rounded-none border-x-0 border-b-0 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <span className="text-white font-extrabold text-xs">CF</span>
                </div>
                <span className="font-display font-extrabold text-lg text-primary">
                  CotiFácil
                </span>
              </div>
              <p className="text-text-secondary text-sm">
                Compara seguros inteligentemente
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">
              &copy; 2026 CotiFácil. Todos los derechos reservados. Powered by Mozzi Studio
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-xs text-text-muted hover:text-primary transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-xs text-text-muted hover:text-primary transition-colors"
              >
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/+50769784955"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
    </footer>
  );
}
