'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Phone,
  Clock,
  Send,
  User,
  Bot,
  Shield,
  HandMetal,
  ExternalLink,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConversationStatus = 'active' | 'waiting' | 'human' | 'closed';

interface Message {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  clientName: string;
  phone: string;
  lastMessage: string;
  time: string;
  status: ConversationStatus;
  insuranceType: string;
  messages: Message[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const conversations: Conversation[] = [
  {
    id: '1',
    clientName: 'Maria Gonzalez',
    phone: '+507 6234-5678',
    lastMessage: 'Me interesa un seguro de auto para mi Toyota Corolla 2023',
    time: 'Hace 2 min',
    status: 'active',
    insuranceType: 'Auto',
    messages: [
      { id: 'm1', sender: 'bot', text: 'Hola Maria! Soy tu asistente de seguros. En que puedo ayudarte hoy?', time: '10:30 AM' },
      { id: 'm2', sender: 'user', text: 'Hola! Me interesa un seguro de auto para mi Toyota Corolla 2023', time: '10:31 AM' },
      { id: 'm3', sender: 'bot', text: 'Excelente eleccion! Para cotizarte las mejores opciones, necesito algunos datos. Cual es el ano de tu vehiculo?', time: '10:31 AM' },
      { id: 'm4', sender: 'user', text: 'Es modelo 2023, tiene aproximadamente 15,000 km', time: '10:32 AM' },
      { id: 'm5', sender: 'bot', text: 'Perfecto! He encontrado 4 cotizaciones para ti. La mejor opcion es ASSA con cobertura completa por $85/mes. Te envio los detalles?', time: '10:33 AM' },
    ],
  },
  {
    id: '2',
    clientName: 'Carlos Perez',
    phone: '+507 6345-6789',
    lastMessage: 'Ya seleccione la cotizacion de ASSA, como pago?',
    time: 'Hace 15 min',
    status: 'waiting',
    insuranceType: 'Auto',
    messages: [
      { id: 'm1', sender: 'bot', text: 'Hola Carlos! Bienvenido. Como te puedo ayudar?', time: '09:45 AM' },
      { id: 'm2', sender: 'user', text: 'Necesito un seguro para mi Honda CRV 2022', time: '09:46 AM' },
      { id: 'm3', sender: 'bot', text: 'Tengo 3 excelentes opciones para tu Honda CRV. Te las envio ahora mismo!', time: '09:47 AM' },
      { id: 'm4', sender: 'user', text: 'Ya seleccione la cotizacion de ASSA, como pago?', time: '10:15 AM' },
      { id: 'm5', sender: 'bot', text: 'Te he enviado un enlace de pago por Yappy. El monto es $92/mes. Una vez confirmado, tu poliza se genera automaticamente!', time: '10:15 AM' },
    ],
  },
  {
    id: '3',
    clientName: 'Ana Rodriguez',
    phone: '+507 6456-7890',
    lastMessage: 'Necesito hablar con un agente sobre la cobertura',
    time: 'Hace 32 min',
    status: 'human',
    insuranceType: 'Salud',
    messages: [
      { id: 'm1', sender: 'bot', text: 'Hola Ana! Estoy aqui para ayudarte con tu seguro de salud.', time: '09:20 AM' },
      { id: 'm2', sender: 'user', text: 'Tengo dudas sobre que cubre exactamente el plan familiar', time: '09:22 AM' },
      { id: 'm3', sender: 'bot', text: 'El plan familiar de Mapfre cubre consultas medicas, hospitalizacion, examenes y emergencias para hasta 5 miembros.', time: '09:22 AM' },
      { id: 'm4', sender: 'user', text: 'Necesito hablar con un agente sobre la cobertura', time: '09:28 AM' },
      { id: 'm5', sender: 'bot', text: 'Entendido! Te transfiero con un agente especializado. Un momento por favor...', time: '09:28 AM' },
    ],
  },
  {
    id: '4',
    clientName: 'Juan Martinez',
    phone: '+507 6567-8901',
    lastMessage: 'Gracias, ya recibi mi poliza por correo',
    time: 'Hace 1 hora',
    status: 'closed',
    insuranceType: 'Hogar',
    messages: [
      { id: 'm1', sender: 'bot', text: 'Hola Juan! Tu pago ha sido confirmado exitosamente.', time: '08:40 AM' },
      { id: 'm2', sender: 'bot', text: 'Tu poliza de seguro de hogar con Seguros Suramericana ya fue generada. Te la envio por correo ahora.', time: '08:41 AM' },
      { id: 'm3', sender: 'user', text: 'Gracias, ya recibi mi poliza por correo', time: '09:00 AM' },
    ],
  },
  {
    id: '5',
    clientName: 'Laura Castillo',
    phone: '+507 6678-9012',
    lastMessage: 'Quiero comparar seguros de salud para mi familia',
    time: 'Hace 2 horas',
    status: 'active',
    insuranceType: 'Salud',
    messages: [
      { id: 'm1', sender: 'bot', text: 'Hola Laura! Bienvenida a CotiFacil. En que te puedo ayudar?', time: '08:10 AM' },
      { id: 'm2', sender: 'user', text: 'Quiero comparar seguros de salud para mi familia', time: '08:12 AM' },
      { id: 'm3', sender: 'bot', text: 'Con gusto! Cuantos miembros tiene tu familia y cuales son sus edades?', time: '08:12 AM' },
      { id: 'm4', sender: 'user', text: 'Somos 4: yo (35), mi esposo (37), y dos hijos de 8 y 5 anos', time: '08:14 AM' },
      { id: 'm5', sender: 'bot', text: 'He encontrado 5 planes familiares excelentes. El mas economico es Pan American Life desde $180/mes con cobertura completa. Te muestro la comparacion?', time: '08:15 AM' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusColors: Record<ConversationStatus, string> = {
  active: 'bg-emerald-500',
  waiting: 'bg-amber-500',
  human: 'bg-blue-500',
  closed: 'bg-slate-500',
};

const statusLabels: Record<ConversationStatus, string> = {
  active: 'Activas',
  waiting: 'Esperando Pago',
  human: 'Humano',
  closed: 'Cerradas',
};

const filterOptions: ConversationStatus[] = ['active', 'waiting', 'human', 'closed'];

const insuranceBadgeColors: Record<string, string> = {
  Auto: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Salud: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Hogar: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Viaje: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ConversationsContent() {
  const searchParams = useSearchParams();
  const urlId = searchParams.get('id');
  const urlFilter = searchParams.get('filter') as ConversationStatus | null;

  const [selectedId, setSelectedId] = useState<string>(urlId ?? '1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ConversationStatus | 'all'>(urlFilter ?? 'all');
  const [inputMessage, setInputMessage] = useState('');

  // Sync state when URL params change
  useEffect(() => {
    if (urlId) setSelectedId(urlId);
  }, [urlId]);

  useEffect(() => {
    if (urlFilter) setActiveFilter(urlFilter);
  }, [urlFilter]);

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesFilter = activeFilter === 'all' || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? conversations[0];

  return (
    <div className="flex h-screen bg-[#080c14]">
      {/* ── Left Panel: Conversation List ──────────────────────────── */}
      <div className="flex w-full flex-col border-r border-[#1e293b] lg:w-1/3">
        {/* Search & Filter */}
        <div className="border-b border-[#1e293b] p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre o telefono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#1e293b] bg-[#0d1117] py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 border border-[#1e293b] hover:text-slate-300'
              }`}
            >
              Todas
            </button>
            {filterOptions.map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === status
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 border border-[#1e293b] hover:text-slate-300'
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`flex w-full items-start gap-3 border-b border-[#1e293b]/50 p-4 text-left transition-colors ${
                selectedId === conv.id
                  ? 'bg-[#0d1117] border-l-2 border-l-emerald-500'
                  : 'hover:bg-[#0d1117]/50'
              }`}
            >
              {/* Status */}
              <span className="relative mt-1 flex h-2.5 w-2.5 shrink-0">
                {conv.status === 'active' && (
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColors[conv.status]}`} />
                )}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusColors[conv.status]}`} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">{conv.clientName}</span>
                  <span className="text-xs text-slate-500">{conv.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-400">{conv.lastMessage}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs text-slate-500">{conv.phone}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Right Panel: Chat View ─────────────────────────────────── */}
      <div className="hidden flex-1 flex-col lg:flex">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-[#1e293b] bg-[#0d1117] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e293b]">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/clients/C-${selectedConversation.id.padStart(3, '0')}`}
                  className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  {selectedConversation.clientName}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    insuranceBadgeColors[selectedConversation.insuranceType] ?? 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}
                >
                  {selectedConversation.insuranceType}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Phone className="h-3 w-3" />
                {selectedConversation.phone}
              </div>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20">
            <HandMetal className="h-4 w-4" />
            Tomar Control
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedConversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-white/10 text-slate-200'
                    : msg.sender === 'agent'
                    ? 'bg-blue-500/15 border border-blue-500/20 text-slate-200'
                    : 'bg-emerald-500/15 border border-emerald-500/20 text-slate-200'
                }`}
              >
                {msg.sender !== 'user' && (
                  <div className="mb-1 flex items-center gap-1">
                    {msg.sender === 'bot' ? (
                      <Bot className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <User className="h-3 w-3 text-blue-400" />
                    )}
                    <span className={`text-xs font-medium ${msg.sender === 'bot' ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {msg.sender === 'bot' ? 'Bot' : 'Agente'}
                    </span>
                  </div>
                )}
                <p className="text-sm">{msg.text}</p>
                <div className={`mt-1 flex items-center gap-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span className="text-xs text-slate-500">{msg.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#1e293b] bg-[#0d1117] p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Escribe un mensaje para tomar control de la conversacion..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white transition-opacity hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Al enviar un mensaje, tomaras el control de esta conversacion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConversationsPage() {
  return (
    <Suspense>
      <ConversationsContent />
    </Suspense>
  );
}
