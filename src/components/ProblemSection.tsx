"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, User, Bot, AlertTriangle, Mail, Settings, Database, UserCheck } from "lucide-react";
import { PrecisionCard } from "@/components/PrecisionCard";

const TODAY_STEPS = [
  { text: "Inbound Request", icon: User },
  { text: "Read Details", icon: Clock },
  { text: "Check Internal Database", icon: Clock },
  { text: "Re-enter in CRM", icon: Clock },
  { text: "Draft Reply", icon: Clock },
  { text: "Update Sheet", icon: Clock },
  { text: "Send Message", icon: Clock },
  { text: "Repeat 40x daily", icon: AlertTriangle, color: "text-red-400" },
];

const AUTOMATION_STEPS = [
  { text: "Inbound Trigger", icon: Mail },
  { text: "Data Extraction", icon: Bot, color: "text-brand-400" },
  { text: "Rule Validation", icon: Settings, color: "text-brand-400" },
  { text: "Database Query", icon: Database, color: "text-brand-400" },
  { text: "Human Sign-Off", icon: UserCheck, color: "text-green-400" },
  { text: "Automated System Sync", icon: CheckCircle2, color: "text-brand-400" },
];



import {
  fadeInLeft,
  fadeInRight,
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative overflow-hidden perspective-1200">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Headline reveals first */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            You don&apos;t have an AI shortage. <br className="hidden md:block" />
            <span className="text-[#a3959a]">You have a workflow bottleneck.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Valuable operators spend hours copying data between inboxes, spreadsheets, and internal software. The work is necessary, but paying people to move text between screens is not.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto preserve-3d">
          
          {/* Today Column — Enters from LEFT */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
            className="h-full"
          >
            <PrecisionCard
              glowColor="rgba(239, 68, 68, 0.08)"
              className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden h-full shadow-lg hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white/80">
                <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                TODAY
              </h3>
              
              <div className="space-y-3">
                {TODAY_STEPS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.48,
                      delay: 0.12 + idx * 0.055,
                      ease: SPARTAN_EASE,
                    }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-8 flex justify-center">
                      {idx === 0 ? (
                        <step.icon className="w-5 h-5 text-white/50" />
                      ) : idx === TODAY_STEPS.length - 1 ? (
                        <step.icon className="w-4 h-4 text-red-400/70" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-white/20" />
                      )}
                    </div>
                    <span className={`text-sm md:text-base font-medium ${step.color || ""}`}>
                      {step.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </PrecisionCard>
          </motion.div>

          {/* With Automation Column — Enters from RIGHT */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="h-full"
          >
            <PrecisionCard
              glowColor="rgba(225, 29, 72, 0.22)"
              className="glass-card p-8 rounded-2xl border border-brand-500/30 bg-brand-950/10 relative overflow-hidden h-full shadow-xl hover:border-[#e11d48]/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-[#e11d48] shadow-[0_0_8px_rgba(225, 29, 72,0.8)]"></span>
                WITH AUTOMATION
              </h3>
              
              <div className="space-y-4">
                {AUTOMATION_STEPS.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.48,
                      delay: 0.16 + idx * 0.065,
                      ease: SPARTAN_EASE,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className={`p-2 rounded-lg bg-white/5 ${step.color || "text-white/60"}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="pt-1.5 flex-1">
                      <span className="text-sm md:text-base font-medium text-white">
                        {step.text}
                      </span>
                      {idx < AUTOMATION_STEPS.length - 1 && (
                        <div className="h-4 border-l-2 border-white/10 ml-2 mt-2 border-dashed" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </PrecisionCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
