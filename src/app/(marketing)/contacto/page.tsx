'use client';

import { useState, type FormEvent } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 pt-32">
        <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] mx-auto max-w-lg p-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)]">
            <CheckCircle2 className="h-8 w-8 text-[var(--text-primary)]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            Mensaje enviado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            Gracias por contactarnos, {formData.nombre}. Te responderemos dentro
            de las próximas 24 horas.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--action-primary-hover)]"
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
            Estamos aquí para ti
            <span className="inline-block h-px w-10 bg-[var(--text-primary)]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Contáctanos
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Escríbenos y te
            responderemos lo más pronto posible.
          </p>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* --- Form (left) --- */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8 sm:p-10">
              <h2 className="mb-6 font-heading text-lg font-bold text-[var(--text-primary)]">
                Envíanos un mensaje
              </h2>
              <div className="flex flex-col gap-6">
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nombre"
                    className="text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[rgba(202,255,4,0.20)]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[var(--text-primary)]"
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
                    className="w-full rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[rgba(202,255,4,0.20)]"
                  />
                </div>

                {/* Asunto */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asunto"
                    className="text-sm font-medium text-[var(--text-primary)]"
                  >
                    Asunto *
                  </label>
                  <input
                    id="asunto"
                    name="asunto"
                    type="text"
                    required
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[rgba(202,255,4,0.20)]"
                  />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mensaje"
                    className="text-sm font-medium text-[var(--text-primary)]"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full resize-none rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[rgba(202,255,4,0.20)]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-8 py-3.5 text-base font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--action-primary-hover)] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
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
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* --- Contact Info (right) --- */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
              <h3 className="mb-6 font-heading text-lg font-bold text-[var(--text-primary)]">
                Información de contacto
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                    <Mail className="h-5 w-5 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Email
                    </p>
                    <a
                      href="mailto:support@kotkot.studio"
                      className="text-sm text-[var(--text-primary)] font-medium transition-colors hover:text-[var(--text-secondary)]"
                    >
                      support@kotkot.studio
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                    <MessageCircle className="h-5 w-5 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/50760000000"
                      className="text-sm text-[var(--text-primary)] font-medium transition-colors hover:text-[var(--text-secondary)]"
                    >
                      +507 6000-0000
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                    <Phone className="h-5 w-5 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Teléfono
                    </p>
                    <a
                      href="tel:+50720000000"
                      className="text-sm text-[var(--text-primary)] font-medium transition-colors hover:text-[var(--text-secondary)]"
                    >
                      +507 200-0000
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                    <MapPin className="h-5 w-5 text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Oficina
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Ciudad de Panamá, Panamá
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Calle 50, Torre Global Bank, Piso 30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="mt-6 bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6">
              <h4 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
                Horario de atención
              </h4>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Lunes a Viernes</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    8:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Sábados</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    9:00 AM - 1:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Domingos</span>
                  <span className="text-[var(--text-muted)]">Cerrado</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                Hora de Panamá (EST / UTC-5). Nuestro bot de WhatsApp está
                disponible 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
