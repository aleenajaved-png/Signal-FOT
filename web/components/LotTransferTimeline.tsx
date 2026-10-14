import type { CSSProperties } from "react";

const US_MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function formatDateLong(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return ymd;
  return `${US_MONTH_SHORT[m - 1]} ${d}, ${y}`;
}

export type LotTransferTimelineProps = {
  currentFranchiseLabel: string;
  newFranchiseLabel: string;
  cutoffYmd: string;
  effectiveYmd: string;
  style?: CSSProperties;
};

export function LotTransferTimeline({
  currentFranchiseLabel,
  newFranchiseLabel,
  cutoffYmd,
  effectiveYmd,
  style,
}: LotTransferTimelineProps) {
  const cutoffLine = formatDateLong(cutoffYmd);
  const effectiveLine = `Effective ${formatDateLong(effectiveYmd)} (00:00)`;

  return (
    <div
      aria-label="Transfer timeline"
      style={{
        marginTop: 12,
        ...style,
        background: "#f5f5f6",
        border: "1px solid #e6e6e7",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "#444446",
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "flex-start", gap: 8 }}>
        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, minHeight: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#7d899b", flexShrink: 0 }} aria-hidden />
            <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>
              Current franchise
            </div>
          </div>
          <div style={{ color: "#444446", fontSize: 13, fontWeight: 600, lineHeight: "18px" }}>{currentFranchiseLabel}</div>
        </div>

        <div style={{ width: 48, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 9 }} aria-hidden>
          <div style={{ width: "100%", height: 0, borderTop: "2px solid #d8dadc" }} />
        </div>

        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingLeft: 12, minHeight: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f4780b", flexShrink: 0 }} aria-hidden />
            <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>Cut-off</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 2 }}>
            <div style={{ color: "#444446", fontSize: 13, fontWeight: 600, lineHeight: "18px" }}>{currentFranchiseLabel}</div>
            <div style={{ color: "#546176", fontSize: 12 }}>{cutoffLine}</div>
          </div>
        </div>

        <div style={{ width: 48, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 9 }} aria-hidden>
          <div style={{ width: "100%", height: 0, borderTop: "2px dotted #d8dadc" }} />
        </div>

        <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingLeft: 12, minHeight: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 20 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#146dff", flexShrink: 0 }} aria-hidden />
            <div style={{ color: "#86868b", textTransform: "uppercase", fontSize: 10, letterSpacing: 0.4, lineHeight: "14px" }}>
              New franchise
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 2 }}>
            <div style={{ color: "#0032a0", fontWeight: 700, fontSize: 13, lineHeight: "18px" }}>{newFranchiseLabel}</div>
            <div style={{ color: "#546176", fontSize: 12 }}>{effectiveLine}</div>
          </div>
        </div>
      </div>

      <div
        role="status"
        style={{
          borderTop: "1px solid #e6e6e7",
          paddingTop: 12,
          fontSize: 13,
          color: "#444446",
          lineHeight: 1.5,
        }}
      >
        After <strong>11:59 PM</strong> on {formatDateLong(cutoffYmd)} this lot will transition to{" "}
        <strong>{newFranchiseLabel}</strong>. The new franchise is effective at <strong>12:00 AM</strong> on{" "}
        {formatDateLong(effectiveYmd)}.
      </div>
    </div>
  );
}
