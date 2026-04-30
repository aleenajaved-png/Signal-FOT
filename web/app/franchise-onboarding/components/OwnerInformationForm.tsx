"use client";

import React, { useState } from "react";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Badge } from "./Badge";
import { InputField } from "./InputField";
import { DropdownField } from "./DropdownField";
import { Modal } from "./Modal";
import { ConfirmationMessage } from "./ConfirmationMessage";

type SectionStatus = "not-started" | "in-progress" | "completed";

const shirtSizeOptions = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
];

const businessTypeOptions = [
  { label: "LLC", value: "llc" },
  { label: "Corporation", value: "corp" },
  { label: "Sole Proprietorship", value: "sole" },
  { label: "Partnership", value: "partnership" },
  { label: "S-Corp", value: "scorp" },
];

const licenseOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const franchiseNumberOptions = [
  { label: "NB-009", value: "nb-009" },
];

interface FormData {
  name: string;
  email: string;
  backupEmail: string;
  phone: string;
  franchiseNumber: string;
  entityName: string;
  ein: string;
  licenseNum: string;
  businessType: string;
  publishedPhone: string;
  businessOfficeAddress: string;
  mailingAddress: string;
  shirtSize: string;
  stateRequiresLicense: string;
  consentVideo: string;
  secondaryOwnerName: string;
  secondaryTitle: string;
  secondaryPhone: string;
  secondaryBackupEmail: string;
  secondaryMailingAddress: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  backupEmail: "",
  phone: "",
  franchiseNumber: "",
  entityName: "",
  ein: "",
  licenseNum: "",
  businessType: "",
  publishedPhone: "",
  businessOfficeAddress: "",
  mailingAddress: "",
  shirtSize: "",
  stateRequiresLicense: "",
  consentVideo: "",
  secondaryOwnerName: "",
  secondaryTitle: "",
  secondaryPhone: "",
  secondaryBackupEmail: "",
  secondaryMailingAddress: "",
};

interface OwnerInformationFormProps {
  onStatusChange?: (status: SectionStatus) => void;
  status?: SectionStatus;
}

const statusBadgeVariant: Record<SectionStatus, "not-started" | "in-progress" | "completed"> = {
  "not-started": "not-started",
  "in-progress": "in-progress",
  completed: "completed",
};

const statusLabel: Record<SectionStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function OwnerInformationForm({
  onStatusChange,
  status = "not-started",
}: OwnerInformationFormProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [savedFormData, setSavedFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (!isDirty) {
        setIsDirty(true);
        onStatusChange?.("in-progress");
      }
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.franchiseNumber) newErrors.franchiseNumber = "Franchise number is required";
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsExpanded((p) => !p)}
            className="flex items-center gap-2 hover:text-gray-900 transition-colors"
          >
            <span className="text-gray-500">
              {isExpanded ? <KeyboardArrowUpOutlined sx={{ fontSize: 16 }} /> : <KeyboardArrowDownOutlined sx={{ fontSize: 16 }} />}
            </span>
            <span className="text-sm font-semibold text-gray-800">Owner Information</span>
          </button>
          <Badge label={statusLabel[status]} variant={statusBadgeVariant[status]} />
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

      {/* Form Content */}
      {isExpanded && (
        <div className="p-5">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Primary Owner Information</h4>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InputField
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange("name") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
                required
                error={errors.name}
              />
              <InputField
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange("email") as React.ChangeEventHandler<HTMLInputElement>}
                type="email"
                disabled={!isEditing}
                required
                error={errors.email}
              />
              <InputField
                placeholder="Back Up Email Address"
                value={formData.backupEmail}
                onChange={handleChange("backupEmail") as React.ChangeEventHandler<HTMLInputElement>}
                type="email"
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InputField
                placeholder="Personal Phone Number"
                value={formData.phone}
                onChange={handleChange("phone") as React.ChangeEventHandler<HTMLInputElement>}
                type="tel"
                disabled={!isEditing}
                required
                error={errors.phone}
              />
              <DropdownField
                placeholder="Franchise Number"
                value={formData.franchiseNumber}
                onChange={handleChange("franchiseNumber") as React.ChangeEventHandler<HTMLSelectElement>}
                options={franchiseNumberOptions}
                disabled={!isEditing}
                required
                error={errors.franchiseNumber}
              />
              <InputField
                placeholder="Entity Name (LLC, etc.)"
                value={formData.entityName}
                onChange={handleChange("entityName") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InputField
                placeholder="EIN"
                value={formData.ein}
                onChange={handleChange("ein") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
              <InputField
                placeholder="License #"
                value={formData.licenseNum}
                onChange={handleChange("licenseNum") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
              <DropdownField
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange("businessType") as React.ChangeEventHandler<HTMLSelectElement>}
                options={businessTypeOptions}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InputField
                placeholder="Published Business Phone Number"
                value={formData.publishedPhone}
                onChange={handleChange("publishedPhone") as React.ChangeEventHandler<HTMLInputElement>}
                type="tel"
                disabled={!isEditing}
              />
              <InputField
                placeholder="Business Office Address"
                value={formData.businessOfficeAddress}
                onChange={handleChange("businessOfficeAddress") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
              <InputField
                placeholder="Mailing Address"
                value={formData.mailingAddress}
                onChange={handleChange("mailingAddress") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <DropdownField
                placeholder="Shirt Size"
                value={formData.shirtSize}
                onChange={handleChange("shirtSize") as React.ChangeEventHandler<HTMLSelectElement>}
                options={shirtSizeOptions}
                disabled={!isEditing}
              />
              <DropdownField
                placeholder="Does your state require your license?"
                value={formData.stateRequiresLicense}
                onChange={handleChange("stateRequiresLicense") as React.ChangeEventHandler<HTMLSelectElement>}
                options={licenseOptions}
                disabled={!isEditing}
              />
              <InputField
                placeholder="Consent Video URL"
                value={formData.consentVideo}
                onChange={handleChange("consentVideo") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
            </div>
          </div>

          <h4 className="text-sm font-semibold text-gray-800 mt-6 mb-3">Secondary Owner/Partner Information</h4>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <InputField
                placeholder="Name of Secondary Owner/Partner"
                value={formData.secondaryOwnerName}
                onChange={handleChange("secondaryOwnerName") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
              <InputField
                placeholder="Title"
                value={formData.secondaryTitle}
                onChange={handleChange("secondaryTitle") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
              <InputField
                placeholder="Secondary Owner/Partner Phone Number"
                value={formData.secondaryPhone}
                onChange={handleChange("secondaryPhone") as React.ChangeEventHandler<HTMLInputElement>}
                type="tel"
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                placeholder="Secondary Owner Back Up Email"
                value={formData.secondaryBackupEmail}
                onChange={handleChange("secondaryBackupEmail") as React.ChangeEventHandler<HTMLInputElement>}
                type="email"
                disabled={!isEditing}
              />
              <InputField
                placeholder="Secondary Owner Mailing/Shipping Address"
                value={formData.secondaryMailingAddress}
                onChange={handleChange("secondaryMailingAddress") as React.ChangeEventHandler<HTMLInputElement>}
                disabled={!isEditing}
              />
            </div>
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
                <EditOutlined sx={{ fontSize: 22 }} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-700 text-center">
            Are you sure you want to save the changes to Owner Information?
          </p>
        </div>
      </Modal>
    </div>
  );
}
