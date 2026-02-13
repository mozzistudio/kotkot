'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Phone,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from 'lucide-react';

const COUNTRIES = [
  { code: 'PA', name: 'Panama', flag: '\u{1F1F5}\u{1F1E6}', phoneCode: '+507', currency: 'USD', paymentMethods: 'Yappy + Stripe' },
  { code: 'CO', name: 'Colombia', flag: '\u{1F1E8}\u{1F1F4}', phoneCode: '+57', currency: 'COP', paymentMethods: 'Stripe' },
  { code: 'MX', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', phoneCode: '+52', currency: 'MXN', paymentMethods: 'Stripe' },
  { code: 'CL', name: 'Chile', flag: '\u{1F1E8}\u{1F1F1}', phoneCode: '+56', currency: 'CLP', paymentMethods: 'Stripe' },
  { code: 'PE', name: 'Peru', flag: '\u{1F1F5}\u{1F1EA}', phoneCode: '+51', currency: 'PEN', paymentMethods: 'Stripe' },
  { code: 'EC', name: 'Ecuador', flag: '\u{1F1EA}\u{1F1E8}', phoneCode: '+593', currency: 'USD', paymentMethods: 'Stripe' },
  { code: 'CR', name: 'Costa Rica', flag: '\u{1F1E8}\u{1F1F7}', phoneCode: '+506', currency: 'CRC', paymentMethods: 'Stripe' },
  { code: 'DO', name: 'Rep. Dominicana', flag: '\u{1F1E9}\u{1F1F4}', phoneCode: '+1-809', currency: 'DOP', paymentMethods: 'Stripe' },
  { code: 'AR', name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', phoneCode: '+54', currency: 'ARS', paymentMethods: 'Stripe' },
  { code: 'BR', name: 'Brasil', flag: '\u{1F1E7}\u{1F1F7}', phoneCode: '+55', currency: 'BRL', paymentMethods: 'Stripe' },
] as const;

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$149',
    period: '/mes',
    features: ['500 conversaciones/mes', '1 linea WhatsApp', 'Soporte email'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$299',
    period: '/mes',
    features: ['2,000 conversaciones/mes', '3 lineas WhatsApp', 'Soporte prioritario'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contactar',
    period: '',
    features: ['Conversaciones ilimitadas', 'Lineas ilimitadas', 'Soporte dedicado'],
    popular: false,
  },
] as const;

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Debil', color: 'bg-red-400' };
  if (score <= 2) return { score, label: 'Regular', color: 'bg-orange-400' };
  if (score <= 3) return { score, label: 'Buena', color: 'bg-yellow-400' };
  if (score <= 4) return { score, label: 'Fuerte', color: 'bg-[#10b981]' };
  return { score, label: 'Muy fuerte', color: 'bg-[#059669]' };
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<(typeof COUNTRIES)[number] | null>(null);

  // Step 2 fields
  const [brokerageName, setBrokerageName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const step1Valid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    password.length >= 8 &&
    password === confirmPassword &&
    selectedCountry !== null;

  const step2Valid =
    brokerageName.trim() !== '' &&
    phone.trim() !== '' &&
    selectedPlan !== '' &&
    acceptTerms;

  const handleNext = () => {
    if (step1Valid) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step2Valid) return;
    setIsLoading(true);
    // Placeholder: would call Supabase auth + create profile
    console.log('Signup attempt:', {
      fullName,
      email,
      password,
      country: selectedCountry?.code,
      brokerageName,
      phone: selectedCountry ? `${selectedCountry.phoneCode} ${phone}` : phone,
      plan: selectedPlan,
    });
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-lg"
    >
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 sm:p-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#CAFF04]">
            <ShieldCheck className="w-6 h-6 text-[#111827]" />
          </div>
          <span className="font-heading text-2xl font-bold text-[#111827]">
            Coti<span className="text-[#10b981]">Facil</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#111827] text-center mb-2">Crea tu Cuenta</h1>
        <p className="text-sm text-[#6b7280] text-center mb-6">
          Comienza a automatizar tus cotizaciones de seguros
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 1
                  ? 'bg-[#CAFF04] text-[#111827]'
                  : 'bg-[#e5e7eb] text-[#9ca3af]'
              }`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-[#111827]' : 'text-[#9ca3af]'}`}>
              Datos personales
            </span>
          </div>
          <div className={`w-8 h-px transition-colors duration-300 ${step >= 2 ? 'bg-[#CAFF04]' : 'bg-[#e5e7eb]'}`} />
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 2
                  ? 'bg-[#CAFF04] text-[#111827]'
                  : 'bg-[#e5e7eb] text-[#9ca3af]'
              }`}
            >
              2
            </div>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-[#111827]' : 'text-[#9ca3af]'}`}>
              Tu correduria
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-sm font-medium text-[#111827]">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Juan Perez"
                      required
                      className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signup-email" className="text-sm font-medium text-[#111827]">
                    Correo electronico
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-email"
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
                  <label htmlFor="signup-password" className="text-sm font-medium text-[#111827]">
                    Contrasena
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimo 8 caracteres"
                      required
                      minLength={8}
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
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i < passwordStrength.score ? passwordStrength.color : 'bg-[#e5e7eb]'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#6b7280]">
                        Seguridad: <span className="font-medium">{passwordStrength.label}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm-password" className="text-sm font-medium text-[#111827]">
                    Confirmar contrasena
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite tu contrasena"
                      required
                      className={`w-full rounded-xl pl-10 pr-12 py-2.5 text-sm bg-white border text-[#111827] placeholder:text-[#9ca3af] focus:ring-2 focus:outline-none transition-all duration-200 ${
                        passwordsMismatch
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : passwordsMatch
                          ? 'border-[#CAFF04] focus:border-[#CAFF04] focus:ring-[#CAFF04]/20'
                          : 'border-[#e5e7eb] focus:border-[#CAFF04] focus:ring-[#CAFF04]/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6b7280] hover:text-[#111827] transition-colors"
                      aria-label={showConfirmPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordsMismatch && (
                    <p className="text-xs text-red-500">Las contrasenas no coinciden</p>
                  )}
                  {passwordsMatch && (
                    <p className="text-xs text-[#10b981] flex items-center gap-1">
                      <Check className="w-3 h-3" /> Las contrasenas coinciden
                    </p>
                  )}
                </div>

                {/* Country Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#111827]">Pais</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-left flex items-center justify-between transition-all duration-200 hover:bg-[#f9fafb] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none"
                    >
                      {selectedCountry ? (
                        <span className="text-[#111827]">
                          {selectedCountry.flag} {selectedCountry.name}
                        </span>
                      ) : (
                        <span className="text-[#9ca3af]">Selecciona tu pais</span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-[#6b7280] transition-transform duration-200 ${
                          countryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {countryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 top-full left-0 right-0 mt-1 rounded-xl bg-white border border-[#e5e7eb] max-h-60 overflow-y-auto"
                        >
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setCountryOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#f9fafb] transition-colors flex items-center gap-2 ${
                                selectedCountry?.code === country.code
                                  ? 'bg-[#CAFF04]/10 text-[#111827]'
                                  : 'text-[#111827]'
                              }`}
                            >
                              <span className="text-base">{country.flag}</span>
                              <span>{country.name}</span>
                              <span className="ml-auto text-xs text-[#6b7280]">{country.phoneCode}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Country Info Badge */}
                  {selectedCountry && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-white border border-[#e5e7eb]"
                    >
                      <Info className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                      <div className="text-xs text-[#6b7280] space-y-0.5">
                        <p>
                          <span className="font-medium">Moneda:</span> {selectedCountry.currency}
                        </p>
                        <p>
                          <span className="font-medium">Metodo de pago:</span> {selectedCountry.paymentMethods}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!step1Valid}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-[#111827] bg-[#CAFF04] hover:bg-[#b8e600] active:bg-[#a6d400] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Brokerage Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="brokerage" className="text-sm font-medium text-[#111827]">
                    Nombre de Correduria
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      id="brokerage"
                      type="text"
                      value={brokerageName}
                      onChange={(e) => setBrokerageName(e.target.value)}
                      placeholder="Mi Correduria de Seguros"
                      required
                      className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-[#111827]">
                    Telefono
                  </label>
                  <div className="relative flex gap-2">
                    <div className="flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] shrink-0">
                      <Phone className="w-4 h-4 text-[#6b7280]" />
                      <span>{selectedCountry?.phoneCode || '+1'}</span>
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="6000-0000"
                      required
                      className="w-full rounded-xl px-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#CAFF04] focus:ring-2 focus:ring-[#CAFF04]/20 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Plan Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#111827]">Plan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative rounded-xl p-3 text-left border transition-all duration-200 ${
                          selectedPlan === plan.id
                            ? 'border-[#CAFF04] bg-[#CAFF04]/10'
                            : 'border-[#e5e7eb] bg-white hover:bg-[#f9fafb]'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#111827] bg-[#CAFF04] px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                        <p className="font-heading font-bold text-sm text-[#111827]">{plan.name}</p>
                        <p className="font-data text-lg font-bold text-[#10b981] mt-1">
                          {plan.price}
                          <span className="text-xs font-normal text-[#6b7280]">{plan.period}</span>
                        </p>
                        <ul className="mt-2 space-y-1">
                          {plan.features.map((feature) => (
                            <li key={feature} className="text-[10px] text-[#6b7280] flex items-start gap-1">
                              <Check className="w-3 h-3 text-[#10b981] shrink-0 mt-px" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {selectedPlan === plan.id && (
                          <div className="absolute top-2 right-2">
                            <div className="w-5 h-5 rounded-full bg-[#CAFF04] flex items-center justify-center">
                              <Check className="w-3 h-3 text-[#111827]" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-md border-2 border-[#e5e7eb] bg-white peer-checked:border-[#CAFF04] peer-checked:bg-[#CAFF04] transition-all duration-200 flex items-center justify-center">
                      {acceptTerms && <Check className="w-3 h-3 text-[#111827]" />}
                    </div>
                  </div>
                  <span className="text-xs text-[#6b7280] leading-relaxed">
                    Acepto los{' '}
                    <Link href="/terms" className="text-[#10b981] hover:underline font-medium">
                      Terminos de Servicio
                    </Link>{' '}
                    y la{' '}
                    <Link href="/privacy" className="text-[#10b981] hover:underline font-medium">
                      Politica de Privacidad
                    </Link>
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[#111827] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Atras
                  </button>
                  <button
                    type="submit"
                    disabled={!step2Valid || isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-[#111827] bg-[#CAFF04] hover:bg-[#b8e600] active:bg-[#a6d400] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin" />
                    ) : null}
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-[#6b7280] mt-6">
          Ya tienes cuenta?{' '}
          <Link
            href="/login"
            className="text-[#10b981] hover:text-[#059669] font-semibold transition-colors"
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
