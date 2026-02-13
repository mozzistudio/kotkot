import type { Metadata } from 'next';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Kotkot',
  description:
    'Noticias, guías y tendencias del mundo de seguros en LATAM. Aprende sobre insurtech, automatización y WhatsApp Business.',
};

const blogPosts = [
  {
    slug: 'ia-transformando-sector-asegurador-latam',
    title: 'Cómo la IA está transformando el sector asegurador en Latinoamérica',
    excerpt:
      'La inteligencia artificial está revolucionando la manera en que se venden, cotizan y gestionan seguros en toda la región. Desde chatbots en WhatsApp hasta suscripción automatizada, exploramos las tendencias más importantes.',
    category: 'Tendencias',
    categoryColor: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
    date: '8 Feb 2026',
    readTime: '7 min',
  },
  {
    slug: '5-razones-automatizar-correduria',
    title: '5 razones para automatizar tu correduría de seguros',
    excerpt:
      'La automatización no es solo para grandes empresas. Descubre por qué los corredores independientes y las pequeñas corredurías son quienes más se benefician de herramientas como Kotkot.',
    category: 'Guías',
    categoryColor: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
    date: '3 Feb 2026',
    readTime: '5 min',
  },
  {
    slug: 'whatsapp-business-api-guia-corredores',
    title: 'WhatsApp Business API: Guía completa para corredores de seguros',
    excerpt:
      'Todo lo que necesitas saber sobre la WhatsApp Business API: cómo funciona, cuánto cuesta, cómo obtener acceso y las mejores prácticas para usarla en tu correduría.',
    category: 'Guías',
    categoryColor: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
    date: '28 Ene 2026',
    readTime: '10 min',
  },
  {
    slug: 'comparativa-seguros-auto-panama-2026',
    title: 'Comparativa: Seguros de auto en Panamá 2026',
    excerpt:
      'Analizamos las coberturas, precios y beneficios de las principales aseguradoras de auto en Panamá. ASSA, Mapfre, Generali y SURA comparados lado a lado.',
    category: 'Comparativas',
    categoryColor: 'bg-amber-100 text-amber-700',
    date: '20 Ene 2026',
    readTime: '8 min',
  },
  {
    slug: 'futuro-insurtech-latam',
    title: 'El futuro del insurtech en LATAM',
    excerpt:
      'El ecosistema insurtech en Latinoamérica está creciendo aceleradamente. Analizamos las startups más importantes, las tendencias de inversión y lo que viene para el sector.',
    category: 'Tendencias',
    categoryColor: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
    date: '15 Ene 2026',
    readTime: '6 min',
  },
  {
    slug: 'elegir-mejor-seguro-salud-clientes',
    title: 'Cómo elegir el mejor seguro de salud para tus clientes',
    excerpt:
      'Guía práctica para corredores: los factores clave para recomendar el seguro de salud ideal según el perfil, presupuesto y necesidades de cada cliente.',
    category: 'Guías',
    categoryColor: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
    date: '10 Ene 2026',
    readTime: '9 min',
  },
];

export default function BlogPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#059669]">
            Recursos
            <span className="inline-block h-px w-10 bg-[#059669]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Blog Kotkot
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#6b7280] sm:text-xl">
            Noticias, guías y tendencias del mundo de seguros en LATAM
          </p>
        </div>

        {/* --- Blog Grid --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-[#e5e7eb] rounded-[16px] group flex flex-col overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]">
                <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-white/80 shadow-sm">
                  <span className="font-heading text-2xl font-bold text-[#059669]">
                    CF
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Category badge + meta */}
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#9ca3af]">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-heading text-lg font-semibold leading-snug text-[#111827] transition-colors group-hover:text-[#059669]">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b7280] line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-[#e5e7eb] pt-4">
                  <span className="text-xs text-[#9ca3af]">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#059669] transition-transform group-hover:translate-x-0.5">
                    Leer más
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- Newsletter CTA --- */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-10">
            <h2 className="font-heading text-2xl font-bold text-[#111827]">
              Suscríbete a nuestro newsletter
            </h2>
            <p className="mt-3 text-base text-[#6b7280]">
              Recibe las últimas noticias y guías sobre seguros e insurtech en
              LATAM directamente en tu inbox.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-[16px] border border-[#e5e7eb] bg-white px-5 py-3 text-sm text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[rgba(5,150,105,0.20)] sm:max-w-xs"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-6 py-3 text-sm font-semibold text-[#111827] transition-all duration-200 hover:bg-[#b8e600]">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
