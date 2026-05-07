"use client";

import React from "react";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

interface SubHeaderProps {
  dealName?: string;
  dealPath?: string;
}

export function SubHeader({
  dealName = "0205 - Omaha, NE",
  dealPath = "Deal Onboarding",
}: SubHeaderProps) {
  return (
    <div className="flex items-center bg-white border-b border-gray-200 px-4 py-2 shrink-0">
      {/* Left: Logo + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Signal Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/signal-logo.svg"
          alt="Signal"
          style={{ height: 29, width: 90, objectFit: "contain" }}
        />

        <div className="text-gray-300 text-lg font-light">|</div>

        {/* Icon */}
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
          <ShoppingBagOutlined sx={{ fontSize: 16 }} className="text-gray-600" />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-700 font-medium">{dealPath}</span>
          <span className="text-gray-400">{"//"}</span>
          <span className="text-gray-600">{dealName}</span>
        </div>
      </div>
    </div>
  );
}
