"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "./Badge";
import { OwnerInformationForm } from "./OwnerInformationForm";
import { LotsContactsPanel } from "./LotsContactsPanel";
import EditOutlined from "@mui/icons-material/EditOutlined";

type SectionStatus = "not-started" | "in-progress" | "completed";

interface BackgroundCheckContentProps {
  onStatusChange?: (status: SectionStatus) => void;
  status?: SectionStatus;
  selectedLots?: string[];
  onSelectedLotsChange?: (lots: string[]) => void;
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

const lotOptions = ["NB-001", "NB-002", "NB-003", "AB-003", "AB-004", "KA-005"];
export function BackgroundCheckContent({
  onStatusChange,
  status = "not-started",
  selectedLots: selectedLotsProp,
  onSelectedLotsChange,
}: BackgroundCheckContentProps) {
  const [activeTab, setActiveTab] = useState<"contacts" | null>(null);
  const [isLotsModalOpen, setIsLotsModalOpen] = useState(false);
  const [isEditLotsOpen, setIsEditLotsOpen] = useState(false);
  const [isLotsDropdownOpen, setIsLotsDropdownOpen] = useState(false);
  const [selectedLots, setSelectedLots] = useState<string[]>(selectedLotsProp ?? ["NB-001", "NB-002"]);

  const handleTabToggle = (tab: "contacts") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const toggleLot = (lotId: string) => {
    setSelectedLots((prev) =>
      prev.includes(lotId) ? prev.filter((id) => id !== lotId) : [...prev, lotId],
    );
  };

  useEffect(() => {
    if (selectedLotsProp) {
      setSelectedLots(selectedLotsProp);
    }
  }, [selectedLotsProp]);

  useEffect(() => {
    onSelectedLotsChange?.(selectedLots);
  }, [onSelectedLotsChange, selectedLots]);

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
              type="button"
              onClick={() => {
                setIsEditLotsOpen(false);
                setIsLotsModalOpen(true);
              }}
              className={`px-4 py-1.5 text-sm rounded-lg border-2 font-medium transition-colors ${
                isLotsModalOpen
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
              }`}
            >
              Lots
            </button>

            <button
              type="button"
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

      {isLotsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4"
          role="presentation"
          onClick={() => {
            setIsLotsModalOpen(false);
            setIsEditLotsOpen(false);
          }}
        >
          {!isEditLotsOpen ? (
            <section
              role="dialog"
              aria-modal="true"
              aria-label="Lots"
              className="w-full max-w-4xl bg-white rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-3xl font-normal text-gray-900 leading-none">Lots</h2>
                <button
                  type="button"
                  onClick={() => setIsEditLotsOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-sky-400 text-sky-700 rounded text-sm hover:bg-sky-50"
                >
                  <EditOutlined sx={{ fontSize: 14 }} />
                  Edit
                </button>
              </div>

              <div className="p-6">
                <div className="border border-gray-100 rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="text-left font-semibold px-4 py-2">Lot ID</th>
                        <th className="text-left font-semibold px-4 py-2">City</th>
                        <th className="text-left font-semibold px-4 py-2">State</th>
                        <th className="text-left font-semibold px-4 py-2">Address</th>
                        <th className="text-right font-semibold px-4 py-2">Population</th>
                        <th className="text-right font-semibold px-4 py-2">Price</th>
                        <th className="text-left font-semibold px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100 text-gray-700">
                        <td className="px-4 py-2 text-sky-600">NB-001</td>
                        <td className="px-4 py-2">Weald</td>
                        <td className="px-4 py-2">Alberta</td>
                        <td className="px-4 py-2">Weald, Alberta, Canada</td>
                        <td className="px-4 py-2 text-right">185,290</td>
                        <td className="px-4 py-2 text-right text-emerald-700">$277,835</td>
                        <td className="px-4 py-2">
                          <span className="inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                            Available
                          </span>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100 text-gray-700">
                        <td className="px-4 py-2 text-sky-600">NB-002</td>
                        <td className="px-4 py-2">Edmonton</td>
                        <td className="px-4 py-2">Alberta</td>
                        <td className="px-4 py-2">Edmonton, Alberta, Canada</td>
                        <td className="px-4 py-2 text-right">223,068</td>
                        <td className="px-4 py-2 text-right text-emerald-700">$334,602</td>
                        <td className="px-4 py-2">
                          <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                            Sold
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLotsModalOpen(false);
                      setIsEditLotsOpen(false);
                    }}
                    className="px-4 py-1.5 text-sm border border-sky-400 text-sky-700 rounded hover:bg-sky-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <section
              role="dialog"
              aria-modal="true"
              aria-label="Edit Lots"
              className="w-full max-w-lg bg-white rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-[30px] leading-none font-normal text-gray-900">Edit Lots</h2>
              </div>

              <div className="px-5 py-4">
                <p className="text-xs text-gray-500 mb-3">
                  Search and select lots to assign to this deal. Type to search by Lot ID.
                </p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLotsDropdownOpen((prev) => !prev)}
                    className="w-full border border-gray-300 rounded-md min-h-11 px-2 py-2 bg-white flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {selectedLots.length === 0 ? (
                        <span className="text-xs text-gray-400">Select lots...</span>
                      ) : (
                        selectedLots.map((lot) => (
                          <span
                            key={lot}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-600 text-white text-xs"
                          >
                            {lot}
                            <span
                              role="button"
                              tabIndex={0}
                              className="opacity-90"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLot(lot);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleLot(lot);
                                }
                              }}
                            >
                              ×
                            </span>
                          </span>
                        ))
                      )}
                    </div>
                    <span className="text-gray-400 text-sm">{isLotsDropdownOpen ? "▴" : "▾"}</span>
                  </button>

                  {isLotsDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-44 overflow-auto z-10">
                      {lotOptions.map((lot) => (
                        <button
                          key={lot}
                          type="button"
                          onClick={() => toggleLot(lot)}
                          className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 flex items-center justify-between"
                        >
                          <span>{lot}</span>
                          {selectedLots.includes(lot) && <span className="text-sky-600">✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 bg-sky-50 border border-sky-200 rounded px-3 py-2 flex items-center justify-between text-xs text-gray-600">
                  <span>{selectedLots.length} lots selected</span>
                  <span>1821 total available</span>
                </div>

                <div className="mt-28 pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditLotsOpen(false);
                      setIsLotsDropdownOpen(false);
                    }}
                    className="flex-1 h-10 border border-rose-200 text-rose-500 rounded-md text-sm hover:bg-rose-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditLotsOpen(false);
                      setIsLotsDropdownOpen(false);
                    }}
                    className="flex-1 h-10 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      <div className="px-6 py-4">
        <OwnerInformationForm onStatusChange={onStatusChange} status={status} />
      </div>
    </div>
  );
}
