"use client";

import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { oIcon } from "@/lib/muiIconSx";
import { LOTS_FOR_MODAL, OLD_FRANCHISE_MAP, type LotForModal } from "@/lib/data";

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Display ISO date as MM/DD/YYYY */
function formatYmdAsMmDdYyyy(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${pad2(m)}/${pad2(d)}/${y}`;
}

/** Local calendar day as YYYY-MM-DD */
function toYmd(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** End of local calendar day (11:59:59.999 PM) for a YYYY-MM-DD string. */
function endOfLocalDayFromYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return new Date(0);
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}

/** Parse user price input (allows $, commas, spaces). Returns null if empty/invalid. */
function parseUsdInput(raw: string): number | null {
  const t = raw.replace(/[$,\s]/g, "");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Add whole days to a YMD (local). */
function addDaysYmd(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(y, m - 1, d + days, 12, 0, 0, 0);
  return toYmd(t);
}

/** Dayjs from YYYY-MM-DD without UTC date-only parsing drift (matches MM/DD in the fields). */
function dayjsFromYmdLocal(ymd: string): Dayjs {
  return dayjs(`${ymd}T12:00:00`);
}

/**
 * First calendar date (YYYY-MM-DD) whose end-of-day is at least `minTime` (epoch ms) from now+24h rule uses minTime = now + 24h.
 * I.e. endOfLocalDay(ymd) >= minTime.
 */
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

const US_MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** Long US date (e.g. May 2, 2026) from YYYY-MM-DD — same y/m/d as the Effective and Cut-off row (MM/DD/YYYY). */
function formatDateLong(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return ymd;
  return `${US_MONTH_SHORT[m - 1]} ${d}, ${y}`;
}

/** e.g. `#0205` + `Omaha, NE` → `0205 - Omaha, NE` (matches current-franchise id – name style). */
function newFranchiseDisplay(id: string | undefined, name: string): string {
  if (!id) return name;
  const noid = id.replace(/^#/, "").trim();
  return noid ? `${noid} - ${name}` : name;
}

/** Franchise detail overlay: NB-002 + no back — preset timeline-only “revert” summary */
const NB002_REVERT_SUMMARY_EFFECTIVE_YMD = "2026-05-08";
const NB002_REVERT_SUMMARY_CUTOFF_YMD = "2026-05-07";

type Props = {
  onClose: () => void;
  lotIndex: number;
  /** Franchise name only (city label). */
  newFranchiseName: string;
  /** Optional list/detail id (e.g. `#0205`); shown before name in timeline and status. */
  newFranchiseId?: string;
  /** Third argument is lot sale price in USD when captured in the transfer form. */
  onConfirm: (effectiveYmd: string, transferAllUsers: boolean, priceUsd?: string) => void;
};

type PanelProps = Props & {
  showBack?: boolean;
  onBack?: () => void;
  forceFormMode?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  initialEffectiveYmd?: string;
  /** Pre-filled price (digits / plain number string from parent state). */
  initialPriceUsd?: string;
  /** When true, Confirm requires a valid price greater than 0 (e.g. franchise onboarding). */
  requirePriceForConfirm?: boolean;
  /**
   * Franchise onboarding confirm modal: non-sold lots only capture price (no effective/cut-off, checkbox, or timeline).
   * Status row shows as Available (blue). Default false; only franchise-onboarding passes true.
   */
  onboardingAvailablePricingOnly?: boolean;
  compactLayout?: boolean;
  confirmLabel?: string;
};

export function TransferLotOwnershipPanel({
  onClose,
  lotIndex,
  newFranchiseName,
  newFranchiseId,
  onConfirm,
  showBack = false,
  onBack,
  forceFormMode = false,
  headerTitle,
  headerSubtitle,
  initialEffectiveYmd = "",
  initialPriceUsd = "",
  requirePriceForConfirm = false,
  onboardingAvailablePricingOnly = false,
  compactLayout = false,
  confirmLabel,
}: PanelProps) {
  const lot: LotForModal | undefined = LOTS_FOR_MODAL[lotIndex];
  const oldFr = useMemo(() => {
    if (!lot) return { id: "0026", name: "Nebraska", owner: "" };
    return OLD_FRANCHISE_MAP[lot.no] ?? { id: "0026", name: "Nebraska", owner: "" };
  }, [lot]);

  const [minCutYmd] = useState(computeMinCutoffYmd);
  const [effective, setEffective] = useState(initialEffectiveYmd);
  const [priceUsd, setPriceUsd] = useState(initialPriceUsd);
  const [transferAllUsers, setTransferAllUsers] = useState(false);
  const [showRevertConfirmModal, setShowRevertConfirmModal] = useState(false);


  const minEffectiveYmd = useMemo(() => addDaysYmd(minCutYmd, 1), [minCutYmd]);
  const minEffectiveDayjs = useMemo(() => dayjsFromYmdLocal(minEffectiveYmd), [minEffectiveYmd]);

  /** Last calendar day of the current franchise: day before effective (cut-off at 11:59 PM that night). */
  const cutoffYmd = useMemo(() => {
    if (!effective) return "";
    return addDaysYmd(effective, -1);
  }, [effective]);

  const { valid, showTimeline, coErr, coMsg, efErr, efMsg, coCls, efCls } = useMemo(() => {
    if (!effective || !cutoffYmd) {
      return {
        valid: false,
        showTimeline: false,
        coErr: false,
        coMsg: "",
        efErr: false,
        efMsg: "",
        coCls: "",
        efCls: "",
      };
    }
    return { valid: true, showTimeline: true, coErr: false, coMsg: "", efErr: false, efMsg: "", coCls: "input-ok", efCls: "input-ok" };
  }, [cutoffYmd, effective]);

  const applyEffectiveDayjs = (v: Dayjs | null) => {
    if (v == null || !v.isValid()) {
      setEffective("");
      return;
    }
    const ymd = `${v.year()}-${pad2(v.month() + 1)}-${pad2(v.date())}`;
    setEffective(ymd);
  };

  if (!lot) return null;

  const revertSummaryUi = lot.no === "NB-002" && !showBack && !forceFormMode;
  const cutoffForTimeline = revertSummaryUi ? NB002_REVERT_SUMMARY_CUTOFF_YMD : cutoffYmd;
  const effectiveForTimeline = revertSummaryUi ? NB002_REVERT_SUMMARY_EFFECTIVE_YMD : effective;
  const showTimelineSection = revertSummaryUi || showTimeline;
  const parsedPrice = parseUsdInput(priceUsd);
  const priceOk = !requirePriceForConfirm || (parsedPrice != null && parsedPrice > 0);
  const formConfirmValid = revertSummaryUi
    ? true
    : onboardingAvailablePricingOnly
      ? priceOk
      : valid && priceOk;

  const oldFrLabel = `${oldFr.id ? `${oldFr.id} - ` : ""}${oldFr.name}`;
  const newFrLabel = newFranchiseDisplay(newFranchiseId, newFranchiseName);
  const showRevertCta = compactLayout && forceFormMode;

  /** Same Y-M-D as cut-off MM/DD/YYYY input + effective DatePicker → timeline + status (or presets in revert summary). */
  const cutoffTimelineLine = cutoffForTimeline ? `${formatDateLong(cutoffForTimeline)} (11:59 PM)` : "";
  const effectiveTimelineLine = effectiveForTimeline ? `Effective ${formatDateLong(effectiveForTimeline)} (12:00 AM)` : "";

  return (
    <div style={{ minHeight: 0, display: "flex", flexDirection: "column", flex: 1, fontFamily: "Inter, var(--fk), sans-serif" }}>
      <div className="transfer-lot-panel-group" style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #e6e6e7" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", marginTop: 2 }}
              aria-label="Back"
            >
              <ArrowBackOutlined sx={oIcon(18, { color: "#444446" })} aria-hidden />
            </button>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: "Inter, var(--fk), sans-serif", fontSize: 16, color: "#272d37" }}>
              {headerTitle ?? "Transfer lot ownership"}
            </span>
            {(headerSubtitle ?? "This lot is already assigned to another franchise") && (
              <span style={{ fontFamily: "Inter, var(--fk), sans-serif", fontSize: 12, color: "#86868b" }}>
                {headerSubtitle ?? "This lot is already assigned to another franchise"}
              </span>
            )}
          </div>
        </div>
        <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Close">
          <CloseOutlined sx={oIcon(12, { color: "#444446" })} aria-hidden />
        </button>
      </div>

      {!revertSummaryUi && !compactLayout ? (
      <div style={{ margin: "20px 24px 0", background: "#f5f5f6", borderRadius: 4, padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#86868b" }}>Lot</div>
          <div style={{ fontSize: 14, color: "#262527", fontWeight: 500 }}>{lot.no}</div>
        </div>
        <div style={{ width: 1, height: 32, background: "#e6e6e7" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#86868b" }}>State</div>
          <div style={{ fontSize: 14, color: "#262527" }}>{lot.state}</div>
        </div>
        <div style={{ width: 1, height: 32, background: "#e6e6e7" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#86868b" }}>Status</div>
          <div style={{ marginTop: 2 }}>
            <span
              className={
                onboardingAvailablePricingOnly || lot.status === "available"
                  ? "lot-badge-available"
                  : lot.status === "sold"
                    ? "lot-badge-sold"
                    : "lot-badge-pending"
              }
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {onboardingAvailablePricingOnly || lot.status === "available"
                  ? "Available"
                  : lot.status === "sold"
                    ? "Sold"
                    : "Pending"}
              </span>
            </span>
          </div>
        </div>
        {!onboardingAvailablePricingOnly ? (
          <>
            <div style={{ width: 1, height: 32, background: "#e6e6e7" }} />
            <div style={{ flex: 2 }}>
              <div style={{ fontSize: 12, color: "#86868b" }}>Current Franchise</div>
              <div style={{ fontSize: 14, color: "#262527" }}>
                {oldFr.id
                  ? `${oldFr.id} - ${oldFr.name}${oldFr.owner ? ` - ${oldFr.owner}` : ""}`
                  : `${oldFr.name}${oldFr.owner ? ` - ${oldFr.owner}` : ""}`}
              </div>
            </div>
          </>
        ) : null}
      </div>
      ) : null}

      {showRevertConfirmModal ? (
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#272d37" }}>Revert Decision</div>
          <div style={{ fontSize: 14, lineHeight: "22px", color: "#444446" }}>
            Are you sure you want to revert the decision. This lot was to be transitioned to franchise{" "}
            <strong>{newFrLabel}</strong> on <strong>{effective ? formatDateLong(effective) : "the selected effective date"}</strong> from the franchise{" "}
            <strong>{oldFrLabel}</strong>.
          </div>
        </div>
      ) : (
      <div style={{ padding: revertSummaryUi ? "24px 24px 20px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {compactLayout && !revertSummaryUi ? (
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
                Current Franchise <span style={{ color: "#000" }}>{oldFrLabel}</span>
              </div>
            </div>
            <div style={{ width: 1, alignSelf: "stretch", background: "#e6e6e7" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 17 }}>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                    <label htmlFor="transfer-effective-date" style={{ fontSize: 14, color: "#272d37" }}>
                      Effective Date of New Franchise
                    </label>
                    <Tooltip title="Start date of the new franchise (MM/DD/YYYY)." enterTouchDelay={0}>
                      <IconButton type="button" size="small" aria-label="More about effective date" sx={{ p: 0.25, color: "#146dff" }}>
                        <InfoOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="MM/DD/YYYY"
                      value={effective ? dayjsFromYmdLocal(effective) : null}
                      minDate={minEffectiveDayjs}
                      onChange={applyEffectiveDayjs}
                      slotProps={{
                        popper: { sx: { zIndex: 2000 } },
                        textField: {
                          id: "transfer-effective-date",
                          size: "small",
                          slotProps: { htmlInput: { autoComplete: "off" as const, placeholder: "MM/DD/YYYY" } },
                          error: efErr,
                          className: `transfer-date-input ${efCls}`,
                          sx: {
                            mt: "6px",
                            width: "100%",
                            "& .MuiOutlinedInput-root": { height: 36, fontFamily: "Inter, var(--fk), sans-serif", fontSize: 14, borderRadius: "4px" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: efCls === "input-ok" && effective ? "#2e964b" : "#ccd1d8" },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                  {efErr && <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>{efMsg}</div>}
                </div>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                    <label htmlFor="transfer-cutoff-date" style={{ fontSize: 14, color: "#272d37" }}>
                      Cut-off Date for Current Franchise
                    </label>
                    <Tooltip title="Filled automatically after you choose an effective date." enterTouchDelay={0}>
                      <IconButton type="button" size="small" aria-label="More about cut-off date" sx={{ p: 0.25, color: "#146dff" }}>
                        <InfoOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <input
                    id="transfer-cutoff-date"
                    type="text"
                    readOnly
                    disabled
                    aria-disabled="true"
                    className={`transfer-date-input transfer-cutoff-date-input--disabled ${coCls}`}
                    value={cutoffYmd ? formatYmdAsMmDdYyyy(cutoffYmd) : ""}
                    placeholder={cutoffYmd ? undefined : "MM/DD/YYYY"}
                    style={{
                      width: "100%",
                      height: 36,
                      marginTop: 6,
                      border: "1px solid #ccd1d8",
                      borderRadius: 4,
                      padding: "0 12px",
                      cursor: "not-allowed",
                      boxSizing: "border-box",
                      fontFamily: "Inter, var(--fk), sans-serif",
                      fontSize: 14,
                      background: "#f5f5f6",
                      color: "#aeaeb2",
                    }}
                  />
                  {coErr && <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>{coMsg}</div>}
                </div>
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
                  checked={transferAllUsers}
                  onChange={(e) => setTransferAllUsers(e.target.checked)}
                  style={{ width: 16, height: 16, margin: 0 }}
                />
                Migrate all users from previous franchise
              </label>
            </div>
          </div>
        ) : null}
        {!revertSummaryUi && !compactLayout ? (
        onboardingAvailablePricingOnly ? (
          <div style={{ width: "100%" }}>
            <label htmlFor="transfer-lot-price-onb-av" style={{ fontSize: 14, color: "#272d37", display: "block" }}>
              Price
            </label>
            <div style={{ display: "flex", alignItems: "stretch", marginTop: 6, maxWidth: 400 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 12px",
                  border: "1px solid #d8dadc",
                  borderRight: "none",
                  borderRadius: "2px 0 0 2px",
                  background: "#f5f5f6",
                  color: "#444446",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  boxSizing: "border-box",
                  height: 40,
                }}
                aria-hidden
              >
                $
              </span>
              <input
                id="transfer-lot-price-onb-av"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0"
                value={priceUsd}
                onChange={(e) => setPriceUsd(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 40,
                  border: "1px solid #d8dadc",
                  borderRadius: "0 2px 2px 0",
                  padding: "0 12px",
                  boxSizing: "border-box",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontSize: 14,
                  color: "#262527",
                }}
              />
            </div>
          </div>
        ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
              <label htmlFor="transfer-effective-date" style={{ fontSize: 14, color: "#272d37" }}>
                Effective Date of New Franchise*
              </label>
              <Tooltip
                title="Start date of the new franchise (MM/DD/YYYY). The cut-off is the previous calendar day (11:59 PM), the last day the current franchise operates this lot."
                enterTouchDelay={0}
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#000",
                      color: "#fff",
                      fontSize: 12,
                      lineHeight: 1.4,
                      maxWidth: 320,
                      p: 1.25,
                    },
                  },
                }}
              >
                <IconButton
                  type="button"
                  size="small"
                  aria-label="More about effective date"
                  sx={{ p: 0.25, color: "#146dff" }}
                >
                  <InfoOutlined sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="MM/DD/YYYY"
                value={effective ? dayjsFromYmdLocal(effective) : null}
                minDate={minEffectiveDayjs}
                onChange={applyEffectiveDayjs}
                slotProps={{
                  popper: { sx: { zIndex: 2000 } },
                  textField: {
                    id: "transfer-effective-date",
                    size: "small",
                    slotProps: {
                      htmlInput: { autoComplete: "off" as const, placeholder: "MM/DD/YYYY" },
                    },
                    error: efErr,
                    className: `transfer-date-input ${efCls}`,
                    sx: {
                      mt: "6px",
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: 40,
                        fontFamily: "Inter, var(--fk), sans-serif",
                        fontSize: 14,
                        borderRadius: "2px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: efCls === "input-ok" && effective ? "#2e964b" : "#d8dadc",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: efCls === "input-error" ? undefined : efCls === "input-ok" && effective ? "#2e964b" : "#d8dadc",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 1,
                        ...(efCls === "input-error"
                          ? {
                              borderColor: "#df372b",
                              boxShadow: "0 0 0 3px rgba(223, 55, 43, 0.08)",
                            }
                          : efCls === "input-ok" && effective
                            ? { borderColor: "#2e964b", boxShadow: "0 0 0 3px rgba(46, 150, 75, 0.12)" }
                            : {
                                borderColor: "#146dff",
                                boxShadow: "0 0 0 3px rgba(20, 109, 255, 0.1)",
                              }),
                      },
                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#df372b",
                      },
                      "& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        boxShadow: "0 0 0 3px rgba(223, 55, 43, 0.08)",
                      },
                      "& .MuiOutlinedInput-input": {
                        "&::placeholder": {
                          color: "#86868b",
                          opacity: 1,
                        },
                      },
                      "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                        width: "20px",
                        height: "20px",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
            {efErr && <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>{efMsg}</div>}
          </div>
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <div className="transfer-cutoff-field-disabled">
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <label htmlFor="transfer-cutoff-date" style={{ fontSize: 14, color: "#86868b" }}>
                  Cut-off Date of Current Franchise*
                </label>
                <Tooltip
                  title="Filled automatically after you choose an effective date: the previous calendar day (MM/DD/YYYY), when the current franchise ends at 11:59 PM."
                  enterTouchDelay={0}
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "#000",
                        color: "#fff",
                        fontSize: 12,
                        lineHeight: 1.4,
                        maxWidth: 320,
                        p: 1.25,
                      },
                    },
                  }}
                >
                  <IconButton
                    type="button"
                    size="small"
                    aria-label="More about cut-off date"
                    sx={{ p: 0.25, color: "#146dff" }}
                  >
                    <InfoOutlined sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </div>
              <input
                id="transfer-cutoff-date"
                type="text"
                readOnly
                disabled
                aria-disabled="true"
                className={`transfer-date-input transfer-cutoff-date-input--disabled ${coCls}`}
                value={cutoffYmd ? formatYmdAsMmDdYyyy(cutoffYmd) : ""}
                placeholder={cutoffYmd ? undefined : "MM/DD/YYYY"}
                style={{
                  width: "100%",
                  height: 40,
                  marginTop: 6,
                  border: "1px solid #d8dadc",
                  borderRadius: 2,
                  padding: "0 12px",
                  cursor: "not-allowed",
                  boxSizing: "border-box",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontSize: 14,
                }}
              />
              {coErr && <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>{coMsg}</div>}
            </div>
          </div>
          <div style={{ width: "100%", marginTop: 4 }}>
            <label htmlFor="transfer-lot-price" style={{ fontSize: 14, color: "#272d37", display: "block" }}>
              Price
            </label>
            <div style={{ display: "flex", alignItems: "stretch", marginTop: 6, maxWidth: 400 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 12px",
                  border: "1px solid #d8dadc",
                  borderRight: "none",
                  borderRadius: "2px 0 0 2px",
                  background: "#f5f5f6",
                  color: "#444446",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  boxSizing: "border-box",
                  height: 40,
                }}
                aria-hidden
              >
                $
              </span>
              <input
                id="transfer-lot-price"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0"
                value={priceUsd}
                onChange={(e) => setPriceUsd(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 40,
                  border: "1px solid #d8dadc",
                  borderRadius: "0 2px 2px 0",
                  padding: "0 12px",
                  boxSizing: "border-box",
                  fontFamily: "Inter, var(--fk), sans-serif",
                  fontSize: 14,
                  color: "#262527",
                }}
              />
            </div>
          </div>
        </div>
        )
        ) : null}

        {!revertSummaryUi && !compactLayout && !onboardingAvailablePricingOnly ? (
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            cursor: "pointer",
            margin: 0,
            fontSize: 14,
            color: "#272d37",
            lineHeight: 1.4,
          }}
        >
          <input
            type="checkbox"
            checked={transferAllUsers}
            onChange={(e) => setTransferAllUsers(e.target.checked)}
            style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#0032a0" }}
          />
          <span>Migrate all users from the previous franchise to the new one</span>
        </label>
        ) : null}

        {showTimelineSection && !compactLayout && !onboardingAvailablePricingOnly ? (
          <div
            aria-label="Transfer timeline"
            style={{
              background: "#f5f5f6",
              border: "1px solid #e6e6e7",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "stretch", justifyContent: "flex-start", gap: 8 }}>
              <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, minHeight: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#7d899b", flexShrink: 0 }} aria-hidden />
                  <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>Current franchise</div>
                </div>
                <div style={{ color: "#444446", fontSize: 13, fontWeight: 600, lineHeight: "18px" }}>{oldFrLabel}</div>
              </div>

              <div style={{ width: 64, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 9 }} aria-hidden>
                <div style={{ width: "100%", height: 0, borderTop: "2px solid #d8dadc" }} />
              </div>

              <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingLeft: 20, minHeight: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f4780b", flexShrink: 0 }} aria-hidden />
                  <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>Cut-off</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 2 }}>
                  <div style={{ color: "#444446", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {oldFrLabel}
                  </div>
                  <div style={{ color: "#546176", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {cutoffTimelineLine}
                  </div>
                </div>
              </div>

              <div style={{ width: 64, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 9 }} aria-hidden>
                <div style={{ width: "100%", height: 0, borderTop: "2px dotted #d8dadc" }} />
              </div>

              <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingLeft: 20, minHeight: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#146dff", flexShrink: 0 }} aria-hidden />
                  <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>New franchise</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 2 }}>
                  <div style={{ color: "#0032a0", fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {newFrLabel}
                  </div>
                  <div style={{ color: "#546176", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{effectiveTimelineLine}</div>
                </div>
              </div>
            </div>
            <div
              role="status"
              style={{
                background: "unset",
                border: "none",
                borderTop: "1px solid #e6e6e7",
                borderRadius: 4,
                padding: "12px 0 0 0",
                fontSize: 13,
                color: "#444446",
                lineHeight: 1.5,
              }}
            >
              After <strong>11:59 PM</strong> on {formatDateLong(cutoffForTimeline)} this lot will transition to <strong>{newFrLabel}</strong>. The new franchise is effective at <strong>12:00 AM</strong> on{" "}
              {formatDateLong(effectiveForTimeline)}.
            </div>
          </div>
        ) : null}
      </div>
      )}

      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          borderTop: "1px solid #e6e6e7",
          background: compactLayout ? "#f9fafb" : "#fff",
        }}
      >
        <div>
          {showRevertCta && !showRevertConfirmModal ? (
            <button
              type="button"
              onClick={() => setShowRevertConfirmModal(true)}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                fontFamily: "Inter, var(--fk), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#b32318",
              }}
            >
              Revert Decision
            </button>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={showRevertConfirmModal ? () => setShowRevertConfirmModal(false) : onClose}
            style={{
              border: compactLayout ? "1px solid #d1d5dc" : "1px solid #e6e6e7",
              borderRadius: compactLayout ? 4 : 8,
              padding: "8px 18px",
              background: "#fff",
              cursor: "pointer",
              fontFamily: "Inter, var(--fk), sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: compactLayout ? "#364153" : "#272d37",
            }}
          >
            {showRevertConfirmModal ? "Back" : revertSummaryUi ? "Edit" : "Cancel"}
          </button>
          <button
            type="button"
            disabled={showRevertConfirmModal ? !effective : !formConfirmValid}
            onClick={() => {
              const priceOut =
                revertSummaryUi || parsedPrice == null || !Number.isFinite(parsedPrice)
                  ? undefined
                  : String(parsedPrice);
              onConfirm(
                revertSummaryUi
                  ? NB002_REVERT_SUMMARY_EFFECTIVE_YMD
                  : onboardingAvailablePricingOnly
                    ? ""
                    : effective,
                revertSummaryUi ? false : onboardingAvailablePricingOnly ? false : transferAllUsers,
                priceOut,
              );
            }}
            style={{
              border: `1px solid ${
                showRevertConfirmModal
                  ? effective
                    ? "#b32318"
                    : "#9ca3af"
                  : revertSummaryUi
                    ? formConfirmValid
                      ? "#b32318"
                      : "#9ca3af"
                    : formConfirmValid
                      ? "#0032a0"
                      : "#9ca3af"
              }`,
              borderRadius: compactLayout ? 4 : 8,
              background: showRevertConfirmModal
                ? effective
                  ? "#b32318"
                  : "#9ca3af"
                : revertSummaryUi
                  ? formConfirmValid
                    ? "#b32318"
                    : "#9ca3af"
                  : formConfirmValid
                    ? "#0032a0"
                    : "#9ca3af",
              color: "#fff",
              padding: "8px 20px",
              cursor: (showRevertConfirmModal ? !!effective : formConfirmValid) ? "pointer" : "not-allowed",
              opacity: (showRevertConfirmModal ? !!effective : formConfirmValid) ? 1 : 0.5,
            }}
          >
            {showRevertConfirmModal ? "Revert Decision" : revertSummaryUi ? "Revert decision" : confirmLabel ?? "Confirm Transfer"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export function TransferModal({ onClose, lotIndex, newFranchiseName, newFranchiseId, onConfirm }: Props) {
  useEffect(() => {
    const onK = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onK);
    return () => document.removeEventListener("keydown", onK);
  }, [onClose]);

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.6)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        style={{ background: "#fff", borderRadius: 8, width: 610, maxWidth: "96vw", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", fontFamily: "Inter, var(--fk), sans-serif" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
      >
        <TransferLotOwnershipPanel
          key={`tm-${lotIndex}`}
          onClose={onClose}
          lotIndex={lotIndex}
          newFranchiseName={newFranchiseName}
          newFranchiseId={newFranchiseId}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
}
