"use client";

import Image from "next/image";
import { Mail, Building2, FileSpreadsheet, Database, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

export function Hero3DFallback() {
  const nodes = [
    { id: "email", label: "EMAIL", sublabel: "Orders & Tickets", icon: Mail, color: "text-blue-400", border: "border-blue-500/30" },
    { id: "crm", label: "CRM", sublabel: "Pipeline & Leads", icon: Building2, color: "text-cyan-400", border: "border-cyan-500/30" },
    { id: "tally", label: "TALLY", sublabel: "Invoices & Ledgers", icon: FileSpreadsheet, color: "text-indigo-400", border: "border-indigo-500/30" },
    { id: "data", label: "DATA", sublabel: "Databases & ERP", icon: Database, color: "text-emerald-400", border: "border-emerald-500/30" },
    { id: "orders", label: "ORDERS", sublabel: "Fulfillment & Dispatch", icon: ShoppingBag, color: "text-amber-400", border: "border-amber-500/30" },
  ];

  return (
    <div
      className="relative w-full h-[600px] md:h-[660px] rounded-3xl border border-white/10 bg-[#060b17]/90 backdrop-blur-xl overflow-hidden p-6 shadow-2xl flex flex-col justify-between select-none"
      aria-label="SPARTAN Automation Core Architectural Flow"
    >
      {/* Background blueprint grid */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-600/[0.12] blur-[100px] rounded-full pointer-events-none" />

      {/* Header bar: System status */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-300">
            WORKFLOW ORCHESTRATION // SYSTEM ONLINE
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-950 border border-brand-500/30 text-brand-300">
          CORE v3.4
        </span>
      </div>

      {/* Main Orchestration Layout */}
      <div className="relative z-10 my-auto flex flex-col items-center gap-6">
        {/* Row 1: Business Nodes */}
        <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border bg-slate-950/70 ${node.border}`}
              >
                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center mb-1 ${node.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-white tracking-wider">{node.label}</span>
                <span className="text-[8px] text-slate-400 truncate max-w-full hidden sm:block">{node.sublabel}</span>
              </div>
            );
          })}
        </div>

        {/* Connecting flow lines SVG */}
        <div className="relative w-full max-w-md h-12 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 48" fill="none" preserveAspectRatio="none">
            <path d="M 40,0 C 40,30 200,10 200,48" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 120,0 C 120,25 200,15 200,48" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 200,0 L 200,48" stroke="rgba(59, 130, 246, 0.7)" strokeWidth="1.8" />
            <path d="M 280,0 C 280,25 200,15 200,48" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 360,0 C 360,30 200,10 200,48" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Center: SPARTAN Automation Core */}
        <div className="relative flex flex-col items-center">
          {/* Orbital Ring Graphic */}
          <div className="relative w-36 h-36 rounded-full border border-brand-500/40 p-2 flex items-center justify-center bg-brand-950/40 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
            <div className="absolute inset-1 rounded-full border border-dashed border-brand-400/30 animate-[spin_30s_linear_infinite]" />
            <div className="relative w-20 h-20 flex items-center justify-center">
              <Image
                src="/branding/spartan-logo.png"
                alt="SPARTAN Automation Core"
                width={80}
                height={80}
                className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                priority
              />
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-500/40 text-[10px] font-mono text-brand-300">
            <span className="text-cyan-300 font-semibold">UNDERSTAND</span>
            <span className="text-slate-500">➔</span>
            <span className="text-brand-300 font-semibold">AUTOMATE</span>
          </div>
        </div>

        {/* Downstream Path to Execution */}
        <div className="w-px h-6 bg-gradient-to-b from-brand-500/70 to-emerald-500/70" />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Human Approval */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HUMAN APPROVAL</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
              Gatekeeper
            </span>
          </div>

          <span className="text-slate-500 hidden sm:inline">➔</span>

          {/* System Execution */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>SYSTEM EXECUTE</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>ORCHESTRATION ENGINE</span>
        <span className="text-emerald-400">HUMANS IN CONTROL</span>
      </div>
    </div>
  );
}
