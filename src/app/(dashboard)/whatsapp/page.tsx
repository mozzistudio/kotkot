'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
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
  Loader2,
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
  displayName?: string;
  wabaId: string;
  status: NumberStatus;
  botPersonality: string;
  businessHours?: BusinessHours;
  messagesThisMonth: number;
  connectedSince: string;
}

// ---------------------------------------------------------------------------
// Extend Window for Facebook SDK
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    FB?: {
      init: (params: any) => void;
      login: (callback: (response: any) => void, params: { config_id: string; response_type: string; override_default_response_type: boolean; scope: string }) => void;
    };
    fbAsyncInit?: () => void;
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const botPersonalities = ['Mi Agente', 'Agente Formal', 'Agente Express'];

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
  const [numbers, setNumbers] = useState<WhatsAppNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const supabase = createClient();

  // Load Facebook SDK
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';

      document.body.appendChild(script);
    };

    window.fbAsyncInit = function () {
      window.FB?.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      });
    };

    loadFacebookSDK();
  }, []);

  // Load connected accounts
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('whatsapp_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNumbers: WhatsAppNumber[] = (data || []).map((account: any) => ({
        id: account.id,
        phoneNumber: account.phone_number,
        displayName: account.phone_number,
        wabaId: account.waba_id,
        status: account.status,
        botPersonality: account.bot_personality || 'Mi Agente',
        messagesThisMonth: account.messages_this_month || 0,
        connectedSince: new Date(account.connected_at).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      }));

      setNumbers(formattedNumbers);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectMeta = () => {
    if (!window.FB) {
      alert('Facebook SDK no está cargado. Por favor recarga la página.');
      return;
    }

    setConnecting(true);

    window.FB.login(
      async (response: any) => {
        setConnecting(false);

        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          try {
            // Call our API to save the connection
            const res = await fetch('/api/whatsapp/connect', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accessToken }),
            });

            const data = await res.json();

            if (data.success) {
              alert('¡Cuenta de WhatsApp conectada exitosamente!');
              loadAccounts(); // Reload accounts
            } else {
              alert('Error al conectar: ' + (data.error || 'Desconocido'));
            }
          } catch (error) {
            console.error('Connection error:', error);
            alert('Error al conectar la cuenta de WhatsApp');
          }
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        config_id: process.env.NEXT_PUBLIC_META_CONFIG_ID || '',
        response_type: 'code',
        override_default_response_type: true,
        scope: 'whatsapp_business_management,whatsapp_business_messaging',
      }
    );
  };

  const handleDisconnect = async (accountId: string) => {
    if (!confirm('¿Estás seguro de que quieres desconectar este número?')) {
      return;
    }

    try {
      const res = await fetch('/api/whatsapp/disconnect', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Cuenta desconectada exitosamente');
        loadAccounts(); // Reload accounts
      } else {
        alert('Error al desconectar: ' + (data.error || 'Desconocido'));
      }
    } catch (error) {
      console.error('Disconnect error:', error);
      alert('Error al desconectar la cuenta');
    }
  };

  const handleBotPersonalityChange = async (accountId: string, personality: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_accounts')
        .update({ bot_personality: personality })
        .eq('id', accountId);

      if (error) throw error;

      // Update local state
      setNumbers((prev) =>
        prev.map((num) =>
          num.id === accountId ? { ...num, botPersonality: personality } : num
        )
      );
    } catch (error) {
      console.error('Error updating bot personality:', error);
      alert('Error al actualizar la personalidad del bot');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

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
      {numbers.length > 0 && (
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
                        <h3 className="text-section-heading">{num.displayName || num.phoneNumber}</h3>
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

                  <button
                    onClick={() => handleDisconnect(num.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.12)] px-4 py-2 text-sm font-medium text-[var(--error)] transition-colors hover:bg-[rgba(239,68,68,0.18)]"
                  >
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
                        value={num.botPersonality}
                        onChange={(e) => handleBotPersonalityChange(num.id, e.target.value)}
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
                      <span className={`h-2 w-2 rounded-full ${num.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--error)]'}`}></span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {num.status === 'active' ? 'Operacional' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
            onClick={handleConnectMeta}
            disabled={connecting}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--text-dark)] transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4" />
                Conectar con Meta
                <ExternalLink className="h-3.5 w-3.5" />
              </>
            )}
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
