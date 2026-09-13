"use client";

import { useEffect, useRef } from "react";

interface Star {
  // Normalized anchor position (0 to 1) so resize scales naturally
  nx: number;
  ny: number;
  // Current position in screen pixels
  x: number;
  y: number;
  // Velocity for smooth spring return to anchor
  vx: number;
  vy: number;
  // Astronomical characteristics
  size: number;
  layer: 1 | 2 | 3;
  baseAlpha: number;
  color: string;
  // Optional subtle twinkle
  hasTwinkle: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function DistantStarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    let animId: number;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    // Global cursor tracking (subtle displacement only, no visible UI)
    const mouse = { x: -10000, y: -10000, active: false };

    // Determine adaptive star count by device class
    const getStarCount = (w: number) => {
      if (w < 768 || isTouchDevice) return 85; // Mobile
      if (w < 1200) return 180; // Laptop / Tablet
      return 300; // Desktop
    };

    // Determine capped device pixel ratio to avoid mobile/high-DPI GPU overhead
    const getDpr = (w: number) => {
      if (w < 1200 || isTouchDevice) return 1.0;
      return Math.min(window.devicePixelRatio || 1, 1.25);
    };

    const initStars = () => {
      const count = getStarCount(window.innerWidth);
      stars = [];

      for (let i = 0; i < count; i++) {
        // Natural distribution across entire screen
        const nx = Math.random();
        const ny = Math.random();

        // 3 Layer Astronomical Depth:
        // Layer 1 (~65%): Very distant, tiny (0.9-1.4px), lower alpha (0.25-0.45), minimal displacement
        // Layer 2 (~25%): Mid-distant, slightly larger (1.5-2.2px), medium alpha (0.45-0.70), moderate displacement
        // Layer 3 (~10%): Foreground, sparse (2.3-3.2px), bright (0.75-0.90), responsive displacement
        const layerRoll = Math.random();
        let layer: 1 | 2 | 3;
        let size: number;
        let baseAlpha: number;

        if (layerRoll < 0.65) {
          layer = 1;
          size = 0.9 + Math.random() * 0.5; // 0.9px - 1.4px
          baseAlpha = 0.25 + Math.random() * 0.20; // 0.25 - 0.45
        } else if (layerRoll < 0.90) {
          layer = 2;
          size = 1.5 + Math.random() * 0.7; // 1.5px - 2.2px
          baseAlpha = 0.45 + Math.random() * 0.25; // 0.45 - 0.70
        } else {
          layer = 3;
          size = 2.3 + Math.random() * 0.9; // 2.3px - 3.2px
          baseAlpha = 0.75 + Math.random() * 0.18; // 0.75 - 0.93
        }

        // Color palette: Cosmic Starlight (#F6EFF5), Soft White (#FFFFFF), subtle Cool White (#EBF0F8)
        const colorRoll = Math.random();
        let color: string;
        if (colorRoll < 0.60) {
          color = "244, 241, 234"; // Warm white (SPARTAN primary text tone)
        } else if (colorRoll < 0.88) {
          color = "255, 255, 255"; // Pure soft white
        } else {
          color = "235, 240, 248"; // Very subtle astronomical cool tint
        }

        // Only ~12% of stars have subtle slow opacity twinkle
        const hasTwinkle = Math.random() < 0.12 && !prefersReducedMotion;
        const twinkleSpeed = 0.6 + Math.random() * 1.0;
        const twinklePhase = Math.random() * Math.PI * 2;

        const initialX = nx * width;
        const initialY = ny * height;

        stars.push({
          nx,
          ny,
          x: initialX,
          y: initialY,
          vx: 0,
          vy: 0,
          size,
          layer,
          baseAlpha,
          color,
          hasTwinkle,
          twinkleSpeed,
          twinklePhase,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = getDpr(width);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-initialize stars adaptively
      initStars();

      // If reduced motion, render static stars once and finish
      if (prefersReducedMotion) {
        renderStaticStars();
      }
    };

    const renderStaticStars = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.fillStyle = `rgba(${star.color}, ${star.baseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Desktop cursor displacement listener (completely non-blocking)
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -10000;
      mouse.y = -10000;
    };

    if (!isTouchDevice && !prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Visibility & Intersection Observers to save 100% CPU when tab or page is hidden
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(canvas);

    let isTabActive = !document.hidden;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // If reduced motion is active, do not run animation loop
    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", handleResize);
        visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    // High performance animation loop
    let lastTime = performance.now();
    const INTERACTION_RADIUS = 100; // ~80-120px interaction radius specified
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      // Suspend rendering when invisible or backgrounded
      if (!isVisible || !isTabActive) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const hasMouse = mouse.active && !isTouchDevice;
      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Anchor target coordinates
        const anchorX = star.nx * width;
        const anchorY = star.ny * height;

        // Subtle gravitational displacement
        if (hasMouse) {
          const dx = star.x - mx;
          const dy = star.y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < RADIUS_SQ && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            // Non-linear gentle falloff
            const force = 1 - dist / INTERACTION_RADIUS;

            // Layer-based max displacement:
            // Layer 1: ~4-6px max
            // Layer 2: ~8-10px max
            // Layer 3: ~12-14px max
            const maxDisplacement = star.layer === 1 ? 5 : star.layer === 2 ? 9 : 13;
            const push = force * maxDisplacement * 1.8;

            star.vx += (dx / dist) * push * dt * 8;
            star.vy += (dy / dist) * push * dt * 8;
          }
        }

        // Smooth spring-damping return to anchor position
        const springK = star.layer === 1 ? 6.5 : star.layer === 2 ? 5.5 : 4.8;
        const damping = 0.88;

        const returnDx = anchorX - star.x;
        const returnDy = anchorY - star.y;

        star.vx = (star.vx + returnDx * springK * dt) * damping;
        star.vy = (star.vy + returnDy * springK * dt) * damping;

        star.x += star.vx;
        star.y += star.vy;

        // Compute opacity (with optional subtle twinkle on designated stars)
        let alpha = star.baseAlpha;
        if (star.hasTwinkle) {
          alpha += Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase) * 0.12;
          if (alpha < 0.15) alpha = 0.15;
          if (alpha > 0.95) alpha = 0.95;
        }

        // Render sharp distant astronomical star
        ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
      aria-hidden="true"
    />
  );
}
