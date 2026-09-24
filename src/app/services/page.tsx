"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Layout, 
  Server, 
  Cog, 
  Network, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  X, 
  Zap, 
  MessageSquare, 
  FileText, 
  BarChart3
} from "lucide-react";
import { PrecisionCard } from "@/components/PrecisionCard";

interface Capability {
  num: string;
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: typeof Layout;
  capabilities: string[];
  sampleDeliverables: string[];
  architecturePreview: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    id: "web",
    name: "WEB",
    subtitle: "Business websites and interfaces built around actual requirements.",
    description: "We don't assemble bloated generic templates. We build custom, ultra-fast web applications, client portals, and administrative control surfaces configured around how your operators actually interact with business data.",
    icon: Layout,
    capabilities: [
      "Custom responsive web applications (Next.js & React)",
      "Internal operational consoles and admin panels",
      "Dynamic customer portals and self-service dashboards",
      "High-conversion intake gateways and client scoping interfaces",
    ],
    sampleDeliverables: ["Next.js App Router", "Tailwind CSS Design Systems", "Role-Based Auth UI", "Real-Time Tables"],
    architecturePreview: "Client UI (Edge SSR) ⇄ Optimistic React State ⇄ Authenticated API Gateway",
  },
  {
    num: "02",
    id: "backend",
    name: "BACKEND",
    subtitle: "APIs, databases, authentication and business logic.",
    description: "Robust data layers designed to ensure zero data loss, rock-solid schema integrity, and sub-second querying under high operational loads. We build backends that serve as your company's reliable digital bedrock.",
    icon: Server,
    capabilities: [
      "REST & Webhook API development and documentation",
      "Relational database design and PostgreSQL schemas (Supabase)",
      "Secure authentication, authorization, and tenant isolation",
      "Data sanitation, audit logs, and transaction safety",
    ],
    sampleDeliverables: ["PostgreSQL", "Supabase Backend", "Edge Functions", "Encrypted Secrets Management"],
    architecturePreview: "Strict JSON Validation ⇄ PostgreSQL Atomic Transactions ⇄ RLS Security Policies",
  },
  {
    num: "03",
    id: "automation",
    name: "AUTOMATION",
    subtitle: "Repetitive business processes turned into reliable automated workflows.",
    description: "If an employee repeats the exact same sequence of copy-pasting, file renaming, or status updates multiple times a week, that is not skilled labor—that is operational latency. We engineer autonomous engines to run it cleanly.",
    icon: Cog,
    capabilities: [
      "Event-triggered execution pipelines",
      "Multi-step document parsing and record creation",
      "Scheduled reconciliations, audits, and health monitors",
      "Human-in-the-loop checkpoints for sensitive transactions",
    ],
    sampleDeliverables: ["Trigger-Action Pipelines", "Error Isolation", "Self-Healing Retries", "Execution Telemetry"],
    architecturePreview: "Event Webhook ⇄ Dead-Letter Queue ⇄ Idempotent Task Worker ⇄ Telemetry Alert",
  },
  {
    num: "04",
    id: "integrations",
    name: "INTEGRATIONS",
    subtitle: "Connect email, WhatsApp, CRM, databases, APIs and existing software.",
    description: "Modern businesses run on dozens of fragmented tools. We build custom API connectors, webhooks, and sync services so your software stack finally functions as a unified, coordinated organism.",
    icon: Network,
    capabilities: [
      "WhatsApp Business API & conversational order triage",
      "Email infrastructure and programmatic alerts (Resend, SendGrid)",
      "CRM & ERP synchronization (HubSpot, Salesforce, Zoho)",
      "Spreadsheet to database bidirectional bridging",
    ],
    sampleDeliverables: ["Webhook Ingestion", "Third-Party OAuth", "Rate-Limit Handlers", "Payload Transformers"],
    architecturePreview: "WhatsApp Cloud API ⇄ HubSpot CRM ⇄ Custom Webhook Transformer ⇄ Resend Email",
  },
  {
    num: "05",
    id: "ai",
    name: "AI",
    subtitle: "AI where it genuinely helps the workflow.",
    description: "We refuse to sprinkle AI into systems where regular deterministic logic or a clean SQL query works faster, cheaper, and with 100% reliability. We deploy LLMs strictly where unstructured nuance requires human-like interpretation.",
    icon: Sparkles,
    capabilities: [
      "Unstructured email and message intent categorization",
      "Document entity extraction (invoices, receipts, legal summaries)",
      "Context-aware draft responses queued for human operator sign-off",
      "Internal knowledge base retrieval against company documentation",
    ],
    sampleDeliverables: ["Vector Search & Embeddings", "Structured JSON Extraction", "Supervised Review Queues", "Fallback Protections"],
    architecturePreview: "Raw Message ⇄ Schema-Constrained LLM Extraction ⇄ Strict Type Guard ⇄ Human Approver",
  },
];

