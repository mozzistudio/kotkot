'use client';

/**
 * SEO Navbar Component
 * Enhanced navigation with dropdowns for insurance products and companies
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

const insuranceProducts = [
  { slug: 'auto', name: 'Auto', icon: '🚗', description: 'Protección para tu vehículo' },
  { slug: 'salud', name: 'Salud', icon: '🏥', description: 'Cobertura médica completa' },
  { slug: 'vida', name: 'Vida', icon: '🛡️', description: 'Protección para tu familia' },
  { slug: 'hogar', name: 'Hogar', icon: '🏠', description: 'Protege tu casa' },
  { slug: 'viaje', name: 'Viaje', icon: '✈️', description: 'Viaja protegido' },
  { slug: 'mascota', name: 'Mascota', icon: '🐾', description: 'Salud para tu mascota' },
  { slug: 'empresarial', name: 'Empresarial', icon: '🏢', description: 'Para tu negocio' },
  { slug: 'responsabilidad-civil', name: 'Responsabilidad Civil', icon: '⚖️', description: 'Protección legal' },
  { slug: 'accidentes-personales', name: 'Accidentes Personales', icon: '🚑', description: 'Cobertura 24/7' },
  { slug: 'ahorro', name: 'Ahorro', icon: '💰', description: 'Ahorra e invierte' },
];

const loanProducts = [
  { slug: 'personal', name: 'Personal', icon: '💳', description: 'Para tus proyectos personales' },
  { slug: 'hipotecario', name: 'Hipotecario', icon: '🏡', description: 'Compra tu casa soñada' },
  { slug: 'auto', name: 'Auto', icon: '🚙', description: 'Financia tu vehículo' },
  { slug: 'empresarial', name: 'Empresarial', icon: '💼', description: 'Crece tu negocio' },
];

const topCompanies = [
  { slug: 'assa', name: 'ASSA', description: 'Líder del mercado' },
  { slug: 'mapfre', name: 'MAPFRE', description: 'Innovación digital' },
  { slug: 'sura', name: 'Sura', description: 'Enfoque en bienestar' },
  { slug: 'bupa', name: 'Bupa', description: 'Salud internacional' },
];

export function SEONavbar() {
  const [segurosOpen, setSegurosOpen] = useState(false);
  const [prestamosOpen, setPrestamosOpen] = useState(false);
  const [aseguradorasOpen, setAseguradorasOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Seguros Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSegurosOpen(true)}
            onMouseLeave={() => setSegurosOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Seguros
              <ChevronDown className={`h-4 w-4 transition-transform ${segurosOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {segurosOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-[480px] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Tipos de Seguros</h3>
                      <Link
                        href="/seguros"
                        className="text-xs font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {insuranceProducts.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/seguros/${product.slug}`}
                          className="group rounded-[var(--radius-md)] p-3 hover:bg-[var(--dark-blue-surface)] transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-2xl flex-shrink-0">{product.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">
                                {product.name}
                              </p>
                              <p className="text-xs text-[var(--text-secondary)]">{product.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Préstamos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPrestamosOpen(true)}
            onMouseLeave={() => setPrestamosOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Préstamos
              <ChevronDown className={`h-4 w-4 transition-transform ${prestamosOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {prestamosOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-[400px] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Tipos de Préstamos</h3>
                      <Link
                        href="/prestamos"
                        className="text-xs font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {loanProducts.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/prestamos/${product.slug}`}
                          className="group rounded-[var(--radius-md)] p-3 hover:bg-[var(--dark-blue-surface)] transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-2xl flex-shrink-0">{product.icon}</span>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)]">
                                {product.name}
                              </p>
                              <p className="text-xs text-[var(--text-secondary)]">{product.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Aseguradoras Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAseguradorasOpen(true)}
            onMouseLeave={() => setAseguradorasOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Aseguradoras
              <ChevronDown className={`h-4 w-4 transition-transform ${aseguradorasOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {aseguradorasOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-72 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white"
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Aseguradoras en Panamá</h3>
                    </div>
                    <div className="space-y-1">
                      {topCompanies.map((company) => (
                        <Link
                          key={company.slug}
                          href={`/seguros/aseguradoras/${company.slug}`}
                          className="group flex items-center justify-between rounded-[var(--radius-md)] p-3 hover:bg-[var(--dark-blue-surface)] transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                              {company.name}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)]">{company.description}</p>
                          </div>
                          <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">→</span>
                        </Link>
                      ))}
                      <Link
                        href="/seguros/aseguradoras"
                        className="mt-2 flex items-center justify-center rounded-[var(--radius-button)] bg-[var(--dark-blue)] p-3 text-sm font-semibold text-white hover:bg-[var(--dark-blue-light)] transition-colors"
                      >
                        Ver todas las aseguradoras →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Links */}
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/para-brokers"
            className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Para Brokers
          </Link>

          <Link
            href="/precios"
            className="text-sm font-medium text-[#111827] hover:text-[#6b7280] transition-colors"
          >
            Precios
          </Link>

          <Link
            href="/app"
            className="text-sm font-medium text-[#111827] hover:text-[#6b7280] transition-colors"
          >
            App
          </Link>
        </div>

        {/* Right Side - Login & CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Login Link */}
          <Link
            href="/login"
            className="hidden text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors lg:block"
          >
            Iniciar Sesión
          </Link>

          {/* Demo CTA */}
          <Link
            href="/demo"
            className="hidden items-center gap-2 rounded-[var(--radius-button)] bg-[var(--dark-blue)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--dark-blue-light)] transition-colors sm:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">Solicitar Demo</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--text-primary)] hover:bg-[var(--surface-panel)] lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[var(--border-default)] bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {/* Mobile Seguros */}
              <div className="mb-4">
                <Link
                  href="/seguros"
                  className="mb-2 flex items-center justify-between text-base font-semibold text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Seguros
                  <span className="text-sm text-[var(--text-secondary)]">Ver todos →</span>
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {insuranceProducts.slice(0, 6).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/seguros/${product.slug}`}
                      className="flex items-center gap-2 rounded-[var(--radius-md)] p-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-lg">{product.icon}</span>
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Préstamos */}
              <div className="mb-4">
                <Link
                  href="/prestamos"
                  className="mb-2 flex items-center justify-between text-base font-semibold text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Préstamos
                  <span className="text-sm text-[var(--text-secondary)]">Ver todos →</span>
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {loanProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/prestamos/${product.slug}`}
                      className="flex items-center gap-2 rounded-[var(--radius-md)] p-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-lg">{product.icon}</span>
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Aseguradoras */}
              <div className="mb-4">
                <Link
                  href="/seguros/aseguradoras"
                  className="mb-2 flex items-center justify-between text-base font-semibold text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Aseguradoras
                  <span className="text-sm text-[var(--text-secondary)]">Ver todas →</span>
                </Link>
                <div className="space-y-1 pl-4">
                  {topCompanies.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/seguros/aseguradoras/${company.slug}`}
                      className="block rounded-[var(--radius-md)] p-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {company.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Mobile Links */}
              <div className="space-y-2 border-t border-[var(--border-default)] pt-4">
                <Link
                  href="/blog"
                  className="block rounded-[var(--radius-md)] p-2 text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/para-brokers"
                  className="block rounded-[var(--radius-md)] p-2 text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Para Brokers
                </Link>
                <Link
                  href="/precios"
                  className="block rounded-[12px] p-2 text-base font-medium text-[#6b7280] hover:bg-[rgba(202,255,4,0.15)] hover:text-[#111827]"
                  onClick={() => setMobileOpen(false)}
                >
                  Precios
                </Link>
                <Link
                  href="/app"
                  className="block rounded-[12px] p-2 text-base font-medium text-[#6b7280] hover:bg-[rgba(202,255,4,0.15)] hover:text-[#111827]"
                  onClick={() => setMobileOpen(false)}
                >
                  App
                </Link>
                <Link
                  href="/login"
                  className="block rounded-[var(--radius-md)] p-2 text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--dark-blue-surface)] hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>

              {/* Mobile CTA */}
              <Link
                href="/demo"
                className="mt-4 flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--dark-blue)] px-4 py-3 text-base font-semibold text-white hover:bg-[var(--dark-blue-light)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-5 w-5" />
                Solicitar Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SEONavbar;
