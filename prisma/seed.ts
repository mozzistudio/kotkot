import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function randomBetween(min: number, max: number): number {
  return min + rand() * (max - min);
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

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
  auto: 135,
  moto: 72,
  salud: 295,
  hogar: 115,
  viaje: 48,
  empresarial: 380,
};

function getCoverageItems(type: string): string {
  const items: { item: string; included: boolean }[] = [];
  switch (type) {
    case 'auto':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Daños propios', included: rand() > 0.5 },
        { item: 'Robo total', included: true },
        { item: 'Asistencia vial 24/7', included: true },
        { item: 'Auto sustituto', included: rand() > 0.5 },
        { item: 'Cobertura de vidrios', included: rand() > 0.5 }
      );
      break;
    case 'moto':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Daños propios', included: rand() > 0.5 },
        { item: 'Robo total', included: true },
        { item: 'Asistencia vial 24/7', included: true },
        { item: 'Equipamiento especial', included: rand() > 0.5 }
      );
      break;
    case 'salud':
      items.push(
        { item: 'Consultas médicas', included: true },
        { item: 'Hospitalización', included: true },
        { item: 'Medicamentos', included: rand() > 0.5 },
        { item: 'Laboratorios', included: true },
        { item: 'Cirugías', included: rand() > 0.5 },
        { item: 'Maternidad', included: rand() > 0.5 },
        { item: 'Dental', included: rand() > 0.5 }
      );
      break;
    case 'hogar':
      items.push(
        { item: 'Incendio y explosión', included: true },
        { item: 'Robo', included: true },
        { item: 'Daños por agua', included: rand() > 0.5 },
        { item: 'Responsabilidad civil', included: true },
        { item: 'Contenido', included: rand() > 0.5 },
        { item: 'Desastres naturales', included: rand() > 0.5 }
      );
      break;
    case 'viaje':
      items.push(
        { item: 'Gastos médicos', included: true },
        { item: 'Cancelación de viaje', included: rand() > 0.5 },
        { item: 'Pérdida de equipaje', included: true },
        { item: 'Repatriación', included: true },
        { item: 'Asistencia legal', included: rand() > 0.5 }
      );
      break;
    case 'empresarial':
      items.push(
        { item: 'Responsabilidad civil', included: true },
        { item: 'Propiedad comercial', included: true },
        { item: 'Interrupción de negocio', included: rand() > 0.5 },
        { item: 'Responsabilidad patronal', included: true },
        { item: 'Ciberriesgo', included: rand() > 0.5 },
        { item: 'Transporte de mercancía', included: rand() > 0.5 },
        { item: 'Equipo electrónico', included: rand() > 0.5 }
      );
      break;
  }
  return JSON.stringify(items);
}

function generateQuotes(leadId: string, brokerId: string, insuranceType: string, markFirstSelected: boolean) {
  const selectedInsurers = pickRandom(insurers, 4);
  const base = basePremiums[insuranceType] || 135;

  return selectedInsurers.map((insurer, idx) => {
    const factor = 0.82 + rand() * 0.46;
    const monthly = Math.round(base * factor * 100) / 100;
    const annual = Math.round(monthly * 11 * 100) / 100;
    const deductible = Math.round((250 + Math.floor(rand() * 16) * 50) * 100) / 100;

    return {
      leadId,
      brokerId,
      insurerName: insurer,
      planName: planNames[idx],
      monthlyPremium: monthly,
      annualPremium: annual,
      deductible,
      coverageDescription: `Cobertura de seguro de ${insuranceType}`,
      coverageItems: getCoverageItems(insuranceType),
      selected: markFirstSelected && idx === 0,
    };
  });
}

const docTypes = [
  'cedula_front',
  'cedula_back',
  'license',
  'registration',
  'vehicle_front',
  'vehicle_back',
  'vehicle_left',
  'vehicle_right',
];

const docTypeNames: Record<string, string> = {
  cedula_front: 'cedula_frente',
  cedula_back: 'cedula_reverso',
  license: 'licencia',
  registration: 'tarjeta_circulacion',
  vehicle_front: 'vehiculo_frente',
  vehicle_back: 'vehiculo_atras',
  vehicle_left: 'vehiculo_izquierda',
  vehicle_right: 'vehiculo_derecha',
};

const insuranceTypeNames: Record<string, string> = {
  auto: 'auto',
  moto: 'moto',
  salud: 'salud',
  hogar: 'hogar',
  viaje: 'viaje',
  empresarial: 'empresarial',
};

