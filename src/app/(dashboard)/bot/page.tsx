'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Globe,
  MessageSquare,
  Save,
  Send,
  Smile,
  Sparkles,
  User,
  X,
  Bot,
  Rocket,
  Trash2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tone = 'friendly' | 'expert' | 'warm' | 'direct';
type EmojiLevel = 'none' | 'minimal' | 'frequent';
type Pronoun = 'tu' | 'usted';
type Language = 'es' | 'en' | 'auto';
type FallbackAction = 'transfer' | 'callback' | 'email';

interface BotSettings {
  name: string;
  welcomeMessage: string;
  goodbyeMessage: string;
  language: Language;
  tone: Tone;
  formality: number;
  pronoun: Pronoun;
  emojiLevel: EmojiLevel;
  systemPrompt: string;
  restrictedTopics: string[];
  maxMessagesBeforeHandoff: number;
  fallbackAction: FallbackAction;
}

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  isPreview?: boolean;
  isError?: boolean;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const defaultSettings: BotSettings = {
  name: 'Mi Agente',
  welcomeMessage: 'Hola! Soy tu asistente virtual de seguros. Estoy aqui para ayudarte a encontrar la mejor cobertura al mejor precio. En que puedo ayudarte hoy?',
  goodbyeMessage: 'Gracias por contactarnos! Si necesitas algo mas, no dudes en escribirnos. Que tengas un excelente dia!',
  language: 'es',
  tone: 'friendly',
  formality: 35,
  pronoun: 'tu',
  emojiLevel: 'minimal',
  systemPrompt: '',
  restrictedTopics: ['politica', 'religion', 'competencia directa'],
  maxMessagesBeforeHandoff: 15,
  fallbackAction: 'transfer',
};

const toneConfig: { key: Tone; label: string; description: string }[] = [
  { key: 'friendly', label: 'Amigable', description: 'Cercano y conversacional' },
  { key: 'expert', label: 'Experto', description: 'Profesional y conocedor' },
  { key: 'warm', label: 'Calido', description: 'Empatico y comprensivo' },
  { key: 'direct', label: 'Directo', description: 'Conciso y al grano' },
];

const emojiOptions: { key: EmojiLevel; label: string }[] = [
  { key: 'none', label: 'Ninguno' },
  { key: 'minimal', label: 'Minimo' },
  { key: 'frequent', label: 'Frecuente' },
];

const languageOptions: { key: Language; label: string }[] = [
  { key: 'es', label: 'Espanol' },
  { key: 'en', label: 'English' },
  { key: 'auto', label: 'Auto-detect' },
];

const fallbackOptions: { key: FallbackAction; label: string }[] = [
  { key: 'transfer', label: 'Transferir a agente' },
  { key: 'callback', label: 'Solicitar callback' },
  { key: 'email', label: 'Enviar por email' },
];

// ---------------------------------------------------------------------------
// Preview messages based on settings
// ---------------------------------------------------------------------------

