"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { WorkflowIntakeForm } from "@/components/WorkflowIntakeForm";

export function CTA() {
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

            {/* Qualified Workflow Criteria Card */}
            <div className="p-5 rounded-2xl glass-card border border-brand-500/20 bg-brand-950/20 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <div>
                  <div className="text-xs font-bold text-white tracking-wide uppercase mb-1">
                    Target Repetitive Workflows
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Order reconciliation, email triage, invoice data extraction, or cross-system synchronization — start with one high-friction workflow and validate measurable ROI.
                  </p>
                </div>
              </div>
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

            {/* Direct Contact Options */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Direct Contact & Connect
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                <a
                  href="mailto:sparten.tech26@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-500/40 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Email Us Directly</div>
                    <div className="text-xs font-medium text-white truncate group-hover:text-brand-300 transition-colors">
                      sparten.tech26@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/sparten.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-pink-500/40 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Instagram</div>
                    <div className="text-xs font-medium text-white truncate group-hover:text-pink-300 transition-colors">
                      @sparten.tech
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Upgraded Multi-Step Workflow Assessment Drawer & Intake */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <WorkflowIntakeForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
