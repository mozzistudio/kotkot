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
        <footer className="border-t border-white/20 bg-white/30 backdrop-blur-xl mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Company */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  kotkot.ai
                </h3>
                <p className="text-sm text-gray-600">
                  Comparador de seguros y préstamos en Panamá. Encuentra las
                  mejores opciones en minutos.
                </p>
              </div>

              {/* Seguros */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  Seguros
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/seguros/auto" className="hover:text-emerald-600">
                      Seguro de Auto
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/salud" className="hover:text-emerald-600">
                      Seguro de Salud
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/vida" className="hover:text-emerald-600">
                      Seguro de Vida
                    </Link>
                  </li>
                  <li>
                    <Link href="/seguros/hogar" className="hover:text-emerald-600">
                      Seguro de Hogar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/seguros/aseguradoras"
                      className="hover:text-emerald-600"
                    >
                      Ver todas las aseguradoras
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Préstamos */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  Préstamos
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link
                      href="/prestamos/personal"
                      className="hover:text-emerald-600"
                    >
                      Préstamo Personal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/hipotecario"
                      className="hover:text-emerald-600"
                    >
                      Préstamo Hipotecario
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/auto"
                      className="hover:text-emerald-600"
                    >
                      Préstamo de Auto
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prestamos/bancos"
                      className="hover:text-emerald-600"
                    >
                      Ver todos los bancos
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Compañía */}
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  Compañía
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/sobre-nosotros" className="hover:text-emerald-600">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="hover:text-emerald-600">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-emerald-600">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/para-brokers" className="hover:text-emerald-600">
                      Para Brokers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>
                © {new Date().getFullYear()} kotkot.ai. Todos los derechos
                reservados.
              </p>
              <div className="mt-2 flex justify-center gap-4">
                <Link href="/privacidad" className="hover:text-emerald-600">
                  Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-emerald-600">
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
