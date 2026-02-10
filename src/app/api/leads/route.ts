import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    where: { brokerId: session.user.id },
    include: {
      _count: { select: { quotes: true, documents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const lead = await prisma.lead.create({
      data: {
        brokerId: session.user.id,
        fullName: body.fullName,
        cedula: body.cedula,
        phone: body.phone,
        email: body.email || '',
        insuranceType: body.insuranceType,
        status: 'new',
        vehicleBrand: body.vehicleBrand || '',
        vehicleModel: body.vehicleModel || '',
        vehicleYear: body.vehicleYear || 0,
        vehicleUse: body.vehicleUse || '',
        coverageType: body.coverageType || '',
        licensePlate: body.licensePlate || '',
        source: body.source || 'webchat',
      },
    });

    await prisma.activity.create({
      data: {
        brokerId: session.user.id,
        leadId: lead.id,
        activityType: 'lead_new',
        description: `Nuevo lead: ${lead.fullName} — Seguro de ${lead.insuranceType}`,
      },
    });

    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: 'Error al crear el lead' }, { status: 500 });
  }
}
