"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "./components/Header";
import { SubHeader } from "./components/SubHeader";
import { Sidebar } from "./components/Sidebar";
import { BackgroundCheckContent } from "./components/BackgroundCheckContent";
import { FleetServicesContent } from "./components/FleetServicesContent";
import { BasicInfoContent } from "./components/BasicInfoContent";
import { CreateFranchiseForm, FranchiseInitialData } from "./components/CreateFranchiseForm";
import { Modal } from "./components/Modal";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import BusinessOutlined from "@mui/icons-material/BusinessOutlined";
import TagOutlined from "@mui/icons-material/TagOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import NorthEastOutlined from "@mui/icons-material/NorthEastOutlined";
import { LOTS_FOR_MODAL } from "@/lib/data";
import { TransferLotOwnershipPanel } from "@/components/TransferModal";

type SectionStatus = "not-started" | "in-progress" | "completed";
type SectionId = "owner-info" | "fleet-services" | "basic-info" | "franchise-creation";

const sectionToSidebarId: Record<string, SectionId> = {
  "owner-info": "owner-info",
  "background-check": "owner-info",
  "fleet-services": "fleet-services",
  "basic-info": "basic-info",
  "franchise-creation": "franchise-creation",
};

const DEAL_INITIAL_DATA: FranchiseInitialData = {
  franchiseName: "0205 - Omaha, NE",
  franchiseNumber: "0205",
  dbaName: "Andre Martin",
  businessEmail: "andre.martin@example.com",
  businessPhone: "(402) 555-0101",
  primaryLegalOwnerName: "Andre Martin",
  primaryPreferredOwnerName: "Andre Martin",
  allPreferredOwners: "Andre Martin",
  region: "Greater Omaha Area",
  territoryType: "suburban",
  zips: "68101, 68102, 68111",
  officeStreet: "1234 North Ave",
  officeCity: "Omaha",
  officeState: "NE",
  officeCountry: "US",
};

function formatLotList(lots: string[]) {
  if (lots.length === 0) return "";
  if (lots.length === 1) return lots[0];
  return lots.slice(0, -1).join(", ") + " & " + lots[lots.length - 1];
}

