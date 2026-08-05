/**
 * Franchise lots map: base image + lot region highlights and callout
 * positions from the Franchise Onboarding Figma
 * (https://www.figma.com/design/j3NrSUOdtQXNoB2KhrQi9d/Franchise-Onboarding, node 50:19233).
 * Map coordinate space matches a 900×644 reference frame; positions use % for responsiveness.
 */
export const FRANCHISE_MAP_BASE_SRC = "/usa-map.svg";

export type MapPolygonLayer = {
  lotNo: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

/** Region highlights. Shown when the matching lot is on the map. */
export const FRANCHISE_MAP_POLYGON_LAYERS: MapPolygonLayer[] = [
  { lotNo: "NB-001", top: "20.08%", left: "16.63%", width: "35.28%", height: "23.45%" },
  { lotNo: "NB-002", top: "27.45%", left: "49.25%", width: "19.48%", height: "34.39%" },
  { lotNo: "NB-003", top: "30.4%", left: "65.55%", width: "14.23%", height: "32.35%" },
  { lotNo: "NB-004", top: "37.89%", left: "15.02%", width: "53.48%", height: "29.2%" },
  { lotNo: "NB-005", top: "12.35%", left: "62.33%", width: "13.39%", height: "13.51%" },
  { lotNo: "NB-007", top: "21.5%", left: "51.5%", width: "16%", height: "33%" },
  { lotNo: "NB-009", top: "31%", left: "62%", width: "15.5%", height: "33%" },
];

/**
 * Tooltip (speech bubble) anchor positions — align with the MAP3 reference.
 */
export const FRANCHISE_MAP_LOT_CALLOUT_POS: Record<string, { top: string; left: string }> = {
  "NB-001": { top: "28.7%", left: "35.7%" },
  "NB-002": { top: "42%", left: "60.2%" },
  "NB-003": { top: "45%", left: "72.7%" },
  "NB-004": { top: "49.5%", left: "40.2%" },
  "NB-005": { top: "18.3%", left: "68.6%" },
  "NB-007": { top: "36%", left: "59.5%" },
  "NB-009": { top: "47%", left: "70%" },
};
