'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Shield } from 'lucide-react';

const navLinks = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Cómo Funciona', href: '#como-funciona' },
  { label: 'Precios', href: '#precios' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#funcionalidades');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/40 bg-white/50 px-5 py-3 backdrop-blur-xl transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.08)]' : 'shadow-none'
          }`}
        >
          {/* --- Logo --- */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/25 transition-transform duration-200 group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
              Coti<span className="text-emerald-600">Fácil</span>
            </span>
          </a>

          {/* --- Center Nav Pill (desktop) --- */}
          <div className="hidden items-center gap-1 rounded-full border border-white/40 bg-white/40 px-2 py-1.5 backdrop-blur-md lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeLink === link.href
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-dot"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* --- Right Side (desktop) --- */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/login"
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
            >
              Iniciar Sesión
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110 active:brightness-95"
            >
              Solicitar Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* --- Hamburger (mobile) --- */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-white/60 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Spacer for navbar height */}
            <div className="h-24 shrink-0" />

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
                  className="flex items-center gap-2 font-heading text-2xl font-semibold text-slate-800 transition-colors hover:text-emerald-600"
                >
                  {activeLink === link.href && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
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
                  className="text-base font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="/demo"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40"
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
