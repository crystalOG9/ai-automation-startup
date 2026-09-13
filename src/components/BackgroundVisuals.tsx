"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { DynamicSystemField } from "@/components/DynamicSystemField";

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

  // Dynamic laser scanline tracking scroll progress in champagne skin tone
  const scanlineY = useTransform(smoothProgress, [0, 1], ["-10%", "110%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#090607] pointer-events-none select-none">
      {/* Precision Geometric Engineering Grid with Subtle White Lines */}
      <motion.div
        className="absolute -inset-y-32 inset-x-0 opacity-25"
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

      {/* Controlled, ambient gradient backdrops in Deep Burgundy & Satin Crimson */}
      <motion.div
        style={{ y: yOrbTop }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-[#e11d48]/[0.08] blur-[170px] rounded-full"
      />
      <motion.div
        style={{ y: yOrbMid }}
        className="absolute top-[35%] -right-1/4 w-[520px] h-[520px] bg-[#881337]/[0.16] blur-[180px] rounded-full"
      />
      <motion.div
        style={{ y: yOrbBottom }}
        className="absolute bottom-[10%] -left-1/4 w-[620px] h-[450px] bg-[#4c0d1e]/[0.2] blur-[190px] rounded-full"
      />

      {/* SPARTAN SYSTEM FIELD: Living Network of Micro-Nodes, Edges & Controlled Data Pulses */}
      <DynamicSystemField />

      {/* Dynamic Scanline Pulse in Satin Crimson */}
      <motion.div
        style={{ top: scanlineY }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e11d48]/40 to-transparent pointer-events-none blur-[0.5px]"
      />
    </div>
  );
}
