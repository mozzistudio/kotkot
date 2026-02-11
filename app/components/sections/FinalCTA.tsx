"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1D3557 0%, #457B9D 100%)",
            boxShadow: "0 16px 48px rgba(29, 53, 87, 0.3)",
          }}
        >
          {/* Subtle glass overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), transparent 60%), radial-gradient(circle at 70% 80%, rgba(168,218,220,0.2), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.01em] text-white mb-4">
              Tu seguro ideal está a un mensaje de distancia
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Compara, elige y ahorra. Sin llamadas, sin esperas, sin letras pequeñas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="#cotizar" variant="primary">
                Cotizar Ahora
                <ArrowRight size={18} />
              </Button>
              <Button
                href="https://wa.me/+50769784955"
                variant="ghost"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <MessageCircle size={18} />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
