"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
const CANVAS_W = mascotPixels[0].length * PIXEL_SIZE;
const CANVAS_H = TOTAL_LINES * LINE_HEIGHT;
const CYCLE_FRAMES = 100; // 100 frames × 50ms = 5s loop

const navItems = ["Product", "Research", "Pricing", "About"];

// Scanline density — tighter = more CRT feel
const SCANLINE_GAP = 3;

export default function KotkotGlitchPage() {
  const [frame, setFrame] = useState(0);
  const [scanlineY, setScanlineY] = useState(0);

  // Glitch state — jitter offsets per row + intensity
  const [glitchOffsets, setGlitchOffsets] = useState<number[]>(
    () => new Array(TOTAL_LINES).fill(0)
  );
  // Threshold flicker — randomly blacks-out rows
  const [thresholdRows, setThresholdRows] = useState<boolean[]>(
    () => new Array(TOTAL_LINES).fill(false)
  );
  // RGB split offset during glitch
  const [rgbSplit, setRgbSplit] = useState(0);
  // Block corruption — random rectangular artifact
  const [corruptBlock, setCorruptBlock] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    shift: number;
  } | null>(null);
  // Full-frame jitter
  const [frameJitter, setFrameJitter] = useState({ x: 0, y: 0 });
  // Flicker opacity
  const [flickerOpacity, setFlickerOpacity] = useState(1);
  // Whether we're in a glitch burst
  const glitchActive = useRef(false);

  const triggerGlitch = useCallback(() => {
    if (glitchActive.current) return;
    glitchActive.current = true;

    const intensity = 6 + Math.random() * 20;
    const burstCount = 1 + Math.floor(Math.random() * 3);
    let burst = 0;

    const doBurst = () => {
      // Row jitter
      setGlitchOffsets(
        mascotPixels.map(() =>
          Math.random() > 0.3 ? (Math.random() - 0.5) * intensity : 0
        )
      );

      // Threshold flicker — some rows disappear
      setThresholdRows(
        mascotPixels.map(() => Math.random() > 0.75)
      );

      // RGB channel split
      setRgbSplit((Math.random() - 0.5) * 8);

      // Block corruption artifact
      if (Math.random() > 0.5) {
        setCorruptBlock({
          x: Math.random() * CANVAS_W * 0.6,
          y: Math.random() * CANVAS_H * 0.7,
          w: 20 + Math.random() * 60,
          h: 4 + Math.random() * 16,
          shift: (Math.random() - 0.5) * 30,
        });
      }

      // Whole-frame jitter
      setFrameJitter({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 3,
      });

      // Brief flicker
      setFlickerOpacity(0.7 + Math.random() * 0.3);

      burst++;
      if (burst < burstCount) {
        setTimeout(doBurst, 30 + Math.random() * 50);
      } else {
        // Recover
        setTimeout(() => {
          setGlitchOffsets(new Array(TOTAL_LINES).fill(0));
          setThresholdRows(new Array(TOTAL_LINES).fill(false));
          setRgbSplit(0);
          setCorruptBlock(null);
          setFrameJitter({ x: 0, y: 0 });
          setFlickerOpacity(1);
          glitchActive.current = false;
        }, 40 + Math.random() * 60);
      }
    };

    doBurst();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % CYCLE_FRAMES);
      setScanlineY((prev) => (prev + 2) % (CANVAS_H + 40));

      if (Math.random() > 0.90) {
        triggerGlitch();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [triggerGlitch]);

  const progress = frame / CYCLE_FRAMES;
  const isGlitching = glitchOffsets.some((g) => g !== 0);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Navigation */}
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

          {/* Right — Mascot with glitch effects */}
          <div className="flex items-center justify-center">
            <div
              className="relative"
              style={{
                transform: `translate(${frameJitter.x}px, ${frameJitter.y}px)`,
                transition: isGlitching ? "none" : "transform 0.15s ease-out",
                opacity: flickerOpacity,
              }}
            >
              {/* Dense CRT scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent ${SCANLINE_GAP}px,
                    rgba(0,0,0,0.04) ${SCANLINE_GAP}px,
                    rgba(0,0,0,0.04) ${SCANLINE_GAP + 1}px
                  )`,
                }}
              />

              {/* Moving CRT scanline sweep */}
              <div
                className="absolute left-0 right-0 pointer-events-none z-20"
                style={{
                  top: scanlineY,
                  height: 3,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.09) 15%, rgba(0,0,0,0.09) 85%, transparent 100%)",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
              />

              {/* Pixel rows */}
              {mascotPixels.map((line, lineIndex) => {
                const breathe =
                  Math.sin(progress * Math.PI * 2 + lineIndex * 0.3) * 2;
                const glitch = glitchOffsets[lineIndex];
                const rowGlitching = glitch !== 0;
                const thresholdHit = thresholdRows[lineIndex];

                const lineOpacity = thresholdHit
                  ? 0
                  : 0.85 +
                    0.15 *
                      Math.sin(progress * Math.PI * 2 + lineIndex * 0.5);

                return (
                  <div
                    key={lineIndex}
                    className="flex"
                    style={{
                      height: LINE_HEIGHT,
                      transform: `translateX(${breathe + glitch}px)`,
                      transition: rowGlitching
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

              {/* RGB channel split — red ghost */}
              {isGlitching && rgbSplit !== 0 && (
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    transform: `translateX(${rgbSplit}px)`,
                    mixBlendMode: "multiply",
                    opacity: 0.25,
                  }}
                >
                  {mascotPixels.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className="flex"
                      style={{
                        height: LINE_HEIGHT,
                        transform: `translateX(${glitchOffsets[lineIndex] * -0.5}px)`,
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
                                ? "rgba(220,38,38,0.5)"
                                : "transparent",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* RGB channel split — cyan ghost */}
              {isGlitching && rgbSplit !== 0 && (
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    transform: `translateX(${-rgbSplit * 0.7}px) translateY(1px)`,
                    mixBlendMode: "multiply",
                    opacity: 0.2,
                  }}
                >
                  {mascotPixels.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className="flex"
                      style={{
                        height: LINE_HEIGHT,
                        transform: `translateX(${glitchOffsets[lineIndex] * 0.3}px)`,
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
                                ? "rgba(6,182,212,0.5)"
                                : "transparent",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Block corruption artifact */}
              {corruptBlock && (
                <div
                  className="absolute pointer-events-none z-40"
                  style={{
                    left: corruptBlock.x,
                    top: corruptBlock.y,
                    width: corruptBlock.w,
                    height: corruptBlock.h,
                    transform: `translateX(${corruptBlock.shift}px)`,
                    backgroundColor: "rgba(23,23,23,0.12)",
                    mixBlendMode: "darken",
                  }}
                />
              )}

              {/* Noise/static grain overlay during glitch */}
              {isGlitching && (
                <div
                  className="absolute inset-0 pointer-events-none z-50"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.06,
                    mixBlendMode: "multiply",
                  }}
                />
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
