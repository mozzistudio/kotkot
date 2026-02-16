'use client';

import { useState } from 'react';
import {
  User,
  CreditCard,
  Wallet,
  Users,
  Bell,
  Camera,
  Check,
  ExternalLink,
  Plus,
  Trash2,
  Mail,
  MessageSquare,
  Phone,
  Building2,
  Globe,
  Shield,
  Crown,
  Zap,
} from '@/components/shared/icon-map';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SettingsTab = 'profile' | 'billing' | 'payments' | 'team' | 'notifications';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'viewer';
  status: 'active' | 'pending';
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending';
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const demoCountry = 'PA'; // Panama

const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Ricardo Lopez', email: 'ricardo@brokerspa.com', role: 'admin', status: 'active' },
  { id: 'tm-2', name: 'Maria Fernandez', email: 'maria@brokerspa.com', role: 'agent', status: 'active' },
  { id: 'tm-3', name: 'Jose Camacho', email: 'jose@brokerspa.com', role: 'viewer', status: 'pending' },
];

const invoices: Invoice[] = [
  { id: 'INV-2026-002', date: '01 Feb 2026', amount: '$49.00', status: 'paid' },
  { id: 'INV-2026-001', date: '01 Ene 2026', amount: '$49.00', status: 'paid' },
  { id: 'INV-2025-012', date: '01 Dic 2025', amount: '$49.00', status: 'paid' },
];

const roleConfig: Record<string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
  agent: { label: 'Agente', color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
  viewer: { label: 'Visor', color: 'bg-[var(--surface-panel)] text-[var(--text-secondary)] border border-[var(--border-default)]' },
};

