"use client";

import AdjustOutlined from "@mui/icons-material/AdjustOutlined";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import type { ListStatus } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";

const sm = 12;

export function TableStatusBadge({ status }: { status: ListStatus }) {
  if (status === "nonfunc") {
    return (
      <span className="badge badge-nf">
        <AdjustOutlined sx={oIcon(sm)} className="badge-mui" />
        <span className="badge-label">Non-Functional</span>
      </span>
    );
  }
  if (status === "attention") {
    return (
      <span className="badge badge-ra">
        <ErrorOutlineOutlined sx={oIcon(sm)} className="badge-mui" />
        <span className="badge-label">Requires Attention</span>
      </span>
    );
  }
  return (
    <span className="badge badge-fn">
      <CheckCircleOutlineOutlined sx={oIcon(sm)} className="badge-mui" />
      <span className="badge-label">Functional</span>
    </span>
  );
}
