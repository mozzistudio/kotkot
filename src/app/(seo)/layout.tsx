/**
 * SEO Route Group Layout
 * Layout for all SEO-focused pages (insurance and loan comparisons)
 * Separate from marketing site to allow different navigation and structure
 */

import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { SEONavbar } from '@/components/seo/layout/SEONavbar';

export default function SEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col">
        {/* Enhanced SEO Navbar with Dropdowns */}
        <SEONavbar />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Simple SEO-focused Footer */}
        <footer className="border-t border-[var(--border-default)] bg-white mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Company */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
                  <Shield className="h-5 w-5 text-[var(--success)]" />
                  kotkot.ai
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Comparador de seguros y préstamos en Panamá. Encuentra las
                  mejores opciones en minutos.
                </p>
              </div>

              {/* Seguros */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                  Seguros
                </h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link href="/seguros/auto" className="hover:text-[var(--text-primary)]">
                      Seguro de Auto
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/salud" className="hover:text-[var(--text-primary)]">
                      Seguro de Salud
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/vida" className="hover:text-[var(--text-primary)]">
                      Seguro de Vida
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/hogar" className="hover:text-[var(--text-primary)]">
                      Seguro de Hogar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/seguros/aseguradoras"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Ver todas las aseguradoras
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Préstamos */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                  Préstamos
                </h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link
                      href="/prestamos/personal"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Préstamo Personal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/hipotecario"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Préstamo Hipotecario
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/auto"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Préstamo de Auto
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/bancos"
                      className="hover:text-[var(--text-primary)]"
                    >
                      Ver todos los bancos
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Compañía */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
                  Compañía
                </h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    <Link href="/sobre-nosotros" className="hover:text-[var(--text-primary)]">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="hover:text-[var(--text-primary)]">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[var(--text-primary)]">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/para-brokers" className="hover:text-[var(--text-primary)]">
                      Para Brokers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-[var(--border-default)] pt-8 text-center text-sm text-[var(--text-secondary)]">
              <p>
                © {new Date().getFullYear()} kotkot.ai. Todos los derechos
                reservados.
              </p>
              <div className="mt-2 flex justify-center gap-4">
                <Link href="/privacidad" className="hover:text-[var(--text-primary)]">
                  Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-[var(--text-primary)]">
                  Términos
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </GradientBackground>
  );
}
