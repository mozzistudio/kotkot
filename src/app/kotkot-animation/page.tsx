"use client";

import { useState, useEffect, useCallback } from "react";

// Minimal monochrome pixel mascot — compact geometric chicken
const mascotPixels = [
  "      ████      ",
  "     ██████     ",
  "    ████████    ",
  "   ██  ██  ██   ",
  "   ██████████   ",
  "    ████████    ",
  "     ██████     ",
  "    ████████    ",
  "   ██████████   ",
  "  ████████████  ",
  "  ████████████  ",
  "   ██████████   ",
  "   ███    ███   ",
  "   ██      ██   ",
];

const PIXEL_SIZE = 8;
const LINE_HEIGHT = 12;
const TOTAL_LINES = mascotPixels.length;
const CYCLE_FRAMES = 100; // 100 frames × 50ms = 5s loop

const navItems = ["Product", "Research", "Pricing", "About"];

export default function KotkotAnimationPage() {
  const [frame, setFrame] = useState(0);
  const [glitchOffsets, setGlitchOffsets] = useState<number[]>(
    () => new Array(TOTAL_LINES).fill(0)
  );
  const [scanlineY, setScanlineY] = useState(0);

  const triggerGlitch = useCallback(() => {
    const intensity = 4 + Math.random() * 12;
    setGlitchOffsets(
      mascotPixels.map(() =>
        Math.random() > 0.4 ? (Math.random() - 0.5) * intensity : 0
      )
    );
    setTimeout(
      () => setGlitchOffsets(new Array(TOTAL_LINES).fill(0)),
      60 + Math.random() * 80
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % CYCLE_FRAMES);
      setScanlineY((prev) => (prev + 2) % (TOTAL_LINES * LINE_HEIGHT + 40));

      // Glitch at ~8% frequency for punchy feel
      if (Math.random() > 0.92) {
        triggerGlitch();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [triggerGlitch]);

  // Normalized progress 0→1 over 5s cycle
  const progress = frame / CYCLE_FRAMES;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Navigation — ultra minimal */}
      <nav className="w-full px-8 py-6 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ fontFamily: "monospace" }}
          >
            kotkot
          </span>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors tracking-wide uppercase"
                style={{ fontFamily: "monospace" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <main className="max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-73px)]">
          {/* Left — Copy */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p
                className="text-xs text-neutral-400 tracking-widest uppercase"
                style={{ fontFamily: "monospace" }}
              >
                AI-powered assistant
              </p>
              <h1
                className="text-5xl lg:text-6xl font-light tracking-tight leading-none text-neutral-900"
                style={{ fontFamily: "monospace" }}
              >
                kotkot
              </h1>
              <p className="text-lg text-neutral-400 font-light max-w-sm leading-relaxed mt-2">
                Your intelligent assistant that helps you manage tasks and hatch
                brilliant ideas.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded transition-colors tracking-wide">
                Get started
              </button>
              <button
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors tracking-wide"
                style={{ fontFamily: "monospace" }}
              >
                Learn more →
              </button>
            </div>
          </div>

          {/* Right — Mascot animation */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* CRT scanline sweep */}
              <div
                className="absolute left-0 right-0 pointer-events-none z-20"
                style={{
                  top: scanlineY,
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent 100%)",
                }}
              />

              {/* Static CRT scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {Array.from({ length: TOTAL_LINES }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: LINE_HEIGHT,
                      borderBottom: "1px solid rgba(0,0,0,0.03)",
                    }}
                  />
                ))}
              </div>

              {/* Pixel rows */}
              {mascotPixels.map((line, lineIndex) => {
                // Subtle sine wave — breathe animation
                const breathe =
                  Math.sin(progress * Math.PI * 2 + lineIndex * 0.3) * 2;
                const glitch = glitchOffsets[lineIndex];
                const isGlitching = glitch !== 0;

                // Opacity pulse per line for depth
                const lineOpacity =
                  0.85 +
                  0.15 *
                    Math.sin(progress * Math.PI * 2 + lineIndex * 0.5);

                return (
                  <div
                    key={lineIndex}
                    className="flex"
                    style={{
                      height: LINE_HEIGHT,
                      transform: `translateX(${breathe + glitch}px)`,
                      transition: isGlitching
                        ? "none"
                        : "transform 0.1s ease-out",
                      opacity: lineOpacity,
                    }}
                  >
                    {line.split("").map((char, charIndex) => (
                      <div
                        key={charIndex}
                        style={{
                          width: PIXEL_SIZE,
                          height: LINE_HEIGHT,
                          backgroundColor:
                            char !== " " ? "#171717" : "transparent",
                        }}
                      />
                    ))}
                  </div>
                );
              })}

              {/* Glitch RGB split — appears during glitch */}
              {glitchOffsets.some((g) => g !== 0) && (
                <div className="absolute inset-0 pointer-events-none z-30 mix-blend-multiply opacity-30">
                  {mascotPixels.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className="flex"
                      style={{
                        height: LINE_HEIGHT,
                        transform: `translateX(${(glitchOffsets[lineIndex] || 0) * -0.5 + 3}px)`,
                      }}
                    >
                      {line.split("").map((char, charIndex) => (
                        <div
                          key={charIndex}
                          style={{
                            width: PIXEL_SIZE,
                            height: LINE_HEIGHT,
                            backgroundColor:
                              char !== " "
                                ? "rgba(0,0,0,0.15)"
                                : "transparent",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom line */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
          <span
            className="text-xs text-neutral-300 tracking-widest"
            style={{ fontFamily: "monospace" }}
          >
            v0.1.0
          </span>
          <div
            className="flex items-center gap-2 text-xs text-neutral-300"
            style={{ fontFamily: "monospace" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"
              style={{
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            operational
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
