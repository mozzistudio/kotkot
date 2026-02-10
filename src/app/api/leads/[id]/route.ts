import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const lead = await prisma.lead.findFirst({
    where: { id: params.id, brokerId: session.user.id },
    include: {
      quotes: { orderBy: { monthlyPremium: 'asc' } },
      documents: { orderBy: { uploadedAt: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status: body.status },
    });

    const statusDescriptions: Record<string, string> = {
      contracted: `${lead.fullName} contrató seguro de ${lead.insuranceType}`,
      lost: `Lead perdido: ${lead.fullName} — Sin respuesta`,
    };

    const activityType = body.status === 'contracted' ? 'lead_converted' :
      body.status === 'lost' ? 'lead_lost' : 'lead_new';

    await prisma.activity.create({
      data: {
        brokerId: session.user.id,
        leadId: lead.id,
        activityType,
        description: statusDescriptions[body.status] || `Estado actualizado: ${lead.fullName} → ${body.status}`,
      },
    });

    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
