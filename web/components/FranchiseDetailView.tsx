"use client";

import Link from "next/link";
import AddOutlined from "@mui/icons-material/AddOutlined";
import AppsOutlined from "@mui/icons-material/AppsOutlined";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LinkOffOutlined from "@mui/icons-material/LinkOffOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { oIcon } from "@/lib/muiIconSx";
import { FRANCHISES_DETAIL, getDetailIndexForRow, LOTS_FOR_MODAL } from "@/lib/data";
import { FRANCHISE_MAP_BASE_SRC, FRANCHISE_MAP_LOT_CALLOUT_POS, FRANCHISE_MAP_POLYGON_LAYERS } from "@/lib/lotMapData";
import { AssignLotsModal } from "./AssignLotsModal";
import { LotInsightsAppNav } from "./LotInsightsAppNav";
import { DetailStatusPill } from "./DetailStatusPill";
import { TableStatusBadge } from "./TableStatusBadge";

type Assigned = { no: string; state: string; effectiveDate: string; isNewFromTransfer?: boolean };
type PreviousAssigned = { no: string; state: string; transitionedAt: string };

const DEFAULT_EFFECTIVE_AT = new Date(2026, 3, 1, 12, 0, 0);

/** Set to true to show the left “Effective Date” cell in the franchise infobar. */
const SHOW_INFOBAR_LEFT_EFFECTIVE_DATE = false;

function formatFranchiseEffectiveDateLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "2-digit" });
}

/**
 * Input may be a prior short format ("Jan 5, 2026"), m/d/yy, ISO, or the current label style ("April 1, 26").
 * Output is always: "Month D, yy" (e.g. "April 1, 26").
 */
function formatFranchiseEffectiveFromDisplayString(input: string): string {
  const parsed = parseFranchiseEffectiveString(input);
  if (!parsed) return input;
  return formatFranchiseEffectiveDateLabel(parsed);
}

