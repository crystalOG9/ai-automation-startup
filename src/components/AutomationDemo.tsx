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
  Pause,
  RotateCcw,
  Truck,
  FileText,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  XCircle,
  Cpu,
  Layers,
  Sparkles,
  Activity,
  Code2,
  Edit3,
  Check,
  Clock,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface Scenario {
  id: string;
  code: string;
  name: string;
  category: string;
  icon: LucideIcon;
  trigger: {
    protocol: string;
    source: string;
    topic: string;
    payloadSize: string;
    rawPayload: string;
    timestamp: string;
  };
  aiAnalysis: {
    intent: string;
    confidence: string;
    model: string;
    latency: string;
    structuredJson: Record<string, unknown>;
    extractedEntities: { label: string; value: string }[];
  };
  humanGate: {
    supervisorRole: string;
    supervisorId: string;
    policyRule: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    defaultParams: {
      action: string;
      targetSystem: string;
      recipient: string;
      notes: string;
      financialCommit?: string;
    };
  };
  execution: {
    title: string;
    summary: string;
    metrics: { label: string; manual: string; automated: string };
    dispatchedSystems: {
      name: string;
      action: string;
      status: "SYNCED" | "DISPATCHED" | "COMMITTED";
      badgeColor: string;
    }[];
    auditLog: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "logistics",
    code: "SCENARIO A",
    name: "Logistics Delay Triage",
    category: "Supply Chain & Ops",
    icon: Truck,
    trigger: {
      protocol: "EDI Webhook / HTTPS POST",
      source: "FedEx Fleet Telemetry & SAP Carrier Ingestion",
      topic: "v1.logistics.freight.exception",
      payloadSize: "1.42 KB",
      rawPayload: `{\n  "event": "CARRIER_DISCREPANCY",\n  "tracking_id": "1Z999482910394",\n  "order_ref": "ORD-48291",\n  "status": "WEATHER_HOLD_CLEARED",\n  "hub": "Regional Hub 4 (Denver)",\n  "revised_eta": "2026-09-12T10:30:00Z",\n  "client_tier": "Enterprise Tier-1",\n  "notification_flag": true\n}`,
      timestamp: "2026-09-11 02:14:08 UTC",
    },
    aiAnalysis: {
      intent: "Transit Delay & Delivery Rescheduling",
      confidence: "99.8%",
      model: "SPARTAN DeepReason v4",
      latency: "14.2 ms",
      structuredJson: {
        orderId: "ORD-48291",
        trackingNumber: "1Z999482910394",
        originStatus: "Weather Delay Released",
        currentHub: "Denver Hub #4",
        resolvedEta: "Tomorrow at 10:30 AM MDT",
        urgency: "HIGH",
        clientEscalationRisk: "Low (Sub-24h clearance)",
      },
      extractedEntities: [
        { label: "Order Number", value: "ORD-48291" },
        { label: "Carrier Tracking", value: "1Z999482910394" },
        { label: "Updated Arrival", value: "Tomorrow 10:30 AM" },
        { label: "Account SLA", value: "Tier 1 Priority SLA" },
      ],
    },
    humanGate: {
      supervisorRole: "Logistics Operations Lead",
      supervisorId: "Supervisor #412",
      policyRule: "Mandatory human review for Tier-1 customer SLA notifications",
      riskLevel: "MEDIUM",
      defaultParams: {
        action: "Client ETA Dispatch & ERP Status Sync",
        targetSystem: "SAP S/4HANA & Zendesk Support",
        recipient: "logistics-ops@apexglobal.com",
        notes: "Weather delay cleared. Final mile delivery rescheduled for tomorrow 10:30 AM. GPS link attached.",
      },
    },
    execution: {
      title: "Carrier Telemetry Synced & Client Updated",
      summary: "SAP ERP delivery schedule updated. Customer notification delivered via automated portal ticket with real-time GPS tracking.",
      metrics: { label: "Resolution Cycle", manual: "38 minutes", automated: "14 seconds" },
      dispatchedSystems: [
        { name: "SAP S/4HANA", action: "Delivery ETA updated to tomorrow 10:30 AM", status: "SYNCED", badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
        { name: "Zendesk Support", action: "High-priority client alert dispatched", status: "DISPATCHED", badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
        { name: "Fleet Telemetry Bus", action: "Exception ticket auto-closed", status: "COMMITTED", badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
      ],
      auditLog: [
        "02:14:08.120 - Webhook received from FedEx Fleet API (1.42 KB)",
        "02:14:08.134 - AI parsed tracking #1Z999482910394 with 99.8% confidence",
        "02:14:08.140 - Human supervisor approved action payload",
        "02:14:08.158 - Dispatched updates to SAP ERP & Zendesk concurrently",
      ],
    },
  },
  {
    id: "invoice",
    code: "SCENARIO B",
    name: "Invoice & Receipt Data Extraction",
    category: "Finance & Accounts",
    icon: FileText,
    trigger: {
      protocol: "Email Ingestion / PDF Parser Webhook",
      source: "AP Inbound Mailbox (invoices@spartan.tech)",
      topic: "v2.finance.ap.invoice_ingestion",
      payloadSize: "3.18 KB (Base64 OCR Stream)",
      rawPayload: `{\n  "document_id": "DOC-INV-2026-8812",\n  "vendor": "Acme Industrial Hardware Inc.",\n  "vendor_tax_id": "US-84-9920194",\n  "po_reference": "PO-99104",\n  "line_items_count": 4,\n  "subtotal": 14250.00,\n  "tax": 1140.00,\n  "total_amount": 15390.00,\n  "currency": "USD",\n  "due_date": "2026-10-15"\n}`,
      timestamp: "2026-09-11 02:15:30 UTC",
    },
    aiAnalysis: {
      intent: "3-Way PO Match & Accounts Payable Extraction",
      confidence: "99.5%",
      model: "SPARTAN VisionDoc OCR v3",
      latency: "18.6 ms",
      structuredJson: {
        vendorName: "Acme Industrial Hardware Inc.",
        invoiceNumber: "INV-2026-8812",
        poNumber: "PO-99104",
        amountDue: "$15,390.00 USD",
        matchStatus: "3-Way PO Match Verified (0.00 variance)",
        glCode: "GL-5100-RawMaterials",
        taxCalculatedCorrectly: true,
      },
      extractedEntities: [
        { label: "Vendor", value: "Acme Industrial Hardware" },
        { label: "Invoice Amount", value: "$15,390.00 USD" },
        { label: "Purchase Order", value: "PO-99104 (Approved)" },
        { label: "GL Account", value: "5100 - Raw Materials" },
      ],
    },
    humanGate: {
      supervisorRole: "Finance Operations Manager",
      supervisorId: "Controller #88",
      policyRule: "Invoices exceeding $10,000 require explicit controller sign-off",
      riskLevel: "HIGH",
      defaultParams: {
        action: "Post Bill to NetSuite & Schedule ACH Batch",
        targetSystem: "Oracle NetSuite Financials & Tipalti",
        recipient: "ap-accounting@acmeindustrial.com",
        notes: "3-way PO match confirmed against Receiving Slip #RCV-4018. Bill ready for scheduled batch run.",
        financialCommit: "$15,390.00 USD",
      },
    },
    execution: {
      title: "Ledger Committed & AP Voucher Created",
      summary: "NetSuite posted General Ledger voucher #VCH-88120. Vendor payment scheduled for net-30 ACH batch.",
      metrics: { label: "Processing Time", manual: "45 minutes", automated: "18 seconds" },
      dispatchedSystems: [
        { name: "Oracle NetSuite", action: "AP Voucher #VCH-88120 posted to GL-5100", status: "COMMITTED", badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
        { name: "Tipalti ACH Hub", action: "Payment scheduled for Net-30 run (Oct 15)", status: "SYNCED", badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
        { name: "Document Archive", action: "Invoice PDF & OCR audit payload encrypted", status: "COMMITTED", badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
      ],
      auditLog: [
        "02:15:30.012 - Inbound invoice PDF ingested via OCR stream",
        "02:15:30.031 - 3-way match verified against ERP purchase order PO-99104",
        "02:15:30.038 - Financial controller authorized voucher commit ($15,390.00)",
        "02:15:30.055 - Ledger updated in Oracle NetSuite; remittance sent",
      ],
    },
  },
  {
    id: "leads",
    code: "SCENARIO C",
    name: "Inbound Lead Triage & Enrichment",
    category: "Revenue & Sales Ops",
    icon: MessageSquare,
    trigger: {
      protocol: "REST API Ingestion / HubSpot Webhook",
      source: "Enterprise Website Quote Form",
      topic: "v1.sales.inbound_lead.created",
      payloadSize: "0.98 KB",
      rawPayload: `{\n  "first_name": "Marcus",\n  "last_name": "Thorne",\n  "work_email": "marcus.t@supplyhub.io",\n  "company": "SupplyHub International",\n  "headcount_range": "100-250",\n  "notes": "Looking to automate 500+ monthly EDI freight manifests across our North American warehouses.",\n  "utm_source": "google_search"\n}`,
      timestamp: "2026-09-11 02:16:04 UTC",
    },
    aiAnalysis: {
      intent: "High-Volume Enterprise Contract Inquiry",
      confidence: "99.4%",
      model: "SPARTAN LeadReason v4",
      latency: "11.8 ms",
      structuredJson: {
        leadScore: "96 / 100 (Tier-1 Enterprise)",
        enrichmentProvider: "Apollo.io & Clearbit API",
        estimatedAcv: "$42,000 / year",
        suggestedRep: "Sarah Lin (Strategic Accounts)",
        recommendedPlan: "Enterprise Dedicated Concurrency",
        priority: "CRITICAL",
      },
      extractedEntities: [
        { label: "Company", value: "SupplyHub International" },
        { label: "Estimated ACV", value: "$42,000 USD/yr" },
        { label: "Account Score", value: "96 / 100 (Tier-1)" },
        { label: "Assigned Rep", value: "Sarah Lin (Enterprise AE)" },
      ],
    },
    humanGate: {
      supervisorRole: "Enterprise Sales Director",
      supervisorId: "SDR Lead #14",
      policyRule: "Review AI enterprise dossier before auto-scheduling and Slack dispatch",
      riskLevel: "LOW",
      defaultParams: {
        action: "Create HubSpot Deal & Send Personalized Executive Dossier",
        targetSystem: "HubSpot CRM & Sales Outreach Slack",
        recipient: "marcus.t@supplyhub.io",
        notes: "Enriched with 180 employees, Series-B logistics firm. Personalized intro with dedicated architecture deck.",
      },
    },
    execution: {
      title: "HubSpot Opportunity Staged & Slack Alert Dispatched",
      summary: "Enterprise opportunity created with $42K ACV projection. Personalized rate card sent with calendar booking link.",
      metrics: { label: "Lead Response Time", manual: "3.5 hours", automated: "22 seconds" },
      dispatchedSystems: [
        { name: "HubSpot CRM", action: "Enterprise Deal staged at 'Qualified Prospect'", status: "COMMITTED", badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
        { name: "Slack #enterprise-leads", action: "Dossier & instant claiming thread generated", status: "DISPATCHED", badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
        { name: "Personalized Outreach", action: "Executive email delivered with direct booking link", status: "DISPATCHED", badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
      ],
      auditLog: [
        "02:16:04.004 - Inbound form submission received from SupplyHub.io",
        "02:16:04.016 - Apollo enrichment completed: 180 employees, Series B, $42K ACV",
        "02:16:04.022 - Sales Director approved personalized dispatch",
        "02:16:04.040 - HubSpot deal created and executive email sent",
      ],
    },
  },
  {
    id: "refund",
    code: "SCENARIO D",
    name: "Customer Refund Verification",
    category: "Customer Support & Risk",
    icon: RotateCcw,
    trigger: {
      protocol: "Zendesk API / Stripe Dispute Webhook",
      source: "Help Center Customer Portal",
      topic: "v1.support.ticket.refund_requested",
      payloadSize: "1.15 KB",
      rawPayload: `{\n  "ticket_id": "ZD-991204",\n  "customer_email": "elena.r@meridian-retail.com",\n  "order_id": "ORD-77192",\n  "claim_reason": "Damaged exterior packaging on arrival",\n  "requested_refund_amount": 142.50,\n  "currency": "USD",\n  "delivery_timestamp": "2026-09-08T14:20:00Z"\n}`,
      timestamp: "2026-09-11 02:17:15 UTC",
    },
    aiAnalysis: {
      intent: "Refund Validation & Policy Compliance Check",
      confidence: "99.7%",
      model: "SPARTAN RiskGuard v2",
      latency: "13.5 ms",
      structuredJson: {
        orderId: "ORD-77192",
        originalChargeId: "ch_3N99120488ST",
        chargeAmount: "$142.50 USD",
        customerDisputeHistory: "0 prior disputes (Trust Score: 98/100)",
        warrantyWindowValid: true,
        policyCompliance: "PASSED: Within 30-day return policy",
      },
      extractedEntities: [
        { label: "Order ID", value: "ORD-77192" },
        { label: "Refund Amount", value: "$142.50 USD" },
        { label: "Customer Trust", value: "98/100 (0 prior disputes)" },
        { label: "Policy Check", value: "PASSED (Valid 30d window)" },
      ],
    },
    humanGate: {
      supervisorRole: "Support Team Lead",
      supervisorId: "CS Lead #29",
      policyRule: "Strict zero unauthorized financial commits without human verification",
      riskLevel: "MEDIUM",
      defaultParams: {
        action: "Execute Stripe Refund & Customer Apology Notice",
        targetSystem: "Stripe API & Zendesk Support",
        recipient: "elena.r@meridian-retail.com",
        notes: "Packaging damage verified with delivery photo. Full credit of $142.50 to original payment method.",
        financialCommit: "$142.50 USD",
      },
    },
    execution: {
      title: "Stripe Refund Processed & Customer Credited",
      summary: "Stripe payment gateway issued $142.50 refund to Visa ending in 8192. Zendesk ticket resolved with receipt.",
      metrics: { label: "Dispute Turnaround", manual: "2.5 days", automated: "16 seconds" },
      dispatchedSystems: [
        { name: "Stripe Gateway", action: "Refund #re_3N991204 committed to Visa ****8192", status: "COMMITTED", badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
        { name: "Zendesk Support", action: "Ticket marked 'Resolved • Refund Issued'", status: "SYNCED", badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
        { name: "Customer Notification", action: "Receipt PDF & apology email delivered", status: "DISPATCHED", badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
      ],
      auditLog: [
        "02:17:15.010 - Inbound refund request received for order ORD-77192",
        "02:17:15.023 - Stripe transaction validated; customer trust rating 98/100",
        "02:17:15.030 - Support Lead approved $142.50 gateway transaction",
        "02:17:15.048 - Stripe refund processed and confirmation sent to customer",
      ],
    },
  },
];

const STAGES = [
  { id: 0, number: "01", name: "Trigger Ingestion", short: "Trigger", icon: Mail, tag: "Live Event" },
  { id: 1, number: "02", name: "AI Classification", short: "AI Parsing", icon: Bot, tag: "DeepReason" },
  { id: 2, number: "03", name: "Human-in-the-Loop", short: "Gatekeeper", icon: ShieldCheck, tag: "Operator Approval" },
  { id: 3, number: "04", name: "Execution Telemetry", short: "Telemetry", icon: CheckCircle2, tag: "CRM / ERP Sync" },
];

export function AutomationDemo() {
  const { toast } = useToast();
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"raw" | "json">("json");
  const [isEditingParams, setIsEditingParams] = useState(false);
  const [customParams, setCustomParams] = useState<Record<string, { notes: string; recipient: string; action: string }>>({});
  const [liveLatency, setLiveLatency] = useState(14.2);

  const scenario = SCENARIOS[activeScenarioIdx];
  const currentParam = customParams[scenario.id] || {
    notes: scenario.humanGate.defaultParams.notes,
    recipient: scenario.humanGate.defaultParams.recipient,
    action: scenario.humanGate.defaultParams.action,
  };

  // Subtle live latency telemetry jitter for realistic enterprise monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLatency((prev) => {
        const delta = (Math.random() - 0.5) * 1.2;
        return Number(Math.max(10.2, Math.min(18.9, prev + delta)).toFixed(1));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-play simulation control (automatically pauses at Human Gatekeeper to emphasize oversight)
  useEffect(() => {
    if (!isPlaying) return;

    if (activeStage === 2) {
      // Stage 3 (index 2: Human Gatekeeper) requires explicit human choice
      const timeout = setTimeout(() => {
        setIsPlaying(false);
        toast.info("Human Gatekeeper Reached", "Awaiting human operator authorization");
      }, 300);
      return () => clearTimeout(timeout);
    }

    if (activeStage < 3) {
      const timer = setTimeout(() => {
        setActiveStage((prev) => prev + 1);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      const timeout = setTimeout(() => {
        setIsPlaying(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, activeStage, toast]);

  const handleScenarioSwitch = (idx: number) => {
    setIsPlaying(false);
    setActiveScenarioIdx(idx);
    setActiveStage(0);
    setIsEditingParams(false);
    toast.info(`Switched to: ${SCENARIOS[idx].name}`, SCENARIOS[idx].category);
  };

  const handleApprove = () => {
    toast.success(
      "Action Authorized",
      `Dispatched to ${scenario.humanGate.defaultParams.targetSystem}`
    );
    setActiveStage(3);
    setIsEditingParams(false);
  };

  const handleReject = () => {
    toast.warning(
      "Action Rejected",
      "Task routed to Senior Supervisor queue for manual review"
    );
    setIsEditingParams(false);
  };

  const handleSaveParams = () => {
    setIsEditingParams(false);
    toast.info("Parameters Updated", "Customized action payload ready for authorization");
  };

  return (
    <section id="workflow-demo" className="py-24 relative overflow-hidden bg-[#02050a] border-t border-white/5">
      {/* Subtle background gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Interactive Workflow Engine
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            SEE REAL-TIME AI WITH <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">
              HUMAN GATEKEEPER GOVERNANCE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Select an enterprise scenario below and step through the 4-stage pipeline. Every critical action requires explicit operator authorization.
          </motion.p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 max-w-5xl mx-auto">
          {SCENARIOS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeScenarioIdx === idx;
            return (
              <button
                key={s.id}
                onClick={() => handleScenarioSwitch(idx)}
                className={`p-3.5 md:p-4 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? "bg-brand-950/40 border-brand-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-muted-foreground uppercase">
                    {s.code}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                      isActive
                        ? "bg-brand-500/20 border-brand-500/40 text-brand-300"
                        : "bg-white/5 border-white/10 text-muted-foreground group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-sm font-bold text-white tracking-tight truncate mb-0.5">
                  {s.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {s.category}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeScenarioIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Simulation Console Container */}
        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#060a12]/90 backdrop-blur-2xl">
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1" />
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  LATENCY: <strong className="text-emerald-400 font-semibold">{liveLatency}ms</strong>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span>•</span>
                <span>PKT: {scenario.trigger.payloadSize}</span>
                <span>•</span>
                <span>{scenario.trigger.protocol}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  isPlaying
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-brand-500/20 text-brand-300 border border-brand-500/40 hover:bg-brand-500/30"
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause" : "Auto-Run"}</span>
              </button>

              <button
                onClick={() => {
                  setActiveStage(0);
                  setIsPlaying(false);
                  setIsEditingParams(false);
                }}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4-Stage Progress Stepper Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-black/30">
            {STAGES.map((st, idx) => {
              const StageIcon = st.icon;
              const isCurrent = activeStage === idx;
              const isCompleted = activeStage > idx;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setActiveStage(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-4 text-left border-r border-white/5 last:border-r-0 transition-all relative ${
                    isCurrent
                      ? "bg-white/[0.04]"
                      : isCompleted
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                      STAGE {st.number}
                    </span>
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,1)] animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StageIcon className={`w-4 h-4 ${isCurrent ? "text-brand-400" : "text-muted-foreground"}`} />
                    <span className="text-xs md:text-sm font-semibold text-white truncate">
                      {st.name}
                    </span>
                  </div>
                  {isCurrent && (
                    <motion.div
                      layoutId="activeStageBar"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Stage Display Canvas */}
          <div className="p-6 md:p-8 min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* STAGE 1: TRIGGER INGESTION */}
              {activeStage === 0 && (
                <motion.div
                  key="stage-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-brand-400 mb-1">
                        Stage 01 • Inbound Event Ingestion
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Webhook Trigger: {scenario.trigger.topic}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE STREAM ACTIVE
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] text-muted-foreground uppercase font-mono">Ingestion Protocol</div>
                      <div className="text-sm font-semibold text-white mt-1">{scenario.trigger.protocol}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] text-muted-foreground uppercase font-mono">Source Origin</div>
                      <div className="text-sm font-semibold text-white mt-1">{scenario.trigger.source}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] text-muted-foreground uppercase font-mono">Telemetry Timestamp</div>
                      <div className="text-sm font-semibold text-white mt-1 font-mono">{scenario.trigger.timestamp}</div>
                    </div>
                  </div>

                  {/* Raw Inbound Payload Window */}
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center justify-between">
                      <span>Inbound Event Payload ({scenario.trigger.payloadSize})</span>
                      <span className="text-emerald-400 font-mono">200 OK • Verified Signature</span>
                    </div>
                    <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-brand-200 overflow-x-auto leading-relaxed shadow-inner">
                      {scenario.trigger.rawPayload}
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: AI PARSING & CLASSIFICATION */}
              {activeStage === 1 && (
                <motion.div
                  key="stage-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                        Stage 02 • AI Reasoning & Entity Extraction
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Classified Intent: {scenario.aiAnalysis.intent}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode("json")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                          viewMode === "json"
                            ? "bg-brand-500/20 text-brand-300 border border-brand-500/40"
                            : "bg-white/5 text-muted-foreground hover:text-white"
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5 inline mr-1" /> Structured JSON
                      </button>
                      <button
                        onClick={() => setViewMode("raw")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                          viewMode === "raw"
                            ? "bg-brand-500/20 text-brand-300 border border-brand-500/40"
                            : "bg-white/5 text-muted-foreground hover:text-white"
                        }`}
                      >
                        Raw Payload
                      </button>
                    </div>
                  </div>

                  {/* Extraction Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">Model Engine</div>
                      <div className="text-xs sm:text-sm font-semibold text-white mt-1">{scenario.aiAnalysis.model}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">Confidence Score</div>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">{scenario.aiAnalysis.confidence}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">Inference Latency</div>
                      <div className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1">{scenario.aiAnalysis.latency}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-muted-foreground uppercase font-mono">Extraction Status</div>
                      <div className="text-xs sm:text-sm font-semibold text-purple-400 mt-1">100% SCHEMA MATCH</div>
                    </div>
                  </div>

                  {/* Extracted Entities Grid */}
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-2">
                      Extracted Business Entities
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {scenario.aiAnalysis.extractedEntities.map((ent) => (
                        <div key={ent.label} className="p-3 rounded-xl bg-brand-950/20 border border-brand-500/20">
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">{ent.label}</div>
                          <div className="text-xs font-semibold text-brand-200 mt-0.5 truncate">{ent.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code View Toggle */}
                  <div>
                    <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed shadow-inner max-h-[160px]">
                      {viewMode === "json"
                        ? JSON.stringify(scenario.aiAnalysis.structuredJson, null, 2)
                        : scenario.trigger.rawPayload}
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: HUMAN-IN-THE-LOOP GATEKEEPER */}
              {activeStage === 2 && (
                <motion.div
                  key="stage-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        Stage 03 • Human-in-the-Loop Gatekeeper
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Operator Authorization Checkpoint
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                      <span>RISK LEVEL: {scenario.humanGate.riskLevel}</span>
                      <span>•</span>
                      <span>{scenario.humanGate.supervisorId}</span>
                    </div>
                  </div>

                  {/* Policy Rule Notice */}
                  <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        Active Governance Policy
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {scenario.humanGate.policyRule}
                      </div>
                    </div>
                  </div>

                  {/* Action Parameters (Editable or Readonly) */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-muted-foreground uppercase">
                        AI Prepared Action Payload
                      </div>
                      <button
                        onClick={() => setIsEditingParams(!isEditingParams)}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isEditingParams ? "Cancel Edit" : "Edit Parameters"}</span>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-muted-foreground uppercase">Target Systems</label>
                        <div className="text-xs font-semibold text-white mt-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          {scenario.humanGate.defaultParams.targetSystem}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-muted-foreground uppercase">Recipient / Destination</label>
                        {isEditingParams ? (
                          <input
                            type="text"
                            value={currentParam.recipient}
                            onChange={(e) =>
                              setCustomParams((prev) => ({
                                ...prev,
                                [scenario.id]: { ...currentParam, recipient: e.target.value },
                              }))
                            }
                            className="w-full mt-1 p-2 rounded-xl bg-black/60 border border-brand-500/40 text-xs text-white focus:outline-none"
                          />
                        ) : (
                          <div className="text-xs font-semibold text-white mt-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 truncate">
                            {currentParam.recipient}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-muted-foreground uppercase">Action Dispatch Notes / Message</label>
                      {isEditingParams ? (
                        <textarea
                          rows={3}
                          value={currentParam.notes}
                          onChange={(e) =>
                            setCustomParams((prev) => ({
                              ...prev,
                              [scenario.id]: { ...currentParam, notes: e.target.value },
                            }))
                          }
                          className="w-full mt-1 p-2.5 rounded-xl bg-black/60 border border-brand-500/40 text-xs text-white focus:outline-none font-sans"
                        />
                      ) : (
                        <div className="text-xs text-slate-300 mt-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 leading-relaxed font-mono">
                          {currentParam.notes}
                        </div>
                      )}
                    </div>

                    {scenario.humanGate.defaultParams.financialCommit && (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                        <span className="font-semibold">Authorizing Financial Commitment:</span>
                        <span className="font-mono font-bold text-sm">{scenario.humanGate.defaultParams.financialCommit}</span>
                      </div>
                    )}
                  </div>

                  {/* Gatekeeper Decision Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    {isEditingParams && (
                      <button
                        onClick={handleSaveParams}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        Save Adjusted Parameters
                      </button>
                    )}
                    <button
                      onClick={handleReject}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <XCircle className="w-4 h-4" /> Reject Action
                    </button>
                    <button
                      onClick={handleApprove}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Authorize & Dispatch
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: EXECUTION TELEMETRY */}
              {activeStage === 3 && (
                <motion.div
                  key="stage-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Stage 04 • Safe Execution Telemetry
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {scenario.execution.title}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                      <span>AUDIT HASH: 0x8F9B2...</span>
                      <span>•</span>
                      <span>ALL SYSTEMS SYNCED</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {scenario.execution.summary}
                  </p>

                  {/* System Status Badges */}
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-3">
                      Dispatched System Updates & Status Badges
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {scenario.execution.dispatchedSystems.map((sys) => (
                        <div key={sys.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-white">{sys.name}</span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${sys.badgeColor}`}>
                                {sys.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {sys.action}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Speed & ROI Delta Callout */}
                  <div className="p-4 rounded-2xl bg-brand-950/30 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white uppercase tracking-wider">
                          Operational Speed Gain
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {scenario.execution.metrics.label}: Reduced from {scenario.execution.metrics.manual} down to{" "}
                          <strong className="text-emerald-400 font-bold">{scenario.execution.metrics.automated}</strong>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const contact = document.getElementById("contact");
                        if (contact) contact.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
                    >
                      Automate Similar Workflow
                    </button>
                  </div>

                  {/* Real-Time Immutable Audit Log */}
                  <div>
                    <div className="text-xs font-mono text-muted-foreground mb-2">
                      Immutable Audit Trail
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1 text-xs font-mono text-slate-400">
                      {scenario.execution.auditLog.map((log, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-brand-400">›</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
              <button
                disabled={activeStage === 0}
                onClick={() => {
                  setActiveStage((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeStage === 0
                    ? "opacity-30 cursor-not-allowed text-muted-foreground"
                    : "text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 border border-white/5"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Stage
              </button>

              <div className="text-xs font-mono text-muted-foreground">
                Step {activeStage + 1} of {STAGES.length}
              </div>

              <button
                disabled={activeStage === STAGES.length - 1}
                onClick={() => {
                  setActiveStage((prev) => Math.min(STAGES.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeStage === STAGES.length - 1
                    ? "opacity-30 cursor-not-allowed text-muted-foreground"
                    : "text-white bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/40"
                }`}
              >
                Next Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
