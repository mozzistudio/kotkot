import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cotifacil.com"),
  title: "CotiFácil — Compara Seguros en Panamá con IA | Cotización Gratis",
  description:
    "Compara seguros de auto, salud, hogar y viaje en Panamá. Cotización gratuita con inteligencia artificial. +10 aseguradoras, resultados en minutos.",
  openGraph: {
    title: "CotiFácil — Compara Seguros Inteligentemente",
    description:
      "Tu asistente IA para comparar seguros en Panamá. Gratis, rápido, sin compromiso.",
    images: ["/og-image.jpg"],
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://cotifacil.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
