'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md"
    >
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8 sm:p-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-button)] bg-[var(--accent)]">
            <svg viewBox="0 0 32 32" fill="none" className="h-[22px] w-[22px]">
              <path d="M9 6v20" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10-10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10 10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            kotkot<span className="font-normal text-[var(--text-muted)]">.ai</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-2">Iniciar Sesion</h1>
        <p className="text-sm text-[var(--text-secondary)] text-center mb-8">
          Ingresa a tu cuenta para gestionar tus cotizaciones
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">
              Correo electronico
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-secondary)]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full rounded-[var(--radius-md)] pl-10 pr-4 py-2.5 text-sm bg-white border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[var(--text-primary)]">
              Contrasena
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-secondary)]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contrasena"
                required
                className="w-full rounded-[var(--radius-md)] pl-10 pr-12 py-2.5 text-sm bg-white border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-[var(--radius-md)] bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--dark-blue)] hover:text-[var(--text-primary)] font-medium transition-colors"
            >
              Olvidaste tu contrasena?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] bg-[var(--action-primary-bg)] hover:bg-[var(--action-primary-hover)] active:bg-[var(--action-primary-hover)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[var(--text-primary)]/30 border-t-[var(--text-primary)] rounded-full animate-spin" />
            ) : null}
            {isLoading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border-default)]" />
          <span className="text-sm text-[var(--text-muted)] font-medium">o continua con</span>
          <div className="flex-1 h-px bg-[var(--border-default)]" />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full inline-flex items-center justify-center gap-3 rounded-[var(--radius-md)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] border border-[var(--border-default)] bg-white hover:bg-[var(--surface-panel)] hover:border-[var(--border-strong)] transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar con Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-[var(--text-secondary)] mt-8">
          No tienes cuenta?{' '}
          <Link
            href="/signup"
            className="text-[var(--dark-blue)] hover:text-[var(--text-primary)] font-semibold transition-colors"
          >
            Crear cuenta
          </Link>
        </p>
      </div>

      {/* Test Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-white p-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)]">
            <ShieldCheck className="h-4 w-4 text-[var(--text-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              Credenciales de Prueba
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <code className="text-xs font-mono text-[var(--text-primary)] bg-[var(--surface-panel)] border border-[var(--border-default)] px-2 py-1 rounded">
                  demo@kotkot.ai
                </code>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <code className="text-xs font-mono text-[var(--text-primary)] bg-[var(--surface-panel)] border border-[var(--border-default)] px-2 py-1 rounded">
                  demo123456
                </code>
              </div>
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Usa estas credenciales para explorar la plataforma
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
