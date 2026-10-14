import type { CSSProperties } from "react";
import { LOT_MARKET_TIMEZONE_LABEL } from "@/lib/data";

export type TimezoneMismatchTimelineProps = {
  id?: string;
  franchiseNameLabel: string;
  franchiseTimezoneLabel: string;
  mismatchedLotNos: string[];
  style?: CSSProperties;
};

const cellPad = "10px 12px";

/** Gray card — franchise vs lot time zones in a table (timezone mismatch modal). */
export function TimezoneMismatchTimeline({
  id,
  franchiseNameLabel,
  franchiseTimezoneLabel,
  mismatchedLotNos,
  style,
}: TimezoneMismatchTimelineProps) {
  return (
    <div
      id={id}
      aria-label="Time zone comparison"
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
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            lineHeight: "20px",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th
                scope="col"
                style={{
                  padding: cellPad,
                  fontWeight: 500,
                  color: "#414c5c",
                  fontSize: 12,
                  borderBottom: "1px solid #e6e6e7",
                }}
              >
                Franchise/Lot
              </th>
              <th
                scope="col"
                style={{
                  padding: cellPad,
                  fontWeight: 500,
                  color: "#414c5c",
                  fontSize: 12,
                  borderBottom: "1px solid #e6e6e7",
                }}
              >
                Time zone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e6e6e7" }}>
              <td style={{ padding: cellPad, color: "#444446", verticalAlign: "top" }}>
                {franchiseNameLabel}
              </td>
              <td style={{ padding: cellPad, fontWeight: 600, color: "#101828", verticalAlign: "top" }}>
                {franchiseTimezoneLabel}
              </td>
            </tr>
            {mismatchedLotNos.map((no) => (
              <tr key={no} style={{ borderBottom: "1px solid #e6e6e7" }}>
                <td style={{ padding: cellPad, color: "#444446", verticalAlign: "top" }}>
                  {no}
                </td>
                <td style={{ padding: cellPad, fontWeight: 600, color: "#101828", verticalAlign: "top" }}>
                  {LOT_MARKET_TIMEZONE_LABEL[no] ?? "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        role="status"
        style={{
          fontSize: 13,
          color: "#546176",
          lineHeight: 1.5,
        }}
      >
        Remove the affected lots from the onboarding deal, or update the franchise time zone in Franchise
        Information to match the market time zone before continuing.
      </div>
    </div>
  );
}
