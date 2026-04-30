"use client";

import React, { useState, useRef } from "react";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import { Badge } from "./Badge";

export interface FranchiseInitialData {
  franchiseName?: string;
  franchiseNumber?: string;
  dbaName?: string;
  businessEmail?: string;
  businessPhone?: string;
  region?: string;
  territoryType?: string;
  zips?: string;
  allPreferredOwners?: string;
  officeStreet?: string;
  officeCity?: string;
  officeState?: string;
  officeCountry?: string;
  primaryLegalOwnerName?: string;
  primaryPreferredOwnerName?: string;
  legalEntityName?: string;
  ein?: string;
}

interface CreateFranchiseFormProps {
  onCancel: () => void;
  onSubmit: (data: Record<string, string>) => void;
  initialData?: FranchiseInitialData;
}

interface AdditionalOwner {
  id: string;
  legal: string;
  preferred: string;
  pct: string;
}

interface FInputProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
}

function FInput({ label, required, type = "text", value, onChange, disabled, error, placeholder }: FInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const ph = placeholder ?? (required ? `${label} *` : label);

  const borderClass = error
    ? "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
    : "border-gray-200 focus-within:border-[#6B2D8B]/40 focus-within:ring-2 focus-within:ring-[#6B2D8B]/10 hover:border-gray-300";

  if (type === "date") {
    const openPicker = () => {
      const el = inputRef.current;
      if (!el) return;
      try {
        (el as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
      } catch (_) {
        el.focus();
      }
    };

    return (
      <div className="flex flex-col gap-1">
        <div className={`relative flex items-center h-12 bg-gray-50 border rounded-xl transition-all ${borderClass}`}>
          <input
            ref={inputRef}
            type="date"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`absolute inset-0 w-full h-full pl-4 pr-11 text-sm bg-transparent outline-none disabled:opacity-60 disabled:cursor-not-allowed ${value ? "text-gray-700" : "text-transparent"}`}
          />
          {!value && (
            <span className="absolute left-4 right-11 text-sm text-gray-400 pointer-events-none select-none truncate">
              {ph}
            </span>
          )}
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={openPicker}
            className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-[#6B2D8B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <CalendarTodayOutlined sx={{ fontSize: 16 }} />
          </button>
        </div>
        {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={ph}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full h-12 px-4 text-sm text-gray-700 bg-gray-50 border rounded-xl outline-none transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#6B2D8B]/40 focus:ring-2 focus:ring-[#6B2D8B]/10 hover:border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </div>
  );
}

interface FSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
  error?: string;
}

function FSelect({ label, required, value, onChange, options, disabled, error }: FSelectProps) {
  const ph = required ? `${label} *` : label;
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-12 pl-4 pr-10 text-sm bg-gray-50 border rounded-xl outline-none appearance-none transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            value ? "text-gray-700" : "text-gray-400"
          } ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-[#6B2D8B]/40 focus:ring-2 focus:ring-[#6B2D8B]/10 hover:border-gray-300"
          }`}
        >
          <option value="" disabled className="text-gray-400">{ph}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-gray-700">
              {opt.label}
            </option>
          ))}
        </select>
        <KeyboardArrowDownOutlined sx={{ fontSize: 16 }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </div>
  );
}

const US_STATES = [
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" }, { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" }, { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" }, { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" }, { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" }, { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" }, { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" }, { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" },
];

const COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Mexico", value: "MX" },
];

const TERRITORY_TYPES = [
  { label: "Urban", value: "urban" },
  { label: "Suburban", value: "suburban" },
  { label: "Rural", value: "rural" },
  { label: "Mixed", value: "mixed" },
];

const AGREEMENT_STATUSES = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Expired", value: "expired" },
  { label: "Terminated", value: "terminated" },
  { label: "Renewal Pending", value: "renewal_pending" },
];

const TIMEZONES = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Alaska Time (AKT)", value: "America/Anchorage" },
  { label: "Hawaii Time (HT)", value: "Pacific/Honolulu" },
];

const MANDATORY_FIELDS = [
  "franchiseName", "franchiseAgreementStatus", "dbaName",
  "agreementSignedDate", "agreementTerminationDate", "agreementExpirationDate",
  "launchDate", "businessEmail", "territoryType", "region", "zips",
  "allPreferredOwners", "businessPhone",
  "officeStreet", "officeCity", "officeState", "officePostal", "officeCountry",
  "legalNoticeStreet", "legalNoticeCity", "legalNoticeState", "legalNoticePostal", "legalNoticeCountry",
  "legalEntityName", "ein",
  "primaryLegalOwnerName", "primaryPreferredOwnerName", "primaryOwnerPct",
];

type FieldKey = string;
const MAX_OWNERS = 5;
const ORDINAL_LABELS: Record<number, string> = { 0: "2nd", 1: "3rd", 2: "4th", 3: "5th" };

function Chevron() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function AccordionSection({
  title, subtitle, defaultOpen = true, children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="bg-white rounded-xl border border-gray-200 group">
      <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <Chevron />
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </summary>
      <div className="border-t border-gray-100 p-6">
        {children}
      </div>
    </details>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{children}</p>
  );
}

export function CreateFranchiseForm({ onCancel, onSubmit, initialData = {} }: CreateFranchiseFormProps) {
  const buildInitial = (): Record<FieldKey, string> => ({
    franchiseName: initialData.franchiseName ?? "",
    franchiseAgreementStatus: "",
    franchiseNumber: initialData.franchiseNumber ?? "",
    dbaName: initialData.dbaName ?? "",
    agreementSignedDate: "",
    agreementTerminationDate: "",
    agreementExpirationDate: "",
    launchDate: "",
    businessEmail: initialData.businessEmail ?? "",
    territoryType: initialData.territoryType ?? "",
    region: initialData.region ?? "",
    zips: initialData.zips ?? "",
    allPreferredOwners: initialData.allPreferredOwners ?? "",
    businessPhone: initialData.businessPhone ?? "",
    timezone: "",
    officeStreet: initialData.officeStreet ?? "",
    officeCity: initialData.officeCity ?? "",
    officeState: initialData.officeState ?? "",
    officePostal: "",
    officeCountry: initialData.officeCountry ?? "",
    mailingStreet: "",
    mailingCity: "",
    mailingState: "",
    mailingPostal: "",
    mailingCountry: "",
    legalNoticeStreet: "",
    legalNoticeCity: "",
    legalNoticeState: "",
    legalNoticePostal: "",
    legalNoticeCountry: "",
    legalEntityName: initialData.legalEntityName ?? "",
    ein: initialData.ein ?? "",
    securityLicenseNumber: "",
    securityLicenseExpiry: "",
    businessLicenseNumber: "",
    businessLicenseExpiry: "",
    cityLicenseNumber: "",
    cityLicenseExpiry: "",
    city2LicenseNumber: "",
    city2LicenseExpiry: "",
    primaryLegalOwnerName: initialData.primaryLegalOwnerName ?? "",
    primaryPreferredOwnerName: initialData.primaryPreferredOwnerName ?? "",
    primaryOwnerPct: "",
    masterPreferredOwner: "",
  });

  const [fields, setFields] = useState<Record<FieldKey, string>>(buildInitial);
  const [additionalOwners] = useState<AdditionalOwner[]>([
    { id: "owner-2", legal: "", preferred: "", pct: "" },
    { id: "owner-3", legal: "", preferred: "", pct: "" },
    { id: "owner-4", legal: "", preferred: "", pct: "" },
    { id: "owner-5", legal: "", preferred: "", pct: "" },
  ]);
  const [errors, setErrors] = useState<Record<FieldKey, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors: Record<FieldKey, string> = {};
    MANDATORY_FIELDS.forEach((key) => {
      if (!fields[key]?.trim()) newErrors[key] = "Required";
    });
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(true);
      const el = document.querySelector("[data-has-error='true']");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onSubmit({ ...fields });
  };

  const errAttr = (key: FieldKey): React.HTMLAttributes<HTMLDivElement> =>
    ({ "data-has-error": errors[key] ? "true" : undefined } as React.HTMLAttributes<HTMLDivElement>);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-gray-900">Create Franchise</h1>
              <Badge label="Compliance Form" variant="compliance" />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Fill in all mandatory fields to create a new franchise record</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-5 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
          >
            <SaveOutlined sx={{ fontSize: 14 }} /> Approve &amp; Create Franchise
          </button>
        </div>
      </div>

      {/* Validation banner */}
      {submitted && Object.keys(errors).length > 0 && (
        <div className="mx-6 mt-4 shrink-0 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <ShieldOutlined sx={{ fontSize: 15 }} className="text-red-400 shrink-0" />
          Please fill in all required fields before submitting.
        </div>
      )}

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

        {/* 1 — Franchise Information */}
        <AccordionSection title="Franchise Information" subtitle="Core details about the franchise">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div {...errAttr("franchiseName")}>
              <FInput label="Franchise Name" required value={fields.franchiseName}
                onChange={set("franchiseName") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.franchiseName} />
            </div>
            <div {...errAttr("dbaName")}>
              <FInput label="DBA Name" required value={fields.dbaName}
                onChange={set("dbaName") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.dbaName} />
            </div>
            <div {...errAttr("legalEntityName")}>
              <FInput label="Legal Entity Name" required value={fields.legalEntityName}
                onChange={set("legalEntityName") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.legalEntityName} />
            </div>
            <div {...errAttr("businessEmail")}>
              <FInput label="Business Email Address" required type="email" value={fields.businessEmail}
                onChange={set("businessEmail") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.businessEmail} />
            </div>
            <div {...errAttr("businessPhone")}>
              <FInput label="Business Phone Number" required type="tel" value={fields.businessPhone}
                onChange={set("businessPhone") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.businessPhone} />
            </div>
            <div {...errAttr("ein")}>
              <FInput label="EIN" required placeholder="EIN *" value={fields.ein}
                onChange={set("ein") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.ein} />
            </div>
            <div {...errAttr("launchDate")}>
              <FInput label="Launch Date" required type="date" value={fields.launchDate}
                onChange={set("launchDate") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.launchDate} />
            </div>
            <div {...errAttr("territoryType")}>
              <FSelect label="Territory Type" required value={fields.territoryType}
                onChange={set("territoryType") as React.ChangeEventHandler<HTMLSelectElement>}
                options={TERRITORY_TYPES} error={errors.territoryType} />
            </div>
            <div>
              <FSelect label="Time Zone" value={fields.timezone}
                onChange={set("timezone") as React.ChangeEventHandler<HTMLSelectElement>}
                options={TIMEZONES} />
            </div>
            <div {...errAttr("region")}>
              <FInput label="Region" required value={fields.region}
                onChange={set("region") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.region} />
            </div>
            <div {...errAttr("zips")}>
              <FInput label="Zip Codes" required placeholder="Zip Codes * (e.g. 60601, 60602)" value={fields.zips}
                onChange={set("zips") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.zips} />
            </div>
            <div {...errAttr("allPreferredOwners")}>
              <FInput label="All Preferred Owners" required value={fields.allPreferredOwners}
                onChange={set("allPreferredOwners") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.allPreferredOwners} />
            </div>
          </div>
        </AccordionSection>

        {/* 2 — Franchise Agreement */}
        <AccordionSection title="Franchise Agreement" subtitle="Agreement status and key dates">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <FInput label="Franchise Number" placeholder="Franchise Number" value={fields.franchiseNumber}
                onChange={set("franchiseNumber") as React.ChangeEventHandler<HTMLInputElement>} />
            </div>
            <div {...errAttr("franchiseAgreementStatus")}>
              <FSelect label="Agreement Status" required value={fields.franchiseAgreementStatus}
                onChange={set("franchiseAgreementStatus") as React.ChangeEventHandler<HTMLSelectElement>}
                options={AGREEMENT_STATUSES} error={errors.franchiseAgreementStatus} />
            </div>
            <div {...errAttr("agreementSignedDate")}>
              <FInput label="Agreement Signed Date" required type="date" value={fields.agreementSignedDate}
                onChange={set("agreementSignedDate") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.agreementSignedDate} />
            </div>
            <div {...errAttr("agreementTerminationDate")}>
              <FInput label="Termination Date" required type="date" value={fields.agreementTerminationDate}
                onChange={set("agreementTerminationDate") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.agreementTerminationDate} />
            </div>
            <div {...errAttr("agreementExpirationDate")}>
              <FInput label="Expiration Date" required type="date" value={fields.agreementExpirationDate}
                onChange={set("agreementExpirationDate") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.agreementExpirationDate} />
            </div>
          </div>
        </AccordionSection>

        {/* 3 — Office Address */}
        <AccordionSection title="Office Address" subtitle="Primary business location">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="sm:col-span-2 lg:col-span-3" {...errAttr("officeStreet")}>
              <FInput label="Full Street Address" required value={fields.officeStreet}
                onChange={set("officeStreet") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.officeStreet} />
            </div>
            <div {...errAttr("officeCity")}>
              <FInput label="City" required value={fields.officeCity}
                onChange={set("officeCity") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.officeCity} />
            </div>
            <div {...errAttr("officeState")}>
              <FSelect label="State" required value={fields.officeState}
                onChange={set("officeState") as React.ChangeEventHandler<HTMLSelectElement>}
                options={US_STATES} error={errors.officeState} />
            </div>
            <div {...errAttr("officePostal")}>
              <FInput label="Postal Code" required value={fields.officePostal}
                onChange={set("officePostal") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.officePostal} />
            </div>
            <div {...errAttr("officeCountry")}>
              <FSelect label="Country" required value={fields.officeCountry}
                onChange={set("officeCountry") as React.ChangeEventHandler<HTMLSelectElement>}
                options={COUNTRIES} error={errors.officeCountry} />
            </div>
          </div>
        </AccordionSection>

        {/* 4 — Mailing Address */}
        <AccordionSection title="Mailing Address" subtitle="Mailing address (if different from office)">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <FInput label="Full Street Address" placeholder="Full Street Address" value={fields.mailingStreet}
                onChange={set("mailingStreet") as React.ChangeEventHandler<HTMLInputElement>} />
            </div>
            <FInput label="City" placeholder="City" value={fields.mailingCity}
              onChange={set("mailingCity") as React.ChangeEventHandler<HTMLInputElement>} />
            <FSelect label="State" value={fields.mailingState}
              onChange={set("mailingState") as React.ChangeEventHandler<HTMLSelectElement>}
              options={US_STATES} />
            <FInput label="Postal Code" placeholder="Postal Code" value={fields.mailingPostal}
              onChange={set("mailingPostal") as React.ChangeEventHandler<HTMLInputElement>} />
            <FSelect label="Country" value={fields.mailingCountry}
              onChange={set("mailingCountry") as React.ChangeEventHandler<HTMLSelectElement>}
              options={COUNTRIES} />
          </div>
        </AccordionSection>

        {/* 5 — Legal Notice Address */}
        <AccordionSection title="Legal Notice Address" subtitle="Address for official legal correspondence">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="sm:col-span-2 lg:col-span-3" {...errAttr("legalNoticeStreet")}>
              <FInput label="Full Street Address" required value={fields.legalNoticeStreet}
                onChange={set("legalNoticeStreet") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.legalNoticeStreet} />
            </div>
            <div {...errAttr("legalNoticeCity")}>
              <FInput label="City" required value={fields.legalNoticeCity}
                onChange={set("legalNoticeCity") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.legalNoticeCity} />
            </div>
            <div {...errAttr("legalNoticeState")}>
              <FSelect label="State" required value={fields.legalNoticeState}
                onChange={set("legalNoticeState") as React.ChangeEventHandler<HTMLSelectElement>}
                options={US_STATES} error={errors.legalNoticeState} />
            </div>
            <div {...errAttr("legalNoticePostal")}>
              <FInput label="Postal Code" required value={fields.legalNoticePostal}
                onChange={set("legalNoticePostal") as React.ChangeEventHandler<HTMLInputElement>}
                error={errors.legalNoticePostal} />
            </div>
            <div {...errAttr("legalNoticeCountry")}>
              <FSelect label="Country" required value={fields.legalNoticeCountry}
                onChange={set("legalNoticeCountry") as React.ChangeEventHandler<HTMLSelectElement>}
                options={COUNTRIES} error={errors.legalNoticeCountry} />
            </div>
          </div>
        </AccordionSection>

        {/* 6 — Licenses */}
        <AccordionSection title="Licenses" subtitle="Security, business, and city license details (optional)">
          <div className="space-y-6">
            <div>
              <SubLabel>Security License</SubLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="Security License Number" placeholder="Security License Number"
                  value={fields.securityLicenseNumber}
                  onChange={set("securityLicenseNumber") as React.ChangeEventHandler<HTMLInputElement>} />
                <FInput label="Security License Expiry" type="date"
                  value={fields.securityLicenseExpiry}
                  onChange={set("securityLicenseExpiry") as React.ChangeEventHandler<HTMLInputElement>} />
              </div>
            </div>
            <div>
              <SubLabel>Business License</SubLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="Business License Number" placeholder="Business License Number"
                  value={fields.businessLicenseNumber}
                  onChange={set("businessLicenseNumber") as React.ChangeEventHandler<HTMLInputElement>} />
                <FInput label="Business License Expiry" type="date"
                  value={fields.businessLicenseExpiry}
                  onChange={set("businessLicenseExpiry") as React.ChangeEventHandler<HTMLInputElement>} />
              </div>
            </div>
            <div>
              <SubLabel>City License</SubLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="City License Number" placeholder="City License Number"
                  value={fields.cityLicenseNumber}
                  onChange={set("cityLicenseNumber") as React.ChangeEventHandler<HTMLInputElement>} />
                <FInput label="City License Expiry" type="date"
                  value={fields.cityLicenseExpiry}
                  onChange={set("cityLicenseExpiry") as React.ChangeEventHandler<HTMLInputElement>} />
              </div>
            </div>
            <div>
              <SubLabel>City 2 License</SubLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="City 2 License Number" placeholder="City 2 License Number"
                  value={fields.city2LicenseNumber}
                  onChange={set("city2LicenseNumber") as React.ChangeEventHandler<HTMLInputElement>} />
                <FInput label="City 2 License Expiry" type="date"
                  value={fields.city2LicenseExpiry}
                  onChange={set("city2LicenseExpiry") as React.ChangeEventHandler<HTMLInputElement>} />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* 7 — Ownership Information */}
        <AccordionSection
          title={additionalOwners.length > 0 ? `Ownership Information (${additionalOwners.length + 1})` : "Ownership Information"}
          subtitle="Legal owners and their percentage of ownership"
        >
          <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Primary Owner</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div {...errAttr("primaryLegalOwnerName")}>
                <FInput label="Legal Owner Name" required value={fields.primaryLegalOwnerName}
                  onChange={set("primaryLegalOwnerName") as React.ChangeEventHandler<HTMLInputElement>}
                  error={errors.primaryLegalOwnerName} />
              </div>
              <div {...errAttr("primaryPreferredOwnerName")}>
                <FInput label="Preferred Owner Name" required value={fields.primaryPreferredOwnerName}
                  onChange={set("primaryPreferredOwnerName") as React.ChangeEventHandler<HTMLInputElement>}
                  error={errors.primaryPreferredOwnerName} />
              </div>
              <div {...errAttr("primaryOwnerPct")}>
                <FInput label="% of Ownership" required type="number" placeholder="% of Ownership *"
                  value={fields.primaryOwnerPct}
                  onChange={set("primaryOwnerPct") as React.ChangeEventHandler<HTMLInputElement>}
                  error={errors.primaryOwnerPct} />
              </div>
            </div>
          </div>

          {additionalOwners.map((owner, i) => (
            <div key={owner.id} className="mt-3 rounded-xl border border-dashed border-gray-300 bg-white p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-medium shrink-0">
                  {i + 2}
                </span>
                <span className="text-xs font-semibold text-gray-600">{ORDINAL_LABELS[i] ?? `${i + 2}th`} Owner</span>
                <span className="text-xs text-gray-400">(Optional)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FInput label="Legal Owner Name" placeholder="Legal Owner Name"
                  value={owner.legal} onChange={() => {}} />
                <FInput label="Preferred Owner Name" placeholder="Preferred Owner Name"
                  value={owner.preferred} onChange={() => {}} />
                <FInput label="% of Ownership" type="number" placeholder="% of Ownership"
                  value={owner.pct} onChange={() => {}} />
              </div>
            </div>
          ))}

          {additionalOwners.length >= MAX_OWNERS - 1 && (
            <p className="mt-3 text-center text-xs text-gray-400 italic">Maximum of {MAX_OWNERS} owners reached.</p>
          )}

          <div className="mt-5 pt-5 border-t border-gray-100">
            <FInput
              label="Master Preferred Owner"
              placeholder="Master Preferred Owner (optional)"
              value={fields.masterPreferredOwner}
              onChange={set("masterPreferredOwner") as React.ChangeEventHandler<HTMLInputElement>}
            />
          </div>
        </AccordionSection>

        <div className="h-4" />
      </div>
    </div>
  );
}
