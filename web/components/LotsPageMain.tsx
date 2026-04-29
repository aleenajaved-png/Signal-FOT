"use client";

import AddOutlined from "@mui/icons-material/AddOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import LocationOffOutlined from "@mui/icons-material/LocationOffOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SyncOutlined from "@mui/icons-material/SyncOutlined";
import { useState } from "react";
import { EOI_LIST_ENTRIES, LOTS_TABLE_DATA } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";
import { LotDetailsModal } from "./LotDetailsModal";
import { LotInsightsAppNav } from "./LotInsightsAppNav";

function TblStatus({ s }: { s: (typeof LOTS_TABLE_DATA)[0]["status"] }) {
  const c = <KeyboardArrowDownOutlined className="tbl-badge-chevron" sx={oIcon(12)} aria-hidden />;
  if (s === "available")
    return (
      <span className="tbl-badge-available">
        <span>Available</span>
        {c}
      </span>
    );
  if (s === "sold")
    return (
      <span className="tbl-badge-sold">
        <span>Sold</span>
        {c}
      </span>
    );
  return (
    <span className="tbl-badge-pending">
      <span>Pending</span>
      {c}
    </span>
  );
}

function AssignBtn() {
  return (
    <button type="button" className="assign-btn" aria-label="Assign franchise" onClick={(e) => e.stopPropagation()}>
      <span className="assign-icon">
        <AddOutlined sx={oIcon(12, { color: "#fff" })} aria-hidden />
      </span>
      Assign
    </button>
  );
}

