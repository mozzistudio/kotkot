'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Field, FieldError, FieldGroup, ValidationSummary } from '@/components/ui/Field';

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

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md"
    >
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-page)] p-8 sm:p-10">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-action-primary-bg)]">
            <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
              <path d="M9 6v20" stroke="var(--color-text-primary)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10-10" stroke="var(--color-text-primary)" strokeWidth="3" strokeLinecap="round" />
              <path d="M9 16l10 10" stroke="var(--color-text-primary)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-heading text-[var(--type-heading-md)] font-bold text-[var(--color-text-primary)]">
            kotkot<span className="font-normal text-[var(--color-text-muted)]">.ai</span>
          </span>
        </div>

        <h1 className="mb-2 text-center text-[var(--type-heading-md)] font-bold text-[var(--color-text-primary)]">Iniciar sesión</h1>
        <p className="mb-8 text-center text-[var(--type-body-sm)] text-[var(--color-text-secondary)]">
          Ingresa a tu cuenta para gestionar tus cotizaciones.
        </p>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                label="Correo electrónico"
                icon={<Mail className="h-4 w-4" />}
              />
            </Field>

            <Field>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  label="Contraseña"
                  icon={<Lock className="h-4 w-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-[42px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            {error && (
              <ValidationSummary>
                <FieldError id="login-error">{error}</FieldError>
              </ValidationSummary>
            )}

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-[var(--type-body-sm)] font-medium text-[var(--color-action-tertiary-fg)] hover:text-[var(--color-text-primary)]">
                Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </FieldGroup>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--color-border-default)]" />
          <span className="text-[var(--type-body-sm)] text-[var(--color-text-muted)]">o continúa con</span>
          <div className="h-px flex-1 bg-[var(--color-border-default)]" />
        </div>

        <Button type="button" onClick={handleGoogleLogin} variant="secondary" className="w-full gap-3">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="var(--color-brand-google-blue)"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="var(--color-brand-google-green)"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="var(--color-brand-google-yellow)"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="var(--color-brand-google-red)"
            />
          </svg>
          Continuar con Google
        </Button>

        <p className="mt-8 text-center text-[var(--type-body-sm)] text-[var(--color-text-secondary)]">
          No tienes cuenta?{' '}
          <Link href="/signup" className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-action-tertiary-fg)]">
            Crear cuenta
          </Link>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-page)] p-4"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-action-primary-bg)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-text-primary)]" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-[var(--type-body-sm)] font-semibold text-[var(--color-text-primary)]">Credenciales de prueba</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--color-text-secondary)]" />
                <code className="rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-panel)] px-2 py-1 text-[var(--type-label-sm)] text-[var(--color-text-primary)]">
                  demo@kotkot.ai
                </code>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--color-text-secondary)]" />
                <code className="rounded-[var(--radius-sm)] border border-[var(--color-border-default)] bg-[var(--color-surface-panel)] px-2 py-1 text-[var(--type-label-sm)] text-[var(--color-text-primary)]">
                  demo123456
                </code>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
