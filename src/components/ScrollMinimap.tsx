"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionNode {
  id: string;
  number: string;
  name: string;
}

const SECTIONS: SectionNode[] = [
  { id: "hero", number: "01", name: "OVERVIEW" },
  { id: "problem", number: "02", name: "BOTTLENECK" },
  { id: "differentiator", number: "03", name: "PHILOSOPHY" },
  { id: "core-message", number: "04", name: "COGNITION" },
  { id: "how-it-works", number: "05", name: "ROADMAP" },
  { id: "workflow-demo", number: "06", name: "LIVE DEMO" },
  { id: "solutions", number: "07", name: "SOLUTIONS" },
  { id: "roi", number: "08", name: "PRINCIPLES" },
  { id: "contact", number: "09", name: "DISPATCH" },
];

export function ScrollMinimap() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;
      setScrollPercent(percent);
      setIsVisible(scrollY > 150);

      // Determine active section
      const scrollPosition = scrollY + window.innerHeight * 0.35;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 70;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Section Navigation Minimap"
          className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none"
        >
          {/* Glass Rail Container */}
          <div className="relative flex flex-col items-end py-3 px-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.5)] group/rail hover:border-brand-500/30 transition-colors duration-300">
            {/* Scroll depth readout badge */}
            <div className="px-2 py-0.5 mb-2 font-mono text-[9px] font-bold tracking-widest text-slate-400 bg-white/5 rounded-md border border-white/5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{scrollPercent}%</span>
            </div>

            {/* Connecting Vertical Track */}
            <div className="absolute right-[19px] top-11 bottom-6 w-[1px] bg-gradient-to-b from-brand-500/20 via-cyan-400/20 to-brand-500/20 -z-0" />

            {/* Interactive Section Nodes */}
            <div className="flex flex-col gap-2.5 relative z-10">
              {SECTIONS.map((section) => {
                const isActive = activeId === section.id;
                const isHovered = hoveredId === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setHoveredId(section.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={`Scroll to ${section.name}`}
                    className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
                  >
                    {/* Tooltip Label: shown on hover or when active */}
                    <div
                      className={`transition-all duration-200 font-mono text-[10px] tracking-wider uppercase whitespace-nowrap px-2 py-0.5 rounded-md ${
                        isActive
                          ? "opacity-100 text-brand-300 bg-brand-500/10 border border-brand-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                          : isHovered
                          ? "opacity-100 text-white bg-white/10 border border-white/10"
                          : "opacity-0 -translate-x-1 pointer-events-none group-hover/rail:opacity-50 text-slate-400"
                      }`}
                    >
                      <span className="text-[8px] text-brand-400/80 mr-1 font-semibold">{section.number}</span>
                      <span>{section.name}</span>
                    </div>

                    {/* Node Dot with Cybernetic Indicator */}
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      {isActive && (
                        <motion.div
                          layoutId="minimap-reticle"
                          className="absolute inset-0 rounded-lg border border-brand-400 bg-brand-500/20 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <div
                        className={`transition-all duration-200 rounded-full ${
                          isActive
                            ? "w-2 h-2 bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
                            : isHovered
                            ? "w-2 h-2 bg-white"
                            : "w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
