"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

interface SubHeaderProps {
  dealName?: string;
  dealPath?: string;
}

export function SubHeader({
  dealName = "Andre Martin - IL-033, 038, 039",
  dealPath = "Deal Onboarding",
}: SubHeaderProps) {
  return (
    <div className="flex items-center bg-white border-b border-gray-200 px-4 py-2 shrink-0">
      {/* Left: Logo + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Signal Logo */}
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#FF6B00" />
              <path
                d="M14 20 C14 16, 18 12, 22 14 C26 16, 28 14, 28 10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M12 26 C12 22, 17 17, 22 19 C27 21, 30 18, 30 13"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-orange-500 font-bold text-sm hidden sm:inline">Signal</span>
        </div>

        <div className="text-gray-300 text-lg font-light">|</div>

        {/* Icon */}
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
          <ShoppingBag size={15} className="text-gray-600" />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-700 font-medium">{dealPath}</span>
          <span className="text-gray-400">//</span>
          <span className="text-gray-600">{dealName}</span>
        </div>
      </div>
    </div>
  );
}
