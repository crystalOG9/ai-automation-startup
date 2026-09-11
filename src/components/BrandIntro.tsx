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
      }, 950);
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

      // Typography setup
      const fontSize = Math.min(width * 0.15, isMobile ? 54 : 108);
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `900 ${fontSize}px var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      // Text tracking / letter-spacing
      const text = "SPARTAN";
      offCtx.letterSpacing = isMobile ? "0.18em" : "0.22em";
      offCtx.fillText(text, width / 2, height / 2);

      // Raster scan for target coordinates
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const targets: { x: number; y: number }[] = [];
      const step = isMobile ? 4 : 3; // Optimized density for mobile vs desktop

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 140) {
            targets.push({ x, y });
          }
        }
      }

      // Colors: ~85% pure white, ~15% SPARTAN electric blue
      const blueAccents = ["#60a5fa", "#38bdf8", "#93c5fd"];

      // Initialize particles
      const particles: Particle[] = targets.map((target) => {
        // Scatter points in an organic circular/radial field around screen
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
          size: isMobile ? 1.2 : isAccent ? 1.8 : 1.4,
          color,
          delay: Math.random() * 0.28,
          speed: 0.85 + Math.random() * 0.3,
        };
      });

      const startTime = performance.now();
      const DURATION = 2200; // 2.2 seconds total

      function render(now: number) {
        const elapsed = (now - startTime) / 1000; // in seconds

        // Background fill
        context.fillStyle = "#030712";
        context.fillRect(0, 0, width, height);

        // Phase 1 & 2: Convergence (0.15s -> 1.4s)
        const isAssembling = elapsed < 1.45;
        const scanPhase = elapsed >= 1.45 && elapsed < 1.95;
        const scanProgress = scanPhase ? (elapsed - 1.45) / 0.5 : 0;
        const scanX = scanProgress * (width * 0.6) + width * 0.2;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (isAssembling) {
            // Normalized convergence progress
            const progress = Math.min(1, Math.max(0, (elapsed - p.delay) / 1.05));
            // Quintic ease-out for ultra-smooth deceleration into target
            const ease = 1 - Math.pow(1 - progress, 5);

            p.x = p.originX + (p.tx - p.originX) * ease;
            p.y = p.originY + (p.ty - p.originY) * ease;
          } else {
            // Perfectly locked in place
            p.x = p.tx;
            p.y = p.ty;
          }

          // Draw particle
          context.beginPath();
          context.arc(p.x, p.y, p.size, 0, Math.PI * 2);

          // Technical scan highlight wave
          if (scanPhase && Math.abs(p.x - scanX) < 32) {
            context.fillStyle = "#38bdf8";
            context.shadowColor = "#38bdf8";
            context.shadowBlur = 6;
          } else {
            context.fillStyle = p.color;
            context.shadowBlur = 0;
          }

          context.fill();
        }

        // Phase 3: Lock-in status text (1.45s to 1.9s)
        if (elapsed > 1.45 && elapsed < 1.95) {
          context.font = `600 ${isMobile ? 9 : 11}px monospace`;
          context.textAlign = "center";
          context.fillStyle = "rgba(96, 165, 250, 0.75)";
          context.letterSpacing = "0.3em";
          context.fillText(
            "SYSTEM // VERIFIED",
            width / 2,
            height / 2 + fontSize * 0.75
          );
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

    // Skip handler (Escape key or click to skip intro)
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
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => setIsDismissed(true)}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] cursor-pointer select-none overflow-hidden"
        >
          {isReducedMotion ? (
            /* Reduced Motion Fallback: Clean, quick typographic reveal */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.25em] text-white uppercase font-sans">
                SPARTAN
              </h1>
              <p className="mt-3 text-[10px] font-mono tracking-[0.35em] text-brand-400 uppercase">
                SYSTEM // INITIALIZED
              </p>
            </motion.div>
          ) : (
            /* Canvas Particle Text Experience */
            <>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
              />

              {/* Minimal subtle skip prompt in corner */}
              <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-slate-500/60 uppercase pointer-events-none">
                [ CLICK TO SKIP ]
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
