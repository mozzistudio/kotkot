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
  title: "kotkot.ai — Automatiza tu correduría de seguros y préstamos con IA",
  description:
    "Plataforma de automatización para brokers. Tu bot IA cotiza, compara y cierra ventas de seguros y préstamos 24/7 por WhatsApp. Conecta 25+ aseguradoras y bancos.",
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
