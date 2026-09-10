"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useWorkflowState } from "@/context/WorkflowStateContext";

export function ROICalculator() {
  const { toast } = useToast();
  const { transferRoiToForm } = useWorkflowState();

  const [teamMembers, setTeamMembers] = useState(10);
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [isCopied, setIsCopied] = useState(false);

  // Calculations (Assuming 75% automation efficiency of routine repetitive loops)
  const calculation = useMemo(() => {
    const annualTotalHours = teamMembers * weeklyHours * 52;
    const annualHoursSaved = Math.round(annualTotalHours * 0.75);
    const annualCostSavings = Math.round(annualHoursSaved * hourlyRate);
    const monthlyCostSavings = annualCostSavings / 12;

    // Typical workflow implementation investment ~$18,000 amortized
    const estImplementation = 18000;
    const rawPayback = estImplementation / (monthlyCostSavings || 1);
    const paybackMonths = Math.max(1.1, Math.min(4.5, Number(rawPayback.toFixed(1))));
    const weeklyFocusHoursReclaimed = Math.round(teamMembers * weeklyHours * 0.75);

    return {
      annualHoursSaved,
      annualCostSavings,
      paybackMonths,
      weeklyFocusHoursReclaimed,
    };
  }, [teamMembers, weeklyHours, hourlyRate]);

  const handleCopyBreakdown = async () => {
    const text = `SPARTAN AI Automation — ROI Assessment Summary:
• Team Size: ${teamMembers} operators
• Repetitive Hours/Week: ${weeklyHours} hrs per operator
• Avg Hourly Labor Cost: $${hourlyRate}/hr
-------------------------------------------
• Annual Hours Saved: ${calculation.annualHoursSaved.toLocaleString()} hours
• Projected Annual Cost Savings: $${calculation.annualCostSavings.toLocaleString()}
• Estimated Payback Horizon: ${calculation.paybackMonths} months
• Weekly Focus Hours Reclaimed: ${calculation.weeklyFocusHoursReclaimed} hrs/week
Website: https://sparten.tech/`;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.info("ROI Breakdown Copied", "Summary saved to your clipboard!");
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      toast.error("Clipboard Error", "Unable to copy summary automatically.");
    }
  };

  const handleAutomateThis = () => {
    transferRoiToForm({
      teamMembers,
      weeklyHours,
      hourlyRate,
      annualHoursSaved: calculation.annualHoursSaved,
      annualCostSavings: calculation.annualCostSavings,
      paybackMonths: calculation.paybackMonths,
    });
    toast.success(
      "ROI Metrics Transferred",
      `Projected savings of $${calculation.annualCostSavings.toLocaleString()} loaded into assessment form.`
    );
  };

  return (
    <section id="roi-calculator" className="py-24 relative overflow-hidden bg-[#030712] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Interactive Business Case
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            CALCULATE YOUR WORKFLOW <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              TIME & COST SAVINGS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Adjust the operational sliders to evaluate the quantifiable impact of eliminating routine copy-paste friction, email triage, and cross-system data sync.
          </motion.p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Left Column: Interactive Sliders (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-8 bg-[#070b14]/80 backdrop-blur-2xl shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" /> Operational Inputs
                </h3>
                <span className="text-xs font-mono text-muted-foreground">Adjust to match your team</span>
              </div>

              <div className="space-y-7">
                {/* Slider 1: Team Members */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Team Members in Repetitive Workflows
                    </label>
                    <div className="flex items-center gap-1 font-mono text-sm font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                      <span>{teamMembers}</span>
                      <span className="text-xs font-normal text-cyan-400">operators</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>1 person</span>
                    <span>50 team</span>
                    <span>100+ enterprise</span>
                  </div>
                </div>

                {/* Slider 2: Hours/Week */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Avg. Hours / Operator / Week on Routine Loops
                    </label>
                    <div className="flex items-center gap-1 font-mono text-sm font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                      <span>{weeklyHours}</span>
                      <span className="text-xs font-normal text-cyan-400">hrs/wk</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={25}
                    step={1}
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>2 hrs (Light)</span>
                    <span>12 hrs (Standard)</span>
                    <span>25 hrs (High-Friction)</span>
                  </div>
                </div>

                {/* Slider 3: Hourly Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Blended Hourly Cost per Employee
                    </label>
                    <div className="flex items-center gap-1 font-mono text-sm font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                      <span>${hourlyRate}</span>
                      <span className="text-xs font-normal text-cyan-400">/hr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={150}
                    step={5}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>$15/hr</span>
                    <span>$60/hr (Mid-tier)</span>
                    <span>$150/hr (Specialized)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculations benchmark 75% automation capture rate for routine digital busywork, keeping 25% of strategic judgment and authorization strictly under human supervision.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Computed Real-Time Metrics (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#0e1726] to-[#080d17] border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden shadow-2xl"
          >
            {/* Ambient corner glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Projected Impact
                </span>
                <button
                  onClick={handleCopyBreakdown}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Primary Annual Savings Metric Card */}
              <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/20 mb-6 relative overflow-hidden">
                <div className="text-xs font-mono text-muted-foreground uppercase mb-1">
                  Estimated Annual Cost Savings
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 tracking-tight font-mono">
                  ${calculation.annualCostSavings.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-400/90 mt-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Direct labor cost redirection to high-impact growth</span>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] font-mono text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Hours Saved / Yr
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {calculation.annualHoursSaved.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    ~{calculation.weeklyFocusHoursReclaimed} hrs/wk unlocked
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] font-mono text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" /> Payback Horizon
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {calculation.paybackMonths} mo
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Fast break-even window
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Action Button */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleAutomateThis}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-brand-500 hover:from-cyan-400 hover:via-blue-400 hover:to-brand-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 group"
              >
                <span>Automate This Workflow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-muted-foreground">
                Carries these computed savings directly into your assessment request.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
