"use client";

import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useCallback, useEffect, useState } from "react";
import { LOTS_FOR_MODAL, type LotForModal } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";
import { TransferLotOwnershipPanel } from "./TransferModal";

function StatusBadge({ lot }: { lot: LotForModal }) {
  const chev = <KeyboardArrowDownOutlined className="lot-badge-chevron" sx={oIcon(12)} aria-hidden />;
  if (lot.status === "available") {
    return (
      <span className="lot-badge-available">
        <span>Available</span>
        {chev}
      </span>
    );
  }
  if (lot.status === "sold") {
    return (
      <span className="lot-badge-sold">
        <span>Sold</span>
        {chev}
      </span>
    );
  }
  return (
    <span className="lot-badge-pending">
      <span>Pending</span>
      {chev}
    </span>
  );
}

function Chk({ checked }: { checked: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        className="lot-row-chk"
        style={{
          width: 16,
          height: 16,
          border: `1.5px solid ${checked ? "#0032a0" : "#6a6a70"}`,
          borderRadius: 4,
          background: checked ? "#0032a0" : "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && <CheckOutlined sx={oIcon(10, { color: "#fff" })} aria-hidden />}
      </div>
    </div>
  );
}

type Props = {
  onClose: () => void;
  newFranchiseName: string;
  onAssignLots: (lotIndices: number[]) => void;
  onConfirmTransfer: (lotIndex: number, effectiveYmd: string, transferAllUsers: boolean) => void;
};

type Step = "assign" | "transfer";

export function AssignLotsModal({ onClose, newFranchiseName, onAssignLots, onConfirmTransfer }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [step, setStep] = useState<Step>("assign");
  const [transferLot, setTransferLot] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected((prev) => {
      if (prev.size === LOTS_FOR_MODAL.length) return new Set();
      return new Set(LOTS_FOR_MODAL.map((_, i) => i));
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onContinue = () => {
    if (selected.size === 0) {
      onClose();
      return;
    }
    const sold = [...selected].filter((i) => LOTS_FOR_MODAL[i].status === "sold");
    if (sold.length > 0) {
      setTransferLot(sold[0]);
      setStep("transfer");
    } else {
      onAssignLots([...selected]);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          width: 1024,
          maxWidth: "96vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
        role="dialog"
        aria-modal
        aria-labelledby="assign-lots-title"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "assign" && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #e6e6e7",
                flexShrink: 0,
              }}
            >
              <span
                id="assign-lots-title"
                style={{ fontFamily: "var(--fk), sans-serif", fontSize: 16, color: "#272d37", lineHeight: "28px" }}
              >
                Assign Lots
              </span>
              <button
                type="button"
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
                aria-label="Close"
              >
                <CloseOutlined sx={oIcon(12, { color: "#444446" })} aria-hidden />
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "20px 24px", flexShrink: 0 }}>
              <div
                style={{
                  width: 283,
                  height: 40,
                  border: "1px solid #d8dadc",
                  borderRadius: 2,
                  background: "#fff",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <SearchOutlined sx={oIcon(16, { color: "#7d899b" })} aria-hidden />
                <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 14, color: "#7d899b", flex: 1, whiteSpace: "nowrap" }}>
                  Search by lot no/name
                </span>
                <KeyboardArrowDownOutlined sx={oIcon(24, { color: "#7d899b" })} aria-hidden />
              </div>
              <div
                style={{
                  width: 130,
                  height: 40,
                  border: "1px solid #ccd1d8",
                  background: "#fff",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "var(--inter), sans-serif", fontSize: 14, color: "#000" }}>All Status</span>
                <KeyboardArrowDownOutlined sx={oIcon(24, { color: "#000" })} aria-hidden />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              <table
                className="assign-lots-table"
                style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--fk), sans-serif" }}
              >
                <thead>
                  <tr style={{ background: "#eff0f3" }}>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot No.</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot Name</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>State Name</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot Opportunity/year</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Total Zipcodes</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Status</th>
                    <th style={{ padding: "14px 12px", textAlign: "center", width: 64 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            selectAll();
                          }}
                          onKeyDown={(e) => e.key === "Enter" && selectAll()}
                          role="button"
                          tabIndex={0}
                          style={{
                            width: 16,
                            height: 16,
                            border: "1px solid #6a6a70",
                            borderRadius: 4,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="assign-lots-tbody">
                  {LOTS_FOR_MODAL.map((lot, i) => {
                    const isSelected = selected.has(i);
                    return (
                      <tr
                        key={lot.no + i}
                        style={{ background: isSelected ? "#f0f6ff" : undefined, cursor: "pointer" }}
                        onClick={() => toggle(i)}
                      >
                        <td style={{ color: "#444446", fontWeight: 400 }}>{lot.no}</td>
                        <td style={{ color: "#86868b" }}>{lot.name}</td>
                        <td style={{ color: "#444446" }}>{lot.state}</td>
                        <td style={{ color: "#86868b" }}>{lot.opp}</td>
                        <td style={{ color: "#86868b" }}>{lot.zips}</td>
                        <td>
                          <StatusBadge lot={lot} />
                        </td>
                        <td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                          <Chk checked={isSelected} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #e6e6e7",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--fk), sans-serif",
                  fontSize: 12,
                  color: "#5c6b82",
                  opacity: selected.size > 0 ? 1 : 0,
                }}
              >
                Selected ({selected.size})
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    border: "1px solid #e6e6e7",
                    borderRadius: 8,
                    background: "#fff",
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontFamily: "var(--fk), sans-serif",
                    fontSize: 14,
                    color: "#444446",
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onContinue}
                  style={{
                    border: "1px solid #0032a0",
                    borderRadius: 2,
                    background: "#0032a0",
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontFamily: "var(--inter), sans-serif",
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 2px rgba(16,24,40,0.05)",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}

        {step === "transfer" && transferLot !== null && (
          <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", fontFamily: "var(--fk), sans-serif" }}>
            <TransferLotOwnershipPanel
              onClose={onClose}
              lotIndex={transferLot}
              newFranchiseName={newFranchiseName}
              showBack
              onBack={() => setStep("assign")}
              onConfirm={(effectiveYmd, transferAllUsers) => {
                onConfirmTransfer(transferLot, effectiveYmd, transferAllUsers);
                onClose();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
