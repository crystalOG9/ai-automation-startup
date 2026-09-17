"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GitBranch,
  Repeat,
  Sparkles,
  UserCheck,
  Cpu,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const DIFFERENTIATOR_STEPS = [
  {
    step: "01",
    label: "OPERATIONAL INTAKE",
    subtitle: "Documenting your daily tools, spreadsheets, and domain rules",
    icon: Building2,
    color: "text-[#C9AEC6]",
    borderColor: "border-white/[0.06]",
    bgGlow: "bg-[#C9AEC6]/10",
  },
  {
    step: "02",
    label: "HANDOFF MAPPING",
    subtitle: "Tracing how information moves across teams and software",
    icon: GitBranch,
    color: "text-[#C9AEC6]",
    borderColor: "border-white/[0.06]",
    bgGlow: "bg-[#C9AEC6]/10",
  },
  {
    step: "03",
    label: "BOTTLENECK AUDIT",
    subtitle: "Isolating repetitive lookups, re-keying, and routine triage",
    icon: Repeat,
    color: "text-[#C9AEC6]",
    borderColor: "border-white/[0.06]",
    bgGlow: "bg-[#C9AEC6]/10",
  },
  {
    step: "04",
    label: "DETERMINISTIC PROCESSING",
    subtitle: "Parsing unstructured inputs, querying APIs, and drafting records",
    icon: Cpu,
    color: "text-[#C9AEC6]",
    borderColor: "border-white/[0.06]",
    bgGlow: "bg-[#C9AEC6]/10",
  },
  {
    step: "05",
    label: "HUMAN OVERSIGHT GATES",
    subtitle: "Exception handling, value thresholds, and final sign-offs",
    icon: UserCheck,
    color: "text-[#C9AEC6]",
    borderColor: "border-[#C9AEC6]/40",
    bgGlow: "bg-[#C9AEC6]/15",
    highlight: true,
  },
  {
    step: "06",
    label: "PRODUCTION DEPLOYMENT",
    subtitle: "A connected pipeline with audit logging and zero workflow disruption",
    icon: Sparkles,
    color: "text-[#22C55E]",
    borderColor: "border-white/[0.06]",
    bgGlow: "bg-[#22C55E]/15",
  },
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function MainDifferentiator() {
  return (
    <section id="differentiator" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B] perspective-1200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#141414]/50 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-semibold uppercase tracking-wider mb-4">
            The Engineering Method
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F6EFF5] mb-6 leading-tight">
            Automate the mechanical steps. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              Protect the human decisions.
            </span>
          </h2>

          <p className="text-base md:text-xl text-[#8E8295] max-w-2xl mx-auto leading-relaxed">
            We don&apos;t force you to change how you operate. We map each handoff, automate routine processing, and keep approvals in your team&apos;s hands.
          </p>
        </motion.div>

        {/* Visual Workflow Chain — Sequential upward & depth reveal */}
        <div className="max-w-4xl mx-auto preserve-3d">
          <div className="relative">
            <div className="space-y-4 md:space-y-6 relative z-10">
              {DIFFERENTIATOR_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 55, scale: 0.93, rotateX: 7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={defaultViewport}
                    transition={{
                      duration: 0.62,
                      delay: idx * 0.09,
                      ease: SPARTAN_EASE,
                    }}
                    whileHover={{ y: -5, scale: 1.012 }}
                    className="group"
                  >
                    <div
                      className={`glass-card p-5 md:p-6 rounded-2xl border ${step.borderColor} transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,174,198,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        step.highlight ? "bg-[#1A1A1A] border-[#C9AEC6]/50 shadow-[0_0_20px_rgba(201,174,198,0.12)]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bgGlow} ${step.color} border border-white/5 shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-[#8E8295]">{step.step}</span>
                            <h3 className="text-base md:text-lg font-bold text-[#F6EFF5] tracking-wide uppercase">
                              {step.label}
                            </h3>
                            {step.highlight && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C9AEC6]/20 text-[#C9AEC6] border border-[#C9AEC6]/40">
                                Essential
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-[#8E8295]">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/5 text-[#8E8295]/60 group-hover:text-[#C9AEC6] transition-colors">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="#contact"
              onClick={(e) => scrollToSection("#contact", e)}
              className="inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-full text-sm sm:text-base font-semibold transition-all hover:shadow-[0_0_25px_rgba(201,174,198,0.25)] group cursor-pointer font-mono uppercase tracking-wider"
            >
              REQUEST WORKFLOW AUDIT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
