"use client";

import BlockOutlined from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import type { FranchiseStatus } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";

const sm = 12;

export function DetailStatusPill({ status }: { status: FranchiseStatus }) {
  if (status === "nonfunc") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fef0c7", borderRadius: 16, padding: "2px 8px 2px 6px" }}>
        <BlockOutlined sx={oIcon(sm, { color: "#f4780b" })} aria-hidden />
        <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 12, color: "#f4780b", lineHeight: "18px", whiteSpace: "nowrap" }}>
          Non-Functional
        </span>
      </div>
    );
  }
  if (status === "attention") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fbeeed", borderRadius: 16, padding: "2px 8px 2px 6px" }}>
        <ErrorOutlineOutlined sx={oIcon(sm, { color: "#b32318" })} aria-hidden />
        <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 12, color: "#b32318", lineHeight: "18px" }}>Requires Attention</span>
      </div>
    );
  }
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#eff8ef", borderRadius: 16, padding: "2px 8px 2px 6px" }}>
      <CheckCircleOutlineOutlined sx={oIcon(sm, { color: "#2e964b" })} aria-hidden />
      <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 12, color: "#2e964b", lineHeight: "18px" }}>Functional</span>
    </div>
  );
}
