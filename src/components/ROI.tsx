"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Link2, BarChart2 } from "lucide-react";

const PILLARS = [
  {
    title: "WORKFLOW-SPECIFIC",
    subtitle: "Engineered around your actual process",
    desc: "We don't force you into generic SaaS templates. We study your exact operational workflow and build custom automation that fits your business logic.",
    icon: Building2,
    color: "text-blue-400",
    border: "border-blue-500/30",
    glow: "bg-blue-500/10",
  },
  {
    title: "HUMAN-CONTROLLED",
    subtitle: "Your team stays in the driver's seat",
    desc: "AI handles repetitive reading, extraction, and drafting. Strategic judgments, edge cases, and high-value approvals remain strictly in human hands.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "bg-emerald-500/10",
  },
  {
    title: "SYSTEM-INTEGRATED",
    subtitle: "Connected directly into your stack",
    desc: "We design automation around the tools your team already uses — including ERP, CRM, spreadsheets, email and custom systems.",
    icon: Link2,
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "bg-cyan-500/10",
  },
  {
    title: "MEASURABLE",
    subtitle: "Track tangible operational impact",
    desc: "We measure concrete cycle time reduction, throughput speed, and error elimination so you can clearly evaluate before-and-after operational performance.",
    icon: BarChart2,
    color: "text-purple-400",
    border: "border-purple-500/30",
    glow: "bg-purple-500/10",
  },
];

export function ROI() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-brand-950/15 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Our Core Principles
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            THE GOAL ISN&apos;T MORE AI. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">
              IT&apos;S LESS WASTED TIME.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We evaluate success through 4 uncompromising standards on every single automation project.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card p-6 md:p-7 rounded-2xl border ${pillar.border} transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.glow} ${pillar.color} border border-white/5 mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-wider uppercase">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-300 mb-3">
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
