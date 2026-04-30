"use client";

import { useState } from "react";
import styles from "./page.module.css";

const signalLogo = "https://www.figma.com/api/mcp/asset/4757dc91-50e9-481c-b2c8-49ab077e626f";

const primaryFields = [
  ["Full Name *", "Email Address *", "Back Up Email Address"],
  ["Personal Phone Number *", "— select —", "Entity Name (LLC, etc.)"],
  ["EIN", "License #", "— select —"],
  ["Published Business Phone Number", "Business Office Address", "Mailing Address"],
  ["— select —", "— select —", "Consent Video URL"],
];

const secondaryFields = [
  ["Name of Secondary Owner/Partner", "Title", "Secondary Owner/Partner Phone Number"],
  ["Secondary Owner Back Up Email", "Secondary Owner Mailing/Shipping Address"],
];

const sidebarSections = [
  {
    num: "1.",
    label: "Background Check",
    badge: "Not Started",
    badgeKind: "gray" as const,
    active: true,
    subsections: [{ label: "1.1 Owner Information" }],
  },
  {
    num: "2.",
    label: "Fleet Services Form",
    badge: "Not Started",
    badgeKind: "gray" as const,
    active: false,
    subsections: [],
  },
  {
    num: "3.",
    label: "Basic Information",
    badge: "Not Started",
    badgeKind: "gray" as const,
    active: false,
    subsections: [],
  },
  {
    num: "4.",
    label: "Franchise Creation",
    badge: "Compliance Form",
    badgeKind: "blue" as const,
    badge2: "Not Started",
    active: false,
    subsections: [],
  },
];

export default function WorkflowPage() {
  const [ownerExpanded, setOwnerExpanded] = useState(true);

  return (
    <div className={styles.appShell}>
      {/* ── Top navigation bar ── */}
      <nav className={styles.topNav}>
        <div className={styles.topNavLeft}>
          <span className={styles.appsGrid}>⊞</span>
          <span className={styles.topNavTitle}>Power Apps</span>
          <span className={styles.topNavDivider}>|</span>
          <span className={styles.topNavSub}>Franchise Onboarding HO</span>
          <span className={styles.topNavInfo}>ⓘ</span>
        </div>
        <div className={styles.topNavRight}>
          <button type="button" className={styles.shareBtn}>⬆ Share ▾</button>
          <button type="button" className={styles.iconBtn} aria-label="Fullscreen">⛶</button>
          <button type="button" className={styles.iconBtn} aria-label="Download">⬇</button>
          <button type="button" className={styles.iconBtn} aria-label="Settings">⚙</button>
          <button type="button" className={styles.iconBtn} aria-label="Help">?</button>
          <span className={styles.avatar}>SN</span>
        </div>
      </nav>

      {/* ── Sub-header / breadcrumb ── */}
      <header className={styles.subHeader}>
        <div className={styles.subHeaderLeft}>
          <img src={signalLogo} alt="Signal" className={styles.signalLogo} />
          <span className={styles.subDivider}>|</span>
          <span className={styles.subGridIcon}>⊞</span>
          <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <span className={styles.breadcrumbStep}>Deal Onboarding</span>
            <span className={styles.breadcrumbSep}>{"//"}</span>
            <span className={styles.breadcrumbCurrent}>0026 - Nebraska</span>
          </nav>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.dealInfo}>
            <p className={styles.dealName}>0026 - Nebraska</p>
            <p className={styles.dealId}>Deal ID: 46786371719</p>
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: "0%" }} />
              </div>
              <span className={styles.progressPct}>0%</span>
            </div>
            <p className={styles.progressLabel}>Overall Progress</p>
          </div>

          <ul className={styles.sectionList}>
            {sidebarSections.map((sec) => (
              <li key={sec.num} className={`${styles.sectionItem} ${sec.active ? styles.sectionItemActive : ""}`}>
                <div className={styles.sectionRow}>
                  <span className={styles.sectionChevron}>{sec.active ? "▾" : "›"}</span>
                  <div className={styles.sectionText}>
                    <span className={styles.sectionTitle}>
                      <strong>{sec.num}</strong> {sec.label}
                    </span>
                    <div className={styles.sectionBadges}>
                      {"badge2" in sec && sec.badge2 !== undefined && (
                        <span className={styles.badgeBlue}>{sec.badge}</span>
                      )}
                      <span className={sec.badgeKind === "blue" && !("badge2" in sec) ? styles.badgeBlue : styles.badgeGray}>
                        {"badge2" in sec && sec.badge2 !== undefined ? sec.badge2 : sec.badge}
                      </span>
                    </div>
                  </div>
                </div>
                {sec.subsections.length > 0 && (
                  <ul className={styles.subsectionList}>
                    {sec.subsections.map((sub) => (
                      <li key={sub.label} className={styles.subsectionItem}>
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.sidebarFooter}>0 of 4 sections complete</div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          {/* Section title bar */}
          <div className={styles.sectionTitleBar}>
            <div className={styles.sectionTitleLeft}>
              <h1 className={styles.sectionHeading}>Background Check</h1>
              <span className={styles.badgeBlue}>Compliance Form</span>
              <span className={styles.badgeGray}>Not Started</span>
            </div>
            <div className={styles.sectionTitleRight}>
              <button type="button" className={styles.outlineBtnBlue}>Lots</button>
              <button type="button" className={styles.outlineBtnOrange}>Contacts</button>
            </div>
          </div>

          {/* Owner Information card */}
          <div className={styles.contentPad}>
            <div className={styles.formCard}>
              {/* Card header */}
              <div className={styles.cardHeader}>
                <button
                  type="button"
                  className={styles.cardToggle}
                  onClick={() => setOwnerExpanded((v) => !v)}
                  aria-expanded={ownerExpanded}
                >
                  <span className={styles.cardChevron}>{ownerExpanded ? "▾" : "›"}</span>
                  <span className={styles.cardTitle}>Owner Information</span>
                  <span className={styles.badgeGray}>Not Started</span>
                </button>
                <button type="button" className={styles.editBtn}>
                  ✎ Edit
                </button>
              </div>

              {ownerExpanded && (
                <div className={styles.cardBody}>
                  {/* Primary Owner */}
                  <p className={styles.subSectionTitle}>Primary Owner Information</p>
                  <div className={styles.fieldGrid3}>
                    {primaryFields.map((row, ri) =>
                      row.map((placeholder, ci) => (
                        <div
                          key={`${ri}-${ci}`}
                          className={`${styles.inputWrap} ${placeholder.startsWith("—") ? styles.selectWrap : ""}`}
                        >
                          <input
                            type="text"
                            placeholder={placeholder}
                            className={styles.fieldInput}
                            readOnly={placeholder.startsWith("—")}
                          />
                          {placeholder.startsWith("—") && <span className={styles.dropArrow}>▾</span>}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Secondary Owner */}
                  <p className={`${styles.subSectionTitle} ${styles.subSectionTitleSpaced}`}>
                    Secondary Owner/Partner Information
                  </p>
                  <div className={styles.fieldGrid3}>
                    {secondaryFields.map((row, ri) =>
                      row.map((placeholder, ci) => (
                        <input
                          key={`s-${ri}-${ci}`}
                          type="text"
                          placeholder={placeholder}
                          className={styles.fieldInput}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
