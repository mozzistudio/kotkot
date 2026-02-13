'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

type ServiceStatus = 'operational' | 'degraded' | 'outage';
type IncidentStatus = 'resolved' | 'investigating' | 'monitoring';
type Severity = 'critical' | 'major' | 'minor' | 'maintenance';

const services: Array<{
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: string;
}> = [
  {
    name: 'API Principal',
    description: 'REST API v1',
    status: 'operational',
    uptime: '99.99%',
  },
  {
    name: 'WhatsApp Bot',
    description: 'Procesamiento de mensajes',
    status: 'operational',
    uptime: '99.98%',
  },
  {
    name: 'Dashboard',
    description: 'Aplicación web',
    status: 'operational',
    uptime: '99.99%',
  },
  {
    name: 'Webhooks',
    description: 'Entrega de eventos',
    status: 'operational',
    uptime: '99.97%',
  },
  {
    name: 'Base de Datos',
    description: 'Almacenamiento de datos',
    status: 'operational',
    uptime: '99.99%',
  },
  {
    name: 'Integraciones Aseguradoras',
    description: 'APIs de terceros',
    status: 'operational',
    uptime: '99.95%',
  },
];

const incidents: Array<{
  date: string;
  title: string;
  status: IncidentStatus;
  severity: Severity;
  description: string;
}> = [
  {
    date: '2026-02-10',
    title: 'Latencia elevada en API',
    status: 'resolved',
    severity: 'minor',
    description:
      'Se detectó un incremento en la latencia de la API entre las 14:30 y 15:15 UTC. El problema fue resuelto escalando automáticamente la infraestructura.',
  },
  {
    date: '2026-02-05',
    title: 'Mantenimiento programado completado',
    status: 'resolved',
    severity: 'maintenance',
    description:
      'Mantenimiento de base de datos completado exitosamente. El servicio estuvo disponible durante todo el proceso.',
  },
];

const upcomingMaintenance = [
  {
    date: '2026-02-15',
    time: '02:00 - 04:00 UTC',
    title: 'Actualización de seguridad',
    impact: 'No se espera interrupción del servicio',
  },
];

export default function EstadoPage() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString('es-ES', {
          timeZone: 'America/Panama',
          dateStyle: 'long',
          timeStyle: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="h-5 w-5 text-[#059669]" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'degraded':
        return 'Degradado';
      case 'outage':
        return 'Caído';
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return 'text-[#059669] bg-[rgba(202,255,4,0.15)]';
      case 'degraded':
        return 'text-yellow-700 bg-yellow-50';
      case 'outage':
        return 'text-red-700 bg-red-50';
    }
  };

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'major':
        return 'bg-orange-100 text-orange-700';
      case 'minor':
        return 'bg-yellow-100 text-yellow-700';
      case 'maintenance':
        return 'bg-blue-100 text-blue-700';
    }
  };

  const allOperational = services.every((s) => s.status === 'operational');

  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        {/* --- Page Header --- */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#059669]">
            Estado del Sistema
            <span className="inline-block h-px w-10 bg-[#059669]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            Estado de Kotkot
          </h1>
          <p className="mt-4 text-base text-[#9ca3af]">{currentTime}</p>
        </div>

        {/* --- Overall Status --- */}
        <div
          className={`bg-white border border-[#e5e7eb] rounded-[16px] mb-12 p-8 text-center ${
            allOperational
              ? 'border-[rgba(202,255,4,0.40)] bg-[rgba(202,255,4,0.15)]'
              : 'border-yellow-500/50 bg-yellow-50/30'
          }`}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)]">
            <CheckCircle2 className="h-8 w-8 text-[#059669]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#111827]">
            {allOperational
              ? 'Todos los sistemas operativos'
              : 'Algunos sistemas degradados'}
          </h2>
          <p className="mt-2 text-base text-[#6b7280]">
            {allOperational
              ? 'Todos los servicios están funcionando correctamente.'
              : 'Algunos servicios están experimentando problemas.'}
          </p>
        </div>

        {/* --- Services Status --- */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-xl font-bold text-[#111827]">
            Estado de Servicios
          </h2>
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] divide-y divide-white/40 overflow-hidden p-0">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-white"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#111827]">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#9ca3af]">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-[#9ca3af]">Uptime (30 días)</p>
                    <p className="font-mono text-sm font-semibold text-[#111827]">
                      {service.uptime}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {getStatusText(service.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Upcoming Maintenance --- */}
        {upcomingMaintenance.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 font-heading text-xl font-bold text-[#111827]">
              Mantenimiento Programado
            </h2>
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e5e7eb] rounded-[16px] flex items-start gap-4 p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)]">
                    <Clock className="h-5 w-5 text-[#059669]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-base font-semibold text-[#111827]">
                          {maintenance.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#6b7280]">
                          {maintenance.date} • {maintenance.time}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[#6b7280]">
                      {maintenance.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Recent Incidents --- */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-xl font-bold text-[#111827]">
            Incidentes Recientes
          </h2>
          {incidents.length === 0 ? (
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 text-center">
              <p className="text-base text-[#6b7280]">
                No hay incidentes reportados en los últimos 30 días.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident, idx) => (
                <div key={idx} className="bg-white border border-[#e5e7eb] rounded-[16px] p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${getSeverityColor(
                            incident.severity
                          )}`}
                        >
                          {incident.severity === 'maintenance'
                            ? 'Mantenimiento'
                            : incident.severity === 'critical'
                            ? 'Crítico'
                            : incident.severity === 'major'
                            ? 'Mayor'
                            : 'Menor'}
                        </span>
                        <span className="text-sm text-[#9ca3af]">
                          {incident.date}
                        </span>
                      </div>
                      <h3 className="mt-2 font-heading text-base font-semibold text-[#111827]">
                        {incident.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                        {incident.description}
                      </p>
                    </div>
                    <span className="ml-4 rounded-[12px] bg-[rgba(202,255,4,0.15)] px-3 py-1 text-xs font-semibold text-[#059669]">
                      Resuelto
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- Subscribe to Updates --- */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-[#111827]">
            Suscríbete a Actualizaciones
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#6b7280]">
            Recibe notificaciones por email sobre incidentes y mantenimientos
            programados.
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-3">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded-[16px] border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[rgba(5,150,105,0.20)]"
            />
            <button
              type="submit"
              className="rounded-[16px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-6 py-2.5 text-sm font-semibold text-[#111827] shadow-lg shadow-[rgba(202,255,4,0.25)] transition-all duration-200 hover:shadow-[rgba(202,255,4,0.4)] hover:brightness-110"
            >
              Suscribirse
            </button>
          </form>
        </div>

        {/* --- Footer Note --- */}
        <p className="mt-8 text-center text-sm text-[#9ca3af]">
          Esta página se actualiza automáticamente cada 60 segundos. Los tiempos
          están en UTC-5 (Hora de Panamá).
        </p>
      </div>
    </div>
  );
}
