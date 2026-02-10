import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const insurers = [
  'ASSA Compañía de Seguros',
  'Mapfre Panamá',
  'Generali Seguros',
  'Seguros Suramericana',
  'Pan American Life',
  'Global Seguros',
  'Banistmo Seguros',
  'Multinacional de Seguros',
];

const planNames = ['Plan Básico', 'Plan Estándar', 'Plan Premium', 'Plan Elite'];

const basePremiums: Record<string, number> = {
  auto: 135, moto: 72, salud: 295, hogar: 115, viaje: 48, empresarial: 380,
};

function getCoverageItems(type: string): string {
  const r = () => Math.random() > 0.5;
  const items: { item: string; included: boolean }[] = [];
  switch (type) {
    case 'auto':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Daños propios', included: r() },
        { item: 'Robo total', included: true },
        { item: 'Asistencia vial 24/7', included: true },
        { item: 'Auto sustituto', included: r() },
        { item: 'Cobertura de vidrios', included: r() },
      );
      break;
    case 'moto':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Daños propios', included: r() },
        { item: 'Robo total', included: true },
        { item: 'Asistencia vial 24/7', included: true },
        { item: 'Equipamiento especial', included: r() },
      );
      break;
    case 'salud':
      items.push(
        { item: 'Consultas médicas', included: true },
        { item: 'Hospitalización', included: true },
        { item: 'Medicamentos', included: r() },
        { item: 'Laboratorios', included: true },
        { item: 'Cirugías', included: r() },
        { item: 'Maternidad', included: r() },
        { item: 'Dental', included: r() },
      );
      break;
    case 'hogar':
      items.push(
        { item: 'Incendio y explosión', included: true },
        { item: 'Robo', included: true },
        { item: 'Daños por agua', included: r() },
        { item: 'Responsabilidad civil', included: true },
        { item: 'Contenido', included: r() },
        { item: 'Desastres naturales', included: r() },
      );
      break;
    case 'viaje':
      items.push(
        { item: 'Gastos médicos', included: true },
        { item: 'Cancelación de viaje', included: r() },
        { item: 'Pérdida de equipaje', included: true },
        { item: 'Repatriación', included: true },
        { item: 'Asistencia legal', included: r() },
      );
      break;
    case 'empresarial':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Propiedad comercial', included: true },
        { item: 'Interrupción de negocio', included: r() },
        { item: 'Responsabilidad patronal', included: true },
        { item: 'Ciberriesgo', included: r() },
        { item: 'Transporte de mercancía', included: r() },
        { item: 'Equipo electrónico', included: r() },
      );
      break;
  }
  return JSON.stringify(items);
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { leadId, insuranceType } = body;

    const selectedInsurers = pickRandom(insurers, 4);
    const base = basePremiums[insuranceType] || 135;

    const quotes = [];
    for (let i = 0; i < 4; i++) {
      const factor = 0.82 + Math.random() * 0.46;
      const monthly = Math.round(base * factor * 100) / 100;
      const annual = Math.round(monthly * 11 * 100) / 100;
      const deductible = 250 + Math.floor(Math.random() * 16) * 50;

      const quote = await prisma.quote.create({
        data: {
          leadId,
          brokerId: session.user.id,
          insurerName: selectedInsurers[i],
          planName: planNames[i],
          monthlyPremium: monthly,
          annualPremium: annual,
          deductible,
          coverageDescription: `Cobertura de seguro de ${insuranceType}`,
          coverageItems: getCoverageItems(insuranceType),
          selected: false,
        },
      });
      quotes.push(quote);
    }

    // Update lead status
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'quoted' },
    });

    // Create activity
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    await prisma.activity.create({
      data: {
        brokerId: session.user.id,
        leadId,
        activityType: 'quote_sent',
        description: `Cotización enviada a ${lead?.fullName} — 4 ofertas generadas`,
      },
    });

    return NextResponse.json(quotes);
  } catch {
    return NextResponse.json({ error: 'Error al generar cotizaciones' }, { status: 500 });
  }
}
