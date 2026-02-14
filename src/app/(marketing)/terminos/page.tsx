import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio — Kotkot',
  description:
    'Términos y condiciones de uso de la plataforma Kotkot. Conoce tus derechos y obligaciones al usar nuestros servicios.',
};

export default function TerminosPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-4xl">
        {/* --- Header --- */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            Términos de Servicio
          </h1>
          <p className="mt-4 text-base text-[#9ca3af]">
            Última actualización: 1 de febrero de 2026
          </p>
        </div>

        {/* --- Content --- */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 sm:p-12">
          <div className="prose-sm space-y-8 text-[#6b7280]">
            {/* Intro */}
            <section>
              <p className="text-base leading-relaxed">
                Estos Términos de Servicio (&quot;Términos&quot;) regulan el
                acceso y uso de la plataforma Kotkot (&quot;la
                Plataforma&quot;), operada por Kotkot Inc.
                (&quot;nosotros&quot;, &quot;nuestro&quot;). Al acceder o
                utilizar nuestros servicios, aceptas estos Términos en su
                totalidad. Si no estás de acuerdo, no utilices la Plataforma.
              </p>
            </section>

            {/* 1. Aceptación de los Términos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                1. Aceptación de los Términos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Al registrarte en Kotkot, acceder a nuestro dashboard,
                utilizar nuestro agente de WhatsApp, o hacer uso de cualquiera
                de nuestros servicios, declaras que:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Eres mayor de 18 años.</li>
                <li>
                  Tienes la capacidad legal para celebrar este acuerdo en nombre
                  propio o de la empresa que representas.
                </li>
                <li>
                  Eres un corredor de seguros autorizado o representante de una
                  correduría legalmente establecida en tu país de operación.
                </li>
                <li>
                  Cumplirás con todas las leyes y regulaciones aplicables al
                  sector asegurador en tu jurisdicción.
                </li>
              </ul>
            </section>

            {/* 2. Descripción del Servicio */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                2. Descripción del Servicio
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Kotkot es una plataforma de tecnología (SaaS) que permite a
                corredores de seguros en Latinoamérica:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Desplegar un agente de inteligencia artificial en WhatsApp
                  Business para atender clientes y generar cotizaciones de
                  seguros automáticamente.
                </li>
                <li>
                  Conectar APIs de aseguradoras para obtener cotizaciones en
                  tiempo real.
                </li>
                <li>
                  Procesar pagos a través de integraciones con Yappy (Panamá)
                  y Stripe.
                </li>
                <li>
                  Gestionar clientes, cotizaciones, pólizas y comisiones a
                  través de un dashboard web.
                </li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                Kotkot no es una aseguradora ni una correduría de seguros.
                Somos un proveedor de tecnología que facilita las operaciones
                de corredurías existentes. La responsabilidad sobre las pólizas,
                coberturas y relaciones con clientes finales recae
                exclusivamente sobre el corredor o correduría que utiliza
                nuestra plataforma.
              </p>
            </section>

            {/* 3. Registro y Cuenta */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                3. Registro y Cuenta
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Debes proporcionar información veraz, completa y actualizada
                  al registrarte.
                </li>
                <li>
                  Eres responsable de mantener la confidencialidad de tus
                  credenciales de acceso.
                </li>
                <li>
                  Debes notificarnos inmediatamente si sospechas de un acceso no
                  autorizado a tu cuenta.
                </li>
                <li>
                  No puedes compartir tu cuenta con terceros ni permitir que
                  otros accedan a tu cuenta sin autorización.
                </li>
                <li>
                  Nos reservamos el derecho de suspender o cancelar cuentas que
                  violen estos Términos.
                </li>
              </ul>
            </section>

            {/* 4. Planes y Pagos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                4. Planes y Pagos
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Los precios de nuestros planes están publicados en nuestra
                  página de precios y pueden ser modificados con previo aviso
                  de 30 días.
                </li>
                <li>
                  La facturación es mensual o anual, según el plan seleccionado.
                  El pago se realiza de forma anticipada.
                </li>
                <li>
                  Las tarifas de mensajes de WhatsApp (cobradas por Meta) son
                  independientes y se facturan por separado, al costo.
                </li>
                <li>
                  Los pagos procesados a través de la plataforma (cobros a
                  clientes finales) están sujetos a las comisiones del
                  procesador de pago (Stripe, Yappy).
                </li>
                <li>
                  En caso de falta de pago, nos reservamos el derecho de
                  suspender el acceso a la plataforma tras un periodo de
                  gracia de 7 días.
                </li>
                <li>
                  No ofrecemos reembolsos por periodos parciales. Puedes
                  cancelar tu suscripción en cualquier momento, y tu acceso
                  continuará hasta el final del periodo pagado.
                </li>
              </ul>
            </section>

            {/* 5. Uso Aceptable */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                5. Uso Aceptable
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Al utilizar Kotkot, te comprometes a:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Usar la plataforma exclusivamente para operaciones legítimas
                  de correduría de seguros.
                </li>
                <li>
                  Cumplir con las regulaciones de la Superintendencia de Seguros
                  (o entidad equivalente) de tu país.
                </li>
                <li>
                  No enviar spam, mensajes no solicitados ni contenido abusivo
                  a través del agente de WhatsApp.
                </li>
                <li>
                  Cumplir con las políticas de uso de WhatsApp Business Platform
                  de Meta.
                </li>
                <li>
                  No intentar acceder a datos de otros usuarios de la plataforma.
                </li>
                <li>
                  No realizar ingeniería inversa, descompilar o intentar extraer
                  el código fuente de la plataforma.
                </li>
                <li>
                  No utilizar la plataforma para actividades ilegales, incluido
                  el lavado de dinero o el fraude de seguros.
                </li>
              </ul>
            </section>

            {/* 6. Propiedad Intelectual */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                6. Propiedad Intelectual
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                La plataforma Kotkot, incluyendo su software, diseño,
                logotipos, modelos de IA, y contenido, son propiedad exclusiva
                de Kotkot Inc. y están protegidos por leyes de propiedad
                intelectual.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                Te otorgamos una licencia limitada, no exclusiva, no
                transferible y revocable para utilizar la plataforma según el
                plan contratado. Esta licencia no te confiere ningún derecho
                de propiedad sobre la plataforma.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                Tus datos, configuraciones de agente y contenido personalizado
                permanecen como tu propiedad. Nos otorgas una licencia para
                procesar dichos datos exclusivamente para proporcionarte el
                servicio.
              </p>
            </section>

            {/* 7. Limitación de Responsabilidad */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                7. Limitación de Responsabilidad
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Kotkot proporciona la plataforma &quot;tal cual&quot; y
                  &quot;según disponibilidad&quot;, sin garantías de ningún
                  tipo, expresas o implícitas.
                </li>
                <li>
                  No somos responsables de la exactitud de las cotizaciones
                  generadas por las APIs de aseguradoras. Las cotizaciones son
                  informativas y están sujetas a verificación por parte de cada
                  aseguradora.
                </li>
                <li>
                  No somos responsables de la emisión, validez o cumplimiento
                  de pólizas de seguros. La relación contractual de seguros es
                  entre la aseguradora, el corredor y el cliente final.
                </li>
                <li>
                  Nuestra responsabilidad total ante ti no excederá el monto
                  pagado por tu suscripción en los últimos 12 meses.
                </li>
                <li>
                  No seremos responsables por daños indirectos, incidentales,
                  especiales, consecuentes o punitivos.
                </li>
                <li>
                  No garantizamos disponibilidad ininterrumpida del servicio,
                  aunque nos esforzamos por mantener un uptime superior al
                  99.9%.
                </li>
              </ul>
            </section>

            {/* 8. Suspensión y Terminación */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                8. Suspensión y Terminación
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Podemos suspender o terminar tu acceso a la plataforma si:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Violas estos Términos de Servicio.</li>
                <li>No realizas el pago de tu suscripción.</li>
                <li>Usas la plataforma para fines ilegales o no autorizados.</li>
                <li>
                  Tu cuenta es reportada por actividad sospechosa o abusiva.
                </li>
                <li>Lo requiera una orden judicial o autoridad regulatoria.</li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                Puedes cancelar tu cuenta en cualquier momento desde el
                dashboard. Tras la cancelación:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Tu acceso continuará hasta el final del periodo de
                  facturación actual.
                </li>
                <li>
                  Podrás exportar tus datos durante un periodo de 30 días
                  tras la cancelación.
                </li>
                <li>
                  Después de 30 días, tus datos serán eliminados de nuestros
                  sistemas, salvo aquellos que debamos conservar por
                  obligaciones legales.
                </li>
              </ul>
            </section>

            {/* 9. Indemnización */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                9. Indemnización
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Aceptas indemnizar y mantener indemne a Kotkot, sus
                directores, empleados y agentes, de cualquier reclamación,
                daño, pérdida o gasto (incluyendo honorarios legales) que
                surja de tu uso de la plataforma, tu violación de estos
                Términos, o tu violación de los derechos de terceros.
              </p>
            </section>

            {/* 10. Modificaciones */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                10. Modificaciones a los Términos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos en
                cualquier momento. Los cambios significativos serán notificados
                con al menos 30 días de anticipación a través de nuestra
                plataforma o por email. El uso continuado de la plataforma
                después de la fecha de entrada en vigor de los cambios
                constituye tu aceptación de los Términos modificados.
              </p>
            </section>

            {/* 11. Ley Aplicable */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                11. Ley Aplicable y Jurisdicción
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Estos Términos se rigen por las leyes de la República de
                Panamá. Cualquier controversia que surja en relación con
                estos Términos será sometida a la jurisdicción exclusiva de
                los tribunales de la Ciudad de Panamá, Panamá.
              </p>
            </section>

            {/* 12. Disposiciones Generales */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                12. Disposiciones Generales
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Si alguna disposición de estos Términos es declarada
                  inválida, las demás disposiciones continuarán en pleno
                  vigor y efecto.
                </li>
                <li>
                  La falta de ejercicio de cualquier derecho no constituye
                  una renuncia al mismo.
                </li>
                <li>
                  Estos Términos constituyen el acuerdo completo entre tú y
                  Kotkot con respecto al uso de la plataforma.
                </li>
                <li>
                  No puedes ceder o transferir estos Términos sin nuestro
                  consentimiento previo por escrito.
                </li>
              </ul>
            </section>

            {/* 13. Contacto */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                13. Contacto
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Para preguntas sobre estos Términos de Servicio, contáctanos:
              </p>
              <div className="mt-3 bg-white border border-[#e5e7eb] rounded-[16px] p-5">
                <p className="text-sm text-[#6b7280]">
                  <strong>Kotkot</strong>
                </p>
                <p className="text-sm text-[#6b7280]">
                  Email:{' '}
                  <a
                    href="mailto:legal@kotkot.ai"
                    className="text-[#111827] font-medium hover:text-[#6b7280]"
                  >
                    legal@kotkot.ai
                  </a>
                </p>
                <p className="text-sm text-[#6b7280]">
                  Dirección: Calle 50, Torre Global Bank, Piso 30, Ciudad de
                  Panamá, Panamá
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
