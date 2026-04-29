"use client";

import AddCircleOutlined from "@mui/icons-material/AddCircleOutlined";
import AddOutlined from "@mui/icons-material/AddOutlined";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import OpenInFullOutlined from "@mui/icons-material/OpenInFullOutlined";
import PeopleOutlineOutlined from "@mui/icons-material/PeopleOutlineOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import SwapHorizOutlined from "@mui/icons-material/SwapHorizOutlined";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { LotTableRow } from "@/lib/data";
import { FIGMA_LOT_LEAD } from "@/lib/figma-lot-lead-assets";
import { oIcon } from "@/lib/muiIconSx";
import {
  formatFranchiseAssociationCell,
  formatLotIdTitle,
  franchiseAssociationDateColumnLabel,
  franchiseAssociationHistoryRows,
  lotDetailsNearby,
  lotStatusLabel,
  priceHistoryForRow,
} from "@/lib/lotDetailsData";

const HEAT = [
  { key: "housing", label: "Housing", color: "#e43f32" },
  { key: "dist", label: "Distribution", color: "#ff9332" },
  { key: "mfg", label: "Manufacturing", color: "#ffc517" },
  { key: "ind", label: "Industrial", color: "#146dff" },
  { key: "com", label: "Commercial", color: "#31a150" },
] as const;

/* Figma “Lead %” bar — labeled segments + remainder (sum 100) */
const BAR_SEGS = [
  { pct: 15, color: "#e43f32" },
  { pct: 33, color: "#ff9332" },
  { pct: 3, color: "#ffc517" },
  { pct: 20, color: "#146dff" },
  { pct: 3, color: "#31a150" },
] as const;

type Props = { row: LotTableRow | null; onClose: () => void };

