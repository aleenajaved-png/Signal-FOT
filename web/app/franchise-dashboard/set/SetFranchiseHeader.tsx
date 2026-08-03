"use client";

import AppsOutlined from "@mui/icons-material/AppsOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import { oIcon } from "@/lib/muiIconSx";

type Props = {
  className?: string;
};

export function SetFranchiseHeader({ className = "" }: Props) {
  return (
    <header
      className={
        `flex h-[50px] shrink-0 items-center gap-3.5 border-b border-[#e6e6e7] bg-white px-4 py-3 sm:px-8 ${className}`
      }
      data-name="header"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded bg-[#f5f5f6]">
          <AppsOutlined sx={oIcon(14, { color: "#262527" })} aria-hidden />
        </span>
        <p className="truncate text-sm font-bold text-[#262527]">Dashboard</p>
      </div>

      <button
        type="button"
        className="hidden items-center gap-2 rounded-lg border border-[#e6e6e7] px-3.5 py-2 text-sm font-medium text-[#444446] sm:flex"
      >
        United States
        <KeyboardArrowDownOutlined sx={oIcon(20, { color: "#444446" })} aria-hidden />
      </button>

      <div className="flex shrink-0 items-center gap-4">
        <button type="button" className="flex size-9 items-center justify-center rounded-lg hover:bg-[#f5f5f6]" aria-label="Notifications">
          <NotificationsOutlined sx={oIcon(20, { color: "#444446" })} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="size-8 shrink-0 rounded-full bg-gradient-to-br from-[#146dff] to-[#0032a0]"
            role="img"
            aria-label="Jeff Zolos"
          />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-medium text-[#444446]">Jeff Zolos</p>
            <p className="truncate text-xs text-[#86868b]">BD Executive</p>
          </div>
          <KeyboardArrowDownOutlined sx={oIcon(14, { color: "#86868b" })} className="hidden sm:block" aria-hidden />
        </div>
      </div>
    </header>
  );
}
