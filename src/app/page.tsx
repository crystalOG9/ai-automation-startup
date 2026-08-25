import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { CoreMessage } from "@/components/CoreMessage";
import { HowItWorks } from "@/components/HowItWorks";
import { AutomationDemo } from "@/components/AutomationDemo";
import { Solutions } from "@/components/Solutions";
import { Industries } from "@/components/Industries";
import { HumanInTheLoop } from "@/components/HumanInTheLoop";
import { ROI } from "@/components/ROI";
import { WhyUs } from "@/components/WhyUs";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <CoreMessage />
        <HowItWorks />
        <AutomationDemo />
        <Solutions />
        <Industries />
        <HumanInTheLoop />
        <ROI />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
