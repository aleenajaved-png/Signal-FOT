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

/** Add whole days to a YMD (local). */
function addDaysYmd(ymd: string, days: number): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const t = new Date(y, m - 1, d + days, 12, 0, 0, 0);
  return toYmd(t);
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

function formatDateLong(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d, 12, 0, 0, 0).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Props = {
  onClose: () => void;
  lotIndex: number;
  newFranchiseName: string;
  onConfirm: (effectiveYmd: string, transferAllUsers: boolean) => void;
};

type PanelProps = Props & {
  showBack?: boolean;
  onBack?: () => void;
};

export function TransferLotOwnershipPanel({
  onClose,
  lotIndex,
  newFranchiseName,
  onConfirm,
  showBack = false,
  onBack,
}: PanelProps) {
  const lot: LotForModal | undefined = LOTS_FOR_MODAL[lotIndex];
  const oldFr = useMemo(() => {
    if (!lot) return { id: "0502", name: "New Jersey", owner: "Matt Quinn" };
    return OLD_FRANCHISE_MAP[lot.no] ?? { id: "0502", name: "New Jersey", owner: "Matt Quinn" };
  }, [lot]);

  const [minCutYmd] = useState(computeMinCutoffYmd);
  const [effective, setEffective] = useState("");
  const [transferAllUsers, setTransferAllUsers] = useState(false);

  const minEffectiveYmd = useMemo(() => addDaysYmd(minCutYmd, 1), [minCutYmd]);
  const minEffectiveDayjs = useMemo(() => dayjs(minEffectiveYmd), [minEffectiveYmd]);

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
    const ymd = v.format("YYYY-MM-DD");
    setEffective(ymd);
  };

  if (!lot) return null;

  const oldFrLabel = `${oldFr.id ? `${oldFr.id} - ` : ""}${oldFr.name}`;

  return (
    <div style={{ minHeight: 0, display: "flex", flexDirection: "column", flex: 1, fontFamily: "var(--fk), sans-serif" }}>
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
            <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 16, color: "#272d37" }}>Transfer Lot Ownership</span>
            <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 12, color: "#86868b" }}>This lot is already assigned to another franchise</span>
          </div>
        </div>
        <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Close">
          <CloseOutlined sx={oIcon(12, { color: "#444446" })} aria-hidden />
        </button>
      </div>

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
                lot.status === "sold"
                  ? "lot-badge-sold"
                  : lot.status === "available"
                    ? "lot-badge-available"
                    : "lot-badge-pending"
              }
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {lot.status === "sold" ? "Sold" : lot.status === "available" ? "Available" : "Pending"}
              </span>
            </span>
          </div>
        </div>
        <div style={{ width: 1, height: 32, background: "#e6e6e7" }} />
        <div style={{ flex: 2 }}>
          <div style={{ fontSize: 12, color: "#86868b" }}>Current Franchise</div>
          <div style={{ fontSize: 14, color: "#262527" }}>
            {oldFr.id ? `${oldFr.id} - ${oldFr.name} - ${oldFr.owner}` : `${oldFr.name} - ${oldFr.owner}`}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
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
                value={effective ? dayjs(effective) : null}
                minDate={minEffectiveDayjs}
                onChange={applyEffectiveDayjs}
                slotProps={{
                  popper: { sx: { zIndex: 2000 } },
                  textField: {
                    id: "transfer-effective-date",
                    size: "small",
                    placeholder: "MM/DD/YYYY",
                    slotProps: {
                      htmlInput: { autoComplete: "off" as const },
                    },
                    error: efErr,
                    className: `transfer-date-input ${efCls}`,
                    sx: {
                      mt: "6px",
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: 40,
                        fontFamily: "var(--fk), sans-serif",
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
                  fontFamily: "var(--fk), sans-serif",
                  fontSize: 14,
                }}
              />
              {coErr && <div style={{ fontSize: 12, color: "#df372b", marginTop: 4 }}>{coMsg}</div>}
            </div>
          </div>
        </div>

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
          <span>Transfer all the users from the previous franchise to the new franchise</span>
        </label>

        {showTimeline && (
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
                    {formatDateLong(cutoffYmd)} (11:59 PM)
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
                    {newFranchiseName}
                  </div>
                  <div style={{ color: "#546176", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Effective {formatDateLong(effective)} (12:00 AM)</div>
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
              After <strong>11:59 PM</strong> on {formatDateLong(cutoffYmd)}, all ongoing shifts will be split and will transition to <strong>{newFranchiseName}</strong>. The new franchise is effective at <strong>12:00 AM</strong> on {formatDateLong(effective)}.
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-end", gap: 8, borderTop: "1px solid #e6e6e7" }}>
        <button type="button" onClick={onClose} style={{ border: "1px solid #e6e6e7", borderRadius: 8, padding: "8px 14px", background: "#fff", cursor: "pointer" }}>
          Cancel
        </button>
        <button
          type="button"
          disabled={!valid}
          onClick={() => onConfirm(effective, transferAllUsers)}
          style={{
            border: "1px solid #0032a0",
            borderRadius: 2,
            background: valid ? "#0032a0" : "#9ca3af",
            color: "#fff",
            padding: "8px 20px",
            cursor: valid ? "pointer" : "not-allowed",
            opacity: valid ? 1 : 0.5,
          }}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  );
}

export function TransferModal({ onClose, lotIndex, newFranchiseName, onConfirm }: Props) {
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
        style={{ background: "#fff", borderRadius: 8, width: 610, maxWidth: "96vw", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", fontFamily: "var(--fk), sans-serif" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
      >
        <TransferLotOwnershipPanel onClose={onClose} lotIndex={lotIndex} newFranchiseName={newFranchiseName} onConfirm={onConfirm} />
      </div>
    </div>
  );
}
