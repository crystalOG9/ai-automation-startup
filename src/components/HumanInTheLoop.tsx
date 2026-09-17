"use client";

import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, CheckCircle2, UserCheck, Bot, Cpu, Sparkles } from "lucide-react";
import { defaultViewport, scaleReveal, SPARTAN_EASE } from "@/lib/motion";

const PIPELINE_NODES = [
  {
    step: "01",
    label: "AUTOMATION",
    desc: "Ingests data, monitors inboxes & listens for system triggers.",
    icon: Cpu,
    highlight: false,
  },
  {
    step: "02",
    label: "PROCESS",
    desc: "Normalizes records, maps schemas & validates business rules.",
    icon: Bot,
    highlight: false,
  },
  {
    step: "03",
    label: "AI / LOGIC",
    desc: "Extracts unstructured information & drafts proposed actions.",
    icon: Sparkles,
    highlight: false,
  },
  {
    step: "04",
    label: "HUMAN CHECK",
    desc: "Supervisor review & explicit authorization for critical tasks.",
    icon: UserCheck,
    highlight: true,
  },
  {
    step: "05",
    label: "ACTION",
    desc: "Final commit: update CRM, send verified email, trigger payout.",
    icon: CheckCircle2,
    highlight: false,
  },
];

export function HumanInTheLoop() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A] perspective-1200">
      {/* Subtle centered backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#C9AEC6]/[0.025] blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9AEC6]" />
            <span>Operational Safety</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans mb-6 leading-tight">
            AUTOMATION DOESN&apos;T MEAN <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              GIVING THE ROBOT THE KEYS.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#BAAEC0] max-w-2xl mx-auto leading-relaxed font-normal">
            We automate repetitive work while keeping humans in control of important decisions.
          </p>
        </motion.div>

        {/* Clean Minimal Visual Flow: AUTOMATION -> PROCESS -> AI / LOGIC -> HUMAN CHECK -> ACTION */}
        <div className="max-w-5xl mx-auto">
          
          {/* Desktop Horizontal Pipeline */}
          <div className="hidden lg:grid grid-cols-5 gap-3 items-stretch relative">
            {PIPELINE_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isHuman = node.highlight;

              return (
                <div key={node.label} className="relative flex flex-col justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={defaultViewport}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: SPARTAN_EASE,
                    }}
                    whileHover={{ y: -4 }}
                    className={`p-5 rounded-2xl border transition-all duration-200 h-full flex flex-col justify-between ${
                      isHuman
                        ? "bg-[#161616] border-[#C9AEC6]/60 shadow-[0_0_20px_rgba(201,174,198,0.12)] ring-1 ring-[#C9AEC6]/40"
                        : "bg-[#121212] border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                            isHuman
                              ? "bg-[#C9AEC6]/15 border-[#C9AEC6]/30 text-[#C9AEC6]"
                              : "bg-white/[0.03] border-white/[0.08] text-[#8E8295]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isHuman ? "text-[#C9AEC6]" : "text-[#8E8295]/50"
                          }`}
                        >
                          {node.step}
                        </span>
                      </div>

                      <h3
                        className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                          isHuman ? "text-[#F6EFF5]" : "text-[#F6EFF5]/90"
                        }`}
                      >
                        {node.label}
                      </h3>

                      <p className="text-[11px] text-[#8E8295] leading-relaxed">
                        {node.desc}
                      </p>
                    </div>

                    {isHuman && (
                      <div className="mt-4 pt-2 border-t border-[#C9AEC6]/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] animate-pulse" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C9AEC6]">
                          Mandatory Gate
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Connector Arrow for all except last */}
                  {idx < PIPELINE_NODES.length - 1 && (
                    <div className="hidden" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile & Tablet Vertical Pipeline */}
          <div className="lg:hidden space-y-3 max-w-md mx-auto">
            {PIPELINE_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isHuman = node.highlight;

              return (
                <div key={node.label} className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={defaultViewport}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.06,
                      ease: SPARTAN_EASE,
                    }}
                    className={`p-5 rounded-2xl border flex items-start gap-4 ${
                      isHuman
                        ? "bg-[#161616] border-[#C9AEC6]/60 shadow-[0_0_15px_rgba(201,174,198,0.12)] ring-1 ring-[#C9AEC6]/30"
                        : "bg-[#121212] border-white/[0.08]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isHuman
                          ? "bg-[#C9AEC6]/15 border-[#C9AEC6]/30 text-[#C9AEC6]"
                          : "bg-white/[0.04] border-white/[0.08] text-[#8E8295]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F6EFF5]">
                          {node.label}
                        </h3>
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isHuman ? "text-[#C9AEC6]" : "text-[#8E8295]/50"
                          }`}
                        >
                          {node.step}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E8295] leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </motion.div>

                  {idx < PIPELINE_NODES.length - 1 && (
                    <div className="flex justify-center py-0.5 text-[#C9AEC6]/50">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Minimal reassurance tag below */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-[#8E8295]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span>Machines handle the brute force. People make the decisions.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
