"use client";

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Large blue orb - top left */}
      <div
        className="floating-orb w-[350px] h-[350px] -top-20 -left-20 md:w-[400px] md:h-[400px]"
        style={{
          background: "rgba(69, 123, 157, 0.15)",
          animation: "float-1 18s ease-in-out infinite",
        }}
      />
      {/* Soft teal orb - top right */}
      <div
        className="floating-orb w-[300px] h-[300px] top-[20%] right-[-5%] md:w-[350px] md:h-[350px]"
        style={{
          background: "rgba(168, 218, 220, 0.20)",
          animation: "float-2 20s ease-in-out infinite",
        }}
      />
      {/* Subtle red/pink orb - center */}
      <div
        className="floating-orb w-[250px] h-[250px] top-[50%] left-[30%] md:w-[300px] md:h-[300px]"
        style={{
          background: "rgba(230, 57, 70, 0.08)",
          animation: "float-3 16s ease-in-out infinite",
        }}
      />
      {/* Blue accent orb - bottom */}
      <div
        className="floating-orb hidden md:block w-[280px] h-[280px] bottom-[10%] right-[20%]"
        style={{
          background: "rgba(69, 123, 157, 0.12)",
          animation: "float-4 19s ease-in-out infinite",
        }}
      />
    </div>
  );
}