export function LotDetailsModal({ row, onClose }: Props) {
  const [showLeads, setShowLeads] = useState(true);
  const titleId = useId();
  const cardsRef = useRef<HTMLDivElement>(null);

  const esc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!row) return;
    document.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
    };
  }, [row, esc]);

  if (!row) return null;

  const lotTitle = formatLotIdTitle(row.name);
  const priceUsd = row.price * 1000;
  const priceStr = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(priceUsd);
  const ph = priceHistoryForRow();
  const popDisplay = formatPopShort(row.pop);
  const status = row.status;
  const statusLabel = lotStatusLabel(status);
  const nearby = lotDetailsNearby;

  return (
    <div
      className="lot-details-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lot-details-dialog"
        role="dialog"
        aria-modal
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lot-details-dialog__head">
          <h2 className="lot-details-dialog__title" id={titleId}>
            Lot Details
          </h2>
          <div className="lot-details-dialog__head-actions">
            <button type="button" className="lot-details-icon-btn" aria-label="More options" onClick={() => {}}>
              <MoreVertOutlined sx={oIcon(20)} />
            </button>
            <button type="button" className="lot-details-icon-btn" aria-label="Close" onClick={onClose}>
              <CloseOutlined sx={oIcon(20)} />
            </button>
          </div>
        </div>

        <div className="lot-details-body">
          <div className="lot-details-left">
            <div className="lot-details-left__top">
              <div className="lot-details-left__row1">
                <p className="lot-details-lot-id">Lot {lotTitle}</p>
                <span className={`lot-details-badge lot-details-badge--${status === "available" ? "available" : status === "sold" ? "sold" : "pending"}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="lot-details-price">{priceStr}</p>
            </div>

            <div className="lot-details-meta">
              <div className="lot-details-meta__row">
                <PeopleOutlineOutlined sx={oIcon(16, { color: "#414c5c" })} />
                {popDisplay} population
              </div>
              <div className="lot-details-meta__row">
                <SwapHorizOutlined sx={oIcon(16, { color: "#414c5c" })} />
                310 Potential Leads
              </div>
              <div className="lot-details-meta__row">
                <SwapHorizOutlined sx={oIcon(16, { color: "#414c5c" })} />
                5,400 sq mi service area
              </div>
              <div className="lot-details-assign">
                <AddCircleOutlined sx={oIcon(16, { color: "#146dff" })} />
                <button type="button">Assign Franchise</button>
              </div>
              <div className="lot-details-zip">
                <PlaceOutlined sx={oIcon(16, { color: "#414c5c" })} />
                {row.zips} zipcodes
                <ExpandMoreOutlined sx={oIcon(16, { color: "#6a6a70" })} />
              </div>
            </div>

            <div className="lot-details-block">
              <h3>Why this Market?</h3>
              <p>
                This market is located in a dense urban area with strong infrastructure and business accessibility. Demand is primarily driven by
                residential development and housing services. Located in the Midwest, this area benefits from a central position and strong local
                networks.
              </p>
            </div>

            {(["primary", "secondary"] as const).map((key) => (
              <div key={key} className="lot-details-block">
                <h3>{key === "primary" ? "Price History" : "Franchise Association History"}</h3>
                {key === "primary" ? (
                  <div className="lot-details-ph-list">
                    <span className="lot-details-ph-dot" aria-hidden />
                    <p style={{ margin: 0, color: "#546176", fontSize: 14, lineHeight: "16px" }}>
                      <span style={{ color: "#7d899b" }}>Bought for </span>
                      <span style={{ color: "#272d37" }}>{ph.price}</span>
                      <span style={{ color: "#7d899b" }}> on </span>
                      <span style={{ color: "#272d37" }}>{ph.date}</span>
                    </p>
                  </div>
                ) : (
                  <FranchiseAssociationTable />
                )}
              </div>
            ))}
          </div>

          <div className="lot-details-right">
            <div className="lot-details-map-wrap">
              <div className="lot-details-map">
                <div className="lot-details-map__topbar">
                  <div className="lot-details-map__show">
                    <span>Show Leads</span>
                    <button
                      type="button"
                      className={showLeads ? "lot-details-toggle" : "lot-details-toggle lot-details-toggle--off"}
                      aria-pressed={showLeads}
                      aria-label="Toggle show leads on map"
                      onClick={() => setShowLeads((v) => !v)}
                    />
                  </div>
                  <div className="lot-details-map-legend">
                    {HEAT.map((h) => (
                      <span key={h.key} className="lot-details-legend-item">
                        <span className="lot-details-legend-swatch" style={{ background: h.color }} />
                        {h.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lot-details-map__image-area">
                  <Image
                    src={FIGMA_LOT_LEAD.mapHeatmap}
                    alt=""
                    fill
                    className="lot-details-map__img"
                    unoptimized
                    sizes="(max-width: 1300px) 90vw, 800px"
                    priority
                  />
                </div>
                <div className="lot-details-map__controls">
                  <button type="button" className="lot-details-map-ctrl" aria-label="Full screen">
                    <OpenInFullOutlined sx={oIcon(20)} />
                  </button>
                  <div className="lot-details-map-zoom">
                    <button type="button" aria-label="Zoom in">
                      <AddOutlined sx={oIcon(16)} />
                    </button>
                    <hr />
                    <button type="button" aria-label="Zoom out">
                      <RemoveOutlined sx={oIcon(16)} />
                    </button>
                  </div>
                </div>
                <div className="lot-details-map__layers">
                  <MapOutlined sx={oIcon(20, { color: "#444" })} />
                </div>
              </div>
            </div>

            <div className="lot-details-oppty">
              <h3>Where the Opportunity Is</h3>
              <div className="lot-details-oppty-card">
                <div className="lot-details-bar" style={{ flexDirection: "column", alignItems: "stretch" }}>
                  <div className="lot-details-bar">
                    <span className="lot-details-bar__label">Lead %</span>
                    <div className="lot-details-bar__track-col">
                      <div className="lot-details-bar__pct-row">
                        {BAR_SEGS.map((s, i) => (
                          <div key={`pct-${i}`} className="lot-details-bar__pct-cell" style={{ flex: s.pct, minWidth: 4 }}>
                            {s.pct}%
                          </div>
                        ))}
                      </div>
                      <div className="lot-details-bar__track">
                        {BAR_SEGS.map((s, i) => (
                          <div
                            key={i}
                            className="lot-details-bar__seg"
                            style={{ flex: s.pct, background: s.color, minWidth: 4 }}
                            title={`${s.pct}%`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lot-details-oppty-legend">
                  {HEAT.map((h) => (
                    <span key={h.key} className="lot-details-legend-item">
                      <span className="lot-details-legend-swatch" style={{ background: h.color }} />
                      {h.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lot-details-nearby">
              <div className="lot-details-nearby__head">
                <h3>Nearby Lots</h3>
                <div className="lot-details-nearby__nav">
                  <button
                    type="button"
                    aria-label="Scroll nearby lots left"
                    onClick={() => cardsRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                  >
                    <ChevronLeftOutlined sx={oIcon(14)} />
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll nearby lots right"
                    onClick={() => cardsRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                  >
                    <ChevronRightOutlined sx={oIcon(14)} />
                  </button>
                </div>
              </div>
              <div className="lot-details-nearby__cards" ref={cardsRef}>
                {nearby.map((c) => (
                  <div key={c.id} className="lot-details-card">
                    <div className="lot-details-card__top">
                      <p className="lot-details-card__title">Lot {c.id}</p>
                    </div>
                    <div className="lot-details-card__opp">
                      <SwapHorizOutlined sx={oIcon(16, { color: "#414c5c" })} />
                      {c.opp} Lot opportunity
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FranchiseAssociationTable() {
  const [open, setOpen] = useState<Record<string, boolean>>(() => ({}));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {franchiseAssociationHistoryRows.map((r, idx) => {
        const isOpen = open[r.franchise] ?? false;
        return (
          <div
            key={r.franchise}
            style={{
              borderTop: idx === 0 ? "none" : "1px solid #e6e6e7",
              paddingTop: idx === 0 ? 0 : 10,
            }}
          >
            <button
              type="button"
              onClick={() => setOpen((p) => ({ ...p, [r.franchise]: !isOpen }))}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
              aria-expanded={isOpen}
            >
              <span style={{ fontFamily: "var(--fk), sans-serif", fontSize: 14, color: "#272d37", textAlign: "left" }}>{r.franchise}</span>
              <ExpandMoreOutlined
                sx={oIcon(18, { color: "#6a6a70", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease" })}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 10, columnGap: 18 }}>
                <div style={{ fontSize: 12, color: "#7d899b" }}>{franchiseAssociationDateColumnLabel(r)}</div>
                <div style={{ fontSize: 12, color: "#272d37" }}>{formatFranchiseAssociationCell(r)}</div>

                <div style={{ fontSize: 12, color: "#7d899b" }}>Status</div>
                <div style={{ fontSize: 12, color: "#272d37" }}>
                  <span
                    className={
                      r.status === "active"
                        ? "lot-details-fa__status lot-details-fa__status--active"
                        : r.status === "inactive"
                          ? "lot-details-fa__status lot-details-fa__status--inactive"
                          : "lot-details-fa__status lot-details-fa__status--upcoming"
                    }
                  >
                    <span className="lot-details-fa__dot" aria-hidden />
                    {r.status === "active" ? "Active" : r.status === "inactive" ? "Inactive" : "Upcoming"}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function formatPopShort(raw: string): string {
  const n = Number(String(raw).replace(/,/g, ""));
  if (Number.isFinite(n) && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (Number.isFinite(n) && n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return raw;
}