async function main() {
  // Clear existing data
  await prisma.activity.deleteMany();
  await prisma.document.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.broker.deleteMany();

  // Create brokers
  const broker1 = await prisma.broker.create({
    data: {
      email: 'admin@segurospacifico.com',
      passwordHash: hashSync('demo123', 10),
      companyName: 'Seguros Pacífico S.A.',
      brandName: 'Seguros Pacífico',
      primaryColor: '#1B6B4A',
      plan: 'pro',
      planStatus: 'active',
      whatsappConnected: true,
      whatsappNumber: '+507 6845-2103',
    },
  });

  const broker2 = await prisma.broker.create({
    data: {
      email: 'admin@protegepy.com',
      passwordHash: hashSync('demo123', 10),
      companyName: 'ProtegePTY Corp',
      brandName: 'ProtegePTY',
      primaryColor: '#2563EB',
      plan: 'starter',
      planStatus: 'trial',
      whatsappConnected: false,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  // Leads for broker 1
  const pacificoLeads = [
    { fullName: 'María Fernanda Castillo', cedula: '8-842-1567', phone: '+507 6712-3344', insuranceType: 'auto', status: 'contracted' },
    { fullName: 'Roberto Carlos Mendoza', cedula: 'PE-12-4523', phone: '+507 6698-1102', insuranceType: 'auto', status: 'docs_complete' },
    { fullName: 'Ana Lucía Sánchez', cedula: '4-198-2234', phone: '+507 6543-8877', insuranceType: 'auto', status: 'docs_pending' },
    { fullName: 'José Miguel Herrera', cedula: '8-556-9012', phone: '+507 6321-5567', insuranceType: 'auto', status: 'quoted' },
    { fullName: 'Carmen Elena Rodríguez', cedula: '3-721-4456', phone: '+507 6887-2233', insuranceType: 'auto', status: 'quoted' },
    { fullName: 'Luis Alberto Moreno', cedula: 'PE-9-876', phone: '+507 6234-7712', insuranceType: 'auto', status: 'new' },
    { fullName: 'Valentina Torres García', cedula: '8-923-3345', phone: '+507 6456-3398', insuranceType: 'auto', status: 'new' },
    { fullName: 'Diego Armando Vargas', cedula: '6-712-8890', phone: '+507 6109-4456', insuranceType: 'moto', status: 'quoted' },
    { fullName: 'Paola Andrea Jiménez', cedula: '8-334-2267', phone: '+507 6778-9901', insuranceType: 'moto', status: 'new' },
    { fullName: 'Ricardo Enrique Batista', cedula: '4-567-1123', phone: '+507 6890-1234', insuranceType: 'moto', status: 'docs_pending' },
    { fullName: 'Sofía Isabella Quintero', cedula: '8-445-6678', phone: '+507 6321-8845', insuranceType: 'salud', status: 'contracted' },
    { fullName: 'Fernando José Camacho', cedula: 'PE-11-2345', phone: '+507 6543-2211', insuranceType: 'salud', status: 'docs_complete' },
    { fullName: 'Daniela María Araúz', cedula: '3-889-4490', phone: '+507 6234-5577', insuranceType: 'salud', status: 'quoted' },
    { fullName: 'Ernesto Rafael González', cedula: '8-112-7734', phone: '+507 6678-3344', insuranceType: 'salud', status: 'new' },
    { fullName: 'Gabriela Alejandra Chen', cedula: '8-667-2289', phone: '+507 6109-6623', insuranceType: 'salud', status: 'new' },
    { fullName: 'Marcos Antonio Cedeño', cedula: '6-234-5567', phone: '+507 6887-1100', insuranceType: 'hogar', status: 'quoted' },
    { fullName: 'Lucía del Carmen Espinosa', cedula: '8-778-3312', phone: '+507 6456-9978', insuranceType: 'hogar', status: 'docs_pending' },
    { fullName: 'Andrés Felipe Domínguez', cedula: '4-891-6645', phone: '+507 6321-4432', insuranceType: 'hogar', status: 'new' },
    { fullName: 'Isabella Cristina Salas', cedula: '8-223-8801', phone: '+507 6712-7765', insuranceType: 'viaje', status: 'contracted' },
    { fullName: 'Pedro Pablo Villarreal', cedula: 'PE-8-1234', phone: '+507 6543-6654', insuranceType: 'viaje', status: 'quoted' },
    { fullName: 'Natalia Sofía Ramos', cedula: '8-556-1198', phone: '+507 6890-2243', insuranceType: 'viaje', status: 'new' },
    { fullName: 'Tomás Eduardo Ríos', cedula: '3-445-7723', phone: '+507 6234-8890', insuranceType: 'viaje', status: 'new' },
    { fullName: 'Catalina María Pinto', cedula: '8-901-2234', phone: '+507 6678-1156', insuranceType: 'empresarial', status: 'docs_complete' },
    { fullName: 'Alejandro José Barría', cedula: '6-123-4489', phone: '+507 6109-3378', insuranceType: 'empresarial', status: 'quoted' },
    { fullName: 'Mónica Patricia Vega', cedula: '8-334-5560', phone: '+507 6887-4432', insuranceType: 'empresarial', status: 'new' },
    { fullName: 'Héctor Luis De León', cedula: '4-678-9901', phone: '+507 6456-5521', insuranceType: 'auto', status: 'lost' },
    { fullName: 'Raquel Beatriz Miranda', cedula: '8-789-1245', phone: '+507 6321-6679', insuranceType: 'salud', status: 'lost' },
    { fullName: 'Jorge Iván Solís', cedula: 'PE-7-5678', phone: '+507 6712-9987', insuranceType: 'auto', status: 'new' },
  ];

  const protegePTYLeads = [
    { fullName: 'Carlos Andrés Pineda', cedula: '8-456-1234', phone: '+507 6543-1122', insuranceType: 'auto', status: 'new' },
    { fullName: 'Laura Cristina Muñoz', cedula: '3-234-5678', phone: '+507 6890-3344', insuranceType: 'salud', status: 'quoted' },
    { fullName: 'Miguel Ángel Serrano', cedula: '8-678-9012', phone: '+507 6234-5566', insuranceType: 'hogar', status: 'new' },
    { fullName: 'Diana Carolina Ortiz', cedula: '4-345-6789', phone: '+507 6678-7788', insuranceType: 'auto', status: 'new' },
  ];

  const now = new Date();

  // Create leads for broker 1
  const createdLeads1 = [];
  for (let i = 0; i < pacificoLeads.length; i++) {
    const leadData = pacificoLeads[i];
    const daysAgo = Math.floor(randomBetween(0, 29));
    const lead = await prisma.lead.create({
      data: {
        brokerId: broker1.id,
        fullName: leadData.fullName,
        cedula: leadData.cedula,
        phone: leadData.phone,
        insuranceType: leadData.insuranceType,
        status: leadData.status,
        source: rand() > 0.5 ? 'whatsapp' : 'webchat',
        vehicleBrand: leadData.insuranceType === 'auto' ? (rand() > 0.5 ? 'Toyota' : 'Hyundai') : leadData.insuranceType === 'moto' ? 'Yamaha' : '',
        vehicleModel: leadData.insuranceType === 'auto' ? (rand() > 0.5 ? 'Corolla' : 'Tucson') : leadData.insuranceType === 'moto' ? 'MT-07' : '',
        vehicleYear: (leadData.insuranceType === 'auto' || leadData.insuranceType === 'moto') ? 2020 + Math.floor(rand() * 5) : 0,
        vehicleUse: (leadData.insuranceType === 'auto' || leadData.insuranceType === 'moto') ? (rand() > 0.7 ? 'comercial' : 'personal') : '',
        coverageType: (leadData.insuranceType === 'auto' || leadData.insuranceType === 'moto') ? (['basica', 'completa', 'todo_riesgo'][Math.floor(rand() * 3)]) : '',
        createdAt: subDays(now, daysAgo),
      },
    });
    createdLeads1.push(lead);
  }

  // Create leads for broker 2
  const createdLeads2 = [];
  for (const leadData of protegePTYLeads) {
    const daysAgo = Math.floor(randomBetween(0, 15));
    const lead = await prisma.lead.create({
      data: {
        brokerId: broker2.id,
        fullName: leadData.fullName,
        cedula: leadData.cedula,
        phone: leadData.phone,
        insuranceType: leadData.insuranceType,
        status: leadData.status,
        source: 'webchat',
        createdAt: subDays(now, daysAgo),
      },
    });
    createdLeads2.push(lead);
  }

  // Create quotes for leads with quoted/docs_pending/docs_complete/contracted status
  const quotableStatuses = ['quoted', 'docs_pending', 'docs_complete', 'contracted'];

  for (const lead of [...createdLeads1, ...createdLeads2]) {
    if (quotableStatuses.includes(lead.status)) {
      const markSelected = lead.status === 'contracted' || lead.status === 'docs_complete';
      const quotes = generateQuotes(lead.id, lead.brokerId, lead.insuranceType, markSelected);
      for (const q of quotes) {
        await prisma.quote.create({ data: q });
      }
    }
  }

  // Create documents
  for (const lead of createdLeads1) {
    if (lead.status === 'docs_complete') {
      for (const dt of docTypes) {
        await prisma.document.create({
          data: {
            leadId: lead.id,
            docType: dt,
            fileName: `${docTypeNames[dt]}_${lead.cedula.replace(/\s/g, '')}.jpg`,
            fileUrl: '/placeholder-doc.svg',
            verified: true,
          },
        });
      }
    } else if (lead.status === 'docs_pending') {
      const numDocs = 3 + Math.floor(rand() * 3);
      const selectedDocs = docTypes.slice(0, numDocs);
      for (const dt of selectedDocs) {
        await prisma.document.create({
          data: {
            leadId: lead.id,
            docType: dt,
            fileName: `${docTypeNames[dt]}_${lead.cedula.replace(/\s/g, '')}.jpg`,
            fileUrl: '/placeholder-doc.svg',
            verified: rand() > 0.4,
          },
        });
      }
    }
  }

  // Create activities for broker 1 (60)
  const activityTypes = ['lead_new', 'quote_sent', 'doc_received', 'lead_converted', 'lead_lost'];
  const docTypeSpanish: Record<string, string> = {
    cedula_front: 'Cédula (frente)',
    cedula_back: 'Cédula (reverso)',
    license: 'Licencia de conducir',
    registration: 'Tarjeta de circulación',
    vehicle_front: 'Foto vehículo (frente)',
    vehicle_back: 'Foto vehículo (atrás)',
    vehicle_left: 'Foto vehículo (izquierda)',
    vehicle_right: 'Foto vehículo (derecha)',
  };

  for (let i = 0; i < 60; i++) {
    const lead = createdLeads1[Math.floor(rand() * createdLeads1.length)];
    const daysAgo = Math.floor(randomBetween(0, 29));
    const hoursAgo = Math.floor(randomBetween(0, 23));

    let actType: string;
    let desc: string;

    if (lead.status === 'contracted' && rand() > 0.7) {
      actType = 'lead_converted';
      desc = `${lead.fullName} contrató seguro de ${insuranceTypeNames[lead.insuranceType]} con ${insurers[Math.floor(rand() * insurers.length)]}`;
    } else if (lead.status === 'lost' && rand() > 0.7) {
      actType = 'lead_lost';
      desc = `Lead perdido: ${lead.fullName} — Sin respuesta`;
    } else if (rand() > 0.6) {
      actType = 'quote_sent';
      desc = `Cotización enviada a ${lead.fullName} — 4 ofertas generadas`;
    } else if (rand() > 0.4) {
      actType = 'doc_received';
      const dt = docTypes[Math.floor(rand() * docTypes.length)];
      desc = `Documento recibido de ${lead.fullName}: ${docTypeSpanish[dt]}`;
    } else {
      actType = 'lead_new';
      desc = `Nuevo lead: ${lead.fullName} — Seguro de ${insuranceTypeNames[lead.insuranceType]}`;
    }

    const actDate = new Date(subDays(now, daysAgo));
    actDate.setHours(hoursAgo, Math.floor(rand() * 60));

    await prisma.activity.create({
      data: {
        brokerId: broker1.id,
        leadId: lead.id,
        activityType: actType,
        description: desc,
        createdAt: actDate,
      },
    });
  }

  // Create activities for broker 2 (5)
  for (let i = 0; i < 5; i++) {
    const lead = createdLeads2[Math.floor(rand() * createdLeads2.length)];
    const daysAgo = Math.floor(randomBetween(0, 10));
    await prisma.activity.create({
      data: {
        brokerId: broker2.id,
        leadId: lead.id,
        activityType: 'lead_new',
        description: `Nuevo lead: ${lead.fullName} — Seguro de ${insuranceTypeNames[lead.insuranceType]}`,
        createdAt: subDays(now, daysAgo),
      },
    });
  }

  console.log('Seed completed successfully!');
  console.log(`Brokers: 2`);
  console.log(`Leads: ${createdLeads1.length + createdLeads2.length}`);

  const quoteCount = await prisma.quote.count();
  const docCount = await prisma.document.count();
  const actCount = await prisma.activity.count();
  console.log(`Quotes: ${quoteCount}`);
  console.log(`Documents: ${docCount}`);
  console.log(`Activities: ${actCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
