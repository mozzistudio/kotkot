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
        <footer className="border-t border-[#e5e7eb] bg-white mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Company */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#111827]">
                  <Shield className="h-5 w-5 text-[#10b981]" />
                  kotkot.ai
                </h3>
                <p className="text-sm text-[#6b7280]">
                  Comparador de seguros y préstamos en Panamá. Encuentra las
                  mejores opciones en minutos.
                </p>
              </div>

              {/* Seguros */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[#111827]">
                  Seguros
                </h4>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li>
                    <Link href="/seguros/auto" className="hover:text-[#059669]">
                      Seguro de Auto
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/salud" className="hover:text-[#059669]">
                      Seguro de Salud
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/vida" className="hover:text-[#059669]">
                      Seguro de Vida
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/hogar" className="hover:text-[#059669]">
                      Seguro de Hogar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/seguros/aseguradoras"
                      className="hover:text-[#059669]"
                    >
                      Ver todas las aseguradoras
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Préstamos */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[#111827]">
                  Préstamos
                </h4>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li>
                    <Link
                      href="/prestamos/personal"
                      className="hover:text-[#059669]"
                    >
                      Préstamo Personal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/hipotecario"
                      className="hover:text-[#059669]"
                    >
                      Préstamo Hipotecario
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/auto"
                      className="hover:text-[#059669]"
                    >
                      Préstamo de Auto
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/bancos"
                      className="hover:text-[#059669]"
                    >
                      Ver todos los bancos
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Compañía */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-[#111827]">
                  Compañía
                </h4>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li>
                    <Link href="/sobre-nosotros" className="hover:text-[#059669]">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="hover:text-[#059669]">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[#059669]">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/para-brokers" className="hover:text-[#059669]">
                      Para Brokers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-[#e5e7eb] pt-8 text-center text-sm text-[#6b7280]">
              <p>
                © {new Date().getFullYear()} kotkot.ai. Todos los derechos
                reservados.
              </p>
              <div className="mt-2 flex justify-center gap-4">
                <Link href="/privacidad" className="hover:text-[#059669]">
                  Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-[#059669]">
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
