"use client";

import CloseOutlined from "@mui/icons-material/CloseOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { TimezoneMismatchTimeline } from "@/components/TimezoneMismatchTimeline";
import { DEFAULT_NEW_FRANCHISE_TIMEZONE_LABEL } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";

type TimeZoneMismatchModalProps = {
  mismatchedLotNos: string[];
  franchiseNameLabel: string;
  franchiseTimezoneLabel?: string;
  onClose: () => void;
};

export function TimeZoneMismatchModal({
  mismatchedLotNos,
  franchiseNameLabel,
  franchiseTimezoneLabel = DEFAULT_NEW_FRANCHISE_TIMEZONE_LABEL,
  onClose,
}: TimeZoneMismatchModalProps) {
  const lotList = mismatchedLotNos.join(", ");

  return (
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(0,0,0,0.45)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="alertdialog"
        aria-modal
        aria-labelledby="timezone-mismatch-title"
        aria-describedby="timezone-mismatch-desc"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          background: "#fff",
          borderRadius: 8,
          padding: "24px 24px 20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          fontFamily: "var(--inter), var(--fk), sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            border: "none",
            background: "transparent",
            padding: 4,
            cursor: "pointer",
            lineHeight: 0,
          }}
        >
          <CloseOutlined sx={oIcon(18, { color: "#86868b" })} aria-hidden />
        </button>

        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fff7ed",
            border: "1px solid #ffedd5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <WarningAmberOutlined sx={oIcon(26, { color: "#ea580c" })} aria-hidden />
        </div>

        <h2
          id="timezone-mismatch-title"
          style={{ margin: 0, fontSize: 18, lineHeight: "24px", fontWeight: 600, color: "#101828" }}
        >
          Time zone mismatch
        </h2>
        <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: "20px", color: "#475467" }}>
          The time zone for lots <strong style={{ fontWeight: 600, color: "#101828" }}>{lotList}</strong> does not
          match the franchise time zone selected in Franchise Information.
        </p>

        <TimezoneMismatchTimeline
          id="timezone-mismatch-desc"
          franchiseNameLabel={franchiseNameLabel}
          franchiseTimezoneLabel={franchiseTimezoneLabel}
          mismatchedLotNos={mismatchedLotNos}
          style={{ marginTop: 16 }}
        />

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #e6e6e7",
              borderRadius: 6,
              background: "#fff",
              padding: "8px 14px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "20px",
              color: "#444446",
              whiteSpace: "nowrap",
            }}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
