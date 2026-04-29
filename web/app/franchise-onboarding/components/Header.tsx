"use client";

import React from "react";
import { Share2, Download, Settings, HelpCircle, Grid3X3, ChevronDown, Info } from "lucide-react";

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
          <Grid3X3 size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">Power Apps</span>
          <span className="text-purple-300">|</span>
          <span className="text-white text-sm">Franchise Onboarding HO</span>
        </div>
        <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
          <Info size={15} className="text-purple-200" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded text-sm transition-colors border border-white/20">
          <Share2 size={14} />
          <span>Share</span>
          <ChevronDown size={12} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Fit to screen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Download">
          <Download size={18} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Settings">
          <Settings size={18} />
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Help">
          <HelpCircle size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold ml-1 cursor-pointer hover:bg-orange-600 transition-colors">
          SN
        </div>
      </div>
    </header>
  );
}
