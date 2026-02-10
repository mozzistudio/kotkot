'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MessageSquare, FileText, CheckCircle, Clock, Upload, Check, X } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Quote {
  id: string;
  insurerName: string;
  planName: string;
  monthlyPremium: number;
  annualPremium: number;
  deductible: number;
  coverageItems: string;
  selected: boolean;
}

interface Document {
  id: string;
  docType: string;
  fileName: string;
  verified: boolean;
}

interface Activity {
  id: string;
  activityType: string;
  description: string;
  createdAt: string;
}

interface Lead {
  id: string;
  fullName: string;
  cedula: string;
  phone: string;
  email: string;
  insuranceType: string;
  status: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleUse: string;
  coverageType: string;
  licensePlate: string;
  source: string;
  createdAt: string;
  quotes: Quote[];
  documents: Document[];
  activities: Activity[];
}

const typeConfig: Record<string, { emoji: string; label: string }> = {
  auto: { emoji: '🚗', label: 'Auto' }, moto: { emoji: '🏍️', label: 'Moto' },
  salud: { emoji: '🏥', label: 'Salud' }, hogar: { emoji: '🏠', label: 'Hogar' },
  viaje: { emoji: '✈️', label: 'Viaje' }, empresarial: { emoji: '🏢', label: 'Empresarial' },
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Nuevo', color: 'text-slate-700', bg: 'bg-slate-100' },
  quoted: { label: 'Cotizado', color: 'text-blue-700', bg: 'bg-blue-100' },
  docs_pending: { label: 'Docs pendientes', color: 'text-orange-700', bg: 'bg-orange-100' },
  docs_complete: { label: 'Docs completos', color: 'text-purple-700', bg: 'bg-purple-100' },
  contracted: { label: 'Contratado', color: 'text-green-700', bg: 'bg-green-100' },
  lost: { label: 'Perdido', color: 'text-red-700', bg: 'bg-red-100' },
};

const allDocTypes = [
  { key: 'cedula_front', label: 'Cédula (frente)' },
  { key: 'cedula_back', label: 'Cédula (reverso)' },
  { key: 'license', label: 'Licencia' },
  { key: 'registration', label: 'Tarjeta de circ.' },
  { key: 'vehicle_front', label: 'Vehículo frente' },
  { key: 'vehicle_back', label: 'Vehículo atrás' },
  { key: 'vehicle_left', label: 'Vehículo izq.' },
  { key: 'vehicle_right', label: 'Vehículo der.' },
];

