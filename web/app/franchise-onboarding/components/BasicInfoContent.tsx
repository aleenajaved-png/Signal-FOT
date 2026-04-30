"use client";

import React, { useState } from "react";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import BusinessOutlined from "@mui/icons-material/BusinessOutlined";
import { Badge } from "./Badge";
import { InputField } from "./InputField";
import { DropdownField } from "./DropdownField";
import { Modal } from "./Modal";
import { ConfirmationMessage } from "./ConfirmationMessage";

type SectionStatus = "not-started" | "in-progress" | "completed";

const stateOptions = [
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

const employeeCountOptions = [
  { label: "1 – 5", value: "1-5" },
  { label: "6 – 10", value: "6-10" },
  { label: "11 – 25", value: "11-25" },
  { label: "26 – 50", value: "26-50" },
  { label: "51 – 100", value: "51-100" },
  { label: "100+", value: "100+" },
];

interface BasicFormData {
  businessLegalName: string;
  dbaName: string;
  stateOfOperation: string;
  businessStartDate: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  numberOfEmployees: string;
  taxId: string;
  annualRevenue: string;
}

const emptyForm: BasicFormData = {
  businessLegalName: "",
  dbaName: "",
  stateOfOperation: "",
  businessStartDate: "",
  businessEmail: "",
  businessPhone: "",
  website: "",
  numberOfEmployees: "",
  taxId: "",
  annualRevenue: "",
};

const statusLabel: Record<SectionStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusVariant: Record<SectionStatus, "not-started" | "in-progress" | "completed"> = {
  "not-started": "not-started",
  "in-progress": "in-progress",
  completed: "completed",
};

interface BasicInfoContentProps {
  onStatusChange?: (status: SectionStatus) => void;
  status?: SectionStatus;
}

export function BasicInfoContent({
  onStatusChange,
  status = "not-started",
}: BasicInfoContentProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<BasicFormData>(emptyForm);
  const [savedFormData, setSavedFormData] = useState<BasicFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BasicFormData, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange =
    (field: keyof BasicFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (!isDirty) {
        setIsDirty(true);
        onStatusChange?.("in-progress");
      }
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BasicFormData, string>> = {};
    if (!formData.businessLegalName.trim()) newErrors.businessLegalName = "Business legal name is required";
    if (!formData.stateOfOperation) newErrors.stateOfOperation = "State of operation is required";
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setSavedFormData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!validate()) return;
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    setShowSaveModal(false);
    setIsEditing(false);
    setIsDirty(false);
    setSavedFormData(formData);
    setShowConfirmation(true);
    onStatusChange?.("completed");
    setTimeout(() => setShowConfirmation(false), 4000);
  };

  const handleCancel = () => {
    setFormData(savedFormData);
    setIsEditing(false);
    setErrors({});
    const hasAnySavedData = Object.values(savedFormData).some((v) => v.trim() !== "");
    if (!hasAnySavedData) {
      setIsDirty(false);
      onStatusChange?.("not-started");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-2">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-bold text-gray-900">Basic Information</h1>
        </div>
        <div>
          <Badge label={statusLabel[status]} variant={statusVariant[status]} />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsExpanded((p) => !p)}
                className="flex items-center gap-2 hover:text-gray-900 transition-colors"
              >
                <span className="text-gray-500">
                  {isExpanded ? <KeyboardArrowUpOutlined sx={{ fontSize: 16 }} /> : <KeyboardArrowDownOutlined sx={{ fontSize: 16 }} />}
                </span>
                <span className="text-sm font-semibold text-gray-800">Business Information</span>
              </button>
              <Badge label={statusLabel[status]} variant={statusVariant[status]} />
            </div>

            <div className="flex items-center gap-2">
              {showConfirmation && (
                <ConfirmationMessage
                  type="success"
                  title="Saved successfully!"
                  show={showConfirmation}
                  onClose={() => setShowConfirmation(false)}
                />
              )}
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                >
                  <EditOutlined sx={{ fontSize: 14 }} />
                  Edit
                </button>
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="p-5 space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Business Identity</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Business Legal Name"
                  value={formData.businessLegalName}
                  onChange={handleChange("businessLegalName") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                  required
                  error={errors.businessLegalName}
                />
                <InputField
                  placeholder="DBA Name (if applicable)"
                  value={formData.dbaName}
                  onChange={handleChange("dbaName") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
                <DropdownField
                  placeholder="State of Operation"
                  value={formData.stateOfOperation}
                  onChange={handleChange("stateOfOperation") as React.ChangeEventHandler<HTMLSelectElement>}
                  options={stateOptions}
                  disabled={!isEditing}
                  required
                  error={errors.stateOfOperation}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Business Start Date"
                  value={formData.businessStartDate}
                  onChange={handleChange("businessStartDate") as React.ChangeEventHandler<HTMLInputElement>}
                  type="date"
                  disabled={!isEditing}
                />
                <InputField
                  placeholder="Tax ID / EIN"
                  value={formData.taxId}
                  onChange={handleChange("taxId") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
                <DropdownField
                  placeholder="Number of Employees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange("numberOfEmployees") as React.ChangeEventHandler<HTMLSelectElement>}
                  options={employeeCountOptions}
                  disabled={!isEditing}
                />
              </div>

              <h4 className="text-sm font-semibold text-gray-800 pt-3 mb-3">Contact &amp; Online Presence</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Business Email"
                  value={formData.businessEmail}
                  onChange={handleChange("businessEmail") as React.ChangeEventHandler<HTMLInputElement>}
                  type="email"
                  disabled={!isEditing}
                  required
                  error={errors.businessEmail}
                />
                <InputField
                  placeholder="Business Phone"
                  value={formData.businessPhone}
                  onChange={handleChange("businessPhone") as React.ChangeEventHandler<HTMLInputElement>}
                  type="tel"
                  disabled={!isEditing}
                />
                <InputField
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={handleChange("website") as React.ChangeEventHandler<HTMLInputElement>}
                  type="url"
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  placeholder="Estimated Annual Revenue ($)"
                  value={formData.annualRevenue}
                  onChange={handleChange("annualRevenue") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <p className="text-xs text-gray-400 mt-4">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </p>
              )}
            </div>
          )}

          <Modal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            title="Save Changes"
            size="sm"
            footer={
              <>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSave}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            }
          >
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BusinessOutlined sx={{ fontSize: 22 }} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-700 text-center">
                Are you sure you want to save the Basic Information?
              </p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
