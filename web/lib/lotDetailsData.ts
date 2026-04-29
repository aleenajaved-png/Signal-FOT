import type { LotTableRow } from "./data";

/** `NB-001` → `NB - 001` for display (matches Figma). */
export function formatLotIdTitle(name: string): string {
  const m = name.match(/^([A-Za-z]+)-(\d+)$/);
  if (m) return `${m[1]} - ${m[2]}`;
  return name;
}

export function lotStatusLabel(s: LotTableRow["status"]): string {
  if (s === "available") return "Available";
  if (s === "sold") return "Sold";
  return "Pending";
}

export function priceHistoryForRow(): { price: string; date: string } {
  return { price: "$98,000", date: "Jan 18, 2021." };
}

export type NearbyLotCard = { id: string; opp: string };

export const lotDetailsNearby: NearbyLotCard[] = [
  { id: "KA - 05", opp: "591,700/ year" },
  { id: "SA - 12", opp: "267,790/ year" },
  { id: "NB - 14", opp: "289,700/ year" },
  { id: "KA - 18", opp: "998,700/ year" },
];

export type FranchiseAssociationStatus = "inactive" | "upcoming" | "active";

export type FranchiseAssociationRow = {
  franchise: string;
  /** Plain date in Association column when `endsDate` and `startsDate` are null. */
  effectiveDate: string | null;
  /** When set, Association column shows that date (typically ends / effective for the row). */
  endsDate: string | null;
  /** When set, Association column shows that date (same format as `endsDate`). */
  startsDate: string | null;
  status: FranchiseAssociationStatus;
};

/** `YYYY-MM-DD` or null (shown as em dash). */
export function formatFranchiseAssociationDate(value: string | null): string {
  if (value == null) return "—";
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" });
}

/** Field label in the lot-details franchise association table (per row). */
export function franchiseAssociationDateColumnLabel(r: FranchiseAssociationRow): string {
  if (r.endsDate) return "Cut-off Date";
  return "Effective Date";
}

/** Association column: `endsDate` / `startsDate` / `effectiveDate` (each as `M/D/YY` or `—`). */
export function formatFranchiseAssociationCell(r: FranchiseAssociationRow): string {
  if (r.endsDate) {
    return formatFranchiseAssociationDate(r.endsDate);
  }
  if (r.startsDate) {
    return formatFranchiseAssociationDate(r.startsDate);
  }
  return formatFranchiseAssociationDate(r.effectiveDate);
}

export const franchiseAssociationHistoryRows: FranchiseAssociationRow[] = [
  { franchise: "0502, New Jersey", effectiveDate: null, endsDate: "2026-04-24", startsDate: null, status: "active" },
  { franchise: "4500, Wichita, KS", effectiveDate: null, endsDate: null, startsDate: "2026-04-27", status: "inactive" },
];
