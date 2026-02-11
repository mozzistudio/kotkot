"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MessageSquare, Shield, BarChart3 } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative z-10 min-h-screen flex items-center pt-24 pb-16 md:pt-28 md:pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <Badge>Impulsado por Inteligencia Artificial</Badge>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-primary mt-6 mb-6"
            >
              Compara seguros en minutos, no en días
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Cotiza auto, salud, hogar, viaje y más. Nuestro asistente IA te consigue
              las mejores ofertas de aseguradoras en Panamá, gratis y sin compromiso.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button href="#cotizar" variant="primary">
                Cotizar Ahora — Es Gratis
                <ArrowRight size={18} />
              </Button>
              <Button href="#como-funciona" variant="ghost">
                ¿Cómo funciona?
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary"
            >
              <span className="flex items-center gap-1.5">
                <Check size={16} className="text-success" /> 100% Gratis
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={16} className="text-success" /> +10 Aseguradoras
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={16} className="text-success" /> Respuesta en minutos
              </span>
            </motion.div>
          </div>

          {/* Right — Glass mockup card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="glass-card p-6 max-w-md mx-auto" style={{ perspective: "1000px" }}>
              {/* Mockup header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <MessageSquare size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-primary">Asistente CotiFácil</p>
                  <p className="text-xs text-text-muted">En línea</p>
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-3 mb-5">
                <div className="bg-primary/5 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-text-primary">
                    ¡Hola! Encontré 4 cotizaciones para tu seguro de auto. Aquí van las mejores:
                  </p>
                </div>

                {/* Quote cards */}
                <div className="space-y-2 ml-4">
                  {[
                    { insurer: "ASSA", price: "$45/mes", icon: Shield },
                    { insurer: "MAPFRE", price: "$52/mes", icon: Shield },
                    { insurer: "Generali", price: "$48/mes", icon: Shield },
                  ].map((q, i) => (
                    <motion.div
                      key={q.insurer}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-3 border border-white/40"
                    >
                      <div className="flex items-center gap-2">
                        <q.icon size={16} className="text-primary-light" />
                        <span className="text-sm font-semibold text-primary">
                          {q.insurer}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-accent">{q.price}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Comparison bar */}
              <div className="flex items-center gap-2 bg-primary/5 rounded-xl px-4 py-3">
                <BarChart3 size={16} className="text-primary-light" />
                <span className="text-xs font-semibold text-primary">
                  Comparando 10+ aseguradoras en tiempo real...
                </span>
              </div>
            </div>

            {/* Decorative glow */}
            <div
              className="absolute -z-10 inset-0 rounded-3xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(69,123,157,0.15) 0%, transparent 70%)",
                transform: "scale(1.1)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
