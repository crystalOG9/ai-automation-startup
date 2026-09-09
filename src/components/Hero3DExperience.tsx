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
  Info,
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

/**
 * Check if WebGL is supported in the current environment
 */
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
  const tooltipId = useId();

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>("email");
  const [screenCoords, setScreenCoords] = useState<{ [id: string]: { x: number; y: number; visible: boolean } }>({});
  const [workflowState, setWorkflowState] = useState<"UNDERSTAND" | "AUTOMATE" | "ORCHESTRATE">("ORCHESTRATE");

  // Keep a ref for active node to avoid re-binding Three.js event loops
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
    if (!isWebGLSupported()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      setHasWebGL(false);
      return;
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 3.2);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 4.5);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const blueCoreLight = new THREE.PointLight(0x3b82f6, 6.0, 10);
    blueCoreLight.position.set(0, 0, 0.5);
    scene.add(blueCoreLight);

    const cyanAccentLight = new THREE.PointLight(0x06b6d4, 4.0, 8);
    cyanAccentLight.position.set(0, 1.2, -0.5);
    scene.add(cyanAccentLight);

    // Root Hierarchy for smooth Parallax & Scroll
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // -------------------------------------------------------------
    // 1. CENTRAL SPARTAN AUTOMATION CORE
    // -------------------------------------------------------------
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.2, 0);
    worldGroup.add(coreGroup);

    // Central 3D Extruded Spartan S Emblem Geometry
    // Constructed with chamfered angular contours matching the official Spartan emblem
    const spartanShape = new THREE.Shape();
    // Scaled around origin (-0.9 to 0.9)
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
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const spartanGeometry = new THREE.ExtrudeGeometry(spartanShape, extrudeSettings);
    spartanGeometry.center();

    const spartanMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.88,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });

    const spartanMesh = new THREE.Mesh(spartanGeometry, spartanMaterial);
    coreGroup.add(spartanMesh);

    // Inner Luminous Emblem Disc (Official SPARTAN Logo Badge)
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/branding/spartan-logo.png");
    logoTexture.generateMipmaps = true;

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

    // Backside emblem for 3D visibility during rotation
    const emblemMeshBack = emblemMesh.clone();
    emblemMeshBack.position.z = -0.22;
    emblemMeshBack.rotation.y = Math.PI;
    coreGroup.add(emblemMeshBack);

    // Concentric Precision Telemetry Rings
    // Ring 1: Inner Chamfered Ring
    const innerRingGeo = new THREE.TorusGeometry(1.35, 0.022, 16, 72);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x2563eb,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, ringMaterial);
    coreGroup.add(innerRing);

    // Ring 2: Tilted Outer Gimbal Ring with Technical Coordinate Ticks
    const outerRingGeo = new THREE.TorusGeometry(1.85, 0.016, 16, 80);
    const outerRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.8,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMaterial);
    outerRing.rotation.x = Math.PI * 0.18;
    outerRing.rotation.y = Math.PI * 0.08;
    coreGroup.add(outerRing);

    // Outer Blueprint Dashed Boundary
    const dashedCirclePoints: THREE.Vector3[] = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      dashedCirclePoints.push(new THREE.Vector3(Math.cos(theta) * 2.2, Math.sin(theta) * 2.2, 0));
    }
    const dashedGeo = new THREE.BufferGeometry().setFromPoints(dashedCirclePoints);
    const dashedMat = new THREE.LineDashedMaterial({
      color: 0x3b82f6,
      dashSize: 0.15,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const dashedRing = new THREE.Line(dashedGeo, dashedMat);
    dashedRing.computeLineDistances();
    coreGroup.add(dashedRing);

    // -------------------------------------------------------------
    // 2. CONNECTED WORKFLOW NODES & CONDUITS
    // -------------------------------------------------------------
    const nodeMeshes: { [id: string]: THREE.Group } = {};
    const conduitCurves: { [id: string]: THREE.QuadraticBezierCurve3 } = {};
    const conduitLines: { [id: string]: THREE.Line } = {};
    const conduitMaterials: { [id: string]: THREE.LineBasicMaterial } = {};

    // Base geometry for node housings
    const nodeBaseGeo = new THREE.CylinderGeometry(0.34, 0.38, 0.09, 6);
    const nodeCoreGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const nodeRingGeo = new THREE.TorusGeometry(0.44, 0.012, 12, 32);

    NODES_DATA.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.pos);
      worldGroup.add(nodeGroup);
      nodeMeshes[node.id] = nodeGroup;

      // Base cylinder
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: node.hexColor,
        emissiveIntensity: 0.12,
        roughness: 0.3,
        metalness: 0.85,
      });
      const baseMesh = new THREE.Mesh(nodeBaseGeo, baseMat);
      baseMesh.rotation.x = Math.PI * 0.5;
      nodeGroup.add(baseMesh);

      // Glowing Center Orb
      const coreMat = new THREE.MeshStandardMaterial({
        color: node.hexColor,
        emissive: node.hexColor,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.5,
      });
      const coreMesh = new THREE.Mesh(nodeCoreGeo, coreMat);
      coreMesh.position.z = 0.06;
      nodeGroup.add(coreMesh);

      // Precision Ring
      const ringMesh = new THREE.Mesh(
        nodeRingGeo,
        new THREE.MeshBasicMaterial({ color: node.hexColor, transparent: true, opacity: 0.6 })
      );
      nodeGroup.add(ringMesh);

      // Geometric Connecting Conduits
      let startPt = new THREE.Vector3(...node.pos);
      let endPt: THREE.Vector3;
      let controlPt: THREE.Vector3;

      if (node.category === "input") {
        // From business node to Spartan Core
        endPt = new THREE.Vector3(0, 0.2, 0);
        // Clean curved architecture
        controlPt = new THREE.Vector3(
          startPt.x * 0.45,
          startPt.y * 0.65 + 0.2,
          (startPt.z + endPt.z) * 0.5 + 0.3
        );
      } else if (node.id === "human") {
        // From Spartan Core to Human Approval
        startPt = new THREE.Vector3(0.5, 0.1, 0);
        endPt = new THREE.Vector3(...node.pos);
        controlPt = new THREE.Vector3(1.3, 0.1, 0.2);
      } else {
        // From Human Approval to Execute
        const prevNode = NODES_DATA.find((n) => n.id === "human")!;
        startPt = new THREE.Vector3(...prevNode.pos);
        endPt = new THREE.Vector3(...node.pos);
        controlPt = new THREE.Vector3(2.8, -1.2, 0.3);
      }

      const curve = new THREE.QuadraticBezierCurve3(startPt, controlPt, endPt);
      conduitCurves[node.id] = curve;

      const curvePoints = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.hexColor,
        transparent: true,
        opacity: 0.22,
        linewidth: 1,
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      worldGroup.add(lineMesh);

      conduitLines[node.id] = lineMesh;
      conduitMaterials[node.id] = lineMat;
    });

    // -------------------------------------------------------------
    // 3. FLOWING DATA PACKETS ALONG CONDUITS
    // -------------------------------------------------------------
    const packetCount = NODES_DATA.length * 3;
    const packetGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packetInstancedMesh = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    packetInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    worldGroup.add(packetInstancedMesh);

    // Track each packet's curve and progress
    interface Packet {
      nodeId: string;
      progress: number;
      speed: number;
      scale: number;
    }
    const packets: Packet[] = [];
    NODES_DATA.forEach((node) => {
      for (let p = 0; p < 3; p++) {
        packets.push({
          nodeId: node.id,
          progress: (p / 3) + Math.random() * 0.15,
          speed: 0.0035 + Math.random() * 0.002,
          scale: 0.8 + Math.random() * 0.4,
        });
      }
    });

    // -------------------------------------------------------------
    // 4. MOUSE PARALLAX & SCROLL INTERACTION
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let targetScrollOffset = 0;
    let currentScrollOffset = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;

      if (!prefersReducedMotion) {
        targetRotY = mouseX * 0.35;
        targetRotX = -mouseY * 0.25;
      }
    };

    const handlePointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
      targetRotX = 0;
      targetRotY = 0;
    };

    const handleScroll = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY;
      targetScrollOffset = Math.min(Math.max(scrollY * 0.0004, 0), 0.35);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      // Adjust camera distance based on viewport width to guarantee zero clipping
      if (w < 480) {
        camera.position.z = 11.2;
      } else if (w < 768) {
        camera.position.z = 10.4;
      } else {
        camera.position.z = 9.2;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // IntersectionObserver to freeze animation when off-screen (saves 100% GPU/CPU)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // -------------------------------------------------------------
    // 5. ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    const tempMatrix = new THREE.Matrix4();
    const tempVector = new THREE.Vector3();
    const tempScale = new THREE.Vector3();
    const tempQuaternion = new THREE.Quaternion();

    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      clock += 0.016;

      // Parallax Interpolation (Lerp)
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;
      currentScrollOffset += (targetScrollOffset - currentScrollOffset) * 0.05;

      worldGroup.rotation.y = currentRotY;
      worldGroup.rotation.x = currentRotX + currentScrollOffset * 0.4;

      // Core Gentle Breathing & Rotation
      if (!prefersReducedMotion) {
        coreGroup.rotation.y = clock * 0.25;
        outerRing.rotation.z = -clock * 0.3;
        innerRing.rotation.x = Math.sin(clock * 0.5) * 0.15;

        // Emblem dynamic pulse
        const pulse = 1 + Math.sin(clock * 2.0) * 0.025;
        spartanMesh.scale.set(pulse, pulse, pulse);
      } else {
        coreGroup.rotation.y = 0.25;
        outerRing.rotation.z = -0.15;
      }

      // Update Node highlights based on active selection
      const currentActive = activeNodeRef.current;
      NODES_DATA.forEach((node) => {
        const isSelected = currentActive === node.id;
        const lineMat = conduitMaterials[node.id];
        const nodeGrp = nodeMeshes[node.id];

        if (lineMat) {
          const targetOpacity = isSelected ? 0.95 : 0.2;
          lineMat.opacity += (targetOpacity - lineMat.opacity) * 0.1;
        }

        if (nodeGrp) {
          const targetScale = isSelected ? 1.15 : 1.0;
          nodeGrp.scale.lerp(tempScale.set(targetScale, targetScale, targetScale), 0.1);
        }
      });

      // Update Flowing Data Packets
      packets.forEach((packet, idx) => {
        const curve = conduitCurves[packet.nodeId];
        if (!curve) return;

        const isSelected = currentActive === packet.nodeId;
        const currentSpeed = isSelected ? packet.speed * 1.8 : packet.speed;

        if (!prefersReducedMotion) {
          packet.progress += currentSpeed;
          if (packet.progress > 1) packet.progress = 0;
        }

        // Calculate 3D position along the conduit curve
        const pt = curve.getPointAt(Math.min(Math.max(packet.progress, 0), 1));
        tempVector.copy(pt);

        const s = packet.scale * (isSelected ? 1.4 : 1.0);
        tempScale.set(s, s, s);

        tempMatrix.compose(tempVector, tempQuaternion, tempScale);
        packetInstancedMesh.setMatrixAt(idx, tempMatrix);
      });
      packetInstancedMesh.instanceMatrix.needsUpdate = true;

      // Render 3D Scene
      renderer.render(scene, camera);

      // Project 3D Node positions to Screen Space for crisp 2D Typography Overlays
      const rect = container.getBoundingClientRect();
      const coordsUpdate: { [id: string]: { x: number; y: number; visible: boolean } } = {};

      NODES_DATA.forEach((node) => {
        const mesh = nodeMeshes[node.id];
        if (!mesh) return;

        // Get world position
        mesh.getWorldPosition(tempVector);
        // Project to NDC (-1 to +1)
        tempVector.project(camera);

        // Map to container coordinates
        const x = (tempVector.x * 0.5 + 0.5) * rect.width;
        const y = (-tempVector.y * 0.5 + 0.5) * rect.height;
        const visible = tempVector.z < 1.0;

        coordsUpdate[node.id] = { x, y, visible };
      });

      setScreenCoords(coordsUpdate);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
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
      dashedGeo.dispose();
      dashedMat.dispose();
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

  if (!hasWebGL) {
    return <Hero3DFallback />;
  }

  const activeNode = NODES_DATA.find((n) => n.id === activeNodeId) || NODES_DATA[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[660px] rounded-3xl border border-white/10 bg-[#060b17]/90 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col justify-between select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Decorative Technical Grid & Radial Vignette */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/[0.1] blur-[120px] rounded-full pointer-events-none z-[1]" />

      {/* Top Telemetry Header Bar */}
      <div className="relative z-10 p-5 flex items-center justify-between border-b border-white/5 bg-[#030712]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
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
          {/* Live Workflow State Readout */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-950/80 border border-brand-500/40 text-[10px] font-mono text-brand-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PIPELINE:</span>
            <span className="text-white font-semibold">{workflowState}</span>
          </div>
        </div>
      </div>

      {/* Screen-Space Interactive Overlays for Each Node */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {NODES_DATA.map((node) => {
          const coords = screenCoords[node.id];
          if (!coords || !coords.visible) return null;

          const isSelected = activeNodeId === node.id;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              style={{
                transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-75"
            >
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onFocus={() => setActiveNodeId(node.id)}
                aria-describedby={isSelected ? tooltipId : undefined}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-200 backdrop-blur-md shadow-lg ${
                  isSelected
                    ? "bg-slate-900/95 border-brand-400 scale-105 shadow-[0_0_18px_rgba(59,130,246,0.4)] ring-1 ring-brand-400/50"
                    : "bg-slate-950/75 border-white/15 hover:border-brand-500/50 hover:bg-slate-900/80"
                }`}
              >
                <div className={`p-1 rounded ${node.color} bg-white/5`}>
                  <Icon className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-white">
                  {node.name}
                </span>

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Telemetry Card / Detailed Node Readout */}
      <div className="relative z-10 p-5 mt-auto border-t border-white/10 bg-[#030712]/75 backdrop-blur-xl">
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
        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[9px] font-mono text-slate-400 uppercase mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> NODES:
          </span>
          {NODES_DATA.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`px-2 py-0.5 rounded text-[9px] font-mono transition-colors ${
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
