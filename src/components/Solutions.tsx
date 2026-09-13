"use client";

import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Headset,
  ShoppingCart,
  Database,
  TrendingUp,
  BarChart,
  Settings2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { PrecisionCard } from "@/components/PrecisionCard";

const SOLUTIONS = [
  {
    icon: Mail,
    title: "Email Operations",
    desc: "Classify incoming emails, extract key references, and route requests without manual inbox sorting.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    desc: "Parse line items from PDFs, vendor invoices, bills of lading, and purchase orders directly into your system.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Categorize support tickets, pull account history from your CRM, and stage resolved responses for operator sign-off.",
  },
  {
    icon: ShoppingCart,
    title: "Order & Refund Operations",
    desc: "Validate return requests against warranty rules, cross-check transaction logs, and stage refunds for manager approval.",
    highlight: true,
  },
  {
    icon: Database,
    title: "Data Operations",
    desc: "Synchronize records, inventory levels, and order statuses between ERPs, spreadsheets, and CRMs with zero re-keying.",
  },
  {
    icon: TrendingUp,
    title: "Sales Operations",
    desc: "Enrich inbound inquiries with company data, assign accounts by territory, and draft personalized initial outreach.",
  },
  {
    icon: BarChart,
    title: "Operational Reporting",
    desc: "Aggregate daily volume, error rates, and throughput metrics across disconnected tools into scheduled executive summaries.",
  },
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function Solutions() {
  return (
    <section id="solutions" className="py-24 relative z-10 overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header with 5-step philosophy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-semibold uppercase tracking-wider mb-4">
            Workflows We Automate
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#F6EFF5]">
            Targeted automation for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              high-volume workflows.
            </span>
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl glass border border-white/[0.06] text-xs text-[#8E8295] font-mono">
            <span>Trigger Ingestion</span>
            <span className="text-[#C9AEC6]">→</span>
            <span>Data Extraction</span>
            <span className="text-[#C9AEC6]">→</span>
            <span>Rule Validation</span>
            <span className="text-[#F6EFF5] font-bold">→</span>
            <span className="text-[#22C55E] font-bold bg-[#22C55E]/15 px-2 py-0.5 rounded border border-[#22C55E]/30">HUMAN SIGN-OFF</span>
            <span className="text-[#C9AEC6]">→</span>
            <span>SYSTEM SYNC</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 preserve-3d">
          {SOLUTIONS.map((sol, idx) => {
            const isRow1 = idx < 4;
            const directionOffset = isRow1 ? -80 : 80;
            const rotateAngle = isRow1 ? -7 : 7;
            const delayTime = (idx % 4) * 0.08 + (isRow1 ? 0 : 0.16);

            return (
              <motion.div
                key={sol.title}
                initial={{
                  opacity: 0,
                  x: directionOffset,
                  rotateY: rotateAngle,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.65,
                  delay: delayTime,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="h-full"
              >
                <PrecisionCard
                  glowColor={sol.highlight ? "rgba(34, 197, 94, 0.12)" : "rgba(201, 174, 198, 0.08)"}
                  className={`glass-card p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between group cursor-default h-full shadow-lg ${
                    sol.highlight
                      ? "border-emerald-500/30 bg-[#161616] hover:border-emerald-500/50"
                      : "border-white/[0.06] hover:border-[#C9AEC6]/30 hover:bg-[#161616] bg-[#141414]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <sol.icon className={`w-8 h-8 ${sol.highlight ? "text-emerald-400" : "text-[#8E8295] group-hover:text-[#C9AEC6]"} transition-colors`} />
                      {sol.highlight && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" /> Safe Action
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#F6EFF5] mb-3">{sol.title}</h3>
                    <p className="text-sm text-[#8E8295] leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </PrecisionCard>
              </motion.div>
            );
          })}

          {/* Custom Workflow Card - Emphasized */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={defaultViewport}
            transition={{
              duration: 0.62,
              delay: 0.32,
              ease: SPARTAN_EASE,
            }}
            whileHover={{ y: -4, scale: 1.008 }}
            className="md:col-span-2 lg:col-span-4"
          >
            <PrecisionCard
              glowColor="rgba(201, 174, 198, 0.08)"
              className="glass-card p-8 rounded-2xl border border-[#C9AEC6]/30 bg-[#161616] hover:bg-[#1A1A1A] transition-all group relative overflow-hidden h-full shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9AEC6]/[0.025] blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="p-3.5 rounded-xl bg-[#C9AEC6]/15 text-[#C9AEC6] shrink-0">
                    <Settings2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F6EFF5] mb-2">Custom Internal Workflows</h3>
                    <p className="text-[#8E8295] max-w-xl text-sm leading-relaxed">
                      If your workflow relies on legacy software, internal databases, or non-standard operational rules, we build the pipeline around your exact business logic.
                    </p>
                  </div>
                </div>
                <Link
                  href="#contact"
                  className="relative overflow-hidden px-6 py-3.5 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] text-xs sm:text-sm font-semibold uppercase font-mono tracking-wider border border-[#EAD6E6]/60 shadow-[0_0_15px_rgba(201,174,198,0.18)] hover:shadow-[0_0_24px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] whitespace-nowrap inline-flex items-center gap-2 shrink-0 group transition-all duration-150 ease-out"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
                </Link>
              </div>
            </PrecisionCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