function getPreviewMessages(settings: BotSettings): ChatMessage[] {
  const emoji = settings.emojiLevel === 'frequent' ? ' ' : settings.emojiLevel === 'minimal' ? ' ' : '';
  const greeting = settings.pronoun === 'usted' ? 'Como esta?' : 'Como estas?';
  const toneAdj =
    settings.tone === 'friendly'
      ? 'genial'
      : settings.tone === 'expert'
      ? 'excelente'
      : settings.tone === 'warm'
      ? 'maravilloso'
      : 'bien';

  return [
    { sender: 'bot', text: settings.welcomeMessage, isPreview: true },
    { sender: 'user', text: 'Hola! Necesito un seguro de auto', isPreview: true },
    {
      sender: 'bot',
      isPreview: true,
      text:
        settings.tone === 'friendly'
          ? `${toneAdj}!${emoji} Me encanta ayudarte con eso. ${settings.pronoun === 'usted' ? 'Podria' : 'Podrias'} decirme la marca y modelo de ${settings.pronoun === 'usted' ? 'su' : 'tu'} vehiculo?`
          : settings.tone === 'expert'
          ? `${toneAdj}.${emoji} Para ${settings.pronoun === 'usted' ? 'ofrecerle' : 'ofrecerte'} las mejores opciones de cobertura, necesito conocer los detalles de ${settings.pronoun === 'usted' ? 'su' : 'tu'} vehiculo. Marca y modelo, por favor.`
          : settings.tone === 'warm'
          ? `${toneAdj}!${emoji} Entiendo lo importante que es proteger ${settings.pronoun === 'usted' ? 'su' : 'tu'} vehiculo. ${greeting} ${settings.pronoun === 'usted' ? 'Cuenteme' : 'Cuentame'} sobre ${settings.pronoun === 'usted' ? 'su' : 'tu'} auto.`
          : `Perfecto.${emoji} Necesito: marca, modelo y ano del vehiculo.`,
    },
    { sender: 'user', text: 'Toyota Corolla 2023', isPreview: true },
    {
      sender: 'bot',
      isPreview: true,
      text:
        settings.tone === 'friendly'
          ? `${emoji}He encontrado 4 opciones increibles para ${settings.pronoun === 'usted' ? 'su' : 'tu'} Toyota Corolla! La mejor es ASSA desde $85/mes. ${settings.pronoun === 'usted' ? 'Le' : 'Te'} envio el comparativo?`
          : settings.tone === 'expert'
          ? `${emoji}Basado en el perfil del vehiculo, he cotizado con 4 aseguradoras. La opcion mas competitiva es ASSA a $85/mes con cobertura completa y deducible de $500.`
          : settings.tone === 'warm'
          ? `${emoji}Que buen auto! He buscado las mejores opciones para ${settings.pronoun === 'usted' ? 'usted' : 'ti'}. La mas accesible es ASSA a $85/mes. ${settings.pronoun === 'usted' ? 'Le' : 'Te'} parece bien ver todas las opciones?`
          : `${emoji}4 cotizaciones listas. Mejor: ASSA $85/mes, cobertura completa. ${settings.pronoun === 'usted' ? 'Desea' : 'Quieres'} ver el detalle?`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Typing indicator component
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-emerald-500/20 bg-emerald-500/15 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400/70" style={{ animationDelay: '0ms' }} />
          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400/70" style={{ animationDelay: '150ms' }} />
          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400/70" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BotPage() {
  const [settings, setSettings] = useState<BotSettings>(defaultSettings);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Interactive chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const updateSetting = <K extends keyof BotSettings>(key: K, value: BotSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const addRestrictedTopic = () => {
    const trimmed = newTag.trim();
    if (trimmed && !settings.restrictedTopics.includes(trimmed)) {
      updateSetting('restrictedTopics', [...settings.restrictedTopics, trimmed]);
      setNewTag('');
    }
  };

  const removeRestrictedTopic = (topic: string) => {
    updateSetting(
      'restrictedTopics',
      settings.restrictedTopics.filter((t) => t !== topic)
    );
  };

  const previewMessages = getPreviewMessages(settings);

  // Auto-scroll to bottom whenever messages change or typing starts
  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping, scrollToBottom]);

  // Build the conversation history for the API (only non-preview messages)
  const buildHistory = useCallback(
    (msgs: ChatMessage[]): { role: 'user' | 'assistant'; content: string }[] => {
      return msgs
        .filter((m) => !m.isPreview && !m.isError)
        .map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.text,
        }));
    },
    []
  );

  // Send a message to the bot
  const sendMessage = useCallback(async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isTyping) return;

    setChatError(null);
    const userMessage: ChatMessage = { sender: 'user', text: trimmed };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const history = buildHistory([...chatMessages, userMessage]);

      const personalityOverride = {
        name: settings.name,
        tone: settings.tone,
        pronoun: settings.pronoun,
        emojiLevel: settings.emojiLevel,
        language: settings.language,
        formality: settings.formality,
        welcomeMessage: settings.welcomeMessage,
      };

      const res = await fetch('/api/bot/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history,
          personalityOverride,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}: No se pudo obtener respuesta`);
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        sender: 'bot',
        text: data.response,
      };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : 'Error inesperado al contactar al bot';
      setChatError(errorText);
      const errorMessage: ChatMessage = {
        sender: 'bot',
        text: `Error: ${errorText}`,
        isError: true,
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      // Re-focus the input for quick follow-ups
      setTimeout(() => chatInputRef.current?.focus(), 50);
    }
  }, [chatInput, isTyping, chatMessages, settings, buildHistory]);

  // Clear the interactive conversation
  const clearChat = useCallback(() => {
    setChatMessages([]);
    setChatError(null);
    setChatInput('');
    setIsTyping(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // All messages to display: preview + interactive
  const allMessages = [...previewMessages, ...chatMessages];

  return (
    <div className="min-h-screen bg-[#080c14] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200 font-heading">
          Personalidad del Bot
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configura como se comporta y comunica tu asistente de IA
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* -- Editor (Left 2/3) ---------------------------------------- */}
        <div className="flex-1 space-y-6 lg:w-2/3">
          {/* Identity Card */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-6">
            <h2 className="mb-5 text-lg font-semibold text-slate-200">Identidad</h2>

            <div className="flex flex-col gap-6 sm:flex-row">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#1e293b] bg-[#080c14] text-slate-500 transition-colors hover:border-emerald-500/30 hover:text-emerald-400">
                  <Camera className="h-6 w-6" />
                </div>
                <span className="text-xs text-slate-500">Subir avatar</span>
              </div>

              {/* Name */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    Nombre del Bot
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => updateSetting('name', e.target.value)}
                    className="w-full rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                    placeholder="Nombre de tu asistente"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    <Globe className="mr-1 inline h-3.5 w-3.5" />
                    Idioma
                  </label>
                  <div className="flex gap-2">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => updateSetting('language', opt.key)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                          settings.language === opt.key
                            ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                            : 'border-[#1e293b] text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Card */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-6">
            <h2 className="mb-5 text-lg font-semibold text-slate-200">Mensajes</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Mensaje de Bienvenida
                </label>
                <textarea
                  value={settings.welcomeMessage}
                  onChange={(e) => updateSetting('welcomeMessage', e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Mensaje de Despedida
                </label>
                <textarea
                  value={settings.goodbyeMessage}
                  onChange={(e) => updateSetting('goodbyeMessage', e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Tone & Personality Card */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-6">
            <h2 className="mb-5 text-lg font-semibold text-slate-200">Tono & Personalidad</h2>

            {/* Tone Selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-300">Tono</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {toneConfig.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => updateSetting('tone', t.key)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      settings.tone === t.key
                        ? 'border-emerald-500/40 bg-emerald-500/10 ring-1 ring-emerald-500/20'
                        : 'border-[#1e293b] hover:border-[#1e293b] hover:bg-[#080c14]'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        settings.tone === t.key ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {t.label}
                    </span>
                    <p className="mt-0.5 text-xs text-slate-500">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Formality Slider */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Formalidad</label>
                <span className="text-xs font-semibold text-emerald-400 font-data">{settings.formality}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.formality}
                onChange={(e) => updateSetting('formality', Number(e.target.value))}
                className="slider-emerald h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #14b8a6 ${settings.formality}%, #1e293b ${settings.formality}%)`,
                }}
              />
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-slate-500">Casual</span>
                <span className="text-xs text-slate-500">Profesional</span>
              </div>
            </div>

            {/* Pronoun Toggle */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-300">Pronombre</label>
              <div className="inline-flex rounded-lg border border-[#1e293b] bg-[#080c14] p-1">
                <button
                  onClick={() => updateSetting('pronoun', 'tu')}
                  className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                    settings.pronoun === 'tu'
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Tu
                </button>
                <button
                  onClick={() => updateSetting('pronoun', 'usted')}
                  className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                    settings.pronoun === 'usted'
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Usted
                </button>
              </div>
            </div>

            {/* Emoji Level */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                <Smile className="mr-1 inline h-3.5 w-3.5" />
                Nivel de Emojis
              </label>
              <div className="flex gap-2">
                {emojiOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => updateSetting('emojiLevel', opt.key)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      settings.emojiLevel === opt.key
                        ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                        : 'border-[#1e293b] text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Behavior Card */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-6">
            <h2 className="mb-5 text-lg font-semibold text-slate-200">Comportamiento</h2>

            <div className="space-y-5">
              {/* Restricted Topics */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Temas Restringidos
                </label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {settings.restrictedTopics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                    >
                      {topic}
                      <button onClick={() => removeRestrictedTopic(topic)} className="hover:text-red-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addRestrictedTopic()}
                    placeholder="Agregar tema..."
                    className="flex-1 rounded-lg border border-[#1e293b] bg-[#080c14] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                  />
                  <button
                    onClick={addRestrictedTopic}
                    className="rounded-lg border border-[#1e293b] bg-[#080c14] px-3 py-2 text-sm text-slate-400 transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* Max Messages */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Maximo de mensajes antes de handoff
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={settings.maxMessagesBeforeHandoff}
                  onChange={(e) => updateSetting('maxMessagesBeforeHandoff', Number(e.target.value))}
                  className="w-32 rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Despues de este numero de mensajes sin resolucion, el bot transferira a un agente.
                </p>
              </div>

              {/* Fallback Action */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Accion de Respaldo
                </label>
                <select
                  value={settings.fallbackAction}
                  onChange={(e) => updateSetting('fallbackAction', e.target.value as FallbackAction)}
                  className="w-full rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 sm:w-64"
                >
                  {fallbackOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Section */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117]">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-lg font-semibold text-slate-200">Avanzado</span>
              </div>
              {showAdvanced ? (
                <ChevronUp className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
            </button>
            {showAdvanced && (
              <div className="border-t border-[#1e293b] p-6">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  System Prompt Override
                </label>
                <textarea
                  value={settings.systemPrompt}
                  onChange={(e) => updateSetting('systemPrompt', e.target.value)}
                  rows={8}
                  placeholder="Deja vacio para usar el prompt generado automaticamente basado en la configuracion anterior..."
                  className="w-full rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono"
                />
                <p className="mt-1.5 text-xs text-amber-400/80">
                  Advertencia: Esto sobrescribe completamente el prompt del sistema. Usa con cuidado.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110">
              <Rocket className="h-4 w-4" />
              Desplegar en WhatsApp
            </button>
          </div>
        </div>

        {/* -- Live Preview (Right 1/3) --------------------------------- */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8">
            <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] overflow-hidden">
              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-[#1e293b] bg-emerald-500/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                    <Bot className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{settings.name || 'Bot'}</h3>
                    <span className="text-xs text-emerald-400">Vista previa interactiva</span>
                  </div>
                </div>
                {chatMessages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="flex items-center gap-1.5 rounded-lg border border-[#1e293b] bg-[#080c14]/60 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-red-500/30 hover:text-red-400"
                    title="Limpiar chat"
                  >
                    <Trash2 className="h-3 w-3" />
                    Limpiar chat
                  </button>
                )}
              </div>

              {/* WhatsApp-style Chat */}
              <div
                ref={chatContainerRef}
                className="space-y-3 overflow-y-auto p-4"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  maxHeight: 480,
                  minHeight: 400,
                }}
              >
                {allMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        msg.isError
                          ? 'border border-red-500/30 bg-red-500/10 text-red-400 rounded-bl-sm'
                          : msg.sender === 'user'
                          ? 'bg-white/10 text-slate-200 rounded-br-sm'
                          : 'bg-emerald-500/15 border border-emerald-500/20 text-slate-200 rounded-bl-sm'
                      }`}
                    >
                      {msg.isError && (
                        <AlertCircle className="mb-1 inline-block h-3 w-3 mr-1" />
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Separator between preview and interactive messages */}
                {chatMessages.length === 0 && (
                  <div className="flex items-center gap-2 py-2">
                    <div className="h-px flex-1 bg-[#1e293b]" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                      Escribe para probar
                    </span>
                    <div className="h-px flex-1 bg-[#1e293b]" />
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={chatEndRef} />
              </div>

              {/* Interactive Input */}
              <div className="border-t border-[#1e293b] bg-[#080c14] p-3">
                {chatError && !isTyping && (
                  <div className="mb-2 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-2">{chatError}</span>
                    <button
                      onClick={() => setChatError(null)}
                      className="ml-auto flex-shrink-0 text-red-400/60 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0d1117] px-3 py-2 focus-within:border-emerald-500/30 focus-within:ring-1 focus-within:ring-emerald-500/10 transition-all">
                  <Smile className="h-4 w-4 flex-shrink-0 text-slate-500" />
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un mensaje..."
                    disabled={isTyping}
                    className="flex-1 bg-transparent text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className={`flex-shrink-0 rounded-full p-1 transition-all ${
                      chatInput.trim() && !isTyping
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Summary */}
            <div className="mt-4 rounded-xl border border-[#1e293b] bg-[#0d1117] p-4">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Configuracion Actual
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tono</span>
                  <span className="text-slate-300">{toneConfig.find((t) => t.key === settings.tone)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Formalidad</span>
                  <span className="text-slate-300">{settings.formality}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pronombre</span>
                  <span className="text-slate-300">{settings.pronoun === 'tu' ? 'Tu' : 'Usted'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emojis</span>
                  <span className="text-slate-300">{emojiOptions.find((o) => o.key === settings.emojiLevel)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Idioma</span>
                  <span className="text-slate-300">{languageOptions.find((l) => l.key === settings.language)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Handoff</span>
                  <span className="text-slate-300">{settings.maxMessagesBeforeHandoff} msgs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
