export type FranchiseStatus = "nonfunc" | "functional" | "attention";

export type ListStatus = "nonfunc" | "functional" | "attention";

export type FranchiseInSidebar = {
  id: string;
  name: string;
  owner: string;
  ownerInit: string;
  status: FranchiseStatus;
  /** Sidebar blue “New” tag next to franchise name */
  isNew?: boolean;
  /** Round avatar in detail infobar (optional). */
  ownerImageUrl?: string;
};

export type ListRow = {
  franchiseNo: string;
  name: string;
  isNew?: boolean;
  owner: {
    name: string;
    initials: string;
    bg: string;
    imageUrl?: string;
  };
  monthlyRevenue: string;
  customers: string;
  status: ListStatus;
  state: string;
  city: string;
  employees: string;
  address: string;
};

/** Used for the franchise detail sidebar (matches original `FRANCHISES` in `franchise-home.html`). */
export const FRANCHISES_DETAIL: FranchiseInSidebar[] = [
  {
    id: "#0205",
    name: "Omaha, NE",
    owner: "Annette Black",
    ownerInit: "AB",
    status: "nonfunc",
    isNew: true,
    ownerImageUrl: "https://www.figma.com/api/mcp/asset/0c004869-9095-44d4-950a-fd7e0019d858",
  },
  { id: "#2301", name: "Lincoln, NE", owner: "Matt Quinn", ownerInit: "MQ", status: "functional" },
  { id: "#2302", name: "Fremont, NE", owner: "Jodi Wimer", ownerInit: "JW", status: "functional" },
  { id: "#2303", name: "Norfolk, NE", owner: "Darin Smith", ownerInit: "DS", status: "functional" },
  { id: "#2304", name: "Kearney, NE", owner: "Don Crowell", ownerInit: "DC", status: "attention" },
  { id: "#2305", name: "Grand Island, NE", owner: "Derrick Dancy", ownerInit: "DD", status: "functional" },
  { id: "#2306", name: "Hastings, NE", owner: "Jeff Chovan and Jamie Chovan", ownerInit: "JC", status: "functional" },
  {
    id: "#2307",
    name: "Bellevue, NE",
    owner: "Traci Withrow and Kris Withrow",
    ownerInit: "TW",
    status: "functional",
  },
];

export const FRANCHISE_LIST: ListRow[] = [
  {
    franchiseNo: "#0205",
    name: "Omaha, NE",
    isNew: true,
    owner: { name: "Matt Quinn", initials: "MQ", bg: "#7c6fa0", imageUrl: "https://www.figma.com/api/mcp/asset/63502b56-d649-4afe-a9bc-b64eb410eb14" },
    monthlyRevenue: "$166,763",
    customers: "230",
    status: "nonfunc",
    state: "Nebraska",
    city: "Omaha",
    employees: "83",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#0230",
    name: "Fremont, NE",
    owner: { name: "Jodi Wimer", initials: "JW", bg: "#5b7fad", imageUrl: "https://www.figma.com/api/mcp/asset/4476a46a-fef7-455a-bc6e-7b66305542f2" },
    monthlyRevenue: "$222,114",
    customers: "450",
    status: "attention",
    state: "Nebraska",
    city: "Fremont",
    employees: "23",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#2456",
    name: "Norfolk, NE",
    owner: { name: "Darin Smith", initials: "DS", bg: "#6a8294", imageUrl: "https://www.figma.com/api/mcp/asset/b7f98d05-5df1-4d8b-b5bf-811704684e51" },
    monthlyRevenue: "$177,604",
    customers: "760",
    status: "functional",
    state: "Nebraska",
    city: "Norfolk",
    employees: "45",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Kearney, NE",
    owner: { name: "Don Crowell", initials: "DC", bg: "#3d6b42", imageUrl: "https://www.figma.com/api/mcp/asset/a3873765-1b52-4e92-b761-88e48c8210ba" },
    monthlyRevenue: "$87,533",
    customers: "540",
    status: "attention",
    state: "Nebraska",
    city: "Kearney",
    employees: "76",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#5556",
    name: "Grand Island, NE",
    owner: { name: "Derrick Dancy", initials: "DD", bg: "#7a9b6e", imageUrl: "https://www.figma.com/api/mcp/asset/84407932-d16e-4b51-83df-633b7f648be3" },
    monthlyRevenue: "$49,676",
    customers: "270",
    status: "functional",
    state: "Nebraska",
    city: "Grand Island",
    employees: "54",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#5345",
    name: "Lincoln, NE",
    owner: { name: "Ralph Edwards", initials: "RE", bg: "#b07848", imageUrl: "https://www.figma.com/api/mcp/asset/d0d50e0f-9387-405a-892b-e2618b16eadc" },
    monthlyRevenue: "$312,217",
    customers: "720",
    status: "functional",
    state: "Nebraska",
    city: "Lincoln",
    employees: "27",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8766",
    name: "Hastings, NE",
    owner: { name: "Jacob Jones", initials: "JJ", bg: "#a07040", imageUrl: "https://www.figma.com/api/mcp/asset/f43e63bd-1877-40d7-92ad-4ded23f181fe" },
    monthlyRevenue: "$166,016",
    customers: "320",
    status: "attention",
    state: "Nebraska",
    city: "Hastings",
    employees: "38",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8767",
    name: "Bellevue, NE",
    owner: { name: "Courtney Henry", initials: "CH", bg: "#5b7fa0" },
    monthlyRevenue: "$143,800",
    customers: "410",
    status: "attention",
    state: "Nebraska",
    city: "Bellevue",
    employees: "52",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8768",
    name: "Columbus, NE",
    owner: { name: "Darlene Robertson", initials: "DR", bg: "#9e6b7a" },
    monthlyRevenue: "$98,420",
    customers: "290",
    status: "attention",
    state: "Nebraska",
    city: "Columbus",
    employees: "41",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8769",
    name: "North Platte, NE",
    owner: { name: "Guy Hawkins", initials: "GH", bg: "#6b8c5a" },
    monthlyRevenue: "$74,330",
    customers: "180",
    status: "attention",
    state: "Nebraska",
    city: "North Platte",
    employees: "29",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8770",
    name: "Papillion, NE",
    owner: { name: "Darrell Steward", initials: "DS", bg: "#7a6b9e" },
    monthlyRevenue: "$121,500",
    customers: "360",
    status: "attention",
    state: "Nebraska",
    city: "Papillion",
    employees: "44",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8771",
    name: "La Vista, NE",
    owner: { name: "Eleanor Pena", initials: "EP", bg: "#c07060" },
    monthlyRevenue: "$109,750",
    customers: "310",
    status: "attention",
    state: "Nebraska",
    city: "La Vista",
    employees: "36",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8772",
    name: "Ralston, NE",
    owner: { name: "Alex Lee", initials: "AL", bg: "#4a7aa0" },
    monthlyRevenue: "$88,200",
    customers: "245",
    status: "attention",
    state: "Nebraska",
    city: "Ralston",
    employees: "31",
    address: "344, Orchard Apartments, 3808 S.",
  },
];

