"use client";

import React, { useState } from "react";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import { Badge } from "./Badge";
import { InputField } from "./InputField";
import { DropdownField } from "./DropdownField";
import { Modal } from "./Modal";
import { ConfirmationMessage } from "./ConfirmationMessage";

type SectionStatus = "not-started" | "in-progress" | "completed";

const vehicleTypeOptions = [
  { label: "Cars", value: "cars" },
  { label: "Trucks", value: "trucks" },
  { label: "Vans", value: "vans" },
  { label: "SUVs", value: "suvs" },
  { label: "Mixed Fleet", value: "mixed" },
];

const mileageOptions = [
  { label: "Under 5,000 mi/mo", value: "under-5k" },
  { label: "5,000 – 10,000 mi/mo", value: "5k-10k" },
  { label: "10,000 – 25,000 mi/mo", value: "10k-25k" },
  { label: "Over 25,000 mi/mo", value: "over-25k" },
];

interface FleetFormData {
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  numberOfVehicles: string;
  vehicleType: string;
  serviceArea: string;
  insuranceProvider: string;
  policyNumber: string;
  monthlyMileage: string;
}

const emptyFleetForm: FleetFormData = {
  managerName: "",
  managerEmail: "",
  managerPhone: "",
  numberOfVehicles: "",
  vehicleType: "",
  serviceArea: "",
  insuranceProvider: "",
  policyNumber: "",
  monthlyMileage: "",
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

interface FleetServicesContentProps {
  onStatusChange?: (status: SectionStatus) => void;
  status?: SectionStatus;
}

export function FleetServicesContent({
  onStatusChange,
  status = "not-started",
}: FleetServicesContentProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<FleetFormData>(emptyFleetForm);
  const [savedFormData, setSavedFormData] = useState<FleetFormData>(emptyFleetForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FleetFormData, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange =
    (field: keyof FleetFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (!isDirty) {
        setIsDirty(true);
        onStatusChange?.("in-progress");
      }
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FleetFormData, string>> = {};
    if (!formData.managerName.trim()) newErrors.managerName = "Fleet manager name is required";
    if (!formData.managerEmail.trim()) {
      newErrors.managerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.managerEmail)) {
      newErrors.managerEmail = "Enter a valid email address";
    }
    if (!formData.numberOfVehicles.trim()) newErrors.numberOfVehicles = "Number of vehicles is required";
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
          <h1 className="text-xl font-bold text-gray-900">Fleet Services Form</h1>
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
                <span className="text-sm font-semibold text-gray-800">Fleet Information</span>
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
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Fleet Manager Details</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Fleet Manager Name"
                  value={formData.managerName}
                  onChange={handleChange("managerName") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                  required
                  error={errors.managerName}
                />
                <InputField
                  placeholder="Fleet Manager Email"
                  value={formData.managerEmail}
                  onChange={handleChange("managerEmail") as React.ChangeEventHandler<HTMLInputElement>}
                  type="email"
                  disabled={!isEditing}
                  required
                  error={errors.managerEmail}
                />
                <InputField
                  placeholder="Fleet Manager Phone"
                  value={formData.managerPhone}
                  onChange={handleChange("managerPhone") as React.ChangeEventHandler<HTMLInputElement>}
                  type="tel"
                  disabled={!isEditing}
                />
              </div>

              <h4 className="text-sm font-semibold text-gray-800 pt-3 mb-3">Fleet Details</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Number of Vehicles"
                  value={formData.numberOfVehicles}
                  onChange={handleChange("numberOfVehicles") as React.ChangeEventHandler<HTMLInputElement>}
                  type="number"
                  disabled={!isEditing}
                  required
                  error={errors.numberOfVehicles}
                />
                <DropdownField
                  placeholder="Vehicle Type"
                  value={formData.vehicleType}
                  onChange={handleChange("vehicleType") as React.ChangeEventHandler<HTMLSelectElement>}
                  options={vehicleTypeOptions}
                  disabled={!isEditing}
                />
                <InputField
                  placeholder="Service Area (e.g., Greater Omaha)"
                  value={formData.serviceArea}
                  onChange={handleChange("serviceArea") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  placeholder="Insurance Provider"
                  value={formData.insuranceProvider}
                  onChange={handleChange("insuranceProvider") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
                <InputField
                  placeholder="Policy Number"
                  value={formData.policyNumber}
                  onChange={handleChange("policyNumber") as React.ChangeEventHandler<HTMLInputElement>}
                  disabled={!isEditing}
                />
                <DropdownField
                  placeholder="Estimated Monthly Mileage"
                  value={formData.monthlyMileage}
                  onChange={handleChange("monthlyMileage") as React.ChangeEventHandler<HTMLSelectElement>}
                  options={mileageOptions}
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
                <LocalShippingOutlined sx={{ fontSize: 22 }} className="text-blue-600" />
              </div>
              <p className="text-sm text-gray-700 text-center">
                Are you sure you want to save the Fleet Services information?
              </p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
