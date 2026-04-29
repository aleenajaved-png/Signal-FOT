"use client";

import React, { useState } from "react";
import { Badge } from "./Badge";
import { OwnerInformationForm } from "./OwnerInformationForm";
import { LotsContactsPanel } from "./LotsContactsPanel";

type SectionStatus = "not-started" | "in-progress" | "completed";

interface BackgroundCheckContentProps {
  onStatusChange?: (status: SectionStatus) => void;
  status?: SectionStatus;
}

const statusLabel: Record<SectionStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusVariant: Record<SectionStatus, "not-started" | "in-progress" | "completed"> = {
  "not-started": "not-started",
  "in-progress": "in-progress",
  completed: "completed",
};

export function BackgroundCheckContent({
  onStatusChange,
  status = "not-started",
}: BackgroundCheckContentProps) {
  const [activeTab, setActiveTab] = useState<"lots" | "contacts" | null>(null);

  const handleTabToggle = (tab: "lots" | "contacts") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Page Title Card */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-gray-900">Background Check</h1>
            <Badge label="Compliance Form" variant="compliance" />
            <Badge label={statusLabel[status]} variant={statusVariant[status]} />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleTabToggle("lots")}
              className={`px-4 py-1.5 text-sm rounded-lg border-2 font-medium transition-colors ${
                activeTab === "lots"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
              }`}
            >
              Lots
            </button>

            <button
              onClick={() => handleTabToggle("contacts")}
              className={`px-4 py-1.5 text-sm rounded-lg border-2 font-medium transition-colors ${
                activeTab === "contacts"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-orange-500 border-orange-400 hover:bg-orange-50"
              }`}
            >
              Contacts
            </button>
          </div>
        </div>
      </div>

      {activeTab && (
        <LotsContactsPanel type={activeTab} onClose={() => setActiveTab(null)} />
      )}

      <div className="px-6 py-4">
        <OwnerInformationForm onStatusChange={onStatusChange} status={status} />
      </div>
    </div>
  );
}
