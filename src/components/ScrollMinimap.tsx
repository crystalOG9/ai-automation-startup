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
  { id: "differentiator", number: "03", name: "METHOD" },
  { id: "core-message", number: "04", name: "COGNITION" },
  { id: "how-it-works", number: "05", name: "ROADMAP" },
  { id: "workflow-demo", number: "06", name: "LIVE DEMO" },
  { id: "solutions", number: "07", name: "SOLUTIONS" },
  { id: "roi", number: "08", name: "STANDARDS" },
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
          <div className="relative flex flex-col items-end py-3 px-2 rounded-2xl bg-[#0B0B0B]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_0_25px_rgba(0,0,0,0.6)] group/rail hover:border-[#C9AEC6]/30 transition-colors duration-300">
            {/* Scroll depth readout badge */}
            <div className="px-2 py-0.5 mb-2 font-mono text-[9px] font-bold tracking-widest text-[#8E8295] bg-white/[0.04] rounded-md border border-white/[0.06] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] animate-pulse" />
              <span>{scrollPercent}%</span>
            </div>

            {/* Connecting Vertical Track */}
            <div className="absolute right-[19px] top-11 bottom-6 w-[1px] bg-gradient-to-b from-[#C9AEC6]/10 via-[#C9AEC6]/30 to-[#C9AEC6]/10 -z-0" />

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
                          ? "opacity-100 text-[#C9AEC6] bg-[#C9AEC6]/10 border border-[#C9AEC6]/30 shadow-[0_0_10px_rgba(201,174,198,0.15)]"
                          : isHovered
                          ? "opacity-100 text-[#F6EFF5] bg-white/10 border border-white/10"
                          : "opacity-0 -translate-x-1 pointer-events-none group-hover/rail:opacity-50 text-[#8E8295]"
                      }`}
                    >
                      <span className="text-[8px] text-[#C9AEC6]/80 mr-1 font-semibold">{section.number}</span>
                      <span>{section.name}</span>
                    </div>

                    {/* Node Dot with Cybernetic Indicator */}
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      {isActive && (
                        <motion.div
                          layoutId="minimap-reticle"
                          className="absolute inset-0 rounded-lg border border-[#C9AEC6] bg-[#C9AEC6]/20 shadow-[0_0_12px_rgba(201,174,198,0.3)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <div
                        className={`transition-all duration-200 rounded-full ${
                          isActive
                            ? "w-2 h-2 bg-[#C9AEC6] shadow-[0_0_8px_#C9AEC6]"
                            : isHovered
                            ? "w-2 h-2 bg-[#F6EFF5]"
                            : "w-1.5 h-1.5 bg-[#8E8295]/40 group-hover:bg-[#8E8295]"
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
