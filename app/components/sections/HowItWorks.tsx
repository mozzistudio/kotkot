"use client";

import { motion } from "framer-motion";
import { MessageSquareText, SearchCheck, ThumbsUp } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const steps = [
  {
    num: "01",
    icon: MessageSquareText,
    title: "Cuéntanos qué necesitas",
    description:
      "Nuestro asistente IA te hace unas preguntas rápidas sobre tu seguro. Sin formularios largos.",
  },
  {
    num: "02",
    icon: SearchCheck,
    title: "Comparamos por ti",
    description:
      "Consultamos a +10 aseguradoras en Panamá y te presentamos las mejores opciones.",
  },
  {
    num: "03",
    icon: ThumbsUp,
    title: "Elige y contrata",
    description:
      "Compara precios, coberturas y beneficios. Un asesor te ayuda a finalizar.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.01em] text-primary mb-4">
            Así de fácil funciona
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            3 pasos simples para encontrar tu seguro ideal
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, var(--primary-soft), var(--primary-light), var(--primary-soft))",
              opacity: 0.4,
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <GlassCard hover={false} className="p-7 md:p-8 text-center relative">
                {/* Step number */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 bg-gradient-to-br from-primary-light/20 to-primary-soft/30">
                  <span className="font-display font-extrabold text-2xl text-primary-light">
                    {step.num}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <step.icon size={32} className="text-primary-light" />
                </div>

                <h3 className="font-bold text-lg text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
