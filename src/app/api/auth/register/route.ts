import { NextResponse } from 'next/server';
import { hashSync } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password, companyName, brandName, primaryColor } = await request.json();

    if (!email || !password || !companyName || !brandName) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const existing = await prisma.broker.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 400 });
    }

    const passwordHash = hashSync(password, 10);
    const broker = await prisma.broker.create({
      data: {
        email,
        passwordHash,
        companyName,
        brandName,
        primaryColor: primaryColor || '#2D8C4E',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ success: true, broker: { id: broker.id, email: broker.email } });
  } catch {
    return NextResponse.json({ error: 'Error al crear la cuenta' }, { status: 500 });
  }
}
