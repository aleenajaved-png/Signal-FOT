"use client";

import ArrowDownwardOutlined from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FRANCHISE_LIST, INACTIVE_THIS_WEEK_FRANCHISE_NO_SET } from "@/lib/data";
import { oIcon } from "@/lib/muiIconSx";
import { LotInsightsAppNav } from "./LotInsightsAppNav";
import { TableStatusBadge } from "./TableStatusBadge";

function ThSortIcon() {
  return <ArrowDownwardOutlined sx={oIcon(16, { color: "#6A6A70" })} aria-hidden />;
}

export function FranchiseListMain() {
  const router = useRouter();
  const [rowHover, setRowHover] = useState<number | null>(null);
  const [showTransitionBanner, setShowTransitionBanner] = useState(true);
  const [showInactiveFranchisesOnly, setShowInactiveFranchisesOnly] = useState(false);

  const franchiseRows = useMemo(
    () => FRANCHISE_LIST.map((row, index) => ({ row, index })),
    [],
  );

  const visibleFranchiseRows = useMemo(
    () =>
      showInactiveFranchisesOnly
        ? franchiseRows.filter(({ row }) => INACTIVE_THIS_WEEK_FRANCHISE_NO_SET.has(row.franchiseNo))
        : franchiseRows,
    [franchiseRows, showInactiveFranchisesOnly],
  );

  const showInactiveFranchiseFilter = useCallback(() => {
    setShowInactiveFranchisesOnly(true);
  }, []);

  const go = useCallback(
    (i: number) => {
      router.push(`/franchises/${i}`);
    },
    [router],
  );

  return (
    <div>
      <LotInsightsAppNav active="franchises" brandLabel="Franchise" />

      {showTransitionBanner ? (
        <div className="franchise-transition-banner" role="status">
          <div className="franchise-transition-banner__lead">
            <p className="franchise-transition-banner__text">
              <strong className="franchise-transition-banner__emphasis">4 franchises</strong> are scheduled to be
              inactive this week.
            </p>
            <button type="button" className="franchise-transition-banner__view-all" onClick={showInactiveFranchiseFilter}>
              View all
              <ArrowForwardOutlined sx={oIcon(14, { color: "#0032a0" })} aria-hidden />
            </button>
          </div>
          <button
            type="button"
            className="franchise-transition-banner__close"
            aria-label="Dismiss banner"
            onClick={() => setShowTransitionBanner(false)}
          >
            <CloseOutlined sx={oIcon(18, { color: "#6b7280" })} aria-hidden />
          </button>
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
              {showInactiveFranchisesOnly
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
