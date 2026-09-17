"use client";

import { motion } from "framer-motion";
import { defaultViewport, SPARTAN_EASE } from "@/lib/motion";
import { PrecisionCard } from "@/components/PrecisionCard";

const STATS = [
  {
    value: "03",
    label: "TEAM MEMBERS",
    subtext: "Engineering, APIs & marketing in-house",
    tag: "VERIFIED",
  },
  {
    value: "100%",
    label: "CUSTOM ARCHITECTURE",
    subtext: "Zero rigid templates. Built around your real tools",
    tag: "APPROACH",
  },
  {
    value: "15+",
    label: "SUPPORTED INTEGRATIONS",
    subtext: "WhatsApp, CRM, ERPs, databases, webhooks & APIs",
    tag: "CONNECTIVITY",
  },
  {
    value: "< 24h",
    label: "ASSESSMENT TURNAROUND",
    subtext: "Direct feedback on whether your process can automate",
    tag: "SPEED",
  },
];

export function StatsProof() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#0A0A0A] border-y border-white/[0.06] perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Subtle section label */}
        <div className="flex items-center justify-between gap-4 mb-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6]" />
            <span className="text-[11px] font-mono tracking-widest text-[#8E8295] uppercase">
              Proof &amp; Ground Truth
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8E8295]/60 hidden sm:inline">
            NO INVENTED METRICS // DIRECT REPO &amp; STUDIO REALITY
          </span>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={defaultViewport}
              transition={{
                duration: 0.52,
                delay: idx * 0.08,
                ease: SPARTAN_EASE,
              }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <PrecisionCard
                glowColor="rgba(201, 174, 198, 0.08)"
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#121212] hover:border-[#C9AEC6]/40 transition-all duration-300 h-full flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9AEC6]/80 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                      {stat.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#8E8295]/40 group-hover:text-[#C9AEC6]/60 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F6EFF5] tracking-tight font-sans mb-2 group-hover:text-white transition-colors">
                    {stat.value}
                  </div>

                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] mb-1.5">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-[#8E8295] leading-relaxed mt-4 pt-3 border-t border-white/[0.04]">
                  {stat.subtext}
                </p>
              </PrecisionCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
