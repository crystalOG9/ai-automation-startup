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

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "TELL US",
    desc: "Tell us what takes your team too long.",
    icon: MessageSquare,
    color: "text-blue-400",
    glow: "bg-blue-500/10",
  },
  {
    num: "02",
    title: "OBSERVE",
    desc: "We understand the real process.",
    icon: Eye,
    color: "text-cyan-400",
    glow: "bg-cyan-500/10",
  },
  {
    num: "03",
    title: "MAP",
    desc: "We identify every step.",
    icon: Network,
    color: "text-indigo-400",
    glow: "bg-indigo-500/10",
  },
  {
    num: "04",
    title: "AUTOMATE",
    desc: "We automate the safe repetitive parts.",
    icon: Cpu,
    color: "text-brand-400",
    glow: "bg-brand-500/10",
  },
  {
    num: "05",
    title: "MEASURE",
    desc: "We compare before and after.",
    icon: BarChart3,
    color: "text-emerald-400",
    glow: "bg-emerald-500/10",
  },
  {
    num: "06",
    title: "EXPAND",
    desc: "If it works, we expand.",
    icon: Maximize2,
    color: "text-purple-400",
    glow: "bg-purple-500/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Engagement Roadmap
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            START WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">ONE WORKFLOW.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            You don&apos;t need to transform your entire company overnight. We begin with a single high-friction process, prove the value, and build from there.
          </motion.p>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-all duration-300 group relative flex flex-col justify-between hover:bg-white/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.glow} ${step.color} border border-white/5`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono font-bold text-xs text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
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

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] font-mono text-muted-foreground/60 group-hover:text-brand-300 transition-colors">
                  <span>Step {step.num} of 06</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] group"
          >
            START WITH YOUR FIRST WORKFLOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
