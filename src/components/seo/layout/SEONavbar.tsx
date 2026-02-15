'use client';

/**
 * SEO Navbar Component — B2B SaaS Navigation
 * For insurance/loan brokers in Latin America
 */

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Users,
  BarChart3,
  CreditCard,
  Building2,
  Landmark,
  Wallet,
  FileText,
  BookOpen,
  GraduationCap,
  Video,
  TrendingUp,
  Calculator,
  GitCompare,
  ArrowRight,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

// Smooth easing curve
const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Mega menu content
const productoMenu = {
  sections: [
    {
      title: 'Plataforma',
      items: [
        {
          icon: MessageSquare,
          label: 'Agente IA WhatsApp',
          href: '/producto/agente-whatsapp',
          description: 'Tu bot cotiza y vende 24/7'
        },
        {
          icon: Users,
          label: 'CRM Inteligente',
          href: '/producto/crm',
          description: 'Gestión de clientes y leads'
        },
        {
          icon: BarChart3,
          label: 'Dashboard & Analytics',
          href: '/producto/dashboard',
          description: 'Métricas en tiempo real'
        },
        {
          icon: CreditCard,
          label: 'Cobros Automáticos',
          href: '/producto/cobros',
          description: 'Del presupuesto al pago'
        }
      ]
    },
    {
      title: 'Integraciones',
      items: [
        {
          icon: Building2,
          label: 'Aseguradoras',
          href: '/integraciones',
          description: '25+ aseguradoras conectadas',
          logos: ['ASSA', 'MAPFRE', 'SURA']
        },
        {
          icon: Landmark,
          label: 'Bancos',
          href: '/integraciones',
          description: '15+ bancos y financieras',
          logos: ['BAC', 'Banco General']
        },
        {
          icon: Wallet,
          label: 'Pagos',
          href: '/integraciones',
          description: 'Yappy, Stripe y más'
        }
      ]
    }
  ],
  footer: {
    label: 'Ver todas las integraciones',
    href: '/integraciones'
  }
};

const solucionesMenu = {
  sections: [
    {
      title: 'Por problema',
      items: [
        {
          icon: FileText,
          label: 'Automatizar cotizaciones',
          href: '/soluciones/automatizar-cotizaciones',
          description: 'Cotiza más rápido'
        },
        {
          icon: MessageSquare,
          label: 'Vender por WhatsApp',
          href: '/soluciones/vender-por-whatsapp',
          description: 'Convierte chats en ventas'
        },
        {
          icon: Users,
          label: 'Gestionar clientes',
          href: '/soluciones/gestionar-clientes',
          description: 'CRM todo-en-uno'
        },
        {
          icon: CreditCard,
          label: 'Cobrar automáticamente',
          href: '/soluciones/cobrar-automaticamente',
          description: 'Elimina fricción'
        }
      ]
    },
    {
      title: 'Por perfil',
      items: [
        {
          icon: TrendingUp,
          label: 'Corredor independiente',
          href: '/soluciones/escalar-sin-equipo',
          description: 'Escala sin contratar'
        },
        {
          icon: Users,
          label: 'Agencia con equipo',
          href: '/soluciones/multi-producto',
          description: 'Multi-producto y multi-agente'
        }
      ]
    }
  ]
};

const recursosMenu = {
  sections: [
    {
      title: 'Aprender',
      items: [
        {
          icon: BookOpen,
          label: 'Blog',
          href: '/blog',
          description: 'Artículos y consejos'
        },
        {
          icon: FileText,
          label: 'Guías y ebooks',
          href: '/recursos/guias',
          description: 'Contenido descargable'
        },
        {
          icon: GraduationCap,
          label: 'Glosario',
          href: '/recursos/glosario',
          description: 'Términos clave'
        },
        {
          icon: Video,
          label: 'Webinars',
          href: '/recursos/webinars',
          description: 'Aprende en vivo'
        }
      ]
    },
    {
      title: 'Evaluar',
      items: [
        {
          icon: TrendingUp,
          label: 'Casos de éxito',
          href: '/casos-de-exito',
          description: 'Historias reales'
        },
        {
          icon: Calculator,
          label: 'Calculadora de ROI',
          href: '/recursos/calculadora-roi',
          description: 'Calcula tu retorno'
        },
        {
          icon: GitCompare,
          label: 'Comparativas',
          href: '/comparativas',
          description: 'Kotkot vs. otros'
        }
      ]
    }
  ]
};

