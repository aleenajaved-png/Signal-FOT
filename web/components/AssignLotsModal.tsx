"use client";

import CloseOutlined from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowLeftOutlined from "@mui/icons-material/KeyboardArrowLeftOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LOTS_FOR_MODAL, OLD_FRANCHISE_MAP, type LotForModal } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";

const pad2 = (n: number) => String(n).padStart(2, "0");

function toYmd(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function endOfLocalDayFromYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return new Date(0);
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}

function addDaysYmd(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(y, m - 1, d + days, 12, 0, 0, 0);
  return toYmd(t);
}

function dayjsFromYmdLocal(ymd: string): Dayjs {
  return dayjs(`${ymd}T12:00:00`);
}

function computeMinCutoffYmd(): string {
  const minTime = Date.now() + 24 * 60 * 60 * 1000;
  const s = new Date();
  s.setHours(0, 0, 0, 0);
  for (let i = 0; i < 400; i++) {
    const d = new Date(s);
    d.setDate(s.getDate() + i);
    const ymd = toYmd(d);
    if (endOfLocalDayFromYmd(ymd).getTime() >= minTime) {
      return ymd;
    }
  }
  return toYmd(new Date());
}

function formatMmDdYyyy(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return `${pad2(m)}/${pad2(d)}/${y}`;
}

function parseUsdInput(raw: string): number | null {
  const t = raw.replace(/[$,\s]/g, "");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function RequiredMark() {
  return (
    <span aria-hidden style={{ color: "#df372b", marginLeft: 2 }}>
      *
    </span>
  );
}

const EFFECTIVE_DATE_TOOLTIP =
  "On the Effective Date, the franchise becomes operational on this Lot.";
const CUTOFF_DATE_TOOLTIP =
  "Cut-off Date must be at least 1 day (24 hours) before the Effective Date.";

const assignDatePickerRootSx = {
  height: 40,
  fontFamily: "Inter, var(--fk), sans-serif",
  fontSize: 12,
  borderRadius: "2px",
  backgroundColor: "#fff",
  padding: 0,
  letterSpacing: 0,
  "& fieldset": {
    border: "1px solid #d8dadc",
    borderRadius: "2px",
  },
  "&:hover fieldset": {
    border: "1px solid #d8dadc",
  },
  "&.Mui-focused fieldset": {
    border: "1px solid #d8dadc",
  },
  "&.Mui-error fieldset": {
    border: "1px solid #df372b",
  },
};

const assignDatePickerSx = {
  mt: "6px",
  width: "100%",
  fontSize: 12,
  "& .MuiOutlinedInput-root": assignDatePickerRootSx,
  "& .MuiPickersOutlinedInput-root": assignDatePickerRootSx,
  "& .MuiOutlinedInput-input": {
    padding: "0 16px",
    height: 40,
    boxSizing: "border-box" as const,
    fontSize: 12,
    lineHeight: "18px",
    textAlign: "left",
    letterSpacing: 0,
  },
  "& .MuiPickersOutlinedInput-root, & .MuiPickersInputBase-root": {
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: 0,
  },
  "& .MuiPickersSectionList-root, & .MuiPickersInputBase-sectionsContainer": {
    fontSize: 12,
    padding: "0 0 0 16px",
    justifyContent: "flex-start",
    textAlign: "left",
    letterSpacing: 0,
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box" as const,
    height: "100%",
    alignItems: "center",
  },
  "& .MuiPickersSectionList-section, & .MuiPickersInputBase-section": {
    letterSpacing: 0,
  },
  "& .MuiPickersSectionList-sectionContent": {
    fontSize: 12,
    lineHeight: "18px",
    padding: 0,
    margin: 0,
    letterSpacing: 0,
    textAlign: "left",
  },
  "& .MuiPickersInputBase-sectionAfter, & .MuiPickersInputBase-sectionBefore, & .MuiPickersSectionList-sectionSeparator": {
    padding: 0,
    margin: 0,
    letterSpacing: 0,
  },
  "& .MuiInputAdornment-root": {
    marginLeft: 0,
    marginRight: "16px",
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root, & .MuiIconButton-root .MuiSvgIcon-root": {
    width: "16px",
    height: "16px",
    fontSize: "16px",
    color: "#86868b",
  },
  "& .MuiIconButton-root": {
    padding: "4px",
  },
};

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

function LotSummaryCard({
  lotNo,
  state,
  status,
  currentFranchise,
}: {
  lotNo: string;
  state: string;
  status: "sold" | "available";
  currentFranchise: string;
}) {
  const muted = { fontSize: 12, color: "#86868b" } as const;
  const value = { fontSize: 13, color: "#262527", fontWeight: 500 } as const;
  const sep = (
    <span style={{ color: "#d8dadc", margin: "0 10px", flexShrink: 0 }} aria-hidden>
      |
    </span>
  );
  return (
    <div
      style={{
        background: "#f5f5f6",
        borderRadius: 4,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 4,
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "var(--fk), sans-serif",
        lineHeight: "18px",
      }}
    >
      <span style={muted}>Lot</span>
      <span style={{ ...value, marginLeft: 6 }}>{lotNo}</span>
      {sep}
      <span style={muted}>State</span>
      <span style={{ ...value, marginLeft: 6 }}>{state}</span>
      {sep}
      <span style={muted}>Status</span>
      <span style={{ marginLeft: 6, display: "inline-flex", alignItems: "center" }}>
        <span className={status === "available" ? "lot-badge-available" : "lot-badge-sold"}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {status === "available" ? "Available" : "Sold"}
          </span>
        </span>
      </span>
      {sep}
      <span style={muted}>Current Franchise</span>
      <span style={{ ...value, marginLeft: 6 }}>{currentFranchise}</span>
    </div>
  );
}

function PriceInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", width: "100%", minWidth: 0 }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0 16px",
          border: "1px solid #d8dadc",
          borderRight: "none",
          borderRadius: "2px 0 0 2px",
          background: "#f5f5f6",
          color: "#444446",
          fontFamily: "Inter, var(--fk), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          boxSizing: "border-box",
          height: 40,
        }}
        aria-hidden
      >
        $
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          minWidth: 0,
          height: 40,
          border: "1px solid #d8dadc",
          borderRadius: "0 2px 2px 0",
          padding: "0 16px",
          boxSizing: "border-box",
          fontFamily: "Inter, var(--fk), sans-serif",
          fontSize: 12,
          color: "#262527",
          textAlign: "left",
        }}
      />
    </div>
  );
}

