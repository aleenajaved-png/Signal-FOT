"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface DropdownFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export function DropdownField({
  placeholder,
  value,
  onChange,
  options = [],
  disabled = false,
  className = "",
  error,
  label,
  required,
}: DropdownFieldProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label className="text-xs text-gray-600 font-medium">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-md outline-none appearance-none transition-colors cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed ${
            value ? "text-gray-700" : "text-gray-400"
          } ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200"
              : "border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          }`}
        >
          <option value="" disabled>
            {required && !label ? `${placeholder} *` : placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-gray-700">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 text-gray-400 pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
