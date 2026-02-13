import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — CotiFácil',
  description:
    'Política de privacidad de CotiFácil. Conoce cómo recopilamos, usamos y protegemos tus datos personales.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-4xl">
        {/* --- Header --- */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            Política de Privacidad
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
                En CotiFácil (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la
                Plataforma&quot;), respetamos tu privacidad y nos comprometemos a
                proteger tus datos personales. Esta Política de Privacidad describe
                cómo recopilamos, usamos, almacenamos y compartimos información
                cuando utilizas nuestros servicios, incluyendo nuestra plataforma
                web, APIs y agente de WhatsApp.
              </p>
            </section>

            {/* 1. Datos que Recopilamos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                1. Datos que Recopilamos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Recopilamos los siguientes tipos de información:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Datos de registro:</strong> nombre, email, teléfono,
                  nombre de correduría, país de operación, número de identificación
                  fiscal (RUC/NIT/RFC).
                </li>
                <li>
                  <strong>Datos de clientes finales:</strong> información proporcionada
                  durante conversaciones de WhatsApp, incluyendo nombre, cédula,
                  datos de vehículo, fecha de nacimiento, y otra información
                  necesaria para generar cotizaciones de seguros.
                </li>
                <li>
                  <strong>Datos de uso:</strong> métricas de uso de la plataforma,
                  páginas visitadas, funciones utilizadas, tiempos de sesión.
                </li>
                <li>
                  <strong>Datos de pago:</strong> información de facturación y
                  transacciones procesadas a través de nuestra plataforma. No
                  almacenamos números de tarjeta de crédito completos.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> dirección IP, tipo de navegador,
                  dispositivo, sistema operativo, y datos de cookies.
                </li>
              </ul>
            </section>

            {/* 2. Uso de la Información */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                2. Uso de la Información
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Utilizamos la información recopilada para:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Proporcionar y mantener nuestros servicios de cotización de seguros.</li>
                <li>Procesar cotizaciones y conectar con las APIs de aseguradoras.</li>
                <li>Generar y procesar pagos a través de nuestros socios (Yappy, Stripe).</li>
                <li>Mejorar nuestro agente de IA y la experiencia del usuario.</li>
                <li>Enviar comunicaciones relacionadas con el servicio (actualizaciones, alertas, soporte).</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
                <li>Prevenir fraude y garantizar la seguridad de la plataforma.</li>
                <li>Generar estadísticas agregadas y anónimas sobre el uso del servicio.</li>
              </ul>
            </section>

            {/* 3. Cookies y Tecnologías de Seguimiento */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                3. Cookies y Tecnologías de Seguimiento
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Cookies esenciales:</strong> necesarias para el
                  funcionamiento de la plataforma (autenticación, sesión, seguridad).
                </li>
                <li>
                  <strong>Cookies de rendimiento:</strong> nos ayudan a entender
                  cómo los usuarios interactúan con nuestra plataforma.
                </li>
                <li>
                  <strong>Cookies de funcionalidad:</strong> permiten recordar tus
                  preferencias (idioma, configuración).
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> utilizadas para mostrar
                  anuncios relevantes (solo con tu consentimiento explícito).
                </li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                Puedes configurar tu navegador para rechazar cookies. Sin embargo,
                esto puede afectar la funcionalidad de algunos servicios.
              </p>
            </section>

            {/* 4. Compartición con Terceros */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                4. Compartición con Terceros
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Compartimos información personal solo en los siguientes casos:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Aseguradoras:</strong> compartimos datos necesarios para
                  generar cotizaciones (datos del vehículo, datos del asegurado)
                  directamente con las APIs de las aseguradoras conectadas por
                  tu correduría.
                </li>
                <li>
                  <strong>Procesadores de pago:</strong> Stripe y Yappy reciben
                  información necesaria para procesar transacciones.
                </li>
                <li>
                  <strong>Meta (WhatsApp):</strong> como usuarios de la WhatsApp
                  Business API, los mensajes se transmiten a través de la
                  infraestructura de Meta.
                </li>
                <li>
                  <strong>Proveedores de infraestructura:</strong> servicios de
                  hosting y cloud computing que procesan datos bajo nuestras
                  instrucciones.
                </li>
                <li>
                  <strong>Requerimientos legales:</strong> cuando sea requerido
                  por ley, orden judicial o autoridad regulatoria.
                </li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                No vendemos ni alquilamos información personal a terceros para
                fines de marketing.
              </p>
            </section>

            {/* 5. Seguridad de los Datos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                5. Seguridad de los Datos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas
                apropiadas para proteger tus datos, incluyendo:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Encriptación en tránsito (TLS 1.3) y en reposo (AES-256).</li>
                <li>Autenticación multifactor para acceso a la plataforma.</li>
                <li>Auditorías de seguridad regulares y pruebas de penetración.</li>
                <li>Acceso restringido basado en roles (RBAC).</li>
                <li>Monitoreo continuo de actividad sospechosa.</li>
              </ul>
            </section>

            {/* 6. Tus Derechos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                6. Tus Derechos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                De acuerdo con las leyes de protección de datos aplicables en
                tu país, tienes derecho a:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Acceso:</strong> solicitar una copia de los datos personales
                  que tenemos sobre ti.
                </li>
                <li>
                  <strong>Rectificación:</strong> solicitar la corrección de datos
                  inexactos o incompletos.
                </li>
                <li>
                  <strong>Eliminación:</strong> solicitar la eliminación de tus
                  datos personales (sujeto a obligaciones legales de retención).
                </li>
                <li>
                  <strong>Portabilidad:</strong> solicitar tus datos en un formato
                  estructurado y legible por máquina.
                </li>
                <li>
                  <strong>Oposición:</strong> oponerte al procesamiento de tus
                  datos para ciertos fines.
                </li>
                <li>
                  <strong>Revocación del consentimiento:</strong> retirar tu
                  consentimiento en cualquier momento.
                </li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">
                Para ejercer cualquiera de estos derechos, contáctanos en{' '}
                <a
                  href="mailto:privacidad@cotifacil.com"
                  className="font-medium text-[#059669] hover:text-[#059669]"
                >
                  privacidad@cotifacil.com
                </a>
                .
              </p>
            </section>

            {/* 7. Retención de Datos */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                7. Retención de Datos
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Conservamos tus datos personales durante el tiempo necesario
                para cumplir con los fines descritos en esta política, o según
                lo requieran las leyes aplicables. Los datos de cotizaciones
                y pólizas se conservan por un mínimo de 5 años conforme a
                regulaciones del sector asegurador.
              </p>
            </section>

            {/* 8. Menores de Edad */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                8. Menores de Edad
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Nuestros servicios están dirigidos a corredores de seguros y
                profesionales del sector. No recopilamos intencionalmente
                información de menores de 18 años. Si descubrimos que hemos
                recopilado datos de un menor, los eliminaremos de inmediato.
              </p>
            </section>

            {/* 9. Cambios a esta Política */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                9. Cambios a esta Política
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Podemos actualizar esta Política de Privacidad periódicamente.
                Te notificaremos sobre cambios significativos a través de
                nuestra plataforma o por email. Te recomendamos revisar esta
                página regularmente.
              </p>
            </section>

            {/* 10. Contacto */}
            <section>
              <h2 className="font-heading text-xl font-bold text-[#111827]">
                10. Contacto
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                Si tienes preguntas sobre esta Política de Privacidad o sobre
                cómo manejamos tus datos, contáctanos:
              </p>
              <div className="mt-3 bg-white border border-[#e5e7eb] rounded-[16px] p-5">
                <p className="text-sm text-[#6b7280]">
                  <strong>CotiFácil</strong>
                </p>
                <p className="text-sm text-[#6b7280]">
                  Email:{' '}
                  <a
                    href="mailto:privacidad@cotifacil.com"
                    className="text-[#059669] hover:text-[#059669]"
                  >
                    privacidad@cotifacil.com
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
