"use client";

import { motion } from "framer-motion";
import { FolderGit2, ArrowRight } from "lucide-react";
import { defaultViewport, scaleReveal, SPARTAN_EASE } from "@/lib/motion";
import Link from "next/link";
import { PrecisionCard } from "@/components/PrecisionCard";

interface BuildProject {
  id: string;
  number: string;
  name: string;
  description: string;
  tags: string[];
  status: string;
  statusType: "building" | "active" | "production";
  summary: string;
}

const BUILDS: BuildProject[] = [
  {
    id: "spartan-platform",
    number: "01",
    name: "SPARTAN AUTOMATION PLATFORM",
    description: "Workflow intake and automation infrastructure built around custom business requirements.",
    tags: ["WEB", "SUPABASE", "RESEND", "AUTOMATION"],
    status: "STATUS — BUILDING",
    statusType: "building",
    summary: "Intake pipeline with schema validation, PostgreSQL persistence, and automated notification alerts.",
  },
  {
    id: "pipeline-engine",
    number: "02",
    name: "MULTI-SYSTEM PIPELINE ENGINE",
    description: "Data transformation and sync between webhooks, internal relational schemas, and third-party communication layers.",
    tags: ["BACKEND", "APIS", "REST", "POSTGRES"],
    status: "STATUS — ACTIVE",
    statusType: "active",
    summary: "Automated extraction and sync layer preventing manual copy-pasting between disconnected operational tools.",
  },
  {
    id: "triage-gateway",
    number: "03",
    name: "INBOUND TRIAGE & ROUTING GATEWAY",
    description: "Automated classification pipeline routing inbound customer communications directly to verified review queues.",
    tags: ["AUTOMATION", "WEBHOOKS", "HUMAN-IN-THE-LOOP"],
    status: "STATUS — IN PRODUCTION",
    statusType: "production",
    summary: "Filters and stages incoming operational requests with mandatory supervisor sign-off before execution.",
  },
];

export function SelectedBuilds() {
  return (
    <section id="builds" className="py-24 relative overflow-hidden bg-[#0B0B0B] perspective-1200">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[#C9AEC6]/[0.02] blur-[170px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-[#C9AEC6]" />
            <span>Studio Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            STUFF WE&apos;VE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">ACTUALLY BUILT.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#E2D5E3] max-w-2xl mx-auto leading-relaxed font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            Real systems engineered in-house. No vaporware, fabricated logos, or imaginary case studies.
          </p>
        </motion.div>

        {/* Studio Project Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {BUILDS.map((project, idx) => {
            const isBuilding = project.statusType === "building";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.09,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <PrecisionCard
                  glowColor="rgba(201, 174, 198, 0.09)"
                  className="p-7 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/50 transition-all duration-300 h-full flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  <div>
                    {/* Project Header */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="font-mono text-xs font-bold text-[#8E8295] tracking-widest uppercase">
                        PROJECT {project.number}
                      </span>
                      
                      {/* Status Tag with Live Pulse */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                          isBuilding
                            ? "bg-[#C9AEC6]/10 text-[#C9AEC6] border-[#C9AEC6]/30"
                            : "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isBuilding ? "bg-[#C9AEC6] animate-pulse" : "bg-[#22C55E]"
                          }`}
                        />
                        {project.status}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#F6EFF5] uppercase font-sans tracking-wide mb-3 group-hover:text-white transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm font-medium text-[#BAAEC0] mb-3 leading-relaxed">
                      &ldquo;{project.description}&rdquo;
                    </p>

                    {/* Summary Context */}
                    <p className="text-xs text-[#8E8295] leading-relaxed mb-6 font-normal">
                      {project.summary}
                    </p>
                  </div>

                  {/* Capability / Tech Tags */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#F6EFF5]/80 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </PrecisionCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom studio action */}
        <div className="text-center flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-[0_0_15px_rgba(201,174,198,0.2)]"
          >
            <span>VIEW ALL BUILDS & ARCHITECTURE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0B0B0B] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.1] hover:border-[#C9AEC6]/50 text-[#F6EFF5] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-md"
          >
            <span>TELL US WHAT YOU NEED BUILT</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
