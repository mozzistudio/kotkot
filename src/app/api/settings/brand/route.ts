import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const broker = await prisma.broker.update({
      where: { id: session.user.id },
      data: {
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
      },
    });

    return NextResponse.json({ success: true, broker });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
