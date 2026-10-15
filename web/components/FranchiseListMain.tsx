"use client";

import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import ArrowDownwardOutlined from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { FranchiseDeactivationScheduleIcon } from "@/components/FranchiseDeactivationScheduleIcon";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FRANCHISE_LIST, INACTIVE_THIS_WEEK_FRANCHISE_NOS, INACTIVE_THIS_WEEK_FRANCHISE_NO_SET } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";
import { LotInsightsAppNav } from "./LotInsightsAppNav";
import { TableStatusBadge } from "./TableStatusBadge";

function ThSortIcon() {
  return <ArrowDownwardOutlined sx={oIcon(16, { color: "#6A6A70" })} aria-hidden />;
}

export type FranchiseListView = "default" | "scheduled-deactivation";

type FranchiseListMainProps = {
  view?: FranchiseListView;
};

export function FranchiseListMain({ view = "default" }: FranchiseListMainProps) {
  const router = useRouter();
  const [rowHover, setRowHover] = useState<number | null>(null);
  const [showTransitionBanner, setShowTransitionBanner] = useState(true);

  const franchiseRows = useMemo(
    () => FRANCHISE_LIST.map((row, index) => ({ row, index })),
    [],
  );

  const visibleFranchiseRows = useMemo(
    () =>
      view === "scheduled-deactivation"
        ? franchiseRows.filter(({ row }) => INACTIVE_THIS_WEEK_FRANCHISE_NO_SET.has(row.franchiseNo))
        : franchiseRows,
    [franchiseRows, view],
  );

  const inactiveThisWeekCount = INACTIVE_THIS_WEEK_FRANCHISE_NO_SET.size;
  const isScheduledDeactivationView = view === "scheduled-deactivation";

  const go = useCallback(
    (i: number) => {
      router.push(`/franchises/${i}`);
    },
    [router],
  );

  return (
    <div>
      <LotInsightsAppNav active="franchises" brandLabel="Franchise" />

      {isScheduledDeactivationView ? (
        <div className="franchise-list-subnav">
          <Link href="/franchises" className="franchise-list-subnav__back" prefetch>
            <ArrowBackOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
            Back
          </Link>
        </div>
      ) : showTransitionBanner ? (
        <div className="franchise-transition-banner" role="status">
          <FranchiseDeactivationScheduleIcon />
          <div className="franchise-transition-banner__body">
            <p className="franchise-transition-banner__title">
              {inactiveThisWeekCount} franchise{inactiveThisWeekCount === 1 ? "" : "s"} scheduled for deactivation
            </p>
            <p className="franchise-transition-banner__description">
              Review franchises scheduled to become inactive before the end of this week.
            </p>
          </div>
          <div className="franchise-transition-banner__actions">
            <button
              type="button"
              className="franchise-transition-banner__cta"
              onClick={() => router.push("/franchises/scheduled-deactivation")}
            >
              View franchises
              <ArrowForwardOutlined sx={oIcon(16)} aria-hidden />
            </button>
            <button
              type="button"
              className="franchise-transition-banner__close"
              aria-label="Dismiss banner"
              onClick={() => setShowTransitionBanner(false)}
            >
              <CloseOutlined
                sx={{ ...oIcon(20, { color: "#86868b" }), stroke: "none", strokeWidth: 0 }}
                aria-hidden
              />
            </button>
          </div>
        </div>
      ) : null}

      <div className="main">
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="search">
              <SearchOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
              <span className="search-text">Search by franchise id/name</span>
            </div>
            <div className="dropdown">
              <span>All Status</span>
              <KeyboardArrowDownOutlined sx={oIcon(24, { color: "currentColor" })} aria-hidden />
            </div>
            <div className="dropdown">
              <span>All Cities</span>
              <KeyboardArrowDownOutlined sx={oIcon(24, { color: "currentColor" })} aria-hidden />
            </div>
          </div>
          <div className="toolbar-right">
            <button type="button" className="refresh-btn" aria-label="Refresh">
              <RefreshOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
            </button>
            <button type="button" className="export-btn">
              <FileDownloadOutlined sx={oIcon(16, { color: "currentColor" })} aria-hidden />
              Export
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-area">
            <div className="sticky-cols">
              <div className="col w-no">
                <div className="th">
                  <span className="th-text">Franchise No.</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={row.franchiseNo + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.franchiseNo}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>
              <div className="col w-franchise">
                <div className="th">
                  <span className="th-text">Franchise</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={row.name + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.name}</span>
                      {row.isNew ? (
                        <span className="badge-new" aria-label="New franchise">
                          <span className="badge-new-txt">New</span>
                        </span>
                      ) : null}
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-cols">
              <div className="col w-owner">
                <div className="th">
                  <span className="th-text">Owner</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"o" + i}>
                    <div
                      className="td td-owner"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <div className="avatar" style={{ background: row.owner.bg }}>
                        {row.owner.imageUrl ? (
                          <Image
                            src={row.owner.imageUrl}
                            alt=""
                            width={24}
                            height={24}
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : null}
                        {row.owner.initials}
                      </div>
                      <span className="td-txt">{row.owner.name}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-rev">
                <div className="th">
                  <span className="th-text">Monthly Revenue</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"r" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.monthlyRevenue}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-cust">
                <div className="th">
                  <span className="th-text">No. of Customers</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"c" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.customers}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-status">
                <div className="th">
                  <span className="th-text">Status</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"s" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <TableStatusBadge status={row.status} />
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-state">
                <div className="th">
                  <span className="th-text">State</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"st" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.state}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-city">
                <div className="th">
                  <span className="th-text">City</span>
                  <ThSortIcon />
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"ci" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.city}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-emp">
                <div className="th">
                  <span className="th-text">No. of Employees</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"e" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.employees}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>

              <div className="col w-addr">
                <div className="th">
                  <span className="th-text">Address</span>
                </div>
                <div className="div" />
                {visibleFranchiseRows.map(({ row, index: i }) => (
                  <div key={"a" + i}>
                    <div
                      className="td"
                      style={{
                        cursor: "pointer",
                        background: rowHover === i ? "#f5f5f6" : undefined,
                      }}
                      onMouseEnter={() => setRowHover(i)}
                      onMouseLeave={() => setRowHover(null)}
                      onClick={() => go(i)}
                    >
                      <span className="td-txt">{row.address}</span>
                    </div>
                    <div className="div" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pagination">
            <span className="page-count">
              {isScheduledDeactivationView
                ? `1-${visibleFranchiseRows.length} of ${visibleFranchiseRows.length}`
                : "1-15 of 12,345"}
            </span>
            <div className="page-actions">
              <button type="button" className="page-btn" aria-label="Previous page">
                <ChevronLeftOutlined sx={oIcon(20, { color: "currentColor" })} aria-hidden />
              </button>
              <button type="button" className="page-btn" aria-label="Next page">
                <ChevronRightOutlined sx={oIcon(20, { color: "currentColor" })} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
