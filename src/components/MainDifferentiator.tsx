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
import Link from "next/link";

const DIFFERENTIATOR_STEPS = [
  {
    step: "01",
    label: "YOUR BUSINESS",
    subtitle: "Your unique operations, tools, and domain rules",
    icon: Building2,
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgGlow: "bg-blue-500/10",
  },
  {
    step: "02",
    label: "YOUR WORKFLOW",
    subtitle: "How information actually moves through your teams",
    icon: GitBranch,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgGlow: "bg-cyan-500/10",
  },
  {
    step: "03",
    label: "REPETITIVE STEPS",
    subtitle: "Manual copy-paste, formatting, inbox triage, lookup loops",
    icon: Repeat,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgGlow: "bg-amber-500/10",
  },
  {
    step: "04",
    label: "WHAT CAN BE AUTOMATED?",
    subtitle: "Predictable parsing, validation, queries, and draft creation",
    icon: Cpu,
    color: "text-brand-400",
    borderColor: "border-brand-500/30",
    bgGlow: "bg-brand-500/10",
  },
  {
    step: "05",
    label: "WHAT SHOULD STAY HUMAN?",
    subtitle: "Strategic decisions, approvals, exceptions, and relationships",
    icon: UserCheck,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgGlow: "bg-emerald-500/10",
    highlight: true,
  },
  {
    step: "06",
    label: "CUSTOM AUTOMATION",
    subtitle: "End-to-end connected workflow with built-in human control",
    icon: Sparkles,
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgGlow: "bg-purple-500/10",
  },
];

export function MainDifferentiator() {
  return (
    <section id="differentiator" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#030712] via-brand-950/20 to-[#030712]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            The Automation Philosophy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase leading-tight"
          >
            EVERY BUSINESS HAS A WORKFLOW <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">
              WORTH QUESTIONING.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Every company works differently. We understand the workflow first, identify the repetitive work, and then design automation around it.
          </motion.p>
        </div>

        {/* Visual Workflow Chain */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Desktop Vertical Central Line */}
            <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-blue-500/30 via-emerald-500/30 to-purple-500/30 -z-0" />

            <div className="space-y-4 md:space-y-6 relative z-10">
              {DIFFERENTIATOR_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: idx * 0.08 }}
                    className="group"
                  >
                    <div
                      className={`glass-card p-5 md:p-6 rounded-2xl border ${step.borderColor} transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        step.highlight ? "bg-emerald-950/20 border-emerald-500/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bgGlow} ${step.color} border border-white/5 shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-muted-foreground">{step.step}</span>
                            <h3 className="text-base md:text-lg font-bold text-white tracking-wide uppercase">
                              {step.label}
                            </h3>
                            {step.highlight && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                Essential
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/5 text-muted-foreground/60 group-hover:text-brand-400 transition-colors">
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
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] group"
            >
              SHOW US YOUR WORKFLOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
