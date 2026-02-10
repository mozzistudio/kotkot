'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Check, Phone, Wifi, WifiOff } from 'lucide-react';

const colorPresets = ['#2D8C4E', '#2563EB', '#DC2626', '#7C3AED', '#EA580C', '#0D9488'];

const plans = [
  { key: 'starter', name: 'Starter', price: '$49/mes', limit: 50, features: ['50 leads/mes', '1 número WhatsApp', 'Dashboard básico', 'Soporte por email', '1 usuario'] },
  { key: 'pro', name: 'Pro', price: '$149/mes', limit: 999, features: ['Leads ilimitados', '3 números WhatsApp', 'Dashboard completo', 'Soporte prioritario', '5 usuarios'] },
  { key: 'enterprise', name: 'Enterprise', price: 'Contáctenos', limit: 9999, features: ['Leads ilimitados', 'WhatsApp ilimitados', 'Dashboard personalizado', 'Soporte dedicado', 'Usuarios ilimitados'] },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState('perfil');
  const [toast, setToast] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2D8C4E');
  const [secondaryColor, setSecondaryColor] = useState('#E67E22');
  const [customPrimary, setCustomPrimary] = useState('');
  const [customSecondary, setCustomSecondary] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [waConnected, setWaConnected] = useState(false);
  const [waNumber, setWaNumber] = useState('');
  const [waLoading, setWaLoading] = useState(false);
  const [waModal, setWaModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);

  useEffect(() => {
    if (session?.user) {
      setCompanyName(session.user.companyName);
      setBrandName(session.user.brandName);
      setPrimaryColor(session.user.primaryColor);
    }
    fetch('/api/settings/whatsapp').then(r => r.json()).then(data => {
      if (data) { setWaConnected(data.whatsappConnected); setWaNumber(data.whatsappNumber); }
    });
    fetch('/api/leads').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setLeadsCount(data.length);
    });
  }, [session]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function saveProfile() {
    const res = await fetch('/api/settings/profile', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, brandName }),
    });
    if (res.ok) showToast('Perfil actualizado');
  }

  async function saveBrand() {
    const res = await fetch('/api/settings/brand', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ primaryColor, secondaryColor }),
    });
    if (res.ok) showToast('Marca actualizada');
  }

  async function connectWhatsApp() {
    setWaLoading(true);
    await new Promise(r => setTimeout(r, 3000));
    const res = await fetch('/api/settings/whatsapp', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      setWaConnected(true);
      setWaNumber(data.broker.whatsappNumber);
      setWaModal(false);
      showToast('WhatsApp conectado exitosamente');
    }
    setWaLoading(false);
  }

  const currentPlan = plans.find(p => p.key === session?.user?.plan) || plans[0];
  const planLimit = currentPlan.limit;
  const usagePercent = Math.min(100, Math.round((leadsCount / planLimit) * 100));
  const usageColor = usagePercent >= 100 ? 'bg-red-500' : usagePercent >= 80 ? 'bg-orange-500' : 'bg-green-500';

  const tabs = [
    { key: 'perfil', label: 'Perfil' },
    { key: 'marca', label: 'Marca' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'plan', label: 'Plan' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-brand text-brand' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Perfil */}
      {tab === 'perfil' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Perfil de la empresa</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la empresa</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de marca</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" value={session?.user?.email || ''} readOnly
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
          </div>
          <button onClick={saveProfile} className="bg-brand text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
            Guardar cambios
          </button>
        </div>
      )}

      {/* Marca */}
      {tab === 'marca' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">Personalización de marca</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: primaryColor }}>
                  {brandName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <label className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 cursor-pointer">
                Subir logo
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) { const reader = new FileReader(); reader.onload = (ev) => setLogoPreview(ev.target?.result as string); reader.readAsDataURL(file); }
                }} />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Color principal</label>
            <div className="flex gap-2 mb-2">
              {colorPresets.map(c => (
                <button key={c} onClick={() => { setPrimaryColor(c); setCustomPrimary(''); }}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${primaryColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
            <input type="text" value={customPrimary} onChange={e => { setCustomPrimary(e.target.value); if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setPrimaryColor(e.target.value); }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none" placeholder="#RRGGBB" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Color secundario</label>
            <div className="flex gap-2 mb-2">
              {colorPresets.map(c => (
                <button key={`s-${c}`} onClick={() => { setSecondaryColor(c); setCustomSecondary(''); }}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${secondaryColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
            <input type="text" value={customSecondary} onChange={e => { setCustomSecondary(e.target.value); if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setSecondaryColor(e.target.value); }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none" placeholder="#RRGGBB" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Vista previa del bot</p>
            <div className="rounded-lg overflow-hidden border border-slate-200 max-w-xs">
              <div className="px-4 py-3 text-white text-sm font-medium" style={{ backgroundColor: primaryColor }}>
                ← {brandName} <span className="text-xs opacity-70 ml-1">en línea</span>
              </div>
              <div className="bg-[#ECE5DD] p-3 h-20" />
            </div>
          </div>
          <button onClick={saveBrand} className="bg-brand text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
            Guardar cambios
          </button>
        </div>
      )}

      {/* WhatsApp */}
      {tab === 'whatsapp' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {!waConnected ? (
            <div className="text-center py-8">
              <WifiOff className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Conecta tu WhatsApp</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Vincula tu número de WhatsApp Business para que el bot pueda atender a tus clientes automáticamente.</p>
              <button onClick={() => setWaModal(true)} className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Conectar con Meta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Wifi className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-700">WhatsApp conectado</p>
                  <p className="text-sm text-slate-500">Número: {waNumber}</p>
                </div>
              </div>
              <button onClick={() => { setWaConnected(false); setWaNumber(''); }}
                className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">
                Desconectar
              </button>
            </div>
          )}

          {/* Modal */}
          {waModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => !waLoading && setWaModal(false)}>
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-slate-900">Conectar WhatsApp Business</h3>
                <div className="space-y-3">
                  {[
                    '1. Inicia sesión con tu cuenta de Facebook',
                    '2. Selecciona o crea tu WhatsApp Business Account',
                    '3. Verifica tu número de teléfono',
                  ].map((s, i) => (
                    <p key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                      {s.substring(3)}
                    </p>
                  ))}
                </div>
                <button onClick={connectWhatsApp} disabled={waLoading}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50">
                  {waLoading ? 'Conectando...' : 'Iniciar conexión'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Plan */}
      {tab === 'plan' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Tu plan actual</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-brand-light text-brand">
                {currentPlan.name}
              </span>
              <span className="text-xl font-bold text-slate-900">{currentPlan.price}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {currentPlan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-brand" /> {f}
                </li>
              ))}
            </ul>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Leads este mes</span>
                <span className="font-medium">{leadsCount} / {planLimit === 999 ? '∞' : planLimit}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${usageColor} transition-all`} style={{ width: `${Math.min(usagePercent, 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div key={plan.key} className={`bg-white rounded-xl border p-5 ${plan.key === currentPlan.key ? 'border-brand ring-1 ring-brand/20' : 'border-slate-200'}`}>
                <h4 className="font-semibold text-slate-900">{plan.name}</h4>
                <p className="text-lg font-bold text-slate-900 mt-1">{plan.price}</p>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
                {plan.key !== currentPlan.key && (
                  <button onClick={() => setContactModal(true)}
                    className="mt-4 w-full border border-slate-300 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Cambiar plan
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Contact modal */}
          {contactModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setContactModal(false)}>
              <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 text-center" onClick={e => e.stopPropagation()}>
                <Phone className="w-10 h-10 text-brand mx-auto" />
                <h3 className="mt-3 text-lg font-semibold text-slate-900">Contactar ventas</h3>
                <p className="mt-2 text-sm text-slate-500">Para cambiar de plan, comunícate con nuestro equipo de ventas.</p>
                <p className="mt-3 text-brand font-semibold">ventas@cotifacil.com</p>
                <button onClick={() => setContactModal(false)} className="mt-4 bg-brand text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
