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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-[#F6EFF5]">
            Automation with strict human control. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">Not unmonitored autonomy.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#8E8295] leading-relaxed">
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
            className="glass-card p-7 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#141414] flex flex-col justify-between shadow-lg hover:border-[#22C55E]/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                <h3 className="text-xl font-bold text-[#F6EFF5] tracking-tight">Automatic</h3>
              </div>
              <p className="text-sm text-[#8E8295] mb-8 leading-relaxed">
                Deterministic, low-risk tasks like data formatting, record tagging, and draft creation.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/[0.06] text-xs font-mono">
              <span className="font-semibold text-[#C9AEC6]">AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-[#22C55E] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" /> Execute
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
            className="glass-card p-7 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#141414] flex flex-col justify-between shadow-lg hover:border-[#C9AEC6]/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                <h3 className="text-xl font-bold text-[#F6EFF5] tracking-tight">Review</h3>
              </div>
              <p className="text-sm text-[#8E8295] mb-8 leading-relaxed">
                Edge cases, low-confidence extractions, and non-standard inquiries flagged for quick operator review.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/[0.06] text-xs font-mono">
              <span className="font-semibold text-[#C9AEC6]">AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" /> Human Review
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
            className="glass-card p-7 sm:p-8 rounded-2xl border border-[#C9AEC6]/40 bg-[#161616] flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#C9AEC6]/70 transition-colors"
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
              className="absolute inset-0 bg-gradient-to-br from-[#C9AEC6]/[0.08] to-[#141414] pointer-events-none rounded-2xl"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9AEC6]"></span>
                  </span>
                  <h3 className="text-xl font-bold text-[#F6EFF5] tracking-tight">Approval Required</h3>
                </div>

                {/* Status indicator: SYSTEM PAUSED / WAITING FOR HUMAN DECISION */}
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-[#C9AEC6]/15 text-[#C9AEC6] border border-[#C9AEC6]/30 uppercase font-semibold">
                  Gatekeeper
                </span>
              </div>
              <p className="text-sm text-[#BAAEC0] mb-8 leading-relaxed">
                Financial transactions, contract changes, and external communications that require explicit manager authorization.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/60 border border-[#C9AEC6]/30 text-xs font-mono shadow-[0_0_15px_rgba(201,174,198,0.08)]">
              <span className="font-semibold text-[#C9AEC6]">AI Prepares</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-[#F6EFF5] flex items-center gap-1.5 bg-[#C9AEC6]/15 px-2 py-0.5 rounded border border-[#C9AEC6]/40">
                <ShieldAlert className="w-4 h-4 text-[#C9AEC6] shrink-0" /> Human Approval
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-semibold text-[#22C55E]">Execute</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
