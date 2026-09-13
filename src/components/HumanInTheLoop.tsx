"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";

import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleReveal,
  defaultViewport,
} from "@/lib/motion";

export function HumanInTheLoop() {
  return (
    <section className="py-24 relative overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Automation with strict human control. <br className="hidden md:block" />
            <span className="text-[#a3959a]">Not unmonitored autonomy.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every workflow enforces clear permission tiers. You define which routine steps execute automatically and which actions require supervisor sign-off.
          </p>
        </motion.div>

        {/* 3 Main Content Blocks: Left, Bottom, Right */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6 items-stretch preserve-3d">
          
          {/* BLOCK 1 → From Left (Automatic Level) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
            whileHover={{ y: -6, scale: 1.015 }}
            className="glass-card p-7 sm:p-8 rounded-2xl border border-green-500/20 bg-green-950/10 flex flex-col justify-between shadow-lg hover:border-green-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                <h3 className="text-xl font-bold text-white tracking-tight">Automatic</h3>
              </div>
              <p className="text-sm text-slate-300/80 mb-8 leading-relaxed">
                Deterministic, low-risk tasks like data formatting, record tagging, and draft creation.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
              <span className="font-semibold text-brand-300">AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-green-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Execute
              </span>
            </div>
          </motion.div>

          {/* BLOCK 2 → From Bottom (Review Level) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.015 }}
            className="glass-card p-7 sm:p-8 rounded-2xl border border-yellow-500/20 bg-yellow-950/10 flex flex-col justify-between shadow-lg hover:border-yellow-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                <h3 className="text-xl font-bold text-white tracking-tight">Review</h3>
              </div>
              <p className="text-sm text-slate-300/80 mb-8 leading-relaxed">
                Edge cases, low-confidence extractions, and non-standard inquiries flagged for quick operator review.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
              <span className="font-semibold text-brand-300">AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-yellow-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" /> Human Review
              </span>
            </div>
          </motion.div>

          {/* BLOCK 3 → From Right (Approval Level with Settling Pause State) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            whileHover={{ y: -6, scale: 1.015 }}
            className="glass-card p-7 sm:p-8 rounded-2xl border border-[#e11d48]/40 bg-[#1c1114]/40 flex flex-col justify-between shadow-xl relative overflow-hidden group"
          >
            {/* Subtle settling ambient breathing glow indicating waiting for decision */}
            <motion.div
              animate={{
                opacity: [0.35, 0.65, 0.35],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#881337]/20 to-[#e11d48]/5 pointer-events-none rounded-2xl"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e11d48] opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e11d48]"></span>
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">Approval Required</h3>
                </div>

                {/* Status indicator: SYSTEM PAUSED / WAITING FOR HUMAN DECISION */}
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-[#e11d48]/20 text-[#fda4af] border border-[#e11d48]/30 uppercase font-semibold">
                  Gatekeeper
                </span>
              </div>
              <p className="text-sm text-slate-300/80 mb-8 leading-relaxed">
                Financial transactions, contract changes, and external communications that require explicit manager authorization.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/60 border border-[#e11d48]/30 text-xs font-mono shadow-[0_0_15px_rgba(225,29,72,0.12)]">
              <span className="font-semibold text-brand-300">AI Prepares</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-[#fda4af] flex items-center gap-1.5 bg-[#e11d48]/15 px-2 py-0.5 rounded border border-[#e11d48]/40">
                <ShieldAlert className="w-4 h-4 text-[#e11d48] shrink-0" /> Human Approval
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-green-400">Execute</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
