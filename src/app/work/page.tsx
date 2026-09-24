"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  GitBranch, 
  Database, 
  Server, 
  Mail, 
  MessageSquare, 
  UserCheck, 
  Activity,
  Code2
} from "lucide-react";
import { PrecisionCard } from "@/components/PrecisionCard";

interface PipelineStep {
  label: string;
  sub: string;
  icon: typeof Server;
}

interface Project {
  number: string;
  name: string;
  category: "all" | "automation" | "backend" | "engines";
  categoryLabel: string;
  status: string;
  statusType: "building" | "active" | "production";
  description: string;
  problem: string;
  whatWeBuilt: string;
  techStack: string[];
  keyHighlights: string[];
  pipeline: PipelineStep[];
  latency: string;
  reliability: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "SPARTAN AUTOMATION PLATFORM",
    category: "engines",
    categoryLabel: "INTERNAL ENGINE & WORKFLOW INTAKE",
    status: "STATUS — BUILDING",
    statusType: "building",
    description: "The core intake pipeline and system orchestration layer powering SPARTAN's client onboarding and requirements parsing.",
    problem: "Initial operational scoping is usually buried in chaotic messaging threads, missing critical technical context like existing stack schemas, tool access, and trigger frequencies.",
    whatWeBuilt: "A lightweight, encrypted workflow intake gateway featuring strict TypeScript validation schemas, PostgreSQL persistence on Supabase, atomic transactional logging, and instantaneous multi-channel alerting via Resend API.",
    techStack: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "POSTGRESQL", "RESEND", "TAILWIND CSS"],
    keyHighlights: [
      "Sub-200ms form ingestion with sanitized validation",
      "Direct Supabase PostgreSQL row-level audit logging",
      "Automatic HTML email dispatch with fail-safe error isolation",
    ],
    pipeline: [
      { label: "Intake Gateway", sub: "Client Payload", icon: Activity },
      { label: "Schema Validator", sub: "Sanitized Types", icon: Code2 },
      { label: "Supabase DB", sub: "Encrypted Rows", icon: Database },
      { label: "Resend Engine", sub: "Instant Dispatch", icon: Mail },
    ],
    latency: "< 180ms",
    reliability: "100% Idempotent Writes",
  },
  {
    number: "02",
    name: "MULTI-SYSTEM PIPELINE ENGINE",
    category: "backend",
    categoryLabel: "BACKEND & DATA INTEGRATION",
    status: "STATUS — ACTIVE",
    statusType: "active",
    description: "Bi-directional data transformation bridge connecting distributed webhooks to internal relational storage and notification queues.",
    problem: "Operations teams spend hours daily copying lead, order, and ticket data manually between separate third-party SaaS tools that refuse to communicate out of the box.",
    whatWeBuilt: "An event-driven backend service that listens for external webhook payloads, sanitizes and transforms mismatched JSON formats, updates target databases, and dispatches authenticated updates across disparate endpoints.",
    techStack: ["BACKEND", "REST APIS", "POSTGRESQL", "WEBHOOKS", "NODE.JS", "CRON"],
    keyHighlights: [
      "Guaranteed idempotent execution to prevent duplicate writes",
      "Resilient retry mechanisms with exponential backoff",
      "Decoupled architecture keeping primary services unaffected by external downtime",
    ],
    pipeline: [
      { label: "Disparate Webhooks", sub: "Third-party SaaS", icon: Server },
      { label: "Idempotency Gate", sub: "Deduplication", icon: ShieldCheck },
      { label: "JSON Transformer", sub: "Normalized Schema", icon: GitBranch },
      { label: "Relational Sync", sub: "Target Storage", icon: Database },
    ],
    latency: "< 240ms",
    reliability: "Zero Lost Payloads",
  },
  {
    number: "03",
    name: "INBOUND TRIAGE & ROUTING GATEWAY",
    category: "automation",
    categoryLabel: "AUTOMATION & HUMAN-IN-THE-LOOP",
    status: "STATUS — IN PRODUCTION",
    statusType: "production",
    description: "Intelligent classification pipeline that intercepts high-volume communications and prepares structured action tickets for human sign-off.",
    problem: "Support and operations inboxes get flooded with mixed queries, ranging from critical escalations to repetitive routine status inquiries.",
    whatWeBuilt: "An automated extraction pipeline that parses message content, verifies customer records, matches relevant internal documentation, and stages a pre-drafted response in a triage dashboard for one-click human verification.",
    techStack: ["AUTOMATION", "WEBHOOKS", "APIS", "HUMAN-IN-THE-LOOP", "n8n"],
    keyHighlights: [
      "Strict human confirmation requirement prior to any external send",
      "Audit trail tracking which operator reviewed each stage",
      "Eliminates 70%+ of manual data assembly time while preserving 100% human oversight",
    ],
    pipeline: [
      { label: "Message Stream", sub: "High Volume Feed", icon: MessageSquare },
      { label: "Entity Extraction", sub: "Deterministic Rules", icon: Cpu },
      { label: "Human Review Gate", sub: "Operator Sign-off", icon: UserCheck },
      { label: "Verified Action", sub: "Executed Queue", icon: Zap },
    ],
    latency: "< 350ms",
    reliability: "100% Supervised Gate",
  },
];

