'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Phone,
  Mail,
  Tag,
  Shield,
  Clock,
  MoreHorizontal,
  User,
  Filter,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: string[];
  policiesCount: number;
  lastActivity: string;
  totalPremium: string;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const allTags = ['VIP', 'Nuevo', 'Renovacion', 'Empresa', 'Referido', 'Auto', 'Salud', 'Hogar'];

const clients: Client[] = [
  {
    id: 'C-001',
    name: 'Maria Gonzalez',
    phone: '+507 6234-5678',
    email: 'maria.gonzalez@gmail.com',
    tags: ['VIP', 'Auto', 'Salud'],
    policiesCount: 3,
    lastActivity: 'Hace 2 min',
    totalPremium: '$265/mes',
  },
  {
    id: 'C-002',
    name: 'Carlos Perez',
    phone: '+507 6345-6789',
    email: 'carlos.perez@outlook.com',
    tags: ['Auto', 'Referido'],
    policiesCount: 1,
    lastActivity: 'Hace 15 min',
    totalPremium: '$92/mes',
  },
  {
    id: 'C-003',
    name: 'Ana Rodriguez',
    phone: '+507 6456-7890',
    email: 'ana.rodriguez@hotmail.com',
    tags: ['Salud', 'Nuevo'],
    policiesCount: 0,
    lastActivity: 'Hace 32 min',
    totalPremium: '$0',
  },
  {
    id: 'C-004',
    name: 'Juan Martinez',
    phone: '+507 6567-8901',
    email: 'juan.martinez@gmail.com',
    tags: ['Hogar', 'Renovacion'],
    policiesCount: 2,
    lastActivity: 'Hace 1 hora',
    totalPremium: '$115/mes',
  },
  {
    id: 'C-005',
    name: 'Laura Castillo',
    phone: '+507 6678-9012',
    email: 'laura.castillo@gmail.com',
    tags: ['Salud', 'Nuevo'],
    policiesCount: 0,
    lastActivity: 'Hace 2 horas',
    totalPremium: '$0',
  },
  {
    id: 'C-006',
    name: 'Roberto Diaz',
    phone: '+507 6789-0123',
    email: 'roberto.diaz@empresa.com',
    tags: ['Empresa', 'VIP', 'Auto'],
    policiesCount: 5,
    lastActivity: 'Hace 1 dia',
    totalPremium: '$580/mes',
  },
  {
    id: 'C-007',
    name: 'Patricia Morales',
    phone: '+507 6890-1234',
    email: 'patricia.morales@gmail.com',
    tags: ['Auto', 'Referido'],
    policiesCount: 1,
    lastActivity: 'Hace 2 dias',
    totalPremium: '$78/mes',
  },
  {
    id: 'C-008',
    name: 'Fernando Vega',
    phone: '+507 6901-2345',
    email: 'fernando.vega@empresa.com',
    tags: ['Empresa', 'Nuevo'],
    policiesCount: 0,
    lastActivity: 'Hace 3 dias',
    totalPremium: '$0',
  },
  {
    id: 'C-009',
    name: 'Sofia Herrera',
    phone: '+507 6012-3456',
    email: 'sofia.herrera@outlook.com',
    tags: ['Salud', 'Hogar', 'VIP'],
    policiesCount: 4,
    lastActivity: 'Hace 5 dias',
    totalPremium: '$340/mes',
  },
  {
    id: 'C-010',
    name: 'Miguel Sanchez',
    phone: '+507 6123-4567',
    email: 'miguel.sanchez@hotmail.com',
    tags: ['Auto', 'Renovacion'],
    policiesCount: 1,
    lastActivity: 'Hace 1 semana',
    totalPremium: '$95/mes',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tagColors: Record<string, string> = {
  VIP: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Nuevo: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Renovacion: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Empresa: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Referido: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  Auto: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  Salud: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  Hogar: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((t) => c.tags.includes(t));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-[#080c14] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 font-heading">Clientes</h1>
          <p className="mt-1 text-sm text-slate-400">
            {clients.length} clientes registrados
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" />
          Agregar Cliente
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, telefono o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#1e293b] bg-[#0d1117] py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || selectedTags.length > 0
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-[#1e293b] bg-[#0d1117] text-slate-400 hover:text-slate-300'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filtros
            {selectedTags.length > 0 && (
              <span className="ml-1 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-xs">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 rounded-lg border border-[#1e293b] bg-[#0d1117] p-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? tagColors[tag] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                    : 'border-[#1e293b] text-slate-500 hover:text-slate-400'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
              >
                Limpiar
              </button>
            )}
          </div>
        )}
      </div>

      {/* Client Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredClients.map((client) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}
            className="group rounded-xl border border-[#1e293b] bg-[#0d1117] p-5 transition-all hover:border-emerald-500/20 block"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">{client.name}</h3>
                  <span className="text-xs text-slate-500">{client.id}</span>
                </div>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="rounded-md p-1 text-slate-500 opacity-0 transition-opacity hover:bg-[#1e293b] hover:text-slate-300 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Contact */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="h-3 w-3 text-slate-500" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="h-3 w-3 text-slate-500" />
                {client.email}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    tagColors[tag] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-4 flex items-center justify-between border-t border-[#1e293b] pt-3">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Shield className="h-3 w-3" />
                {client.policiesCount} poliza{client.policiesCount !== 1 ? 's' : ''}
              </div>
              <div className="text-xs font-semibold text-emerald-400 font-data">
                {client.totalPremium}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                {client.lastActivity}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="mt-8 rounded-xl border border-[#1e293b] bg-[#0d1117] p-12 text-center">
          <User className="mx-auto h-8 w-8 text-slate-600" />
          <p className="mt-3 text-sm text-slate-400">No se encontraron clientes</p>
        </div>
      )}
    </div>
  );
}
