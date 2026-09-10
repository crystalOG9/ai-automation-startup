"use client";

import React, { createContext, useContext, useState } from "react";

export interface RoiData {
  teamMembers: number;
  weeklyHours: number;
  hourlyRate: number;
  annualHoursSaved: number;
  annualCostSavings: number;
  paybackMonths: number;
}

interface WorkflowStateContextValue {
  roiData: RoiData;
  setRoiData: React.Dispatch<React.SetStateAction<RoiData>>;
  selectedWorkflowPill: string;
  setSelectedWorkflowPill: (pill: string) => void;
  selectedTools: string[];
  setSelectedTools: React.Dispatch<React.SetStateAction<string[]>>;
  toggleTool: (tool: string) => void;
  hasTransferredFromRoi: boolean;
  transferRoiToForm: (data: RoiData) => void;
}

const DEFAULT_ROI: RoiData = {
  teamMembers: 10,
  weeklyHours: 12,
  hourlyRate: 45,
  annualHoursSaved: 4680,
  annualCostSavings: 210600,
  paybackMonths: 1.8,
};

const WorkflowStateContext = createContext<WorkflowStateContextValue | null>(null);

export function WorkflowStateProvider({ children }: { children: React.ReactNode }) {
  const [roiData, setRoiData] = useState<RoiData>(DEFAULT_ROI);
  const [selectedWorkflowPill, setSelectedWorkflowPill] = useState<string>("Invoices & Receipts");
  const [selectedTools, setSelectedTools] = useState<string[]>(["Excel / Sheets", "Gmail"]);
  const [hasTransferredFromRoi, setHasTransferredFromRoi] = useState(false);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const transferRoiToForm = (data: RoiData) => {
    setRoiData(data);
    setHasTransferredFromRoi(true);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <WorkflowStateContext.Provider
      value={{
        roiData,
        setRoiData,
        selectedWorkflowPill,
        setSelectedWorkflowPill,
        selectedTools,
        setSelectedTools,
        toggleTool,
        hasTransferredFromRoi,
        transferRoiToForm,
      }}
    >
      {children}
    </WorkflowStateContext.Provider>
  );
}

export function useWorkflowState() {
  const context = useContext(WorkflowStateContext);
  if (!context) {
    throw new Error("useWorkflowState must be used within a WorkflowStateProvider");
  }
  return context;
}