type Props = {
  onClose: () => void;
  newFranchiseName: string;
  newFranchiseId?: string;
  onAssignLots: (assignments: { lotIndex: number; effectiveYmd: string; priceUsd: string }[]) => void;
  onConfirmTransfer: (
    lotIndex: number,
    effectiveYmd: string,
    transferAllUsers: boolean,
    allSelectedIndices: number[],
    priceUsd?: string,
  ) => void;
};

type Step = "assign" | "transfer";

export function AssignLotsModal({ onClose, newFranchiseName, newFranchiseId, onAssignLots, onConfirmTransfer }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [step, setStep] = useState<Step>("assign");
  const [effectiveByLot, setEffectiveByLot] = useState<Record<number, string>>({});
  const [cutoffByLot, setCutoffByLot] = useState<Record<number, string>>({});
  const [priceByLot, setPriceByLot] = useState<Record<number, string>>({});
  const [transferAllUsersByLot, setTransferAllUsersByLot] = useState<Record<number, boolean>>({});
  const [minCutYmd] = useState(computeMinCutoffYmd);
  const [soldAccordionOpen, setSoldAccordionOpen] = useState(true);
  const [availableAccordionOpen, setAvailableAccordionOpen] = useState(true);

  const minEffectiveYmd = useMemo(() => addDaysYmd(minCutYmd, 1), [minCutYmd]);
  const minEffectiveDayjs = useMemo(() => dayjsFromYmdLocal(minEffectiveYmd), [minEffectiveYmd]);
  const minCutoffDayjs = useMemo(() => dayjsFromYmdLocal(minCutYmd), [minCutYmd]);

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

  const priceOkFor = (index: number) => {
    const parsed = parseUsdInput(priceByLot[index] ?? "");
    return parsed != null && parsed > 0;
  };

  const soldDatesValid = useMemo(
    () =>
      soldSelections.every(({ index }) => {
        const effective = effectiveByLot[index];
        const cutoff = cutoffByLot[index];
        return Boolean(effective && cutoff && cutoff < effective && priceOkFor(index));
      }),
    [soldSelections, effectiveByLot, cutoffByLot, priceByLot],
  );

  const availableDatesValid = useMemo(
    () => availableSelections.every(({ index }) => Boolean(effectiveByLot[index]) && priceOkFor(index)),
    [availableSelections, effectiveByLot, priceByLot],
  );

  const confirmEnabled =
    (soldSelections.length === 0 || soldDatesValid) &&
    (availableSelections.length === 0 || availableDatesValid) &&
    (soldSelections.length > 0 || availableSelections.length > 0);

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
    setStep("transfer");
  };

  const onConfirmMixed = () => {
    if (!confirmEnabled) return;
    if (availableSelections.length > 0) {
      onAssignLots(
        availableSelections
          .map(({ index }) => ({
            lotIndex: index,
            effectiveYmd: effectiveByLot[index],
            priceUsd: priceByLot[index] ?? "",
          }))
          .filter((a) => Boolean(a.effectiveYmd) && priceOkFor(a.lotIndex)),
      );
    }
    soldSelections.forEach(({ index }) => {
      const effectiveYmd = effectiveByLot[index];
      if (!effectiveYmd) return;
      onConfirmTransfer(
        index,
        effectiveYmd,
        Boolean(transferAllUsersByLot[index]),
        [index],
        priceByLot[index],
      );
    });
    onClose();
  };

  const applyEffectiveForLot = (index: number, v: Dayjs | null) => {
    if (v == null || !v.isValid()) {
      setEffectiveByLot((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      setCutoffByLot((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      return;
    }
    const ymd = `${v.year()}-${pad2(v.month() + 1)}-${pad2(v.date())}`;
    setEffectiveByLot((prev) => ({ ...prev, [index]: ymd }));
  };

  const applyCutoffForLot = (index: number, v: Dayjs | null) => {
    if (v == null || !v.isValid()) {
      setCutoffByLot((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      return;
    }
    setCutoffByLot((prev) => ({
      ...prev,
      [index]: `${v.year()}-${pad2(v.month() + 1)}-${pad2(v.date())}`,
    }));
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
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Current Franchise</th>
                    <th style={{ padding: "14px 12px", textAlign: "left", fontSize: 12, fontWeight: 400, color: "#414c5c" }}>Status</th>
                    <th style={{ padding: "14px 12px", textAlign: "center", width: 64 }} aria-hidden />
                  </tr>
                </thead>
                <tbody className="assign-lots-tbody" aria-label="Select lots">
                  {assignModalRows.map(({ lot, index }) => {
                    const isSelected = selected.includes(index);
                    const currentFr = OLD_FRANCHISE_MAP[lot.no];
                    const currentFranchiseLabel =
                      lot.status === "sold"
                        ? currentFr
                          ? `${currentFr.id} - ${currentFr.name}`
                          : "N/A"
                        : "NA";
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
                        <td style={{ color: "#86868b" }}>{currentFranchiseLabel}</td>
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
                  <button
                    type="button"
                    onClick={() => setSoldAccordionOpen((open) => !open)}
                    aria-expanded={soldAccordionOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontFamily: "var(--fk), sans-serif",
                      fontSize: 16,
                      color: "#000",
                      textAlign: "left",
                    }}
                  >
                    <span>
                      Sold Lots
                      <span style={{ marginLeft: 8, fontSize: 13, color: "#6a6a70" }}>
                        ({soldSelections.length})
                      </span>
                    </span>
                    <KeyboardArrowDownOutlined
                      sx={oIcon(20, {
                        color: "#444446",
                        transform: soldAccordionOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "transform 0.15s ease",
                      })}
                      aria-hidden
                    />
                  </button>
                  <div style={{ borderTop: "1px solid #e6e6e7" }} />
                  {soldAccordionOpen ? (
                    <>
                  {soldSelections.map(({ index, lot }) => {
                    const effective = effectiveByLot[index] ?? "";
                    const cutoff = cutoffByLot[index] ?? "";
                    const cutoffInvalid = Boolean(effective && cutoff && cutoff >= effective);
                    const maxCutoffDayjs = effective ? dayjsFromYmdLocal(addDaysYmd(effective, -1)) : undefined;
                    const currentFr = OLD_FRANCHISE_MAP[lot.no];
                    const currentFrLabel = currentFr ? `${currentFr.id} - ${currentFr.name}` : "N/A";
                    const newFrLabel = `${newFranchiseId ? `${newFranchiseId.replace("#", "")} - ` : ""}${newFranchiseName}`;
                    return (
                      <div key={lot.no} style={{ padding: "20px 0", borderBottom: "1px solid #e6e6e7" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          <LotSummaryCard
                            lotNo={lot.no}
                            state={lot.state}
                            status="sold"
                            currentFranchise={currentFrLabel}
                          />

                          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <label
                                  htmlFor={`assign-effective-${index}`}
                                  style={{ fontSize: 14, color: "#272d37", fontWeight: 500 }}
                                >
                                  Effective Date of New Franchise
                                  <RequiredMark />
                                </label>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  {EFFECTIVE_DATE_TOOLTIP}
                                </div>
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    format="MM/DD/YYYY"
                                    formatDensity="dense"
                                    value={effective ? dayjsFromYmdLocal(effective) : null}
                                    minDate={minEffectiveDayjs}
                                    onChange={(v) => applyEffectiveForLot(index, v)}
                                    slotProps={{
                                      popper: { sx: { zIndex: 2100 } },
                                      textField: {
                                        id: `assign-effective-${index}`,
                                        size: "small",
                                        slotProps: {
                                          htmlInput: { autoComplete: "off" as const, placeholder: "MM/DD/YYYY" },
                                        },
                                        className: "transfer-date-input",
                                        sx: { ...assignDatePickerSx, mt: 0 },
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                                {effective && (
                                  <div style={{ fontSize: 12, lineHeight: "19.5px", color: "#6a6a70", marginTop: 6 }}>
                                    This lot will transition to <span style={{ color: "#262527" }}>{newFrLabel}</span>{" "}
                                    effective <span style={{ color: "#262527" }}>00:00</span> on{" "}
                                    <span style={{ color: "#262527" }}>{formatMmDdYyyy(effective)}</span>.
                                  </div>
                                )}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <label
                                  htmlFor={`assign-cutoff-${index}`}
                                  style={{
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 500,
                                  }}
                                >
                                  Cut-off Date for Current Franchise
                                  <RequiredMark />
                                </label>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  {CUTOFF_DATE_TOOLTIP}
                                  <br />
                                  This Lot&apos;s Effective Date and resale can be changed any time before the Cut-off
                                  Date. Once the Cut-off Date arrives, the transition begins and rollback can no longer
                                  take place.
                                </div>
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    format="MM/DD/YYYY"
                                    formatDensity="dense"
                                    value={cutoff ? dayjsFromYmdLocal(cutoff) : null}
                                    minDate={minCutoffDayjs}
                                    maxDate={maxCutoffDayjs}
                                    onChange={(v) => applyCutoffForLot(index, v)}
                                    disabled={!effective}
                                    slotProps={{
                                      popper: { sx: { zIndex: 2100 } },
                                      textField: {
                                        id: `assign-cutoff-${index}`,
                                        size: "small",
                                        disabled: !effective,
                                        error: cutoffInvalid,
                                        slotProps: {
                                          htmlInput: { autoComplete: "off" as const, placeholder: "MM/DD/YYYY" },
                                        },
                                        className: "transfer-date-input",
                                        sx: {
                                          ...assignDatePickerSx,
                                          mt: 0,
                                          "& .MuiOutlinedInput-root": {
                                            ...assignDatePickerSx["& .MuiOutlinedInput-root"],
                                            backgroundColor: effective ? "#fff" : "#f5f5f6",
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                                {cutoffInvalid && (
                                  <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>
                                    Cut-off must be before the effective date.
                                  </div>
                                )}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <label
                                  htmlFor={`assign-price-${index}`}
                                  style={{ fontSize: 14, color: "#272d37", fontWeight: 500 }}
                                >
                                  Price
                                  <RequiredMark />
                                </label>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  Price at which the lot is sold to the New Franchise
                                </div>
                              </div>
                              <PriceInput
                                id={`assign-price-${index}`}
                                value={priceByLot[index] ?? ""}
                                onChange={(next) => setPriceByLot((prev) => ({ ...prev, [index]: next }))}
                              />
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <span style={{ fontSize: 14, color: "#272d37", fontWeight: 500 }}>Migrate Users</span>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  Migrate all the users from previous franchise to the new franchise
                                </div>
                              </div>
                              <label
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 8,
                                  margin: 0,
                                  minHeight: 40,
                                  cursor: "pointer",
                                  fontSize: 14,
                                  color: "#272d37",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={Boolean(transferAllUsersByLot[index])}
                                  onChange={(e) =>
                                    setTransferAllUsersByLot((prev) => ({ ...prev, [index]: e.target.checked }))
                                  }
                                  style={{
                                    width: 18,
                                    height: 18,
                                    margin: 0,
                                    cursor: "pointer",
                                    accentColor: "#0032a0",
                                    flexShrink: 0,
                                  }}
                                />
                                <span>Migrate all the users to the New Franchise</span>
                              </label>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                    </>
                  ) : null}
                </div>
              )}
              {availableSelections.length > 0 && (
                <div style={{ paddingTop: soldSelections.length > 0 ? 16 : 0 }}>
                  <button
                    type="button"
                    onClick={() => setAvailableAccordionOpen((open) => !open)}
                    aria-expanded={availableAccordionOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontFamily: "var(--fk), sans-serif",
                      fontSize: 16,
                      color: "#000",
                      textAlign: "left",
                    }}
                  >
                    <span>
                      Available Lots
                      <span style={{ marginLeft: 8, fontSize: 13, color: "#6a6a70" }}>
                        ({availableSelections.length})
                      </span>
                    </span>
                    <KeyboardArrowDownOutlined
                      sx={oIcon(20, {
                        color: "#444446",
                        transform: availableAccordionOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "transform 0.15s ease",
                      })}
                      aria-hidden
                    />
                  </button>
                  <div style={{ borderTop: "1px solid #e6e6e7" }} />
                  {availableAccordionOpen ? (
                    <>
                  {availableSelections.map(({ index, lot }) => {
                    const effective = effectiveByLot[index] ?? "";
                    return (
                      <div key={lot.no} style={{ padding: "20px 0", borderBottom: "1px solid #e6e6e7" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          <LotSummaryCard
                            lotNo={lot.no}
                            state={lot.state}
                            status="available"
                            currentFranchise="NA"
                          />

                          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <label
                                  htmlFor={`assign-available-effective-${index}`}
                                  style={{ fontSize: 14, color: "#272d37", fontWeight: 500 }}
                                >
                                  Effective Date
                                  <RequiredMark />
                                </label>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  {EFFECTIVE_DATE_TOOLTIP}
                                </div>
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    format="MM/DD/YYYY"
                                    formatDensity="dense"
                                    value={effective ? dayjsFromYmdLocal(effective) : null}
                                    minDate={minEffectiveDayjs}
                                    onChange={(v) => applyEffectiveForLot(index, v)}
                                    slotProps={{
                                      popper: { sx: { zIndex: 2100 } },
                                      textField: {
                                        id: `assign-available-effective-${index}`,
                                        size: "small",
                                        slotProps: {
                                          htmlInput: { autoComplete: "off" as const, placeholder: "MM/DD/YYYY" },
                                        },
                                        className: "transfer-date-input",
                                        sx: { ...assignDatePickerSx, mt: 0 },
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 24,
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <label
                                  htmlFor={`assign-available-price-${index}`}
                                  style={{ fontSize: 14, color: "#272d37", fontWeight: 500 }}
                                >
                                  Price
                                  <RequiredMark />
                                </label>
                                <div style={{ fontSize: 12, lineHeight: "18px", color: "#6a6a70", marginTop: 6 }}>
                                  Price at which the lot is sold to the New Franchise
                                </div>
                              </div>
                              <PriceInput
                                id={`assign-available-price-${index}`}
                                value={priceByLot[index] ?? ""}
                                onChange={(next) => setPriceByLot((prev) => ({ ...prev, [index]: next }))}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                    </>
                  ) : null}
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
                disabled={!confirmEnabled}
                style={{
                  background: "#0032a0",
                  border: "1px solid #0032a0",
                  borderRadius: 4,
                  padding: "8px 18px",
                  cursor: confirmEnabled ? "pointer" : "not-allowed",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#fff",
                  opacity: confirmEnabled ? 1 : 0.5,
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
