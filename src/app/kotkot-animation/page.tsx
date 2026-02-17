"use client";

import { useState, useEffect, useMemo } from "react";

const chickenPixels = [
  "          ████████           ",
  "        ██████████████        ",
  "      ████████████████████    ",
  "     ████  ████  ████████     ",
  "    ██████████████████████    ",
  "    ██████████████████████    ",
  "     ████████████████████     ",
  "      ██████████████████      ",
  "       ████████████████       ",
  "      ████████████████        ",
  "     ██████████████           ",
  "    ████████████              ",
  "   ██████  ██████             ",
  "  ████      ████              ",
  "  ███        ███              ",
];

const navItems = [
  "Fonctionnalités",
  "Comment ça marche",
  "Tarifs",
  "À propos",
  "Contact",
];

function getPixelColor(lineIndex: number): string {
  const colors = ["#ea580c", "#dc2626", "#f97316"];
  return colors[lineIndex % 3];
}

interface Particle {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: 8 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 6,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.4,
  }));
}

export default function KotkotAnimationPage() {
  const [offset, setOffset] = useState(0);
  const [glitchOffsets, setGlitchOffsets] = useState<number[]>(
    () => new Array(chickenPixels.length).fill(0)
  );

  const particles = useMemo(() => generateParticles(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
      if (Math.random() > 0.95) {
        const intensity = Math.random() * 20;
        setGlitchOffsets(
          chickenPixels.map(() =>
            Math.random() > 0.3 ? (Math.random() - 0.5) * intensity : 0
          )
        );
        setTimeout(() => setGlitchOffsets(new Array(chickenPixels.length).fill(0)), 100);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const shinePosition = offset;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Navigation */}
      <nav className="w-full px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "monospace", color: "#ea580c" }}
          >
            KOTKOT
          </span>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                style={{ fontFamily: "monospace" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl w-full mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text and CTA */}
          <div className="flex flex-col gap-6">
            <div>
              <h1
                className="text-7xl font-bold tracking-tighter"
                style={{ fontFamily: "monospace", color: "#ea580c" }}
              >
                KOTKOT
              </h1>
              <h2
                className="text-5xl font-bold tracking-tight mt-2"
                style={{ fontFamily: "monospace", color: "#dc2626" }}
              >
                AI POULE
              </h2>
            </div>

            <p className="text-lg text-gray-700 max-w-md leading-relaxed">
              Votre assistante IA maligne qui vous aide à gérer vos tâches et
              pondre des idées brillantes.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                Commencer
              </button>
              <button className="text-orange-600 font-semibold hover:underline transition-colors">
                Comment ça marche →
              </button>
            </div>
          </div>

          {/* Right column - Chicken animation */}
          <div className="relative flex items-center justify-center">
            {/* Floating particles */}
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: "#f97316",
                  opacity: particle.opacity,
                  animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                }}
              />
            ))}

            {/* Chicken pixel art container */}
            <div
              className="relative"
              style={{ boxShadow: "0 0 10px rgba(234, 88, 12, 0.3)" }}
            >
              {/* Shine effect overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(90deg, transparent ${shinePosition - 5}%, rgba(255,255,255,0.2) ${shinePosition}%, rgba(255,255,255,0.3) ${shinePosition + 2}%, rgba(255,255,255,0.2) ${shinePosition + 5}%, transparent ${shinePosition + 10}%)`,
                }}
              />

              {/* Scan lines overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full"
                    style={{
                      height: 40,
                      background: "rgba(234, 88, 12, 0.08)",
                      transform: `translateX(${-offset * 2}px)`,
                    }}
                  />
                ))}
              </div>

              {/* Pixel rows */}
              {chickenPixels.map((line, lineIndex) => {
                const sinOffset =
                  Math.sin((offset + lineIndex * 3) / 10) * 15;
                const glitchOffset = glitchOffsets[lineIndex];
                const isGlitching = glitchOffset !== 0;

                return (
                  <div
                    key={lineIndex}
                    className="flex"
                    style={{
                      height: 40,
                      transform: `translateX(${sinOffset + glitchOffset}px)`,
                      transition:
                        isGlitching ? "none" : "transform 0.05s linear",
                    }}
                  >
                    {line.split("").map((char, charIndex) => (
                      <div
                        key={charIndex}
                        style={{
                          width: 20,
                          height: 40,
                          backgroundColor:
                            char !== " "
                              ? getPixelColor(lineIndex)
                              : "transparent",
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Float animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