export default function FranchiseOnboardingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("owner-info");
  const [franchiseLots, setFranchiseLots] = useState<string[]>(["NB-001", "NB-002"]);

  const [pendingData, setPendingData] = useState<Record<string, string> | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdFranchise, setCreatedFranchise] = useState<Record<string, string>>({});
  const [effectiveDateByLot, setEffectiveDateByLot] = useState<Record<string, string>>({});
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [activeTransferLotIndex, setActiveTransferLotIndex] = useState<number | null>(null);

  const [sectionStatuses, setSectionStatuses] = useState<Record<SectionId, SectionStatus>>({
    "owner-info": "not-started",
    "fleet-services": "not-started",
    "basic-info": "not-started",
    "franchise-creation": "not-started",
  });

  const updateSectionStatus = (section: SectionId, status: SectionStatus) => {
    setSectionStatuses((prev) => ({ ...prev, [section]: status }));
  };

  const completedCount = Object.values(sectionStatuses).filter((s) => s === "completed").length;
  const totalSections = Object.keys(sectionStatuses).length;
  const overallProgress = Math.round((completedCount / totalSections) * 100);

  const handleSidebarItemClick = (id: string) => {
    const mapped = sectionToSidebarId[id];
    if (mapped) setActiveSection(mapped);
    setSidebarOpen(false);
  };

  const handleFranchiseSubmit = (data: Record<string, string>) => {
    setConfirmError(null);
    setPendingData(data);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (!pendingData) return;
    const missingSoldLots = selectedLotsWithMeta
      .filter((lot) => lot.status === "sold" && !effectiveDateByLot[lot.no]);
    if (missingSoldLots.length > 0) {
      setConfirmError(`Add effective date for ${formatLotList(missingSoldLots.map((lot) => lot.no))} before creating.`);
      return;
    }
    setCreatedFranchise(pendingData);
    updateSectionStatus("franchise-creation", "completed");
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setPendingData(null);
    setConfirmError(null);
    setActiveTransferLotIndex(null);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    setActiveSection("owner-info");
  };

  const confirmModalFranchiseName = (
    pendingData?.franchiseName ??
    DEAL_INITIAL_DATA.franchiseName ??
    ""
  ).trim();

  const selectedLotsWithMeta = useMemo(
    () =>
      franchiseLots.map((lotId) => {
        const lot = LOTS_FOR_MODAL.find((item) => item.no === lotId);
        return {
          no: lotId,
          status: lot?.status ?? "available",
        } as const;
      }),
    [franchiseLots],
  );

  const renderMain = () => {
    if (activeSection === "fleet-services") {
      return (
        <FleetServicesContent
          status={sectionStatuses["fleet-services"]}
          onStatusChange={(s) => updateSectionStatus("fleet-services", s)}
        />
      );
    }
    if (activeSection === "basic-info") {
      return (
        <BasicInfoContent
          status={sectionStatuses["basic-info"]}
          onStatusChange={(s) => updateSectionStatus("basic-info", s)}
        />
      );
    }
    if (activeSection === "franchise-creation") {
      return (
        <CreateFranchiseForm
          onCancel={() => setActiveSection("owner-info")}
          onSubmit={handleFranchiseSubmit}
          initialData={DEAL_INITIAL_DATA}
        />
      );
    }
    return (
      <BackgroundCheckContent
        status={sectionStatuses["owner-info"]}
        onStatusChange={(s) => updateSectionStatus("owner-info", s)}
        selectedLots={franchiseLots}
        onSelectedLotsChange={setFranchiseLots}
      />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Header onMenuToggle={() => setSidebarOpen((p) => !p)} />
      <SubHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            isOpen={true}
            onClose={() => setSidebarOpen(false)}
            activeItem={activeSection}
            onItemClick={handleSidebarItemClick}
            sectionStatuses={sectionStatuses}
            overallProgress={overallProgress}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeItem={activeSection}
            onItemClick={handleSidebarItemClick}
            sectionStatuses={sectionStatuses}
            overallProgress={overallProgress}
          />
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden fixed bottom-5 left-5 z-40 w-11 h-11 bg-[#6B2D8B] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#5a2475] transition-colors"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <MenuOutlined sx={{ fontSize: 18 }} />
        </button>

        <main className="flex-1 overflow-y-auto">{renderMain()}</main>
      </div>

      {/* Step 1: Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelConfirm}
        size="md"
        footer={
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={handleCancelConfirm}
              className="flex-1 px-4 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
            >
              Create Franchise
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center">
            <WarningAmberOutlined sx={{ fontSize: 28 }} className="text-amber-500" />
          </div>
          <div className="text-left">
            <h2 className="text-base font-bold text-gray-900">Confirmation</h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Are you sure you want to create{" "}
              {confirmModalFranchiseName ? (
                <>
                  the franchise{" "}
                  <span className="font-semibold text-gray-800">{confirmModalFranchiseName}</span>
                </>
              ) : (
                "this franchise"
              )}
              ? It will be created for{" "}
              <span className="font-semibold text-gray-800">{formatLotList(franchiseLots)}</span>.
            </p>
          </div>
          <div className="border border-gray-100 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-2">Lot ID</th>
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                  <th className="text-left font-semibold px-4 py-2">Effective Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedLotsWithMeta.map((lot) => (
                  <tr key={lot.no} className="border-t border-gray-100 text-gray-700">
                    <td className="px-4 py-2 text-sky-600">{lot.no}</td>
                    <td className="px-4 py-2">
                      {lot.status === "sold" ? (
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">Sold</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">Available</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {lot.status === "sold" ? (
                        effectiveDateByLot[lot.no] ? (
                          <button
                            type="button"
                            onClick={() => setActiveTransferLotIndex(LOTS_FOR_MODAL.findIndex((item) => item.no === lot.no))}
                            className="text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-800 whitespace-nowrap"
                          >
                            {new Date(`${effectiveDateByLot[lot.no]}T12:00:00`).toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveTransferLotIndex(LOTS_FOR_MODAL.findIndex((item) => item.no === lot.no))}
                            className="text-sm font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-800 whitespace-nowrap"
                          >
                            Add effective date
                          </button>
                        )
                      ) : (
                        <span className="text-gray-500">NA</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {confirmError && (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {confirmError}
            </div>
          )}
        </div>
      </Modal>

      {showConfirmModal && activeTransferLotIndex != null && activeTransferLotIndex >= 0 && (
        <div className="fixed inset-0 z-[60] bg-black/45 flex items-center justify-center px-4" role="presentation">
          <section
            className="w-full max-w-5xl bg-white rounded-md shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Transfer lot ownership"
          >
            <TransferLotOwnershipPanel
              onClose={() => setActiveTransferLotIndex(null)}
              showBack
              onBack={() => setActiveTransferLotIndex(null)}
              lotIndex={activeTransferLotIndex}
              newFranchiseName="Omaha, NE"
              newFranchiseId="#0205"
              forceFormMode
              onConfirm={(effectiveYmd) => {
                const lotNo = LOTS_FOR_MODAL[activeTransferLotIndex]?.no;
                if (lotNo) {
                  setEffectiveDateByLot((prev) => ({ ...prev, [lotNo]: effectiveYmd }));
                }
                setConfirmError(null);
                setActiveTransferLotIndex(null);
              }}
            />
          </section>
        </div>
      )}

      {/* Step 2: Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={handleDone} size="md">
        <button
          onClick={handleDone}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <CloseOutlined sx={{ fontSize: 18 }} />
        </button>

        <div className="flex flex-col items-center text-center py-4 gap-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Franchise Created Successfully!</h2>
            <p className="text-sm text-gray-500 mt-1">
              The franchise record has been created as franchise no:{" "}
              <span className="font-semibold text-gray-700">{createdFranchise.franchiseNumber || "—"}</span>.
            </p>
          </div>

          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#6B2D8B]/5 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
              <BusinessOutlined sx={{ fontSize: 14 }} className="text-[#6B2D8B]" />
              <span className="text-xs font-semibold text-[#6B2D8B] uppercase tracking-wide">Franchise Details</span>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BusinessOutlined sx={{ fontSize: 13 }} className="text-gray-400" />
                  Franchise Name
                </div>
                <span className="text-xs font-semibold text-gray-800 text-right max-w-[55%] truncate">
                  {createdFranchise.franchiseName || "0205 - Omaha, NE"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <TagOutlined sx={{ fontSize: 13 }} className="text-gray-400" />
                  Deal / Lot Number
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {formatLotList(franchiseLots)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarTodayOutlined sx={{ fontSize: 13 }} className="text-gray-400" />
                  Created On
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700">Active &amp; Ready for Onboarding</span>
          </div>
        </div>
      </Modal>

      {/* Floating CTA — shown after franchise is created */}
      {showSuccessModal && (
        <Link
          href="/franchises"
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-xl text-white no-underline"
          style={{ backgroundColor: "#173b65", boxShadow: "0px 4px 40px -2px rgba(16,24,40,0.36)" }}
        >
          <span className="text-sm leading-[22px]">Lets switch to Lots Platform</span>
          <NorthEastOutlined sx={{ fontSize: 20, color: "white", flexShrink: 0 }} />
        </Link>
      )}
    </div>
  );
}
