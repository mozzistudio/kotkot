'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

const insuranceTypes = [
  { key: 'auto', emoji: '🚗', label: 'Auto', desc: 'Vehículos particulares y comerciales' },
  { key: 'moto', emoji: '🏍️', label: 'Moto', desc: 'Motocicletas de todo tipo' },
  { key: 'salud', emoji: '🏥', label: 'Salud', desc: 'Planes médicos individuales y familiares' },
  { key: 'hogar', emoji: '🏠', label: 'Hogar', desc: 'Protege tu casa y contenido' },
  { key: 'viaje', emoji: '✈️', label: 'Viaje', desc: 'Cobertura para viajeros' },
  { key: 'empresarial', emoji: '🏢', label: 'Empresarial', desc: 'Seguros corporativos y de responsabilidad' },
];

const insurers = [
  'ASSA Compañía de Seguros', 'Mapfre Panamá', 'Generali Seguros', 'Seguros Suramericana',
  'Pan American Life', 'Global Seguros', 'Banistmo Seguros', 'Multinacional de Seguros',
];
const planNames = ['Plan Básico', 'Plan Estándar', 'Plan Premium', 'Plan Elite'];
const basePremiums: Record<string, number> = { auto: 135, moto: 72, salud: 295, hogar: 115, viaje: 48, empresarial: 380 };

function getCoverageItems(type: string): { item: string; included: boolean }[] {
  const r = () => Math.random() > 0.5;
  switch (type) {
    case 'auto': return [
      { item: 'Responsabilidad civil', included: true }, { item: 'Daños propios', included: r() },
      { item: 'Robo total', included: true }, { item: 'Asistencia vial 24/7', included: true },
      { item: 'Auto sustituto', included: r() }, { item: 'Cobertura de vidrios', included: r() },
    ];
    case 'moto': return [
      { item: 'Responsabilidad civil', included: true }, { item: 'Daños propios', included: r() },
      { item: 'Robo total', included: true }, { item: 'Asistencia vial 24/7', included: true },
      { item: 'Equipamiento especial', included: r() },
    ];
    case 'salud': return [
      { item: 'Consultas médicas', included: true }, { item: 'Hospitalización', included: true },
      { item: 'Medicamentos', included: r() }, { item: 'Laboratorios', included: true },
      { item: 'Cirugías', included: r() }, { item: 'Maternidad', included: r() }, { item: 'Dental', included: r() },
    ];
    case 'hogar': return [
      { item: 'Incendio y explosión', included: true }, { item: 'Robo', included: true },
      { item: 'Daños por agua', included: r() }, { item: 'Responsabilidad civil', included: true },
      { item: 'Contenido', included: r() }, { item: 'Desastres naturales', included: r() },
    ];
    case 'viaje': return [
      { item: 'Gastos médicos', included: true }, { item: 'Cancelación de viaje', included: r() },
      { item: 'Pérdida de equipaje', included: true }, { item: 'Repatriación', included: true },
      { item: 'Asistencia legal', included: r() },
    ];
    case 'empresarial': return [
      { item: 'Responsabilidad civil', included: true }, { item: 'Propiedad comercial', included: true },
      { item: 'Interrupción de negocio', included: r() }, { item: 'Responsabilidad patronal', included: true },
      { item: 'Ciberriesgo', included: r() }, { item: 'Transporte de mercancía', included: r() },
    ];
    default: return [];
  }
}

interface GeneratedQuote {
  insurerName: string; planName: string; monthlyPremium: number; annualPremium: number;
  deductible: number; coverageItems: { item: string; included: boolean }[];
}

