import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { MainDifferentiator } from "@/components/MainDifferentiator";
import { CoreMessage } from "@/components/CoreMessage";
import { HowItWorks } from "@/components/HowItWorks";
import { AutomationDemo } from "@/components/AutomationDemo";
import { Solutions } from "@/components/Solutions";
import { Industries } from "@/components/Industries";
import { HumanInTheLoop } from "@/components/HumanInTheLoop";
import { ROI } from "@/components/ROI";
import { WhyUs } from "@/components/WhyUs";
import { CustomerDiscovery } from "@/components/CustomerDiscovery";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <MainDifferentiator />
        <CoreMessage />
        <HowItWorks />
        <AutomationDemo />
        <Solutions />
        <Industries />
        <HumanInTheLoop />
        <ROI />
        <WhyUs />
        <CustomerDiscovery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
