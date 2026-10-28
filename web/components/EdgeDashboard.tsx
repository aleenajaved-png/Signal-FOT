"use client";

import DirectionsCarFilledOutlined from "@mui/icons-material/DirectionsCarFilledOutlined";
import KeyboardArrowLeftOutlined from "@mui/icons-material/KeyboardArrowLeftOutlined";
import StarOutlineOutlined from "@mui/icons-material/StarOutlineOutlined";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { oIcon } from "@/lib/muiIconSx";
import "./edge-dashboard.css";

const NAV: { icon: ReactNode; active?: boolean; badge?: boolean; label: string }[] = [
  { icon: <Image src="/edge/nav-dashboard.svg" alt="" width={20} height={20} />, active: true, label: "Dashboard" },
  { icon: <Image src="/edge/nav-codepen.svg" alt="" width={20} height={20} />, label: "Locations" },
  { icon: <Image src="/edge/nav-calendar.svg" alt="" width={20} height={20} />, label: "Schedule" },
  { icon: <NavUsers />, badge: true, label: "Users" },
  { icon: <NavPerson />, label: "Officers" },
  { icon: <Image src="/edge/nav-clipboard.svg" alt="" width={20} height={20} />, label: "Contracts" },
  { icon: <NavPhone />, label: "Dispatch" },
  { icon: <NavGrid />, label: "Sites" },
  { icon: <NavChart />, label: "Reports" },
  { icon: <NavCar />, label: "Vehicles" },
  { icon: <Image src="/edge/nav-settings.svg" alt="" width={20} height={20} />, label: "Settings" },
];

const LIVE_OPS = [
  ["Contract Addendums", "01"],
  ["Unassigned Shifts", "02"],
  ["Non-functional Sites", "02"],
  ["Time off Requests", "10"],
  ["Officers on Time-Off", "06"],
  ["Officers Absent", "02"],
  ["Missed Hits", "10"],
  ["Dispatch New Alarms", "10"],
];

const MAP_SECTIONS: { id: string; tone: "blue" | "orange"; points: string; left: string; top: string }[] = [
  { id: "NY-006", tone: "blue", points: "38.6,48.6 41.8,46.6 45.4,47.4 46.6,50.6 45,55 41.8,56.2 39,54.6 37.8,51.4", left: "42%", top: "51%" },
  { id: "NY-010", tone: "blue", points: "47.4,44.2 53.4,43 57,45.4 56.2,50.2 52.6,53 48.6,51.4 47,47.4", left: "52%", top: "47%" },
  { id: "NY-002", tone: "blue", points: "37.4,56.6 45.8,55.8 47.4,59.4 45,63.4 39.8,64.2 35.8,61 36.2,57.8", left: "41%", top: "60%" },
  { id: "NY-001", tone: "orange", points: "31.4,62.6 48.6,61.4 50.2,67.4 35.8,69.4 29.8,66.6 30.6,63.4", left: "40%", top: "65%" },
];

const JOBS = [
  {
    name: "Augustus Waters",
    avatar: "/edge/avatar-augustus.png",
    kind: "Patrol Job",
    kindColor: "#e43f32",
    site: "Orlando Day Time Patrol",
    icon: "car" as const,
  },
  {
    name: "Mark Henry",
    avatar: "/edge/avatar-mark.png",
    kind: "Extra Job",
    kindColor: "#146dff",
    site: "Zorinski Lake",
    icon: "star" as const,
  },
  {
    name: "Mark Henry",
    avatar: "/edge/avatar-mark.png",
    kind: "Patrol Job",
    kindColor: "#e43f32",
    site: "Orlando Day Time Patrol",
    icon: "car" as const,
  },
];

