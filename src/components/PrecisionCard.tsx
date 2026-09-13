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
  glowColor = "rgba(201, 174, 198, 0.08)",
  ...props
}: PrecisionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isEnabledRef = useRef(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isEnabledRef.current = hasFinePointer && !prefersReducedMotion;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabledRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const normalizedX = (x / rect.width - 0.5) * 2;
      const normalizedY = (y / rect.height - 0.5) * 2;
      const rotX = (-normalizedY * 4.5).toFixed(2);
      const rotY = (normalizedX * 4.5).toFixed(2);

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015) translateZ(4px)`;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${glowColor}, transparent 65%)`;
        glowRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseEnter = () => {
    if (!isEnabledRef.current) return;
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 100ms ease-out, border-color 200ms ease, box-shadow 200ms ease";
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 350ms cubic-bezier(0.19, 1, 0.22, 1), border-color 250ms ease, box-shadow 250ms ease";
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: isHovered ? "transform" : "auto",
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all duration-200",
        isHovered
          ? "border-[#C9AEC6]/35 shadow-[0_8px_32px_rgba(201,174,198,0.08)]"
          : "border-white/[0.06]",
        className
      )}
      {...props}
    >
      {/* High-contrast directional edge highlight following cursor via direct DOM styling */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-200 opacity-0"
      />

      {/* Crisp technical top-edge sheen */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent transition-opacity duration-200 pointer-events-none z-10",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
