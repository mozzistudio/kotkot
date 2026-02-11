"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import GlassCard from "../ui/GlassCard";

// Insurer logo placeholders — replace with real SVGs/images
const insurers = [
  "ASSA",
  "MAPFRE",
  "Generali",
  "Banistmo Seguros",
  "SURA",
  "Pan American Life",
  "Sagicor",
  "Aseguradora Mundial",
  "Worldwide Medical",
  "BlueCross",
];

const testimonials = [
  {
    name: "María González",
    type: "Seguro de Auto",
    quote:
      "En menos de 5 minutos tenía 4 cotizaciones diferentes. Ahorré casi $200 al año comparando aquí.",
    rating: 5,
  },
  {
    name: "Carlos Méndez",
    type: "Seguro de Salud",
    quote:
      "Muy fácil de usar. El chatbot me guió paso a paso y encontré un plan familiar excelente.",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    type: "Seguro de Hogar",
    quote:
      "Nunca había comparado seguros de hogar. CotiFácil lo hizo sencillo y transparente.",
    rating: 4,
  },
];

const stats = [
  { value: "+2,500", label: "Cotizaciones generadas" },
  { value: "+10", label: "Aseguradoras comparadas" },
  { value: "< 3 min", label: "Tiempo promedio de respuesta" },
];

export default function TrustSection() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.01em] text-primary mb-4">
            Las aseguradoras que conoces, los precios que te convienen
          </h2>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-container overflow-hidden py-6 mb-16"
        >
          <div className="flex animate-marquee">
            {[...insurers, ...insurers].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center min-w-[140px] grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
              >
                <span className="font-bold text-sm text-text-secondary whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover={false} className="p-6 h-full">
                <Quote size={24} className="text-primary-soft mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      size={16}
                      className={si < t.rating ? "text-warning fill-warning" : "text-text-muted"}
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-sm text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.type}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover={false} className="p-6 text-center">
                <p className="font-display font-extrabold text-4xl md:text-5xl text-primary mb-2">
                  {s.value}
                </p>
                <p className="text-text-secondary text-sm font-medium">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
