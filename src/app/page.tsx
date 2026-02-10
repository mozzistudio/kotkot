import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mes',
    features: [
      { label: 'Leads/mes', value: '50' },
      { label: 'WhatsApp', value: '1 número' },
      { label: 'Marca blanca', value: true },
      { label: 'Dashboard', value: 'Básico' },
      { label: 'Soporte', value: 'Email' },
      { label: 'Equipo', value: '1 usuario' },
    ],
    cta: 'Prueba gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: '/mes',
    features: [
      { label: 'Leads/mes', value: 'Ilimitados' },
      { label: 'WhatsApp', value: '3 números' },
      { label: 'Marca blanca', value: true },
      { label: 'Dashboard', value: 'Completo' },
      { label: 'Soporte', value: 'Prioritario' },
      { label: 'Equipo', value: '5 usuarios' },
    ],
    cta: 'Comenzar',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Contáctenos',
    period: '',
    features: [
      { label: 'Leads/mes', value: 'Ilimitados' },
      { label: 'WhatsApp', value: 'Ilimitados' },
      { label: 'Marca blanca', value: true },
      { label: 'Dashboard', value: 'Personalizado' },
      { label: 'Soporte', value: 'Dedicado' },
      { label: 'Equipo', value: 'Ilimitados' },
    ],
    cta: 'Contactar',
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦊</span>
            <span className="text-xl font-bold text-brand">CotiFácil</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
              Iniciar sesión
            </Link>
            <Link href="/register" className="text-sm font-medium bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
              Comenzar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Compara seguros en minutos, no en días
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              CotiFácil conecta a tus clientes con las mejores aseguradoras de Panamá a través de WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors">
                Comenzar gratis
              </Link>
              <Link href="/demo" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Ver demo
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 bg-slate-50 rounded-3xl border-4 border-slate-800 p-2 shadow-2xl">
              <div className="bg-brand rounded-t-2xl px-4 py-3">
                <p className="text-white text-sm font-medium">Seguros Pacífico</p>
                <p className="text-green-200 text-xs">en línea</p>
              </div>
              <div className="bg-[#ECE5DD] p-3 space-y-2 min-h-[280px] rounded-b-2xl">
                <div className="bg-white rounded-lg rounded-tl-none p-2.5 text-xs max-w-[85%] shadow-sm">
                  <p>¡Hola! 👋 Soy el asistente virtual. ¿Qué tipo de seguro necesitas?</p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2.5 text-xs max-w-[75%] ml-auto shadow-sm">
                  <p>Seguro de auto 🚗</p>
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-2.5 text-xs max-w-[85%] shadow-sm">
                  <p>¡Perfecto! Encontré 4 opciones para tu Toyota Corolla 2023 🔍</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🔗', title: 'Conecta', desc: 'Vincula tu número de WhatsApp en 5 minutos' },
              { emoji: '🤖', title: 'Compara', desc: 'Tu bot compara ofertas de 8+ aseguradoras al instante' },
              { emoji: '✅', title: 'Contrata', desc: 'Tu cliente elige, envía documentos, y tú cierras la venta' },
            ].map((step, i) => (
              <div key={i} className="text-center bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <span className="text-4xl">{step.emoji}</span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-white text-sm font-medium">
          <span>8 aseguradoras</span>
          <span className="opacity-50">·</span>
          <span>6 tipos de seguro</span>
          <span className="opacity-50">·</span>
          <span>100% automatizado</span>
          <span className="opacity-50">·</span>
          <span>Marca blanca incluida</span>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Planes y precios</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.highlighted
                    ? 'border-brand bg-brand/5 shadow-lg ring-2 ring-brand'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                      <span className="text-slate-600">
                        <span className="font-medium text-slate-900">{f.label}:</span>{' '}
                        {typeof f.value === 'boolean' ? 'Incluida' : f.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '#' : '/register'}
                  className={`mt-6 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-brand text-white hover:bg-brand-dark'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          CotiFácil — Panamá 🇵🇦 · © 2026
        </div>
      </footer>
    </div>
  );
}
