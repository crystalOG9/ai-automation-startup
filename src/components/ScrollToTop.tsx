"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const { scrollYProgress, scrollY } = useScroll();

  // High-performance smooth spring for progress track without React re-renders
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      const shouldBeVisible = latest > 350;
      if (shouldBeVisible !== isVisibleRef.current) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
    });

    return () => unsub();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="relative w-11 h-11 rounded-xl bg-[#120b0e]/90 backdrop-blur-xl border border-white/10 hover:border-[#e11d48]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-slate-300 hover:text-[#ffffff] transition-colors group cursor-pointer"
          >
            {/* SVG Circular Progress Track */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-[2px]" viewBox="0 0 44 44">
              {/* Background ring */}
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              {/* Dynamic Progress Indicator driven by Framer Motion pathLength without React re-renders */}
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-[#e11d48]"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="transparent"
                style={{
                  pathLength: smoothProgress,
                  filter: "drop-shadow(0 0 4px rgba(225, 29, 72, 0.6))",
                }}
              />
            </svg>

            {/* Micro Icon */}
            <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />

            {/* Hover Tooltip */}
            <div className="absolute right-full mr-2.5 px-2 py-0.5 rounded-md bg-[#120b0e] border border-white/10 text-[10px] font-mono tracking-widest text-[#e11d48] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              TOP
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
