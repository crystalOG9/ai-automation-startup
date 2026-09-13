"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Link2, BarChart2, Check, X } from "lucide-react";

const REASONS = [
  {
    title: "Direct System Integration",
    desc: "Chatbots require manual copy-pasting. SPARTAN connects directly to your databases, inboxes, and operational software.",
    icon: Link2,
  },
  {
    title: "Deterministic Validation",
    desc: "Generic models guess. We enforce strict schema validation, threshold checks, and mandatory sign-offs on sensitive steps.",
    icon: ShieldCheck,
  },
  {
    title: "End-to-End Execution",
    desc: "Generic AI outputs suggestions in a chat window. Our pipelines stage the update, log the audit trail, and sync records.",
    icon: Building2,
  },
  {
    title: "Zero Staff Retraining",
    desc: "Your operators never have to learn prompt engineering. The automation runs silently behind the software they already know.",
    icon: BarChart2,
  },
];

const COMPARISON = [
  {
    generic: "User manually copies data into a chat window",
    ours: "Triggers automatically from existing inboxes or APIs",
  },
  {
    generic: "Generic prompts with zero operational context",
    ours: "Configured to your specific SKUs, rules, and formats",
  },
  {
    generic: "Operator must manually re-check and paste answers",
    ours: "System validates data and stages drafts ready for approval",
  },
  {
    generic: "Siloed from your internal databases",
    ours: "Direct two-way sync with your ERP, CRM, and spreadsheets",
  },
  {
    generic: "Forces your team to adapt to new software",
    ours: "Built entirely around your team's existing software habits",
  },
];

import {
  scaleReveal,
  depthReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden perspective-1200">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#141414]/40 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-[#F6EFF5]">
            Why not just use <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">a generic AI tool?</span>
          </h2>
        </motion.div>

        {/* 4 Reasons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20 preserve-3d">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 32, scale: 0.95, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={defaultViewport}
              transition={{
                duration: 0.54,
                delay: idx * 0.08,
                ease: SPARTAN_EASE,
              }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="glass-card p-6 rounded-2xl border border-white/[0.06] hover:border-[#C9AEC6]/30 transition-all shadow-lg bg-[#141414]"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C9AEC6]/10 flex items-center justify-center mb-4 text-[#C9AEC6]">
                <reason.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#F6EFF5] mb-2">{reason.title}</h3>
              <p className="text-sm text-[#8E8295] leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table — Depth Reveal */}
        <div className="max-w-4xl mx-auto preserve-3d">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={depthReveal}
            className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden shadow-2xl bg-[#141414]"
          >
            <div className="grid grid-cols-2 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="p-4 md:p-6 text-center md:text-left font-semibold text-[#8E8295]">Generic AI Tool</div>
              <div className="p-4 md:p-6 text-center md:text-left font-bold text-[#C9AEC6] bg-[#C9AEC6]/[0.04]">Our Approach</div>
            </div>
            
            <div className="divide-y divide-white/[0.06]">
              {COMPARISON.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 hover:bg-white/[0.02] transition-colors">
                  <div className="p-4 md:p-6 text-sm md:text-base text-[#8E8295] flex items-start md:items-center gap-3">
                    <X className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5 md:mt-0" />
                    <span>{row.generic}</span>
                  </div>
                  <div className="p-4 md:p-6 text-sm md:text-base text-[#F6EFF5] font-medium bg-[#C9AEC6]/[0.03] flex items-start md:items-center gap-3">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5 md:mt-0" />
                    <span>{row.ours}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
