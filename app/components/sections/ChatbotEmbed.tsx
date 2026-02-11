"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "../ui/Button";

export default function ChatbotEmbed() {
  return (
    <section id="cotizar" className="relative z-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.01em] text-primary mb-4">
            ¿Listo para cotizar? Habla con nuestro asistente
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Disponible 24/7 por WhatsApp o aquí mismo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="glass-container p-2 md:p-3"
            style={{
              boxShadow:
                "0 16px 48px rgba(31, 38, 135, 0.16), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Chatbot placeholder — will hold Botpress iframe/widget */}
            <div className="bg-white/70 rounded-[16px] min-h-[500px] flex flex-col items-center justify-center gap-6 p-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <MessageCircle size={36} className="text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl text-primary mb-2">
                  Asistente CotiFácil
                </h3>
                <p className="text-text-secondary text-sm max-w-sm">
                  Nuestro chatbot de IA te guiará para obtener las mejores cotizaciones
                  de seguros en Panamá.
                </p>
              </div>
              <Button href="https://wa.me/+50769784955" variant="primary">
                <MessageCircle size={18} />
                Iniciar Conversación por WhatsApp
              </Button>
              <p className="text-xs text-text-muted">
                Widget de chat web próximamente
              </p>
            </div>
          </div>

          {/* Botpress script — uncomment and configure when ready */}
          {/*
          <Script
            src="https://cdn.botpress.cloud/webchat/v2.4/inject.js"
            strategy="lazyOnload"
          />
          */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://wa.me/+50769784955"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            <MessageCircle size={16} />
            O escríbenos por WhatsApp &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
