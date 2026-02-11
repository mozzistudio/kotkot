"use client";

import { motion } from "framer-motion";
import { Car, HeartPulse, Home, Plane, Building2, Bike } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const insuranceTypes = [
  {
    icon: Car,
    title: "Seguro de Auto",
    description: "Responsabilidad civil, cobertura total, daños a terceros. Desde $30/mes.",
    color: "text-primary-light",
    glow: "rgba(69, 123, 157, 0.2)",
  },
  {
    icon: HeartPulse,
    title: "Seguro de Salud",
    description: "Hospitalización, consultas, medicamentos. Planes individuales y familiares.",
    color: "text-accent",
    glow: "rgba(230, 57, 70, 0.15)",
  },
  {
    icon: Home,
    title: "Seguro de Hogar",
    description: "Incendio, robo, desastres naturales. Protege tu inversión.",
    color: "text-primary",
    glow: "rgba(29, 53, 87, 0.15)",
  },
  {
    icon: Plane,
    title: "Seguro de Viaje",
    description: "Cobertura médica internacional, cancelación de vuelo, equipaje.",
    color: "text-primary-soft",
    glow: "rgba(168, 218, 220, 0.3)",
  },
  {
    icon: Building2,
    title: "Seguro Empresarial",
    description: "Responsabilidad civil, equipos, empleados. Soluciones corporativas.",
    color: "text-primary-light",
    glow: "rgba(69, 123, 157, 0.2)",
  },
  {
    icon: Bike,
    title: "Seguro de Moto",
    description: "Cobertura básica y full para tu moto. Precios competitivos.",
    color: "text-accent-soft",
    glow: "rgba(255, 107, 107, 0.15)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function InsuranceTypes() {
  return (
    <section id="seguros" className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.01em] text-primary mb-4">
            Un seguro para cada necesidad
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Selecciona el tipo de seguro que necesitas y recibe cotizaciones personalizadas al instante.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {insuranceTypes.map((type) => (
            <motion.div key={type.title} variants={itemVariants}>
              <GlassCard className="p-6 md:p-7 h-full group cursor-pointer">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-shadow duration-300 ${type.color}`}
                  style={{ background: type.glow }}
                >
                  <type.icon size={28} />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">
                  {type.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {type.description}
                </p>
                <a
                  href="#cotizar"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-soft transition-colors"
                >
                  Cotizar
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
