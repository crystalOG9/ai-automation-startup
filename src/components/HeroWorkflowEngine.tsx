"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Building2,
  FileSpreadsheet,
  Database,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  RefreshCw,
  Clock,
  Terminal,
  Activity,
  Check,
} from "lucide-react";
import { SpartanLogo } from "@/components/SpartanLogo";
import { cn } from "@/lib/utils";

interface WorkflowPipeline {
  id: string;
  name: string;
  badge: string;
  source: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    metrics: string;
    color: string;
  };
  validation: {
    system: string;
    details: string;
    status: string;
  };
  action: {
    draftType: string;
    summary: string;
    approver: string;
  };
  dispatch: string[];
  logs: { time: string; text: string; highlight?: boolean }[];
}

const PIPELINES: WorkflowPipeline[] = [
  {
    id: "rfq",
    name: "Logistics RFQ & Dispatch",
    badge: "Supply Chain",
    source: {
      title: "Inbound Carrier Email & RFQ",
      description: "Extracts shipment specs, cargo volume, origin & target ETA from unstructured text.",
      icon: Mail,
      metrics: "99.8% Extraction Accuracy",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    },
    validation: {
      system: "SAP Logistics & FedEx Fleet API",
      details: "Verified inventory in Hub 4 • Carrier rate card matched ($1,420)",
      status: "Inventory & Rates Confirmed",
    },
    action: {
      draftType: "Carrier Manifest & Quote Dispatch",
      summary: "Generated bill of lading, reserved carrier bay, and drafted client booking confirmation.",
      approver: "Operations Lead (Alex M.)",
    },
    dispatch: [
      "SAP ERP booking record created",
      "Carrier airway bill generated (AWB #48291)",
      "Client confirmation email dispatched",
    ],
    logs: [
      { time: "10:42:01", text: "Ingested RFQ #48291 from Apex Logistics via webhook" },
      { time: "10:42:02", text: "AI parsed cargo volume: 450 units, Hub 4 destination" },
      { time: "10:42:03", text: "Queried SAP Logistics: Inventory reserved in Bay 12", highlight: true },
      { time: "10:42:04", text: "Held at Human Guard Gate — Awaiting supervisor sign-off" },
      { time: "10:42:05", text: "Supervisor approved dispatch: Single-click authorization", highlight: true },
      { time: "10:42:06", text: "Autonomous write: ERP updated, AWB sealed, client notified" },
    ],
  },
  {
    id: "invoice",
    name: "Invoice & Ledger Reconcile",
    badge: "Finance & ERP",
    source: {
      title: "Vendor Invoice PDF & Tally",
      description: "Reconciles line items, tax IDs & payment terms against purchase orders automatically.",
      icon: FileSpreadsheet,
      metrics: "Zero-Error Ledger Matching",
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    },
    validation: {
      system: "Tally Prime & NetSuite Financials",
      details: "PO #9102 matched to vendor GSTIN • 3-way match validated with 0 discrepancy",
      status: "PO & Delivery Matched",
    },
    action: {
      draftType: "Ledger Voucher & Payment Batch",
      summary: "Prepared journal voucher entry and scheduled disbursement for approved invoice window.",
      approver: "Finance Controller (Rachel V.)",
    },
    dispatch: [
      "Tally Prime accounting voucher posted",
      "Bank payment batch queued for next cycle",
      "Vendor statement reconciliation sealed",
    ],
    logs: [
      { time: "11:15:10", text: "Received PDF invoice #INV-9102 via accounts inbox" },
      { time: "11:15:11", text: "Extracted line items, HSN codes & GST totals ($84,500)" },
      { time: "11:15:12", text: "3-Way Match: PO #9102 matches goods receipt note (GRN)", highlight: true },
      { time: "11:15:13", text: "Threshold Guard: Over $50k requires Controller sign-off" },
      { time: "11:15:14", text: "Controller authorized voucher entry with audit stamp" },
      { time: "11:15:15", text: "Ledger balanced: General ledger credit memo posted", highlight: true },
    ],
  },
  {
    id: "crm",
    name: "CRM Lead & Contract Sync",
    badge: "Revenue Ops",
    source: {
      title: "Enterprise Deal Inbound",
      description: "Qualifies prospect size, matches territory rep, and synthesizes bespoke volume pricing.",
      icon: Building2,
      metrics: "Sub-Second Enrichment",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    validation: {
      system: "Salesforce CRM & ZoomInfo Intelligence",
      details: "Qualified Tier-1 Account (500+ employees) • Regional executive assigned",
      status: "Enterprise Tier Confirmed",
    },
    action: {
      draftType: "Executive Dossier & Proposal",
      summary: "Prepared custom enterprise contract overview, volume tier sheet, and calendar link.",
      approver: "Account Executive (David K.)",
    },
    dispatch: [
      "Salesforce opportunity created ($42k ACV)",
      "Personalized rate card sent to prospect",
      "Slack executive notification triggered",
    ],
    logs: [
      { time: "12:05:40", text: "Inbound enterprise inquiry received from SupplyHub" },
      { time: "12:05:41", text: "ZoomInfo enriched: 350 employees, Series B, Midwest HQ" },
      { time: "12:05:42", text: "Matched Enterprise Tier 2 rate card ($1.85 / unit)", highlight: true },
      { time: "12:05:43", text: "AI drafted executive briefing dossier and proposal email" },
      { time: "12:05:44", text: "Account Executive reviewed & approved dispatch" },
      { time: "12:05:45", text: "Salesforce deal created and follow-up scheduled", highlight: true },
    ],
  },
];

export function HeroWorkflowEngine() {
  const [activePipelineIdx, setActivePipelineIdx] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const pipeline = PIPELINES[activePipelineIdx];
  const SourceIcon = pipeline.source.icon;

  // Trigger smooth pulse transition when changing pipelines
  const handleSelectPipeline = (idx: number) => {
    setActivePipelineIdx(idx);
    setIsApproved(false);
    setIsAuthorizing(false);
    setPulseKey((prev) => prev + 1);
  };

  const handleAuthorizeAction = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setIsApproved(true);
    }, 500);
  };

  return (
    <div className="relative w-full rounded-3xl border border-white/10 bg-[#060b17]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(37,99,235,0.12)] overflow-hidden p-5 sm:p-6 select-none transition-all duration-300">
      {/* Background blueprint subtle grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-500/10 blur-[110px] rounded-full pointer-events-none" />

      {/* Top Header: Enterprise Engine Status & Pipeline Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Micro terminal window dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center gap-2">
            SPARTAN AUTONOMOUS ENGINE
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
              v4.2 PRO
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Live Real-Time Stream</span>
          </span>
        </div>
      </div>

      {/* Interactive Scenario Tabs */}
      <div className="relative z-10 pt-3 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-400" /> Pipeline:
          </span>
          {PIPELINES.map((p, idx) => {
            const isActive = activePipelineIdx === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPipeline(idx)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all duration-150 cursor-pointer flex items-center gap-1.5 border",
                  isActive
                    ? "bg-brand-600 text-white border-brand-400/80 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                <span>{p.name}</span>
                <span
                  className={cn(
                    "text-[9px] px-1 py-0.2 rounded uppercase",
                    isActive ? "bg-white/20 text-white" : "bg-black/30 text-slate-500"
                  )}
                >
                  {p.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Interactive Architecture Deck (3-Step Visual Matrix) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pipeline.id}-${pulseKey}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 space-y-4"
        >
          <div className="grid lg:grid-cols-12 gap-3.5 items-stretch">
            
            {/* Step 1: Inbound Trigger & Unstructured Data Ingestion */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3 relative group hover:border-brand-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1 text-blue-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 01 // INGESTION
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Live Webhook
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center border shrink-0", pipeline.source.color)}>
                    <SourceIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{pipeline.source.title}</h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">{pipeline.source.metrics}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {pipeline.source.description}
                </p>
              </div>

              {/* Extraction tags */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>PARSER: <strong className="text-slate-200">LLM + OCR</strong></span>
                <span className="text-cyan-400">LATENCY: 14ms</span>
              </div>
            </div>

            {/* Step 2: Spartan Autonomous Orchestration Core */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-gradient-to-b from-brand-950/40 to-black/60 border border-brand-500/40 flex flex-col justify-between space-y-3 relative shadow-[0_0_25px_rgba(37,99,235,0.18)]">
              {/* Top active core badge */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5 text-brand-300 font-bold">
                    <Sparkles className="w-3 h-3 text-brand-400 animate-pulse" /> 02 // SPARTAN CORE
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9px] font-semibold">
                    AUTONOMOUS
                  </span>
                </div>

                {/* Central Emblem & System Check */}
                <div className="flex items-center gap-3 py-1">
                  <div className="w-10 h-10 rounded-2xl bg-brand-600/20 border border-brand-400/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <SpartanLogo size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{pipeline.validation.system}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> {pipeline.validation.status}
                    </div>
                  </div>
                </div>

                <div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-white/5 text-[11px] text-slate-300 leading-snug">
                  {pipeline.validation.details}
                </div>
              </div>

              {/* Protocol indicators */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> TLS 1.3 ISOLATED
                </span>
                <span className="text-brand-300">CONFIDENCE: 99.8%</span>
              </div>
            </div>

            {/* Step 3: Human Oversight Gate & Execution */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3 relative hover:border-emerald-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1 text-emerald-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 03 // HUMAN GATE
                  </span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase",
                    isApproved
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                  )}>
                    {isApproved ? "AUTHORIZED" : "ACTION GATED"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-white">{pipeline.action.draftType}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{pipeline.action.summary}</p>
                </div>
              </div>

              {/* Interactive Authorization Button */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleAuthorizeAction}
                  disabled={isApproved || isAuthorizing}
                  className={cn(
                    "w-full py-2.5 px-3 rounded-xl text-xs font-semibold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer",
                    isApproved
                      ? "bg-emerald-600 text-white border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "bg-brand-600 hover:bg-brand-500 text-white border border-brand-400 shadow-[0_0_15px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                  )}
                >
                  {isAuthorizing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : isApproved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Executed & Dispatched</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-brand-200" />
                      <span>Authorize Execution</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] font-mono text-center text-slate-400">
                  Supervisor: <strong className="text-slate-200">{pipeline.action.approver}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Real-time Enterprise Telemetry Terminal & Audit Feed */}
          <div className="rounded-2xl bg-black/70 border border-white/10 p-3.5 space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/10 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Terminal className="w-3.5 h-3.5 text-brand-400" /> LIVE TELEMETRY AUDIT TRAIL
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Activity className="w-3 h-3" /> ZERO UNGOVERNED COMMITS
              </span>
            </div>

            {/* Live Event Stream */}
            <div className="space-y-1 text-[11px] max-h-24 overflow-y-auto pr-1">
              {pipeline.logs.map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-2 py-0.5",
                    log.highlight ? "text-brand-300 font-semibold" : "text-slate-400"
                  )}
                >
                  <span className="text-slate-500 shrink-0 text-[10px]">[{log.time}]</span>
                  <span className="truncate">{log.text}</span>
                </div>
              ))}
            </div>

            {/* Dispatched Results Bar */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                {pipeline.dispatch.map((d, idx) => (
                  <span key={idx} className="flex items-center gap-1 text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {d}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400 font-bold">AVG CYCLE: 12.4 SECONDS</span>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
