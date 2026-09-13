"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Link2, BarChart2 } from "lucide-react";

const PILLARS = [
  {
    title: "WORKFLOW-SPECIFIC",
    subtitle: "Built for your exact business logic",
    desc: "No rigid templates. We map your current operational steps and code automation directly against your rules.",
    icon: Building2,
    color: "text-[#e11d48]",
    border: "border-[#881337]/40",
    glow: "bg-[#881337]/30",
  },
  {
    title: "HUMAN-CONTROLLED",
    subtitle: "Explicit authorization gates",
    desc: "High-impact actions never execute without review. Your team inspects drafted work before records update.",
    icon: ShieldCheck,
    color: "text-[#ffffff]",
    border: "border-[#881337]/40",
    glow: "bg-[#881337]/30",
  },
  {
    title: "SYSTEM-INTEGRATED",
    subtitle: "Native software connection",
    desc: "Zero database migrations. We connect directly into your ERP, CRM, inboxes, and internal spreadsheets via API or webhook.",
    icon: Link2,
    color: "text-[#e11d48]",
    border: "border-[#881337]/40",
    glow: "bg-[#881337]/30",
  },
  {
    title: "MEASURABLE",
    subtitle: "Quantifiable time and error reduction",
    desc: "We benchmark baseline cycle times before deployment and measure exact hours saved, turnaround speed, and error elimination.",
    icon: BarChart2,
    color: "text-[#ffffff]",
    border: "border-[#881337]/40",
    glow: "bg-[#881337]/30",
  },
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function ROI() {
  return (
    <section id="roi" className="py-24 relative border-t border-white/5 bg-[#090607]/60 overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#e11d48]/30 text-[#e11d48] text-xs font-semibold uppercase tracking-wider mb-4">
            Operational Standards
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            The goal isn&apos;t more AI. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fda4af] to-[#e11d48]">
              It&apos;s fewer wasted hours.
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
                className={`glass-card p-6 md:p-7 rounded-2xl border ${pillar.border} transition-all duration-300 hover:bg-white/5 flex flex-col justify-between shadow-lg`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.glow} ${pillar.color} border border-white/5 mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-wider uppercase">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#e11d48] mb-3">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