export default function NewQuotePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Auto/Moto fields
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleUse, setVehicleUse] = useState('personal');
  const [coverageType, setCoverageType] = useState('basica');
  const [licensePlate, setLicensePlate] = useState('');

  // Salud fields
  const [age, setAge] = useState('');
  const [preexistencias, setPreexistencias] = useState('');
  const [planType, setPlanType] = useState('individual');
  const [dependents, setDependents] = useState('0');

  // Hogar fields
  const [address, setAddress] = useState('');
  const [housingType, setHousingType] = useState('casa');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [includeContent, setIncludeContent] = useState(false);

  // Viaje fields
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState('1');

  // Empresarial fields
  const [businessType, setBusinessType] = useState('');
  const [employees, setEmployees] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');

  // Step 4
  const [quotes, setQuotes] = useState<GeneratedQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  function validateStep1() {
    if (!fullName.trim()) { setError('El nombre es requerido'); return false; }
    if (!cedula.trim()) { setError('La cédula es requerida'); return false; }
    if (!phone.trim()) { setError('El teléfono es requerido'); return false; }
    setError(''); return true;
  }

  function validateStep2() {
    if (!insuranceType) { setError('Selecciona un tipo de seguro'); return false; }
    setError(''); return true;
  }

  function validateStep3() {
    if (insuranceType === 'auto' || insuranceType === 'moto') {
      if (!vehicleBrand.trim() || !vehicleModel.trim() || !vehicleYear) { setError('Completa la información del vehículo'); return false; }
    } else if (insuranceType === 'salud') {
      if (!age) { setError('Indica la edad del asegurado'); return false; }
    } else if (insuranceType === 'hogar') {
      if (!address.trim() || !estimatedValue) { setError('Completa la información del inmueble'); return false; }
    } else if (insuranceType === 'viaje') {
      if (!destination.trim() || !departureDate || !returnDate) { setError('Completa la información del viaje'); return false; }
    } else if (insuranceType === 'empresarial') {
      if (!businessType.trim() || !employees) { setError('Completa la información de la empresa'); return false; }
    }
    setError(''); return true;
  }

  function generateQuotes() {
    setLoadingQuotes(true);
    const shuffled = [...insurers].sort(() => Math.random() - 0.5).slice(0, 4);
    const base = basePremiums[insuranceType] || 135;

    setTimeout(() => {
      const generated: GeneratedQuote[] = shuffled.map((insurer, i) => {
        const factor = 0.82 + Math.random() * 0.46;
        const monthly = Math.round(base * factor * 100) / 100;
        return {
          insurerName: insurer,
          planName: planNames[i],
          monthlyPremium: monthly,
          annualPremium: Math.round(monthly * 11 * 100) / 100,
          deductible: 250 + Math.floor(Math.random() * 16) * 50,
          coverageItems: getCoverageItems(insuranceType),
        };
      }).sort((a, b) => a.monthlyPremium - b.monthlyPremium);
      setQuotes(generated);
      setLoadingQuotes(false);
    }, 2000);
  }

  async function handleSave() {
    if (selectedQuote === null) return;
    setSaving(true);
    try {
      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, cedula, phone, email, insuranceType,
          vehicleBrand, vehicleModel, vehicleYear: parseInt(vehicleYear) || 0,
          vehicleUse, coverageType, licensePlate,
        }),
      });
      const lead = await leadRes.json();

      await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, insuranceType }),
      });

      router.push(`/leads/${lead.id}`);
    } catch {
      setError('Error al guardar');
      setSaving(false);
    }
  }

  const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none text-sm';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${s <= step ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'}`}>{s}</div>
            {s < 4 && <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-brand' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}

      {/* Step 1: Client data */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Datos del cliente</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo *</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cédula *</label>
              <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} className={inputClass} placeholder="8-XXX-XXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+507 6XXX-XXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email (opcional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="email@ejemplo.com" />
            </div>
            <button onClick={() => validateStep1() && setStep(2)} className="w-full bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">Siguiente</button>
          </div>
        </div>
      )}

      {/* Step 2: Insurance type */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tipo de seguro</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {insuranceTypes.map((t) => (
              <button key={t.key} onClick={() => setInsuranceType(t.key)}
                className={`border-2 rounded-xl p-4 text-center transition-all ${insuranceType === t.key ? 'border-brand bg-brand/5' : 'border-slate-200 hover:border-slate-300'}`}>
                <span className="text-3xl">{t.emoji}</span>
                <p className="mt-2 text-sm font-semibold text-slate-900">{t.label}</p>
                <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            <button onClick={() => setStep(1)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Anterior</button>
            <button onClick={() => validateStep2() && setStep(3)} className="flex-1 bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">Siguiente</button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Detalles del seguro</h2>
          <div className="space-y-4">
            {(insuranceType === 'auto' || insuranceType === 'moto') && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Marca *</label>
                    <input type="text" value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} className={inputClass} placeholder={insuranceType === 'moto' ? 'Yamaha' : 'Toyota'} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Modelo *</label>
                    <input type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} className={inputClass} placeholder={insuranceType === 'moto' ? 'MT-07' : 'Corolla'} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Año *</label>
                    <input type="number" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} className={inputClass} placeholder="2022" min={2000} max={2026} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Placa (opcional)</label>
                    <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} className={inputClass} placeholder="AB1234" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Uso *</label>
                  <div className="flex gap-3">
                    {['personal', 'comercial'].map(u => (
                      <label key={u} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="use" checked={vehicleUse === u} onChange={() => setVehicleUse(u)} className="text-brand" />
                        <span className="text-sm">{u === 'personal' ? 'Personal' : 'Comercial'}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cobertura *</label>
                  <div className="flex gap-3">
                    {[{ k: 'basica', l: 'Básica' }, { k: 'completa', l: 'Completa' }, { k: 'todo_riesgo', l: 'Todo riesgo' }].map(c => (
                      <label key={c.k} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="coverage" checked={coverageType === c.k} onChange={() => setCoverageType(c.k)} className="text-brand" />
                        <span className="text-sm">{c.l}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {insuranceType === 'salud' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Edad del asegurado *</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} placeholder="30" min={18} max={80} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preexistencias</label>
                  <textarea value={preexistencias} onChange={(e) => setPreexistencias(e.target.value)} className={inputClass} placeholder="Ninguna" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de plan *</label>
                  <div className="flex gap-3">
                    {['individual', 'familiar'].map(t => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="planType" checked={planType === t} onChange={() => setPlanType(t)} />
                        <span className="text-sm capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {planType === 'familiar' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Número de dependientes</label>
                    <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} className={inputClass} min={0} max={10} />
                  </div>
                )}
              </>
            )}

            {insuranceType === 'hogar' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dirección *</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de vivienda *</label>
                  <div className="flex gap-3">
                    {['casa', 'apartamento', 'townhouse'].map(t => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="housing" checked={housingType === t} onChange={() => setHousingType(t)} />
                        <span className="text-sm capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor estimado (USD) *</label>
                  <input type="number" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} className={inputClass} placeholder="150000" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={includeContent} onChange={(e) => setIncludeContent(e.target.checked)} />
                  <span className="text-sm">Incluir contenido</span>
                </label>
              </>
            )}

            {insuranceType === 'viaje' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Destino *</label>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className={inputClass} placeholder="Estados Unidos" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de salida *</label>
                    <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de regreso *</label>
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Número de viajeros *</label>
                  <input type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} className={inputClass} min={1} max={10} />
                </div>
              </>
            )}

            {insuranceType === 'empresarial' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rubro *</label>
                  <input type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={inputClass} placeholder="Construcción" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Número de empleados *</label>
                  <input type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Facturación anual estimada (USD)</label>
                  <input type="number" value={annualRevenue} onChange={(e) => setAnnualRevenue(e.target.value)} className={inputClass} />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Anterior</button>
              <button onClick={() => { if (validateStep3()) { setStep(4); generateQuotes(); } }}
                className="flex-1 bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">Siguiente</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Quotes */}
      {step === 4 && (
        <div className="space-y-4">
          {loadingQuotes ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
              <span className="text-5xl animate-bounce inline-block">🦊</span>
              <p className="mt-4 text-lg font-medium text-slate-700 animate-pulse">Buscando las mejores ofertas...</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Cotizaciones disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotes.map((q, i) => (
                  <div key={i} onClick={() => setSelectedQuote(i)}
                    className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all ${selectedQuote === i ? 'border-brand ring-1 ring-brand/20' : 'border-slate-200 hover:border-slate-300'}`}>
                    {selectedQuote === i && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-2">
                        <Check className="w-3 h-3 mr-1" /> Seleccionado
                      </span>
                    )}
                    <p className="font-semibold text-slate-900">{q.insurerName}</p>
                    <p className="text-sm text-slate-500">{q.planName}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">B/. {q.monthlyPremium.toFixed(2)} <span className="text-sm font-normal text-slate-500">/mes</span></p>
                    <p className="text-sm text-slate-500">B/. {q.annualPremium.toLocaleString('es-PA', { minimumFractionDigits: 2 })} /año · Deducible: B/. {q.deductible}</p>
                    <div className="mt-3 space-y-1">
                      {q.coverageItems.map((ci, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs">
                          {ci.included ? <Check className="w-3.5 h-3.5 text-green-500" /> : <X className="w-3.5 h-3.5 text-red-400" />}
                          <span className={ci.included ? 'text-slate-700' : 'text-slate-400'}>{ci.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Anterior</button>
                <button onClick={handleSave} disabled={selectedQuote === null || saving}
                  className="flex-1 bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50">
                  {saving ? 'Guardando...' : 'Crear lead y guardar'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
