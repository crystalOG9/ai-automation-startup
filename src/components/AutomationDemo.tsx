"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Bot,
  Database,
  ShieldCheck,
  CheckCircle2,
  Play,
  RotateCcw,
  Truck,
  RotateCcw as RefundIcon,
  XCircle,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  PenLine,
  Zap,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  email: {
    from: string;
    subject: string;
    body: string;
    source: string;
  };
  aiExtraction: {
    intent: string;
    reference: string;
    confidence: string;
    priority: "CRITICAL" | "HIGH" | "STANDARD";
    entities: { label: string; value: string }[];
  };
  systemCheck: {
    systemName: string;
    status: string;
    statusBadge: string;
    statusColor: string;
    verifiedRecords: { label: string; value: string }[];
  };
  aiDraft: {
    actionType: string;
    targetSystem: string;
    content: string;
  };
  humanStep: {
    role: string;
    supervisor: string;
    actionPrompt: string;
    primaryAction: string;
    secondaryAction: string;
  };
  executionResult: {
    title: string;
    summary: string;
    metrics: { label: string; before: string; after: string };
    dispatchedActions: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "delivery",
    name: "Logistics Delay Triage",
    tag: "Supply Chain",
    icon: Truck,
    email: {
      from: "ops@apexlogistics.com",
      subject: "Urgent: Order #48291 Tracking Discrepancy",
      body: "Order #48291 has not reached Regional Hub 4. Weather hold was cleared 6 hours ago. Please update client ETA and verify carrier status.",
      source: "EDI Carrier Webhook & Inbound Email",
    },
    aiExtraction: {
      intent: "Transit Delay & Delivery Rescheduling",
      reference: "Order #48291",
      confidence: "99.6%",
      priority: "HIGH",
      entities: [
        { label: "Entity ID", value: "#48291" },
        { label: "Destination", value: "Regional Hub 4" },
        { label: "Client Tier", value: "Tier 1 Priority" },
      ],
    },
    systemCheck: {
      systemName: "SAP Logistics & FedEx Fleet API",
      status: "Delayed in Transit — Weather Hold Cleared",
      statusBadge: "VERIFIED IN TRANSIT",
      statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      verifiedRecords: [
        { label: "Carrier Tracking", value: "1Z99999999999948291" },
        { label: "Revised ETA", value: "Tomorrow at 10:30 AM" },
        { label: "Inventory Hold", value: "None (In Final Mile Transit)" },
      ],
    },
    aiDraft: {
      actionType: "Client Rescheduling Notice & Dispatch",
      targetSystem: "Customer Portal & Zendesk CRM",
      content:
        "Hello Apex Operations,\n\nOrder #48291 was briefly held due to regional weather conditions. The hold has officially cleared and your shipment is now in final-mile delivery, scheduled to arrive tomorrow at 10:30 AM.\n\nLive GPS tracking: track.shipping.com/48291\nWe apologize for the delay.",
    },
    humanStep: {
      role: "Logistics Operations Lead",
      supervisor: "Human Supervisor #412",
      actionPrompt: "Review carrier telemetry and authorize automated customer dispatch",
      primaryAction: "Authorize & Dispatch Update",
      secondaryAction: "Edit Message",
    },
    executionResult: {
      title: "Carrier Status Synced & Client Notified",
      summary: "Customer notification delivered via email and portal. ERP ticket marked resolved with revised ETA.",
      metrics: { label: "Resolution Time", before: "35 mins manual", after: "14 seconds" },
      dispatchedActions: [
        "Real-time client status email dispatched",
        "SAP ERP delivery timeline updated to tomorrow 10:30 AM",
        "CRM priority ticket automatically closed",
      ],
    },
  },
  {
    id: "refund",
    name: "Damaged Goods Claim",
    tag: "Finance & CS",
    icon: RefundIcon,
    email: {
      from: "accounts@meridian-retail.com",
      subject: "Claim: Invoice #91024 Damaged Packaging",
      body: "Invoice #91024 arrived with damaged outer cases. Requesting an expedited refund or ledger credit of $84.50.",
      source: "Customer Support Portal",
    },
    aiExtraction: {
      intent: "Refund / Damage Claim",
      reference: "Invoice #91024",
      confidence: "99.2%",
      priority: "STANDARD",
      entities: [
        { label: "Claim ID", value: "INV-91024" },
        { label: "Amount", value: "$84.50 USD" },
        { label: "Warranty Window", value: "Within 30 Days (Day 4)" },
      ],
    },
    systemCheck: {
      systemName: "Stripe Gateway & Oracle NetSuite",
      status: "Eligible for Refund • Policy Auto-Validated",
      statusBadge: "POLICY COMPLIANT",
      statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      verifiedRecords: [
        { label: "Original Charge", value: "$84.50 on Visa ****4129" },
        { label: "Delivery Date", value: "3 days ago (Valid claim window)" },
        { label: "Account Standing", value: "Good standing • 0 prior disputes" },
      ],
    },
    aiDraft: {
      actionType: "Payment Gateway Refund Payload & Customer Reply",
      targetSystem: "Stripe API & NetSuite Financials",
      content:
        "Hello Meridian Accounts,\n\nWe sincerely apologize for the damaged package. A refund of $84.50 has been approved and issued back to your original payment method (Visa ending in 4129).\n\nTransaction Receipt: REF-91024-ST\nFunds will reflect within 2-3 business days.",
    },
    humanStep: {
      role: "Finance Operations Manager",
      supervisor: "Financial Controller #88",
      actionPrompt: "Authorize payment gateway transaction of $84.50 (Zero financial commits without human consent)",
      primaryAction: "Authorize $84.50 Refund",
      secondaryAction: "Adjust Amount",
    },
    executionResult: {
      title: "Financial Transaction Executed & Ledger Balanced",
      summary: "Stripe gateway processed $84.50 refund. Credit memo generated in NetSuite and confirmation sent.",
      metrics: { label: "Processing Cycle", before: "3 business days", after: "18 seconds" },
      dispatchedActions: [
        "Stripe Gateway initiated $84.50 refund to Visa ****4129",
        "NetSuite general ledger credit memo posted",
        "Customer confirmation email dispatched with receipt PDF",
      ],
    },
  },
  {
    id: "cancellation",
    name: "Fulfillment Line Halt",
    tag: "Warehouse Ops",
    icon: XCircle,
    email: {
      from: "alicia.v@studio-nordic.com",
      subject: "CANCEL Order #67120 immediately",
      body: "Accidentally placed Order #67120 with incorrect shipping address 10 minutes ago. Please stop fulfillment and cancel before pickup.",
      source: "Urgent Webhook / Live Chat",
    },
    aiExtraction: {
      intent: "Immediate Order Cancellation",
      reference: "Order #67120",
      confidence: "99.8%",
      priority: "CRITICAL",
      entities: [
        { label: "Order Ref", value: "#67120" },
        { label: "Elapsed Time", value: "10 mins post-checkout" },
        { label: "Warehouse Bay", value: "Bay 12 (Queue #34)" },
      ],
    },
    systemCheck: {
      systemName: "Warehouse Management System (WMS)",
      status: "Fulfillment Halt Eligible • Unpicked in Bay 12",
      statusBadge: "LINE HALT SAFE",
      statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      verifiedRecords: [
        { label: "Picking Status", value: "Queue Position #34 (Not Picked)" },
        { label: "Payment Hold", value: "Authorized, Not Captured" },
        { label: "Carrier Manifest", value: "Manifest not yet generated" },
      ],
    },
    aiDraft: {
      actionType: "WMS Bay Lock & Void Authorization",
      targetSystem: "Manhattan WMS & ERP Inventory Engine",
      content:
        "Action Payload for WMS:\n- Command: CANCEL_PICKING_TASK_67120\n- Bay: 12, Bin: 4B-99\n- Void Pre-Auth: Stripe #AUTH_67120\n\nClient Notice: 'Order #67120 was successfully intercepted and cancelled. Your card pre-authorization has been released.'",
    },
    humanStep: {
      role: "Warehouse Operations Supervisor",
      supervisor: "Floor Supervisor Bay 12",
      actionPrompt: "Authorize WMS line stoppage and inventory lock release",
      primaryAction: "Authorize Line Stoppage",
      secondaryAction: "Hold Order",
    },
    executionResult: {
      title: "Fulfillment Line Halted & Inventory Restocked",
      summary: "Picking task cancelled in WMS before item packaging. Pre-authorization released and confirmation sent.",
      metrics: { label: "Interception Speed", before: "Missed cutoff (Returned later)", after: "Instant (0 wasted shipping)" },
      dispatchedActions: [
        "WMS picking task cancelled in Bay 12",
        "Inventory reserved allocation released to available stock",
        "Payment authorization voided with zero fee penalty",
      ],
    },
  },
  {
    id: "sales",
    name: "Enterprise Inbound Quote",
    tag: "Revenue Ops",
    icon: MessageSquare,
    email: {
      from: "marcus.t@supplyhub.io",
      subject: "Inquiry: High-Volume Dedicated Rate Card (500+ shipments/mo)",
      body: "We are scaling logistics operations and need pricing for 500+ monthly automated manifests across North America. Do you have dedicated tier pricing?",
      source: "Contact Sales Form",
    },
    aiExtraction: {
      intent: "High-Volume Contract Inquiry",
      reference: "SupplyHub Logistics",
      confidence: "99.4%",
      priority: "HIGH",
      entities: [
        { label: "Prospect", value: "SupplyHub International" },
        { label: "Anticipated Volume", value: "500+ manifests/mo" },
        { label: "Matched Tier", value: "Enterprise Volume Tier 2" },
      ],
    },
    systemCheck: {
      systemName: "HubSpot CRM & ZoomInfo Intelligence",
      status: "Qualified Tier-1 Account • Regional Rep Assigned",
      statusBadge: "HIGH VALUE LEAD",
      statusColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      verifiedRecords: [
        { label: "Account Size", value: "150 Employees • Series B" },
        { label: "Assigned Executive", value: "Rachel Vance (Enterprise AE)" },
        { label: "Rate Card", value: "Enterprise Tier 2 ($1.85 / manifest)" },
      ],
    },
    aiDraft: {
      actionType: "Personalized Executive Dossier & Proposal Reply",
      targetSystem: "HubSpot Sales Suite & Outreach",
      content:
        "Hi Marcus,\n\nThank you for reaching out. Based on your projection of 500+ monthly manifests, you qualify for our Enterprise Tier 2 volume rate ($1.85 / manifest with dedicated API concurrency).\n\nI have prepared a custom pricing overview and would be glad to walk through the architecture this week:\ncalendar.spartan-automation.com/rachel-vance",
    },
    humanStep: {
      role: "Account Executive Review",
      supervisor: "Rachel Vance (Account Executive)",
      actionPrompt: "Review company briefing dossier and approve personalized rate card dispatch",
      primaryAction: "Approve & Send Proposal",
      secondaryAction: "Modify Proposal",
    },
    executionResult: {
      title: "HubSpot Deal Created & Proposal Dispatched",
      summary: "Enterprise opportunity created in CRM with Tier 2 quote. Proposal email sent with scheduling link.",
      metrics: { label: "Lead Response Time", before: "4 hours average", after: "30 seconds" },
      dispatchedActions: [
        "HubSpot CRM deal created ($18,500 ACV projection)",
        "Personalized proposal delivered to Marcus with calendar link",
        "Executive Slack alert triggered for Account Executive team",
      ],
    },
  },
];

