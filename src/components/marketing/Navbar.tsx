'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Shield, ChevronDown } from 'lucide-react';

const loanProducts = [
  { slug: 'personal', name: 'Personal', icon: '💳' },
  { slug: 'hipotecario', name: 'Hipotecario', icon: '🏡' },
  { slug: 'auto', name: 'Auto', icon: '🚙' },
  { slug: 'empresarial', name: 'Empresarial', icon: '💼' },
];

const navLinks = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Precios', href: '#precios' },
  { label: 'Para Brokers', href: '/para-brokers' },
];

const insuranceProducts = [
  { slug: 'auto', name: 'Auto', icon: '🚗' },
  { slug: 'salud', name: 'Salud', icon: '🏥' },
  { slug: 'vida', name: 'Vida', icon: '🛡️' },
  { slug: 'hogar', name: 'Hogar', icon: '🏠' },
  { slug: 'viaje', name: 'Viaje', icon: '✈️' },
  { slug: 'mascota', name: 'Mascota', icon: '🐾' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#funcionalidades');
  const [segurosOpen, setSegurosOpen] = useState(false);
  const [prestamosOpen, setPrestamosOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e7eb]"
      >
        <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-6 py-4">
          {/* --- Logo --- */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)] transition-transform duration-200 group-hover:scale-105">
              <Shield className="h-5 w-5 text-[#111827]" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#111827]">
              kotkot<span className="text-[#059669]">.ai</span>
            </span>
          </a>

          {/* --- Center Nav (desktop) --- */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Seguros Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSegurosOpen(true)}
              onMouseLeave={() => setSegurosOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-[10px] px-4 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]">
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
                    className="absolute left-0 top-full mt-2 w-64 rounded-[16px] border border-[#e5e7eb] bg-white"
                  >
                    <div className="p-2">
                      {insuranceProducts.map((product) => (
                        <a
                          key={product.slug}
                          href={`/seguros/${product.slug}`}
                          className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
                        >
                          <span className="text-lg">{product.icon}</span>
                          <span>Seguro de {product.name}</span>
                        </a>
                      ))}
                      <div className="mt-1 border-t border-[#e5e7eb] pt-1">
                        <a
                          href="/seguros"
                          className="flex items-center justify-center rounded-[10px] px-3 py-2 text-sm font-semibold text-[#059669] transition-colors hover:bg-[rgba(202,255,4,0.15)]"
                        >
                          Ver todos los seguros →
                        </a>
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
              <button className="flex items-center gap-1 rounded-[10px] px-4 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]">
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
                    className="absolute left-0 top-full mt-2 w-64 rounded-[16px] border border-[#e5e7eb] bg-white"
                  >
                    <div className="p-2">
                      {loanProducts.map((product) => (
                        <a
                          key={product.slug}
                          href={`/prestamos/${product.slug}`}
                          className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
                        >
                          <span className="text-lg">{product.icon}</span>
                          <span>Préstamo {product.name}</span>
                        </a>
                      ))}
                      <div className="mt-1 border-t border-[#e5e7eb] pt-1">
                        <a
                          href="/prestamos"
                          className="flex items-center justify-center rounded-[10px] px-3 py-2 text-sm font-semibold text-[#059669] transition-colors hover:bg-[rgba(202,255,4,0.15)]"
                        >
                          Ver todos los préstamos →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative flex items-center gap-1.5 rounded-[10px] px-4 py-2 text-sm font-medium transition-all duration-150 ${
                  activeLink === link.href
                    ? 'bg-[#CAFF04] text-[#111827] font-semibold'
                    : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* --- Right Side (desktop) --- */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/login"
              className="text-sm font-medium text-[#6b7280] transition-colors duration-150 hover:text-[#111827]"
            >
              Iniciar Sesión
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-5 py-2.5 text-sm font-semibold text-[#111827] transition-all duration-150 hover:bg-[#b8e600]"
            >
              Solicitar Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* --- Hamburger (mobile) --- */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#6b7280] transition-colors hover:bg-[#f3f4f6] lg:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* --- Mobile Overlay --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
          >
            {/* Spacer for navbar height */}
            <div className="h-20 shrink-0" />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-1 flex-col items-center justify-center gap-6 px-8"
            >
              <motion.a
                href="/seguros"
                onClick={() => setMobileOpen(false)}
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-2 font-heading text-2xl font-semibold text-[#059669] transition-colors hover:text-[#047857]"
              >
                Seguros
              </motion.a>
              <motion.a
                href="/prestamos"
                onClick={() => setMobileOpen(false)}
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-2 font-heading text-2xl font-semibold text-[#059669] transition-colors hover:text-[#047857]"
              >
                Préstamos
              </motion.a>
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-2 font-heading text-2xl font-semibold text-[#111827] transition-colors hover:text-[#059669]"
                >
                  {activeLink === link.href && (
                    <span className="h-2 w-2 rounded-full bg-[#CAFF04]" />
                  )}
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[#6b7280] transition-colors hover:text-[#111827]"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="/demo"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-8 py-3.5 text-base font-semibold text-[#111827] transition-all duration-150 hover:bg-[#b8e600]"
                >
                  Solicitar Demo
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
