"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { DynamicSystemField } from "@/components/DynamicSystemField";

export function BackgroundVisuals() {
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth spring for subtle scanline tracking
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Parallax depth transformations with restrained distances
  const yGrid = useTransform(scrollY, [0, 6000], [0, -180]);
  const yOrbTop = useTransform(scrollY, [0, 3000], [0, 100]);
  const yOrbMid = useTransform(scrollY, [0, 5000], [0, -120]);
  const yOrbBottom = useTransform(scrollY, [0, 6000], [0, -160]);

  const scanlineY = useTransform(smoothProgress, [0, 1], ["-5%", "105%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#090607] pointer-events-none select-none">
      {/* Precision Geometric Engineering Grid */}
      <motion.div
        className="absolute -inset-y-16 inset-x-0 opacity-25 will-change-transform"
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

      {/* Controlled, ambient lighting backdrops in Deep Burgundy & Satin Crimson */}
      {/* Uses optimized blur on desktop, and smooth radial gradients on mobile without GPU raster stalls */}
      <motion.div
        style={{ y: yOrbTop }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.08)_0%,transparent_70%)] md:bg-[#e11d48]/[0.07] md:blur-[80px] rounded-full will-change-transform"
      />
      <motion.div
        style={{ y: yOrbMid }}
        className="absolute top-[35%] -right-1/6 w-[440px] h-[440px] bg-[radial-gradient(ellipse_at_center,rgba(136,19,55,0.14)_0%,transparent_70%)] md:bg-[#881337]/[0.14] md:blur-[85px] rounded-full will-change-transform"
      />
      <motion.div
        style={{ y: yOrbBottom }}
        className="absolute bottom-[10%] -left-1/6 w-[500px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(76,13,30,0.16)_0%,transparent_70%)] md:bg-[#4c0d1e]/[0.16] md:blur-[90px] rounded-full will-change-transform"
      />

      {/* SPARTAN SYSTEM FIELD: Living Network of Micro-Nodes, Edges & Controlled Data Pulses */}
      <DynamicSystemField />

      {/* Dynamic Scanline Pulse in Satin Crimson */}
      <motion.div
        style={{ top: scanlineY }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e11d48]/35 to-transparent pointer-events-none"
      />
    </div>
  );
}
