"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Settings,
  Headphones,
  DollarSign,
  Truck,
  Bot,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  color: string;
  bgGlow: string;
  badge?: string;
}

const DEPARTMENTS: NodeData[] = [
  { id: "sales", label: "SALES", sublabel: "Leads & Outreach", icon: TrendingUp, color: "text-[#BAAEC0]", bgGlow: "rgba(201, 174, 198, 0.15)", badge: "Leads" },
  { id: "operations", label: "OPERATIONS", sublabel: "Orders & Fulfillment", icon: Settings, color: "text-[#BAAEC0]", bgGlow: "rgba(201, 174, 198, 0.15)", badge: "Orders" },
  { id: "support", label: "SUPPORT", sublabel: "Emails & Tickets", icon: Headphones, color: "text-[#BAAEC0]", bgGlow: "rgba(201, 174, 198, 0.15)", badge: "Emails" },
  { id: "finance", label: "FINANCE", sublabel: "Invoices & Billing", icon: DollarSign, color: "text-[#BAAEC0]", bgGlow: "rgba(201, 174, 198, 0.15)", badge: "Invoices" },
  { id: "logistics", label: "LOGISTICS", sublabel: "Shipments & Tracking", icon: Truck, color: "text-[#BAAEC0]", bgGlow: "rgba(201, 174, 198, 0.15)", badge: "Shipments" },
];

