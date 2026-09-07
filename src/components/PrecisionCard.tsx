"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PrecisionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function PrecisionCard({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.15)",
  ...props
}: PrecisionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rotX: number; rotY: number }>({ rotX: 0, rotY: 0 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(hasFinePointer && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Normalized coordinates from -1 to 1
    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;

    // Subtle 3D tilt: max 3.5 degrees for disciplined enterprise feel
    const rotX = -normalizedY * 3.5;
    const rotY = normalizedX * 3.5;

    setTilt({ rotX, rotY });
  };

  const handleMouseEnter = () => {
    if (enabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotX: 0, rotY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enabled && isHovered
          ? `perspective(1000px) rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 80ms ease-out, border-color 150ms ease, box-shadow 150ms ease"
          : "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all",
        isHovered
          ? "border-brand-500/60 shadow-[0_4px_30px_rgba(37,99,235,0.2)]"
          : "border-white/10",
        className
      )}
      {...props}
    >
      {/* High-contrast directional edge highlight following cursor */}
      {enabled && isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 65%)`,
          }}
        />
      )}

      {/* Crisp technical top-edge sheen */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent transition-opacity duration-200 pointer-events-none z-10",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
