"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function BackgroundVisuals() {
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth springs for fluid, silky parallax physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Multi-tier parallax depth transformations
  const yGrid = useTransform(scrollY, [0, 6000], [0, -320]);
  // Ambient lighting orbs floating with spatial depth
  const yOrbTop = useTransform(scrollY, [0, 3000], [0, 180]);
  const yOrbMid = useTransform(scrollY, [0, 5000], [0, -240]);
  const yOrbBottom = useTransform(scrollY, [0, 6000], [0, -360]);

  // Dynamic cybernetic laser scanline tracking scroll progress
  const scanlineY = useTransform(smoothProgress, [0, 1], ["-10%", "110%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030712] pointer-events-none select-none">
      {/* Precision Geometric Engineering Grid with Parallax Translation */}
      <motion.div
        className="absolute -inset-y-32 inset-x-0 opacity-35"
        style={{
          y: yGrid,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 40%, transparent 95%)",
        }}
      />

      {/* Controlled, ambient B2B enterprise gradient backdrops with dynamic spatial depth */}
      <motion.div
        style={{ y: yOrbTop }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-brand-600/[0.08] blur-[160px] rounded-full"
      />
      <motion.div
        style={{ y: yOrbMid }}
        className="absolute top-[35%] -right-1/4 w-[520px] h-[520px] bg-brand-900/[0.09] blur-[170px] rounded-full"
      />
      <motion.div
        style={{ y: yOrbBottom }}
        className="absolute bottom-[10%] -left-1/4 w-[620px] h-[450px] bg-brand-950/[0.14] blur-[180px] rounded-full"
      />

      {/* Dynamic Cybernetic Laser Scanline Pulse traveling across the viewport */}
      <motion.div
        style={{ top: scanlineY }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none blur-[0.5px]"
      />
    </div>
  );
}