export function WorkflowNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasMousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Handle canvas animation for connecting lines, technical grid, and data particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const checkReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const mx = canvasMousePos.current.x;
      const my = canvasMousePos.current.y;
      const hasCursor = mx > 0 && my > 0;

      // 1. Subtle, high-end technical blueprint dot grid
      const dotSpacing = 32;
      for (let gx = dotSpacing; gx < width; gx += dotSpacing) {
        for (let gy = dotSpacing; gy < height; gy += dotSpacing) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.fill();
        }
      }

      // 2. Node Coordinates
      const rootX = width / 2;
      const rootY = 32;

      const deptY = height * 0.32;
      const aiY = height * 0.64;
      const humanY = height * 0.79;
      const actionY = height * 0.93;

      const numDepts = 5;
      const deptSpacing = width / (numDepts + 1);

      // Find closest department to mouse
      let closestDeptIdx = -1;
      let closestDist = Infinity;
      for (let i = 0; i < numDepts; i++) {
        const dx = deptSpacing * (i + 1);
        const dist = Math.hypot(dx - mx, deptY - my);
        if (dist < closestDist) {
          closestDist = dist;
          closestDeptIdx = i;
        }
      }

      const activeIdx = activeDept
        ? DEPARTMENTS.findIndex((d) => d.id === activeDept)
        : (hasCursor && closestDist < 100 ? closestDeptIdx : -1);

      // 3. Clean, Architectural Routing Lines (Distributed parallel conduits, no tangled pinch)
      const now = Date.now();
      const pulseProgress = (now % 2200) / 2200;

      for (let i = 0; i < numDepts; i++) {
        const dx = deptSpacing * (i + 1);
        const isCurrentActive = activeIdx === i;

        // Route A: Root -> Department
        const rootPortX = rootX + (i - 2) * 12;
        const rootPortY = rootY + 22;
        const deptTopPortX = dx;
        const deptTopPortY = deptY - 40;

        ctx.beginPath();
        ctx.moveTo(rootPortX, rootPortY);
        ctx.bezierCurveTo(
          rootPortX, rootPortY + (deptTopPortY - rootPortY) * 0.45,
          deptTopPortX, deptTopPortY - (deptTopPortY - rootPortY) * 0.35,
          deptTopPortX, deptTopPortY
        );

        if (isCurrentActive) {
          ctx.strokeStyle = "#C9AEC6";
          ctx.lineWidth = 2.0;
          ctx.shadowColor = "rgba(201, 174, 198, 0.4)";
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.shadowBlur = 0;

          if (!checkReducedMotion) {
            ctx.save();
            ctx.setLineDash([20, 140]);
            ctx.lineDashOffset = -pulseProgress * 160;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2.4;
            ctx.stroke();
            ctx.restore();
          }
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Route B: Department -> AI Automation (Dedicated evenly-spaced ports across top)
        const deptBottomPortX = dx;
        const deptBottomPortY = deptY + 46;
        const aiPortX = rootX + (i - 2) * 28;
        const aiPortY = aiY - 22;

        ctx.beginPath();
        ctx.moveTo(deptBottomPortX, deptBottomPortY);
        ctx.bezierCurveTo(
          deptBottomPortX, deptBottomPortY + (aiPortY - deptBottomPortY) * 0.45,
          aiPortX, aiPortY - (aiPortY - deptBottomPortY) * 0.45,
          aiPortX, aiPortY
        );

        if (isCurrentActive) {
          ctx.strokeStyle = "#C9AEC6";
          ctx.lineWidth = 2.0;
          ctx.shadowColor = "rgba(201, 174, 198, 0.4)";
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.shadowBlur = 0;

          if (!checkReducedMotion) {
            ctx.save();
            ctx.setLineDash([20, 140]);
            ctx.lineDashOffset = -pulseProgress * 160;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2.4;
            ctx.stroke();
            ctx.restore();
          }
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Clean terminal port dot at AI node entry
        ctx.beginPath();
        ctx.arc(aiPortX, aiPortY, isCurrentActive ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isCurrentActive ? "#C9AEC6" : "rgba(255, 255, 255, 0.22)";
        ctx.fill();
      }

      // 4. Line from AI -> Human Approval
      const aiBottomY = aiY + 22;
      const humanTopY = humanY - 22;

      ctx.beginPath();
      ctx.moveTo(rootX, aiBottomY);
      ctx.lineTo(rootX, humanTopY);
      ctx.strokeStyle = activeIdx >= 0 ? "rgba(201, 174, 198, 0.8)" : "rgba(201, 174, 198, 0.35)";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle gatekeeper junction dot
      ctx.beginPath();
      ctx.arc(rootX, (aiBottomY + humanTopY) / 2, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "#C9AEC6";
      ctx.fill();

      // 5. Line from Human Approval -> Action
      const humanBottomY = humanY + 22;
      const actionTopY = actionY - 18;

      ctx.beginPath();
      ctx.moveTo(rootX, humanBottomY);
      ctx.lineTo(rootX, actionTopY);
      ctx.strokeStyle = activeIdx >= 0 ? "#22C55E" : "rgba(34, 197, 94, 0.5)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      if (activeIdx >= 0 && !checkReducedMotion) {
        ctx.save();
        ctx.setLineDash([14, 60]);
        ctx.lineDashOffset = -pulseProgress * 74;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeDept]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    canvasMousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
    });
  };

  const handleMouseLeave = () => {
    canvasMousePos.current = { x: -1000, y: -1000 };
    setMousePos({ x: 0, y: 0 });
    setActiveDept(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[600px] md:h-[660px] rounded-3xl border border-white/[0.08] bg-[#0B0B0B]/95 backdrop-blur-xl overflow-hidden p-4 md:p-6 shadow-2xl flex flex-col justify-between select-none"
    >
      {/* Dynamic Canvas for connecting bezier lines, technical grid & pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Decorative ambient gradient backdrop */}
      <div className="absolute inset-0 bg-radial from-[#C9AEC6]/[0.03] via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#C9AEC6]/[0.03] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#22C55E]/[0.03] blur-[110px] pointer-events-none" />

      {/* Top Root Node: YOUR BUSINESS */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        <motion.div
          animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass border border-[#C9AEC6]/30 bg-[#141414] shadow-[0_0_25px_rgba(201,174,198,0.12)] cursor-default"
        >
          <div className="w-6 h-6 rounded-full bg-[#C9AEC6]/15 flex items-center justify-center text-[#C9AEC6]">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold tracking-widest text-[#F6EFF5] block uppercase">YOUR BUSINESS</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C9AEC6]/15 text-[#C9AEC6]">
            Operations
          </span>
        </motion.div>
      </div>

      {/* Middle Branches: 5 Business Departments */}
      <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 px-1 my-auto">
        {DEPARTMENTS.map((dept) => {
          const isSelected = activeDept === dept.id;
          const Icon = dept.icon;
          return (
            <motion.div
              key={dept.id}
              onMouseEnter={() => setActiveDept(dept.id)}
              onMouseLeave={() => setActiveDept(null)}
              animate={{ x: mousePos.x * 0.15, y: mousePos.y * 0.15 }}
              className={`relative flex flex-col items-center text-center p-2 sm:p-2.5 md:p-3 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                isSelected
                  ? "border-[#C9AEC6] bg-[#161616] shadow-[0_4px_22px_rgba(201,174,198,0.2)] scale-[1.03]"
                  : "border-white/[0.08] bg-[#141414]/70 hover:border-[#C9AEC6]/40 hover:bg-[#161616]"
              }`}
            >
              {/* Refined top specular sheen when active */}
              {isSelected && (
                <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#C9AEC6] to-transparent" />
              )}
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center mb-1 bg-white/5 ${dept.color}`}>
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-[#F6EFF5] tracking-wider block">
                {dept.label}
              </span>
              <span className="text-[8px] md:text-[10px] text-[#8E8295] hidden sm:block truncate max-w-full">
                {dept.sublabel}
              </span>
              <div className="mt-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] md:text-[9px] font-mono text-[#C9AEC6]">
                {dept.badge}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Converged Flow: AI Automation -> Human Approval -> Result */}
      <div className="relative z-10 flex flex-col items-center gap-2.5 pb-2">
        {/* Step 1: AI Automation */}
        <motion.div
          animate={{ x: mousePos.x * 0.1, y: mousePos.y * 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-white/[0.08] bg-[#141414]/90 shadow-lg"
        >
          <div className="w-6 h-6 rounded-lg bg-[#C9AEC6]/15 flex items-center justify-center text-[#C9AEC6]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F6EFF5]">AI PROCESSING</div>
            <div className="text-[10px] text-[#8E8295]">Extracts data, validates rules & drafts actions</div>
          </div>
        </motion.div>

        {/* Step 2: Human Approval (Strict Human in the Loop) */}
        <motion.div
          animate={{ x: mousePos.x * 0.08, y: mousePos.y * 0.08 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-[#C9AEC6]/40 bg-[#161616] shadow-[0_4px_20px_rgba(201,174,198,0.12)]"
        >
          <div className="w-6 h-6 rounded-lg bg-[#C9AEC6]/15 flex items-center justify-center text-[#C9AEC6]">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F6EFF5] flex items-center gap-1.5">
              HUMAN REVIEW
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#C9AEC6]/15 text-[#C9AEC6] border border-[#C9AEC6]/30">
                Gatekeeper
              </span>
            </div>
            <div className="text-[10px] text-[#8E8295]">Team authorizes high-impact actions & exceptions</div>
          </div>
        </motion.div>

        {/* Step 3: Verified Action / Result */}
        <motion.div
          animate={{ x: mousePos.x * 0.05, y: mousePos.y * 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#22C55E]/30 bg-[#141414] text-[11px] md:text-xs text-[#F6EFF5] font-medium text-center shadow-lg"
        >
          <Zap className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
          <span>SYSTEM EXECUTES: Database updated • Dispatch sent • Records synchronized</span>
        </motion.div>
      </div>
    </div>
  );
}
