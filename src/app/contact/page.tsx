import type { Metadata } from "next";
import { WorkflowIntakeForm } from "@/components/WorkflowIntakeForm";

export const metadata: Metadata = {
  title: "Contact & Workflow Intake | SPARTAN — Show Us The Work You Hate Doing",
  description: "Tell us what your team keeps doing manually. We'll figure out what can actually be automated.",
};

export default function ContactPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#C9AEC6]/[0.03] blur-[180px] rounded-full pointer-events-none" />

      {/* Subtle black transparent gradient overlay behind left-side text: strongest near left edge, smoothly fading to transparent toward the right */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[90%] md:w-[78%] lg:w-[68%] xl:w-[60%] pointer-events-none select-none z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8, 8, 8, 0.82) 0%, rgba(8, 8, 8, 0.65) 30%, rgba(8, 8, 8, 0.32) 65%, rgba(8, 8, 8, 0) 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <WorkflowIntakeForm />
      </div>
    </div>
  );
}
