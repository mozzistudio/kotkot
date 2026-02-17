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
} from '@/components/shared/icon-map';

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
    displayName: 'Kotkot Panama',
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
// Environment Variables
// ---------------------------------------------------------------------------

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID;

// Debug: Log environment variables
console.log('WhatsApp Page Environment Variables:', {
  FACEBOOK_APP_ID,
  META_CONFIG_ID,
  hasAppId: !!FACEBOOK_APP_ID,
  hasConfigId: !!META_CONFIG_ID,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<NumberStatus, { label: string; dotColor: string; icon: React.ReactNode }> = {
  active: { label: 'Activo', dotColor: 'bg-[var(--success)]', icon: <Wifi className="h-4 w-4 text-[var(--text-primary)]" /> },
  pending: { label: 'Pendiente', dotColor: 'bg-[var(--accent)]', icon: <Clock className="h-4 w-4 text-[var(--text-primary)]" /> },
  disconnected: { label: 'Desconectado', dotColor: 'bg-[var(--error)]', icon: <WifiOff className="h-4 w-4 text-[var(--error)]" /> },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WhatsAppPage() {
  const [expandedHours, setExpandedHours] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWhatsApp = () => {
    setIsConnecting(true);

    // Load Facebook SDK
    if (typeof window !== 'undefined' && !(window as any).FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        (window as any).FB.init({
          appId: FACEBOOK_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v21.0'
        });
        launchEmbeddedSignup();
      };
      script.onerror = () => {
        console.error('Failed to load Facebook SDK');
        setIsConnecting(false);
      };
      document.body.appendChild(script);
    } else {
      launchEmbeddedSignup();
    }
  };

  const launchEmbeddedSignup = () => {
    if (!META_CONFIG_ID) {
      console.error('META_CONFIG_ID not configured');
      alert('Configuration Meta manquante. Veuillez contacter le support.');
      setIsConnecting(false);
      return;
    }

    if (!FACEBOOK_APP_ID) {
      console.error('FACEBOOK_APP_ID not configured');
      alert('Configuration Meta manquante. Veuillez contacter le support.');
      setIsConnecting(false);
      return;
    }

    if (!(window as any).FB) {
      console.error('Facebook SDK not loaded');
      setIsConnecting(false);
      return;
    }

    console.log('Launching embedded signup with config:', {
      config_id: META_CONFIG_ID,
      app_id: FACEBOOK_APP_ID,
    });

    // Subscribe to the auth.authResponseChange event before launching
    (window as any).FB.Event.subscribe('auth.authResponseChange', function(response: any) {
      console.log('Auth response change:', response);

      if (response.status === 'connected' && response.authResponse) {
        const code = response.authResponse.code;
        console.log('Received authorization code:', code);

        // Send code to backend to exchange for access token
        fetch('/api/whatsapp/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => {
            console.log('WhatsApp connected successfully:', data);
            if (data.success) {
              alert('WhatsApp conectado exitosamente!');
              setIsConnecting(false);
              // Refresh the page to show the new number
              window.location.reload();
            } else {
              throw new Error(data.error || 'Failed to connect');
            }
          })
          .catch(err => {
            console.error('Error connecting WhatsApp:', err);
            alert('Error al conectar WhatsApp: ' + err.message);
            setIsConnecting(false);
          });
      } else {
        console.log('User cancelled login or did not fully authorize.');
        setIsConnecting(false);
      }
    });

    // Launch the embedded signup dialog
    (window as any).FB.login(
      function(response: any) {
        console.log('FB.login callback:', response);
      },
      {
        config_id: META_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: '',
          sessionInfoVersion: '3',
        }
      }
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-page-title">
          WhatsApp Business
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
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
              className="card"
            >
              {/* Header Row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                    <MessageSquare className="h-6 w-6 text-[var(--text-dark)]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-section-heading">{num.displayName}</h3>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        num.status === 'active'
                          ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-dark)]'
                          : num.status === 'pending'
                          ? 'border border-[var(--border-default)] bg-[var(--surface-panel)] text-[var(--text-primary)]'
                          : 'border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.12)] text-[var(--error)]'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                        {sc.label}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <Phone className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                        {num.phoneNumber}
                      </div>
                      <div className="text-[var(--text-tertiary)]">
                        WABA: <span className="font-mono text-xs text-[var(--text-secondary)]">{num.wabaId}</span>
                      </div>
                      <div className="text-[var(--text-tertiary)]">
                        Conectado: <span className="text-[var(--text-secondary)]">{num.connectedSince}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.12)] px-4 py-2 text-sm font-medium text-[var(--error)] transition-colors hover:bg-[rgba(239,68,68,0.18)]">
                  <Unplug className="h-4 w-4" />
                  Desconectar
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <span className="text-xs text-[var(--text-tertiary)]">Mensajes este mes</span>
                  <p className="mt-1 text-lg font-bold text-[var(--text-primary)] font-data">{num.messagesThisMonth.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] p-3">
                  <span className="text-xs text-[var(--text-tertiary)]">Personalidad del Bot</span>
                  <div className="mt-1">
                    <select
                      defaultValue={num.botPersonality}
                      className="w-full rounded-md border border-[var(--border)] bg-white px-2 py-1 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    >
                      {botPersonalities.map((bp) => (
                        <option key={bp} value={bp}>{bp}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-2 rounded-lg border border-[var(--border)] p-3 sm:col-span-1">
                  <span className="text-xs text-[var(--text-tertiary)]">Estado</span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]"></span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">Operacional</span>
                  </div>
                </div>
              </div>

              {/* Business Hours (Collapsible) */}
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <button
                  onClick={() => setExpandedHours(isHoursExpanded ? null : num.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--text-tertiary)]" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Horario de Atencion</span>
                    {num.businessHours.enabled && (
                      <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-xs text-[var(--text-dark)] font-medium">
                        Activo
                      </span>
                    )}
                  </div>
                  {isHoursExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[var(--text-tertiary)]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--text-tertiary)]" />
                  )}
                </button>

                {isHoursExpanded && (
                  <div className="mt-3 rounded-lg border border-[var(--border)] p-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs text-[var(--text-tertiary)]">Hora de Inicio</label>
                        <p className="text-sm text-[var(--text-primary)]">{num.businessHours.start}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[var(--text-tertiary)]">Hora de Fin</label>
                        <p className="text-sm text-[var(--text-primary)]">{num.businessHours.end}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[var(--text-tertiary)]">Zona Horaria</label>
                        <p className="text-sm text-[var(--text-primary)]">{num.businessHours.timezone}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="text-xs text-[var(--text-tertiary)]">Dias Activos</label>
                      <div className="mt-1 flex gap-1.5">
                        {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => (
                          <span
                            key={day}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                              num.businessHours.days.includes(day)
                                ? 'bg-[var(--accent)]/10 text-[var(--text-dark)] border border-[var(--accent)]'
                                : 'bg-white text-[var(--text-muted)] border border-[var(--border)]'
                            }`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[var(--text-tertiary)]">
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
      <div className="rounded-xl border-2 border-dashed border-[var(--border)] bg-white/50 p-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
            <Plus className="h-8 w-8 text-[var(--text-dark)]" />
          </div>
          <h3 className="text-card-title">Conectar Nuevo Numero</h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Conecta un nuevo numero de WhatsApp Business a tu cuenta de Kotkot a traves de Meta Embedded Signup.
          </p>

          <button
            onClick={handleConnectWhatsApp}
            disabled={isConnecting}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--text-dark)] transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare className="h-4 w-4" />
            {isConnecting ? 'Conectando...' : 'Conectar con Meta'}
            <ExternalLink className="h-3.5 w-3.5" />
          </button>

          {/* Info Card */}
          <div className="mt-6 rounded-lg border border-[var(--border)] p-4 text-left">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-primary)]" />
              <div className="text-xs text-[var(--text-secondary)] space-y-2">
                <p>
                  <strong className="text-[var(--text-primary)]">Meta Embedded Signup</strong> te permite conectar tu numero de WhatsApp Business directamente desde esta plataforma.
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">Requisitos:</strong>
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Una cuenta de Meta Business verificada</li>
                  <li>Un numero de telefono no registrado en WhatsApp personal</li>
                  <li>Acceso a recibir SMS o llamadas en ese numero</li>
                </ul>
                <p>
                  <strong className="text-[var(--text-primary)]">Costo:</strong> El uso de la API de WhatsApp Business tiene un costo aproximado de <span className="text-[var(--text-primary)] font-medium">$100/mes</span> dependiendo del volumen de mensajes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
