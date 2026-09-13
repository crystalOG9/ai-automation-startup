"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Eye,
  Network,
  Cpu,
  BarChart3,
  Maximize2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PrecisionCard } from "@/components/PrecisionCard";

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "DISCOVERY",
    desc: "Identify the repetitive tasks draining your team's weekly hours.",
    icon: MessageSquare,
    color: "text-[#e11d48]",
    glow: "bg-[#881337]/30",
  },
  {
    num: "02",
    title: "OBSERVATION",
    desc: "We review the live screens, data formats, and edge cases.",
    icon: Eye,
    color: "text-[#ffffff]",
    glow: "bg-[#881337]/30",
  },
  {
    num: "03",
    title: "ARCHITECTURE",
    desc: "We define the exact triggers, validation rules, and review gates.",
    icon: Network,
    color: "text-[#e11d48]",
    glow: "bg-[#881337]/30",
  },
  {
    num: "04",
    title: "INTEGRATION",
    desc: "We connect your existing software and build the processing pipeline.",
    icon: Cpu,
    color: "text-[#ffffff]",
    glow: "bg-[#881337]/30",
  },
  {
    num: "05",
    title: "VERIFICATION",
    desc: "We track turnaround speed, error rates, and operator hours saved.",
    icon: BarChart3,
    color: "text-[#e11d48]",
    glow: "bg-[#881337]/30",
  },
  {
    num: "06",
    title: "EXPANSION",
    desc: "Once validated, we connect the architecture to adjacent workflows.",
    icon: Maximize2,
    color: "text-[#ffffff]",
    glow: "bg-[#881337]/30",
  },
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#e11d48]/30 text-[#e11d48] text-xs font-semibold uppercase tracking-wider mb-4">
            Deployment Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Start with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fda4af] to-[#e11d48]">one workflow.</span>
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No multi-month consulting phases. We isolate a single high-friction bottleneck, deploy safe automation, and measure operational time saved.
          </p>
        </motion.div>

        {/* 6 Step Cards Grid — Sequential Upward & Depth Reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14 preserve-3d">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 55, scale: 0.93, rotateX: 7 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.62,
                  delay: idx * 0.09,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="h-full"
              >
                <PrecisionCard
                  glowColor="rgba(225, 29, 72, 0.12)"
                  className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#e11d48]/30 transition-all duration-300 group h-full flex flex-col justify-between hover:bg-white/[0.04] shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.glow} ${step.color} border border-white/5`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono font-bold text-xs text-[#e11d48] bg-[#881337]/30 px-2.5 py-1 rounded-full border border-[#e11d48]/20">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide uppercase">
                      {step.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] font-mono text-muted-foreground/60 group-hover:text-[#e11d48] transition-colors">
                    <span>Step {step.num} of 06</span>
                  </div>
                </PrecisionCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="#contact"
            className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white px-8 py-4 rounded-xl text-sm md:text-base font-semibold uppercase font-mono tracking-wider border border-[#e11d48]/60 shadow-[0_0_20px_rgba(225, 29, 72,0.3)] hover:brightness-105 hover:shadow-[0_0_30px_rgba(225, 29, 72,0.5)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </div>

      </div>
    </section>
  );
}
