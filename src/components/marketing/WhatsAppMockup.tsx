'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Paperclip, Phone, Video, ChevronLeft, MoreVertical } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  buttons?: string[];
  isQuoteCard?: boolean;
  paymentButton?: { label: string };
}

// ---------------------------------------------------------------------------
// Conversation script
// ---------------------------------------------------------------------------

const MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'bot',
    text: '¡Hola! 👋 Soy tu asistente de seguros. ¿En qué puedo ayudarte?',
    time: '10:30',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Necesito seguro para mi auto',
    time: '10:31',
  },
  {
    id: 3,
    sender: 'bot',
    text: '¡Claro! Te ayudo. ¿Cuál es la marca de tu vehículo?',
    time: '10:31',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Toyota Corolla 2022',
    time: '10:32',
  },
  {
    id: 5,
    sender: 'bot',
    text: 'Perfecto. ¿Qué cobertura prefieres?',
    time: '10:32',
    buttons: ['Básico', 'Intermedio', 'Todo Riesgo'],
  },
  {
    id: 6,
    sender: 'user',
    text: 'Todo Riesgo',
    time: '10:33',
  },
  {
    id: 7,
    sender: 'bot',
    text: '📊 Mejores opciones para ti:\n\n🏆 ASSA — $89/mes\n⭐ MAPFRE — $95/mes\n      SURA — $102/mes\n\nTodas incluyen: daños a terceros, robo total y asistencia vial.',
    time: '10:33',
    isQuoteCard: true,
  },
  {
    id: 8,
    sender: 'user',
    text: 'ASSA',
    time: '10:34',
  },
  {
    id: 9,
    sender: 'bot',
    text: 'Excelente elección. Aquí tienes tu link de pago:',
    time: '10:34',
    paymentButton: { label: '💳 Pagar $89.00' },
  },
  {
    id: 10,
    sender: 'bot',
    text: '✅ ¡Pago recibido! Ahora necesito algunos documentos para activar tu póliza:',
    time: '10:35',
  },
  {
    id: 11,
    sender: 'bot',
    text: '📋 Documentos requeridos:\n\n1️⃣ Cédula o Pasaporte\n2️⃣ Licencia de Conducir\n3️⃣ Tarjeta de Circulación\n4️⃣ Fotos del vehículo (4 lados + VIN)\n\nPor favor envíalos uno por uno 📸',
    time: '10:35',
  },
  {
    id: 12,
    sender: 'user',
    text: '📎 Cedula.jpg',
    time: '10:36',
  },
  {
    id: 13,
    sender: 'user',
    text: '📎 Licencia.jpg',
    time: '10:36',
  },
  {
    id: 14,
    sender: 'user',
    text: '📎 Tarjeta_Circulacion.jpg',
    time: '10:37',
  },
  {
    id: 15,
    sender: 'user',
    text: '📎 Fotos_Auto.zip',
    time: '10:37',
  },
  {
    id: 16,
    sender: 'bot',
    text: 'Perfecto! ✅ Analizando documentos...',
    time: '10:38',
  },
  {
    id: 17,
    sender: 'bot',
    text: '📄 Datos extraídos de tus documentos:\n\n👤 Juan Pérez Gómez\n🆔 Cédula: 8-123-4567\n🚗 Toyota Corolla 2022\n🔢 Placa: PA-12345\n📅 VIN: JT2BF18K5X0123456\n\nCobertura: Todo Riesgo - ASSA\n💰 $89/mes\n\n¿Todo correcto?',
    time: '10:38',
    buttons: ['✅ Confirmar', '✏️ Corregir'],
  },
  {
    id: 18,
    sender: 'user',
    text: '✅ Confirmar',
    time: '10:39',
  },
  {
    id: 19,
    sender: 'bot',
    text: '🎉 ¡Listo! Tu póliza ASSA #PA-2024-12345 está activa.\n\n📄 Certificado enviado a tu email.',
    time: '10:39',
  },
];