export function EdgeDashboard() {
  const [series, setSeries] = useState<"dedicated" | "patrol">("dedicated");
  const [billingOpen, setBillingOpen] = useState(false);

  useEffect(() => {
    if (!billingOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBillingOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [billingOpen]);

  return (
    <div className="edge-dash">
      <aside className="edge-dash__nav" aria-label="Edge navigation">
        <Image src="/edge/logo.svg" alt="Signal" width={72} height={54} className="edge-dash__logo" priority />
        <div className="edge-dash__nav-list">
          {NAV.map(({ icon, active, badge, label }) => (
            <button
              key={label}
              type="button"
              className={"edge-dash__nav-btn" + (active ? " is-active" : "")}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              {icon}
              {badge ? <span className="edge-dash__nav-dot" aria-hidden /> : null}
            </button>
          ))}
        </div>
        <button type="button" className="edge-dash__collapse" aria-label="Collapse navigation">
          <KeyboardArrowLeftOutlined sx={oIcon(16, { color: "#444446" })} />
        </button>
      </aside>

      <div className="edge-dash__main">
        <header className="edge-dash__header">
          <div className="edge-dash__crumb">
            <Image src="/edge/ic-home.svg" alt="" width={20} height={20} />
            <span>Dashboard</span>
          </div>
          <div className="edge-dash__header-right">
            <span className="edge-dash__pill">US Central Time</span>
            <span className="edge-dash__pill">ID: 1234</span>
            <button type="button" className="edge-dash__location">
              #709 Columbus, Georgia
              <Image src="/edge/ic-chevron.svg" alt="" width={20} height={20} />
            </button>
            <button type="button" className="edge-dash__icon-btn" aria-label="Notifications">
              <Image src="/edge/ic-bell.svg" alt="" width={20} height={20} />
            </button>
            <button type="button" className="edge-dash__icon-btn" aria-label="Messages">
              <Image src="/edge/ic-message.svg" alt="" width={20} height={20} />
            </button>
            <button type="button" className="edge-dash__profile">
              <Image src="/edge/avatar-aleena.png" alt="" width={32} height={32} className="edge-dash__avatar" unoptimized />
              <span className="edge-dash__profile-text">
                <span>Aleena</span>
                <span>Franchise Owner</span>
              </span>
              <Image src="/edge/ic-profile-chevron.svg" alt="" width={14} height={14} />
            </button>
          </div>
        </header>

        <div className="edge-dash__body">
          <div className="edge-dash__content">
            <div className="edge-dash__welcome">
              <div>
                <h1>Hi Aleena, Welcome to Signal dashboard 👋</h1>
                <p>Below are your franchise&apos;s insights</p>
              </div>
              <button type="button" className="edge-dash__range">
                01/14/2024 - 01/18/2024
                <Image src="/edge/ic-calendar.svg" alt="" width={16} height={16} />
              </button>
            </div>

            <section className="edge-dash__stats" aria-label="Franchise insights">
              <Stat icon="/edge/stat-sites.svg" label="Functional Sites" value="100" />
              <Stat icon="/edge/stat-dedicated.svg" label="Dedicated Shifts" value="40" />
              <Stat icon="/edge/stat-patrol.svg" label="Patrol Shifts" value="60" />
              <Stat icon="/edge/stat-dispatch.svg" label="Dispatch Requests" value="40" />
            </section>

            <section className="edge-dash__charts">
              <article>
                <h2>
                  Total Contracts
                  <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
                </h2>
                <div className="edge-dash__contracts">
                  <ul>
                    <li><i style={{ background: "#146dff" }} /> Active 65%</li>
                    <li><i style={{ background: "#a9deff" }} /> Expired 15%</li>
                    <li><i style={{ background: "#fecdca" }} /> Terminated 20%</li>
                  </ul>
                  <Image src="/edge/donut.svg" alt="" width={140} height={141} className="edge-dash__donut" />
                </div>
              </article>
              <article>
                <h2>
                  Additional Services
                  <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
                </h2>
                <div className="edge-dash__bars">
                  <div className="edge-dash__yaxis" aria-hidden>
                    <span>160</span><span>120</span><span>80</span><span>40</span><span>0</span>
                  </div>
                  <div className="edge-dash__barplot">
                    <div className="edge-dash__grid" aria-hidden />
                    <div className="edge-dash__bar-col">
                      <span className="is-light" style={{ height: 77 }} />
                      <em>Extra Job</em>
                    </div>
                    <div className="edge-dash__bar-col">
                      <span style={{ height: 120 }} />
                      <em>Dispatch</em>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <h2>
                  Job Efficiency
                  <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
                </h2>
                <div className="edge-dash__efficiency">
                  <p>Patrol</p>
                  <strong>85% <span>Completion</span></strong>
                  <div className="edge-dash__meter"><span style={{ width: "86.72%" }} /></div>
                  <p>Dedicated</p>
                  <strong>95% <span>Completion</span></strong>
                  <div className="edge-dash__meter"><span className="is-light" style={{ width: "93.73%" }} /></div>
                </div>
              </article>
            </section>

            <section className="edge-dash__map-view" aria-label="Map view">
              <div className="edge-dash__map-head">
                <h2>Map View</h2>
                <button type="button" className="edge-dash__more-info" onClick={() => setBillingOpen(true)}>
                  More info
                  <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
                </button>
              </div>
              <div className="edge-dash__map">
                <div className="edge-dash__map-stage">
                  <Image src="/edge/map-ny.png" alt="Map of western New York lots" fill className="edge-dash__map-img" sizes="1100px" />
                  <svg className="edge-dash__map-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                    {MAP_SECTIONS.map((section) => (
                      <polygon key={section.id} points={section.points} className={"edge-dash__map-zone is-" + section.tone} />
                    ))}
                  </svg>
                  {MAP_SECTIONS.map((section) => (
                    <span key={section.id} className={"edge-dash__lot-pill is-" + section.tone} style={{ left: section.left, top: section.top }}>
                      {section.id}
                    </span>
                  ))}
                  <span className="edge-dash__map-pin" style={{ left: "51%", top: "46%" }} aria-hidden>
                    <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                      <path d="M14 35s11-11.2 11-19.2C25 8.4 20.1 3 14 3S3 8.4 3 15.8C3 23.8 14 35 14 35z" fill="#f4780b" />
                      <circle cx="14" cy="15" r="6.5" fill="#fff" />
                      <path d="M14 11.2l3.2 2.4v3.8h-1.6v-2.1h-3.2v2.1H10.8v-3.8l3.2-2.4z" fill="#f4780b" />
                    </svg>
                  </span>
                </div>
                <span className="edge-dash__map-credit">© OpenStreetMap</span>
              </div>
            </section>

            <section className="edge-dash__completion">
              <div className="edge-dash__completion-head">
                <h2>
                  Job Completion <span>(Last 7 Days)</span>
                  <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
                </h2>
                <div className="edge-dash__toggle" role="group" aria-label="Shift type">
                  <button type="button" aria-pressed={series === "dedicated"} onClick={() => setSeries("dedicated")}>
                    Dedicated
                  </button>
                  <button type="button" aria-pressed={series === "patrol"} onClick={() => setSeries("patrol")}>
                    Patrol
                  </button>
                </div>
              </div>
              <svg className="edge-dash__line" viewBox="0 0 1000 200" preserveAspectRatio="none" role="img" aria-label="Completed and missed hours">
                {[28, 62, 96, 130, 164].map((y) => (
                  <line key={y} x1="36" x2="1000" y1={y} y2={y} stroke="#e6e6e7" vectorEffect="non-scaling-stroke" />
                ))}
                {["160", "120", "80", "40", "0"].map((label, i) => (
                  <text key={label} x="0" y={32 + i * 34} fill="#444446" fontSize="11" fontFamily="Inter, sans-serif">
                    {label}
                  </text>
                ))}
                <polyline fill="none" stroke="#f4780b" strokeWidth="2" vectorEffect="non-scaling-stroke" points="72,78 220,78 368,58 516,58 664,108 812,116 960,96" opacity={series === "dedicated" ? 1 : 0.3} />
                <polyline fill="none" stroke="#146dff" strokeWidth="2" vectorEffect="non-scaling-stroke" points="72,128 220,128 368,102 516,68 664,60 812,86 960,74" opacity={series === "patrol" ? 1 : 0.3} />
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <text key={day} x={52 + i * 148} y="190" fill="#6a6a70" fontSize="12" fontFamily="Inter, sans-serif">
                    {day}
                  </text>
                ))}
              </svg>
              <div className="edge-dash__legend">
                <span><i style={{ background: "#146dff" }} /> Completed Hours</span>
                <span><i style={{ background: "#f4780b" }} /> Missed Hours</span>
                <button type="button" className="edge-dash__schedule">Schedule →</button>
              </div>
            </section>
          </div>

          <aside className="edge-dash__live">
            <h2>
              <i /> Live Operations
              <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
            </h2>
            <ul>
              {LIVE_OPS.map(([label, count]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
            <div className="edge-dash__jobs-head">
              <h3>
                Jobs Not Started · 10
                <Image src="/edge/ic-info.svg" alt="" width={16} height={16} />
              </h3>
              <button type="button">Schedule →</button>
            </div>
            <ul className="edge-dash__jobs">
              {JOBS.map((job, i) => (
                <li key={job.name + i}>
                  <Image src={job.avatar} alt="" width={28} height={28} className="edge-dash__job-avatar" unoptimized />
                  <div className="edge-dash__job-copy">
                    <p>
                      <b>{job.name}</b>
                      <span style={{ color: job.kindColor }}>
                        {job.icon === "car" ? (
                          <DirectionsCarFilledOutlined sx={oIcon(14, { color: job.kindColor })} aria-hidden />
                        ) : (
                          <StarOutlineOutlined sx={oIcon(14, { color: job.kindColor })} aria-hidden />
                        )}
                        {job.kind}
                      </span>
                    </p>
                    <small>{job.site}</small>
                    <small>
                      <Image src="/edge/ic-calendar.svg" alt="" width={12} height={12} />
                      11 Dec · 11:30p - 2a - 12 Dec
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      {billingOpen ? (
        <div className="edge-dash__modal" onClick={() => setBillingOpen(false)}>
          <div
            className="edge-dash__modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edge-billing-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="edge-dash__modal-head">
              <h2 id="edge-billing-title">Franchise Info</h2>
              <button type="button" className="edge-dash__modal-close" aria-label="Close" onClick={() => setBillingOpen(false)}>
                ×
              </button>
            </div>
            <div className="edge-dash__franchise">
              <div className="edge-dash__franchise-top">
                <div className="edge-dash__franchise-block">
                  <h3>General Info</h3>
                  <div className="edge-dash__franchise-fields">
                    <div>
                      <InfoField label="Franchise Name" value="Uat test deal 2" />
                      <InfoField label="Owner's Name" value="Power automate" />
                      <InfoField label="Email" value="powerautomate1@teamsignal.com" />
                      <InfoField label="Phone" value="+12345698909" />
                      <InfoField label="Work Cell Number" value="+1111111111" />
                    </div>
                    <div>
                      <InfoField label="Country" value="United States" />
                      <InfoField label="Region/State" value="New York" />
                      <InfoField label="City" value="Marion" />
                      <InfoField label="Address" value="Sabzazar 687 N" />
                    </div>
                  </div>
                </div>
                <div className="edge-dash__franchise-person">
                  <h3>Additional Contacts</h3>
                  <span>Person 1</span>
                  <strong>Test franchise contact</strong>
                  <p>
                    <span>faizan.anwar+fc@camp1.tkxel.com</span>
                    <span>+11111111</span>
                  </p>
                </div>
              </div>
              <div className="edge-dash__franchise-bottom">
                <div>
                  <h3>Legal Information</h3>
                  <div className="edge-dash__legal">
                    <InfoField label="Security License No." value="23987735139" />
                    <InfoField label="Legal Entity Name" value="test 2" />
                    <InfoField label="T&Cs Version" value="TKPATDefibDFYFE 1.1" />
                  </div>
                </div>
                <div className="edge-dash__lots">
                  <h3>Associated Lots</h3>
                  <span className="edge-dash__lots-label">Current</span>
                  <div className="edge-dash__lot-chips">
                    <span>NY-010</span>
                    <span>NY-006</span>
                    <span>NY-002</span>
                    <span className="is-upcoming">NY-001 <em>Effective from Oct 28, 26</em></span>
                  </div>
                  <span className="edge-dash__lots-label">Previous</span>
                  <strong>N/A</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NavUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M13.2 17.2v-1.3a2.7 2.7 0 0 0-2.7-2.7H5.2a2.7 2.7 0 0 0-2.7 2.7v1.3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7.85" cy="7.1" r="2.15" stroke="white" strokeWidth="1.4" />
      <path d="M17.5 17.2v-1.3a2.7 2.7 0 0 0-2-2.6M13.3 4.7a2.7 2.7 0 0 1 0 5.1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function NavPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="6.6" r="2.4" stroke="white" strokeWidth="1.4" />
      <path d="M4.6 16.4v-1.1A3.5 3.5 0 0 1 8.1 11.8h3.8a3.5 3.5 0 0 1 3.5 3.5v1.1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function NavPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6.2 3.6h2l1 2.3-1.3.9a10.2 10.2 0 0 0 4.3 4.3l.9-1.3 2.3 1v2a1.3 1.3 0 0 1-1.4 1.3A12.4 12.4 0 0 1 4.9 5a1.3 1.3 0 0 1 1.3-1.4z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function NavGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3.2" y="3.2" width="5.4" height="5.4" rx="1.1" stroke="white" strokeWidth="1.4" />
      <rect x="11.4" y="3.2" width="5.4" height="5.4" rx="1.1" stroke="white" strokeWidth="1.4" />
      <rect x="3.2" y="11.4" width="5.4" height="5.4" rx="1.1" stroke="white" strokeWidth="1.4" />
      <rect x="11.4" y="11.4" width="5.4" height="5.4" rx="1.1" stroke="white" strokeWidth="1.4" />
    </svg>
  );
}

function NavChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 16.2V9.2M10 16.2V4.4M16 16.2v-4.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NavCar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.2 11.6h13.6l-1.5-3.7H6.1L3.2 11.6z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3.2 11.6h13.6v2.3H3.2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="6.2" cy="14.6" r="1.15" stroke="white" strokeWidth="1.3" />
      <circle cx="13.8" cy="14.6" r="1.15" stroke="white" strokeWidth="1.3" />
    </svg>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <p className="edge-dash__field">
      <span>{label}</span>
      <strong>{value}</strong>
    </p>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="edge-dash__stat">
      <Image src={icon} alt="" width={24} height={24} />
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
