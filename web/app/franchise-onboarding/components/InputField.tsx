"use client";

import React from "react";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export function InputField({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  disabled = false,
  className = "",
  error,
  label,
  required,
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && (
        <label className="text-xs text-gray-600 font-medium">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={required && !label ? `${placeholder} *` : placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border rounded-md outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200"
              : "border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          } ${icon ? "pr-9" : ""}`}
        />
        {icon && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