const BOT_DELAY = 1800;
const USER_DELAY = 1200;
const TYPING_DURATION = 1200;
const RESTART_PAUSE = 3000;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-1 px-3 pb-1"
    >
      <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-[6px] w-[6px] rounded-full bg-[var(--text-muted)]"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.55,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function QuoteCard({ text }: { text: string }) {
  const lines = text.split('\n');
  const title = lines[0];

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-default)] bg-white">
      {/* Card header */}
      <div className="border-b border-[var(--border-default)] bg-[var(--accent-light)] px-3 py-2">
        <span className="text-[11px] font-semibold tracking-wide text-[var(--text-primary)]">
          {title}
        </span>
      </div>

      {/* Quote rows */}
      <div className="divide-y divide-[var(--border-default)] px-1 py-1">
        {/* ASSA — Best */}
        <div className="flex items-center justify-between rounded-[var(--radius-button)] bg-[var(--accent-light)] px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px]">🏆</span>
            <span className="text-[11px] font-bold text-[var(--text-primary)]">ASSA</span>
            <span className="rounded-[var(--radius-button)] bg-[var(--accent)] px-1.5 py-[1px] text-[8px] font-bold text-[var(--text-primary)]">
              MEJOR
            </span>
          </div>
          <span className="text-[12px] font-extrabold text-[var(--dark-blue)]">
            $89<span className="text-[9px] font-semibold text-[var(--dark-blue)]">/mes</span>
          </span>
        </div>

        {/* MAPFRE */}
        <div className="flex items-center justify-between px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px]">⭐</span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">MAPFRE</span>
          </div>
          <span className="text-[11px] font-bold text-[var(--text-secondary)]">
            $95<span className="text-[9px] font-medium text-[var(--text-secondary)]">/mes</span>
          </span>
        </div>

        {/* SURA */}
        <div className="flex items-center justify-between px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="w-[14px]" />
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">SURA</span>
          </div>
          <span className="text-[11px] font-bold text-[var(--text-muted)]">
            $102<span className="text-[9px] font-medium text-[var(--text-muted)]">/mes</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border-default)] bg-[var(--accent-light)] px-3 py-1.5">
        <p className="text-[9px] leading-tight text-[var(--text-secondary)]">
          Todas incluyen: daños a terceros, robo total y asistencia vial.
        </p>
      </div>
    </div>
  );
}

