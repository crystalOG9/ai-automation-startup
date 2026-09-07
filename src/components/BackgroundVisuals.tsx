"use client";

export function BackgroundVisuals() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030712] pointer-events-none select-none">
      {/* Precision Geometric Engineering Grid */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* Subtle Micro Dot Crosshairs at intersections */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(96, 165, 250, 0.3) 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Controlled, ambient B2B enterprise gradient backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] bg-brand-600/[0.07] blur-[150px] rounded-full" />
      <div className="absolute top-[40%] -right-1/4 w-[500px] h-[500px] bg-brand-900/[0.08] blur-[160px] rounded-full" />
      <div className="absolute bottom-[10%] -left-1/4 w-[600px] h-[400px] bg-brand-950/[0.12] blur-[170px] rounded-full" />
    </div>
  );
}