export function LotsPageMain() {
  const stat = 18;
  const [detailRow, setDetailRow] = useState<(typeof LOTS_TABLE_DATA)[0] | null>(null);

  return (
    <div className="lots-page">
      <LotInsightsAppNav active="lots" brandLabel="Lot Insights" />

      <div className="lots-stats-bar">
        <div className="lots-stat-cell lots-stat-cell--active">
          <div>
            <div className="lots-stat-val">1000</div>
            <div className="lots-stat-label">Total Lots</div>
          </div>
          <div className="lots-stat-icon lots-stat-icon--teal">
            <PublicOutlined className="lots-stat-icon__svg" sx={oIcon(stat)} />
          </div>
        </div>
        <div className="lots-stat-cell">
          <div>
            <div className="lots-stat-val">632</div>
            <div className="lots-stat-label">Available Lots</div>
          </div>
          <div className="lots-stat-icon lots-stat-icon--blue">
            <LocationOnOutlined className="lots-stat-icon__svg" sx={oIcon(stat)} />
          </div>
        </div>
        <div className="lots-stat-cell">
          <div>
            <div className="lots-stat-val">340</div>
            <div className="lots-stat-label">Sold Lots</div>
          </div>
          <div className="lots-stat-icon lots-stat-icon--neutral">
            <LocationOffOutlined className="lots-stat-icon__svg" sx={oIcon(stat)} />
          </div>
        </div>
        <div className="lots-stat-cell">
          <div>
            <div className="lots-stat-val">42</div>
            <div className="lots-stat-label">Pending Lots</div>
          </div>
          <div className="lots-stat-icon lots-stat-icon--pending">
            <MapOutlined className="lots-stat-icon__svg" sx={oIcon(stat)} />
          </div>
        </div>
      </div>

      <div className="lots-toolbar">
        <div className="lots-toolbar-left">
          <div className="lots-search">
            <SearchOutlined sx={oIcon(16, { color: "#7d899b" })} aria-hidden />
            <input type="search" placeholder="Search by state, city, zip code" />
          </div>
          <button type="button" className="lots-price-btn">
            $ Price
            <KeyboardArrowDownOutlined className="lots-price-chevron" sx={oIcon(24, { color: "#546176" })} />
          </button>
        </div>
        <div className="lots-toolbar-right">
          <span className="lots-unassigned-link" style={{ cursor: "default" }}>
            Unassigned Zip Codes
            <OpenInNewOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
          </span>
          <div className="lots-view-toggle" role="group" aria-label="List or map view">
            <button type="button" className="lots-view-btn active">
              List View
            </button>
            <button type="button" className="lots-view-btn">
              Map View
            </button>
          </div>
          <button type="button" className="lots-create-btn">
            <AddOutlined sx={oIcon(16, { color: "#fff" })} aria-hidden />
            Create
          </button>
        </div>
      </div>

      <div className="lots-body">
        <div className="lots-table-area">
          <table className="lots-table">
            <thead>
              <tr>
                <th>Lot Name</th>
                <th>State Name</th>
                <th>Lot No.</th>
                <th>Lot Price $</th>
                <th>Lot Opportunity/year</th>
                <th>Population</th>
                <th>Total Zipcodes</th>
                <th>Lot Priority</th>
                <th>Franchise</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOTS_TABLE_DATA.map((row, i) => (
                <tr
                  key={row.name + i}
                  className="lots-table__row-clickable"
                  onClick={() => setDetailRow(row)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetailRow(row);
                    }
                  }}
                  tabIndex={0}
                  aria-label={`View lot details for ${row.name}`}
                >
                  <td className="lot-name-col">{row.name}</td>
                  <td className="lot-dim-col">{row.state}</td>
                  <td className="lot-dim-col">{row.no}</td>
                  <td className="lot-dim-col">{row.price}</td>
                  <td className="lot-dim-col">{row.opp}</td>
                  <td className="lot-dim-col">{row.pop}</td>
                  <td className="lot-dim-col">{row.zips}</td>
                  <td className="lot-dim-col">{row.priority}</td>
                  <td>{row.franchise === "Assign" ? <AssignBtn /> : <span className="lot-dark-col" style={{ fontFamily: "var(--fk), sans-serif", fontSize: 14, color: "#444446" }}>{row.franchise}</span>}</td>
                  <td>
                    <TblStatus s={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="lots-pagination">
            <div className="lots-rows-per-page">
              Rows per page :
              <select defaultValue="20" aria-label="Rows per page">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <span className="lots-page-info">1-10 of 10</span>
            <button type="button" className="lots-page-btn" aria-label="Previous page">
              <ChevronLeftOutlined sx={oIcon(18, { color: "#444446" })} />
            </button>
            <button type="button" className="lots-page-btn" aria-label="Next page">
              <ChevronRightOutlined sx={oIcon(18, { color: "#444446" })} />
            </button>
          </div>
        </div>

        <div className="lots-right-panel">
          <div className="eoi-header" style={{ padding: "24px 32px 0" }}>
            <div className="eoi-title-row">
              <div className="eoi-dot" />
              <span className="eoi-title">Expression of Interests</span>
            </div>
            <div className="eoi-arrow-btn">
              <ArrowForwardOutlined sx={oIcon(14, { color: "#444446" })} />
            </div>
          </div>
          <div className="eoi-recent-bar" style={{ padding: "12px 32px" }}>
            <span className="eoi-recent-label">Recent Entries</span>
            <button type="button" className="eoi-sync-btn">
              <SyncOutlined sx={oIcon(14, { color: "#fff" })} />
              Sync
            </button>
          </div>
          <div className="eoi-entries">
            {EOI_LIST_ENTRIES.map((entry) => (
              <div className="eoi-entry" key={entry.name + entry.market + entry.state}>
                <span className="eoi-entry-name">{entry.name}</span>
                <p className="eoi-entry-meta" aria-label={`${entry.market}, ${entry.state}, ${entry.amount}`}>
                  {entry.market}
                  <span className="eoi-entry-sep" aria-hidden>
                    &nbsp;·&nbsp;
                  </span>
                  {entry.state}
                  <span className="eoi-entry-sep" aria-hidden>
                    &nbsp;·&nbsp;
                  </span>
                  {entry.amount}
                </p>
              </div>
            ))}
          </div>
          <div className="eoi-footer">
            <span className="eoi-footer-text">Please refer to Hubspot for details of these requests.</span>
          </div>
        </div>
      </div>

      <LotDetailsModal row={detailRow} onClose={() => setDetailRow(null)} />
    </div>
  );
}
