"use client";

import { motion, useScroll, useSpring, useVelocity, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

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
  const velocityGlow = useTransform(scrollVelocity, [-2000, 0, 2000], [1.8, 1, 1.8]);
  const laserOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.9]);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 20);
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none">
      {/* Laser Track Background Line */}
      <div className="w-full h-[2px] bg-white/[0.04]" />

      {/* Main Dynamic Laser Stream */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-cyan-300"
        style={{
          scaleX,
          opacity: laserOpacity,
        }}
      >
        {/* Diffuse energetic glow under the laser beam */}
        <motion.div
          className="absolute inset-0 blur-[3px] bg-gradient-to-r from-brand-600 via-cyan-400 to-blue-200"
          style={{ opacity: velocityGlow }}
        />

        {/* Leading Plasma Flare / Laser Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
          {/* Outer high-energy glow ring */}
          <motion.div
            className="w-4 h-4 rounded-full bg-cyan-400/40 blur-[4px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Intense center plasma core */}
          <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#38bdf8,0_0_16px_#2563eb]" />
        </div>
      </motion.div>
    </div>
  );
}
