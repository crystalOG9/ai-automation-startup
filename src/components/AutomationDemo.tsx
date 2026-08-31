"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Bot,
  Database,
  Send,
  UserCheck,
  CheckCircle2,
  Play,
  RotateCcw,
  Truck,
  RotateCcw as RefundIcon,
  XCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  name: string;
  icon: LucideIcon;
  email: {
    from: string;
    subject: string;
    body: string;
  };
  aiExtraction: {
    intent: string;
    reference: string;
    details: string;
  };
  systemCheck: {
    title: string;
    status: string;
    statusColor: string;
    dataPoint: string;
    dataValue: string;
  };
  aiDraft: {
    actionType: string;
    content: string;
  };
  humanStep: {
    role: string;
    actionPrompt: string;
    primaryAction: string;
    secondaryAction: string;
  };
  result: {
    summary: string;
    actions: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "delivery",
    name: "DELIVERY DELAY",
    icon: Truck,
    email: {
      from: "sarah.m@company.com",
      subject: "Inquiry: Order #48291 status",
      body: "My order #48291 hasn't arrived yet and was supposed to be here yesterday. Can you check?",
    },
    aiExtraction: {
      intent: "Delivery Delay Inquiry",
      reference: "Order #48291",
      details: "High priority • Existing client",
    },
    systemCheck: {
      title: "Logistics & ERP Lookup",
      status: "Delayed in Transit",
      statusColor: "text-amber-400",
      dataPoint: "Updated Courier ETA",
      dataValue: "Tomorrow, 10:00 AM (Weather hold resolved)",
    },
    aiDraft: {
      actionType: "Proposed Customer Update",
      content:
        "Hello Sarah,\n\nYour order #48291 experienced a brief transit delay due to weather conditions. It is now out for delivery and scheduled to arrive tomorrow by 10:00 AM.\n\nHere is your tracking link: track.shipping.com/48291",
    },
    humanStep: {
      role: "Customer Support Lead",
      actionPrompt: "Review and approve automated customer notification",
      primaryAction: "Approve & Send",
      secondaryAction: "Edit Message",
    },
    result: {
      summary: "Customer Notified & Case Resolved",
      actions: ["Customer email sent", "CRM ticket updated", "Carrier status logged"],
    },
  },
  {
    id: "refund",
    name: "REFUND REQUEST",
    icon: RefundIcon,
    email: {
      from: "david.k@enterprise.org",
      subject: "Refund Request: Invoice #91024",
      body: "Order #91024 arrived with damaged packaging. Requesting a replacement or refund for $84.50.",
    },
    aiExtraction: {
      intent: "Refund / Damage Claim",
      reference: "Invoice #91024",
      details: "Amount: $84.50 • Return window valid",
    },
    systemCheck: {
      title: "Payment Gateway & Order Policy",
      status: "Eligible for Refund",
      statusColor: "text-emerald-400",
      dataPoint: "Policy Verification",
      dataValue: "Delivered 3 days ago • Within 30-day guarantee",
    },
    aiDraft: {
      actionType: "Prepared Refund Transaction & Reply",
      content:
        "AI prepared refund payload ($84.50 via Stripe) + drafted reply:\n\n'Hi David,\nWe sincerely apologize for the damaged package. A full refund of $84.50 has been approved to your original payment method. Receipt #REF-91024.'",
    },
    humanStep: {
      role: "Finance Manager Approval",
      actionPrompt: "Financial transaction requires human approval before execution",
      primaryAction: "Approve $84.50 Refund",
      secondaryAction: "Request Item Photos",
    },
    result: {
      summary: "Human Authorized • Transaction Executed",
      actions: ["Payment gateway executed $84.50 refund", "ERP ledger updated", "Customer confirmation sent"],
    },
  },
  {
    id: "cancellation",
    name: "CANCELLATION",
    icon: XCircle,
    email: {
      from: "alicia.v@studio.net",
      subject: "Please cancel Order #67120",
      body: "I placed Order #67120 15 minutes ago by mistake. Please cancel it before shipping.",
    },
    aiExtraction: {
      intent: "Order Cancellation",
      reference: "Order #67120",
      details: "Elapsed time: 15 minutes • Immediate triage",
    },
    systemCheck: {
      title: "Warehouse Fulfillment System (WMS)",
      status: "Not Yet Picked / Unfulfilled",
      statusColor: "text-cyan-400",
      dataPoint: "Fulfillment State",
      dataValue: "Queue Position #42 • Safe to cancel",
    },
    aiDraft: {
      actionType: "Prepared Cancellation Packet",
      content:
        "Trigger generated for ERP & WMS: Halt fulfillment line #67120.\n\nDraft email: 'Hello Alicia, Your order #67120 has been successfully cancelled and payment voided.'",
    },
    humanStep: {
      role: "Warehouse Operations Supervisor",
      actionPrompt: "Verify line stoppage and authorize cancellation",
      primaryAction: "Authorize Cancellation",
      secondaryAction: "Hold Order for Review",
    },
    result: {
      summary: "Order Safely Cancelled",
      actions: ["WMS fulfillment halted", "Inventory hold released", "Payment voided in ERP"],
    },
  },
  {
    id: "general",
    name: "GENERAL ENQUIRY",
    icon: MessageSquare,
    email: {
      from: "marcus.t@supplyhub.io",
      subject: "Question regarding high-volume contract rates",
      body: "We are expanding our operations and anticipate 500+ monthly shipments. Do you support custom volume pricing?",
    },
    aiExtraction: {
      intent: "Enterprise Sales Enquiry",
      reference: "Prospect: SupplyHub",
      details: "Volume: 500+ shipments/mo • High Value",
    },
    systemCheck: {
      title: "CRM & Territory Intelligence",
      status: "Qualified Enterprise Lead",
      statusColor: "text-purple-400",
      dataPoint: "Tier Matching",
      dataValue: "Matches Enterprise Tier 2 • Account Executive: Rachel S.",
    },
    aiDraft: {
      actionType: "Executive Dossier & Draft Email",
      content:
        "AI generated company briefing dossier + draft response with customized volume tier sheet and calendar link.",
    },
    humanStep: {
      role: "Account Executive Review",
      actionPrompt: "Review lead profile and personalize proposal",
      primaryAction: "Send Response & Book Call",
      secondaryAction: "Modify Proposal",
    },
    result: {
      summary: "Lead Qualified & Response Dispatched",
      actions: ["HubSpot lead created & assigned", "Personalized proposal sent", "Follow-up task scheduled"],
    },
  },
];

