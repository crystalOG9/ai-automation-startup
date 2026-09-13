"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  fluidVx: number; // For fluid wake & liquid ripple displacement
  fluidVy: number;
  z: number; // 0.35 = far, 0.7 = mid, 1.0 = near
  radius: number;
  isAccent: boolean; // ~8% SPARTAN red
  baseAlpha: number;
  clusterBiasAngle: number;
  clusterSpeed: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

export function DynamicSystemField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track DPR capped at 1.75 for retina performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Adaptive particle count based on screen width (high-density technological field)
    const getParticleCount = () => {
      if (width < 768) return 130; // mobile
      if (width < 1200) return 225; // tablet
      return 350; // enterprise desktop
    };

    let particleCount = getParticleCount();
    let maxDistance = width < 768 ? 72 : 102;

    // Initialize particles with organic drift, fluid vectors & 3 depth tiers
    let particles: Particle[] = [];
    const initParticles = () => {
      particleCount = getParticleCount();
      maxDistance = width < 768 ? 72 : 102;
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        // Depth tier: 30% far, 50% mid, 20% near
        const randZ = Math.random();
        const z = randZ < 0.3 ? 0.4 : randZ < 0.8 ? 0.7 : 1.0;

        // Base velocity: very slow organic wander (0.12 - 0.28 px/frame)
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.13 + Math.random() * 0.15) * (0.65 + z * 0.35);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // ~8% SPARTAN red accent nodes
        const isAccent = Math.random() < 0.085;

        // Base radius: 0.8px - 1.6px depending on depth
        const radius = (0.85 + Math.random() * 0.65) * (0.6 + z * 0.4);

        // Alpha restrained: 0.15 - 0.50
        const baseAlpha = isAccent
          ? 0.45 + z * 0.35
          : 0.18 + z * 0.26;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          fluidVx: 0,
          fluidVy: 0,
          z,
          radius,
          isAccent,
          baseAlpha,
          clusterBiasAngle: Math.random() * Math.PI * 2,
          clusterSpeed: 0.0003 + Math.random() * 0.0004,
        });
      }
    };

    initParticles();

    // Data Pulses Traveling along Active Edges
    let pulses: Pulse[] = [];
    let lastPulseSpawn = 0;

    // Water Ripples System (creates gentle fluid ripples across the field)
    let ripples: WaterRipple[] = [];
    let lastRippleTime = 0;
    let lastRippleX = -1000;
    let lastRippleY = -1000;

    // Scroll Dynamics & Velocity Tracking
    let lastScrollY = window.scrollY;
    let scrollImpulseY = 0;
    let scrollKineticEnergy = 0;
    let lastScrollTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 8);
      const deltaY = currentScrollY - lastScrollY;

      // Scroll speed in px/ms
      const speed = Math.abs(deltaY) / dt;

      // Directional impulse (subtle drag effect)
      const impulse = (deltaY / dt) * 1.8;
      scrollImpulseY = Math.max(-5, Math.min(5, scrollImpulseY * 0.7 + impulse * 0.3));

      // Kinetic energy burst (capped to keep movement restrained)
      const energy = Math.min(speed * 1.6, 2.2);
      scrollKineticEnergy = Math.max(scrollKineticEnergy, energy);

      lastScrollY = currentScrollY;
      lastScrollTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Subtle Mouse Parallax & Liquid Water Wake Tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;

    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.5;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn subtle water ripple when cursor glides across the field
      const distFromLast = Math.hypot(mouseX - lastRippleX, mouseY - lastRippleY);
      const now = performance.now();
      if (distFromLast > 45 && now - lastRippleTime > 120 && ripples.length < 5) {
        ripples.push({
          x: mouseX,
          y: mouseY,
          radius: 4,
          maxRadius: 135 + Math.random() * 25,
          strength: 0.85,
          speed: 2.2 + Math.random() * 0.5,
        });
        lastRippleX = mouseX;
        lastRippleY = mouseY;
        lastRippleTime = now;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (ripples.length < 6) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 4,
          maxRadius: 180,
          strength: 1.5,
          speed: 2.6,
        });
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      prevMouseX = -1000;
      prevMouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Section Awareness Engine
    interface SectionProfile {
      speedFactor: number;
      connectivity: number;
      pulseIntervalMs: number;
    }

    const SECTION_PROFILES: Record<string, SectionProfile> = {
      hero: { speedFactor: 1.0, connectivity: 1.0, pulseIntervalMs: 4200 },
      problem: { speedFactor: 1.15, connectivity: 0.72, pulseIntervalMs: 5000 },
      differentiator: { speedFactor: 0.95, connectivity: 1.3, pulseIntervalMs: 3500 },
      "core-message": { speedFactor: 0.9, connectivity: 1.2, pulseIntervalMs: 3800 },
      "how-it-works": { speedFactor: 1.05, connectivity: 1.15, pulseIntervalMs: 3200 },
      "workflow-demo": { speedFactor: 1.25, connectivity: 1.2, pulseIntervalMs: 1800 },
      solutions: { speedFactor: 1.0, connectivity: 1.1, pulseIntervalMs: 3600 },
      industries: { speedFactor: 0.95, connectivity: 1.05, pulseIntervalMs: 4000 },
      "human-in-the-loop": { speedFactor: 0.38, connectivity: 1.25, pulseIntervalMs: 8000 }, // Deliberate calm gatekeeper pause
      roi: { speedFactor: 0.85, connectivity: 1.25, pulseIntervalMs: 4200 },
      "why-us": { speedFactor: 0.85, connectivity: 1.2, pulseIntervalMs: 4500 },
      contact: { speedFactor: 0.85, connectivity: 1.2, pulseIntervalMs: 4500 },
    };

    let activeSectionKey = "hero";
    let currentSpeedFactor = 1.0;
    let currentConnectivity = 1.0;
    let currentPulseInterval = 4200;

    // Workflow Demo Interactive Integration
    let demoSpeedOverride = 1.0;
    let demoPulseBurst = 0;

    const handleDemoState = (e: Event) => {
      const detail = (e as CustomEvent<{ stage: number; isExecuting: boolean }>).detail;
      if (!detail) return;

      if (detail.stage === 3) {
        // Stage 04 / Human Review Gate: background activity drops significantly into a holding pattern
        demoSpeedOverride = 0.28;
      } else if (detail.isExecuting || detail.stage === 4) {
        // Execution: energetic, controlled pulse wave
        demoSpeedOverride = 1.4;
        demoPulseBurst = 4;
      } else if (detail.stage === 1 || detail.stage === 2) {
        // AI Understanding & System Check: small active data signals
        demoSpeedOverride = 1.15;
        demoPulseBurst = 2;
      } else {
        demoSpeedOverride = 1.0;
      }
    };

    window.addEventListener("spartan-demo-state", handleDemoState);

    // Update section awareness by checking scroll position against page anchors
    const updateActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sectionIds = [
        "contact",
        "why-us",
        "roi",
        "human-in-the-loop",
        "industries",
        "solutions",
        "workflow-demo",
        "how-it-works",
        "core-message",
        "differentiator",
        "problem",
        "hero",
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          activeSectionKey = id;
          break;
        }
      }
    };

    // Main Simulation Loop
    let lastFrameTime = performance.now();
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Reduced motion static render helper
    const renderStaticField = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connection links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * 0.08 * Math.min(p1.z, p2.z);
            ctx.beginPath();
            ctx.strokeStyle = p1.isAccent || p2.isAccent
              ? `rgba(225, 29, 72, ${alpha * 0.7})`
              : `rgba(240, 245, 255, ${alpha * 0.45})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle static dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent
          ? `rgba(225, 29, 72, ${p.baseAlpha})`
          : `rgba(240, 245, 255, ${p.baseAlpha})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      renderStaticField();
      return () => {
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("spartan-demo-state", handleDemoState);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    const render = (time: number) => {
      const dt = Math.min((time - lastFrameTime) / 16.667, 2.5);
      lastFrameTime = time;

      // Periodically update active section (every ~200ms)
      if (Math.floor(time / 200) !== Math.floor((time - 16) / 200)) {
        updateActiveSection();
      }

      // Smoothly interpolate section profile parameters
      const targetProfile = SECTION_PROFILES[activeSectionKey] || SECTION_PROFILES.hero;
      currentSpeedFactor += (targetProfile.speedFactor * demoSpeedOverride - currentSpeedFactor) * 0.05 * dt;
      currentConnectivity += (targetProfile.connectivity - currentConnectivity) * 0.05 * dt;
      currentPulseInterval = targetProfile.pulseIntervalMs;

      // Decay scroll impulses smoothly
      scrollImpulseY *= Math.pow(0.91, dt);
      scrollKineticEnergy *= Math.pow(0.92, dt);

      // Smooth mouse parallax lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04 * dt;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04 * dt;
      const mouseParallaxX = ((currentMouseX - width * 0.5) / width) * 14;
      const mouseParallaxY = ((currentMouseY - height * 0.5) / height) * 14;

      // Update cursor physical velocity for fluid wake
      if (prevMouseX !== -1000 && mouseX !== -1000) {
        mouseVx = (mouseX - prevMouseX) * 0.3;
        mouseVy = (mouseY - prevMouseY) * 0.3;
      } else {
        mouseVx = 0;
        mouseVy = 0;
      }
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw & Propagate Expanding Water Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed * dt;

        if (rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        const progress = rip.radius / rip.maxRadius;
        const ripAlpha = (1 - progress) * 0.055 * rip.strength;

        // Faint concentric aquatic ripple wave ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(225, 29, 72, ${ripAlpha * 0.65})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Secondary soft inner ripple
        if (rip.radius > 16) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, Math.max(0, rip.radius - 14), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(240, 245, 255, ${ripAlpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 2. Update Particle Positions with Fluid Watering & Systemic Physics
      const globalSpeed = (1.0 + scrollKineticEnergy * 0.85) * currentSpeedFactor;
      const mouseWakeRadius = 125;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // A) Direct fluid wake around moving cursor (watering bow wave)
        if (mouseX !== -1000) {
          const dxMouse = p.x - mouseX;
          const dyMouse = p.y - mouseY;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (distMouseSq < mouseWakeRadius * mouseWakeRadius && distMouseSq > 0.1) {
            const distMouse = Math.sqrt(distMouseSq);
            const norm = 1 - distMouse / mouseWakeRadius;
            // Fluid repulsion & wake drag
            const force = norm * norm * 1.5 * p.z;
            const angle = Math.atan2(dyMouse, dxMouse);
            p.fluidVx += (Math.cos(angle) * force + mouseVx * norm * 0.35) * dt;
            p.fluidVy += (Math.sin(angle) * force + mouseVy * norm * 0.35) * dt;
          }
        }

        // B) Dynamic Water Ripple wavefront interaction
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const dxRip = p.x - rip.x;
          const dyRip = p.y - rip.y;
          const distRip = Math.hypot(dxRip, dyRip);
          const distFromCrest = Math.abs(distRip - rip.radius);

          if (distFromCrest < 30) {
            const wavePhase = (1 - distFromCrest / 30) * (1 - rip.radius / rip.maxRadius) * rip.strength;
            const waveAngle = Math.atan2(dyRip, dxRip);
            const push = Math.sin(distFromCrest * 0.22) * wavePhase * 1.35 * p.z;
            p.fluidVx += Math.cos(waveAngle) * push * dt;
            p.fluidVy += Math.sin(waveAngle) * push * dt;
          }
        }

        // C) Viscous fluid damping (restores calm organically like water settling)
        p.fluidVx *= Math.pow(0.88, dt);
        p.fluidVy *= Math.pow(0.88, dt);

        // Systemic flow field modulation: subtle rotational coordinate bias
        p.clusterBiasAngle += p.clusterSpeed * dt;
        const systemicDriftX = Math.cos(p.clusterBiasAngle) * 0.08;
        const systemicDriftY = Math.sin(p.clusterBiasAngle) * 0.08;

        // Apply natural drift + scroll impulse + fluid wake velocities
        p.x += (p.baseVx * globalSpeed + systemicDriftX + p.fluidVx) * dt;
        p.y += (p.baseVy * globalSpeed + systemicDriftY + scrollImpulseY * p.z * 0.35 + p.fluidVy) * dt;

        // Wrap around bounds with smooth padding
        const pad = 24;
        if (p.x < -pad) p.x = width + pad;
        else if (p.x > width + pad) p.x = -pad;

        if (p.y < -pad) p.y = height + pad;
        else if (p.y > height + pad) p.y = -pad;
      }

      // 3. Draw Network Connection Links
      const activeEdges: { p1Idx: number; p2Idx: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const p1DrawX = p1.x + mouseParallaxX * p1.z;
        const p1DrawY = p1.y + mouseParallaxY * p1.z;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const normDist = dist / maxDistance;
            const alpha = (1 - normDist) * 0.08 * currentConnectivity * Math.min(p1.z, p2.z);

            if (alpha > 0.008) {
              const p2DrawX = p2.x + mouseParallaxX * p2.z;
              const p2DrawY = p2.y + mouseParallaxY * p2.z;

              ctx.beginPath();
              ctx.lineWidth = 0.48;

              if (p1.isAccent || p2.isAccent) {
                ctx.strokeStyle = `rgba(225, 29, 72, ${alpha * 0.85})`;
              } else {
                ctx.strokeStyle = `rgba(240, 245, 255, ${alpha * 0.48})`;
              }

              ctx.moveTo(p1DrawX, p1DrawY);
              ctx.lineTo(p2DrawX, p2DrawY);
              ctx.stroke();

              // Register edge as candidate for data pulses
              if (activeEdges.length < 60) {
                activeEdges.push({ p1Idx: i, p2Idx: j });
              }
            }
          }
        }
      }

      // 4. Spawn & Manage Data Pulses
      const shouldSpawnPulse =
        activeEdges.length > 0 &&
        (time - lastPulseSpawn > currentPulseInterval || demoPulseBurst > 0);

      if (shouldSpawnPulse && pulses.length < 6) {
        const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        pulses.push({
          fromIdx: edge.p1Idx,
          toIdx: edge.p2Idx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.012,
          color: "rgba(225, 29, 72, 0.85)", // Controlled SPARTAN Red
        });
        lastPulseSpawn = time;
        if (demoPulseBurst > 0) demoPulseBurst--;
      }

      // Render Active Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * globalSpeed * dt;

        if (pulse.progress >= 1.0) {
          pulses.splice(i, 1);
          continue;
        }

        const pFrom = particles[pulse.fromIdx];
        const pTo = particles[pulse.toIdx];

        if (!pFrom || !pTo) {
          pulses.splice(i, 1);
          continue;
        }

        const fromX = pFrom.x + mouseParallaxX * pFrom.z;
        const fromY = pFrom.y + mouseParallaxY * pFrom.z;
        const toX = pTo.x + mouseParallaxX * pTo.z;
        const toY = pTo.y + mouseParallaxY * pTo.z;

        const pulseX = fromX + (toX - fromX) * pulse.progress;
        const pulseY = fromY + (toY - fromY) * pulse.progress;

        // Subtle glowing data pulse node
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.85;

        // Small specular center
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha * 0.9})`;
        ctx.fill();

        // Outer red packet glow
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${pulseAlpha * 0.4})`;
        ctx.fill();
      }

      // 5. Draw Network Nodes (Particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drawX = p.x + mouseParallaxX * p.z;
        const drawY = p.y + mouseParallaxY * p.z;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);

        if (p.isAccent) {
          // SPARTAN Red Accent Node
          ctx.fillStyle = `rgba(225, 29, 72, ${p.baseAlpha})`;
          ctx.fill();

          // Delicate specular halo for red nodes
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 29, 72, ${p.baseAlpha * 0.18})`;
          ctx.fill();
        } else {
          // Subtle Cool White / Graphite Node
          ctx.fillStyle = `rgba(240, 245, 255, ${p.baseAlpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResizeDebounced = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResizeDebounced);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResizeDebounced);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("spartan-demo-state", handleDemoState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
    />
  );
}
