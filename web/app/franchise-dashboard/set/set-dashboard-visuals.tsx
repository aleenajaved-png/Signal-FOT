"use client";

import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import LinkOutlined from "@mui/icons-material/LinkOutlined";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";
import { oIcon } from "@/lib/muiIconSx";

/** 1px horizontal rule — replaces expired Figma line assets */
export function HLine({ className = "" }: { className?: string }) {
  return <div className={`h-px min-h-px w-full bg-[#e6e6e7] ${className}`} aria-hidden />;
}

/** Vertical divider */
export function VLine({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`w-px min-w-px bg-[#e6e6e7] ${className}`} style={style} aria-hidden />;
}

export function MetricDot({ className = "" }: { className?: string }) {
  return <span className={`inline-block size-[3px] shrink-0 rounded-full bg-[#86868b] ${className}`} aria-hidden />;
}

export function ProfileAvatar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-[#146dff] to-[#0032a0] ${className || "size-8"}`}
      role="img"
      aria-hidden
    />
  );
}

export function CalendarIcon({ size = 16 }: { size?: number }) {
  return <CalendarTodayOutlined sx={oIcon(size, { color: "#5b5b5f" })} aria-hidden />;
}

export function ChevronDownIcon({ size = 16, color = "#5b5b5f" }: { size?: number; color?: string }) {
  return <KeyboardArrowDownOutlined sx={oIcon(size, { color })} aria-hidden />;
}

export function ChevronRightIcon({ size = 16, color = "#146dff" }: { size?: number; color?: string }) {
  return <ChevronRightOutlined sx={oIcon(size, { color })} aria-hidden />;
}

export function LinkLotIcon({ size = 17.5 }: { size?: number }) {
  return <LinkOutlined sx={oIcon(size, { color: "#fff" })} aria-hidden />;
}

export function ExpandIcon({ size = 16 }: { size?: number }) {
  return <OpenInNewOutlined sx={oIcon(size, { color: "#86868b" })} aria-hidden />;
}

/** Donut chart using conic-gradient */
export function DonutChart({
  percent,
  className = "",
  size = 120,
  color = "#146dff",
}: {
  percent: number;
  className?: string;
  size?: number;
  color?: string;
}) {
  const p = Math.min(100, Math.max(0, percent));
  return (
    <div
      className={`shrink-0 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} 0 ${p}%, #e6e6e7 ${p}% 100%)`,
        WebkitMask: "radial-gradient(farthest-side, transparent 58%, black 60%)",
        mask: "radial-gradient(farthest-side, transparent 58%, black 60%)",
      }}
      role="img"
      aria-label={`${p}%`}
    />
  );
}

/** Visits / location pie chart */
export function VisitsPieChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className || "size-full"} aria-hidden>
      <circle cx="70" cy="70" r="60" fill="#e6e6e7" />
      <path d="M70 70 L70 10 A60 60 0 0 1 125 45 Z" fill="#146dff" />
      <path d="M70 70 L125 45 A60 60 0 0 1 95 125 Z" fill="#31a150" />
      <path d="M70 70 L95 125 A60 60 0 0 1 15 70 Z" fill="#ff9332" />
      <path d="M70 70 L15 70 A60 60 0 0 1 70 10 Z" fill="#e43f32" />
    </svg>
  );
}

/** Contract-signed donut (multi-segment) */
export function ContractDonutChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 130" className={className || "size-full"} aria-hidden>
      <circle cx="65" cy="65" r="52" fill="none" stroke="#e6e6e7" strokeWidth="18" />
      <circle
        cx="65"
        cy="65"
        r="52"
        fill="none"
        stroke="#146dff"
        strokeWidth="18"
        strokeDasharray="98 228"
        strokeDashoffset="0"
        transform="rotate(-90 65 65)"
      />
      <circle
        cx="65"
        cy="65"
        r="52"
        fill="none"
        stroke="#ff9332"
        strokeWidth="18"
        strokeDasharray="65 261"
        strokeDashoffset="-98"
        transform="rotate(-90 65 65)"
      />
      <circle
        cx="65"
        cy="65"
        r="52"
        fill="none"
        stroke="#31a150"
        strokeWidth="18"
        strokeDasharray="82 244"
        strokeDashoffset="-163"
        transform="rotate(-90 65 65)"
      />
    </svg>
  );
}

/** Royalty / contracts area chart */
export function RoyaltyAreaChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 778 126" preserveAspectRatio="none" className={className || "size-full"} aria-hidden>
      <defs>
        <linearGradient id="royaltyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#146dff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#146dff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={i * 31.5} x2="778" y2={i * 31.5} stroke="#e6e6e7" strokeWidth="1" />
      ))}
      <path
        d="M0 100 L71 88 L142 72 L213 80 L284 55 L355 62 L426 48 L497 58 L568 40 L639 52 L710 35 L778 42 L778 126 L0 126 Z"
        fill="url(#royaltyFill)"
      />
      <path
        d="M0 100 L71 88 L142 72 L213 80 L284 55 L355 62 L426 48 L497 58 L568 40 L639 52 L710 35 L778 42"
        fill="none"
        stroke="#146dff"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Sales bar chart grid background */
export function SalesChartGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`size-full ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, #e6e6e7 1px, transparent 1px), linear-gradient(to bottom, #e6e6e7 1px, transparent 1px)",
        backgroundSize: "80px 56px",
      }}
      aria-hidden
    />
  );
}

/** Horizontal stacked bar row for sales insights */
export function SalesBarRow({ widthPct }: { widthPct: number }) {
  return (
    <div className="h-7 w-full overflow-hidden rounded-[10px] bg-[#f5f5f6]">
      <div className="flex h-full items-stretch">
        <div className="h-full bg-[#e43f32]" style={{ width: `${widthPct * 0.08}%` }} />
        <div
          className="h-full"
          style={{
            width: `${widthPct * 0.12}%`,
            background: "repeating-linear-gradient(90deg, #ff9332, #ff9332 4px, #ffb366 4px, #ffb366 8px)",
          }}
        />
        <div
          className="h-full"
          style={{
            width: `${widthPct * 0.1}%`,
            background: "repeating-linear-gradient(90deg, #31a150, #31a150 4px, #5bc474 4px, #5bc474 8px)",
          }}
        />
        <div className="h-full flex-1 rounded-br-lg rounded-tr-lg bg-[#146dff]" />
      </div>
    </div>
  );
}

/** Small KPI donut near contract signed */
export function KpiDonut({ className = "" }: { className?: string }) {
  return <DonutChart percent={62} size={110} color="#146dff" className={className} />;
}
