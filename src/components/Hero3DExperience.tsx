"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import { Hero3DFallback } from "./Hero3DFallback";
import {
  Mail,
  Building2,
  FileSpreadsheet,
  Database,
  ShoppingBag,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
} from "lucide-react";

interface WorkflowNode {
  id: string;
  name: string;
  category: "input" | "core" | "human" | "execute";
  pos: [number, number, number];
  sublabel: string;
  detail: string;
  badge: string;
  color: string;
  hexColor: number;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NODES_DATA: WorkflowNode[] = [
  {
    id: "email",
    name: "EMAIL",
    category: "input",
    pos: [-3.2, 1.8, 0.4],
    sublabel: "Quotes, inquiries & tickets",
    detail: "Parses unstructured customer emails, extracts RFQs & categorizes urgency automatically.",
    badge: "99.4% Extraction",
    color: "text-blue-400",
    hexColor: 0x60a5fa,
    glowColor: "rgba(96, 165, 250, 0.3)",
    icon: Mail,
  },
  {
    id: "crm",
    name: "CRM",
    category: "input",
    pos: [-3.7, 0.4, 0.1],
    sublabel: "Pipeline & account sync",
    detail: "Syncs HubSpot/Salesforce contacts, logs timeline activity & enriches deal intelligence.",
    badge: "Real-time Sync",
    color: "text-cyan-400",
    hexColor: 0x38bdf8,
    glowColor: "rgba(56, 189, 248, 0.3)",
    icon: Building2,
  },
  {
    id: "tally",
    name: "TALLY",
    category: "input",
    pos: [-3.3, -1.0, 0.3],
    sublabel: "Invoices & ledger entries",
    detail: "Validates purchase orders against ledger items, GST details & generates clean vouchers.",
    badge: "Zero-Error Ledger",
    color: "text-indigo-400",
    hexColor: 0x818cf8,
    glowColor: "rgba(129, 140, 248, 0.3)",
    icon: FileSpreadsheet,
  },
  {
    id: "data",
    name: "DATA",
    category: "input",
    pos: [-2.1, -2.1, 0.2],
    sublabel: "ERP & SQL data pools",
    detail: "Queries backend databases, validates inventory balances & checks customer credit limits.",
    badge: "Secure Queries",
    color: "text-emerald-400",
    hexColor: 0x34d399,
    glowColor: "rgba(52, 211, 153, 0.3)",
    icon: Database,
  },
  {
    id: "orders",
    name: "ORDERS",
    category: "input",
    pos: [-0.6, -2.6, 0.4],
    sublabel: "Dispatch & tracking",
    detail: "Consolidates shipping requests, generates airway bills & triggers carrier notifications.",
    badge: "Auto-Dispatch",
    color: "text-amber-400",
    hexColor: 0xfbbf24,
    glowColor: "rgba(251, 191, 36, 0.3)",
    icon: ShoppingBag,
  },
  {
    id: "human",
    name: "HUMAN APPROVAL",
    category: "human",
    pos: [2.3, -0.6, 0.4],
    sublabel: "Gatekeeper Governance",
    detail: "Critical financial thresholds & edge cases trigger 1-click team authorization.",
    badge: "Human in the Loop",
    color: "text-emerald-300",
    hexColor: 0x10b981,
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: ShieldCheck,
  },
  {
    id: "execute",
    name: "EXECUTE",
    category: "execute",
    pos: [3.3, -1.9, 0.2],
    sublabel: "System Dispatch",
    detail: "Autonomous execution: ERP updated, ledger reconciled, customer notified via email.",
    badge: "Autonomous Output",
    color: "text-cyan-300",
    hexColor: 0x06b6d4,
    glowColor: "rgba(6, 182, 212, 0.4)",
    icon: Zap,
  },
];

function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function Hero3DExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const tooltipId = useId();

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>("email");
  const [workflowState, setWorkflowState] = useState<"UNDERSTAND" | "AUTOMATE" | "ORCHESTRATE">("ORCHESTRATE");

  const activeNodeRef = useRef<string | null>("email");
  activeNodeRef.current = activeNodeId;

  // Track cycle intervals for workflow state readout
  useEffect(() => {
    const states: Array<"UNDERSTAND" | "AUTOMATE" | "ORCHESTRATE"> = ["UNDERSTAND", "AUTOMATE", "ORCHESTRATE"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length;
      setWorkflowState(states[idx]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mobile Performance Mode: Immediately use lightweight fallback on small screens or touch-first devices
    const isMobile = window.innerWidth < 768;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (isMobile || reducedMotionQuery.matches || !isWebGLSupported()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let prefersReducedMotion: boolean = reducedMotionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) setUseFallback(true);
    };
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090607, 0.045);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 9.2);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      // Adaptive DPR: Laptop capped at 1.0, Desktop capped at 1.25 (eliminates high-res fill rate bottlenecks)
      const dpr = window.innerWidth < 1200 ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      renderer.setPixelRatio(dpr);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      setHasWebGL(false);
      return;
    }