export type LotForModal = {
  no: string;
  name: string;
  state: string;
  opp: string;
  zips: string;
  status: "available" | "sold" | "pending";
};

export const LOTS_FOR_MODAL: LotForModal[] = [
  { no: "NB-006", name: "Northeast Nebraska", state: "Nebraska", opp: "675,959", zips: "60", status: "available" },
  { no: "NB-005", name: "Central Nebraska", state: "Nebraska", opp: "591,700", zips: "52", status: "available" },
  { no: "NB-002", name: "Omaha Metro", state: "Nebraska", opp: "820,400", zips: "74", status: "sold" },
  { no: "NB-004", name: "Lincoln Metro", state: "Nebraska", opp: "543,200", zips: "48", status: "sold" },
  { no: "NB-007", name: "Platte Valley", state: "Nebraska", opp: "412,800", zips: "38", status: "available" },
  { no: "NB-009", name: "Southeast Nebraska", state: "Nebraska", opp: "389,500", zips: "35", status: "pending" },
  { no: "NB-001", name: "Western Nebraska", state: "Nebraska", opp: "298,700", zips: "28", status: "pending" },
  { no: "NB-008", name: "Southwest Nebraska", state: "Nebraska", opp: "267,400", zips: "24", status: "pending" },
  { no: "NB-003", name: "Panhandle Nebraska", state: "Nebraska", opp: "198,600", zips: "18", status: "sold" },
  { no: "NB-010", name: "North Platte Corridor", state: "Nebraska", opp: "445,200", zips: "42", status: "available" },
  { no: "NB-011", name: "Norfolk Region", state: "Nebraska", opp: "312,900", zips: "33", status: "available" },
  { no: "NB-012", name: "Grand Island Area", state: "Nebraska", opp: "528,100", zips: "55", status: "sold" },
  { no: "NB-013", name: "Kearney Territory", state: "Nebraska", opp: "276,400", zips: "29", status: "available" },
];

export type LotTableRow = {
  name: string;
  state: string;
  no: number;
  price: number;
  opp: string;
  pop: string;
  zips: number;
  priority: number;
  franchise: string;
  status: "available" | "sold" | "pending";
};

export const LOTS_TABLE_DATA: LotTableRow[] = [
  { name: "NB-001", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Assign", status: "available" },
  { name: "NB-006", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Raleigh, NC", status: "available" },
  { name: "NB-002", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Orlando, FL", status: "sold" },
  { name: "NB-005", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Raleigh, NC", status: "sold" },
  { name: "NB-003", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Tucson, AZ", status: "available" },
  { name: "NB-009", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Assign", status: "pending" },
  { name: "NB-004", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Assign", status: "pending" },
  { name: "NB-006", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Assign", status: "pending" },
  { name: "NB-007", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Assign", status: "sold" },
  { name: "NB-008", state: "Nebraska", no: 1, price: 64, opp: "675,959", pop: "670,000", zips: 60, priority: 1, franchise: "Raleigh, NC", status: "available" },
];

export type EoiListEntry = { name: string; market: string; state: string; amount: string };

/** Right column on `/lots` — Expression of Interests (Figma: Home with EOI). */
export const EOI_LIST_ENTRIES: EoiListEntry[] = [
  { name: "Mike Orton", market: "Market 27", state: "Nebraska", amount: "$77k" },
  { name: "Carla Smith", market: "Market 12", state: "Nebraska", amount: "$120k" },
  { name: "Michael Fernandez", market: "Market 35", state: "Nebraska", amount: "$80k" },
  { name: "Henry Octane", market: "Market 12", state: "Nebraska", amount: "$57k" },
  { name: "Anna Smith", market: "Market 15", state: "Nebraska", amount: "$67k" },
  { name: "Richard K.", market: "Market 27", state: "Nebraska", amount: "$190k" },
];

export const OLD_FRANCHISE_MAP: Record<string, { id?: string; name: string; owner: string }> = {
  "NB-002": { id: "0502", name: "New Jersey", owner: "Matt Quinn" },
  "NB-004": { name: "Lincoln Metro, NE", owner: "Jodi Wimer" },
  "NB-003": { name: "Fremont, NE", owner: "Darin Smith" },
};

export function getDetailIndexForRow(listRowIndex: number): number {
  return listRowIndex % FRANCHISES_DETAIL.length;
}