const COMPARISONS = [
  {
    category: "Data Entry",
    manual: "Staff copy-pastes customer orders between WhatsApp, email, and ERP spreadsheets.",
    spartan: "Instant webhook listener parses fields, verifies formats, and inserts into DB in < 200ms.",
  },
  {
    category: "Error Risk",
    manual: "Fatigued humans mistype SKUs, duplicate orders, or miss critical client emails.",
    spartan: "Deterministic schema validation rejects malformed data and alerts operators immediately.",
  },
  {
    category: "Operational Speed",
    manual: "Inquiries take 4 to 24 hours to be transcribed, priced, and routed to management.",
    spartan: "Zero latency: instant catalog match and pre-drafted ticket queued for 1-click verification.",
  },
  {
    category: "System Harmony",
    manual: "Each software tool is a siloed island requiring separate logins and manual syncs.",
    spartan: "Unified API orchestration keeps your database, CRM, and communication channels 100% in sync.",
  },
];

const SCENARIOS = [
  {
    company: "COMPANY A",
    headline: "WhatsApp + CRM + Order Processing",
    icon: MessageSquare,
    challenge: "Orders flood in over WhatsApp chats. Sales team spends 3 hours every morning manually typing names, addresses, and line items into CRM.",
    solution: "We deployed an authenticated WhatsApp Business webhook that extracts structured orders, checks inventory in real-time, logs the deal in CRM, and creates a payment link automatically.",
    steps: ["WhatsApp Inbound", "JSON Parser", "CRM Record", "Payment Link Dispatched"],
  },
  {
    company: "COMPANY B",
    headline: "Email + Database + Invoice Automation",
    icon: FileText,
    challenge: "Vendors send hundreds of PDF invoices to multiple inboxes. Accountants manually verify line items against PO spreadsheets, causing payment bottlenecks.",
    solution: "We built an automated email ingestion gateway that extracts PO numbers, line items, and taxes from invoice PDFs, matches them with purchase order records, and flags discrepancies for 1-click approval.",
    steps: ["Inbound Inbox", "PDF Extraction", "PO Database Match", "Accountant Sign-Off"],
  },
  {
    company: "COMPANY C",
    headline: "REST APIs + Reporting + Internal Tools",
    icon: BarChart3,
    challenge: "Management lacks real-time operational visibility because sales, fulfillment, and support data live across 4 disconnected SaaS tools.",
    solution: "We engineered custom REST endpoints and a high-performance executive dashboard that continuously pulls and normalizes metrics into an internal control portal.",
    steps: ["4 Tool Endpoints", "Hourly Data Aggregator", "PostgreSQL Storage", "Executive Control UI"],
  },
];

