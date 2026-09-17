import type { Metadata } from "next";
import { WorkflowIntakeForm } from "@/components/WorkflowIntakeForm";

export const metadata: Metadata = {
  title: "Contact & Workflow Intake | SPARTAN — Show Us The Work You Hate Doing",
  description: "Tell us what your team keeps doing manually. We'll figure out what can actually be automated.",
};

export default function ContactPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#C9AEC6]/[0.03] blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <WorkflowIntakeForm />
      </div>
    </div>
  );
}