const tabs: { key: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { key: 'profile', label: 'Perfil', icon: <User className="h-4 w-4" /> },
  { key: 'billing', label: 'Facturacion', icon: <CreditCard className="h-4 w-4" /> },
  { key: 'payments', label: 'Pagos', icon: <Wallet className="h-4 w-4" /> },
  { key: 'team', label: 'Equipo', icon: <Users className="h-4 w-4" /> },
  { key: 'notifications', label: 'Notificaciones', icon: <Bell className="h-4 w-4" /> },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [notifications, setNotifications] = useState({
    emailNewConversation: true,
    emailDailySummary: true,
    emailWeeklyReport: false,
    whatsappHandoff: true,
    whatsappPayment: true,
    whatsappError: false,
  });

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-page-title">Configuracion</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Administra tu cuenta y preferencias
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg border border-[var(--border)] bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[var(--accent)]/10 text-[var(--text-on-accent)] border-b-2 border-[var(--accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card">
        {/* ── Profile Tab ─────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-card-title">Informacion del Perfil</h2>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent)] cursor-pointer">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Foto de perfil</p>
                <p className="text-xs text-[var(--text-muted)]">JPG, PNG. Max 2MB.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Nombre del Broker</label>
                <input
                  type="text"
                  defaultValue="Ricardo Lopez"
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">Email</label>
                <input
                  type="email"
                  defaultValue="ricardo@brokerspa.com"
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  <Building2 className="mr-1 inline h-3.5 w-3.5" />
                  Empresa
                </label>
                <input
                  type="text"
                  defaultValue="Brokers Panama S.A."
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  <Phone className="mr-1 inline h-3.5 w-3.5" />
                  Telefono
                </label>
                <input
                  type="tel"
                  defaultValue="+507 6100-0000"
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  <Globe className="mr-1 inline h-3.5 w-3.5" />
                  Pais
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="Panama (PA)"
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-muted)] opacity-60 bg-[var(--surface-panel)]"
                  />
                  <span className="shrink-0 rounded bg-[var(--surface-hover)] px-2 py-0.5 text-xs text-[var(--text-muted)]">No editable</span>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-all hover:bg-[var(--accent-hover)]">
              <Check className="h-4 w-4" />
              Guardar Perfil
            </button>
          </div>
        )}

        {/* ── Billing Tab ─────────────────────────────────────────── */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-card-title">Facturacion & Plan</h2>

            {/* Current Plan */}
            <div className="rounded-lg border border-[var(--accent)] bg-[var(--accent)]/5 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                    <Crown className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-section-heading">Plan Profesional</h3>
                    <p className="text-body">$49/mes - Hasta 500 conversaciones</p>
                  </div>
                </div>
                <span className="rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-black">
                  Activo
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)] font-data">324</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Conversaciones usadas</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)] font-data">176</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Restantes</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)] font-data">18 dias</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Hasta renovacion</p>
                </div>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[rgba(202,255,4,0.2)]">
                <Zap className="h-4 w-4" />
                Cambiar Plan
              </button>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Metodo de Pago</h3>
              <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-4">
                <div className="flex h-8 w-12 items-center justify-center rounded-md bg-[var(--accent-light)] text-xs font-bold text-[var(--text-primary)]">
                  VISA
                </div>
                <div>
                  <p className="text-sm text-[var(--text-primary)]">**** **** **** 4242</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Expira 12/2027</p>
                </div>
                <button className="ml-auto text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Cambiar</button>
              </div>
            </div>

            {/* Invoices */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Historial de Facturas</h3>
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-[var(--text-tertiary)]" />
                      <div>
                        <span className="text-sm text-[var(--text-primary)]">{inv.id}</span>
                        <span className="ml-2 text-xs text-[var(--text-tertiary)]">{inv.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[var(--text-primary)] font-data">{inv.amount}</span>
                      <span className="rounded-full border border-[var(--accent)] bg-[var(--accent)]/5 px-2 py-0.5 text-xs text-black">
                        Pagada
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Payments Tab ─────────────────────────────────────────── */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <h2 className="text-card-title">Configuracion de Pagos de Seguros</h2>
            <p className="text-body">
              Configura como tus clientes pagan las polizas de seguros.
            </p>

            {demoCountry === 'PA' ? (
              /* ── Yappy Config (Panama) ────────────────────── */
              <div className="space-y-5">
                <div className="rounded-lg border border-[var(--accent)] bg-[var(--accent)]/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-brand-wallet)]/20">
                      <Wallet className="h-5 w-5 text-[var(--color-brand-wallet)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Yappy Business</h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Acepta pagos de polizas de seguros via Yappy en Panama
                      </p>
                    </div>
                    <span className="ml-auto rounded-full border border-[var(--accent)] bg-[var(--accent)]/5 px-2.5 py-0.5 text-xs font-medium text-black">
                      Conectado
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Merchant ID
                    </label>
                    <input
                      type="text"
                      defaultValue="YAPPY_MID_BROKERS_PA"
                      className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Secret Token
                    </label>
                    <input
                      type="password"
                      defaultValue="ypy_sk_live_xxxxxxxxxxxxx"
                      className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-all hover:bg-[var(--accent-hover)]">
                    <Check className="h-4 w-4" />
                    Guardar Credenciales
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-black">
                    <Zap className="h-4 w-4" />
                    Probar Conexion
                  </button>
                </div>

                <div className="rounded-lg border border-[var(--border)] p-4 text-xs text-[var(--text-tertiary)]">
                  <p className="mb-1 font-medium text-[var(--text-secondary)]">Como funciona:</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>El cliente selecciona una cotizacion y elige Yappy como metodo de pago</li>
                    <li>Kotkot genera un enlace de pago Yappy con el monto exacto</li>
                    <li>El enlace se envia por WhatsApp al cliente</li>
                    <li>Al confirmar el pago, la poliza se genera automaticamente</li>
                  </ul>
                </div>
              </div>
            ) : (
              /* ── Stripe Connect (Other countries) ──────────── */
              <div className="space-y-5">
                <div className="rounded-lg border border-[var(--border)] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-light)]">
                      <CreditCard className="h-5 w-5 text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Stripe Connect</h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Acepta pagos de polizas con tarjeta de credito/debito
                      </p>
                    </div>
                    <span className="ml-auto rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-primary)]">
                      No conectado
                    </span>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-all hover:bg-[var(--accent-hover)]">
                  <ExternalLink className="h-4 w-4" />
                  Conectar con Stripe
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Team Tab ─────────────────────────────────────────── */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-card-title">Equipo</h2>
              <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-all hover:bg-[var(--accent-hover)]">
                <Plus className="h-4 w-4" />
                Invitar Miembro
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => {
                const rc = roleConfig[member.role];
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--text-primary)]">{member.name}</span>
                          {member.status === 'pending' && (
                            <span className="rounded-full border border-[var(--border-default)] bg-[var(--surface-panel)] px-2 py-0.5 text-xs text-[var(--text-primary)]">
                              Pendiente
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[var(--text-tertiary)]">{member.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${rc.color}`}>
                        {rc.label}
                      </span>
                      <select
                        defaultValue={member.role}
                        className="rounded-md border border-[var(--border)] bg-white px-2 py-1 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="agent">Agente</option>
                        <option value="viewer">Visor</option>
                      </select>
                      <button className="rounded-md p-1.5 text-[var(--text-tertiary)] transition-colors hover:bg-[rgba(239,68,68,0.12)] hover:text-[var(--error)]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-[var(--border)] p-4">
              <h3 className="mb-2 text-sm font-medium text-[var(--text-primary)]">Roles:</h3>
              <div className="space-y-1.5 text-xs text-[var(--text-tertiary)]">
                <p><strong className="text-[var(--text-secondary)]">Admin:</strong> Acceso completo a todas las funciones, facturacion y configuracion.</p>
                <p><strong className="text-[var(--text-secondary)]">Agente:</strong> Puede gestionar conversaciones, cotizaciones y clientes.</p>
                <p><strong className="text-[var(--text-secondary)]">Visor:</strong> Solo puede ver analiticas y reportes. Acceso de solo lectura.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifications Tab ───────────────────────────────── */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-card-title">Notificaciones</h2>

            {/* Email Notifications */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                <Mail className="h-4 w-4" />
                Notificaciones por Email
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'emailNewConversation' as const, label: 'Nueva conversacion', description: 'Recibe un email cuando un nuevo cliente inicia una conversacion' },
                  { key: 'emailDailySummary' as const, label: 'Resumen diario', description: 'Resumen de actividad del dia a las 8 PM' },
                  { key: 'emailWeeklyReport' as const, label: 'Reporte semanal', description: 'Reporte completo de metricas cada lunes' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{item.description}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        notifications[item.key] ? 'bg-[var(--success)]' : 'bg-[var(--surface-secondary)]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white  transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Alerts */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                <MessageSquare className="h-4 w-4" />
                Alertas por WhatsApp
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'whatsappHandoff' as const, label: 'Transferencia a humano', description: 'Alerta cuando el bot transfiere una conversacion' },
                  { key: 'whatsappPayment' as const, label: 'Pago recibido', description: 'Notificacion cuando un cliente completa un pago' },
                  { key: 'whatsappError' as const, label: 'Errores del sistema', description: 'Alerta cuando hay un error en el bot o APIs' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{item.description}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        notifications[item.key] ? 'bg-[var(--success)]' : 'bg-[var(--surface-secondary)]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white  transition-transform duration-200 ${
                          notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-all hover:bg-[var(--accent-hover)]">
              <Check className="h-4 w-4" />
              Guardar Preferencias
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
