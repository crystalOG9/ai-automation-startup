"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BrandIntro() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Lock body scroll while brand intro is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDismissed]);

  useEffect(() => {
    // Automatically dissolve into the homepage after 2.1s
    const timer = setTimeout(() => {
      setIsDismissed(true);
    }, 2100);

    // Skip handler (Escape, Space, or click)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setIsDismissed(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsUnmounted(true)}>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.035,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setIsDismissed(true)}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient atmospheric cyan/blue glow bloom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-[450px] sm:w-[650px] h-[250px] sm:h-[350px] rounded-full bg-brand-500/20 blur-[140px] pointer-events-none"
          />

          {/* Central High-Impact Typographic Brand Lockup */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
            
            {/* SPARTAN Title with Cinematic Blur-to-Sharp Entry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden inline-block py-2"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase font-sans drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                SPARTAN
              </h1>

              {/* Directional specular light sweep */}
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>

            {/* Workflow Automation Subtitle with Laser Dividers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-3 sm:gap-5 mt-2 sm:mt-4"
            >
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              
              <span className="text-xs sm:text-base md:text-xl lg:text-2xl font-mono font-bold tracking-[0.25em] sm:tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white uppercase drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                Workflow Automation
              </span>
              
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </motion.div>

          </div>

          {/* Minimal subtle skip prompt in corner */}
          <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-slate-500/60 uppercase pointer-events-none">
            [ CLICK TO SKIP ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
