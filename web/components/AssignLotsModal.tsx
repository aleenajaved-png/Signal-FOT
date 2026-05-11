"use client";

import CloseOutlined from "@mui/icons-material/CloseOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowLeftOutlined from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LOTS_FOR_MODAL, OLD_FRANCHISE_MAP, type LotForModal } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";

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

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        className="lot-row-checkbox"
        role="checkbox"
        aria-checked={checked}
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          border: `2px solid ${checked ? "#0032a0" : "#6a6a70"}`,
          background: checked ? "#0032a0" : "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && (
          <span
            aria-hidden
            style={{
              color: "#fff",
              fontSize: 12,
              lineHeight: 1,
              fontWeight: 700,
              transform: "translateY(-0.5px)",
            }}
          >
            ✓
          </span>
        )}
      </div>
    </div>
  );
}

type Props = {
  onClose: () => void;
  newFranchiseName: string;
  newFranchiseId?: string;
  onAssignLots: (lotIndices: number[]) => void;
  onConfirmTransfer: (lotIndex: number, effectiveYmd: string, transferAllUsers: boolean, allSelectedIndices: number[]) => void;
};

type Step = "assign" | "transfer";

export function AssignLotsModal({ onClose, newFranchiseName, newFranchiseId, onAssignLots, onConfirmTransfer }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [step, setStep] = useState<Step>("assign");
  const [effectiveByLot, setEffectiveByLot] = useState<Record<number, string>>({});
  const [transferAllUsersByLot, setTransferAllUsersByLot] = useState<Record<number, boolean>>({});

  const assignModalRows = useMemo(
    () =>
      LOTS_FOR_MODAL.map((lot, index) => ({ lot, index })).filter(({ lot }) => ASSIGN_MODAL_STATUSES.has(lot.status)),
    [],
  );

  const pickRow = useCallback((i: number) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }, []);

  const selectedLots = useMemo(
    () => selected.map((i) => ({ index: i, lot: LOTS_FOR_MODAL[i] })).filter((v) => Boolean(v.lot)),
    [selected],
  );
  const soldSelections = useMemo(() => selectedLots.filter(({ lot }) => lot.status === "sold"), [selectedLots]);
  const availableSelections = useMemo(() => selectedLots.filter(({ lot }) => lot.status === "available"), [selectedLots]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onContinue = () => {
    if (selected.length === 0) {
      onClose();
      return;
    }
    const today = new Date();
    const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const nextDayYmd = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;
    setEffectiveByLot((prev) => {
      const next = { ...prev };
      soldSelections.forEach(({ index }) => {
        if (!next[index]) next[index] = nextDayYmd;
      });
      return next;
    });
    setStep("transfer");
  };

  const onConfirmMixed = () => {
    if (availableSelections.length > 0) {
      onAssignLots(availableSelections.map(({ index }) => index));
    }
    soldSelections.forEach(({ index }) => {
      const effectiveYmd = effectiveByLot[index];
      if (!effectiveYmd) return;
      onConfirmTransfer(index, effectiveYmd, Boolean(transferAllUsersByLot[index]), [index]);
    });
    onClose();
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
          height: step === "transfer" ? 713 : undefined,
          maxHeight: step === "transfer" ? "min(90vh, 713px)" : "90vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--fk), sans-serif",
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
                <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 14, color: "#000" }}>All Status</span>
                <KeyboardArrowDownOutlined sx={oIcon(24, { color: "#000" })} aria-hidden />
              </div>
            </div>

            <div style={{ flex: "1 1 0%", overflowY: "auto", padding: "0 24px" }}>
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
                <tbody className="assign-lots-tbody" aria-label="Select lots">
                  {assignModalRows.map(({ lot, index }) => {
                    const isSelected = selected.includes(index);
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
                            <Checkbox checked={isSelected} />
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
                  opacity: selected.length > 0 ? 1 : 0,
                }}
              >
                {selected.length > 0 ? `Selected (${selected.length})` : ""}
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
                    fontFamily: "var(--fk), sans-serif",
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

        {step === "transfer" && (
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
              fontFamily: "var(--fk), sans-serif",
              width: "100%",
              height: "100%",
              maxWidth: 1024,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #e6e6e7",
                minHeight: 69,
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setStep("assign")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
                  aria-label="Back"
                >
                  <KeyboardArrowLeftOutlined sx={oIcon(18, { color: "#444446" })} aria-hidden />
                </button>
                <span style={{ fontSize: 14, lineHeight: "28px", color: "#101828" }}>
                  {`${newFranchiseId ? newFranchiseId.replace("#", "") : ""} - ${newFranchiseName}`}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "2px 6px",
                    borderRadius: 2,
                    background: "#e5f6ff",
                    fontSize: 12,
                    lineHeight: "14px",
                    color: "#146dff",
                  }}
                >
                  {soldSelections.length + availableSelections.length} lots
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
                aria-label="Close"
              >
                <CloseOutlined sx={oIcon(16, { color: "#444446" })} aria-hidden />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px 24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              {soldSelections.length > 0 && (
                <div>
                  <div style={{ padding: "10px 0", fontSize: 16, color: "#000" }}>Sold Lots</div>
                  <div style={{ borderTop: "1px solid #e6e6e7" }} />
                  {soldSelections.map(({ index, lot }) => {
                    const effective = effectiveByLot[index] ?? "";
                    const cutoff = effective
                      ? (() => {
                          const d = new Date(`${effective}T12:00:00`);
                          const c = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
                          return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
                        })()
                      : "";
                    const currentFr = OLD_FRANCHISE_MAP[lot.no];
                    const currentFrLabel = currentFr ? `${currentFr.id ? `${currentFr.id} - ` : ""}${currentFr.name}` : "N/A";
                    const newFrLabel = `${newFranchiseId ? `${newFranchiseId.replace("#", "")} - ` : ""}${newFranchiseName}`;
                    return (
                      <div key={lot.no} style={{ padding: "20px 0", borderBottom: "1px solid #e6e6e7" }}>
                        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: 14, lineHeight: "20px", color: "#101828" }}>{lot.no}</span>
                              <span style={{ background: "#eff0f3", borderRadius: 2, padding: "2px 6px", fontSize: 12, color: "#546176" }}>Sold</span>
                            </div>
                            <div style={{ fontSize: 12, lineHeight: "16px", color: "#86868b" }}>
                              State <span style={{ color: "#000" }}>{lot.state}</span>
                            </div>
                            <div style={{ fontSize: 12, lineHeight: "16px", color: "#86868b" }}>
                              Current Franchise <span style={{ color: "#000" }}>{currentFrLabel}</span>
                            </div>
                          </div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 17 }}>
                              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#000" }}>
                                  Effective Date of New Franchise
                                  <InfoOutlined sx={oIcon(14, { color: "#146dff" })} aria-hidden />
                                </span>
                                <input
                                  type="date"
                                  value={effective}
                                  onChange={(e) => setEffectiveByLot((prev) => ({ ...prev, [index]: e.target.value }))}
                                  style={{ height: 34, border: "1px solid #ccd1d8", borderRadius: 4, padding: "0 14px", fontSize: 14 }}
                                />
                              </label>
                              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#000" }}>
                                  Cut-off Date for Current Franchise
                                  <InfoOutlined sx={oIcon(14, { color: "#146dff" })} aria-hidden />
                                </span>
                                <input
                                  type="date"
                                  value={cutoff}
                                  disabled
                                  readOnly
                                  style={{
                                    height: 34,
                                    border: "1px solid #ccd1d8",
                                    borderRadius: 4,
                                    padding: "0 14px",
                                    fontSize: 14,
                                    color: "#aeaeb2",
                                    background: "#f5f5f6",
                                  }}
                                />
                              </label>
                            </div>
                            {effective && (
                              <div style={{ fontSize: 12, lineHeight: "19.5px", color: "#6a6a70" }}>
                                This lot will transition to <span style={{ color: "#262527" }}>{newFrLabel}</span> effective{" "}
                                <span style={{ color: "#262527" }}>12:00 AM</span> on{" "}
                                <span style={{ color: "#262527" }}>{new Date(`${effective}T12:00:00`).toLocaleDateString("en-US")}</span>.
                              </div>
                            )}
                            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "#262527" }}>
                              <input
                                type="checkbox"
                                checked={Boolean(transferAllUsersByLot[index])}
                                onChange={(e) => setTransferAllUsersByLot((prev) => ({ ...prev, [index]: e.target.checked }))}
                              />
                              Migrate all users from previous franchise
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {availableSelections.length > 0 && (
                <div style={{ paddingTop: 16 }}>
                  <div style={{ padding: "10px 0", fontSize: 16, color: "#000" }}>Available Lots</div>
                  <div style={{ borderTop: "1px solid #e6e6e7", marginBottom: 10 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", paddingTop: 10 }}>
                    {availableSelections.map(({ lot }) => (
                      <div
                        key={lot.no}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          border: "1px solid #e6e6e7",
                          borderRadius: 2,
                          padding: "5px 12px",
                          background: "#fff",
                        }}
                      >
                        <span style={{ fontSize: 14, color: "#101828", lineHeight: "20px" }}>{lot.no}</span>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#146dff", display: "inline-block" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                background: "#f9fafb",
                borderTop: "1px solid #e5e7eb",
                height: 71,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 12,
                padding: "16px 24px",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: "#fff",
                  border: "1px solid #d1d5dc",
                  borderRadius: 4,
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#364153",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmMixed}
                style={{
                  background: "#0032a0",
                  border: "1px solid #0032a0",
                  borderRadius: 4,
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                Confirm
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
