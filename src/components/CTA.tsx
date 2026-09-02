"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Check } from "lucide-react";

const TOOLS_LIST = [
  "SAP",
  "Tally",
  "Excel / Sheets",
  "CRM (Salesforce/HubSpot)",
  "Custom ERP",
  "Gmail",
  "Outlook",
  "Other",
];

const FREQUENCY_OPTIONS = [
  "Multiple times per day",
  "Daily routine",
  "Weekly batches",
  "Monthly / Periodic",
];

export function CTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string>("");

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      frequency,
      tools: selectedTools,
      process: formData.get("process") as string,
    };

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to submit workflow assessment. Please try again."
        );
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-brand-950/20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Core Outreach & Value */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Start With One Workflow
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase leading-tight">
              WHAT IS YOUR TEAM DOING EVERY DAY THAT A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">COMPUTER SHOULD DO?</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Show us the workflow. We&apos;ll help you map the process, isolate repetitive bottlenecks, and design safe automation with built-in human control.
            </p>

            {/* Task 3: Compliant authentic messaging replacing fake social proof */}
            <div className="p-5 rounded-2xl glass-card border border-brand-500/30 bg-brand-950/30 mb-8">
              <div className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-1.5">
                WE&apos;RE LOOKING FOR BUSINESSES WITH REPETITIVE WORKFLOWS WORTH AUTOMATING.
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Whether it is order processing, email triage, invoice extraction, or cross-system syncing — start with one workflow and measure the impact before expanding.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Designed around your current tools — without forcing a complete system replacement.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict human-in-the-loop control for all critical actions</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clear before-and-after operational throughput measurement</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Upgraded Workflow Assessment Form (Task 9) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  id="lead-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
                      Request Workflow Assessment
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tell us about your team&apos;s current manual steps.
                    </p>
                  </div>
                  
                  {/* Basic Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                        Work Email *
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="alex@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-semibold text-muted-foreground">
                        Company Name *
                      </label>
                      <input
                        required
                        type="text"
                        id="company"
                        name="company"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="e.g. Acme Logistics"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="frequency" className="text-xs font-semibold text-muted-foreground">
                        Process Frequency *
                      </label>
                      <select
                        required
                        id="frequency"
                        name="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
                      >
                        <option value="">Select frequency</option>
                        {FREQUENCY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Task 9: Current Tools / Systems */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-muted-foreground block">
                      Current Tools / Systems Involved
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOOLS_LIST.map((tool) => {
                        const isSelected = selectedTools.includes(tool);
                        return (
                          <button
                            type="button"
                            key={tool}
                            onClick={() => toggleTool(tool)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-brand-600 text-white border-brand-500 shadow-sm"
                                : "bg-black/40 border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Task 9: Workflow Details */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="process" className="text-xs font-semibold text-muted-foreground">
                      Describe the Repetitive Workflow *
                    </label>
                    <textarea
                      required
                      id="process"
                      name="process"
                      rows={3}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                      placeholder="e.g. Our team spends 3 hours every day reading supplier emails, manually verifying tracking numbers against our ERP, and copying data into Excel sheets..."
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl px-6 py-4 font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.45)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        REQUEST WORKFLOW ASSESSMENT
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center h-full justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase">Assessment Requested</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Thank you for sharing your workflow details. We will review your process and reach out within 24 hours to explore automation opportunities.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setSelectedTools([]);
                      setFrequency("");
                      setErrorMessage(null);
                    }}
                    className="mt-6 text-brand-400 hover:text-brand-300 font-medium text-xs underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Submit another workflow
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
