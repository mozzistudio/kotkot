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
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-page-title">Clientes</h1>
          <p className="mt-1 text-body">
            {clients.length} clientes registrados
          </p>
        </div>

        <button className="btn-primary">
          <Plus className="h-4 w-4" />
          Agregar Cliente
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="Buscar por nombre, telefono o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${
              showFilters || selectedTags.length > 0
                ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)]'
                : ''
            }`}
          >
            <Filter className="h-4 w-4" />
            Filtros
            {selectedTags.length > 0 && (
              <span className="badge badge-lime">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="card-nested">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`pill ${
                  selectedTags.includes(tag)
                    ? tagColors[tag] ?? 'pill-active'
                    : 'pill-default'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="badge badge-error"
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
            className="group card block"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-light)] text-[var(--text-primary)]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-card-title">{client.name}</h3>
                  <span className="text-timestamp">{client.id}</span>
                </div>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="rounded-md p-1 text-[var(--text-tertiary)] opacity-0 transition-opacity hover:bg-[var(--surface-hover)] hover:text-[var(--text-secondary)] group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Contact */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Phone className="h-3 w-3 text-[var(--text-tertiary)]" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Mail className="h-3 w-3 text-[var(--text-tertiary)]" />
                {client.email}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className={`badge ${
                    tagColors[tag] ?? 'badge-lime'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
              <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Shield className="h-3 w-3" />
                {client.policiesCount} poliza{client.policiesCount !== 1 ? 's' : ''}
              </div>
              <div className="text-xs font-semibold text-[var(--success)] font-data">
                {client.totalPremium}
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                <Clock className="h-3 w-3" />
                {client.lastActivity}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="mt-8 card p-12 text-center">
          <User className="mx-auto h-8 w-8 text-[var(--border-medium)]" />
          <p className="mt-3 text-body">No se encontraron clientes</p>
        </div>
      )}
    </div>
  );
}
