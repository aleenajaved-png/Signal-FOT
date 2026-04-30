"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./Badge";

type SectionStatus = "not-started" | "in-progress" | "completed";

interface SidebarItem {
  id: string;
  number: string;
  title: string;
  badge?: string;
  sectionKey: string;
  children?: { id: string; label: string; sectionKey: string }[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  sectionStatuses?: Record<string, SectionStatus>;
  overallProgress?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "background-check",
    number: "1.",
    title: "Background Check",
    sectionKey: "owner-info",
    children: [{ id: "owner-info", label: "1.1 Owner Information", sectionKey: "owner-info" }],
  },
  {
    id: "fleet-services",
    number: "2.",
    title: "Fleet Services Form",
    sectionKey: "fleet-services",
  },
  {
    id: "basic-info",
    number: "3.",
    title: "Basic Information",
    sectionKey: "basic-info",
  },
  {
    id: "franchise-creation",
    number: "4.",
    title: "Franchise Creation",
    badge: "Compliance Form",
    sectionKey: "franchise-creation",
  },
];

const statusBadgeVariant: Record<SectionStatus, "not-started" | "in-progress" | "completed"> = {
  "not-started": "not-started",
  "in-progress": "in-progress",
  completed: "completed",
};

const statusLabel: Record<SectionStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function Sidebar({
  isOpen = true,
  onClose,
  activeItem,
  onItemClick,
  sectionStatuses = {},
  overallProgress = 0,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["background-check"]);

  const autoExpandedItemId = activeItem
    ? sidebarItems.find((item) => item.children?.some((child) => child.id === activeItem))?.id
    : undefined;

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getSectionStatus = (sectionKey: string): SectionStatus => {
    return sectionStatuses[sectionKey] ?? "not-started";
  };

  const isSelected = (id: string) => activeItem === id;

  const progressBarBg = overallProgress === 100 ? "bg-green-500" : "bg-blue-400";
  const progressTextColor = overallProgress === 100 ? "text-green-600" : "text-blue-600";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          w-72 bg-white border-r border-gray-200 flex flex-col h-full
          lg:relative lg:translate-x-0 lg:z-auto
          fixed top-0 left-0 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-sm font-semibold text-gray-800 leading-snug">
            Andre Martin - IL-033, 038, 039
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Deal ID: 46786371719</p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className={`${progressBarBg} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${progressTextColor}`}>
              {overallProgress}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Overall Progress</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isExpanded = expandedItems.includes(item.id) || item.id === autoExpandedItemId;
            const itemStatus = getSectionStatus(item.sectionKey);

            return (
              <div key={item.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => {
                    toggleExpand(item.id);
                    onItemClick?.(item.id);
                  }}
                  className={`w-full flex items-start gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    isSelected(item.id) || isSelected(item.sectionKey)
                      ? "bg-blue-50 border-l-2 border-blue-500"
                      : ""
                  }`}
                >
                  <span className="mt-0.5 text-gray-400 shrink-0">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold">{item.number}</span>{" "}
                        {item.title}
                      </span>
                    </div>
                    {item.badge && (
                      <div className="mt-1">
                        <Badge label={item.badge} variant="compliance" />
                      </div>
                    )}
                    <div className="mt-1">
                      <Badge
                        label={statusLabel[itemStatus]}
                        variant={statusBadgeVariant[itemStatus]}
                      />
                    </div>
                  </div>
                </button>

                {isExpanded && item.children && (
                  <div className="pl-8 pb-1 bg-gray-50/60">
                    {item.children.map((child) => {
                      const childStatus = getSectionStatus(child.sectionKey);
                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            onItemClick?.(child.id);
                            onClose?.();
                          }}
                          className={`w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between group ${
                            isSelected(child.id)
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span>{child.label}</span>
                          {childStatus !== "not-started" && (
                            <Badge
                              label={statusLabel[childStatus]}
                              variant={statusBadgeVariant[childStatus]}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {Object.values(sectionStatuses).filter((s) => s === "completed").length} of{" "}
              {Object.keys(sectionStatuses).length} sections complete
            </span>
            {overallProgress === 100 && <Badge label="All Done!" variant="completed" />}
          </div>
        </div>
      </aside>
    </>
  );
}
