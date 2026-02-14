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
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 sm:p-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#CAFF04]">
            <ShieldCheck className="w-6 h-6 text-[#111827]" />
          </div>
          <span className="font-heading text-2xl font-bold text-[#111827]">
            kotkot<span className="text-[#111827]">.ai</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#111827] text-center mb-2">Iniciar Sesion</h1>
        <p className="text-sm text-[#6b7280] text-center mb-8">
          Ingresa a tu cuenta para gestionar tus cotizaciones
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[#111827]">
              Correo electronico
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[#111827]">
              Contrasena
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contrasena"
                required
                className="w-full rounded-xl pl-10 pr-12 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6b7280] hover:text-[#111827] transition-colors"
                aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#059669] hover:text-[#111827] font-medium transition-colors"
            >
              Olvidaste tu contrasena?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-[#111827] bg-[#CAFF04] hover:bg-[#b8e600] active:bg-[#a6d400] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin" />
            ) : null}
            {isLoading ? 'Iniciando sesion...' : 'Iniciar Sesion'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#e5e7eb]" />
          <span className="text-sm text-[#9ca3af] font-medium">o continua con</span>
          <div className="flex-1 h-px bg-[#e5e7eb]" />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-[#111827] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] hover:border-[#d1d5db] transition-all duration-200"
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
        <p className="text-center text-sm text-[#6b7280] mt-8">
          No tienes cuenta?{' '}
          <Link
            href="/signup"
            className="text-[#059669] hover:text-[#111827] font-semibold transition-colors"
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
        className="mt-6 rounded-xl border border-[#e5e7eb] bg-white p-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#CAFF04]">
            <ShieldCheck className="h-4 w-4 text-[#111827]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#111827] mb-2">
              Credenciales de Prueba
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#6b7280]" />
                <code className="text-xs font-mono text-[#111827] bg-[#f9fafb] border border-[#e5e7eb] px-2 py-1 rounded">
                  demo@kotkot.ai
                </code>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#6b7280]" />
                <code className="text-xs font-mono text-[#111827] bg-[#f9fafb] border border-[#e5e7eb] px-2 py-1 rounded">
                  demo123456
                </code>
              </div>
            </div>
            <p className="mt-2 text-xs text-[#6b7280]">
              Usa estas credenciales para explorar la plataforma
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
