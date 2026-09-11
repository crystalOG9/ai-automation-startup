"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="relative w-11 h-11 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-brand-400/80 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
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
              {/* Dynamic Progress Indicator */}
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-cyan-400 transition-all duration-100 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(56, 189, 248, 0.6))",
                }}
              />
            </svg>

            {/* Micro Icon */}
            <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />

            {/* Hover Tooltip */}
            <div className="absolute right-full mr-2.5 px-2 py-0.5 rounded-md bg-[#030712] border border-white/10 text-[10px] font-mono tracking-widest text-brand-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
              TOP
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
