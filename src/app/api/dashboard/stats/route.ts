import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { subDays, startOfMonth, startOfDay, format } from 'date-fns';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const brokerId = session.user.id;
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = startOfMonth(subDays(thisMonthStart, 1));
  const thirtyDaysAgo = subDays(now, 30);

  const [
    allLeads,
    leadsThisMonth,
    leadsLastMonth,
    quotesThisMonth,
    recentActivities,
  ] = await Promise.all([
    prisma.lead.findMany({ where: { brokerId }, include: { quotes: true } }),
    prisma.lead.count({ where: { brokerId, createdAt: { gte: thisMonthStart } } }),
    prisma.lead.count({ where: { brokerId, createdAt: { gte: lastMonthStart, lt: thisMonthStart } } }),
    prisma.quote.count({ where: { brokerId, createdAt: { gte: thisMonthStart } } }),
    prisma.activity.findMany({
      where: { brokerId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { lead: { select: { fullName: true } } },
    }),
  ]);

  const contracted = allLeads.filter(l => l.status === 'contracted').length;
  const total = allLeads.length;
  const conversionRate = total > 0 ? Math.round((contracted / total) * 1000) / 10 : 0;

  const pipeline = allLeads
    .filter(l => l.status !== 'lost')
    .reduce((sum, lead) => {
      const selectedQuote = lead.quotes.find(q => q.selected);
      return sum + (selectedQuote?.annualPremium || 0);
    }, 0);

  // Leads by day (last 30 days)
  const leadsLast30 = allLeads.filter(l => l.createdAt >= thirtyDaysAgo);
  const leadsByDay: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = startOfDay(subDays(now, i));
    const nextDay = startOfDay(subDays(now, i - 1));
    const count = leadsLast30.filter(l => l.createdAt >= day && l.createdAt < nextDay).length;
    leadsByDay.push({ date: format(day, 'dd/MM'), count });
  }

  // Leads by type
  const typeMap: Record<string, number> = {};
  allLeads.forEach(l => {
    typeMap[l.insuranceType] = (typeMap[l.insuranceType] || 0) + 1;
  });
  const leadsByType = Object.entries(typeMap).map(([type, count]) => ({ type, count }));

  // Leads by status
  const statusMap: Record<string, number> = {};
  allLeads.forEach(l => {
    statusMap[l.status] = (statusMap[l.status] || 0) + 1;
  });
  const statusOrder = ['new', 'quoted', 'docs_pending', 'docs_complete', 'contracted', 'lost'];
  const leadsByStatus = statusOrder.map(status => ({
    status,
    count: statusMap[status] || 0,
  }));

  return NextResponse.json({
    leadsThisMonth,
    leadsLastMonth,
    quotesThisMonth,
    conversionRate,
    pipeline: Math.round(pipeline * 100) / 100,
    leadsByDay,
    leadsByType,
    leadsByStatus,
    recentActivities: recentActivities.map(a => ({
      id: a.id,
      activityType: a.activityType,
      description: a.description,
      createdAt: a.createdAt.toISOString(),
    })),
  });
}
