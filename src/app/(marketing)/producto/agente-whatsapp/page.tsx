import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agente IA WhatsApp — kotkot.ai',
  description: 'Atiende clientes 24/7 por WhatsApp con IA. Responde preguntas, envía cotizaciones y agenda citas automáticamente.',
};

export default function AgenteWhatsAppPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)]">
          Agente IA WhatsApp
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Próximamente
        </p>
      </div>
    </main>
  );
}