    // Studio Lighting in Precision Red & Crisp White
    const ambientLight = new THREE.AmbientLight(0x1f0a10, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe11d48, 4.0);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const redCoreLight = new THREE.PointLight(0xbe123c, 5.0, 10);
    redCoreLight.position.set(0, 0, 0.5);
    scene.add(redCoreLight);

    const whiteAccentLight = new THREE.PointLight(0xffffff, 3.0, 8);
    whiteAccentLight.position.set(0, 1.2, -0.5);
    scene.add(whiteAccentLight);

    // Root Hierarchy for smooth Parallax & Scroll
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // -------------------------------------------------------------
    // 1. CENTRAL SPARTAN AUTOMATION CORE
    // -------------------------------------------------------------
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.2, 0);
    worldGroup.add(coreGroup);

    const spartanShape = new THREE.Shape();
    spartanShape.moveTo(-0.7, 0.95);
    spartanShape.lineTo(0.7, 0.95);
    spartanShape.lineTo(0.9, 0.55);
    spartanShape.lineTo(0.1, 0.55);
    spartanShape.lineTo(-0.35, -0.05);
    spartanShape.lineTo(0.4, -0.05);
    spartanShape.lineTo(0.7, -0.55);
    spartanShape.lineTo(-0.7, -0.55);
    spartanShape.lineTo(-0.9, -0.15);
    spartanShape.lineTo(-0.1, -0.15);
    spartanShape.lineTo(0.35, 0.45);
    spartanShape.lineTo(-0.4, 0.45);
    spartanShape.closePath();

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const spartanGeometry = new THREE.ExtrudeGeometry(spartanShape, extrudeSettings);
    spartanGeometry.center();

    const spartanMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xbe123c,
      emissive: 0x881337,
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.88,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const spartanMesh = new THREE.Mesh(spartanGeometry, spartanMaterial);
    coreGroup.add(spartanMesh);

    // Inner Luminous Emblem Disc
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/branding/spartan-3d-logo-red.png");
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.generateMipmaps = false;

    const emblemGeometry = new THREE.PlaneGeometry(1.65, 1.65);
    const emblemMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const emblemMesh = new THREE.Mesh(emblemGeometry, emblemMaterial);
    emblemMesh.position.z = 0.22;
    coreGroup.add(emblemMesh);

    const emblemMeshBack = emblemMesh.clone();
    emblemMeshBack.position.z = -0.22;
    emblemMeshBack.rotation.y = Math.PI;
    coreGroup.add(emblemMeshBack);

    // Concentric Precision Telemetry Rings
    const innerRingGeo = new THREE.TorusGeometry(1.35, 0.02, 12, 48);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xbe123c,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, ringMaterial);
    coreGroup.add(innerRing);

    const outerRingGeo = new THREE.TorusGeometry(1.85, 0.015, 12, 56);
    const outerRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xfecdd3,
      emissive: 0x9f1239,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.8,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMaterial);
    outerRing.rotation.x = Math.PI * 0.18;
    outerRing.rotation.y = Math.PI * 0.08;
    coreGroup.add(outerRing);

    // -------------------------------------------------------------
    // 2. CONNECTED WORKFLOW NODES & CONDUITS
    // -------------------------------------------------------------
    const nodeMeshes: { [id: string]: THREE.Group } = {};
    const conduitCurves: { [id: string]: THREE.QuadraticBezierCurve3 } = {};
    const conduitLines: { [id: string]: THREE.Line } = {};
    const conduitMaterials: { [id: string]: THREE.LineBasicMaterial } = {};

    const nodeBaseGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.09, 6);
    const nodeCoreGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const nodeRingGeo = new THREE.TorusGeometry(0.44, 0.012, 8, 24);

    NODES_DATA.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.pos);
      worldGroup.add(nodeGroup);
      nodeMeshes[node.id] = nodeGroup;

      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5,
        metalness: 0.7,
      });
      const baseMesh = new THREE.Mesh(nodeBaseGeo, baseMat);
      baseMesh.rotation.x = Math.PI / 2;
      nodeGroup.add(baseMesh);

      const coreMat = new THREE.MeshStandardMaterial({
        color: node.hexColor,
        emissive: node.hexColor,
        emissiveIntensity: 0.75,
        roughness: 0.3,
        metalness: 0.8,
      });
      const coreMesh = new THREE.Mesh(nodeCoreGeo, coreMat);
      coreMesh.position.z = 0.08;
      nodeGroup.add(coreMesh);

      const haloMat = new THREE.MeshBasicMaterial({
        color: node.hexColor,
        transparent: true,
        opacity: 0.5,
      });
      const haloMesh = new THREE.Mesh(nodeRingGeo, haloMat);
      haloMesh.position.z = 0.04;
      nodeGroup.add(haloMesh);

      // Conduit Curves
      const startPt = new THREE.Vector3(...node.pos);
      const endPt = new THREE.Vector3(0, 0.2, 0);
      const midPt = new THREE.Vector3(
        (startPt.x + endPt.x) * 0.5,
        (startPt.y + endPt.y) * 0.5 + (startPt.y > 0 ? 0.4 : -0.4),
        (startPt.z + endPt.z) * 0.5 + 0.3
      );

      const curve = new THREE.QuadraticBezierCurve3(startPt, midPt, endPt);
      conduitCurves[node.id] = curve;

      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.hexColor,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      worldGroup.add(line);

      conduitLines[node.id] = line;
      conduitMaterials[node.id] = lineMat;
    });

    // -------------------------------------------------------------
    // 3. INSTANCED DATA PACKETS
    // -------------------------------------------------------------
    const packetCount = NODES_DATA.length * 2;
    const packetGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const packetInstancedMesh = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    worldGroup.add(packetInstancedMesh);

    interface Packet {
      nodeId: string;
      progress: number;
      speed: number;
      scale: number;
    }

    const packets: Packet[] = [];
    NODES_DATA.forEach((node) => {
      packets.push({
        nodeId: node.id,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.003,
        scale: 0.8 + Math.random() * 0.4,
      });
      packets.push({
        nodeId: node.id,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.003,
        scale: 0.8 + Math.random() * 0.4,
      });
    });

    // -------------------------------------------------------------
    // 4. PARALLAX, SCROLL & INTERSECTION OBSERVER
    // -------------------------------------------------------------
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetScrollOffset = 0;
    let currentScrollOffset = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.22;
      targetRotX = ny * 0.16;
    };

    const handlePointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener("mousemove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      targetScrollOffset = (progress - 0.5) * 0.4;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Pause rendering when outside viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause rendering when browser tab is hidden
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible) {
        lastRenderTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // -------------------------------------------------------------
    // 5. ANIMATION & RENDER LOOP (Zero React Re-renders!)
    // -------------------------------------------------------------
    let animationFrameId: number;
    const tempMatrix = new THREE.Matrix4();
    const tempVector = new THREE.Vector3();
    const tempScale = new THREE.Vector3();
    const tempQuaternion = new THREE.Quaternion();

    let clock = 0;
    let lastRenderTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Early bailout: completely pause rendering when hidden or offscreen
      if (!isVisible || !isTabVisible || !renderer) return;

      const now = performance.now();
      const dt = Math.min((now - lastRenderTime) / 1000, 0.05);
      lastRenderTime = now;
      clock += dt;

      // Parallax Interpolation (Lerp)
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;
      currentScrollOffset += (targetScrollOffset - currentScrollOffset) * 0.05;

      worldGroup.rotation.y = currentRotY;
      worldGroup.rotation.x = currentRotX + currentScrollOffset * 0.4;

      // Core Gentle Breathing & Rotation
      coreGroup.rotation.y = clock * 0.22;
      outerRing.rotation.z = -clock * 0.28;
      innerRing.rotation.x = Math.sin(clock * 0.5) * 0.12;

      const pulse = 1 + Math.sin(clock * 1.8) * 0.02;
      spartanMesh.scale.set(pulse, pulse, pulse);

      // Node highlighting
      const currentActive = activeNodeRef.current;
      NODES_DATA.forEach((node) => {
        const isSelected = currentActive === node.id;
        const lineMat = conduitMaterials[node.id];
        const nodeGrp = nodeMeshes[node.id];

        if (lineMat) {
          const targetOpacity = isSelected ? 0.9 : 0.2;
          lineMat.opacity += (targetOpacity - lineMat.opacity) * 0.1;
        }

        if (nodeGrp) {
          const targetScale = isSelected ? 1.12 : 1.0;
          nodeGrp.scale.lerp(tempScale.set(targetScale, targetScale, targetScale), 0.1);
        }
      });

      // Flowing Data Packets
      packets.forEach((packet, idx) => {
        const curve = conduitCurves[packet.nodeId];
        if (!curve) return;

        const isSelected = currentActive === packet.nodeId;
        const currentSpeed = isSelected ? packet.speed * 1.6 : packet.speed;

        packet.progress += currentSpeed;
        if (packet.progress > 1) packet.progress = 0;

        const pt = curve.getPointAt(Math.min(Math.max(packet.progress, 0), 1));
        tempVector.copy(pt);

        const s = packet.scale * (isSelected ? 1.3 : 1.0);
        tempScale.set(s, s, s);

        tempMatrix.compose(tempVector, tempQuaternion, tempScale);
        packetInstancedMesh.setMatrixAt(idx, tempMatrix);
      });
      packetInstancedMesh.instanceMatrix.needsUpdate = true;

      // Render 3D Scene
      renderer.render(scene, camera);

      // Project 3D Node positions to Screen Space via DIRECT DOM REFS (Zero React state re-renders!)
      const rect = container.getBoundingClientRect();
      NODES_DATA.forEach((node) => {
        const mesh = nodeMeshes[node.id];
        const overlayEl = overlayRefs.current[node.id];
        if (!mesh || !overlayEl) return;

        mesh.getWorldPosition(tempVector);
        tempVector.project(camera);

        if (tempVector.z < 1.0) {
          const x = (tempVector.x * 0.5 + 0.5) * rect.width;
          const y = (-tempVector.y * 0.5 + 0.5) * rect.height;
          overlayEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          overlayEl.style.display = "block";
        } else {
          overlayEl.style.display = "none";
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);

      // Dispose Geometries & Materials
      spartanGeometry.dispose();
      spartanMaterial.dispose();
      emblemGeometry.dispose();
      emblemMaterial.dispose();
      innerRingGeo.dispose();
      outerRingGeo.dispose();
      nodeBaseGeo.dispose();
      nodeCoreGeo.dispose();
      nodeRingGeo.dispose();
      packetGeo.dispose();
      packetMat.dispose();

      Object.values(conduitLines).forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  if (!hasWebGL || useFallback) {
    return <Hero3DFallback />;
  }

  const activeNode = NODES_DATA.find((n) => n.id === activeNodeId) || NODES_DATA[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] md:h-[620px] rounded-3xl border border-white/10 bg-[#090607]/90 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col justify-between select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Decorative Technical Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(225, 29, 72, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(225, 29, 72, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header bar: Live Telemetry Status */}
      <div className="relative z-10 p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-b from-[#090607]/90 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e11d48] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e11d48]" />
          </div>
          <div>
            <div className="text-[11px] font-mono tracking-widest text-white uppercase flex items-center gap-2">
              <span>SPARTAN AUTOMATION CORE</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                ACTIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              ORCHESTRATING {NODES_DATA.filter((n) => n.category === "input").length} ENTERPRISE SYSTEMS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-950/80 border border-brand-500/40 text-[10px] font-mono text-brand-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PIPELINE:</span>
            <span className="text-white font-semibold">{workflowState}</span>
          </div>
        </div>
      </div>

      {/* Screen-Space Interactive Overlays for Each Node (Rendered statically, translated via direct ref) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {NODES_DATA.map((node) => {
          const isSelected = activeNodeId === node.id;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              ref={(el) => {
                overlayRefs.current[node.id] = el;
              }}
              style={{
                display: "none",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto will-change-transform"
            >
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onFocus={() => setActiveNodeId(node.id)}
                aria-describedby={isSelected ? tooltipId : undefined}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-150 backdrop-blur-md shadow-lg cursor-pointer ${
                  isSelected
                    ? "bg-[#1c1114]/95 border-[#e11d48] scale-105 shadow-[0_0_16px_rgba(225,29,72,0.45)] ring-1 ring-[#e11d48]/50"
                    : "bg-[#120b0e]/80 border-white/15 hover:border-[#e11d48]/50 hover:bg-[#1c1114]/90"
                }`}
              >
                <div className={`p-1 rounded ${node.color} bg-white/5`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-white">
                  {node.name}
                </span>

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Telemetry Card / Detailed Node Readout */}
      <div className="relative z-10 p-4 mt-auto border-t border-white/10 bg-[#090607]/85 backdrop-blur-xl">
        <div id={tooltipId} role="region" aria-label="System Node Telemetry" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${activeNode.color}`}>
              <activeNode.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  {activeNode.name}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {activeNode.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-md leading-relaxed font-sans">
                {activeNode.detail}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-brand-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Orchestrated by SPARTAN</span>
            </div>
            <span className="text-slate-400 text-[9px]">
              {activeNode.category === "human"
                ? "Safe human approval gatekeeper"
                : activeNode.category === "execute"
                ? "Autonomous verified dispatch"
                : "Continuous workflow ingestion"}
            </span>
          </div>
        </div>

        {/* Quick Node Switcher Pills */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[9px] font-mono text-slate-400 uppercase mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> NODES:
          </span>
          {NODES_DATA.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`px-2 py-0.5 rounded text-[9px] font-mono transition-colors cursor-pointer ${
                activeNodeId === node.id
                  ? "bg-brand-500/25 border border-brand-400 text-white"
                  : "bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15"
              }`}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