function PaymentButton({ label }: { label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="mt-1.5 w-full rounded-[var(--radius-button)] border border-[rgba(202,255,4,0.40)] bg-[var(--accent)] px-4 py-2 text-[11px] font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--action-primary-hover)]"
    >
      {label}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Chat bubble
// ---------------------------------------------------------------------------

function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} px-2`}
    >
      <div
        className={`relative max-w-[82%] ${
          isBot
            ? 'rounded-2xl rounded-tl-sm bg-white shadow-sm'
            : 'rounded-2xl rounded-tr-sm bg-[var(--color-brand-whatsapp-bubble)] shadow-sm'
        }`}
      >
        <div className="px-2.5 pb-1 pt-1.5">
          {message.isQuoteCard ? (
            <QuoteCard text={message.text} />
          ) : (
            <p className="whitespace-pre-wrap text-[11.5px] leading-[1.45] text-[var(--text-primary)]">
              {message.text}
            </p>
          )}

          {/* Quick-reply buttons */}
          {message.buttons && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {message.buttons.map((btn) => (
                <span
                  key={btn}
                  className="inline-block rounded-full border border-[rgba(202,255,4,0.40)] bg-[var(--accent-light)] px-2.5 py-[3px] text-xs font-medium text-[var(--text-primary)]"
                >
                  {btn}
                </span>
              ))}
            </div>
          )}

          {/* Payment button */}
          {message.paymentButton && (
            <PaymentButton label={message.paymentButton.label} />
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-0.5 justify-end mt-0.5">
            <span className="text-[9px] text-[var(--text-muted)]">{message.time}</span>
            {!isBot && (
              <svg width="13" height="8" viewBox="0 0 16 10" className="ml-0.5 text-blue-400" fill="currentColor">
                <path d="M15.01 1.16a.73.73 0 0 0-1.03-.04l-6.12 5.72-1.2-1.12a.73.73 0 0 0-1 1.06l1.72 1.61a.73.73 0 0 0 1-.01l6.63-6.19a.73.73 0 0 0 0-1.03Z" />
                <path d="M11.01 1.16a.73.73 0 0 0-1.03-.04l-6.12 5.72-1.2-1.12a.73.73 0 0 0-1 1.06l1.72 1.61a.73.73 0 0 0 1-.01l6.63-6.19a.73.73 0 0 0 0-1.03Z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function WhatsAppMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        if (!cancelled) {
          setVisibleCount(0);
          setShowTyping(false);
        }
      }, 0)
    );

    let cumulativeDelay = 800;

    MESSAGES.forEach((msg, idx) => {
      const isBot = msg.sender === 'bot';
      const preDelay = idx === 0 ? 0 : isBot ? BOT_DELAY : USER_DELAY;
      cumulativeDelay += preDelay;

      if (isBot) {
        const typingTime = cumulativeDelay;
        timers.push(
          setTimeout(() => {
            if (!cancelled) setShowTyping(true);
          }, typingTime)
        );

        cumulativeDelay += TYPING_DURATION;

        const showTime = cumulativeDelay;
        timers.push(
          setTimeout(() => {
            if (!cancelled) {
              setShowTyping(false);
              setVisibleCount(idx + 1);
            }
          }, showTime)
        );
      } else {
        const showTime = cumulativeDelay;
        timers.push(
          setTimeout(() => {
            if (!cancelled) {
              setVisibleCount(idx + 1);
            }
          }, showTime)
        );
      }
    });

    cumulativeDelay += RESTART_PAUSE;
    timers.push(
      setTimeout(() => {
        if (!cancelled) setCycleKey((k) => k + 1);
      }, cumulativeDelay)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [cycleKey]);

  const visibleMessages = MESSAGES.slice(0, visibleCount);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto w-[300px] select-none sm:w-[320px]"
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-b from-[rgba(202,255,4,0.2)] via-[rgba(202,255,4,0.1)] to-transparent blur-2xl" />

      {/* iPhone frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-800 shadow-2xl shadow-slate-900/50">
        {/* Side buttons (decorative) */}
        <div className="absolute -left-[8px] top-[80px] h-8 w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[8px] top-[120px] h-12 w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[8px] top-[145px] h-12 w-[3px] rounded-l-sm bg-slate-700" />
        <div className="absolute -right-[8px] top-[110px] h-16 w-[3px] rounded-r-sm bg-slate-700" />

        {/* Screen */}
        <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[2rem] bg-white sm:h-[640px]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-center">
            <div className="h-[22px] w-[90px] rounded-b-2xl bg-slate-800" />
          </div>

          {/* Status bar — WhatsApp brand colors (not tokenized) */}
          <div className="relative z-40 flex items-center justify-between bg-[var(--color-brand-whatsapp-700)] px-4 pb-0 pt-6">
            <span className="text-[9px] font-semibold text-white/90">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill="white" />
              </svg>
              <svg width="14" height="12" viewBox="0 0 24 24" fill="white" className="opacity-80">
                <rect x="1" y="6" width="4" height="14" rx="1" opacity="0.3" />
                <rect x="7" y="4" width="4" height="16" rx="1" opacity="0.5" />
                <rect x="13" y="2" width="4" height="18" rx="1" opacity="0.7" />
                <rect x="19" y="0" width="4" height="20" rx="1" />
              </svg>
              <div className="flex items-center">
                <div className="h-[8px] w-[18px] rounded-sm border border-white/60 p-[1px]">
                  <div className="h-full w-[70%] rounded-[1px] bg-white" />
                </div>
                <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r-sm bg-white/60" />
              </div>
            </div>
          </div>

          {/* WhatsApp header — WhatsApp brand colors (not tokenized) */}
          <div className="relative z-30 flex items-center gap-2 bg-[var(--color-brand-whatsapp-700)] px-2 pb-2.5 pt-0.5">
            <ChevronLeft className="h-4 w-4 shrink-0 text-white/80" />

            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-brand-whatsapp-400)] to-[var(--color-brand-whatsapp-500)] shadow-inner">
              <div className="flex h-full w-full items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.9">
                  <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12c5.523 0 10 2.239 10 5v1H2v-1c0-2.761 4.477-5 10-5Z" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-brand-whatsapp-700)] bg-green-400" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate text-[13px] font-semibold text-white">
                  Kotkot Bot
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <circle cx="12" cy="12" r="10" fill="var(--color-brand-whatsapp-400)" />
                  <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs text-[var(--color-brand-whatsapp-400)]/80">en línea</span>
            </div>

            <div className="flex items-center gap-3">
              <Video className="h-4 w-4 text-white/70" />
              <Phone className="h-4 w-4 text-white/70" />
              <MoreVertical className="h-4 w-4 text-white/70" />
            </div>
          </div>

          {/* Chat area — WhatsApp brand background */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              backgroundColor: 'var(--color-brand-whatsapp-chat)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8e6c9' fill-opacity='0.18'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <div className="flex h-full flex-col-reverse overflow-y-auto">
              <div className="flex flex-col gap-[6px] px-1.5 py-2">
                {/* Date chip */}
                <div className="flex justify-center py-1">
                  <span className="rounded-lg bg-white/80 px-3 py-0.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
                    HOY
                  </span>
                </div>

                {/* Encryption notice */}
                <div className="flex justify-center px-6 pb-1">
                  <div className="rounded-lg bg-[var(--color-brand-note-bg)]/60 px-3 py-1.5 text-center">
                    <span className="text-[8.5px] leading-tight text-amber-800/70">
                      🔒 Los mensajes están cifrados de extremo a extremo.
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {visibleMessages.map((msg) => (
                    <ChatBubble key={`${cycleKey}-${msg.id}`} message={msg} />
                  ))}
                  {showTyping && (
                    <TypingIndicator key={`${cycleKey}-typing`} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Input bar — WhatsApp brand */}
          <div className="relative z-20 flex items-center gap-1.5 bg-[var(--color-brand-whatsapp-input)] px-2 py-1.5">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <span className="flex-1 text-[11px] text-[var(--text-muted)]">Mensaje</span>
              <Paperclip className="h-3.5 w-3.5 shrink-0 rotate-45 text-[var(--text-muted)]" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-whatsapp-700)] shadow-sm">
              <Mic className="h-3.5 w-3.5 text-white" />
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex items-center justify-center bg-[var(--color-brand-whatsapp-input)] pb-1.5 pt-0.5">
            <div className="h-[4px] w-[100px] rounded-full bg-slate-800/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WhatsAppMockup;