export function SEONavbar() {
  const [productoOpen, setProductoOpen] = useState(false);
  const [solucionesOpen, setSolucionesOpen] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border-default)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Producto Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductoOpen(true)}
            onMouseLeave={() => setProductoOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Producto
              <ChevronDown className={`h-4 w-4 transition-transform ${productoOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {productoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="absolute left-0 top-full mt-2 w-[600px] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white shadow-[var(--elevation-2)]"
                >
                  <div className="grid grid-cols-2 gap-8 p-6">
                    {productoMenu.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-[var(--radius-md)] p-3 hover:bg-[var(--surface-hover)] transition-colors"
                            >
                              <item.icon className="h-5 w-5 flex-shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
                                  {item.label}
                                </p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                  {item.description}
                                </p>
                                {item.logos && (
                                  <div className="flex items-center gap-2 mt-1">
                                    {item.logos.map((logo) => (
                                      <span key={logo} className="text-[10px] font-medium text-[var(--text-muted)]">
                                        {logo}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[var(--border-subtle)] px-6 py-3">
                    <Link
                      href={productoMenu.footer.href}
                      className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                      {productoMenu.footer.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Soluciones Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolucionesOpen(true)}
            onMouseLeave={() => setSolucionesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Soluciones
              <ChevronDown className={`h-4 w-4 transition-transform ${solucionesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {solucionesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="absolute left-0 top-full mt-2 w-[560px] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white shadow-[var(--elevation-2)]"
                >
                  <div className="grid grid-cols-2 gap-8 p-6">
                    {solucionesMenu.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-[var(--radius-md)] p-3 hover:bg-[var(--surface-hover)] transition-colors"
                            >
                              <item.icon className="h-5 w-5 flex-shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
                                  {item.label}
                                </p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Precios - Direct Link */}
          <Link
            href="/precios"
            className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Precios
          </Link>

          {/* Recursos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setRecursosOpen(true)}
            onMouseLeave={() => setRecursosOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
              Recursos
              <ChevronDown className={`h-4 w-4 transition-transform ${recursosOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {recursosOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="absolute left-0 top-full mt-2 w-[520px] rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white shadow-[var(--elevation-2)]"
                >
                  <div className="grid grid-cols-2 gap-8 p-6">
                    {recursosMenu.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-[var(--radius-md)] p-3 hover:bg-[var(--surface-hover)] transition-colors"
                            >
                              <item.icon className="h-5 w-5 flex-shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
                                  {item.label}
                                </p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Login & Demo CTA */}
        <div className="flex items-center gap-4">
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
            className="hidden items-center gap-2 rounded-[var(--radius-button)] bg-[var(--action-primary-bg)] px-4 py-2 text-sm font-semibold text-[var(--action-primary-fg)] hover:bg-[var(--action-primary-hover)] border border-[rgba(202,255,4,0.40)] transition-colors lg:flex"
          >
            <span>Solicitar Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] lg:hidden"
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
            transition={{ duration: 0.3, ease: EASING }}
            className="border-t border-[var(--border-default)] bg-white lg:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              {/* Mobile Producto */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">Producto</h3>
                <div className="space-y-2">
                  {productoMenu.sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2 px-3">
                        {section.title}
                      </p>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-[var(--radius-md)] p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Soluciones */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">Soluciones</h3>
                <div className="space-y-2">
                  {solucionesMenu.sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2 px-3">
                        {section.title}
                      </p>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-[var(--radius-md)] p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Other Links */}
              <div className="space-y-2 border-t border-[var(--border-default)] pt-4 mb-4">
                <Link
                  href="/precios"
                  className="block rounded-[var(--radius-md)] p-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Precios
                </Link>

                {/* Mobile Recursos */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 px-3">Recursos</h3>
                  {recursosMenu.sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2 px-3">
                        {section.title}
                      </p>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-[var(--radius-md)] p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  className="block rounded-[var(--radius-md)] p-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>

              {/* Mobile CTA */}
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--action-primary-bg)] px-4 py-3 text-sm font-semibold text-[var(--action-primary-fg)] hover:bg-[var(--action-primary-hover)] border border-[rgba(202,255,4,0.40)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span>Solicitar Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SEONavbar;
