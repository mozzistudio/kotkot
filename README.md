# kotkot.ai

**Tu agente de seguros que nunca duerme**

Bot de seguros con IA por WhatsApp para brokers en Latinoamérica. Cotiza, emite y gestiona pólizas automáticamente las 24 horas.

## 🚀 Características

- 🤖 **Agente IA en WhatsApp** - Bot inteligente que cotiza y vende seguros automáticamente
- 🔌 **Integraciones con Aseguradoras** - Conecta APIs de aseguradoras para cotización en tiempo real
- 💳 **Pagos Automáticos** - Integración con Stripe y Yappy (Panamá)
- 📊 **Dashboard Inteligente** - Analytics y métricas en tiempo real
- 🎨 **Personalizable** - Configura el nombre, tono e idioma de tu bot
- 👥 **CRM Automático** - Gestión automática de leads y clientes

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilo:** Tailwind CSS 4
- **Base de Datos:** Supabase (PostgreSQL)
- **IA:** Anthropic Claude, Google Gemini
- **Pagos:** Stripe, Yappy
- **Analytics:** PostHog
- **Monitoring:** Sentry

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mozzistudio/kotkot.git
cd kotkot

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

## 🌍 Variables de Entorno

Ver `.env.local.example` para la lista completa de variables necesarias.

### Esenciales:
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key de Supabase
- `ANTHROPIC_API_KEY` - API key de Claude
- `NEXT_PUBLIC_APP_URL` - URL de tu aplicación

### Opcionales:
- `WHATSAPP_ACCESS_TOKEN` - Para integración con WhatsApp
- `STRIPE_SECRET_KEY` - Para pagos con Stripe
- `YAPPY_MERCHANT_ID` - Para pagos con Yappy (Panamá)

## 🚀 Despliegue en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mozzistudio/kotkot)

1. Haz clic en el botón de arriba
2. Configura las variables de entorno
3. Deploy!

## 📚 Documentación

- [Documentación API](https://docs.kotkot.studio)
- [Centro de Ayuda](https://kotkot.studio/ayuda)
- [Estado del Sistema](https://kotkot.studio/estado)

## 🤝 Soporte

- **Email:** support@kotkot.studio
- **WhatsApp:** +507 6000-0000

## 📄 Licencia

Todos los derechos reservados © 2026 kotkot.ai
