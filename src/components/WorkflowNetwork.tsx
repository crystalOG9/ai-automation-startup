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
  { id: "sales", label: "SALES", sublabel: "Leads & Outreach", icon: TrendingUp, color: "text-blue-400", bgGlow: "rgba(59, 130, 246, 0.15)", badge: "Leads" },
  { id: "operations", label: "OPERATIONS", sublabel: "Orders & Fulfillment", icon: Settings, color: "text-cyan-400", bgGlow: "rgba(6, 182, 212, 0.15)", badge: "Orders" },
  { id: "support", label: "SUPPORT", sublabel: "Emails & Tickets", icon: Headphones, color: "text-indigo-400", bgGlow: "rgba(99, 102, 241, 0.15)", badge: "Emails" },
  { id: "finance", label: "FINANCE", sublabel: "Invoices & Billing", icon: DollarSign, color: "text-emerald-400", bgGlow: "rgba(16, 185, 129, 0.15)", badge: "Invoices" },
  { id: "logistics", label: "LOGISTICS", sublabel: "Shipments & Tracking", icon: Truck, color: "text-amber-400", bgGlow: "rgba(245, 158, 11, 0.15)", badge: "Shipments" },
];

export function WorkflowNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle canvas animation for connecting lines and data particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      branchIdx: number;
      progress: number;
      speed: number;
      size: number;
      color: string;
    }> = [];

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

    // Initialize data particles
    const colors = ["#60a5fa", "#22d3ee", "#818cf8", "#34d399", "#fbbf24"];
    for (let i = 0; i < 20; i++) {
      particles.push({
        branchIdx: i % 5,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 2,
        color: colors[i % 5],
      });
    }

    const checkReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Node coordinate calculation based on container bounds
      const rootX = width / 2;
      const rootY = 32;

      const deptY = height * 0.32;
      const aiY = height * 0.62;
      const humanY = height * 0.78;
      const actionY = height * 0.94;

      const numDepts = 5;
      const deptSpacing = width / (numDepts + 1);

      // Draw branch lines from root to departments
      for (let i = 0; i < numDepts; i++) {
        const dx = deptSpacing * (i + 1);
        const isActive = activeDept === DEPARTMENTS[i]?.id;

        // Line from Root -> Department
        ctx.beginPath();
        ctx.moveTo(rootX, rootY + 24);
        ctx.bezierCurveTo(rootX, (rootY + deptY) / 2, dx, (rootY + deptY) / 2 - 10, dx, deptY - 20);
        ctx.strokeStyle = isActive ? "rgba(96, 165, 250, 0.6)" : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        // Line from Department -> AI Automation
        ctx.beginPath();
        ctx.moveTo(dx, deptY + 36);
        ctx.bezierCurveTo(dx, (deptY + aiY) / 2 + 10, rootX, (deptY + aiY) / 2, rootX, aiY - 22);
        ctx.strokeStyle = isActive ? "rgba(96, 165, 250, 0.6)" : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();
      }

      // Line from AI -> Human Approval
      ctx.beginPath();
      ctx.moveTo(rootX, aiY + 24);
      ctx.lineTo(rootX, humanY - 22);
      ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Line from Human Approval -> Action
      ctx.beginPath();
      ctx.moveTo(rootX, humanY + 24);
      ctx.lineTo(rootX, actionY - 20);
      ctx.strokeStyle = "rgba(96, 165, 250, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Render traveling data particles if reduced motion is disabled
      if (!checkReducedMotion) {
        particles.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          const dx = deptSpacing * (p.branchIdx + 1);
          let px = 0;
          let py = 0;

          if (p.progress < 0.4) {
            // Stage 1: Root -> Department
            const t = p.progress / 0.4;
            const cy1 = (rootY + deptY) / 2;
            const cx2 = dx;
            const cy2 = (rootY + deptY) / 2 - 10;
            const u = 1 - t;
            px = u * u * u * rootX + 3 * u * u * t * rootX + 3 * u * t * t * cx2 + t * t * t * dx;
            py = u * u * u * (rootY + 24) + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * (deptY - 20);
          } else if (p.progress < 0.75) {
            // Stage 2: Department -> AI Automation
            const t = (p.progress - 0.4) / 0.35;
            const u = 1 - t;
            const cy1 = (deptY + aiY) / 2 + 10;
            const cy2 = (deptY + aiY) / 2;
            px = u * u * u * dx + 3 * u * u * t * dx + 3 * u * t * t * rootX + t * t * t * rootX;
            py = u * u * u * (deptY + 36) + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * (aiY - 22);
          } else if (p.progress < 0.9) {
            // Stage 3: AI -> Human Approval
            const t = (p.progress - 0.75) / 0.15;
            px = rootX;
            py = (aiY + 24) + t * (humanY - 22 - (aiY + 24));
          } else {
            // Stage 4: Human Approval -> Action
            const t = (p.progress - 0.9) / 0.1;
            px = rootX;
            py = (humanY + 24) + t * (actionY - 20 - (humanY + 24));
          }

          // Draw glowing particle
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        });
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
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[600px] md:h-[660px] rounded-3xl border border-white/10 bg-[#060b17]/90 backdrop-blur-xl overflow-hidden p-4 md:p-6 shadow-2xl flex flex-col justify-between select-none"
    >
      {/* Dynamic Canvas for connecting bezier lines & pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Decorative ambient gradient backdrop */}
      <div className="absolute inset-0 bg-radial from-brand-600/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* Top Root Node: YOUR BUSINESS */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        <motion.div
          animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass border border-brand-500/40 bg-brand-950/70 shadow-[0_0_25px_rgba(37,99,235,0.25)] cursor-default"
        >
          <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold tracking-widest text-white block uppercase">YOUR BUSINESS</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/20 text-brand-300">
            Core
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
              className={`relative flex flex-col items-center text-center p-2 md:p-3 rounded-xl glass border transition-all cursor-pointer ${
                isSelected
                  ? "border-brand-400 bg-brand-950/80 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105"
                  : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center mb-1 bg-white/5 ${dept.color}`}>
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white tracking-wider block">
                {dept.label}
              </span>
              <span className="text-[8px] md:text-[10px] text-muted-foreground hidden sm:block truncate max-w-full">
                {dept.sublabel}
              </span>
              <div className="mt-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] md:text-[9px] font-mono text-brand-300">
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
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-cyan-500/30 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-cyan-200">AI AUTOMATION</div>
            <div className="text-[10px] text-muted-foreground">Classifies, parses data & prepares actions</div>
          </div>
        </motion.div>

        {/* Step 2: Human Approval (Strict Human in the Loop) */}
        <motion.div
          animate={{ x: mousePos.x * 0.08, y: mousePos.y * 0.08 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-emerald-500/40 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              HUMAN APPROVAL
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Gatekeeper
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">Team authorizes critical decisions & edge cases</div>
          </div>
        </motion.div>

        {/* Step 3: Verified Action / Result */}
        <motion.div
          animate={{ x: mousePos.x * 0.05, y: mousePos.y * 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/15 bg-white/5 text-[11px] md:text-xs text-white font-medium text-center"
        >
          <Zap className="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <span>SYSTEM EXECUTES: CRM updated • Customer notified • ERP synchronized</span>
        </motion.div>
      </div>
    </div>
  );
}
