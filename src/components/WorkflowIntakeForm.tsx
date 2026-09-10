"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Send,
  Loader2,
  Check,
  Building,
  User,
  Mail,
  Users,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useWorkflowState } from "@/context/WorkflowStateContext";

const WORKFLOW_PILLS = [
  "Invoices & Receipts",
  "CRM & Lead Updates",
  "Email & Ticket Triage",
  "Customer Support & Refunds",
  "Logistics & Order Sync",
  "Other Custom Workflow",
];

const STACK_TOOLS = [
  "Salesforce",
  "HubSpot",
  "Gmail / Workspace",
  "Outlook / Office 365",
  "Slack",
  "Excel / Sheets",
  "SAP S/4HANA",
  "Oracle NetSuite",
  "Stripe",
  "Custom ERP / SQL",
];

const TEAM_SIZES = [
  "1 - 10 employees",
  "11 - 50 employees",
  "51 - 200 employees",
  "200+ enterprise",
];

const intakeSchema = z.object({
  workflow: z.string().min(1, "Please select a workflow category"),
  workflowDetail: z.string().optional(),
  tools: z.array(z.string()).min(1, "Please select at least one tool"),
  name: z.string().min(2, "Full name is required (min 2 chars)"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(2, "Company name is required"),
  teamSize: z.string().min(1, "Please select your team size"),
});

type IntakeFormData = z.infer<typeof intakeSchema>;

export function WorkflowIntakeForm() {
  const { toast } = useToast();
  const { roiData, hasTransferredFromRoi } = useWorkflowState();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    ticketId: string;
    timestamp: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      workflow: "Invoices & Receipts",
      workflowDetail: "",
      tools: ["Excel / Sheets", "Gmail / Workspace"],
      name: "",
      email: "",
      company: "",
      teamSize: "11 - 50 employees",
    },
    mode: "onBlur",
  });

  const selectedWorkflow = watch("workflow");
  const selectedTools = watch("tools") || [];
  const selectedTeamSize = watch("teamSize");

  const toggleTool = (tool: string) => {
    const current = selectedTools;
    const next = current.includes(tool)
      ? current.filter((t) => t !== tool)
      : [...current, tool];
    setValue("tools", next, { shouldValidate: true });
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["workflow"]);
      if (isValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await trigger(["tools"]);
      if (isValid) setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        roiMetrics: hasTransferredFromRoi
          ? {
              teamMembers: roiData.teamMembers,
              weeklyHours: roiData.weeklyHours,
              hourlyRate: roiData.hourlyRate,
              annualHoursSaved: roiData.annualHoursSaved,
              annualCostSavings: roiData.annualCostSavings,
            }
          : undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit assessment.");
      }

      setSubmissionResult({
        ticketId: resData.ticketId || `SPN-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: resData.timestamp || new Date().toISOString(),
      });

      toast.success(
        "Assessment Submitted!",
        `Ticket #${resData.ticketId} created. Architecture review scheduled.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      toast.error("Submission Error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative bg-[#070c17]/90 backdrop-blur-2xl">
      {/* Ambient decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[50px] rounded-full pointer-events-none" />

      {/* Success State Screen */}
      <AnimatePresence mode="wait">
        {submissionResult ? (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 space-y-6 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                ASSESSMENT DISPATCHED
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Request Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                We have logged your workflow parameters into our engineering queue.
              </p>
            </div>

            {/* Ticket & Details Confirmation Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-muted-foreground uppercase">Confirmation ID</span>
                <span className="text-brand-300 font-bold">{submissionResult.ticketId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground uppercase">Target Workflow</span>
                <span className="text-white truncate max-w-[200px]">{selectedWorkflow}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground uppercase">Integrated Stack</span>
                <span className="text-white truncate max-w-[200px]">{selectedTools.join(", ")}</span>
              </div>
              {hasTransferredFromRoi && (
                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-emerald-400">
                  <span>Projected Savings</span>
                  <span className="font-bold">${roiData.annualCostSavings.toLocaleString()} / yr</span>
                </div>
              )}
            </div>

            {/* Calendar Scheduling Placeholder Card */}
            <div className="p-5 rounded-2xl bg-brand-950/30 border border-brand-500/30 max-w-md mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-300 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    Reserve 20-Min Architecture Call
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Direct meeting with workflow engineer
                  </div>
                </div>
              </div>
              <a
                href="mailto:sparten.tech26@gmail.com?subject=Schedule%20Workflow%20Review"
                className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Schedule
              </a>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-white transition-colors underline"
            >
              Submit Another Workflow Assessment
            </button>
          </motion.div>
        ) : (
          /* Multi-Step Intake Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step Stepper Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-500/20 border border-brand-500/40 text-brand-300 text-[11px] font-mono font-bold">
                    STEP 0{currentStep} / 03
                  </span>
                  <span className="text-xs text-muted-foreground uppercase font-semibold">
                    {currentStep === 1 && "Select Workflow"}
                    {currentStep === 2 && "Connect Tech Stack"}
                    {currentStep === 3 && "Contact & Details"}
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-400">
                  {Math.round((currentStep / 3) * 100)}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 via-cyan-400 to-blue-400"
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* ROI Metrics Transfer Banner (If came from ROI Calculator) */}
            {hasTransferredFromRoi && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Linked ROI: <strong>${roiData.annualCostSavings.toLocaleString()}/yr</strong> (~{roiData.annualHoursSaved.toLocaleString()} hrs saved)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400/80 uppercase">Pre-Loaded</span>
              </div>
            )}

            {/* STEP 1: SELECT WORKFLOW */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    What workflow is slowing your team down?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select the primary high-friction area you would like to automate first.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {WORKFLOW_PILLS.map((pill) => {
                    const isSelected = selectedWorkflow === pill;
                    return (
                      <button
                        type="button"
                        key={pill}
                        onClick={() => setValue("workflow", pill, { shouldValidate: true })}
                        className={`p-3.5 rounded-xl border text-left transition-all text-xs font-semibold flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-500/20 border-brand-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                            : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:border-white/20"
                        }`}
                      >
                        <span>{pill}</span>
                        {isSelected && <Check className="w-4 h-4 text-brand-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.workflow && (
                  <p className="text-xs text-rose-400">{errors.workflow.message}</p>
                )}

                <div className="pt-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Brief Process Detail (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Daily manual copy-paste from supplier PDFs into our ERP inventory tables..."
                    {...register("workflowDetail")}
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: CONNECT TECH STACK */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    What tools are in your current stack?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select all software systems your team touches daily (multi-select).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 pt-2">
                  {STACK_TOOLS.map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs font-medium flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-500/20 border-brand-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                            : "bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        <span className="truncate">{tool}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.tools && (
                  <p className="text-xs text-rose-400">{errors.tools.message}</p>
                )}
              </motion.div>
            )}

            {/* STEP 3: CONTACT & COMPANY DETAILS */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    Where should we send your architecture blueprint?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Our engineering leads review your submission and reply with a custom scope.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Alex Mercer"
                        {...register("name")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-rose-400">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        {...register("email")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-rose-400">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Company Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Acme Logistics Inc."
                        {...register("company")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    {errors.company && <p className="text-[11px] text-rose-400">{errors.company.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Team Size *
                    </label>
                    <select
                      {...register("teamSize")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
                    >
                      {TEAM_SIZES.map((size) => (
                        <option key={size} value={size} className="bg-slate-900 text-white">
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors uppercase font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-400 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Assessment</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
