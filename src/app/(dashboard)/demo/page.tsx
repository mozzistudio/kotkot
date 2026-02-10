'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Send, Paperclip } from 'lucide-react';

interface QuoteCard {
  insurerName: string;
  planName: string;
  monthlyPremium: number;
  coverageItems: string[];
  color: string;
}

interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  content: string;
  type: 'text' | 'buttons' | 'cards' | 'doc_request' | 'doc_uploaded';
  buttons?: string[];
  cards?: QuoteCard[];
  timestamp: Date;
}

type Stage =
  | 'greeting' | 'type_selection' | 'brand' | 'model' | 'year' | 'use' | 'coverage'
  | 'loading_quotes' | 'show_quotes' | 'quote_selected'
  | 'doc_1' | 'doc_2' | 'doc_3' | 'complete';

const stageInfo: Record<string, { emoji: string; title: string; description: string; extra?: string }> = {
  greeting: { emoji: '👋', title: 'Bienvenida', description: 'El bot saluda al cliente y le pregunta qué necesita.' },
  type_selection: { emoji: '🎯', title: 'Selección de seguro', description: 'El cliente elige el tipo de seguro que le interesa.' },
  brand: { emoji: '📝', title: 'Recopilación de datos', description: 'El bot recopila la información necesaria para generar cotizaciones precisas.', extra: 'Pregunta 1 de 5' },
  model: { emoji: '📝', title: 'Recopilación de datos', description: 'El bot recopila la información necesaria para generar cotizaciones precisas.', extra: 'Pregunta 2 de 5' },
  year: { emoji: '📝', title: 'Recopilación de datos', description: 'El bot recopila la información necesaria para generar cotizaciones precisas.', extra: 'Pregunta 3 de 5' },
  use: { emoji: '📝', title: 'Recopilación de datos', description: 'El bot recopila la información necesaria para generar cotizaciones precisas.', extra: 'Pregunta 4 de 5' },
  coverage: { emoji: '📝', title: 'Recopilación de datos', description: 'El bot recopila la información necesaria para generar cotizaciones precisas.', extra: 'Pregunta 5 de 5' },
  loading_quotes: { emoji: '🔍', title: 'Consultando aseguradoras', description: 'CotiFácil consulta en tiempo real las ofertas de 8 aseguradoras en Panamá.' },
  show_quotes: { emoji: '💰', title: 'Presentación de ofertas', description: 'Se presentan 4 opciones ordenadas por precio. El cliente puede comparar coberturas y elegir.' },
  quote_selected: { emoji: '✅', title: 'Oferta seleccionada', description: 'El cliente ha elegido su seguro. Ahora recopilamos los documentos.' },
  doc_1: { emoji: '📎', title: 'Recopilación documental', description: 'El bot solicita documentos uno por uno. La IA de visión verifica automáticamente cada documento.', extra: 'Progreso: 1/8' },
  doc_2: { emoji: '📎', title: 'Recopilación documental', description: 'El bot solicita documentos uno por uno. La IA de visión verifica automáticamente cada documento.', extra: 'Progreso: 2/8' },
  doc_3: { emoji: '📎', title: 'Recopilación documental', description: 'El bot solicita documentos uno por uno. La IA de visión verifica automáticamente cada documento.', extra: 'Progreso: 3/8' },
  complete: { emoji: '🎉', title: '¡Proceso completo!', description: 'El lead queda registrado en tu dashboard con toda la información. Un asesor puede ahora cerrar la venta.' },
};

const insurerColors = ['#2D8C4E', '#2563EB', '#E67E22', '#7C3AED'];

