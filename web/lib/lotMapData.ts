/**
 * Franchise lots map: base image + semi-transparent lot regions and callout
 * positions from the Franchise Onboarding Figma
 * (https://www.figma.com/design/j3NrSUOdtQXNoB2KhrQi9d/Franchise-Onboarding, node 50:19233).
 * Map coordinate space matches a 900×644 reference frame; positions use % for responsiveness.
 */
export const FRANCHISE_MAP_BASE_SRC =
  "https://www.figma.com/api/mcp/asset/dd61b294-499a-48ff-90ed-d3d5b1981e2c";

export type MapPolygonLayer = {
  lotNo: string;
  src: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

/** Figma vector layers (region highlights). Shown when the matching lot is on the map. */
export const FRANCHISE_MAP_POLYGON_LAYERS: MapPolygonLayer[] = [
  { lotNo: "NB-001", src: "https://www.figma.com/api/mcp/asset/4c715fa7-e3c0-4824-8306-0fe4dbc1c78c", top: "20.08%", left: "16.63%", width: "35.28%", height: "23.45%" },
  { lotNo: "NB-002", src: "https://www.figma.com/api/mcp/asset/d170f7db-c1e9-4c8a-a5ed-3949f34e547f", top: "27.45%", left: "49.25%", width: "19.48%", height: "34.39%" },
  { lotNo: "NB-003", src: "https://www.figma.com/api/mcp/asset/b4ab20fa-5226-46be-8693-822479f7b9d2", top: "30.4%", left: "65.55%", width: "14.23%", height: "32.35%" },
  { lotNo: "NB-004", src: "https://www.figma.com/api/mcp/asset/0ab7f5df-ec95-480a-b05a-45d79d2796d3", top: "37.89%", left: "15.02%", width: "53.48%", height: "29.2%" },
  { lotNo: "NB-005", src: "https://www.figma.com/api/mcp/asset/c37531a9-2642-4a98-9d67-2cb0a2a3907f", top: "12.35%", left: "62.33%", width: "13.39%", height: "13.51%" },
];

/**
 * Figma tooltip (speech bubble) anchor positions — align with the MAP3 reference.
 */
export const FRANCHISE_MAP_LOT_CALLOUT_POS: Record<string, { top: string; left: string }> = {
  "NB-001": { top: "28.7%", left: "35.7%" },
  "NB-002": { top: "42%", left: "60.2%" },
  "NB-003": { top: "45%", left: "72.7%" },
  "NB-004": { top: "49.5%", left: "40.2%" },
  "NB-005": { top: "18.3%", left: "68.6%" },
  "NB-007": { top: "56%", left: "44%" },
};
