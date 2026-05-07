"use client";

import React from "react";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import AppsOutlined from "@mui/icons-material/AppsOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import OpenInFullOutlined from "@mui/icons-material/OpenInFullOutlined";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[#6B2D8B] px-4 py-2 text-white shrink-0 z-50">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <AppsOutlined sx={{ fontSize: 18 }} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">Power Apps</span>
          <span className="text-purple-300">|</span>
          <span className="text-white text-sm">Franchise Onboarding HO</span>
        </div>
        <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
          <InfoOutlined sx={{ fontSize: 15 }} className="text-purple-200" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded text-sm transition-colors border border-white/20">
          <ShareOutlined sx={{ fontSize: 14 }} />
          <span>Share</span>
          <KeyboardArrowDownOutlined sx={{ fontSize: 14 }} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Fit to screen">
          <OpenInFullOutlined sx={{ fontSize: 18 }} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Download">
          <DownloadOutlined sx={{ fontSize: 18 }} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Settings">
          <SettingsOutlined sx={{ fontSize: 18 }} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Help">
          <HelpOutlineOutlined sx={{ fontSize: 18 }} />
        </button>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold ml-1 cursor-pointer hover:bg-orange-600 transition-colors">
          SN
        </div>
      </div>
    </header>
  );
}