const activityDotColors: Record<string, string> = {
  lead_new: 'bg-blue-500', quote_sent: 'bg-blue-600', doc_received: 'bg-orange-500', lead_converted: 'bg-green-500', lead_lost: 'bg-red-500',
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusDropdown, setStatusDropdown] = useState(false);

  useEffect(() => {
    fetch(`/api/leads/${params.id}`).then(r => r.json()).then(data => { setLead(data); setLoading(false); });
  }, [params.id]);

  async function updateStatus(newStatus: string) {
    setStatusDropdown(false);
    const res = await fetch(`/api/leads/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  }

  if (loading || !lead) {
    return <div className="flex items-center justify-center h-64"><p className="text-slate-500">Cargando...</p></div>;
  }

  const tc = typeConfig[lead.insuranceType];
  const sc = statusConfig[lead.status];
  const showVehicle = lead.insuranceType === 'auto' || lead.insuranceType === 'moto';
  const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => router.push('/leads')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3">
          <ArrowLeft className="w-4 h-4" /> Volver a leads
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{lead.fullName}</h1>
            <div className="relative">
              <button onClick={() => setStatusDropdown(!statusDropdown)}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sc?.bg} ${sc?.color} cursor-pointer`}>
                {sc?.label}
              </button>
              {statusDropdown && (
                <div className="absolute top-8 left-0 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 w-44">
                  {Object.entries(statusConfig).map(([key, val]) => (
                    <button key={key} onClick={() => updateStatus(key)}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 ${val.color}`}>
                      {val.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {tc && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {tc.emoji} {tc.label}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <button disabled className="flex items-center gap-1.5 border border-slate-300 text-slate-400 px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed" title="Próximamente">
              <FileText className="w-4 h-4" /> Generar PDF
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-brand"><Phone className="w-3.5 h-3.5" /> {lead.phone}</a>
          {lead.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {lead.email}</span>}
          <span>Cédula: {lead.cedula}</span>
          <span>{format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: es })}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.source === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
            {lead.source === 'whatsapp' ? 'WhatsApp' : 'Web'}
          </span>
        </div>
      </div>

      {/* Vehicle info */}
      {showVehicle && lead.vehicleBrand && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Marca', value: lead.vehicleBrand },
            { label: 'Modelo', value: lead.vehicleModel },
            { label: 'Año', value: lead.vehicleYear > 0 ? lead.vehicleYear.toString() : '-' },
            { label: 'Uso', value: lead.vehicleUse === 'comercial' ? 'Comercial' : 'Personal' },
            { label: 'Cobertura', value: lead.coverageType === 'todo_riesgo' ? 'Todo riesgo' : lead.coverageType === 'completa' ? 'Completa' : 'Básica' },
            { label: 'Placa', value: lead.licensePlate || '-' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-sm font-medium text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Quotes - takes 2 cols */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Cotizaciones ({lead.quotes.length})</h3>
          {lead.quotes.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
              <p className="text-sm text-slate-500 mb-3">No hay cotizaciones</p>
              <Link href="/quotes/new" className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors">
                Generar cotización
              </Link>
            </div>
          ) : (
            lead.quotes.map((quote) => {
              let items: { item: string; included: boolean }[] = [];
              try { items = JSON.parse(quote.coverageItems); } catch {}
              return (
                <div key={quote.id} className={`bg-white rounded-xl border p-5 ${quote.selected ? 'border-green-300 ring-1 ring-green-200' : 'border-slate-200'} shadow-sm`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900">{quote.insurerName}</p>
                      <p className="text-sm text-slate-500">{quote.planName}</p>
                    </div>
                    {quote.selected && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        SELECCIONADO
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-slate-900">B/. {quote.monthlyPremium.toFixed(2)} <span className="text-sm font-normal text-slate-500">/mes</span></p>
                  <p className="text-sm text-slate-500">B/. {quote.annualPremium.toLocaleString('es-PA', { minimumFractionDigits: 2 })} /año</p>
                  <p className="text-sm text-slate-500">Deducible: B/. {quote.deductible.toFixed(0)}</p>
                  {items.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {items.map((ci, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          {ci.included ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-red-400" />}
                          <span className={ci.included ? 'text-slate-700' : 'text-slate-400'}>{ci.item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Documentos ({lead.documents.length}/8)</h3>
          <div className="grid grid-cols-2 gap-2">
            {allDocTypes.map((dt) => {
              const doc = lead.documents.find(d => d.docType === dt.key);
              if (doc?.verified) {
                return (
                  <div key={dt.key} className="border-2 border-green-300 bg-green-50 rounded-lg p-3 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    <p className="text-xs font-medium text-green-700 mt-1">{dt.label}</p>
                  </div>
                );
              } else if (doc) {
                return (
                  <div key={dt.key} className="border-2 border-orange-300 bg-orange-50 rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 text-orange-500 mx-auto" />
                    <p className="text-xs font-medium text-orange-700 mt-1">{dt.label}</p>
                  </div>
                );
              }
              return (
                <div key={dt.key} className="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center">
                  <Upload className="w-5 h-5 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400 mt-1">{dt.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900">Historial</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />
              <div className="space-y-4">
                {lead.activities.map((act) => {
                  const dotColor = activityDotColors[act.activityType] || 'bg-slate-400';
                  return (
                    <div key={act.id} className="flex gap-3 relative">
                      <div className={`w-3.5 h-3.5 rounded-full ${dotColor} mt-1 flex-shrink-0 relative z-10 ring-2 ring-white`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700">{act.description}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatDistanceToNow(new Date(act.createdAt), { locale: es, addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {lead.activities.length === 0 && <p className="text-xs text-slate-400">Sin actividad</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
