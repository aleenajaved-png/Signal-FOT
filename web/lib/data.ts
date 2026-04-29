export type FranchiseStatus = "nonfunc" | "functional" | "attention";

export type ListStatus = "nonfunc" | "functional" | "attention";

export type FranchiseInSidebar = {
  id: string;
  name: string;
  owner: string;
  ownerInit: string;
  status: FranchiseStatus;
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
  { id: "#4500", name: "Wichita, KS", owner: "Annette Black", ownerInit: "AB", status: "nonfunc" },
  { id: "#2301", name: "Northern Virginia, VA", owner: "Matt Quinn", ownerInit: "MQ", status: "functional" },
  { id: "#2302", name: "Fremont, NE", owner: "Jodi Wimer", ownerInit: "JW", status: "functional" },
  { id: "#2303", name: "Oklahoma City, NE", owner: "Darin Smith", ownerInit: "DS", status: "functional" },
  { id: "#2304", name: "Boise, ID", owner: "Don Crowell", ownerInit: "DC", status: "attention" },
  { id: "#2305", name: "Anchorage, AK", owner: "Derrick Dancy", ownerInit: "DD", status: "functional" },
  { id: "#2300", name: "Denver, CO", owner: "Jeff Chovan and Jamie Chovan", ownerInit: "JC", status: "functional" },
  {
    id: "#2300",
    name: "Wichita, KS",
    owner: "Traci Withrow and Kris Withrow",
    ownerInit: "TW",
    status: "functional",
  },
];

export const FRANCHISE_LIST: ListRow[] = [
  {
    franchiseNo: "#4500",
    name: "Northern Virginia, VA",
    isNew: true,
    owner: { name: "Matt Quinn", initials: "MQ", bg: "#7c6fa0", imageUrl: "https://www.figma.com/api/mcp/asset/63502b56-d649-4afe-a9bc-b64eb410eb14" },
    monthlyRevenue: "$166,763",
    customers: "230",
    status: "nonfunc",
    state: "Texas",
    city: "San Diego",
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
    state: "Florida",
    city: "San Jose",
    employees: "23",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#2456",
    name: "Oklahoma City, NE",
    owner: { name: "Darin Smith", initials: "DS", bg: "#6a8294", imageUrl: "https://www.figma.com/api/mcp/asset/b7f98d05-5df1-4d8b-b5bf-811704684e51" },
    monthlyRevenue: "$177,604",
    customers: "760",
    status: "functional",
    state: "Ohio",
    city: "Chicago",
    employees: "45",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Boise, ID",
    owner: { name: "Don Crowell", initials: "DC", bg: "#3d6b42", imageUrl: "https://www.figma.com/api/mcp/asset/a3873765-1b52-4e92-b761-88e48c8210ba" },
    monthlyRevenue: "$87,533",
    customers: "540",
    status: "attention",
    state: "Hawaii",
    city: "Dallas",
    employees: "76",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#5556",
    name: "Anchorage, AK",
    owner: { name: "Derrick Dancy", initials: "DD", bg: "#7a9b6e", imageUrl: "https://www.figma.com/api/mcp/asset/84407932-d16e-4b51-83df-633b7f648be3" },
    monthlyRevenue: "$49,676",
    customers: "270",
    status: "functional",
    state: "Alaska",
    city: "Seattle",
    employees: "54",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#5345",
    name: "Denver, CO",
    owner: { name: "Ralph Edwards", initials: "RE", bg: "#b07848", imageUrl: "https://www.figma.com/api/mcp/asset/d0d50e0f-9387-405a-892b-e2618b16eadc" },
    monthlyRevenue: "$312,217",
    customers: "720",
    status: "functional",
    state: "Virginia",
    city: "San Fransisco",
    employees: "27",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Jacob Jones", initials: "JJ", bg: "#a07040", imageUrl: "https://www.figma.com/api/mcp/asset/f43e63bd-1877-40d7-92ad-4ded23f181fe" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Courtney Henry", initials: "CH", bg: "#5b7fa0" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Darlene Robertson", initials: "DR", bg: "#9e6b7a" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Guy Hawkins", initials: "GH", bg: "#6b8c5a" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Darrell Steward", initials: "DS", bg: "#7a6b9e" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Eleanor Pena", initials: "EP", bg: "#c07060" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
    address: "344, Orchard Apartments, 3808 S.",
  },
  {
    franchiseNo: "#8765",
    name: "Wichita County, TX",
    owner: { name: "Alex Lee", initials: "AL", bg: "#4a7aa0" },
    monthlyRevenue: "$166,016",
    customers: "720",
    status: "attention",
    state: "New Jersey",
    city: "Houston",
    employees: "72",
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
  { no: "NB-006", name: "1", state: "Colorado", opp: "675,959", zips: "60", status: "available" },
  { no: "NB-005", name: "1", state: "Georgia", opp: "675,959", zips: "60", status: "available" },
  { no: "NB-002", name: "1", state: "New York", opp: "675,959", zips: "60", status: "sold" },
  { no: "NB-004", name: "1", state: "Illinois", opp: "675,959", zips: "60", status: "sold" },
  { no: "NB-007", name: "1", state: "Oregon", opp: "675,959", zips: "60", status: "available" },
  { no: "NB-009", name: "1", state: "California", opp: "675,959", zips: "60", status: "pending" },
  { no: "NB-001", name: "1", state: "Washington", opp: "675,959", zips: "60", status: "pending" },
  { no: "NB-008", name: "1", state: "Texas", opp: "675,959", zips: "60", status: "pending" },
  { no: "NB-003", name: "1", state: "Florida", opp: "675,959", zips: "60", status: "sold" },
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
  { name: "Mike Orton", market: "Market 27", state: "Ohio", amount: "$77k" },
  { name: "Carla Smith", market: "Market 12", state: "Nebraska", amount: "$120k" },
  { name: "Micheal Fernendez", market: "Market 35", state: "Kansas", amount: "$80k" },
  { name: "Henry Octane", market: "Market 12", state: "Nebraska", amount: "$57k" },
  { name: "Anna Smith", market: "Market 15", state: "Texas", amount: "$67k" },
  { name: "Richard K.", market: "Market 27", state: "Florida", amount: "$190k" },
];

export const OLD_FRANCHISE_MAP: Record<string, { id?: string; name: string; owner: string }> = {
  "NB-002": { id: "2033", name: "Northern Virginia, VA", owner: "Matt Quinn" },
  "NB-004": { name: "Fremont, NE", owner: "Jodi Wimer" },
  "NB-003": { name: "Oklahoma City, NE", owner: "Darin Smith" },
};

export function getDetailIndexForRow(listRowIndex: number): number {
  return listRowIndex % FRANCHISES_DETAIL.length;
}
