"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Normalized target coordinates (-1 to 1) relative to center
  txNorm: number;
  tyNorm: number;
  // Canvas pixel target
  tx: number;
  ty: number;
  size: number;
  color: string;
  alpha: number;
  springSpeed: number;
  isGlyph: boolean;
  clusterIndex: number;
}

// Color palette
const COLORS = [
  "rgba(56, 189, 248, ", // Cyan-400
  "rgba(96, 165, 250, ", // Blue-400
  "rgba(147, 197, 253, ", // Blue-300
  "rgba(255, 255, 255, ", // Pure White
  "rgba(34, 211, 238, ", // Cyan-300
];

export function SpartanIntro() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [stageText, setStageText] = useState("SYSTEM INITIALIZING");
  const [telemetrySubtext, setTelemetrySubtext] = useState("0x00A1 // CORE_BUFFER_ALLOC");
  const [progressPercent, setProgressPercent] = useState(0);
  const [showWordmark, setShowWordmark] = useState(false);
  const [zoomFade, setZoomFade] = useState(false);

  // Audio Context reference
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Dismiss / Skip callback
  const handleDismiss = useCallback(() => {
    if (isDismissed) return;
    setIsDismissed(true);

    // Stop audio smoothly
    try {
      if (masterGainRef.current && audioContextRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.0001, audioContextRef.current.currentTime, 0.05);
      }
    } catch {
      // Ignore audio cleanup errors
    }

    // Allow CSS fade-out before unmounting
    setTimeout(() => {
      setIsUnmounted(true);
      document.body.style.overflow = "";
    }, 450);
  }, [isDismissed]);

  // Handle accessibility & body scroll lock
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsDismissed(true);
        setIsUnmounted(true);
        return;
      }
    }

    if (!isDismissed) {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDismissed, handleDismiss]);

  // Procedural Web Audio API Rising Boot Tone Synthesizer
  const initProceduralAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Sub-bass Drone Oscillator
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A
      subOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.3);
      subOsc.frequency.exponentialRampToValueAtTime(164.8, ctx.currentTime + 2.0); // E
      subGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.4);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();

      // 2. High-tech Resonant Filter Sweep (Cybernetic hum)
      const sawOsc = ctx.createOscillator();
      const biquad = ctx.createBiquadFilter();
      const sawGain = ctx.createGain();
      sawOsc.type = "sawtooth";
      sawOsc.frequency.setValueAtTime(110, ctx.currentTime);
      sawOsc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 2.0);

      biquad.type = "lowpass";
      biquad.Q.setValueAtTime(6, ctx.currentTime);
      biquad.frequency.setValueAtTime(180, ctx.currentTime);
      biquad.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 1.8);

      sawGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      sawGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.6);
      sawGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2.0);

      sawOsc.connect(biquad);
      biquad.connect(sawGain);
      sawGain.connect(masterGain);
      sawOsc.start();

      // Master fade-in
      masterGain.gain.exponentialRampToValueAtTime(0.8, ctx.currentTime + 0.8);

      // 3. Lock-in Chime / Glass Resonance at 2000ms ("SPARTAN ONLINE")
      setTimeout(() => {
        if (ctx.state === "closed") return;
        try {
          const chimeOsc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chimeOsc.type = "sine";
          chimeOsc.frequency.setValueAtTime(880, ctx.currentTime); // High A
          chimeOsc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.35);

          chimeGain.gain.setValueAtTime(0.25, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(masterGain);
          chimeOsc.start();
          chimeOsc.stop(ctx.currentTime + 0.65);
        } catch {
          // ignore
        }
      }, 2000);

      // Fade out audio before transition finishes
      masterGain.gain.setValueAtTime(0.8, ctx.currentTime + 2.2);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.7);

      // Cleanup oscillator nodes
      setTimeout(() => {
        try {
          subOsc.stop();
          sawOsc.stop();
          ctx.close();
        } catch {
          // ignore
        }
      }, 2900);
    } catch {
      // Audio autoplay policy might silently block; fail silently without affecting canvas
    }
  }, []);

  // Main Canvas Particle Animation Loop
  useEffect(() => {
    if (isDismissed || isUnmounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Start Audio
    initProceduralAudio();

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Target geometry generation: Angular Spartan "S" Insignia
    // Defined in normalized range [-100, 100]
    const targetPoints: Array<{ x: number; y: number; isGlyph: boolean; cluster: number }> = [];

    // Helper to sample line segment
    const sampleSegment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      count: number,
      jitter: number,
      cluster: number
    ) => {
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
        const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
        targetPoints.push({ x: px, y: py, isGlyph: true, cluster });
      }
    };

    // Helper to sample a ribbon / thick polygonal block
    const sampleRibbon = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      thickness: number,
      count: number,
      cluster: number
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const offset = (Math.random() - 0.5) * thickness;
        const px = x1 + dx * t + nx * offset;
        const py = y1 + dy * t + ny * offset;
        targetPoints.push({ x: px, y: py, isGlyph: true, cluster });
      }
    };

    // --- 1. THE ANGULAR SPARTAN "S" GLYPH VECTORS ---
    // Upper Segment:
    // Top Horizontal Bar: from (-42, -62) to (42, -62)
    sampleRibbon(-42, -62, 42, -62, 14, 105, 1);
    // Top-Left Hook / Serif: from (-42, -62) down to (-42, -36)
    sampleRibbon(-42, -62, -42, -36, 14, 55, 1);
    // Upper-Right Wall: from (42, -62) down to (42, -12)
    sampleRibbon(42, -62, 42, -12, 14, 75, 1);

    // Center Angular Spartan Bridge (Diagonal Cross):
    // From (42, -12) down-left to (-42, 12) with angular faceted cut
    sampleRibbon(42, -12, -42, 12, 16, 130, 2);

    // Lower Segment:
    // Lower-Left Wall: from (-42, 12) down to (-42, 62)
    sampleRibbon(-42, 12, -42, 62, 14, 75, 3);
    // Bottom Horizontal Bar: from (-42, 62) to (42, 62)
    sampleRibbon(-42, 62, 42, 62, 14, 105, 3);
    // Bottom-Right Hook / Serif: from (42, 62) up to (42, 36)
    sampleRibbon(42, 62, 42, 36, 14, 55, 3);

    // --- 2. SPARTAN CHEVRON ACCENTS (Flanking Crest & Brackets) ---
    // Left Angular Bracket Chevron: <
    sampleSegment(-68, -45, -84, 0, 36, 3, 4);
    sampleSegment(-84, 0, -68, 45, 36, 3, 4);

    // Right Angular Bracket Chevron: >
    sampleSegment(68, -45, 84, 0, 36, 3, 4);
    sampleSegment(84, 0, 68, 45, 36, 3, 4);

    // Top Crest Apex (Spartan Helmet Crest styling):
    sampleSegment(0, -82, -26, -64, 26, 2.5, 5);
    sampleSegment(0, -82, 26, -64, 26, 2.5, 5);

    // Bottom Inverted Apex Anchor:
    sampleSegment(0, 82, -26, 64, 26, 2.5, 5);
    sampleSegment(0, 82, 26, 64, 26, 2.5, 5);

    // Core Insignia Center Diamond Accent
    sampleSegment(0, -10, 8, 0, 10, 1.5, 6);
    sampleSegment(8, 0, 0, 10, 10, 1.5, 6);
    sampleSegment(0, 10, -8, 0, 10, 1.5, 6);
    sampleSegment(-8, 0, 0, -10, 10, 1.5, 6);

    const glyphTargetCount = targetPoints.length; // ~790 points

    // Total particle count: 960+ (960 total for ultra-high density & performance)
    const TOTAL_PARTICLES = 960;
    const particles: Particle[] = [];

    // Fill remaining particles as ambient orbital / constellation dust around the insignia
    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      let txNorm = 0;
      let tyNorm = 0;
      let isGlyph = false;
      let cluster = 0;

      if (i < glyphTargetCount) {
        txNorm = targetPoints[i].x / 100;
        tyNorm = targetPoints[i].y / 100;
        isGlyph = true;
        cluster = targetPoints[i].cluster;
      } else {
        // Ambient perimeter data ring / constellation field
        const angle = Math.random() * Math.PI * 2;
        const dist = 1.15 + Math.random() * 0.75;
        txNorm = Math.cos(angle) * dist;
        tyNorm = Math.sin(angle) * dist * 0.85;
        isGlyph = false;
        cluster = 9;
      }

      const colorPrefix = COLORS[i % COLORS.length];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        txNorm,
        tyNorm,
        tx: 0,
        ty: 0,
        size: isGlyph ? 1.4 + Math.random() * 1.6 : 1.0 + Math.random() * 1.2,
        color: colorPrefix,
        alpha: 0.35 + Math.random() * 0.6,
        springSpeed: 0.055 + Math.random() * 0.065,
        isGlyph,
        clusterIndex: cluster,
      });
    }

    // Function to resize canvas with Retina display resolution
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      // Glyph scale based on screen size (responsive, sharp bounding box)
      const glyphScale = Math.min(width * 0.38, height * 0.44, 280);
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.tx = centerX + p.txNorm * glyphScale;
        p.ty = centerY + p.tyNorm * glyphScale;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const startTime = performance.now();
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    // Fast cubic easing helper
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Update HUD telemetry and timeline state
      const progress = Math.min(elapsed / 2500, 1);
      setProgressPercent(Math.floor(progress * 100));

      if (elapsed < 600) {
        setStageText("SYSTEM INITIALIZING");
        setTelemetrySubtext(`0x${(elapsed * 13).toString(16).slice(0, 4).toUpperCase()} // DATA_ARRAY_INIT [960]`);
      } else if (elapsed < 1300) {
        setStageText("NETWORK CONNECTING");
        setTelemetrySubtext(`SYNC_NODES // TOPOLOGY_RESOLVE: ${Math.floor(progress * 960)} / 960`);
      } else if (elapsed < 2000) {
        setStageText("WORKFLOW DETECTED");
        setTelemetrySubtext(`VECTOR_LOCK // ANCHORING_SPARTAN_INSIGNIA`);
      } else {
        setStageText("SPARTAN ONLINE");
        setTelemetrySubtext("CORE_ACTIVE // AUTONOMOUS_SYSTEM_READY");
      }

      // Wordmark trigger at 2000ms
      if (elapsed >= 2000 && !showWordmark) {
        setShowWordmark(true);
      }

      // Camera Zoom & Fade Trigger at 2500ms
      if (elapsed >= 2500 && !zoomFade) {
        setZoomFade(true);
      }

      // Automatically complete and dissolve into main app at 3000ms
      if (elapsed >= 3000) {
        handleDismiss();
        return;
      }

      // Clear Canvas Void
      ctx.clearRect(0, 0, width, height);

      // Deep Void Dark Background Fill with subtle atmospheric vignette
      ctx.fillStyle = "#03060a";
      ctx.fillRect(0, 0, width, height);

      // Phase calculations
      // Phase 1: DATA (0ms - 600ms)
      // Phase 2: CONNECTION (600ms - 1300ms)
      // Phase 3: STRUCTURE (1300ms - 2000ms)
      // Phase 4: SPARTAN LOCK (2000ms - 2500ms)
      // Phase 5: ZOOM / FADE (2500ms - 3000ms)

      const isConnecting = elapsed >= 600;
      const isStructuring = elapsed >= 1300;
      const isSpartanLocked = elapsed >= 2000;

      // Interpolation factors
      const connProgress = isConnecting ? Math.min((elapsed - 600) / 700, 1) : 0;
      const structProgress = isStructuring ? Math.min((elapsed - 1300) / 700, 1) : 0;
      const easedStruct = easeInOutCubic(structProgress);

      // Draw Connections Phase (600ms+)
      if (isConnecting && connProgress > 0) {
        const lineMaxDist = 58;
        const baseLineAlpha = isStructuring
          ? Math.max(0.12, 0.45 * (1 - structProgress * 0.75))
          : 0.38 * connProgress;

        ctx.lineWidth = 0.85;

        // Optimized neighbor line checking with spatial stride to maintain 60 FPS
        const step = isStructuring ? 2 : 1;
        for (let i = 0; i < particles.length; i += step) {
          const p1 = particles[i];
          // Check nearby particles in array
          const checkLimit = Math.min(i + 24, particles.length);

          for (let j = i + 1; j < checkLimit; j++) {
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);

            if (dist < lineMaxDist) {
              const alpha = (1 - dist / lineMaxDist) * baseLineAlpha;
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Shockwave ring pulse at 2000ms lock-in
      if (isSpartanLocked) {
        if (shockwaveRadius === 0) {
          shockwaveRadius = 15;
          shockwaveAlpha = 0.85;
        }
        shockwaveRadius += 6.5;
        shockwaveAlpha *= 0.94;

        if (shockwaveAlpha > 0.01) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${shockwaveAlpha})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, shockwaveRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Secondary harmonic ring
          ctx.strokeStyle = `rgba(147, 197, 253, ${shockwaveAlpha * 0.5})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, shockwaveRadius * 0.75, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isStructuring) {
          // Phase 0 - 1300ms: Random drift in dark void
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        } else {
          // Phase 1300ms+: Spring physics towards predefined vector target coordinates
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;

          // Spring pull with dampening
          const pull = p.springSpeed * (1 + easedStruct * 2.4);
          p.x += dx * pull;
          p.y += dy * pull;

          // Subtle harmonic vibration on locked glyph particles for energy hum
          if (isSpartanLocked && p.isGlyph) {
            p.x += (Math.random() - 0.5) * 0.4;
            p.y += (Math.random() - 0.5) * 0.4;
          }
        }

        // Particle Glow & Drawing
        const currentAlpha = isSpartanLocked && p.isGlyph
          ? Math.min(1.0, p.alpha * 1.35)
          : p.alpha;

        const currentSize = isSpartanLocked && p.isGlyph
          ? p.size * 1.2
          : p.size;

        // Draw particle core
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // High-energy glow for locked glyph particles
        if (isSpartanLocked && p.isGlyph && (i % 4 === 0)) {
          ctx.fillStyle = `rgba(56, 189, 248, 0.22)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ambient Central Holographic Core Glow at 2000ms+
      if (isSpartanLocked) {
        const glowGradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          10,
          width / 2,
          height / 2,
          Math.min(width * 0.28, 220)
        );
        glowGradient.addColorStop(0, "rgba(56, 189, 248, 0.16)");
        glowGradient.addColorStop(0.5, "rgba(37, 99, 235, 0.08)");
        glowGradient.addColorStop(1, "rgba(3, 6, 10, 0)");

        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDismissed, isUnmounted, handleDismiss, initProceduralAudio, showWordmark, zoomFade]);

  if (isUnmounted) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between select-none cursor-pointer overflow-hidden bg-[#03060a] transition-all duration-500 ease-out ${
        zoomFade ? "opacity-0 scale-[1.08] pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-label="Spartan Boot Sequence - Click or press Escape to skip"
    >
      {/* Dynamic Fullscreen HTML5 Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* TOP TELEMETRY TERMINAL HUD */}
      <header className="relative z-20 w-full max-w-6xl mx-auto pt-6 sm:pt-8 px-5 sm:px-8 flex items-center justify-between pointer-events-none font-mono text-xs">
        {/* Left Telemetry Box */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-cyan-500/20 px-3.5 py-2 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.12)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#38bdf8]" />
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold tracking-wider">{stageText}</span>
              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-400/80 tracking-tight">{telemetrySubtext}</span>
          </div>
        </div>

        {/* Right Telemetry Progress */}
        <div className="hidden sm:flex items-center gap-4 bg-black/40 backdrop-blur-md border border-cyan-500/20 px-3.5 py-2 rounded-md">
          <div className="flex flex-col items-end text-[10px] text-slate-400">
            <span>SEQUENCE LATENCY: 0.8ms</span>
            <span className="text-cyan-300 font-bold">FPS: 60.0 // HIGH-DPI</span>
          </div>
          <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-out shadow-[0_0_8px_#38bdf8]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-cyan-400 font-bold text-[11px] w-8 text-right">
            {progressPercent}%
          </span>
        </div>
      </header>

      {/* CENTER REVEAL WORDMARK (Unlocks at 2000ms) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto pointer-events-none">
        <div
          className={`transition-all duration-700 ease-out transform ${
            showWordmark
              ? "opacity-100 translate-y-0 scale-100 filter-none"
              : "opacity-0 translate-y-4 scale-95 blur-md"
          }`}
        >
          {/* Subtle Spartan Crest / Wordmark Lockup */}
          <div className="relative inline-block mt-36 sm:mt-44">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.24em] text-white uppercase font-sans drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
              SPARTAN
            </h1>

            {/* Specular Horizontal Laser Dividers */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] text-cyan-300 uppercase">
                Workflow Automation
              </span>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION TELEMETRY & SKIP PROMPT */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto pb-6 sm:pb-8 px-5 sm:px-8 flex items-center justify-between pointer-events-none font-mono text-[10px] text-slate-500">
        <div className="hidden sm:flex items-center gap-2 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
          <span>BOOT PROTOCOL // 2.5s ASSEMBLY</span>
        </div>

        {/* Skip Prompt */}
        <div className="ml-auto flex items-center gap-2 bg-slate-900/60 border border-slate-700/40 px-3 py-1.5 rounded-full text-slate-400 tracking-wider text-[9px] sm:text-[10px] uppercase shadow-sm">
          <span>CLICK ANYWHERE TO BYPASS</span>
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-600 rounded text-cyan-400 text-[8px] font-semibold">
            ESC
          </kbd>
        </div>
      </footer>
    </div>
  );
}
