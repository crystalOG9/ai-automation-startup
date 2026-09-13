"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Link2, BarChart2 } from "lucide-react";

const PILLARS = [
  {
    title: "WORKFLOW-SPECIFIC",
    subtitle: "Built for your exact business logic",
    desc: "No rigid templates. We map your current operational steps and code automation directly against your rules.",
    icon: Building2,
    color: "text-[#C9AEC6]",
    border: "border-white/[0.06]",
    glow: "bg-[#C9AEC6]/10",
  },
  {
    title: "HUMAN-CONTROLLED",
    subtitle: "Explicit authorization gates",
    desc: "High-impact actions never execute without review. Your team inspects drafted work before records update.",
    icon: ShieldCheck,
    color: "text-[#C9AEC6]",
    border: "border-[#C9AEC6]/30",
    glow: "bg-[#C9AEC6]/15",
  },
  {
    title: "SYSTEM-INTEGRATED",
    subtitle: "Native software connection",
    desc: "Zero database migrations. We connect directly into your ERP, CRM, inboxes, and internal spreadsheets via API or webhook.",
    icon: Link2,
    color: "text-[#C9AEC6]",
    border: "border-white/[0.06]",
    glow: "bg-[#C9AEC6]/10",
  },
  {
    title: "MEASURABLE",
    subtitle: "Quantifiable time and error reduction",
    desc: "We benchmark baseline cycle times before deployment and measure exact hours saved, turnaround speed, and error elimination.",
    icon: BarChart2,
    color: "text-[#22C55E]",
    border: "border-white/[0.06]",
    glow: "bg-[#22C55E]/10",
  },
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function ROI() {
  return (
    <section id="roi" className="py-24 relative border-t border-white/[0.06] bg-[#0B0B0B] overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-semibold uppercase tracking-wider mb-4">
            Operational Standards
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F6EFF5] mb-6">
            The goal isn&apos;t more AI. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              It&apos;s fewer wasted hours.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#8E8295] max-w-2xl mx-auto leading-relaxed">
            Every workflow we deploy is evaluated against measurable operational efficiency, not technology novelty.
          </p>
        </motion.div>

        {/* 4 Pillars Grid — 3D Elevation Entrance */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto preserve-3d">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 35, scale: 0.95, rotateX: 4 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.54,
                  delay: idx * 0.09,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -4, scale: 1.015 }}
                className={`glass-card p-6 md:p-7 rounded-2xl border ${pillar.border} bg-[#141414] transition-all duration-300 hover:bg-[#161616] flex flex-col justify-between shadow-lg`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.glow} ${pillar.color} border border-white/5 mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-[#F6EFF5] mb-1.5 tracking-wider uppercase">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#C9AEC6] mb-3">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs md:text-sm text-[#8E8295] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
