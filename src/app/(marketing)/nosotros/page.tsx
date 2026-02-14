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
  title: 'Sobre Nosotros — Kotkot',
  description:
    'Conoce la misión, visión y equipo detrás de Kotkot. Democratizamos el acceso a seguros en Latinoamérica a través de la tecnología.',
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
            Nuestra historia
            <span className="inline-block h-px w-10 bg-[var(--text-primary)]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Sobre Kotkot
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Estamos construyendo el futuro de los seguros en Latinoamérica, un
            mensaje de WhatsApp a la vez.
          </p>
        </div>

        {/* --- Mission --- */}
        <section className="mb-24">
          <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] mx-auto max-w-4xl p-10 text-center sm:p-14">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)]">
              <Target className="h-7 w-7 text-[var(--text-primary)]" />
            </div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Nuestra Misión
            </h2>
            <p className="mt-4 font-heading text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-3xl">
              Democratizar el acceso a seguros en Latinoamérica a través de la
              tecnología.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
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
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Nuestra Visión
              </h2>
              <h3 className="mt-3 font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                Un corredor de seguros en cada bolsillo
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                Imaginamos un futuro donde cualquier persona puede cotizar,
                comparar y comprar seguros desde su WhatsApp, con la misma
                confianza que si estuviera hablando con un corredor experto.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                Nuestra visión es ser la plataforma de tecnología de seguros
                líder en Latinoamérica, potenciando a miles de corredores con
                inteligencia artificial para proteger a millones de familias y
                negocios.
              </p>
            </div>
            <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] flex aspect-[4/3] items-center justify-center p-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)] shadow-lg shadow-[rgba(202,255,4,0.25)]">
                  <Globe className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-[var(--text-muted)]">
                  Ilustración de visión
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Values --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Nuestros Valores
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Lo que nos guía
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                  <value.icon
                    className="h-6 w-6 text-[var(--text-primary)]"
                    strokeWidth={1.8}
                  />
                </div>
                <h4 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Team --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Nuestro Equipo
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Las personas detrás de Kotkot
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] flex flex-col items-center p-6 text-center"
              >
                {/* Avatar placeholder */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                  <Users className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h4 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                  {member.name}
                </h4>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {member.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Countries --- */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Presencia Regional
            </h2>
            <h3 className="mt-3 font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Operamos en 10 países de Latinoamérica
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {countries.map((country) => (
              <div
                key={country.name}
                className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] flex flex-col items-center px-4 py-5 text-center"
              >
                <span className="text-3xl">{country.flag}</span>
                <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                  {country.name}
                </p>
                <span className="mt-1 inline-flex items-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-primary)]">
                  {country.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Únete a nuestra misión
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Sé parte de la revolución insurtech en Latinoamérica. Empieza a
            vender seguros por WhatsApp con Kotkot.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] shadow-xl shadow-[rgba(202,255,4,0.25)] transition-all duration-200 hover:shadow-[rgba(202,255,4,0.4)] hover:brightness-110"
            >
              Solicitar Demo
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-white border border-[var(--border-default)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--surface-hover)]"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
