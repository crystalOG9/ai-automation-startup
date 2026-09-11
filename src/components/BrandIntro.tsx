"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  delay: number;
  speed: number;
}

export function BrandIntro() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

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
    // Check reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsReducedMotion(true);
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    let isCancelled = false;

    const startAnimation = () => {
      if (isCancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      const context: CanvasRenderingContext2D = ctx;

      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(dpr, dpr);

      const isMobile = width < 768;

      // Offscreen Canvas for text rasterization
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Typography setup - increased size and prominent presence
      const mainFontSize = Math.min(width * 0.17, isMobile ? 60 : 126);
      const subFontSize = Math.max(12, Math.min(width * 0.032, isMobile ? 14 : 24));

      offCtx.fillStyle = "#ffffff";
      offCtx.font = `900 ${mainFontSize}px var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      // Render primary title "SPARTAN"
      const mainY = height / 2 - mainFontSize * 0.18;
      offCtx.fillText("SPARTAN", width / 2, mainY);

      // Render prominent subtitle "WORKFLOW AUTOMATION"
      offCtx.font = `700 ${subFontSize}px var(--font-inter), monospace, sans-serif`;
      const subY = height / 2 + mainFontSize * 0.52;
      offCtx.fillText("WORKFLOW AUTOMATION", width / 2, subY);

      // Raster scan for target coordinates
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const targets: { x: number; y: number }[] = [];
      const step = isMobile ? 4 : 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 140) {
            targets.push({ x, y });
          }
        }
      }

      // Colors: ~84% crisp white, ~16% SPARTAN electric cyan/blue
      const blueAccents = ["#60a5fa", "#38bdf8", "#93c5fd"];

      // Initialize particles
      const particles: Particle[] = targets.map((target) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, height) * 0.65 + 40;
        const originX = width / 2 + Math.cos(angle) * dist;
        const originY = height / 2 + Math.sin(angle) * dist;

        const isAccent = Math.random() < 0.16;
        const color = isAccent
          ? blueAccents[Math.floor(Math.random() * blueAccents.length)]
          : "#f8fafc";

        return {
          x: originX,
          y: originY,
          originX,
          originY,
          tx: target.x,
          ty: target.y,
          size: isMobile ? 1.2 : isAccent ? 1.9 : 1.4,
          color,
          delay: Math.random() * 0.28,
          speed: 0.85 + Math.random() * 0.3,
        };
      });

      const startTime = performance.now();
      const DURATION = 2300; // 2.3 seconds total

      function render(now: number) {
        const elapsed = (now - startTime) / 1000; // in seconds

        // Reveal crisp typographic overlay once particles are nearly converged
        if (elapsed > 1.05 && !textVisible) {
          setTextVisible(true);
        }

        // Background fill
        context.fillStyle = "#030712";
        context.fillRect(0, 0, width, height);

        // Convergence phase
        const isAssembling = elapsed < 1.35;
        const scanPhase = elapsed >= 1.35 && elapsed < 1.9;
        const scanProgress = scanPhase ? (elapsed - 1.35) / 0.55 : 0;
        const scanX = scanProgress * (width * 0.7) + width * 0.15;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (isAssembling) {
            const progress = Math.min(1, Math.max(0, (elapsed - p.delay) / 0.95));
            const ease = 1 - Math.pow(1 - progress, 5);
            p.x = p.originX + (p.tx - p.originX) * ease;
            p.y = p.originY + (p.ty - p.originY) * ease;
          } else {
            p.x = p.tx;
            p.y = p.ty;
          }

          context.beginPath();
          context.arc(p.x, p.y, p.size, 0, Math.PI * 2);

          // Technical scan pulse highlight
          if (scanPhase && Math.abs(p.x - scanX) < 40) {
            context.fillStyle = "#38bdf8";
            context.shadowColor = "#38bdf8";
            context.shadowBlur = 8;
          } else {
            context.fillStyle = p.color;
            context.shadowBlur = 0;
          }

          context.fill();
        }

        if (now - startTime < DURATION) {
          rafRef.current = requestAnimationFrame(render);
        } else {
          setIsDismissed(true);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        startAnimation();
      });
    } else {
      startAnimation();
    }

    // Skip handler (Escape, Space, or click)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setIsDismissed(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      isCancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsUnmounted(true)}>
      {!isDismissed && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setIsDismissed(true)}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] cursor-pointer select-none overflow-hidden"
        >
          {isReducedMotion ? (
            /* Reduced Motion Fallback: Clean, large typographic reveal */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center px-4"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase font-sans">
                SPARTAN
              </h1>
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                <span className="h-[1px] w-6 sm:w-12 bg-cyan-400/80" />
                <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-mono font-bold tracking-[0.25em] sm:tracking-[0.35em] text-cyan-300 uppercase">
                  Workflow Automation
                </span>
                <span className="h-[1px] w-6 sm:w-12 bg-cyan-400/80" />
              </div>
            </motion.div>
          ) : (
            /* Canvas Particle Assembly + Razor-Sharp Typography Glow Lock-In */
            <div className="relative w-full h-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
              />

              {/* High-visibility crisp typography that illuminates seamlessly as particles lock in */}
              <div
                className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 pointer-events-none px-4 text-center ${
                  textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase font-sans drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                  SPARTAN
                </h1>

                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-5">
                  <span className="h-[1px] w-6 sm:w-12 bg-cyan-400/80 shadow-[0_0_8px_#38bdf8]" />
                  <span className="text-xs sm:text-base md:text-xl lg:text-2xl font-mono font-bold tracking-[0.25em] sm:tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white uppercase drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    Workflow Automation
                  </span>
                  <span className="h-[1px] w-6 sm:w-12 bg-cyan-400/80 shadow-[0_0_8px_#38bdf8]" />
                </div>
              </div>

              {/* Minimal subtle skip prompt in corner */}
              <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-slate-500/60 uppercase pointer-events-none">
                [ CLICK TO SKIP ]
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
