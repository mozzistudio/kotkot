"use client";

import { motion } from "framer-motion";
import Accordion from "../ui/Accordion";

const faqItems = [
  {
    question: "¿CotiFácil es gratis?",
    answer:
      "Sí, 100% gratis y sin compromiso. Puedes cotizar y comparar seguros todas las veces que quieras sin costo alguno. No hay cargos ocultos ni obligaciones.",
  },
  {
    question: "¿Cómo se remunera CotiFácil?",
    answer:
      "Las aseguradoras nos pagan una comisión cuando un cliente contrata un seguro a través de nuestra plataforma. Esto no afecta el precio que pagas — obtienes el mismo precio que si fueras directamente a la aseguradora.",
  },
  {
    question: "¿Puedo contratar directamente desde aquí?",
    answer:
      "El proceso de cotización es 100% aquí. Una vez que elijas la mejor opción, un asesor certificado te contactará para finalizar la contratación y resolver cualquier duda adicional.",
  },
  {
    question: "¿Cómo usan mis datos personales?",
    answer:
      "Tus datos se usan únicamente para generar cotizaciones personalizadas. No compartimos tu información con terceros sin tu consentimiento. Cumplimos con las leyes de protección de datos de Panamá.",
  },
  {
    question: "¿Qué aseguradoras comparan?",
    answer:
      "Trabajamos con más de 10 aseguradoras en Panamá, incluyendo ASSA, MAPFRE, Generali, Banistmo Seguros, SURA, Pan American Life, y más. Nuestra red sigue creciendo.",
  },
  {
    question: "¿En cuánto tiempo recibo mis cotizaciones?",
    answer:
      "En promedio, menos de 3 minutos. Nuestro asistente IA procesa tu solicitud de manera inmediata y consulta múltiples aseguradoras en paralelo para darte resultados rápidos.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative z-10 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.01em] text-primary mb-4">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
