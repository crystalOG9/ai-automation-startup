"use client";

import { useEffect, useRef } from "react";

/**
 * PrecisionMouseSystem
 * Tracks cursor position with high performance via requestAnimationFrame
 * and maintains global CSS variables (--mouse-x, --mouse-y).
 * Strictly avoids diffuse blur blobs or cursor replacement.
 */
export function PrecisionMouseSystem() {
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mouse-x", `${targetPos.current.x}px`);
          document.documentElement.style.setProperty("--mouse-y", `${targetPos.current.y}px`);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return null;
}
