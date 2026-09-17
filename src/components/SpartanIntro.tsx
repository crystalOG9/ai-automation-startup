"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { StrokeText } from "./StrokeText";
import { Silk } from "./Silk";

export function SpartanIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasWiped, setHasWiped] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const dismissedRef = useRef(false);

  // Smooth dismiss handler
  const dismissIntro = useCallback((instant = false) => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // Restore body scroll immediately
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }

    if (instant || !overlayRef.current) {
      setIsVisible(false);
      return;
    }

    // Kill running timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Cinematic exit transition
    gsap.to(overlayRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        setIsVisible(false);
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        requestAnimationFrame(() => {
          setIsVisible(false);
        });
        return;
      }

      // Lock scroll while intro runs
      document.body.style.overflow = "hidden";

      // Allow Escape key to skip immediately
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          dismissIntro(true);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      // Safety timer: Guarantee intro ends within 4.8s max for relaxed pacing
      const safetyTimer = setTimeout(() => {
        dismissIntro();
      }, 4800);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(safetyTimer);
        document.body.style.overflow = "";
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }
  }, [dismissIntro]);

  // Triggered when StrokeText animation finishes
  const handleStrokeComplete = useCallback(() => {
    setHasWiped(true);

    // Subtle pause and glow peak, then smoothly fade away
    const tl = gsap.timeline({
      onComplete: () => {
        dismissIntro();
      },
    });
    timelineRef.current = tl;

    tl.to(
      contentRef.current,
      {
        filter: "drop-shadow(0 0 34px rgba(255, 255, 255, 0.6))",
        duration: 0.45,
        ease: "power2.out",
      },
      "+=0.12"
    ).to(
      overlayRef.current,
      {
        opacity: 0,
        scale: 1.03,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "+=0.4"
    );
  }, [dismissIntro]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Spartan Introduction"
      aria-modal="true"
      onClick={() => dismissIntro()}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] cursor-pointer select-none transition-colors duration-300 overflow-hidden"
    >
      {/* Dusty Metallic Gray Silk Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Silk
          speed={4}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.4}
          rotation={0.12}
          className="w-full h-full opacity-80"
        />
        {/* Soft radial vignette for crisp logo contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.72) 70%, #050505 100%)",
          }}
        />
      </div>

      {/* Subtle corner architectural bracket accents */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 w-8 h-8 border-t border-l border-[#7B7481]/40 pointer-events-none z-10" />
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 border-t border-r border-[#7B7481]/40 pointer-events-none z-10" />
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-8 h-8 border-b border-l border-[#7B7481]/40 pointer-events-none z-10" />
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-8 h-8 border-b border-r border-[#7B7481]/40 pointer-events-none z-10" />

      {/* Center Wordmark & Identity Showcase */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 transition-all duration-500"
      >
        <StrokeText
          text="S P A R T A N"
          trigger="mount"
          fillMode="wipe"
          strokeColor="#FFFFFF"
          fillColor="#FFFFFF"
          strokeWidth={1.5}
          drawDuration={1.8}
          fillDelay={0.22}
          stagger={0.048}
          ease="power2.out"
          fontSize={64}
          fontWeight={700}
          letterSpacing={14}
          onComplete={handleStrokeComplete}
          className={`w-full transition-all duration-700 ${
            hasWiped ? "drop-shadow-[0_0_28px_rgba(255,255,255,0.48)]" : ""
          }`}
        />

        {/* Elegant Identity Subtitle */}
        <div
          className={`flex flex-col items-center mt-6 transition-all duration-700 ${
            hasWiped ? "opacity-90 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C9AEC6]/60 to-transparent mb-3" />
          <p className="font-mono text-[11px] sm:text-[12px] tracking-[0.4em] text-[#C9AEC6] uppercase font-light">
            CUSTOM AUTOMATION SYSTEMS
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpartanIntro;
