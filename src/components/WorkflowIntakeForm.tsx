"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Check, Mail, Calendar, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";

const TOOLS_LIST = [
  "SAP",
  "Tally",
  "Excel / Sheets",
  "CRM (Salesforce / HubSpot)",
  "Custom ERP",
  "Gmail / Outlook",
  "WhatsApp Business",
  "Slack / Teams",
  "SQL / Internal Database",
  "Other Custom Software",
];

const FREQUENCY_OPTIONS = [
  "Multiple times per day",
  "Daily routine",
  "Weekly batches",
  "Monthly / Periodic",
];

export function WorkflowIntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [meetingDecision, setMeetingDecision] = useState<"pending" | "scheduled" | "email_only">("pending");

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

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const companyActivity = (formData.get("company_activity") as string) || "";
    const manualProcess = (formData.get("process") as string) || "";
    const additionalDetails = (formData.get("additional_details") as string) || "";

    // Build unified description to preserve Supabase schema while capturing all context
    const processContent = [
      manualProcess.trim(),
      companyActivity.trim() ? `\n\n[What Company Does]:\n${companyActivity.trim()}` : "",
      additionalDetails.trim() ? `\n\n[Additional Details]:\n${additionalDetails.trim()}` : "",
    ].filter(Boolean).join("");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      frequency: frequency.trim(),
      tools: selectedTools,
      process: processContent,
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
          data.error || "Failed to submit workflow requirement. Please try again."
        );
      }

      setSubmittedEmail(email.trim());
      setMeetingDecision("pending");
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
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
      
      {/* Left Column: Context & Guidelines */}
      <div className="lg:col-span-5 space-y-6">
        {/* Eyebrow with pulsing dot */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#141414] border border-[#C9AEC6]/40 text-[#C9AEC6] text-xs sm:text-sm font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(201,174,198,0.12)] transition-colors hover:border-[#C9AEC6]/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9AEC6]"></span>
          </span>
          <span>Workflow Intake & Scoping</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6EFF5] uppercase font-sans leading-[1.06] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
          <span>Show us the work </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
            you hate doing.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#E2D5E3] leading-relaxed font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
          Tell us what your team keeps doing manually. We&apos;ll figure out what should be automated, connected, or left to a human.
        </p>

        {/* Small Supporting Line with glowing dot */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#BFB2C6] [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.5)]" />
          <span>Direct engineer assessment. No 40-slide sales pitch.</span>
        </div>

        {/* Studio scoping callout */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#C9AEC6]/[0.05] blur-[50px] rounded-full pointer-events-none" />
          <div className="flex items-start gap-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9AEC6] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(201,174,198,0.6)]" />
            <div>
              <h3 className="text-xs font-bold text-[#F6EFF5] tracking-wide uppercase mb-1.5 font-mono">
                How We Evaluate Submissions
              </h3>
              <p className="text-xs text-[#E2D5E3] leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
                An engineer personally reviews your submission. We look for deterministic logic, API availability, and identify where a human review gate should remain.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees checklist */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5 text-xs text-[#BAAEC0]">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Works with your existing software — no forced migrations</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#BAAEC0]">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>No 40-slide sales pitches or generic demo decks</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#BAAEC0]">
            <ShieldCheck className="w-4 h-4 text-[#C9AEC6] shrink-0" />
            <span>Strict privacy: your workflow schema stays strictly between us</span>
          </div>
        </div>

        {/* Direct Channels */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8E8295]">
            Direct Inquiries
          </div>

          <a
            href="mailto:sparten.tech26@gmail.com"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#C9AEC6]/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C9AEC6]/10 border border-[#C9AEC6]/20 flex items-center justify-center text-[#C9AEC6] shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-semibold text-[#8E8295] tracking-wider">Direct Email</div>
              <div className="text-xs font-medium text-[#F6EFF5] truncate group-hover:text-[#EAD6E6]">
                sparten.tech26@gmail.com
              </div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/spartantech.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#C9AEC6]/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#BAAEC0] group-hover:text-[#C9AEC6] shrink-0">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-semibold text-[#8E8295] tracking-wider">Instagram</div>
              <div className="text-xs font-medium text-[#F6EFF5] truncate group-hover:text-[#C9AEC6]">
                @spartantech.ai
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-[#141414] shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-5"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F6EFF5] uppercase tracking-wide font-sans">
                  WORKFLOW ASSESSMENT FORM
                </h3>
                <p className="text-xs text-[#BAAEC0] mt-1">
                  Fill out what you can. You don&apos;t need technical terminology—plain business terms are best.
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-[#8E8295]">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors"
                    placeholder="Full name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[#8E8295]">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors"
                    placeholder="Work email"
                  />
                </div>
              </div>

              {/* Company & Company Activity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-semibold text-[#8E8295]">
                    Company Name *
                  </label>
                  <input
                    required
                    type="text"
                    id="company"
                    name="company"
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors"
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="company_activity" className="text-xs font-semibold text-[#8E8295]">
                    What does your company do?
                  </label>
                  <input
                    type="text"
                    id="company_activity"
                    name="company_activity"
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors"
                    placeholder="e.g. B2B wholesale distribution"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="space-y-1.5">
                <label htmlFor="frequency" className="text-xs font-semibold text-[#8E8295]">
                  How Often Does This Process Happen? *
                </label>
                <select
                  required
                  id="frequency"
                  name="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] focus:outline-none focus:border-[#C9AEC6] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select frequency</option>
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141414] text-[#F6EFF5]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tools Selection */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-[#8E8295] flex items-center justify-between">
                  <span>Which tools are currently involved?</span>
                  <span className="text-[10px] text-[#BAAEC0]">Select all that apply</span>
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
                            ? "bg-[#C9AEC6] text-[#0B0B0B] border-[#C9AEC6] font-bold shadow-sm"
                            : "bg-[#111111] border-white/[0.08] text-[#BAAEC0] hover:border-white/20 hover:text-[#F6EFF5]"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Process Description */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="process" className="text-xs font-semibold text-[#8E8295]">
                  What process are you currently doing manually? *
                </label>
                <textarea
                  required
                  id="process"
                  name="process"
                  rows={4}
                  className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors resize-none"
                  placeholder="e.g. Orders come in via WhatsApp and email, then our team manually copies customer details into our accounting tool and creates invoices one by one."
                />
              </div>

              {/* Additional Details */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="additional_details" className="text-xs font-semibold text-[#8E8295]">
                  Additional details or constraints (optional)
                </label>
                <textarea
                  id="additional_details"
                  name="additional_details"
                  rows={2}
                  className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-[#F6EFF5] placeholder-[#8E8295] focus:outline-none focus:border-[#C9AEC6] transition-colors resize-none"
                  placeholder="Any specific edge cases, security requirements, or timeline goals?"
                />
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] rounded-xl px-6 py-4 font-bold text-sm transition-all shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_28px_rgba(201,174,198,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer uppercase tracking-wider font-mono"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-[#0B0B0B] rounded-full animate-spin" />
                ) : (
                  <>
                    SHOW US YOUR WORKFLOW
                    <ArrowRight className="w-4 h-4 text-[#0B0B0B]" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center justify-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] mb-2 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#F6EFF5] uppercase">
                Workflow Requirement Received
              </h3>
              <p className="text-sm text-[#BAAEC0] max-w-md leading-relaxed">
                Thank you! Our engineering team will review the steps you described and assess what can be automated. Expect a direct reply to <strong className="text-white">{submittedEmail}</strong> within 24 hours.
              </p>

              {meetingDecision === "pending" && (
                <div className="w-full max-w-md p-5 rounded-2xl bg-[#181818] border border-[#C9AEC6]/30 text-left space-y-3.5 shadow-xl mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C9AEC6]/15 border border-[#C9AEC6]/30 flex items-center justify-center text-[#C9AEC6] shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#F6EFF5] uppercase tracking-wider">
                        Want to walk through it live?
                      </h4>
                      <p className="text-[11px] text-[#BAAEC0] mt-0.5 leading-relaxed">
                        15 minutes with an automation engineer to dissect the manual steps.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={`mailto:sparten.tech26@gmail.com?subject=Schedule%20Discovery%20Meeting%20-%20SPARTAN&body=Hi%20SPARTAN%20Team,%0A%0AI%20submitted%20a%20workflow%20intake%20(${submittedEmail})%20and%20would%20like%20to%20schedule%20a%20brief%20call.%0A%0APreferred%20days%20and%20times:%20`}
                      onClick={() => setMeetingDecision("scheduled")}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(201,174,198,0.2)] text-center"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule 15m Call</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setMeetingDecision("email_only")}
                      className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8E8295] hover:text-[#F6EFF5] font-medium text-xs transition-colors text-center cursor-pointer"
                    >
                      Email review is good
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
