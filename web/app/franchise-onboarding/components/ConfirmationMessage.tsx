"use client";

import React from "react";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

interface ConfirmationMessageProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  onClose?: () => void;
  show?: boolean;
}

export function ConfirmationMessage({
  type,
  title,
  message,
  onClose,
  show = true,
}: ConfirmationMessageProps) {
  if (!show) return null;

  const config = {
    success: {
      icon: <CheckCircleOutlineOutlined sx={{ fontSize: 20 }} />,
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-500",
      titleColor: "text-green-800",
      textColor: "text-green-700",
    },
    error: {
      icon: <HighlightOffOutlined sx={{ fontSize: 20 }} />,
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-500",
      titleColor: "text-red-800",
      textColor: "text-red-700",
    },
    warning: {
      icon: <WarningAmberOutlined sx={{ fontSize: 20 }} />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconColor: "text-yellow-500",
      titleColor: "text-yellow-800",
      textColor: "text-yellow-700",
    },
    info: {
      icon: <InfoOutlined sx={{ fontSize: 20 }} />,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-500",
      titleColor: "text-blue-800",
      textColor: "text-blue-700",
    },
  };

  const c = config[type];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${c.bg} ${c.border}`}>
      <span className={`shrink-0 mt-0.5 ${c.iconColor}`}>{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${c.titleColor}`}>{title}</p>
        {message && <p className={`text-xs mt-0.5 ${c.textColor}`}>{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`shrink-0 ${c.iconColor} hover:opacity-70 transition-opacity`}
          aria-label="Dismiss"
        >
          <CloseOutlined sx={{ fontSize: 16 }} />
        </button>
      )}
    </div>
  );
}
