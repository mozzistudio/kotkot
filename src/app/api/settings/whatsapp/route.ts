import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const broker = await prisma.broker.findUnique({
    where: { id: session.user.id },
    select: { whatsappConnected: true, whatsappNumber: true, wabaId: true, phoneNumberId: true },
  });

  return NextResponse.json(broker);
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const broker = await prisma.broker.update({
      where: { id: session.user.id },
      data: {
        whatsappConnected: true,
        whatsappNumber: '+507 6845-2103',
        wabaId: 'waba_' + Math.random().toString(36).substring(7),
        phoneNumberId: 'pn_' + Math.random().toString(36).substring(7),
      },
    });

    return NextResponse.json({ success: true, broker });
  } catch {
    return NextResponse.json({ error: 'Error al conectar' }, { status: 500 });
  }
}
