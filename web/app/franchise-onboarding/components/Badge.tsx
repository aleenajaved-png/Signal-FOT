"use client";

import React from "react";

interface BadgeProps {
  label: string;
  variant?: "compliance" | "not-started" | "in-progress" | "completed" | "default";
  className?: string;
}

export function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  const variantClasses = {
    compliance: "bg-blue-100 text-blue-700 border border-blue-200",
    "not-started": "bg-gray-100 text-gray-600 border border-gray-200",
    "in-progress": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    completed: "bg-green-100 text-green-700 border border-green-200",
    default: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
