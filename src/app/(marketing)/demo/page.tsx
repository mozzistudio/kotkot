'use client';

import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Send,
  Shield,
  Clock,
  Zap,
  Globe,
  HeadphonesIcon,
} from 'lucide-react';

const countries = [
  { code: 'PA', name: 'Panamá', flag: '\u{1F1F5}\u{1F1E6}' },
  { code: 'CO', name: 'Colombia', flag: '\u{1F1E8}\u{1F1F4}' },
  { code: 'MX', name: 'México', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'CL', name: 'Chile', flag: '\u{1F1E8}\u{1F1F1}' },
  { code: 'PE', name: 'Perú', flag: '\u{1F1F5}\u{1F1EA}' },
  { code: 'EC', name: 'Ecuador', flag: '\u{1F1EA}\u{1F1E8}' },
  { code: 'CR', name: 'Costa Rica', flag: '\u{1F1E8}\u{1F1F7}' },
  { code: 'DO', name: 'Rep. Dominicana', flag: '\u{1F1E9}\u{1F1F4}' },
  { code: 'AR', name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}' },
  { code: 'BR', name: 'Brasil', flag: '\u{1F1E7}\u{1F1F7}' },
];

const teamSizes = ['1-5', '6-20', '20+'];

const benefits = [
  {
    icon: Zap,
    text: 'Demo personalizada con datos reales de tu mercado',
  },
  {
    icon: Clock,
    text: 'Sesión de 30 minutos con un especialista en insurtech',
  },
  {
    icon: Shield,
    text: 'Sin compromiso, sin tarjeta de crédito',
  },
  {
    icon: Globe,
    text: 'Disponible en 10 países de Latinoamérica',
  },
  {
    icon: HeadphonesIcon,
    text: 'Soporte en español para toda la configuración',
  },
];

export default function DemoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    correduria: '',
    equipo: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 pt-32">
        <div className="glass-card mx-auto max-w-lg p-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            Solicitud recibida
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Gracias, {formData.nombre}. Nuestro equipo te contactará dentro de
            las próximas 24 horas para agendar tu demo personalizada.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Demo gratuita
            <span className="inline-block h-px w-10 bg-emerald-400" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Solicita tu Demo Personalizada
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Te mostramos cómo CotiFácil puede transformar tu correduría en 30
            minutos.
          </p>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* --- Form (left, wider) --- */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nombre"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@correduria.com"
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="telefono"
                    className="text-sm font-medium text-gray-700"
                  >
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+507 6000-0000"
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>

                {/* País */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="pais"
                    className="text-sm font-medium text-gray-700"
                  >
                    País *
                  </label>
                  <select
                    id="pais"
                    name="pais"
                    required
                    value={formData.pais}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  >
                    <option value="">Selecciona tu país</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Correduría */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="correduria"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre de Correduría *
                  </label>
                  <input
                    id="correduria"
                    name="correduria"
                    type="text"
                    required
                    value={formData.correduria}
                    onChange={handleChange}
                    placeholder="Mi Correduría S.A."
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>

                {/* Equipo */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="equipo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Corredores en tu equipo *
                  </label>
                  <select
                    id="equipo"
                    name="equipo"
                    required
                    value={formData.equipo}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  >
                    <option value="">Selecciona</option>
                    {teamSizes.map((size) => (
                      <option key={size} value={size}>
                        {size} corredores
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="mensaje"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mensaje{' '}
                    <span className="text-gray-400">(opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos más sobre tu correduría y lo que te gustaría ver en la demo..."
                    className="w-full resize-none rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Solicitar Demo
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* --- Benefits (right, narrower) --- */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Lo que incluye tu demo
              </h3>
              <ul className="mt-6 space-y-5">
                {benefits.map((benefit) => (
                  <li key={benefit.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      <benefit.icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm leading-relaxed text-slate-700">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badge */}
            <div className="mt-6 glass-card-subtle p-6 text-center">
              <p className="text-sm font-medium text-slate-700">
                Más de 500 corredurías confían en CotiFácil
              </p>
              <p className="mt-1 text-xs text-slate-500">
                en 10 países de Latinoamérica
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
