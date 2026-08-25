"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ROI() {
  const [inView, setInView] = useState(false);

  // Note: Using a simple useEffect approach instead of framer-motion's useInView
  // for broader compatibility or we can just rely on whileInView animations.
  // We'll simulate a fast count up when the section mounts.

  return (
    <section className="py-24 relative border-t border-white/5 bg-brand-950/10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            The goal isn&apos;t more AI. <br className="hidden md:block" />
            <span className="text-brand-400">It&apos;s less wasted time.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">40%+</div>
            <div className="text-muted-foreground font-medium">Reduction in repetitive workload</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-bold text-brand-400 mb-2">Hours</div>
            <div className="text-muted-foreground font-medium">Saved every single week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">Faster</div>
            <div className="text-muted-foreground font-medium">Operational response times</div>
          </motion.div>
          
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground/50">
            * Example metrics — actual results depend on the specific company workflow.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