const MONTH_NAME_TO_I: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseFranchiseEffectiveString(s: string): Date | null {
  const t = s.trim();
  if (!t) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) {
    const d = new Date(`${t.slice(0, 10)}T12:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const mdy = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (mdy) {
    const mon = parseInt(mdy[1], 10) - 1;
    const day = parseInt(mdy[2], 10);
    let y = parseInt(mdy[3], 10);
    if (y < 100) y += 2000;
    const d = new Date(y, mon, day, 12, 0, 0, 0);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const longForm = t.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{2,4})$/i);
  if (longForm) {
    const mKey = longForm[1].toLowerCase();
    const mon = MONTH_NAME_TO_I[mKey];
    if (mon === undefined) return null;
    const day = parseInt(longForm[2], 10);
    let y = parseInt(longForm[3], 10);
    if (y < 100) y += 2000;
    const d = new Date(y, mon, day, 12, 0, 0, 0);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const direct = new Date(t);
  if (!Number.isNaN(direct.getTime())) return direct;
  return null;
}

const effectiveDateBadgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 10px",
  borderRadius: 100,
  background: "rgba(20, 109, 255, 0.1)",
  border: "1px solid rgba(20, 109, 255, 0.25)",
  fontFamily: "var(--fk), sans-serif",
  fontSize: 13,
  lineHeight: "18px",
  color: "#0032a0",
  fontWeight: 500,
  whiteSpace: "nowrap",
};

function OwnerInfobarCell({
  cellId,
  ownerInit,
  owner,
  ownerImageUrl,
  assigned = [],
  label = "Owner",
  showAvatar = true,
  variant = "owner",
  /** Shown in the effective-date badge when no lot has an effective date yet. */
  defaultEffectiveDate = formatFranchiseEffectiveDateLabel(DEFAULT_EFFECTIVE_AT),
  "aria-label": ariaLabel,
}: {
  cellId: string;
  ownerInit: string;
  owner: string;
  ownerImageUrl?: string;
  assigned?: Assigned[];
  label?: string;
  showAvatar?: boolean;
  variant?: "owner" | "effectiveDate";
  defaultEffectiveDate?: string;
  "aria-label"?: string;
}) {
  const latestEffective = assigned.length > 0 ? assigned[assigned.length - 1].effectiveDate : null;
  const badgeDate = formatFranchiseEffectiveFromDisplayString(latestEffective ?? defaultEffectiveDate);
  const titleLong = (() => {
    const p = parseFranchiseEffectiveString(latestEffective ?? defaultEffectiveDate);
    return p ? p.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : badgeDate;
  })();

  if (variant === "effectiveDate") {
    return (
      <div className="d-infobar-cell" id={cellId} aria-label={ariaLabel}>
        <span className="d-cell-label">{label}</span>
        <div className="d-owner-row" style={{ marginTop: 2 }}>
          <span
            className="d-owner-name"
            style={{ display: "inline-flex" }}
            title={titleLong}
          >
            <span style={effectiveDateBadgeStyle}>{badgeDate}</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-infobar-cell" id={cellId} aria-label={ariaLabel}>
      <span className="d-cell-label">{label}</span>
      <div className="d-owner-row">
        {showAvatar &&
          (ownerImageUrl ? (
            <Image
              src={ownerImageUrl}
              alt={owner}
              width={20}
              height={20}
              unoptimized
              className="d-infobar-owner-avatar"
            />
          ) : (
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#c7b9da",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "var(--inter), sans-serif",
              }}
              aria-hidden
            >
              {ownerInit}
            </div>
          ))}
        <span className="d-owner-name">{owner}</span>
      </div>
    </div>
  );
}

type Props = { listRowId: number };

export function FranchiseDetailView({ listRowId }: Props) {
  const [selected, setSelected] = useState(() => getDetailIndexForRow(listRowId));
  const [assignOpen, setAssignOpen] = useState(false);
  const [assigned, setAssigned] = useState<Assigned[]>([
    { no: "NB-009", state: "Nebraska", effectiveDate: "Apr 1, 26" },
  ]);
  const [previousAssigned] = useState<PreviousAssigned[]>([]);
  const f = FRANCHISES_DETAIL[selected];

  const openAssign = useCallback(() => setAssignOpen(true), []);

  useEffect(() => {
    document.body.style.overflow = assignOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [assignOpen]);

  /** Active + previous lots, deduped (active wins) — same set drives Associated Lots and the map. */
  const mapLots = useMemo(() => {
    const m = new Map<string, { no: string; state: string; kind: "active" | "previous"; isNew?: boolean }>();
    for (const a of assigned) {
      m.set(a.no, {
        no: a.no,
        state: a.state,
        kind: "active",
        isNew: a.isNewFromTransfer === true,
      });
    }
    for (const p of previousAssigned) {
      if (!m.has(p.no)) m.set(p.no, { no: p.no, state: p.state, kind: "previous" });
    }
    return Array.from(m.values());
  }, [assigned, previousAssigned]);

  const lotNosOnMap = useMemo(() => new Set(mapLots.map((l) => l.no)), [mapLots]);

  const newlyAddedLotNos = useMemo(
    () => new Set(assigned.filter((a) => a.isNewFromTransfer === true).map((a) => a.no)),
    [assigned],
  );

  return (
    <div className="d-page">
      <LotInsightsAppNav active="franchises" brandLabel="Franchise" />

      <div className="d-sidebar">
        <div className="d-search-wrap">
          <div className="d-search-box">
            <SearchOutlined sx={oIcon(20, { color: "#7d899b" })} aria-hidden />
            <input type="search" placeholder="Search" autoComplete="off" />
          </div>
        </div>
        <div>
          {FRANCHISES_DETAIL.map((fr, i) => (
            <div
              key={fr.id + i}
              className={"d-fitem" + (i === selected ? " sel" : "")}
              onClick={() => setSelected(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(i)}
            >
              <div className="fi-title-row">
                <span className="fi-title">{fr.name}</span>
                {fr.isNew ? <span className="fi-new-tag">New</span> : null}
              </div>
              <div className="fi-sub">{fr.owner}</div>
              <div className="fi-tags">
                <span className="fi-id">{fr.id}</span>
                {fr.status === "nonfunc" && <TableStatusBadge status="nonfunc" />}
                {fr.status === "attention" && <TableStatusBadge status="attention" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-main">
        <div className="d-infobar">
          <div className="d-infobar-franchise">
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8eaf0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AppsOutlined sx={oIcon(22, { color: "#3B5BDB" })} aria-hidden />
            </div>
            <div className="d-franchise-meta">
              <div style={{ display: "inline-flex", background: "rgba(159,159,159,0.1)", borderRadius: 2, padding: "1px 4px", width: "fit-content" }}>
                <span style={{ fontSize: 12, color: "#262527" }}>{f.id}</span>
              </div>
              <div className="d-franchise-namerow">
                <span className="d-franchise-name">{f.name}</span>
                {f.isNew ? <span className="d-infobar-new-tag">New</span> : null}
              </div>
            </div>
          </div>

          {SHOW_INFOBAR_LEFT_EFFECTIVE_DATE && (
            <OwnerInfobarCell
              cellId="owner-infobar-cell-left"
              label="Effective Date"
              variant="effectiveDate"
              ownerInit={f.ownerInit}
              owner={f.owner}
              assigned={assigned}
              aria-label="Effective Date (left)"
            />
          )}
          <OwnerInfobarCell cellId="owner-infobar-cell" ownerInit={f.ownerInit} owner={f.owner} ownerImageUrl={f.ownerImageUrl} />

          <div className="d-infobar-cell">
            <span className="d-cell-label">Status</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#eff8ef", borderRadius: 16, padding: "2px 8px 2px 6px", width: "fit-content" }}>
              <CheckCircleOutlineOutlined sx={oIcon(12, { color: "#2e964b" })} aria-hidden />
              <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 12, color: "#2e964b", lineHeight: "18px" }}>Active</span>
            </div>
          </div>

          <div className="d-infobar-cell" style={{ borderRight: "none" }}>
            <span className="d-cell-label">Operations</span>
            <DetailStatusPill status={f.status} />
          </div>
        </div>

        <div className="d-tabs-bar">
          <button type="button" className="d-tab active">
            General Information
          </button>
          <button type="button" className="d-tab">
            Settings
          </button>
          <div className="d-tabs-action">
            <button type="button" className="d-make-btn">
              <InfoOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
              Make it Functional
            </button>
          </div>
        </div>

        <div className="d-content">
          <div className="d-top-grid">
            <div className="d-section">
              <div className="d-section-head">
                <span className="d-section-title">Franchise Information</span>
                <EditOutlined className="d-edit-icon" sx={oIcon(16, { color: "currentColor" })} aria-hidden />
              </div>
              <div className="d-fields-row">
                <div className="d-col">
                  <div className="d-field">
                    <span className="d-flabel">Franchise Name</span>
                    <span className="d-fvalue">Omaha, NE</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Functional Date</span>
                    <span className="d-fvalue">Dec 2026</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Email</span>
                    <span className="d-fvalue">traci@teamsignal.com</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Phone</span>
                    <span className="d-fvalue">123 456 7899</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Work Cell Number</span>
                    <span className="d-fvalue">123 456 7899</span>
                  </div>
                </div>
                <div className="d-col">
                  <div className="d-field">
                    <span className="d-flabel">Country</span>
                    <span className="d-fvalue">United State</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Region/State</span>
                    <span className="d-fvalue">Nebraska</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">City</span>
                    <span className="d-fvalue">Omaha</span>
                  </div>
                  <div className="d-field">
                    <span className="d-flabel">Address</span>
                    <span className="d-fvalue">
                      344, Orchard
                      <br />
                      Apartments, 3808 S.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-section">
              <div className="d-section-head">
                <span className="d-section-title">Additional Contacts</span>
                <EditOutlined className="d-edit-icon" sx={oIcon(16, { color: "currentColor" })} aria-hidden />
              </div>
              <div className="d-contact">
                <span className="d-clabel">Person 1</span>
                <div className="d-cname-row">
                  <span className="d-cname">Augustus Waters</span>
                </div>
                <div className="d-cdetails">
                  <span className="d-cemail">augustus@teamsignal.com</span>
                  <span className="d-cphone">+1-843-225-7754</span>
                </div>
              </div>
            </div>

            <div className="d-section">
              <div className="d-section-head">
                <span className="d-section-title">Associated Lots</span>
                <button
                  type="button"
                  onClick={openAssign}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: "pointer",
                    color: "#146dff",
                    fontFamily: "var(--fk), sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <AddOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
                  Add Lot
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#262527" }}>Active lots</div>
                  {assigned.length === 0 ? (
                    <div style={{ fontSize: 13, color: "#86868b" }}>No active lots.</div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {assigned.map((a, i) => {
                        const isNew = a.isNewFromTransfer === true;
                        const badge = (
                          <div
                            key={a.no + i}
                            className={isNew ? "lot-assigned-badge lot-assigned-badge--new" : "lot-assigned-badge"}
                          >
                            <span className="lab-no">{a.no}</span>
                            {isNew && (
                              <span className="lab-edd">
                                Effective from {formatFranchiseEffectiveFromDisplayString(a.effectiveDate)}
                              </span>
                            )}
                          </div>
                        );
                        return isNew ? (
                          <Link
                            key={a.no + i}
                            href="/franchise-dashboard"
                            style={{ textDecoration: "none" }}
                            title={`Open ${a.no} dashboard`}
                          >
                            {badge}
                          </Link>
                        ) : (
                          badge
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="d-bottom-grid">
            <div className="d-bottom-section d-bottom-section--full">
              <div className="d-bottom-title">Franchise Lots Map</div>
              <div className="d-map" style={{ position: "relative" }}>
                <Image
                  className="d-map-base"
                  src={FRANCHISE_MAP_BASE_SRC}
                  alt="Franchise lots map"
                  fill
                  sizes="(max-width: 1200px) 100vw, 918px"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />

                <div className="d-map-overlay" aria-hidden>
                  {FRANCHISE_MAP_POLYGON_LAYERS.filter((layer) => lotNosOnMap.has(layer.lotNo)).map((layer) => {
                    const isNb007 = layer.lotNo === "NB-007";
                    const isNewOnMap = newlyAddedLotNos.has(layer.lotNo);
                    const polyClass = [
                      "d-map-polygon",
                      isNb007 && "d-map-polygon--nb007",
                      isNewOnMap && "d-map-polygon--new",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <img
                        key={layer.lotNo}
                        src={layer.src}
                        alt=""
                        className={polyClass}
                        style={{ top: layer.top, left: layer.left, width: layer.width, height: layer.height }}
                      />
                    );
                  })}
                </div>
                <div className="d-map-overlay" aria-label="Associated lots on map">
                  {mapLots.map((lot) => {
                    const pos = FRANCHISE_MAP_LOT_CALLOUT_POS[lot.no];
                    if (!pos) return null;
                    const calloutClass =
                      lot.kind === "previous"
                        ? "d-map-lot-callout d-map-lot-callout--previous"
                        : lot.isNew
                          ? "d-map-lot-callout d-map-lot-callout--new"
                          : "d-map-lot-callout";
                    return (
                      <div key={`${lot.kind}-${lot.no}`} className={calloutClass} style={{ top: pos.top, left: pos.left }}>
                        {lot.no}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {assignOpen && (
        <AssignLotsModal
          onClose={() => setAssignOpen(false)}
          newFranchiseName={f.name}
          newFranchiseId={f.id}
          onAssignLots={(lotIndices) => {
            const newLots = lotIndices
              .map((i) => LOTS_FOR_MODAL[i])
              .filter(Boolean)
              .filter((lot) => !assigned.some((a) => a.no === lot.no))
              .map((lot) => ({
                no: lot.no,
                state: lot.state,
                effectiveDate: formatFranchiseEffectiveDateLabel(new Date()),
              }));
            if (newLots.length > 0) setAssigned((prev) => [...prev, ...newLots]);
          }}
          onConfirmTransfer={(lotIndex, effectiveValue, _transferAllUsers, allSelectedIndices) => {
            const d = new Date(`${effectiveValue}T12:00:00`);
            const formatted = formatFranchiseEffectiveDateLabel(d);
            const indicesToAdd = allSelectedIndices.length > 0 ? allSelectedIndices : [lotIndex];
            const newLots = indicesToAdd
              .map((i) => LOTS_FOR_MODAL[i])
              .filter(Boolean)
              .filter((lot) => !assigned.some((a) => a.no === lot.no))
              .map((lot) => ({
                no: lot.no,
                state: lot.state,
                effectiveDate: formatted,
                isNewFromTransfer: true,
              }));
            if (newLots.length > 0) setAssigned((prev) => [...prev, ...newLots]);
          }}
        />
      )}
    </div>
  );
}
