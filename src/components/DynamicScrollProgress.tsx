"use client";

import { motion, useScroll, useSpring, useVelocity, useTransform } from "framer-motion";

export function DynamicScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  
  // High-performance spring smoothing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.0005,
  });

  // Track velocity to heighten laser intensity during fast scroll
  const scrollVelocity = useVelocity(scrollY);
  const velocityGlow = useTransform(scrollVelocity, [-2000, 0, 2000], [1.6, 0.9, 1.6]);
  const laserOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.9]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none">
      {/* Laser Track Background Line */}
      <div className="w-full h-[2px] bg-white/[0.04]" />

      {/* Main Dynamic Laser Stream in Crimson and Warm Champagne */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#881337] via-[#e11d48] to-[#ffffff]"
        style={{
          scaleX,
          opacity: laserOpacity,
        }}
      >
        {/* Diffuse energetic glow under the laser beam */}
        <motion.div
          className="absolute inset-0 blur-[2px] bg-gradient-to-r from-[#881337] via-[#e11d48] to-[#ffffff]"
          style={{ opacity: velocityGlow }}
        />

        {/* Leading Plasma Flare / Laser Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
          {/* Intense center plasma core with controlled glow */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffffff] shadow-[0_0_8px_#ffffff,0_0_16px_#e11d48]" />
        </div>
      </motion.div>
    </div>
  );
}