const ENGINEERING_STEPS = [
  {
    step: "01",
    title: "Process Dissection",
    desc: "We shadow the actual operators doing the work, catalog every copy-paste step, identify API endpoints, and map all data schemas.",
    icon: Activity,
  },
  {
    step: "02",
    title: "Contract & Schema Design",
    desc: "We define rigorous TypeScript interfaces and database tables. Bad input data is isolated before it touches core services.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Resilient Execution",
    desc: "Workflows run on stateless edge workers with automatic exponential backoff, dead-letter queues, and atomic transactions.",
    icon: Server,
  },
  {
    step: "04",
    title: "Human Sign-off Gates",
    desc: "High-liability decisions (money transfers, sensitive emails, batch deletions) queue for human approval before execution.",
    icon: UserCheck,
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "automation" | "backend" | "engines">("all");

  const filteredProjects = activeFilter === "all" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#C9AEC6]/[0.035] blur-[180px] rounded-full pointer-events-none" />

      {/* Subtle black transparent gradient overlay behind left-side text: strongest near left edge, smoothly fading to transparent toward the right */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[90%] md:w-[78%] lg:w-[68%] xl:w-[60%] pointer-events-none select-none z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8, 8, 8, 0.82) 0%, rgba(8, 8, 8, 0.65) 30%, rgba(8, 8, 8, 0.32) 65%, rgba(8, 8, 8, 0) 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Page Hero Header — Styled identically to Main Page Hero */}
        <div className="max-w-5xl xl:max-w-6xl mb-16 md:mb-20">
          {/* Eyebrow with pulsing dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#141414] border border-[#C9AEC6]/40 text-[#C9AEC6] text-xs sm:text-sm font-mono uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(201,174,198,0.12)] transition-colors hover:border-[#C9AEC6]/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9AEC6]"></span>
            </span>
            <span>Verified Portfolio & Systems</span>
          </div>

          {/* Main Headline: STUFF WE'VE ACTUALLY BUILT. */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#F6EFF5] mb-8 leading-[1.04] max-w-5xl uppercase font-sans drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            <span>Stuff we&apos;ve </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              actually built.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#E2D5E3] mb-8 leading-relaxed max-w-3xl font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            Real systems, prototypes, and automation infrastructure engineered in-house. No vaporware, zero imaginary metrics.
          </p>

          {/* Small Supporting Line with glowing dot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#BFB2C6] mb-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.5)]" />
            <span>Production code running in live environments. Every system proven.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href="/contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out group font-mono cursor-pointer"
            >
              <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
            </Link>
            <a
              href="#projects-list"
              className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 transition-all duration-150 ease-out font-mono cursor-pointer"
            >
              <span>EXPLORE LIVE SYSTEMS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lg sm:text-xl font-mono font-black text-[#F6EFF5]">3 CORE</div>
              <div className="text-[10px] font-mono uppercase text-[#8E8295] tracking-wider mt-0.5">Production Systems</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lg sm:text-xl font-mono font-black text-[#C9AEC6]">&lt; 200MS</div>
              <div className="text-[10px] font-mono uppercase text-[#8E8295] tracking-wider mt-0.5">Median Latency</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lg sm:text-xl font-mono font-black text-[#22C55E]">100%</div>
              <div className="text-[10px] font-mono uppercase text-[#8E8295] tracking-wider mt-0.5">Deterministic Rules</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lg sm:text-xl font-mono font-black text-[#EAD6E6]">ZERO</div>
              <div className="text-[10px] font-mono uppercase text-[#8E8295] tracking-wider mt-0.5">Vendor Lock-In</div>
            </div>
          </div>
        </div>

        <div id="projects-list" className="pt-2"></div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-2xl mx-auto">
          {[
            { key: "all", label: "All Builds" },
            { key: "automation", label: "Automation" },
            { key: "backend", label: "Backend / APIs" },
            { key: "engines", label: "Internal Engines" },
          ].map((tab) => {
            const isSelected = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key as typeof activeFilter)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#C9AEC6] text-[#0B0B0B] font-bold shadow-[0_0_15px_rgba(201,174,198,0.25)]"
                    : "bg-[#141414] text-[#BAAEC0] hover:text-[#F6EFF5] border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards System */}
        <div className="space-y-10 max-w-5xl mx-auto mb-24">
          {filteredProjects.map((project) => {
            const isBuilding = project.statusType === "building";

            return (
              <PrecisionCard
                key={project.number}
                glowColor="rgba(201, 174, 198, 0.09)"
                className="p-6 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/50 transition-all duration-300 shadow-2xl relative overflow-hidden"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#8E8295] tracking-widest uppercase">
                      PROJECT {project.number}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="font-mono text-xs text-[#BAAEC0] uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                      isBuilding
                        ? "bg-[#C9AEC6]/10 text-[#C9AEC6] border border-[#C9AEC6]/25"
                        : "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/25"
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

                {/* Title & Description */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F6EFF5] uppercase font-sans tracking-wide mb-3">
                    {project.name}
                  </h2>
                  <p className="text-base text-[#BAAEC0] font-medium leading-relaxed max-w-3xl">
                    &ldquo;{project.description}&rdquo;
                  </p>
                </div>

                {/* Interactive Pipeline Visualizer */}
                <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#0F0F0F] border border-white/[0.06] relative overflow-hidden">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#8E8295] tracking-wider mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-[#C9AEC6]" />
                      <span>Live Architecture Flow</span>
                    </span>
                    <span className="text-[#C9AEC6] font-mono lowercase">
                      latency: {project.latency} • {project.reliability}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {project.pipeline.map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <div
                          key={idx}
                          className="relative p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 group hover:border-[#C9AEC6]/40 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#C9AEC6]/10 border border-[#C9AEC6]/20 flex items-center justify-center text-[#C9AEC6] shrink-0">
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#F6EFF5] truncate">
                              {step.label}
                            </div>
                            <div className="text-[10px] text-[#8E8295] truncate">
                              {step.sub}
                            </div>
                          </div>
                          {idx < project.pipeline.length - 1 && (
                            <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#8E8295]/40 font-mono text-xs">
                              →
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Problem vs What SPARTAN Built Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-4 h-4 text-[#BAAEC0]" />
                      <h3 className="text-xs font-mono font-bold uppercase text-[#BAAEC0] tracking-wider">
                        The Operational Bottleneck
                      </h3>
                    </div>
                    <p className="text-sm text-[#8E8295] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#C9AEC6]/[0.03] border border-[#C9AEC6]/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-4 h-4 text-[#C9AEC6]" />
                      <h3 className="text-xs font-mono font-bold uppercase text-[#C9AEC6] tracking-wider">
                        What SPARTAN Built
                      </h3>
                    </div>
                    <p className="text-sm text-[#F6EFF5] leading-relaxed">
                      {project.whatWeBuilt}
                    </p>
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="mb-8 p-5 rounded-xl bg-black/40 border border-white/[0.04]">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#8E8295] tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#C9AEC6]" />
                    <span>Engineering Specs & Verification</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {project.keyHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#BAAEC0]">
                        <CheckCircle2 className="w-4 h-4 text-[#C9AEC6] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags Bottom Footer */}
                <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#F6EFF5]/85 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.07]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-[#8E8295] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9AEC6]" />
                    In-House Architecture
                  </span>
                </div>
              </PrecisionCard>
            );
          })}
        </div>

        {/* How We Engineer A System Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-14">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              Engineering Anatomy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
              HOW WE ACTUALLY SHIP SYSTEMS.
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              Every workflow undergoes four rigorous engineering stages before handling production business data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] hover:border-[#C9AEC6]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#C9AEC6]">
                        STAGE {s.step}
                      </span>
                      <Icon className="w-4 h-4 text-[#8E8295]" />
                    </div>
                    <h3 className="text-base font-bold text-[#F6EFF5] mb-2.5">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#BAAEC0] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141414] to-[#0D0D0D] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#C9AEC6]/10 blur-[90px] pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
            HAVE A SYSTEM YOU NEED BUILT?
          </h3>
          <p className="text-sm sm:text-base text-[#E2D5E3] max-w-lg mx-auto mb-6 leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
            Every company has different data schemas and operational tools. We build the glue and automation around what your team actually needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-[0_0_20px_rgba(201,174,198,0.25)]"
          >
            <span>SHOW US YOUR WORKFLOW</span>
            <ArrowRight className="w-4 h-4 text-[#0B0B0B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