export default function ServicesPage() {
  const [selectedCapability, setSelectedCapability] = useState<string>("01");

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Ambient background glow */}
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
            <span>Studio Capabilities & Disciplines</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#F6EFF5] mb-8 leading-[1.04] max-w-5xl uppercase font-sans drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            <span>Custom systems built </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              around your business.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#E2D5E3] mb-8 leading-relaxed max-w-3xl font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            We don&apos;t force companies into predefined agency packages or rigid templates. We engineer web applications, APIs, and automation around what your team actually needs.
          </p>

          {/* Small Supporting Line with glowing dot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#BFB2C6] mb-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.5)]" />
            <span>Every system starts with the workflow, not the technology.</span>
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
              href="#disciplines"
              className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 transition-all duration-150 ease-out font-mono cursor-pointer"
            >
              <span>BROWSE CAPABILITIES</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div id="disciplines" className="pt-2"></div>

        {/* Capabilities Interactive Selector Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-3xl mx-auto">
          {CAPABILITIES.map((cap) => {
            const isSelected = selectedCapability === cap.num;
            return (
              <button
                key={cap.num}
                type="button"
                onClick={() => setSelectedCapability(cap.num)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#C9AEC6] text-[#0B0B0B] font-bold shadow-[0_0_15px_rgba(201,174,198,0.25)]"
                    : "bg-[#141414] text-[#BAAEC0] hover:text-[#F6EFF5] border border-white/[0.08] hover:border-white/20"
                }`}
              >
                <span className="font-bold">{cap.num}</span>
                <span>{cap.name}</span>
              </button>
            );
          })}
        </div>

        {/* Capabilities Detailed Cards */}
        <div className="space-y-10 max-w-5xl mx-auto mb-28">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            const isHighlighted = selectedCapability === cap.num;

            return (
              <PrecisionCard
                key={cap.num}
                glowColor="rgba(201, 174, 198, 0.09)"
                className={`p-6 sm:p-10 rounded-2xl border transition-all duration-300 shadow-2xl relative overflow-hidden ${
                  isHighlighted 
                    ? "border-[#C9AEC6]/60 bg-[#161616] ring-1 ring-[#C9AEC6]/30" 
                    : "border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/40"
                }`}
              >
                {/* Number & Icon Header */}
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#8E8295] tracking-widest uppercase">
                      DISCIPLINE {cap.num}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="font-mono text-xs text-[#C9AEC6] uppercase tracking-wider font-semibold">
                      CUSTOM ENGINEERING
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#C9AEC6] shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Name & Headline */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-4xl font-black text-[#F6EFF5] uppercase font-sans tracking-wide mb-3">
                    {cap.num} — {cap.name}
                  </h2>
                  <p className="text-base sm:text-lg text-[#EAD6E6] font-medium leading-relaxed">
                    {cap.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#BAAEC0] leading-relaxed mb-6 max-w-3xl">
                  {cap.description}
                </p>

                {/* Architecture Flow Banner */}
                <div className="mb-8 p-4 rounded-xl bg-[#0C0C0C] border border-white/[0.06] flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#C9AEC6] shrink-0" />
                  <div className="text-xs font-mono text-[#F6EFF5]/90 truncate">
                    <span className="text-[#8E8295] uppercase mr-2">Core Pattern:</span>
                    {cap.architecturePreview}
                  </div>
                </div>

                {/* Deliverables & Stack Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/[0.06]">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase text-[#8E8295] tracking-wider mb-4">
                      What We Build Here
                    </h3>
                    <ul className="space-y-2.5">
                      {cap.capabilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#BAAEC0]">
                          <CheckCircle2 className="w-4 h-4 text-[#C9AEC6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black/35 p-5 rounded-xl border border-white/[0.04]">
                    <h3 className="text-xs font-mono font-bold uppercase text-[#C9AEC6] tracking-wider mb-4">
                      Core Stack Components
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cap.sampleDeliverables.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono text-[#F6EFF5]/85 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </PrecisionCard>
            );
          })}
        </div>

        {/* Side-by-Side: Manual Chaos vs SPARTAN Architecture */}
        <div className="max-w-5xl mx-auto mb-28">
          <div className="text-center mb-14">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              The Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
              MANUAL CHAOS VS. SPARTAN SYSTEMS.
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              Why business leaders replace patchwork copy-pasting with engineered automation pipelines.
            </p>
          </div>

          <div className="space-y-4">
            {COMPARISONS.map((comp, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 sm:p-6 rounded-2xl bg-[#141414] border border-white/[0.08] items-center"
              >
                <div className="md:col-span-2 font-mono text-xs font-bold text-[#C9AEC6] uppercase">
                  {comp.category}
                </div>

                <div className="md:col-span-5 p-3.5 rounded-xl bg-red-950/15 border border-red-500/20 text-xs text-[#BAAEC0] flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase text-red-400 font-bold block mb-1">Traditional Manual</span>
                    {comp.manual}
                  </div>
                </div>

                <div className="md:col-span-5 p-3.5 rounded-xl bg-[#C9AEC6]/[0.06] border border-[#C9AEC6]/30 text-xs text-[#F6EFF5] flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C9AEC6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#C9AEC6] font-bold block mb-1">SPARTAN Engineered</span>
                    {comp.spartan}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-world Scenarios Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-14">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              Case Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
              CUSTOM SYSTEMS BUILT AROUND YOUR BUSINESS.
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              No two organizations share identical operations. Here is how custom scoping operates in the wild:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCENARIOS.map((sc, i) => {
              const Icon = sc.icon;
              return (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl bg-[#141414] border border-white/[0.08] hover:border-[#C9AEC6]/50 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase">
                        {sc.company}
                      </span>
                      <Icon className="w-4 h-4 text-[#8E8295]" />
                    </div>

                    <h3 className="text-base font-bold text-[#F6EFF5] mb-3">
                      {sc.headline}
                    </h3>

                    <p className="text-xs text-[#8E8295] leading-relaxed mb-4">
                      {sc.challenge}
                    </p>

                    <p className="text-xs text-[#BAAEC0] leading-relaxed mb-6 font-medium">
                      {sc.solution}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono text-[#8E8295] uppercase mb-2">Automated Data Flow:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {sc.steps.map((st, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono text-[#EAD6E6] bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
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
            NOT SURE WHAT CAN BE AUTOMATED?
          </h3>
          <p className="text-sm sm:text-base text-[#E2D5E3] max-w-lg mx-auto mb-6 leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
            Walk us through the repetitive step your team hates doing most. We will analyze the workflow and tell you honestly what makes engineering sense to automate.
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