const PIPELINE_STAGES = [
  { id: 0, number: "01", name: "Inbound Trigger", shortName: "Trigger", icon: Mail, tag: "Ingestion" },
  { id: 1, number: "02", name: "AI Understanding", shortName: "AI Reason", icon: Bot, tag: "Analysis" },
  { id: 2, number: "03", name: "System Validation", shortName: "Sys Check", icon: Database, tag: "ERP / CRM" },
  { id: 3, number: "04", name: "Human Review Gate", shortName: "Human Gate", icon: ShieldCheck, tag: "Supervisor" },
  { id: 4, number: "05", name: "Safe Execution", shortName: "Execution", icon: CheckCircle2, tag: "Sync & Send" },
];

export function AutomationDemo() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Editable customer input per scenario
  const [customMessages, setCustomMessages] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    SCENARIOS.forEach((s) => {
      init[s.id] = s.email.body;
    });
    return init;
  });

  // Editable AI prepared draft action per scenario
  const [customActionDrafts, setCustomActionDrafts] = useState<Record<string, string>>({});
  const [draftError, setDraftError] = useState<string | null>(null);
  const draftTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scenario = SCENARIOS[activeScenarioIdx];
  const currentMessage = customMessages[scenario.id] ?? scenario.email.body;
  const currentDraft = customActionDrafts[scenario.id] ?? scenario.aiDraft.content;

  // Auto-run simulation step progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      if (activeStage === 3) {
        // Pauses automatically at Stage 4 (Human Review Gate) to emphasize human oversight
        setIsAutoPlaying(false);
      } else if (activeStage < 4) {
        timer = setTimeout(() => {
          setActiveStage((prev) => prev + 1);
        }, 1800);
      }
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, activeStage]);

  const handleScenarioChange = (idx: number) => {
    setIsAutoPlaying(false);
    setActiveScenarioIdx(idx);
    setActiveStage(0);
    setDraftError(null);
  };

  const handleRunSimulation = () => {
    setActiveStage(0);
    setIsAutoPlaying(true);
  };

  const handleReset = () => {
    setIsAutoPlaying(false);
    setActiveStage(0);
    setDraftError(null);
  };

  const handleApproveAndExecute = () => {
    if (!currentDraft.trim()) {
      setDraftError("Please provide an action draft before authorizing execution.");
      draftTextareaRef.current?.focus();
      return;
    }
    setDraftError(null);
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setActiveStage(4);
    }, 600);
  };

  const handleDraftChange = (text: string) => {
    setCustomActionDrafts((prev) => ({
      ...prev,
      [scenario.id]: text,
    }));
    if (text.trim().length > 0) {
      setDraftError(null);
    }
  };

  const handleResetDraft = () => {
    setCustomActionDrafts((prev) => {
      const copy = { ...prev };
      delete copy[scenario.id];
      return copy;
    });
  };

  return (
    <section id="workflow-demo" className="py-24 relative overflow-hidden bg-brand-950/20 border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            Interactive Automation Engine
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white uppercase">
            HOW WORKFLOW AUTOMATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">ACTUALLY WORKS.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a live enterprise scenario to watch AI parse, query systems, and draft work — with execution strictly gated behind human authorization.
          </p>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-1.5 rounded-2xl glass-card border border-white/10 max-w-3xl mx-auto mt-8">
            {SCENARIOS.map((s, idx) => {
              const isActive = activeScenarioIdx === idx;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleScenarioChange(idx)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-brand-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] border border-brand-400/40"
                      : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{s.name}</span>
                  <span className={cn(
                    "text-[10px] font-mono px-1.5 py-0.2 rounded uppercase",
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-muted-foreground"
                  )}>
                    {s.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Pipeline Tracker (Horizontal Flow) */}
        <div className="glass-card rounded-2xl border border-white/10 p-3 md:p-4 mb-6 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const isPassed = activeStage > stage.id;
              const Icon = stage.icon;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStage(stage.id);
                  }}
                  className={cn(
                    "relative flex items-center gap-2.5 p-3 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden border",
                    isActive
                      ? "bg-brand-500/15 border-brand-400/60 shadow-[0_0_15px_rgba(59,130,246,0.25)] text-white"
                      : isPassed
                      ? "bg-emerald-950/10 border-emerald-500/30 text-slate-300 hover:bg-white/5"
                      : "bg-black/20 border-white/5 text-muted-foreground hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  {/* Active highlight top sheen */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent" />
                  )}

                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-colors",
                      isActive
                        ? "bg-brand-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                        : isPassed
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/5 text-white/40 border border-white/5"
                    )}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground">{stage.number}</span>
                      {stage.id === 3 && (
                        <span className="text-[9px] font-mono px-1 py-0 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                          Gate
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold truncate">
                      {stage.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pipeline Control Strip */}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-white/90">Autonomous Protocol: Active</span>
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="hidden sm:inline">Scenario: <strong className="text-white font-medium">{scenario.name}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isAutoPlaying}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/30 text-xs font-semibold transition-all cursor-pointer hover:text-white disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-brand-400" />
                {isAutoPlaying ? "Simulating..." : "Auto-Run Pipeline"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/10 text-xs font-medium transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Stage Display Container */}
        <div className="glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-[#060b17] min-h-[460px] flex flex-col justify-between p-5 md:p-8">
          <AnimatePresence mode="wait">

            {/* STAGE 01: Inbound Customer Input */}
            {activeStage === 0 && (
              <motion.div
                key="stage-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono text-xs font-bold">
                      STAGE 01
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                      Inbound Trigger Ingestion
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Layers className="w-3 h-3 text-brand-400" /> Source: {scenario.email.source}
                  </span>
                </div>

                {/* Ingestion Payload Card */}
                <div className="grid md:grid-cols-12 gap-5">
                  <div className="md:col-span-8 glass p-5 rounded-2xl border border-white/10 bg-black/40 space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pb-2.5 border-b border-white/10 gap-2">
                      <div><strong className="text-white">Sender:</strong> {scenario.email.from}</div>
                      <div><strong className="text-white">Subject:</strong> {scenario.email.subject}</div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-brand-300 flex items-center gap-1.5">
                          <PenLine className="w-3 h-3 text-brand-400" />
                          <span>Customer / Partner Message Payload (Editable):</span>
                        </label>
                        {customMessages[scenario.id] && customMessages[scenario.id] !== scenario.email.body && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomMessages((prev) => ({ ...prev, [scenario.id]: scenario.email.body }));
                            }}
                            className="text-[10px] text-muted-foreground hover:text-brand-300 transition-colors"
                          >
                            Reset text
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={currentMessage}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomMessages((prev) => ({ ...prev, [scenario.id]: val }));
                        }}
                        className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 resize-none font-sans leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-4 glass p-5 rounded-2xl border border-white/10 bg-black/40 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Ingestion Telemetry
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-muted-foreground">Payload Protocol:</span>
                          <span className="font-mono text-white">JSON / REST Webhook</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-muted-foreground">Encryption:</span>
                          <span className="font-mono text-emerald-400">TLS 1.3 End-to-End</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-muted-foreground">Latency:</span>
                          <span className="font-mono text-cyan-300">18 ms</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveStage(1)}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      Next: AI Extraction <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 02: AI Intent & Entity Extraction */}
            {activeStage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                      STAGE 02
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                      AI Intent Parsing & Entity Extraction
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Confidence: {scenario.aiExtraction.confidence}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Classified Intent</span>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {scenario.aiExtraction.intent}
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Primary Reference</span>
                    <div className="text-sm font-bold font-mono text-cyan-300">
                      {scenario.aiExtraction.reference}
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Triage Priority</span>
                    <div className="text-sm font-bold text-amber-300">
                      {scenario.aiExtraction.priority} LEVEL
                    </div>
                  </div>
                </div>

                <div className="glass p-5 rounded-2xl border border-white/10 bg-black/40 space-y-3">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" /> Structured Extraction Attributes
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {scenario.aiExtraction.entities.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">{item.label}</div>
                        <div className="text-xs font-semibold text-white mt-1 truncate">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStage(0)}
                    className="text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    ← Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStage(2)}
                    className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    Next: Connected System Check <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 03: System Validation & ERP Query */}
            {activeStage === 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                      STAGE 03
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                      Connected Enterprise Verification
                    </h3>
                  </div>
                  <span className={cn("text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase", scenario.systemCheck.statusColor)}>
                    {scenario.systemCheck.statusBadge}
                  </span>
                </div>

                <div className="glass p-5 rounded-2xl border border-blue-500/30 bg-blue-950/15 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-mono text-muted-foreground uppercase">Target Infrastructure</div>
                      <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-2">
                        <Database className="w-4 h-4 text-brand-400" />
                        {scenario.systemCheck.systemName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-mono text-muted-foreground uppercase">Live Record Status</div>
                      <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                        {scenario.systemCheck.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {scenario.systemCheck.verifiedRecords.map((rec, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">{rec.label}</div>
                        <div className="text-xs font-medium text-white/90 mt-1">{rec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStage(1)}
                    className="text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    ← Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStage(3)}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    Proceed to Human Review Gate <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 04: Human Review Gate (HITL - Gated Authorization) */}
            {activeStage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                {/* Header with safety gate warning */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                      STAGE 04 / 05
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Supervised Human Review Gate
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 animate-pulse">
                    <Lock className="w-3 h-3" /> Awaiting Human Authorization
                  </span>
                </div>

                {/* Safety Protocol Banner */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5 leading-relaxed">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 font-semibold">Strict Human-in-the-Loop Protocol: </strong>
                    Autonomous execution is suspended. No live financial, CRM, or external communications will execute without explicit supervisor authorization.
                  </div>
                </div>

                {/* Action Review Form Card */}
                <div className="glass p-5 rounded-2xl border border-emerald-500/30 bg-black/40 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between text-xs gap-2 pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white uppercase">{scenario.humanStep.role}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">({scenario.humanStep.supervisor})</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{scenario.humanStep.actionPrompt}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="prepared-action-input" className="font-semibold text-brand-300 flex items-center gap-1.5">
                        <PenLine className="w-3 h-3 text-brand-400" />
                        <span>AI Prepared Action (User Editable Before Approval):</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {customActionDrafts[scenario.id] !== undefined && (
                          <button
                            type="button"
                            onClick={handleResetDraft}
                            className="text-[11px] text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                          >
                            Reset to AI draft
                          </button>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Directly Editable
                        </span>
                      </div>
                    </div>

                    <textarea
                      ref={draftTextareaRef}
                      id="prepared-action-input"
                      rows={4}
                      value={currentDraft}
                      onChange={(e) => handleDraftChange(e.target.value)}
                      className={cn(
                        "w-full p-3.5 rounded-xl bg-black/60 border text-xs md:text-sm text-white/95 leading-relaxed font-sans transition-all focus:outline-none resize-y min-h-[100px]",
                        draftError
                          ? "border-rose-500/70 focus:border-rose-500 bg-rose-950/15"
                          : "border-white/15 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40"
                      )}
                    />

                    {draftError && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 font-medium pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {draftError}
                      </p>
                    )}
                  </div>

                  {/* Decision Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleApproveAndExecute}
                      disabled={isExecuting}
                      className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer disabled:opacity-60"
                    >
                      {isExecuting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Authorizing & Executing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{scenario.humanStep.primaryAction}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => draftTextareaRef.current?.focus()}
                      className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/10 text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PenLine className="w-3.5 h-3.5 text-brand-400" />
                      <span>{scenario.humanStep.secondaryAction}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 05: Safe Execution Completed */}
            {activeStage === 4 && (
              <motion.div
                key="stage-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_28px_rgba(16,185,129,0.35)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="max-w-xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Authorized Execution Completed
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {scenario.executionResult.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {scenario.executionResult.summary}
                  </p>
                </div>

                {/* Performance Metric Tile */}
                <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono mx-auto">
                  <span className="text-muted-foreground">{scenario.executionResult.metrics.label}:</span>
                  <span className="text-rose-300 line-through">{scenario.executionResult.metrics.before}</span>
                  <span className="text-emerald-400 font-bold">{scenario.executionResult.metrics.after}</span>
                </div>

                {/* Dispatched Items Grid */}
                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                  {scenario.executionResult.dispatchedActions.map((action, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 flex items-start gap-2 text-xs text-white/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-brand-300 hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Run scenario again
                  </button>
                  <span className="text-white/20">•</span>
                  <button
                    type="button"
                    onClick={() => handleScenarioChange((activeScenarioIdx + 1) % SCENARIOS.length)}
                    className="text-xs text-brand-300 hover:text-white underline underline-offset-4 cursor-pointer font-semibold"
                  >
                    Try next scenario →
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
