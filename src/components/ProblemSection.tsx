"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, User, Bot, AlertTriangle, Mail, Settings, Database, UserCheck } from "lucide-react";

const TODAY_STEPS = [
  { text: "Employee", icon: User },
  { text: "Read Email", icon: Clock },
  { text: "Copy Data", icon: Clock },
  { text: "Check System", icon: Clock },
  { text: "Categorize", icon: Clock },
  { text: "Update CRM", icon: Clock },
  { text: "Reply", icon: Clock },
  { text: "Repeat", icon: AlertTriangle, color: "text-red-400" },
];

const AUTOMATION_STEPS = [
  { text: "Business Input", icon: Mail },
  { text: "AI Understanding", icon: Bot, color: "text-brand-400" },
  { text: "Workflow Rules", icon: Settings, color: "text-brand-400" },
  { text: "System Integration", icon: Database, color: "text-brand-400" },
  { text: "Human Review", icon: UserCheck, color: "text-green-400" },
  { text: "Automated Action", icon: CheckCircle2, color: "text-brand-400" },
];



export function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Businesses don&apos;t have an AI problem. <br className="hidden md:block" />
            <span className="text-muted-foreground">They have a workflow problem.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Employees spend hours every day doing repetitive digital tasks: reading emails, copying data, sorting requests, updating spreadsheets, checking order status, and moving information between systems. These tasks may be necessary, but they consume valuable human time.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Today Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] rounded-full" />
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white/80">
              <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
              TODAY
            </h3>
            
            <div className="space-y-3">
              {TODAY_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-muted-foreground">
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
                </div>
              ))}
            </div>
          </motion.div>

          {/* With Automation Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-brand-500/20 bg-brand-950/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[80px] rounded-full" />
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              WITH AUTOMATION
            </h3>
            
            <div className="space-y-4">
              {AUTOMATION_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
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
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
