'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Car,
  MessageSquare,
  FileText,
  StickyNote,
  Edit,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Hash,
  User,
  Fingerprint,
  Palette,
  Tag,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ClientDetail {
  id: string;
  name: string;
  initials: string;
  status: 'Activo' | 'Inactivo';
  phone: string;
  email: string;
  address: string;
  cedula: string;
  birthDate: string;
  tags: string[];
  vehicle?: {
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    color: string;
    vin: string;
  };
  policies: Policy[];
  quotes: Quote[];
  conversations: Conversation[];
  payments: Payment[];
}

interface Policy {
  numero: string;
  aseguradora: string;
  tipo: string;
  cobertura: string;
  primaMensual: string;
  fechaInicio: string;
  fechaVencimiento: string;
  estado: 'Activa' | 'Vencida' | 'Pendiente';
}

interface Quote {
  id: string;
  fecha: string;
  tipo: string;
  aseguradoras: string[];
  seleccionada: string;
  precio: string;
}

interface Conversation {
  id: string;
  fecha: string;
  preview: string;
  status: 'Leido' | 'Respondido' | 'Pendiente';
}

interface Payment {
  id: string;
  fecha: string;
  monto: string;
  metodo: 'Yappy' | 'Stripe' | 'Transferencia';
  estado: 'Completado' | 'Pendiente' | 'Fallido';
  referencia: string;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const clientsData: Record<string, ClientDetail> = {
  'C-001': {
    id: 'C-001',
    name: 'Maria Gonzalez',
    initials: 'MG',
    status: 'Activo',
    phone: '+507 6234-5678',
    email: 'maria.gonzalez@gmail.com',
    address: 'Calle 50, Edificio Global Plaza, Apto 12B, Ciudad de Panama',
    cedula: '8-765-4321',
    birthDate: '15/03/1988',
    tags: ['VIP', 'Auto', 'Salud'],
    vehicle: {
      marca: 'Toyota',
      modelo: 'RAV4 XLE',
      ano: 2023,
      placa: 'AE-1234',
      color: 'Blanco Perla',
      vin: 'JTMW43FV5PD123456',
    },
    policies: [
      {
        numero: 'POL-2024-00187',
        aseguradora: 'ASSA Compania de Seguros',
        tipo: 'Auto',
        cobertura: 'Todo Riesgo',
        primaMensual: '$125.00',
        fechaInicio: '01/03/2024',
        fechaVencimiento: '01/03/2025',
        estado: 'Activa',
      },
      {
        numero: 'POL-2024-00245',
        aseguradora: 'Mapfre Panama',
        tipo: 'Salud',
        cobertura: 'Plan Premium Individual',
        primaMensual: '$95.00',
        fechaInicio: '15/01/2024',
        fechaVencimiento: '15/01/2025',
        estado: 'Activa',
      },
      {
        numero: 'POL-2023-00098',
        aseguradora: 'ASSA Compania de Seguros',
        tipo: 'Vida',
        cobertura: 'Vida Entera $100,000',
        primaMensual: '$45.00',
        fechaInicio: '01/06/2023',
        fechaVencimiento: '01/06/2024',
        estado: 'Vencida',
      },
    ],
    quotes: [
      {
        id: 'COT-0051',
        fecha: '08/02/2025',
        tipo: 'Auto',
        aseguradoras: ['ASSA', 'Mapfre', 'Generali'],
        seleccionada: 'ASSA Compania de Seguros',
        precio: '$125.00/mes',
      },
      {
        id: 'COT-0032',
        fecha: '10/01/2025',
        tipo: 'Salud',
        aseguradoras: ['Mapfre', 'Pan American Life', 'Seguros Suramericana'],
        seleccionada: 'Mapfre Panama',
        precio: '$95.00/mes',
      },
      {
        id: 'COT-0018',
        fecha: '22/05/2023',
        tipo: 'Vida',
        aseguradoras: ['ASSA', 'Generali', 'Worldwide Medical'],
        seleccionada: 'ASSA Compania de Seguros',
        precio: '$45.00/mes',
      },
    ],
    conversations: [
      {
        id: 'CONV-101',
        fecha: '11/02/2025 09:45',
        preview: 'Buenos dias Maria, le recuerdo que su poliza de auto vence el proximo mes...',
        status: 'Leido',
      },
      {
        id: 'CONV-098',
        fecha: '08/02/2025 14:20',
        preview: 'Gracias por enviar la cotizacion, me parece bien el precio de ASSA.',
        status: 'Respondido',
      },
      {
        id: 'CONV-085',
        fecha: '01/02/2025 10:00',
        preview: 'Hola, necesito actualizar mi direccion en la poliza de salud.',
        status: 'Respondido',
      },
      {
        id: 'CONV-072',
        fecha: '15/01/2025 16:30',
        preview: 'Le envio las opciones de cobertura de salud que solicito...',
        status: 'Leido',
      },
    ],
    payments: [
      {
        id: 'PAG-401',
        fecha: '01/02/2025',
        monto: '$265.00',
        metodo: 'Yappy',
        estado: 'Completado',
        referencia: 'YPY-20250201-8834',
      },
      {
        id: 'PAG-378',
        fecha: '01/01/2025',
        monto: '$265.00',
        metodo: 'Yappy',
        estado: 'Completado',
        referencia: 'YPY-20250101-7721',
      },
      {
        id: 'PAG-355',
        fecha: '01/12/2024',
        monto: '$265.00',
        metodo: 'Stripe',
        estado: 'Completado',
        referencia: 'STR-20241201-pi_3QK9x2',
      },
      {
        id: 'PAG-340',
        fecha: '01/11/2024',
        monto: '$265.00',
        metodo: 'Stripe',
        estado: 'Completado',
        referencia: 'STR-20241101-pi_3PJ8w1',
      },
      {
        id: 'PAG-312',
        fecha: '01/10/2024',
        monto: '$265.00',
        metodo: 'Transferencia',
        estado: 'Completado',
        referencia: 'TRF-20241001-BNP-44521',
      },
    ],
  },
  'C-002': {
    id: 'C-002',
    name: 'Carlos Perez',
    initials: 'CP',
    status: 'Activo',
    phone: '+507 6345-6789',
    email: 'carlos.perez@outlook.com',
    address: 'Via Espana, Edificio Torres del Pacifico, Piso 8, Ciudad de Panama',
    cedula: '3-456-7890',
    birthDate: '22/07/1992',
    tags: ['Auto', 'Referido'],
    vehicle: {
      marca: 'Hyundai',
      modelo: 'Tucson Limited',
      ano: 2022,
      placa: 'BF-5678',
      color: 'Gris Oscuro',
      vin: 'KM8J33A26NU987654',
    },
    policies: [
      {
        numero: 'POL-2024-00312',
        aseguradora: 'Generali Panama',
        tipo: 'Auto',
        cobertura: 'Cobertura Amplia',
        primaMensual: '$92.00',
        fechaInicio: '15/06/2024',
        fechaVencimiento: '15/06/2025',
        estado: 'Activa',
      },
    ],
    quotes: [
      {
        id: 'COT-0045',
        fecha: '10/06/2024',
        tipo: 'Auto',
        aseguradoras: ['Generali', 'ASSA', 'Mapfre'],
        seleccionada: 'Generali Panama',
        precio: '$92.00/mes',
      },
    ],
    conversations: [
      {
        id: 'CONV-095',
        fecha: '10/02/2025 11:30',
        preview: 'Hola Carlos, queria confirmar que su pago fue procesado correctamente.',
        status: 'Pendiente',
      },
      {
        id: 'CONV-078',
        fecha: '25/01/2025 09:15',
        preview: 'Buenas, tengo una pregunta sobre el deducible de mi poliza.',
        status: 'Respondido',
      },
    ],
    payments: [
      {
        id: 'PAG-399',
        fecha: '15/02/2025',
        monto: '$92.00',
        metodo: 'Yappy',
        estado: 'Pendiente',
        referencia: 'YPY-20250215-PEND',
      },
      {
        id: 'PAG-370',
        fecha: '15/01/2025',
        monto: '$92.00',
        metodo: 'Yappy',
        estado: 'Completado',
        referencia: 'YPY-20250115-6623',
      },
      {
        id: 'PAG-348',
        fecha: '15/12/2024',
        monto: '$92.00',
        metodo: 'Stripe',
        estado: 'Completado',
        referencia: 'STR-20241215-pi_3QL7y4',
      },
    ],
  },
};

// Generate a generic fallback for unknown IDs
function getGenericClient(id: string): ClientDetail {
  return {
    id,
    name: 'Cliente Demo',
    initials: 'CD',
    status: 'Activo',
    phone: '+507 6000-0000',
    email: 'cliente@demo.com',
    address: 'Ciudad de Panama, Panama',
    cedula: '0-000-0000',
    birthDate: '01/01/1990',
    tags: ['Nuevo'],
    policies: [],
    quotes: [],
    conversations: [],
    payments: [],
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tagColors: Record<string, string> = {
  VIP: 'bg-amber-50 text-amber-700 border border-amber-200',
  Nuevo: 'bg-[rgba(12,30,53,0.06)] text-[var(--dark-blue)] border border-[var(--dark-blue)]/20',
  Renovacion: 'bg-blue-50 text-blue-700 border border-blue-200',
  Empresa: 'bg-purple-50 text-purple-700 border border-purple-200',
  Referido: 'bg-teal-50 text-teal-700 border border-teal-200',
  Auto: 'bg-sky-50 text-sky-700 border border-sky-200',
  Salud: 'bg-rose-50 text-rose-700 border border-rose-200',
  Hogar: 'bg-orange-50 text-orange-700 border border-orange-200',
};

const policyStatusColors: Record<string, string> = {
  Activa: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Vencida: 'bg-red-50 text-red-700 border border-red-200',
  Pendiente: 'bg-amber-50 text-amber-700 border border-amber-200',
};

const paymentStatusColors: Record<string, string> = {
  Completado: 'bg-emerald-50 text-emerald-700',
  Pendiente: 'bg-amber-50 text-amber-700',
  Fallido: 'bg-red-50 text-red-700',
};

const paymentMethodColors: Record<string, string> = {
  Yappy: 'bg-purple-50 text-purple-700',
  Stripe: 'bg-blue-50 text-blue-700',
  Transferencia: 'bg-teal-50 text-teal-700',
};

const conversationStatusColors: Record<string, string> = {
  Leido: 'bg-slate-100 text-slate-600',
  Respondido: 'bg-emerald-50 text-emerald-700',
  Pendiente: 'bg-amber-50 text-amber-700',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;
  const client = clientsData[clientId] ?? getGenericClient(clientId);

  const [notes, setNotes] = useState(
    clientId === 'C-001'
      ? 'Cliente preferencial - siempre paga puntualmente. Interesada en agregar poliza de hogar para su apartamento nuevo en Costa del Este. Llamar en marzo para renovacion de auto.'
      : ''
  );

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ----------------------------------------------------------------- */}
      {/* Back Button                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Link
        href="/clients"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--dark-blue)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Clientes
      </Link>

      {/* ----------------------------------------------------------------- */}
      {/* Header                                                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--dark-blue)] text-xl font-bold text-white">
              {client.initials}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  {client.name}
                </h1>
                <span className="rounded-md bg-[var(--surface-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                  {client.id}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    client.status === 'Activo'
                      ? 'bg-emerald-50 text-[var(--success-fg)]'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {client.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {client.email} &middot; {client.phone}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-[var(--success-fg)] transition-colors hover:bg-emerald-100">
              <MessageCircle className="h-4 w-4" />
              Enviar WhatsApp
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-100">
              <Phone className="h-4 w-4" />
              Llamar
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-slate-600 hover:text-[var(--text-primary)]">
              <Edit className="h-4 w-4" />
              Editar
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Info Cards Grid                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Datos Personales */}
        <div className="card">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
            <User className="h-5 w-5 text-[var(--dark-blue)]" />
            Datos Personales
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Nombre completo', value: client.name, icon: User },
              { label: 'Cedula / ID', value: client.cedula, icon: Fingerprint },
              { label: 'Fecha de nacimiento', value: client.birthDate, icon: Calendar },
              { label: 'Telefono', value: client.phone, icon: Phone },
              { label: 'Email', value: client.email, icon: Mail },
              { label: 'Direccion', value: client.address, icon: MapPin },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">{item.label}</p>
                  <p className="text-sm text-[var(--text-primary)]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Datos del Vehiculo / Tags */}
        <div className="space-y-6">
          {client.vehicle && (
            <div className="card">
              <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                <Car className="h-5 w-5 text-sky-700" />
                Datos del Vehiculo
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Marca', value: client.vehicle.marca },
                  { label: 'Modelo', value: client.vehicle.modelo },
                  { label: 'Ano', value: String(client.vehicle.ano) },
                  { label: 'Placa', value: client.vehicle.placa },
                  { label: 'Color', value: client.vehicle.color },
                  { label: 'VIN', value: client.vehicle.vin },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="card">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
              <Tag className="h-5 w-5 text-amber-700" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-sm font-medium ${
                    tagColors[tag] ?? 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Polizas                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
          <Shield className="h-5 w-5 text-[var(--dark-blue)]" />
          Polizas
          <span className="ml-2 rounded-full bg-[rgba(12,30,53,0.06)] px-2 py-0.5 text-xs font-medium text-[var(--dark-blue)]">
            {client.policies.length}
          </span>
        </h2>

        {client.policies.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No hay polizas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs uppercase text-[var(--text-tertiary)]">
                  <th className="pb-3 pr-4 font-medium">No. Poliza</th>
                  <th className="pb-3 pr-4 font-medium">Aseguradora</th>
                  <th className="pb-3 pr-4 font-medium">Tipo</th>
                  <th className="pb-3 pr-4 font-medium">Cobertura</th>
                  <th className="pb-3 pr-4 font-medium">Prima</th>
                  <th className="pb-3 pr-4 font-medium">Inicio</th>
                  <th className="pb-3 pr-4 font-medium">Vencimiento</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {client.policies.map((policy) => (
                  <tr
                    key={policy.numero}
                    className="border-b border-[var(--border)]/50 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-[var(--text-primary)] font-data">
                      {policy.numero}
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{policy.aseguradora}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{policy.tipo}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{policy.cobertura}</td>
                    <td className="py-3 pr-4 font-semibold text-[var(--success-fg)] font-data">
                      {policy.primaMensual}
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-tertiary)] font-data">{policy.fechaInicio}</td>
                    <td className="py-3 pr-4 text-[var(--text-tertiary)] font-data">
                      {policy.fechaVencimiento}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          policyStatusColors[policy.estado] ?? ''
                        }`}
                      >
                        {policy.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Historial de Cotizaciones                                          */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
          <FileText className="h-5 w-5 text-blue-700" />
          Historial de Cotizaciones
        </h2>

        {client.quotes.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No hay cotizaciones registradas.</p>
        ) : (
          <div className="space-y-3">
            {client.quotes.map((quote) => (
              <div
                key={quote.id}
                className="flex flex-col gap-3 rounded-lg border border-[var(--border)]/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[var(--text-primary)] font-data">
                      {quote.id}
                    </span>
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                      {quote.tipo}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)] font-data">{quote.fecha}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    Comparado: {quote.aseguradoras.join(', ')}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Seleccionada:{' '}
                    <span className="text-[var(--success-fg)]">{quote.seleccionada}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--success-fg)] font-data">
                    {quote.precio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Historial de Conversaciones                                        */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
          <MessageSquare className="h-5 w-5 text-[var(--dark-blue)]" />
          Historial de Conversaciones
        </h2>

        {client.conversations.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No hay conversaciones registradas.</p>
        ) : (
          <div className="space-y-3">
            {client.conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center gap-4 rounded-lg border border-[var(--border)]/50 p-4 transition-colors hover:border-[var(--border)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(12,30,53,0.06)]">
                  <MessageCircle className="h-5 w-5 text-[var(--dark-blue)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-tertiary)] font-data">{conv.fecha}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        conversationStatusColors[conv.status] ?? ''
                      }`}
                    >
                      {conv.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-[var(--text-secondary)]">{conv.preview}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Historial de Pagos                                                 */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
          <CreditCard className="h-5 w-5 text-purple-700" />
          Historial de Pagos
        </h2>

        {client.payments.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No hay pagos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs uppercase text-[var(--text-tertiary)]">
                  <th className="pb-3 pr-4 font-medium">Fecha</th>
                  <th className="pb-3 pr-4 font-medium">Monto</th>
                  <th className="pb-3 pr-4 font-medium">Metodo</th>
                  <th className="pb-3 pr-4 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Referencia</th>
                </tr>
              </thead>
              <tbody>
                {client.payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-[var(--border)]/50 last:border-0"
                  >
                    <td className="py-3 pr-4 text-[var(--text-secondary)] font-data">{payment.fecha}</td>
                    <td className="py-3 pr-4 font-semibold text-[var(--text-primary)] font-data">
                      {payment.monto}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          paymentMethodColors[payment.metodo] ?? ''
                        }`}
                      >
                        {payment.metodo}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          paymentStatusColors[payment.estado] ?? ''
                        }`}
                      >
                        {payment.estado === 'Completado' && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {payment.estado === 'Pendiente' && <Clock className="h-3 w-3" />}
                        {payment.estado === 'Fallido' && <XCircle className="h-3 w-3" />}
                        {payment.estado}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-[var(--text-tertiary)] font-data">
                      {payment.referencia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Notas                                                              */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
          <StickyNote className="h-5 w-5 text-amber-700" />
          Notas
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Agregar notas sobre el cliente..."
          className="w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--dark-blue)]/50 focus:outline-none focus:ring-1 focus:ring-[rgba(12,30,53,0.10)]"
        />
        <div className="mt-3 flex justify-end">
          <button className="rounded-lg bg-[var(--dark-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--dark-blue-light)]">
            Guardar Notas
          </button>
        </div>
      </div>
    </div>
  );
}
