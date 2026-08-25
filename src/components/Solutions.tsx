"use client";

import { motion } from "framer-motion";
import { Mail, FileText, Headset, ShoppingCart, Database, TrendingUp, BarChart, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    icon: Mail,
    title: "Email Operations",
    desc: "Understand, classify and route incoming emails automatically based on intent and content.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    desc: "Extract structured information from unstructured invoices, PDFs, forms and documents.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Classify incoming requests, retrieve contextual information, and prepare accurate responses.",
  },
  {
    icon: ShoppingCart,
    title: "Order Operations",
    desc: "Automatically categorize orders, handle delays, process refunds, and manage cancellations.",
  },
  {
    icon: Database,
    title: "Data Operations",
    desc: "Move information reliably between spreadsheets, databases, CRMs, and ERP systems.",
  },
  {
    icon: TrendingUp,
    title: "Sales Operations",
    desc: "Qualify inbound leads, assign them to the right representatives, and automate initial follow-ups.",
  },
  {
    icon: BarChart,
    title: "Reporting",
    desc: "Collect information across multiple platforms and generate recurring operational reports.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            We automate the work unique to <span className="text-brand-400">your business.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10 group cursor-default"
            >
              <sol.icon className="w-8 h-8 text-muted-foreground group-hover:text-brand-400 transition-colors mb-6" />
              <h3 className="text-lg font-semibold text-white mb-3">{sol.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sol.desc}
              </p>
            </motion.div>
          ))}

          {/* Custom Workflow Card - Emphasized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: SOLUTIONS.length * 0.1 }}
            className="md:col-span-2 lg:col-span-4 glass-card p-8 rounded-2xl border border-brand-500/40 bg-brand-900/10 hover:bg-brand-900/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-brand-500/20 text-brand-400">
                  <Settings2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Custom Workflow</h3>
                  <p className="text-muted-foreground max-w-xl">
                    If your process doesn&apos;t fit a predefined category, we build the automation specifically around your unique workflow. We adapt to you, not the other way around.
                  </p>
                </div>
              </div>
              <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors whitespace-nowrap border border-white/10">
                Discuss Your Workflow
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