export default function DemoPage() {
  const { data: session } = useSession();
  const brandName = session?.user?.brandName || 'Seguros Pacífico';
  const primaryColor = session?.user?.primaryColor || '#2D8C4E';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stage, setStage] = useState<Stage>('greeting');
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [currentButtons, setCurrentButtons] = useState<string[]>([]);
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [selectedInsurer, setSelectedInsurer] = useState('');
  const [_selectedPlan, setSelectedPlan] = useState('');
  const [selectedPremium, setSelectedPremium] = useState(0);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, typing, scrollToBottom]);

  function addMessage(msg: Omit<ChatMessage, 'id' | 'timestamp'>) {
    setMessages(prev => [...prev, { ...msg, id: Date.now().toString() + Math.random(), timestamp: new Date() }]);
  }

  function addBotMessage(content: string, type: ChatMessage['type'] = 'text', extra?: { buttons?: string[]; cards?: QuoteCard[] }) {
    return new Promise<void>((resolve) => {
      setTyping(true);
      setInputDisabled(true);
      const delay = 600 + Math.random() * 600;
      setTimeout(() => {
        setTyping(false);
        addMessage({ from: 'bot', content, type, buttons: extra?.buttons, cards: extra?.cards });
        resolve();
      }, delay);
    });
  }

  async function startChat() {
    setStage('greeting');
    const btns = ['🚗 Auto', '🏍️ Moto', '🏥 Salud', '🏠 Hogar', '✈️ Viaje', '🏢 Empresarial'];
    await addBotMessage(
      `¡Hola! 👋 Soy el asistente virtual de **${brandName}**. Estoy aquí para ayudarte a encontrar el mejor seguro.\n\n¿Qué tipo de seguro necesitas?`,
      'buttons',
      { buttons: btns }
    );
    setCurrentButtons(btns);
    setShowButtons(true);
    setStage('type_selection');
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      startChat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleButtonClick(btn: string) {
    setShowButtons(false);
    setCurrentButtons([]);
    addMessage({ from: 'user', content: btn, type: 'text' });

    if (stage === 'type_selection') {
      if (!btn.includes('Auto')) {
        await addBotMessage('Esta demo muestra el flujo de Auto. ¡Selecciona 🚗 Auto para continuar!', 'buttons', { buttons: ['🚗 Auto'] });
        setCurrentButtons(['🚗 Auto']);
        setShowButtons(true);
        return;
      }
      setStage('brand');
      await addBotMessage('¡Perfecto! Seguro de auto. 🚗\n\n¿Cuál es la **marca** de tu vehículo?', 'buttons', { buttons: ['Toyota', 'Hyundai', 'Kia'] });
      setCurrentButtons(['Toyota', 'Hyundai', 'Kia']);
      setShowButtons(true);
      setInputDisabled(false);
      return;
    }

    if (stage === 'brand') {
      const brand = btn;
      setVehicleBrand(brand);
      setStage('model');
      let models = ['Corolla', 'RAV4', 'Hilux'];
      if (brand === 'Hyundai') models = ['Tucson', 'Accent', 'Creta'];
      else if (brand === 'Kia') models = ['Sportage', 'Rio', 'Seltos'];
      await addBotMessage('¿Y el **modelo**?', 'buttons', { buttons: models });
      setCurrentButtons(models);
      setShowButtons(true);
      setInputDisabled(false);
      return;
    }

    if (stage === 'model') {
      setVehicleModel(btn);
      setStage('year');
      await addBotMessage('¿De qué **año** es?', 'buttons', { buttons: ['2024', '2023', '2022', '2021'] });
      setCurrentButtons(['2024', '2023', '2022', '2021']);
      setShowButtons(true);
      setInputDisabled(false);
      return;
    }

    if (stage === 'year') {
      setVehicleYear(btn);
      setStage('use');
      await addBotMessage('¿Lo usas de forma **personal** o **comercial**?', 'buttons', { buttons: ['🏠 Personal', '💼 Comercial'] });
      setCurrentButtons(['🏠 Personal', '💼 Comercial']);
      setShowButtons(true);
      return;
    }

    if (stage === 'use') {
      setStage('coverage');
      await addBotMessage('¿Qué tipo de **cobertura** te interesa?', 'buttons', { buttons: ['🛡️ Básica', '⭐ Completa', '💎 Todo Riesgo'] });
      setCurrentButtons(['🛡️ Básica', '⭐ Completa', '💎 Todo Riesgo']);
      setShowButtons(true);
      return;
    }

    if (stage === 'coverage') {
      setStage('loading_quotes');
      const b = vehicleBrand || 'Toyota';
      const m = vehicleModel || 'Corolla';
      const y = vehicleYear || '2023';
      await addBotMessage(`¡Excelente! Dame un momento mientras busco las mejores ofertas para tu **${b} ${m} ${y}**... 🔍`);
      setTyping(true);
      setTimeout(async () => {
        setTyping(false);
        setStage('show_quotes');
        const cards: QuoteCard[] = [
          { insurerName: 'ASSA Compañía de Seguros', planName: 'Plan Básico', monthlyPremium: 118.50, coverageItems: ['Responsabilidad civil', 'Robo total', 'Asistencia vial 24/7'], color: insurerColors[0] },
          { insurerName: 'Mapfre Panamá', planName: 'Plan Estándar', monthlyPremium: 132.75, coverageItems: ['Responsabilidad civil', 'Daños propios', 'Robo total'], color: insurerColors[1] },
          { insurerName: 'Generali Seguros', planName: 'Plan Premium', monthlyPremium: 155.20, coverageItems: ['Responsabilidad civil', 'Daños propios', 'Auto sustituto'], color: insurerColors[2] },
          { insurerName: 'Seguros Suramericana', planName: 'Plan Elite', monthlyPremium: 168.90, coverageItems: ['Cobertura total', 'Auto sustituto', 'Vidrios incluidos'], color: insurerColors[3] },
        ];
        addMessage({ from: 'bot', content: 'Encontré **4 opciones** de aseguradoras en Panamá para ti:', type: 'cards', cards });
      }, 3000);
      return;
    }

    // Doc upload buttons handled separately
    if (btn === '📎 Adjuntar foto') {
      simulateUpload();
      return;
    }
  }

  async function handleQuoteSelect(card: QuoteCard) {
    setSelectedInsurer(card.insurerName);
    setSelectedPlan(card.planName);
    setSelectedPremium(card.monthlyPremium);
    addMessage({ from: 'user', content: `Elegir ${card.planName}`, type: 'text' });
    setStage('quote_selected');
    await addBotMessage(
      `✅ ¡Excelente elección! Has seleccionado el **${card.planName}** de **${card.insurerName}** por **B/. ${card.monthlyPremium.toFixed(2)}/mes**.\n\nAhora necesito algunos documentos para procesar tu cotización. Te los pediré uno por uno. 📋`
    );
    setStage('doc_1');
    await addBotMessage('📸 Por favor, envíame una foto de tu **cédula (frente)**', 'doc_request');
    setShowButtons(true);
    setCurrentButtons(['📎 Adjuntar foto']);
  }

  async function simulateUpload() {
    setShowButtons(false);
    setCurrentButtons([]);
    setUploadingDoc(true);
    setUploadProgress(0);
    addMessage({ from: 'user', content: '📷 Foto enviada', type: 'doc_uploaded' });

    // Animate upload progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 75));
      setUploadProgress(i);
    }
    setUploadingDoc(false);

    if (stage === 'doc_1') {
      await addBotMessage('✅ Cédula (frente) recibida y verificada');
      setStage('doc_2');
      await addBotMessage('📸 Ahora la **cédula (reverso)**', 'doc_request');
      setShowButtons(true);
      setCurrentButtons(['📎 Adjuntar foto']);
    } else if (stage === 'doc_2') {
      await addBotMessage('✅ Cédula (reverso) recibida y verificada');
      setStage('doc_3');
      await addBotMessage('📸 Tu **licencia de conducir**', 'doc_request');
      setShowButtons(true);
      setCurrentButtons(['📎 Adjuntar foto']);
    } else if (stage === 'doc_3') {
      await addBotMessage('✅ Licencia de conducir recibida y verificada');
      await addBotMessage('✅ ¡Perfecto! En el flujo completo te pediría 5 documentos más (tarjeta de circulación y 4 fotos del vehículo), pero para esta demo, ¡vamos directo al resultado! 🦊');
      setStage('complete');
      const b = vehicleBrand || 'Toyota';
      const m = vehicleModel || 'Corolla';
      await addBotMessage(`🎉 **¡Tu cotización está lista!**\n\nHe generado un documento PDF con todos los detalles de tu seguro.`);
      // PDF card as text
      addMessage({
        from: 'bot',
        content: `📄 **Cotización de Seguro — ${b} ${m}**\n${selectedInsurer}\nB/. ${selectedPremium.toFixed(2)}/mes\nFecha: ${new Date().toLocaleDateString('es-PA')}`,
        type: 'text',
      });
      await addBotMessage(`Un asesor de **${brandName}** te contactará en las próximas 24 horas para finalizar la contratación.\n\n¡Gracias por confiar en nosotros! 🦊`);
    }
  }

  function handleTextSubmit() {
    if (!inputValue.trim() || inputDisabled) return;
    const text = inputValue.trim();
    setInputValue('');
    handleButtonClick(text);
  }

  // Markdown-like bold rendering
  function renderContent(content: string) {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // Handle newlines
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>{j > 0 && <br />}{line}</span>
      ));
    });
  }

  const info = stageInfo[stage] || stageInfo.greeting;

  return (
    <div className="flex flex-col lg:flex-row gap-6 -mx-4 md:-mx-6 -mt-4 md:-mt-6 min-h-[calc(100vh-4rem)]">
      {/* Phone frame */}
      <div className="lg:w-[420px] flex-shrink-0 flex justify-center p-4 md:p-6">
        <div className="w-full max-w-[375px] h-[700px] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Phone header */}
          <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: primaryColor }}>
            <span className="text-sm">←</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{brandName}</p>
              <p className="text-xs opacity-70">en línea</p>
            </div>
          </div>

          {/* Chat area */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#ECE5DD]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.from === 'user'
                  ? 'bg-[#DCF8C6] rounded-tl-xl rounded-bl-xl rounded-br-xl'
                  : 'bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl'
                } p-2.5 shadow-sm`}>
                  {msg.type === 'cards' && msg.cards ? (
                    <div className="space-y-2">
                      <p className="text-xs mb-2">{renderContent(msg.content)}</p>
                      {msg.cards.map((card, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                          <div className="h-1" style={{ backgroundColor: card.color }} />
                          <div className="p-3">
                            <p className="text-xs font-bold text-slate-900">{card.insurerName}</p>
                            <p className="text-[10px] text-slate-500">{card.planName}</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">B/. {card.monthlyPremium.toFixed(2)} <span className="text-[10px] font-normal text-slate-500">/mes</span></p>
                            <div className="mt-1.5 space-y-0.5">
                              {card.coverageItems.map((ci, j) => (
                                <p key={j} className="text-[10px] text-slate-600">✓ {ci}</p>
                              ))}
                            </div>
                            <button onClick={() => handleQuoteSelect(card)}
                              className="mt-2 w-full text-xs font-medium py-1.5 rounded-md border border-brand text-brand hover:bg-brand hover:text-white transition-colors">
                              Elegir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : msg.type === 'doc_uploaded' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
                        <Paperclip className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-xs text-slate-700">{msg.content}</span>
                    </div>
                  ) : (
                    <p className="text-xs leading-relaxed">{renderContent(msg.content)}</p>
                  )}
                  <p className="text-[9px] text-slate-400 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Upload progress */}
            {uploadingDoc && (
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-tl-xl rounded-bl-xl rounded-br-xl p-2.5 shadow-sm max-w-[85%]">
                  <div className="w-40">
                    <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                      <span>Subiendo...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="bg-brand h-1.5 rounded-full transition-all duration-75" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot-1" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot-2" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot-3" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick reply buttons */}
          {showButtons && currentButtons.length > 0 && (
            <div className="px-3 py-2 bg-[#ECE5DD] border-t border-slate-200/50 flex flex-wrap gap-1.5">
              {currentButtons.map((btn) => (
                <button key={btn} onClick={() => handleButtonClick(btn)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors bg-white">
                  {btn}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-2 bg-[#F0F0F0] flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder={inputDisabled ? 'Usa los botones de arriba...' : 'Escribe un mensaje...'}
              disabled={inputDisabled}
              className="flex-1 text-xs px-3 py-2 rounded-full bg-white border-none outline-none disabled:bg-slate-100 disabled:text-slate-400"
            />
            <button onClick={handleTextSubmit} disabled={inputDisabled || !inputValue.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white disabled:opacity-50" style={{ backgroundColor: primaryColor }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-4 md:p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-20">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Lo que está pasando</h3>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Inicio</span>
              <span>Completado</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-brand h-2 rounded-full transition-all duration-500" style={{
                width: `${
                  stage === 'greeting' || stage === 'type_selection' ? 5 :
                  stage === 'brand' ? 15 : stage === 'model' ? 25 : stage === 'year' ? 35 :
                  stage === 'use' ? 45 : stage === 'coverage' ? 55 :
                  stage === 'loading_quotes' ? 60 : stage === 'show_quotes' ? 65 :
                  stage === 'quote_selected' ? 70 :
                  stage === 'doc_1' ? 78 : stage === 'doc_2' ? 85 : stage === 'doc_3' ? 92 :
                  100
                }%`
              }} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{info.emoji}</span>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{info.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{info.description}</p>
                {info.extra && (
                  <p className="text-xs text-brand font-medium mt-2">{info.extra}</p>
                )}
              </div>
            </div>

            {stage === 'loading_quotes' && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                Consultando aseguradoras...
              </div>
            )}

            {(stage === 'doc_1' || stage === 'doc_2' || stage === 'doc_3') && (
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Documentos</span>
                  <span>{stage === 'doc_1' ? '0' : stage === 'doc_2' ? '1' : '2'}/8</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all" style={{
                    width: `${stage === 'doc_1' ? 0 : stage === 'doc_2' ? 12.5 : 25}%`
                  }} />
                </div>
              </div>
            )}

            {stage === 'complete' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium">El lead ha sido procesado exitosamente.</p>
                <p className="text-xs text-green-600 mt-1">En producción, toda esta información se registra automáticamente en tu dashboard.</p>
              </div>
            )}
          </div>

          {/* Reset button */}
          <button onClick={() => {
            setMessages([]);
            setStage('greeting');
            setInputValue('');
            setTyping(false);
            setShowButtons(false);
            setCurrentButtons([]);
            setVehicleBrand('');
            setVehicleModel('');
            setVehicleYear('');
            setSelectedInsurer('');
            setSelectedPlan('');
            setSelectedPremium(0);
            initialized.current = false;
            setTimeout(() => { initialized.current = true; startChat(); }, 100);
          }} className="mt-6 w-full border border-slate-300 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
            Reiniciar demo
          </button>
        </div>
      </div>
    </div>
  );
}
