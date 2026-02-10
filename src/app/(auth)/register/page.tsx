'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const colorPresets = ['#2D8C4E', '#2563EB', '#DC2626', '#7C3AED', '#EA580C'];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2D8C4E');
  const [customColor, setCustomColor] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validateStep1() {
    if (!email || !email.includes('@')) { setError('Email inválido'); return false; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return false; }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return false; }
    setError('');
    return true;
  }

  function validateStep2() {
    if (!companyName.trim()) { setError('El nombre de la empresa es requerido'); return false; }
    if (!brandName.trim()) { setError('El nombre de marca es requerido'); return false; }
    setError('');
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, companyName, brandName, primaryColor }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al registrar'); setLoading(false); return; }

      await signIn('credentials', { email, password, redirect: false });
      router.push('/dashboard');
    } catch {
      setError('Error de conexión');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="text-center mb-6">
            <span className="text-4xl">🦊</span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Crear cuenta</h1>
          </div>

          <div className="flex items-center justify-center mb-8 gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s <= step ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'
                }`}>{s}</div>
                {s < 3 && <div className={`w-8 h-0.5 ${s < step ? 'bg-brand' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="tu@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="Mínimo 6 caracteres" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="Repite tu contraseña" />
              </div>
              <button onClick={() => validateStep1() && setStep(2)}
                className="w-full bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">Siguiente</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la empresa</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="Mi Empresa S.A." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de marca</label>
                <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="Lo que verán tus clientes" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Anterior</button>
                <button onClick={() => validateStep2() && setStep(3)} className="flex-1 bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors">Siguiente</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color principal</label>
                <div className="flex gap-2 mb-2">
                  {colorPresets.map((c) => (
                    <button key={c} onClick={() => { setPrimaryColor(c); setCustomColor(''); }}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${primaryColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
                <input type="text" value={customColor} onChange={(e) => { setCustomColor(e.target.value); if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setPrimaryColor(e.target.value); }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none text-sm" placeholder="Color personalizado: #RRGGBB" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono de la empresa</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none" placeholder="+507 6XXX-XXXX" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Anterior</button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-brand text-white py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50">
                  {loading ? 'Creando...' : 'Crear cuenta'}
                </button>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-brand font-medium hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
