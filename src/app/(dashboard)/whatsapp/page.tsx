'use client';

import { useState } from 'react';
import {
  Phone,
  Plus,
  Wifi,
  WifiOff,
  Clock,
  ChevronDown,
  ChevronUp,
  Bot,
  Unplug,
  MessageSquare,
  Info,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NumberStatus = 'active' | 'pending' | 'disconnected';

interface BusinessHours {
  enabled: boolean;
  start: string;
  end: string;
  timezone: string;
  days: string[];
}

interface WhatsAppNumber {
  id: string;
  phoneNumber: string;
  displayName: string;
  wabaId: string;
  status: NumberStatus;
  botPersonality: string;
  businessHours: BusinessHours;
  messagesThisMonth: number;
  connectedSince: string;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const numbers: WhatsAppNumber[] = [
  {
    id: 'wa-1',
    phoneNumber: '+507 6100-0001',
    displayName: 'CotiFacil Panama',
    wabaId: 'WABA-1234567890',
    status: 'active',
    botPersonality: 'Mi Agente',
    businessHours: {
      enabled: true,
      start: '08:00',
      end: '20:00',
      timezone: 'America/Panama',
      days: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    },
    messagesThisMonth: 1248,
    connectedSince: '15 Ene 2026',
  },
];

const botPersonalities = ['Mi Agente', 'Agente Formal', 'Agente Express'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<NumberStatus, { label: string; dotColor: string; icon: React.ReactNode }> = {
  active: { label: 'Activo', dotColor: 'bg-emerald-500', icon: <Wifi className="h-4 w-4 text-emerald-400" /> },
  pending: { label: 'Pendiente', dotColor: 'bg-amber-500', icon: <Clock className="h-4 w-4 text-amber-400" /> },
  disconnected: { label: 'Desconectado', dotColor: 'bg-red-500', icon: <WifiOff className="h-4 w-4 text-red-400" /> },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WhatsAppPage() {
  const [expandedHours, setExpandedHours] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#080c14] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200 font-heading">
          WhatsApp Business
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Administra tus numeros de WhatsApp conectados
        </p>
      </div>

      {/* Connected Numbers */}
      <div className="mb-8 space-y-4">
        {numbers.map((num) => {
          const sc = statusConfig[num.status];
          const isHoursExpanded = expandedHours === num.id;

          return (
            <div
              key={num.id}
              className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-6"
            >
              {/* Header Row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <MessageSquare className="h-6 w-6 text-emerald-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-200">{num.displayName}</h3>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        num.status === 'active'
                          ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                          : num.status === 'pending'
                          ? 'border-amber-500/30 bg-amber-500/15 text-amber-400'
                          : 'border-red-500/30 bg-red-500/15 text-red-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                        {sc.label}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone className="h-3.5 w-3.5 text-slate-500" />
                        {num.phoneNumber}
                      </div>
                      <div className="text-slate-500">
                        WABA: <span className="font-mono text-xs text-slate-400">{num.wabaId}</span>
                      </div>
                      <div className="text-slate-500">
                        Conectado: <span className="text-slate-400">{num.connectedSince}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20">
                  <Unplug className="h-4 w-4" />
                  Desconectar
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#1e293b] bg-[#080c14] p-3">
                  <span className="text-xs text-slate-500">Mensajes este mes</span>
                  <p className="mt-1 text-lg font-bold text-slate-200 font-data">{num.messagesThisMonth.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-[#1e293b] bg-[#080c14] p-3">
                  <span className="text-xs text-slate-500">Personalidad del Bot</span>
                  <div className="mt-1">
                    <select
                      defaultValue={num.botPersonality}
                      className="w-full rounded-md border border-[#1e293b] bg-[#0d1117] px-2 py-1 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                    >
                      {botPersonalities.map((bp) => (
                        <option key={bp} value={bp}>{bp}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-2 rounded-lg border border-[#1e293b] bg-[#080c14] p-3 sm:col-span-1">
                  <span className="text-xs text-slate-500">Estado</span>
                  <div className="mt-1 flex items-center gap-2">
                    {sc.icon}
                    <span className="text-sm font-medium text-slate-200">Operacional</span>
                  </div>
                </div>
              </div>

              {/* Business Hours (Collapsible) */}
              <div className="mt-4 border-t border-[#1e293b] pt-4">
                <button
                  onClick={() => setExpandedHours(isHoursExpanded ? null : num.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-300">Horario de Atencion</span>
                    {num.businessHours.enabled && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">
                        Activo
                      </span>
                    )}
                  </div>
                  {isHoursExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  )}
                </button>

                {isHoursExpanded && (
                  <div className="mt-3 rounded-lg border border-[#1e293b] bg-[#080c14] p-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs text-slate-500">Hora de Inicio</label>
                        <p className="text-sm text-slate-200">{num.businessHours.start}</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Hora de Fin</label>
                        <p className="text-sm text-slate-200">{num.businessHours.end}</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Zona Horaria</label>
                        <p className="text-sm text-slate-200">{num.businessHours.timezone}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="text-xs text-slate-500">Dias Activos</label>
                      <div className="mt-1 flex gap-1.5">
                        {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => (
                          <span
                            key={day}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                              num.businessHours.days.includes(day)
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-[#0d1117] text-slate-600 border border-[#1e293b]'
                            }`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      Fuera del horario, el bot enviara un mensaje automatico indicando cuando estaran disponibles.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect New Number */}
      <div className="rounded-xl border-2 border-dashed border-[#1e293b] bg-[#0d1117]/50 p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Plus className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">Conectar Nuevo Numero</h3>
          <p className="mt-2 text-sm text-slate-400">
            Conecta un nuevo numero de WhatsApp Business a tu cuenta de CotiFacil a traves de Meta Embedded Signup.
          </p>

          <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110">
            <MessageSquare className="h-4 w-4" />
            Conectar con Meta
            <ExternalLink className="h-3.5 w-3.5" />
          </button>

          {/* Info Card */}
          <div className="mt-6 rounded-lg border border-[#1e293b] bg-[#080c14] p-4 text-left">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <div className="text-xs text-slate-400 space-y-2">
                <p>
                  <strong className="text-slate-300">Meta Embedded Signup</strong> te permite conectar tu numero de WhatsApp Business directamente desde esta plataforma.
                </p>
                <p>
                  <strong className="text-slate-300">Requisitos:</strong>
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Una cuenta de Meta Business verificada</li>
                  <li>Un numero de telefono no registrado en WhatsApp personal</li>
                  <li>Acceso a recibir SMS o llamadas en ese numero</li>
                </ul>
                <p>
                  <strong className="text-slate-300">Costo:</strong> El uso de la API de WhatsApp Business tiene un costo aproximado de <span className="text-emerald-400 font-medium">$100/mes</span> dependiendo del volumen de mensajes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
