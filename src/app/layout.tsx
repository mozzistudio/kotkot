import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "kotkot.ai — Automatiza tu Correduría de Seguros y Préstamos con IA",
  description:
    "Bot de WhatsApp con IA para corredores de seguros y préstamos. Cotiza, compara y cierra ventas 24/7. Conecta 25+ aseguradoras y bancos en Latinoamérica.",
  verification: {
    other: {
      'facebook-domain-verification': 'j013kt10g3ewc4pjpnfw9f1amturs6',
    },
  },
  openGraph: {
    title: "kotkot.ai — Automatiza tu Correduría de Seguros y Préstamos con IA",
    description:
      "Bot de WhatsApp con IA para corredores de seguros y préstamos. Cotiza, compara y cierra ventas 24/7. Conecta 25+ aseguradoras y bancos en Latinoamérica.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
