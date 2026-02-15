import type { Metadata } from 'next';
import { SolucionEscalarSinEquipo } from './SolucionEscalarSinEquipo';

export const metadata: Metadata = {
  title: 'Escala tu Negocio sin Contratar — kotkot.ai',
  description:
    'Bot que maneja 500 conversaciones simultáneas. Crece 10x sin sumar salarios. Escala rentable sin equipo.',
  keywords: 'escalabilidad negocio, automatización de ventas, crecimiento sin equipo',
  openGraph: {
    title: 'Escala tu Negocio sin Contratar — kotkot.ai',
    description:
      'De 50 a 500 clientes sin contratar a nadie. 10x capacidad. $0 en costos.',
    type: 'website',
  },
};

export default function EscalarSinEquipoPage() {
  return <SolucionEscalarSinEquipo />;
}
