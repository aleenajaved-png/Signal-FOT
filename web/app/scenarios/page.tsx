import Link from "next/link";

const scenarios = [
  {
    title: "Franchise directory",
    path: "/franchises",
    text: "Browse the franchise data grid with search and filter affordances, pagination, and row hover states. This mirrors the `list-screen` block from the HTML prototype.",
  },
  {
    title: "Open franchise detail",
    path: "/franchises/0",
    text: "Click any row in the list (e.g. row index `0`–`12`) to open the detail view with sidebar, info bar, General Information, Associated Lots, and map. The selected sidebar item follows `rowIndex % 8` like the original script (`selectFranchise(rowIdx % FRANCHISES.length)`).",
  },
  {
    title: "Assign lots and transfer (sold lot)",
    path: "/franchises/0",
    text: "On detail, choose Add Lot, select rows in the modal, then Update. If a sold lot is selected, the Transfer Lot Ownership flow opens. Enter cut-off and effective dates (validation matches the static HTML behavior), then confirm to add a badge under Associated Lots.",
  },
  {
    title: "Lot insights",
    path: "/lots",
    text: "Stats bar, list/map toolbar, data table, pagination, and Expression of Interests side panel, aligned with the `lots-screen` section.",
  },
];

export default function ScenariosPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Prototype scenarios</h1>
      <p style={{ color: "#555", lineHeight: 1.5, marginBottom: 32 }}>
        The UI is carried over from <code>franchise-home.html</code> with file-based routes instead of <code>display:none</code> screen switching.
      </p>
      <ol style={{ paddingLeft: 20, lineHeight: 1.6 }}>
        {scenarios.map((s) => (
          <li key={s.path + s.title} style={{ marginBottom: 20 }}>
            <Link href={s.path} style={{ fontWeight: 600, color: "#0032a0" }}>
              {s.title}
            </Link>
            <p style={{ margin: "8px 0 0", color: "#333" }}>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
