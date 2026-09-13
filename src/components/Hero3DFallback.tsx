"use client";

import Image from "next/image";
import { Mail, Building2, FileSpreadsheet, Database, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

export function Hero3DFallback() {
  const nodes = [
    { id: "email", label: "EMAIL", sublabel: "Orders & Tickets", icon: Mail, color: "text-[#BAAEC0]", border: "border-white/10" },
    { id: "crm", label: "CRM", sublabel: "Pipeline & Leads", icon: Building2, color: "text-[#BAAEC0]", border: "border-white/10" },
    { id: "tally", label: "TALLY", sublabel: "Invoices & Ledgers", icon: FileSpreadsheet, color: "text-[#BAAEC0]", border: "border-white/10" },
    { id: "data", label: "DATA", sublabel: "Databases & ERP", icon: Database, color: "text-[#BAAEC0]", border: "border-white/10" },
    { id: "orders", label: "ORDERS", sublabel: "Fulfillment & Dispatch", icon: ShoppingBag, color: "text-[#BAAEC0]", border: "border-white/10" },
  ];

  return (
    <div
      className="relative w-full h-[600px] md:h-[660px] rounded-3xl border border-white/[0.08] bg-[#0B0B0B]/95 backdrop-blur-xl overflow-hidden p-6 shadow-2xl flex flex-col justify-between select-none"
      aria-label="SPARTAN Automation Core Architectural Flow"
    >
      {/* Background blueprint grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(201, 174, 198, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201, 174, 198, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C9AEC6]/[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Header bar: System status */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C9AEC6] animate-pulse shadow-[0_0_8px_#C9AEC6]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#F6EFF5]">
            WORKFLOW ORCHESTRATION // SYSTEM ONLINE
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] border border-[#C9AEC6]/30 text-[#C9AEC6]">
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
                className={`flex flex-col items-center text-center p-2.5 rounded-xl border bg-[#141414]/90 border-white/[0.08]`}
              >
                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center mb-1 ${node.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#F6EFF5] tracking-wider">{node.label}</span>
                <span className="text-[8px] text-[#8E8295] truncate max-w-full hidden sm:block">{node.sublabel}</span>
              </div>
            );
          })}
        </div>

        {/* Connecting flow lines SVG */}
        <div className="relative w-full max-w-md h-12 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 48" fill="none" preserveAspectRatio="none">
            <path d="M 40,0 C 40,30 200,10 200,48" stroke="rgba(201, 174, 198, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 120,0 C 120,25 200,15 200,48" stroke="rgba(201, 174, 198, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 200,0 L 200,48" stroke="rgba(201, 174, 198, 0.75)" strokeWidth="1.8" />
            <path d="M 280,0 C 280,25 200,15 200,48" stroke="rgba(201, 174, 198, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 360,0 C 360,30 200,10 200,48" stroke="rgba(201, 174, 198, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Center: SPARTAN Automation Core */}
        <div className="relative flex flex-col items-center">
          {/* Orbital Ring Graphic */}
          <div className="relative w-36 h-36 rounded-full border border-[#C9AEC6]/35 p-2 flex items-center justify-center bg-[#111111] shadow-[0_0_35px_rgba(201,174,198,0.15)]">
            <div className="absolute inset-1 rounded-full border border-dashed border-[#C9AEC6]/30 animate-[spin_30s_linear_infinite]" />
            <div className="relative w-20 h-20 flex items-center justify-center">
              <Image
                src="/branding/spartan-galaxy-logo.png"
                alt="SPARTAN Automation Core"
                width={80}
                height={80}
                className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(201,174,198,0.45)]"
                priority
              />
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#C9AEC6]/30 text-[10px] font-mono text-[#F6EFF5]">
            <span className="text-[#F6EFF5] font-semibold">UNDERSTAND</span>
            <span className="text-[#C9AEC6]">➔</span>
            <span className="text-[#C9AEC6] font-semibold">AUTOMATE</span>
          </div>
        </div>

        {/* Downstream Path to Execution */}
        <div className="w-px h-6 bg-gradient-to-b from-[#C9AEC6]/60 to-[#22C55E]/60" />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Human Approval */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#C9AEC6]/40 bg-[#161616] text-[#F6EFF5] text-xs font-mono shadow-[0_0_15px_rgba(201,174,198,0.12)]">
            <ShieldCheck className="w-4 h-4 text-[#C9AEC6]" />
            <span>HUMAN APPROVAL</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C9AEC6]/15 text-[#C9AEC6] border border-[#C9AEC6]/30 uppercase">
              Gatekeeper
            </span>
          </div>

          <span className="text-[#8E8295] hidden sm:inline">➔</span>

          {/* System Execution */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#22C55E]/40 bg-[#141414] text-[#F6EFF5] text-xs font-mono">
            <Zap className="w-4 h-4 text-[#22C55E]" />
            <span>SYSTEM EXECUTE</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#8E8295]">
        <span>ORCHESTRATION ENGINE</span>
        <span className="text-[#C9AEC6]">HUMANS IN CONTROL</span>
      </div>
    </div>
  );
}
