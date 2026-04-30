"use client";

import CloseOutlined from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
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

/** Numeric Lot No. column: always exactly 2 digits (e.g. NB-006 → "06"). */
function lotNumericNo(no: string): string {
  const m = no.match(/-(\d+)$/);
  if (!m) return "";
  const n = parseInt(m[1], 10);
  if (!Number.isFinite(n)) return "";
  return String(n % 100).padStart(2, "0");
}

/** Rows shown in Assign Lots modal (pending lots excluded). */
const ASSIGN_MODAL_STATUSES = new Set<LotForModal["status"]>(["available", "sold"]);

function Radio({ checked }: { checked: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        className="lot-row-radio"
        role="radio"
        aria-checked={checked}
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: `2px solid ${checked ? "#0032a0" : "#6a6a70"}`,
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0032a0" }} />}
      </div>
    </div>
  );
}

type Props = {
  onClose: () => void;
  newFranchiseName: string;
  onAssignLots: (lotIndices: number[]) => void;
  onConfirmTransfer: (lotIndex: number, effectiveYmd: string, transferAllUsers: boolean, allSelectedIndices: number[]) => void;
};

type Step = "assign" | "transfer";

export function AssignLotsModal({ onClose, newFranchiseName, onAssignLots, onConfirmTransfer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState<Step>("assign");
  const [transferLot, setTransferLot] = useState<number | null>(null);

  const assignModalRows = useMemo(
    () =>
      LOTS_FOR_MODAL.map((lot, index) => ({ lot, index })).filter(({ lot }) => ASSIGN_MODAL_STATUSES.has(lot.status)),
    [],
  );

  const pickRow = useCallback((i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onContinue = () => {
    if (selected === null) {
      onClose();
      return;
    }
    const lot = LOTS_FOR_MODAL[selected];
    if (lot.status === "sold") {
      setTransferLot(selected);
      setStep("transfer");
    } else {
      onAssignLots([selected]);
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
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot Name</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>State Name</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot No.</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Lot Opportunity/year</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Total Zipcodes</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Status</th>
                    <th style={{ padding: "14px 12px", textAlign: "center", width: 64 }} aria-hidden />
                  </tr>
                </thead>
                <tbody className="assign-lots-tbody" role="radiogroup" aria-label="Select one lot">
                  {assignModalRows.map(({ lot, index }) => {
                    const isSelected = selected === index;
                    return (
                      <tr
                        key={lot.no}
                        style={{ background: isSelected ? "#f0f6ff" : undefined, cursor: "pointer" }}
                        onClick={() => pickRow(index)}
                      >
                        <td style={{ color: "#444446", fontWeight: 400 }}>{lot.no}</td>
                        <td style={{ color: "#444446" }}>{lot.state}</td>
                        <td style={{ color: "#86868b", fontVariantNumeric: "tabular-nums" }}>{lotNumericNo(lot.no)}</td>
                        <td style={{ color: "#86868b" }}>{lot.opp}</td>
                        <td style={{ color: "#86868b" }}>{lot.zips}</td>
                        <td>
                          <StatusBadge lot={lot} />
                        </td>
                        <td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => pickRow(index)}
                            style={{ border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex" }}
                            aria-label={`Select ${lot.no}`}
                          >
                            <Radio checked={isSelected} />
                          </button>
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
                  opacity: selected !== null ? 1 : 0,
                }}
              >
                {selected !== null ? `Selected (1)` : ""}
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
                if (transferLot === null) return;
                onConfirmTransfer(transferLot, effectiveYmd, transferAllUsers, [transferLot]);
                onClose();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
