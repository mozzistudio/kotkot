'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function PartnersTeaser() {
  return (
    <section className="overflow-hidden bg-[var(--dark-blue)] px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"
      >
        <div>
          <span className="inline-flex rounded-full border border-[rgba(202,255,4,0.3)] bg-[rgba(202,255,4,0.14)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            White Label
          </span>
          <h2 className="mt-6 font-heading text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            ¿Diriges una correduría con 50+ brokers?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Despliega kotkot bajo tu propia marca. Cada broker de tu red recibe un agente IA en WhatsApp, CRM y cobros automáticos. Tú controlas todo desde un dashboard centralizado.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-[var(--accent)]"><CountUp to={24} suffix="/7" /></p>
              <p className="mt-1 text-xs text-white/70">Soporte dedicado</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-[var(--accent)]">$<CountUp to={99} /></p>
              <p className="mt-1 text-xs text-white/70">Por broker/mes</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl font-extrabold text-[var(--accent)]"><CountUp to={100} suffix="%" /></p>
              <p className="mt-1 text-xs text-white/70">Tu marca</p>
            </div>
          </div>

          <a
            href="/partners"
            className="mt-8 inline-flex items-center rounded-[var(--radius-button)] border border-[rgba(202,255,4,0.4)] bg-[var(--accent)] px-7 py-3.5 font-bold text-[var(--text-primary)] transition hover:bg-[var(--accent-hover)]"
          >
            Conocer el programa →
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="relative hidden h-[340px] lg:block"
        >
          {[['#5B8CFF', 'Brand A'], ['#CAFF04', 'Brand B'], ['#F97316', 'Brand C']].map((card, i) => (
            <motion.div
              key={card[1]}
              initial={{ y: 40, opacity: 0, rotate: i === 0 ? -5 : i === 2 ? 5 : 0 }}
              whileInView={{ y: 0, opacity: 1, rotate: i === 0 ? -6 : i === 2 ? 6 : 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              animate={{ y: [0, -8, 0] }}
              style={{ animationDelay: `${i * 200}ms` }}
              className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 rounded-2xl border border-white/15 bg-white/95 p-4 shadow-xl"
            >
              <div
                className="mb-4 h-11 rounded-xl"
                style={{ backgroundColor: card[0], transform: `translateY(${i * 2}px)` }}
              />
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-[var(--dark-blue)]/15" />
                <div className="h-2 w-4/5 rounded-full bg-[var(--dark-blue)]/15" />
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="h-16 rounded-lg bg-[var(--dark-blue)]/10" />
                  <div className="h-16 rounded-lg bg-[var(--dark-blue)]/10" />
                  <div className="h-16 rounded-lg bg-[var(--dark-blue)]/10" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