const DEMO_STEPS = [
  { id: 0, title: "Customer Input", icon: Mail },
  { id: 1, title: "AI Understands", icon: Bot },
  { id: 2, title: "System Check", icon: Database },
  { id: 3, title: "AI Prepares", icon: Send },
  { id: 4, title: "Human Control", icon: UserCheck },
  { id: 5, title: "Result Executed", icon: CheckCircle2 },
];

export function AutomationDemo() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const scenario = SCENARIOS[activeScenarioIdx];

  // Auto-play interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= DEMO_STEPS.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleTabChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setActiveStep(0);
    setIsAutoPlaying(false);
  };

  const handleStartSimulation = () => {
    setActiveStep(0);
    setIsAutoPlaying(true);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsAutoPlaying(false);
  };

  const handleApprove = () => {
    setTimeout(() => {
      setActiveStep(5);
    }, 400);
  };

  return (
    <section id="workflow-demo" className="py-24 relative overflow-hidden bg-brand-950/20 border-y border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive Demonstration
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white uppercase">
            HOW WORKFLOW AUTOMATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">ACTUALLY WORKS.</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Select a workflow scenario to see how AI reads, validates, and prepares the work — while your team retains full oversight.
          </p>

          {/* Scenario Tabs (TASK 7) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-1.5 rounded-2xl glass-card border border-white/10 max-w-2xl mx-auto">
            {SCENARIOS.map((s, idx) => {
              const isActive = activeScenarioIdx === idx;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleTabChange(idx)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-brand-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Stage Container */}
        <div className="max-w-5xl mx-auto glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[520px]">
          
          {/* Left Sidebar: Step Tracker */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/10 p-5 md:p-6 bg-black/40 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-semibold uppercase text-brand-300 tracking-wider mb-4 flex items-center justify-between">
                <span>Workflow Pipeline</span>
                <span className="text-[11px] text-muted-foreground">{activeStep + 1} / 6</span>
              </div>

              <div className="space-y-2">
                {DEMO_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx;
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveStep(idx);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer",
                        isActive
                          ? "bg-brand-500/20 border border-brand-500/40 text-white shadow-sm"
                          : isPast
                          ? "text-muted-foreground/80 hover:bg-white/5"
                          : "text-muted-foreground/40 hover:bg-white/5"
                      )}
                    >
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs transition-colors",
                          isActive
                            ? "bg-brand-500 text-white"
                            : isPast
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/5 text-white/40"
                        )}
                      >
                        {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>

                      <span className="text-xs md:text-sm font-medium flex-1 truncate">
                        {step.title}
                      </span>

                      {idx === 4 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          Human
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2">
              <button
                onClick={isAutoPlaying ? handleReset : handleStartSimulation}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              >
                {isAutoPlaying ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-brand-400" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Area: Dynamic Step Visualizer */}
          <div className="flex-1 p-6 md:p-10 relative bg-[#070d1a] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* STEP 0: Incoming Customer Input */}
              {activeStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4 my-auto"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                    <Mail className="w-4 h-4" /> 01 — Incoming Customer Request
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/10 bg-black/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-semibold text-white">From:</span> {scenario.email.from}
                      </div>
                      <div>
                        <span className="font-semibold text-white">Subject:</span> {scenario.email.subject}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-base md:text-lg text-white font-medium italic">
                      &ldquo;{scenario.email.body}&rdquo;
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-300 hover:text-white bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      Next: AI Understands <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 1: AI Analysis & Extraction */}
              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4 my-auto"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                    <Bot className="w-4 h-4" /> 02 — AI Intent & Entity Extraction
                  </div>

                  <div className="glass p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-black/50 border border-white/5">
                      <span className="text-xs text-muted-foreground">Classified Intent:</span>
                      <span className="text-sm font-bold text-white bg-cyan-500/20 px-2.5 py-1 rounded border border-cyan-500/30">
                        {scenario.aiExtraction.intent}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl bg-black/50 border border-white/5">
                      <span className="text-xs text-muted-foreground">Extracted Identifier:</span>
                      <span className="text-sm font-mono font-bold text-brand-300">
                        {scenario.aiExtraction.reference}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl bg-black/50 border border-white/5">
                      <span className="text-xs text-muted-foreground">Contextual Metadata:</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {scenario.aiExtraction.details}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-300 hover:text-white bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      Next: System Check <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: System Integration Check */}
              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4 my-auto"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wide">
                    <Database className="w-4 h-4" /> 03 — Connected Database & ERP Lookup
                  </div>

                  <div className="glass p-6 rounded-2xl border border-blue-500/30 bg-blue-950/20 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {scenario.systemCheck.title}
                    </h4>

                    <div className="flex justify-between items-center p-3.5 rounded-xl bg-black/50 border border-white/5">
                      <span className="text-xs text-muted-foreground">System Record Status:</span>
                      <span className={cn("text-sm font-bold", scenario.systemCheck.statusColor)}>
                        {scenario.systemCheck.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3.5 rounded-xl bg-black/50 border border-white/5">
                      <span className="text-xs text-muted-foreground">{scenario.systemCheck.dataPoint}:</span>
                      <span className="text-xs font-medium text-white max-w-[260px] text-right">
                        {scenario.systemCheck.dataValue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-300 hover:text-white bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      Next: AI Prepares Action <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: AI Prepares Action (No unauthorized financial or system commit) */}
              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4 my-auto"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wide">
                    <Send className="w-4 h-4" /> 04 — AI Prepares Appropriate Action
                  </div>

                  <div className="glass p-6 rounded-2xl border border-brand-500/30 bg-black/40 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                      <span className="font-semibold text-brand-300">{scenario.aiDraft.actionType}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                        Draft Ready
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-sm text-white/90 whitespace-pre-line leading-relaxed font-sans">
                      {scenario.aiDraft.content}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setActiveStep(4)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      Next: Human Approval Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Human Control (Task 2 & Task 7: Human in the loop) */}
              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4 my-auto"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4" /> 05 — Human Verification & Approval
                  </div>

                  <div className="glass p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        {scenario.humanStep.role}
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        Authorization Required
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {scenario.humanStep.actionPrompt}
                    </p>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-xs text-white/80 line-clamp-3">
                      {scenario.aiDraft.content}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleApprove}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-xs md:text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {scenario.humanStep.primaryAction}
                      </button>

                      <button
                        onClick={() => setActiveStep(5)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 px-4 rounded-xl text-xs md:text-sm font-medium transition-colors cursor-pointer"
                      >
                        {scenario.humanStep.secondaryAction}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Result Executed */}
              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 my-auto"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {scenario.result.summary}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto">
                      AI prepared the data, the human authorized the decision, and the systems executed simultaneously.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                    {scenario.result.actions.map((act, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-medium text-white flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {act}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="text-xs text-brand-300 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Run again
                    </button>
                    <span className="text-white/20">•</span>
                    <button
                      onClick={() => handleTabChange((activeScenarioIdx + 1) % SCENARIOS.length)}
                      className="text-xs text-brand-300 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Try next scenario →
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
