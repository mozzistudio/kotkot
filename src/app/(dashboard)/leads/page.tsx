'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Download, Plus, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Lead {
  id: string;
  fullName: string;
  cedula: string;
  phone: string;
  email: string;
  insuranceType: string;
  status: string;
  source: string;
  createdAt: string;
  _count: { quotes: number; documents: number };
}

const typeConfig: Record<string, { emoji: string; label: string; color: string }> = {
  auto: { emoji: '🚗', label: 'Auto', color: 'bg-green-100 text-green-800' },
  moto: { emoji: '🏍️', label: 'Moto', color: 'bg-orange-100 text-orange-800' },
  salud: { emoji: '🏥', label: 'Salud', color: 'bg-blue-100 text-blue-800' },
  hogar: { emoji: '🏠', label: 'Hogar', color: 'bg-purple-100 text-purple-800' },
  viaje: { emoji: '✈️', label: 'Viaje', color: 'bg-cyan-100 text-cyan-800' },
  empresarial: { emoji: '🏢', label: 'Empresarial', color: 'bg-red-100 text-red-800' },
};

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  new: { label: 'Nuevo', color: 'text-slate-600', dot: 'bg-slate-400' },
  quoted: { label: 'Cotizado', color: 'text-blue-600', dot: 'bg-blue-500' },
  docs_pending: { label: 'Docs pend.', color: 'text-orange-600', dot: 'bg-orange-500' },
  docs_complete: { label: 'Docs comp.', color: 'text-purple-600', dot: 'bg-purple-500' },
  contracted: { label: 'Contratado', color: 'text-green-600', dot: 'bg-green-500' },
  lost: { label: 'Perdido', color: 'text-red-600', dot: 'bg-red-500' },
};

const PER_PAGE = 10;

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'fullName' | 'createdAt' | 'status'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(data => { setLeads(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = [...leads];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.fullName.toLowerCase().includes(q) ||
        l.cedula.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    if (filterType !== 'all') result = result.filter(l => l.insuranceType === filterType);
    if (filterStatus !== 'all') result = result.filter(l => l.status === filterStatus);

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'fullName') cmp = a.fullName.localeCompare(b.fullName);
      else if (sortField === 'createdAt') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [leads, search, filterType, filterStatus, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(field: 'fullName' | 'createdAt' | 'status') {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  }

  function exportCSV() {
    const headers = ['Nombre', 'Cédula', 'Teléfono', 'Email', 'Tipo', 'Estado', 'Fecha'];
    const rows = filtered.map(l => [
      l.fullName, l.cedula, l.phone, l.email,
      typeConfig[l.insuranceType]?.label || l.insuranceType,
      statusConfig[l.status]?.label || l.status,
      format(new Date(l.createdAt), 'dd/MM/yyyy'),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_cotifacil_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><p className="text-slate-500">Cargando leads...</p></div>;
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Leads</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{filtered.length}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 border border-slate-300 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <Link href="/quotes/new" className="flex items-center gap-1.5 bg-brand text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors">
            <Plus className="w-4 h-4" /> Nuevo lead
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre, cédula o teléfono..."
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none text-sm"
          />
        </div>
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-white">
          <option value="all">Todos los tipos</option>
          {Object.entries(typeConfig).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none bg-white">
          <option value="all">Todos los estados</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide cursor-pointer" onClick={() => toggleSort('fullName')}>
                  <span className="flex items-center gap-1">Nombre <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Tipo</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide cursor-pointer" onClick={() => toggleSort('status')}>
                  <span className="flex items-center gap-1">Estado <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide hidden md:table-cell">Teléfono</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide hidden lg:table-cell">Fuente</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide cursor-pointer hidden sm:table-cell" onClick={() => toggleSort('createdAt')}>
                  <span className="flex items-center gap-1">Fecha <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((lead) => {
                const tc = typeConfig[lead.insuranceType];
                const sc = statusConfig[lead.status];
                return (
                  <tr key={lead.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => router.push(`/leads/${lead.id}`)}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{lead.fullName}</p>
                      <p className="text-xs text-slate-500">{lead.cedula}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tc?.color || 'bg-slate-100 text-slate-700'}`}>
                        {tc?.emoji} {tc?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${sc?.color || 'text-slate-600'}`}>
                        <span className={`w-2 h-2 rounded-full ${sc?.dot || 'bg-slate-400'}`} />
                        {sc?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell">{lead.phone}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lead.source === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {lead.source === 'whatsapp' ? 'WhatsApp' : 'Web'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 hidden sm:table-cell">
                      {format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: es })}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/leads/${lead.id}`} className="text-sm text-brand font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                        Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Mostrando {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}-{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length}
          </p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Siguiente <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
