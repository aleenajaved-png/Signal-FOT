"use client";

import React from "react";
import { X, MapPin, User, Phone, Mail, Building2 } from "lucide-react";

interface Lot {
  id: string;
  lotNumber: string;
  location: string;
  city: string;
  state: string;
  status: "Active" | "Pending" | "Inactive";
}

interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  territory: string;
}

const mockLots: Lot[] = [
  { id: "1", lotNumber: "IL-033", location: "1234 North Ave", city: "Chicago", state: "IL", status: "Active" },
  { id: "2", lotNumber: "IL-038", location: "5678 West Blvd", city: "Aurora", state: "IL", status: "Pending" },
  { id: "3", lotNumber: "IL-039", location: "9012 South St", city: "Naperville", state: "IL", status: "Pending" },
];

const mockContacts: Contact[] = [
  { id: "1", name: "Andre Martin", role: "Primary Owner", phone: "(312) 555-0101", email: "andre.martin@example.com", territory: "IL-033, 038, 039" },
  { id: "2", name: "Sarah Kim", role: "Fleet Manager", phone: "(312) 555-0182", email: "s.kim@example.com", territory: "IL-033" },
  { id: "3", name: "James Torres", role: "Operations Lead", phone: "(630) 555-0147", email: "j.torres@example.com", territory: "IL-038, 039" },
];

const statusColors: Record<Lot["status"], string> = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-500",
};

interface LotsContactsPanelProps {
  type: "lots" | "contacts";
  onClose: () => void;
}

export function LotsContactsPanel({ type, onClose }: LotsContactsPanelProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {type === "lots" ? (
            <>
              <MapPin size={15} className="text-blue-500" />
              Franchise Lots
            </>
          ) : (
            <>
              <User size={15} className="text-orange-500" />
              Contacts
            </>
          )}
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Close panel"
        >
          <X size={15} />
        </button>
      </div>

      <div className="px-6 py-3 overflow-x-auto">
        {type === "lots" ? (
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-2 pr-4 font-medium">Lot #</th>
                <th className="pb-2 pr-4 font-medium">Location</th>
                <th className="pb-2 pr-4 font-medium">City</th>
                <th className="pb-2 pr-4 font-medium">State</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockLots.map((lot) => (
                <tr key={lot.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={13} className="text-blue-400 shrink-0" />
                      <span className="font-medium text-gray-800">{lot.lotNumber}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-4 text-gray-600">{lot.location}</td>
                  <td className="py-2 pr-4 text-gray-600">{lot.city}</td>
                  <td className="py-2 pr-4 text-gray-600">{lot.state}</td>
                  <td className="py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[lot.status]}`}>
                      {lot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Role</th>
                <th className="pb-2 pr-4 font-medium">Phone</th>
                <th className="pb-2 pr-4 font-medium">Email</th>
                <th className="pb-2 font-medium">Territory</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-orange-600">
                          {contact.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-4 text-gray-600">{contact.role}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone size={11} />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail size={11} />
                      {contact.email}
                    </div>
                  </td>
                  <td className="py-2 text-gray-600 text-xs">{contact.territory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
