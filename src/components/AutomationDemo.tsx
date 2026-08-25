"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Bot, Database, UserCheck, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_STEPS = [
  { id: "email", title: "Incoming Email", icon: Mail },
  { id: "ai", title: "AI Understanding", icon: Bot },
  { id: "system", title: "System Check", icon: Database },
  { id: "action", title: "AI Action", icon: Send },
  { id: "human", title: "Human Review", icon: UserCheck },
  { id: "result", title: "Result", icon: CheckCircle2 },
];

export function AutomationDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDemoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= DEMO_STEPS.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsDemoPlaying(false), 2000);
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // Time between steps
    }
    return () => clearInterval(interval);
  }, [isDemoPlaying]);

  const startDemo = () => {
    setActiveStep(0);
    setIsDemoPlaying(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-brand-950/20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Imagine your support inbox <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-200">handling itself.</span>
          </h2>
          {!isDemoPlaying && activeStep === 0 && (
            <button 
              onClick={startDemo}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Run Simulation
            </button>
          )}
          {!isDemoPlaying && activeStep === DEMO_STEPS.length - 1 && (
            <button 
              onClick={startDemo}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all"
            >
              Restart Simulation
            </button>
          )}
        </div>

        <div className="max-w-5xl mx-auto glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Steps Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-6 bg-black/20">
            <div className="space-y-2">
              {DEMO_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPast = activeStep > idx;
                
                return (
                  <div 
                    key={step.id} 
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all",
                      isActive ? "bg-brand-500/20 border border-brand-500/30" : "border border-transparent",
                      isPast ? "opacity-60" : isActive ? "opacity-100" : "opacity-30"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      isActive ? "bg-brand-500 text-white" : isPast ? "bg-white/10 text-white/70" : "bg-white/5 text-white/30"
                    )}>
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                    </div>
                    <span className={cn("font-medium text-sm", isActive ? "text-brand-300" : "text-white")}>
                      {step.title}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="ml-auto w-2 h-2 rounded-full bg-brand-400"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 p-6 md:p-10 relative bg-[#0a0f1c]">
            <AnimatePresence mode="wait">
              
              {activeStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center"
                >
                  <div className="glass p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="text-sm text-muted-foreground">From: customer@example.com</div>
                        <div className="text-sm text-muted-foreground">Subject: Order Inquiry</div>
                      </div>
                      <div className="text-xs text-muted-foreground">Just now</div>
                    </div>
                    <p className="text-white/90 text-lg">
                      "My order #48291 hasn't arrived yet. Can you check?"
                    </p>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center gap-4"
                >
                  <div className="glass p-6 rounded-xl border border-brand-500/30">
                    <h4 className="text-sm font-medium text-brand-400 mb-4 flex items-center gap-2">
                      <Bot className="w-4 h-4" /> NLP Extraction Complete
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded bg-black/40">
                        <span className="text-muted-foreground">Intent:</span>
                        <span className="text-white font-medium">Delivery Delay</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-black/40">
                        <span className="text-muted-foreground">Order Ref:</span>
                        <span className="text-brand-300 font-mono">#48291</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-black/40">
                        <span className="text-muted-foreground">Customer Status:</span>
                        <span className="text-white font-medium">Existing Customer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center gap-4"
                >
                  <div className="glass p-6 rounded-xl border border-blue-500/30">
                    <h4 className="text-sm font-medium text-blue-400 mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4" /> ERP/CRM Lookup
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded bg-black/40">
                        <span className="text-muted-foreground">Order Status:</span>
                        <span className="text-amber-400 font-medium">Delayed (Weather)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-black/40">
                        <span className="text-muted-foreground">Expected Delivery:</span>
                        <span className="text-white font-medium">Tomorrow, 10:00 AM</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center"
                >
                  <div className="glass p-6 rounded-xl border border-brand-500/30 relative">
                    <div className="absolute top-4 right-4 text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-1 rounded">
                      Auto-Drafting
                    </div>
                    <h4 className="text-sm font-medium text-brand-400 mb-4">Proposed Response</h4>
                    <div className="p-4 rounded-lg bg-black/40 text-white/90">
                      "Hello,<br/><br/>Your order is currently delayed due to weather conditions in transit, but it is expected to arrive tomorrow morning.<br/><br/>Apologies for the inconvenience."
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col justify-center"
                >
                  <div className="glass p-6 rounded-xl border border-green-500/30">
                    <h4 className="text-sm font-medium text-green-400 mb-4 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> Agent Verification Required
                    </h4>
                    <div className="p-4 rounded-lg bg-black/40 text-white/90 mb-6 opacity-70">
                      "Hello,<br/><br/>Your order is currently delayed due to weather conditions in transit, but it is expected to arrive tomorrow morning.<br/><br/>Apologies for the inconvenience."
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/50 py-2 rounded-md transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2 rounded-md transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Workflow Completed</h3>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <span className="px-3 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">Email Sent</span>
                    <span className="px-3 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">CRM Updated</span>
                    <span className="px-3 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">Case Closed</span>
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
