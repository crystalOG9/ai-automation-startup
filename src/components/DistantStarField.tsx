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

    // Determine adaptive star count by device class
    const isMobile = isTouchDevice || window.innerWidth < 768;
    const getStarCount = (w: number) => {
      if (w < 768 || isTouchDevice) return 45; // Mobile: lightweight starfield
      if (w < 1200) return 160; // Laptop / Tablet
      return 260; // Desktop
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
        const nx = Math.random();
        const ny = Math.random();

        const layerRoll = Math.random();
        let layer: 1 | 2 | 3;
        let size: number;
        let baseAlpha: number;

        if (layerRoll < 0.65) {
          layer = 1;
          size = 0.9 + Math.random() * 0.5;
          baseAlpha = 0.25 + Math.random() * 0.20;
        } else if (layerRoll < 0.90) {
          layer = 2;
          size = 1.5 + Math.random() * 0.7;
          baseAlpha = 0.45 + Math.random() * 0.25;
        } else {
          layer = 3;
          size = 2.3 + Math.random() * 0.9;
          baseAlpha = 0.75 + Math.random() * 0.18;
        }

        const colorRoll = Math.random();
        let color: string;
        if (colorRoll < 0.60) {
          color = "244, 241, 234";
        } else if (colorRoll < 0.88) {
          color = "255, 255, 255";
        } else {
          color = "235, 240, 248";
        }

        const hasTwinkle = Math.random() < 0.12 && !prefersReducedMotion && !isMobile;
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

    const renderStaticStars = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = star.nx * width;
        const sy = star.ny * height;
        ctx.fillStyle = `rgba(${star.color}, ${star.baseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
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

      initStars();

      if (prefersReducedMotion || isMobile) {
        renderStaticStars();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // On mobile devices or reduced motion, render static stars once with zero CPU loop
    if (prefersReducedMotion || isMobile) {
      renderStaticStars();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
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

    // Desktop animation loop: gentle ambient twinkling only, NO mouse displacement
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = star.nx * width;
        const sy = star.ny * height;

        let alpha = star.baseAlpha;
        if (star.hasTwinkle) {
          alpha += Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase) * 0.12;
          if (alpha < 0.15) alpha = 0.15;
          if (alpha > 0.95) alpha = 0.95;
        }

        ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
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
