"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  fluidVx: number;
  fluidVy: number;
  z: number;
  radius: number;
  isAccent: boolean;
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
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic tiered DPR: Mobile/Laptop = 1.0; Desktop = 1.25
    const getDpr = () => {
      const w = window.innerWidth;
      if (w < 1200 || isTouchDevice) return 1.0;
      return Math.min(window.devicePixelRatio || 1, 1.25);
    };

    let dpr = getDpr();

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = getDpr();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // High-efficiency particle counts:
    // Mobile: 38 (clean, fast, zero lag on phones)
    // Laptop: 75 (silky smooth on integrated GPUs)
    // Desktop: 130 (rich technological aesthetic, avoids O(N^2) CPU thrashing)
    const getParticleCount = () => {
      if (width < 768) return 38;
      if (width < 1200) return 75;
      return 130;
    };

    const getMaxDistance = () => (width < 768 ? 64 : width < 1200 ? 84 : 100);
    const getMaxEdges = () => (width < 768 ? 16 : width < 1200 ? 40 : 65);

    let particleCount = getParticleCount();
    let maxDistance = getMaxDistance();
    let maxEdges = getMaxEdges();

    let particles: Particle[] = [];
    const initParticles = () => {
      particleCount = getParticleCount();
      maxDistance = getMaxDistance();
      maxEdges = getMaxEdges();
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const randZ = Math.random();
        const z = randZ < 0.3 ? 0.4 : randZ < 0.8 ? 0.7 : 1.0;

        const angle = Math.random() * Math.PI * 2;
        const speed = (0.12 + Math.random() * 0.14) * (0.65 + z * 0.35);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const isAccent = Math.random() < 0.085;
        const radius = (0.85 + Math.random() * 0.6) * (0.6 + z * 0.4);

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

    // Data Pulses
    let pulses: Pulse[] = [];
    let lastPulseSpawn = 0;

    // Water Ripples (Desktop only, capped at 3)
    let ripples: WaterRipple[] = [];
    let lastRippleTime = 0;
    let lastRippleX = -1000;
    let lastRippleY = -1000;

    // Scroll tracking with low-frequency update
    let lastScrollY = window.scrollY;
    let scrollImpulseY = 0;
    let scrollKineticEnergy = 0;
    let lastScrollTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 16);
      const deltaY = currentScrollY - lastScrollY;

      const impulse = (deltaY / dt) * 1.4;
      scrollImpulseY = Math.max(-4, Math.min(4, scrollImpulseY * 0.7 + impulse * 0.3));

      const speed = Math.abs(deltaY) / dt;
      scrollKineticEnergy = Math.max(scrollKineticEnergy, Math.min(speed * 1.2, 1.8));

      lastScrollY = currentScrollY;
      lastScrollTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse tracking (disabled on touch devices)
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
      if (isTouchDevice) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const distFromLast = Math.hypot(mouseX - lastRippleX, mouseY - lastRippleY);
      const now = performance.now();
      if (distFromLast > 55 && now - lastRippleTime > 160 && ripples.length < 3) {
        ripples.push({
          x: mouseX,
          y: mouseY,
          radius: 4,
          maxRadius: 110,
          strength: 0.65,
          speed: 2.0,
        });
        lastRippleX = mouseX;
        lastRippleY = mouseY;
        lastRippleTime = now;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (isTouchDevice || ripples.length >= 3) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 140,
        strength: 0.9,
        speed: 2.4,
      });
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      prevMouseX = -1000;
      prevMouseY = -1000;
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Section awareness profile
    interface SectionProfile {
      speedFactor: number;
      connectivity: number;
      pulseIntervalMs: number;
    }

    const SECTION_PROFILES: Record<string, SectionProfile> = {
      hero: { speedFactor: 1.0, connectivity: 1.0, pulseIntervalMs: 4200 },
      problem: { speedFactor: 1.1, connectivity: 0.8, pulseIntervalMs: 5000 },
      differentiator: { speedFactor: 0.95, connectivity: 1.1, pulseIntervalMs: 3800 },
      "workflow-demo": { speedFactor: 1.2, connectivity: 1.1, pulseIntervalMs: 2200 },
      "human-in-the-loop": { speedFactor: 0.45, connectivity: 1.2, pulseIntervalMs: 7000 },
    };

    let activeSectionKey = "hero";
    let currentSpeedFactor = 1.0;
    let currentConnectivity = 1.0;
    let currentPulseInterval = 4200;

    // Workflow Demo State Integration
    let demoSpeedOverride = 1.0;
    let demoPulseBurst = 0;

    const handleDemoState = (e: Event) => {
      const detail = (e as CustomEvent<{ stage: number; isExecuting: boolean }>).detail;
      if (!detail) return;

      if (detail.stage === 3) {
        demoSpeedOverride = 0.35;
      } else if (detail.isExecuting || detail.stage === 4) {
        demoSpeedOverride = 1.3;
        demoPulseBurst = 2;
      } else {
        demoSpeedOverride = 1.0;
      }
    };

    window.addEventListener("spartan-demo-state", handleDemoState);

    // Section detection throttled
    let lastSectionCheck = 0;
    const updateActiveSection = (now: number) => {
      if (now - lastSectionCheck < 350) return;
      lastSectionCheck = now;

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sectionIds = ["contact", "human-in-the-loop", "workflow-demo", "differentiator", "problem", "hero"];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          activeSectionKey = id;
          break;
        }
      }
    };

    // Reduced motion static render
    const renderStaticField = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connection links (batched)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(240, 245, 255, 0.05)";
      ctx.lineWidth = 0.5;

      const maxD = maxDistance * 0.85;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          if (Math.abs(dx) > maxD || Math.abs(dy) > maxD) continue;
          if (dx * dx + dy * dy < maxD * maxD) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // Draw dots
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
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("spartan-demo-state", handleDemoState);
      };
    }

    // Main Simulation Loop with Tab Visibility Pausing
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

    const render = (time: number) => {
      if (!isTabVisible) return;

      const dt = Math.min((time - lastFrameTime) / 16.667, 2.2);
      lastFrameTime = time;

      updateActiveSection(time);

      const targetProfile = SECTION_PROFILES[activeSectionKey] || SECTION_PROFILES.hero;
      currentSpeedFactor += (targetProfile.speedFactor * demoSpeedOverride - currentSpeedFactor) * 0.05 * dt;
      currentConnectivity += (targetProfile.connectivity - currentConnectivity) * 0.05 * dt;
      currentPulseInterval = targetProfile.pulseIntervalMs;

      scrollImpulseY *= Math.pow(0.91, dt);
      scrollKineticEnergy *= Math.pow(0.92, dt);

      // Smooth mouse parallax lerp (desktop only)
      let mouseParallaxX = 0;
      let mouseParallaxY = 0;

      if (!isTouchDevice) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.04 * dt;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04 * dt;
        mouseParallaxX = ((currentMouseX - width * 0.5) / width) * 12;
        mouseParallaxY = ((currentMouseY - height * 0.5) / height) * 12;

        if (prevMouseX !== -1000 && mouseX !== -1000) {
          mouseVx = (mouseX - prevMouseX) * 0.25;
          mouseVy = (mouseY - prevMouseY) * 0.25;
        } else {
          mouseVx = 0;
          mouseVy = 0;
        }
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Water Ripples (Desktop only)
      if (!isTouchDevice && ripples.length > 0) {
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += rip.speed * dt;

          if (rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          const progress = rip.radius / rip.maxRadius;
          const ripAlpha = (1 - progress) * 0.04 * rip.strength;

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(225, 29, 72, ${ripAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // 2. Update Particle Positions
      const globalSpeed = (1.0 + scrollKineticEnergy * 0.7) * currentSpeedFactor;
      const mouseWakeRadius = 110;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor wake (desktop only)
        if (!isTouchDevice && mouseX !== -1000) {
          const dxMouse = p.x - mouseX;
          const dyMouse = p.y - mouseY;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (distMouseSq < mouseWakeRadius * mouseWakeRadius && distMouseSq > 0.1) {
            const distMouse = Math.sqrt(distMouseSq);
            const norm = 1 - distMouse / mouseWakeRadius;
            const force = norm * norm * 1.2 * p.z;
            const angle = Math.atan2(dyMouse, dxMouse);
            p.fluidVx += (Math.cos(angle) * force + mouseVx * norm * 0.25) * dt;
            p.fluidVy += (Math.sin(angle) * force + mouseVy * norm * 0.25) * dt;
          }
        }

        p.fluidVx *= Math.pow(0.88, dt);
        p.fluidVy *= Math.pow(0.88, dt);

        p.clusterBiasAngle += p.clusterSpeed * dt;
        const systemicDriftX = Math.cos(p.clusterBiasAngle) * 0.07;
        const systemicDriftY = Math.sin(p.clusterBiasAngle) * 0.07;

        p.x += (p.baseVx * globalSpeed + systemicDriftX + p.fluidVx) * dt;
        p.y += (p.baseVy * globalSpeed + systemicDriftY + scrollImpulseY * p.z * 0.3 + p.fluidVy) * dt;

        const pad = 20;
        if (p.x < -pad) p.x = width + pad;
        else if (p.x > width + pad) p.x = -pad;

        if (p.y < -pad) p.y = height + pad;
        else if (p.y > height + pad) p.y = -pad;
      }

      // 3. Batched Network Connection Lines (High Performance)
      const activeEdges: { p1Idx: number; p2Idx: number }[] = [];
      let edgesDrawn = 0;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(240, 245, 255, 0.045)";
      ctx.lineWidth = 0.45;

      const maxDistSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        if (edgesDrawn >= maxEdges) break;
        const p1 = particles[i];
        const p1DrawX = p1.x + mouseParallaxX * p1.z;
        const p1DrawY = p1.y + mouseParallaxY * p1.z;

        for (let j = i + 1; j < particles.length; j++) {
          if (edgesDrawn >= maxEdges) break;
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          // Fast bounding box reject before multiplication
          if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const p2DrawX = p2.x + mouseParallaxX * p2.z;
            const p2DrawY = p2.y + mouseParallaxY * p2.z;

            ctx.moveTo(p1DrawX, p1DrawY);
            ctx.lineTo(p2DrawX, p2DrawY);
            edgesDrawn++;

            if (activeEdges.length < 30) {
              activeEdges.push({ p1Idx: i, p2Idx: j });
            }
          }
        }
      }
      ctx.stroke();

      // 4. Data Pulses
      const shouldSpawnPulse =
        activeEdges.length > 0 &&
        (time - lastPulseSpawn > currentPulseInterval || demoPulseBurst > 0);

      if (shouldSpawnPulse && pulses.length < 4) {
        const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        pulses.push({
          fromIdx: edge.p1Idx,
          toIdx: edge.p2Idx,
          progress: 0,
          speed: 0.016 + Math.random() * 0.01,
          color: "rgba(225, 29, 72, 0.85)",
        });
        lastPulseSpawn = time;
        if (demoPulseBurst > 0) demoPulseBurst--;
      }

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
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.8;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha})`;
        ctx.fill();
      }

      // 5. Batched Network Nodes
      // Normal nodes batch
      ctx.beginPath();
      ctx.fillStyle = "rgba(240, 245, 255, 0.28)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isAccent) {
          const drawX = p.x + mouseParallaxX * p.z;
          const drawY = p.y + mouseParallaxY * p.z;
          ctx.moveTo(drawX + p.radius, drawY);
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Accent red nodes batch
      ctx.beginPath();
      ctx.fillStyle = "rgba(225, 29, 72, 0.75)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isAccent) {
          const drawX = p.x + mouseParallaxX * p.z;
          const drawY = p.y + mouseParallaxY * p.z;
          ctx.moveTo(drawX + p.radius, drawY);
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    let resizeTimer: NodeJS.Timeout;
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 150);
    };

    window.addEventListener("resize", handleResizeDebounced);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResizeDebounced);
      window.removeEventListener("scroll", handleScroll);
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
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
