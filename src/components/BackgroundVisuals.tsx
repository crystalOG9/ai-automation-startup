"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { DistantStarField } from "@/components/DistantStarField";

export function BackgroundVisuals() {
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth spring for subtle scanline tracking
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Parallax depth transformations with restrained distances
  const yGrid = useTransform(scrollY, [0, 6000], [0, -140]);
  const scanlineY = useTransform(smoothProgress, [0, 1], ["-5%", "105%"]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#080808] pointer-events-none select-none">
      {/* 1. BOTTOM LAYER: Cinematic Galaxy Rotation Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      >
        <source src="/branding/galaxy's.mp4" type="video/mp4" />
        <source src="/branding/galaxy%27s.mp4" type="video/mp4" />
      </video>

      {/* 2. SUBTLE READABILITY OVERLAY: Preserves galaxy luminance while ensuring UI text clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/45 via-[#0B0B0B]/20 to-[#080808]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,8,8,0.45)_90%)] pointer-events-none" />

      {/* Precision Geometric Engineering Grid */}
      <motion.div
        className="absolute -inset-y-16 inset-x-0 opacity-20 will-change-transform pointer-events-none"
        style={{
          y: yGrid,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 40%, transparent 95%)",
        }}
      />

      {/* 3. LAYER ABOVE VIDEO: Interactive Distant Star Field */}
      <DistantStarField />

      {/* Subtle Dynamic Scanline Pulse in Champagne */}
      <motion.div
        style={{ top: scanlineY }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9AEC6]/20 to-transparent pointer-events-none z-[2]"
      />
    </div>
  );
}

