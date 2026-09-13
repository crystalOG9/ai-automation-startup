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
  { text: "Repeat 40x daily", icon: AlertTriangle, color: "text-[#EF4444]" },
];

const AUTOMATION_STEPS = [
  { text: "Inbound Trigger", icon: Mail },
  { text: "Data Extraction", icon: Bot, color: "text-[#C9AEC6]" },
  { text: "Rule Validation", icon: Settings, color: "text-[#C9AEC6]" },
  { text: "Database Query", icon: Database, color: "text-[#C9AEC6]" },
  { text: "Human Sign-Off", icon: UserCheck, color: "text-[#22C55E]" },
  { text: "Automated System Sync", icon: CheckCircle2, color: "text-[#C9AEC6]" },
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-[#F6EFF5]">
            You don&apos;t have an AI shortage. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              You have a workflow bottleneck.
            </span>
          </h2>
          <p className="text-lg text-[#8E8295] leading-relaxed">
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
              glowColor="rgba(201, 174, 198, 0.05)"
              className="glass-card p-8 rounded-2xl border border-white/[0.06] relative overflow-hidden h-full shadow-lg hover:border-white/15 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9AEC6]/[0.03] blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#F6EFF5]/80">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
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
                    className="flex items-center gap-3 text-[#8E8295]"
                  >
                    <div className="w-8 flex justify-center">
                      {idx === 0 ? (
                        <step.icon className="w-5 h-5 text-white/50" />
                      ) : idx === TODAY_STEPS.length - 1 ? (
                        <step.icon className="w-4 h-4 text-[#EF4444]" />
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
              glowColor="rgba(201, 174, 198, 0.08)"
              className="glass-card p-8 rounded-2xl border border-[#C9AEC6]/30 bg-[#161616] relative overflow-hidden h-full shadow-xl hover:border-[#C9AEC6]/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9AEC6]/[0.03] blur-[80px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#F6EFF5]">
                <span className="w-2 h-2 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.6)]"></span>
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
                    <div className={`p-2 rounded-lg bg-white/[0.04] ${step.color || "text-white/60"}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="pt-1.5 flex-1">
                      <span className="text-sm md:text-base font-medium text-[#F6EFF5]">
                        {step.text}
                      </span>
                      {idx < AUTOMATION_STEPS.length - 1 && (
                        <div className="h-4 border-l-2 border-white/[0.08] ml-2 mt-2 border-dashed" />
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
