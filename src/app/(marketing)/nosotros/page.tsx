import type { Metadata } from 'next';
import {
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Globe,
  Users,
  Target,
  ArrowUpRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros — CotiFácil',
  description:
    'Conoce la misión, visión y equipo detrás de CotiFácil. Democratizamos el acceso a seguros en Latinoamérica a través de la tecnología.',
};

const values = [
  {
    icon: Lightbulb,
    title: 'Innovación',
    description:
      'Utilizamos inteligencia artificial de vanguardia para resolver problemas reales del sector asegurador. Cada feature que lanzamos nace de necesidades reales de corredores.',
  },
  {
    icon: ShieldCheck,
    title: 'Confianza',
    description:
      'Manejamos datos sensibles de miles de clientes. La seguridad y privacidad no son opcionales: son la base de todo lo que construimos.',
  },
  {
    icon: Sparkles,
    title: 'Simplicidad',
    description:
      'La tecnología debe simplificar, no complicar. Diseñamos herramientas que cualquier corredor puede usar sin capacitación técnica.',
  },
  {
    icon: Globe,
    title: 'Impacto Regional',
    description:
      'Pensamos en toda Latinoamérica. Cada decisión considera las diferencias regulatorias, culturales y de mercado de cada país donde operamos.',
  },
];

const countries = [
  { name: 'Panamá', flag: '\u{1F1F5}\u{1F1E6}', status: 'Operativo' },
  { name: 'Colombia', flag: '\u{1F1E8}\u{1F1F4}', status: 'Operativo' },
  { name: 'México', flag: '\u{1F1F2}\u{1F1FD}', status: 'Operativo' },
  { name: 'Chile', flag: '\u{1F1E8}\u{1F1F1}', status: 'Operativo' },
  { name: 'Perú', flag: '\u{1F1F5}\u{1F1EA}', status: 'Operativo' },
  { name: 'Ecuador', flag: '\u{1F1EA}\u{1F1E8}', status: 'Operativo' },
  { name: 'Costa Rica', flag: '\u{1F1E8}\u{1F1F7}', status: 'Operativo' },
  { name: 'Rep. Dominicana', flag: '\u{1F1E9}\u{1F1F4}', status: 'Operativo' },
  { name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', status: 'Operativo' },
  { name: 'Brasil', flag: '\u{1F1E7}\u{1F1F7}', status: 'Operativo' },
];

const teamMembers = [
  {
    name: 'Nombre del Fundador',
    role: 'CEO & Co-Founder',
    bio: 'Ex-ejecutivo de seguros con 15 años de experiencia en el sector asegurador de LATAM.',
  },
  {
    name: 'Nombre del CTO',
    role: 'CTO & Co-Founder',
    bio: 'Ingeniero de software con experiencia en IA conversacional y plataformas B2B SaaS.',
  },
  {
    name: 'Nombre del COO',
    role: 'COO',
    bio: 'Especialista en operaciones y expansión de startups en mercados latinoamericanos.',
  },
  {
    name: 'Nombre del CPO',
    role: 'Head of Product',
    bio: 'Diseñador de producto con background en fintech e insurtech, enfocado en UX para LATAM.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Nuestra historia
            <span className="inline-block h-px w-10 bg-emerald-400" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Sobre CotiFácil
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Estamos construyendo el futuro de los seguros en Latinoamérica, un
            mensaje de WhatsApp a la vez.
          </p>
        </div>

        {/* --- Mission --- */}
        <section className="mb-24">
          <div className="glass-card mx-auto max-w-4xl p-10 text-center sm:p-14">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
              <Target className="h-7 w-7 text-emerald-600" />
            </div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Nuestra Misión
            </h2>
            <p className="mt-4 font-heading text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              Democratizar el acceso a seguros en Latinoamérica a través de la
              tecnología.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              Creemos que cada persona en Latinoamérica merece acceso a seguros
              de calidad. Y creemos que los corredores de seguros, con las
              herramientas adecuadas, son quienes mejor pueden llevar esa
              protección a cada rincón de la región.
            </p>
          </div>
        </section>

        {/* --- Vision --- */}
        <section className="mb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Nuestra Visión
              </h2>
              <h3 className="mt-3 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                Un corredor de seguros en cada bolsillo
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Imaginamos un futuro donde cualquier persona puede cotizar,
                comparar y comprar seguros desde su WhatsApp, con la misma
                confianza que si estuviera hablando con un corredor experto.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Nuestra visión es ser la plataforma de tecnología de seguros
                líder en Latinoamérica, potenciando a miles de corredores con
                inteligencia artificial para proteger a millones de familias y
                negocios.
              </p>
            </div>
            <div className="glass-card flex aspect-[4/3] items-center justify-center p-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                  <Globe className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-slate-400">
                  Ilustración de visión
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Values --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Nuestros Valores
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
              Lo que nos guía
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                  <value.icon
                    className="h-6 w-6 text-emerald-600"
                    strokeWidth={1.8}
                  />
                </div>
                <h4 className="font-heading text-lg font-semibold text-slate-900">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Team --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Nuestro Equipo
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
              Las personas detrás de CotiFácil
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="glass-card flex flex-col items-center p-6 text-center"
              >
                {/* Avatar placeholder */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-heading text-base font-semibold text-slate-900">
                  {member.name}
                </h4>
                <p className="text-sm font-medium text-emerald-600">
                  {member.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Countries --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Presencia Regional
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
              Operamos en 10 países de Latinoamérica
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {countries.map((country) => (
              <div
                key={country.name}
                className="glass-card flex flex-col items-center px-4 py-5 text-center"
              >
                <span className="text-3xl">{country.flag}</span>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {country.name}
                </p>
                <span className="mt-1 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  {country.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Únete a nuestra misión
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sé parte de la revolución insurtech en Latinoamérica. Empieza a
            vender seguros por WhatsApp con CotiFácil.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Solicitar Demo
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-8 py-4 text-lg font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-50"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
