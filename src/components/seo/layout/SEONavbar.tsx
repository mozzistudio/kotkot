'use client';

/**
 * SEO Navbar Component
 * Enhanced navigation with dropdowns for insurance products and companies
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, ChevronDown, Menu, X, Car, Heart, Shield, Home, Plane, PawPrint, Building2, Scale, Ambulance, PiggyBank } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

const insuranceProducts = [
  { slug: 'auto', name: 'Seguro de Auto', icon: Car, description: 'Protección para tu vehículo', color: 'text-blue-600' },
  { slug: 'salud', name: 'Seguro de Salud', icon: Heart, description: 'Cobertura médica completa', color: 'text-red-500' },
  { slug: 'vida', name: 'Seguro de Vida', icon: Shield, description: 'Protección para tu familia', color: 'text-purple-600' },
  { slug: 'hogar', name: 'Seguro de Hogar', icon: Home, description: 'Protege tu casa', color: 'text-orange-600' },
  { slug: 'viaje', name: 'Seguro de Viaje', icon: Plane, description: 'Viaja protegido', color: 'text-sky-600' },
  { slug: 'mascota', name: 'Seguro de Mascota', icon: PawPrint, description: 'Salud para tu mascota', color: 'text-amber-600' },
  { slug: 'empresarial', name: 'Seguro Empresarial', icon: Building2, description: 'Para tu negocio', color: 'text-slate-700' },
  { slug: 'responsabilidad-civil', name: 'Responsabilidad Civil', icon: Scale, description: 'Protección legal', color: 'text-indigo-600' },
  { slug: 'accidentes-personales', name: 'Accidentes Personales', icon: Ambulance, description: 'Cobertura 24/7', color: 'text-rose-600' },
  { slug: 'ahorro', name: 'Seguro de Ahorro', icon: PiggyBank, description: 'Ahorra e invierte', color: 'text-emerald-600' },
];

const topCompanies = [
  { slug: 'assa', name: 'ASSA', description: 'Líder del mercado' },
  { slug: 'mapfre', name: 'MAPFRE', description: 'Innovación digital' },
  { slug: 'sura', name: 'Sura', description: 'Enfoque en bienestar' },
  { slug: 'bupa', name: 'Bupa', description: 'Salud internacional' },
];

export function SEONavbar() {
  const [segurosOpen, setSegurosOpen] = useState(false);
  const [aseguradorasOpen, setAseguradorasOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/50 backdrop-blur-xl">
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
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
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
                  className="absolute left-0 top-full mt-2 w-96 rounded-2xl border border-white/40 bg-white/95 backdrop-blur-xl shadow-2xl"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Tipos de Seguros</h3>
                      <Link
                        href="/seguros"
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {insuranceProducts.map((product) => {
                        const IconComponent = product.icon;
                        return (
                          <Link
                            key={product.slug}
                            href={`/seguros/${product.slug}`}
                            className="group rounded-lg p-3 hover:bg-emerald-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${product.color}`}>
                                <IconComponent className="h-5 w-5" strokeWidth={2} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 truncate">
                                  {product.name.replace('Seguro de ', '')}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
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
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
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
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-white/40 bg-white/95 backdrop-blur-xl shadow-2xl"
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Aseguradoras en Panamá</h3>
                    </div>
                    <div className="space-y-1">
                      {topCompanies.map((company) => (
                        <Link
                          key={company.slug}
                          href={`/seguros/aseguradoras/${company.slug}`}
                          className="group flex items-center justify-between rounded-lg p-3 hover:bg-emerald-50 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600">
                              {company.name}
                            </p>
                            <p className="text-xs text-gray-500">{company.description}</p>
                          </div>
                          <span className="text-gray-400 group-hover:text-emerald-600">→</span>
                        </Link>
                      ))}
                      <Link
                        href="/seguros/aseguradoras"
                        className="mt-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 transition-colors"
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
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/para-brokers"
            className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Para Brokers
          </Link>
        </div>

        {/* Right Side - Login & CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Login Link */}
          <Link
            href="/login"
            className="hidden text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors lg:block"
          >
            Iniciar Sesión
          </Link>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors sm:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">Cotizar</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-white/50 lg:hidden"
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
            className="border-t border-white/20 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {/* Mobile Seguros */}
              <div className="mb-4">
                <Link
                  href="/seguros"
                  className="mb-2 flex items-center justify-between text-base font-semibold text-gray-900"
                  onClick={() => setMobileOpen(false)}
                >
                  Seguros
                  <span className="text-sm text-emerald-600">Ver todos →</span>
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {insuranceProducts.slice(0, 6).map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <Link
                        key={product.slug}
                        href={`/seguros/${product.slug}`}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        <IconComponent className={`h-4 w-4 ${product.color}`} strokeWidth={2} />
                        <span>{product.name.replace('Seguro de ', '')}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Aseguradoras */}
              <div className="mb-4">
                <Link
                  href="/seguros/aseguradoras"
                  className="mb-2 flex items-center justify-between text-base font-semibold text-gray-900"
                  onClick={() => setMobileOpen(false)}
                >
                  Aseguradoras
                  <span className="text-sm text-emerald-600">Ver todas →</span>
                </Link>
                <div className="space-y-1 pl-4">
                  {topCompanies.map((company) => (
                    <Link
                      key={company.slug}
                      href={`/seguros/aseguradoras/${company.slug}`}
                      className="block rounded-lg p-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {company.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Mobile Links */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <Link
                  href="/blog"
                  className="block rounded-lg p-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/para-brokers"
                  className="block rounded-lg p-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Para Brokers
                </Link>
                <Link
                  href="/login"
                  className="block rounded-lg p-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>

              {/* Mobile CTA */}
              <a
                href="https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SEONavbar;
