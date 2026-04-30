"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import styles from "./page.module.css";

/* Figma asset URLs */
const imgSignalLogo =
  "https://www.figma.com/api/mcp/asset/1c95e57a-1a8f-4631-9692-53a6e0ebdda4";
const imgMapBase =
  "https://www.figma.com/api/mcp/asset/3704c350-2fb7-4f5c-8ffb-c91aa11f030b";
const imgMapOverlay =
  "https://www.figma.com/api/mcp/asset/3cfcb968-a192-468d-bfe3-640351653743";
const imgMiniMap =
  "https://www.figma.com/api/mcp/asset/ee45c541-405d-4712-89d0-a82a5cdc3afd";
// Map top-bar assets
const imgFullViewIcon =
  "https://www.figma.com/api/mcp/asset/e13233b8-fcc9-4b93-af97-cff2f7903621";
const imgLegendDotAvailable =
  "https://www.figma.com/api/mcp/asset/5d325ed3-cd77-442d-9b9c-fe589670f5da";
const imgLegendDotPending =
  "https://www.figma.com/api/mcp/asset/d7c3940a-9684-4bfc-bde6-b7e9e5039de2";
const imgLegendDotSoldMap =
  "https://www.figma.com/api/mcp/asset/d70c40d8-c099-4825-b14d-fa2181d65379";
// Interest card close icon
const imgInterestClose =
  "https://www.figma.com/api/mcp/asset/8f924dcd-1b6a-47b7-9cd5-95f44b393801";
// Zoom control icons
const imgZoomPlus =
  "https://www.figma.com/api/mcp/asset/7edb3daa-4b70-4d2c-929d-7c566d853595";
const imgZoomMinus =
  "https://www.figma.com/api/mcp/asset/39dd42fd-0e73-467f-bc1d-30f484489086";

// Nav icons
const imgLocationOn =
  "https://www.figma.com/api/mcp/asset/5a35de28-8d89-4927-9aee-2330532095b3";
const imgChevronDown =
  "https://www.figma.com/api/mcp/asset/043a6f6e-776e-475e-84d7-f526693c1f55";
const imgSearch =
  "https://www.figma.com/api/mcp/asset/b4b238c2-a978-4fd8-ace0-53f19e7f3dde";
const imgArrowRange =
  "https://www.figma.com/api/mcp/asset/71deb27f-447a-4f9e-ba52-6de8ae080149";
const imgGroupIcon =
  "https://www.figma.com/api/mcp/asset/7a6f0a69-3ba3-47d3-899e-858ff4e8ddbc";
const imgDistance =
  "https://www.figma.com/api/mcp/asset/301f286c-ac43-4dca-b36f-4f5ef7c988e6";
const imgTabDotActive =
  "https://www.figma.com/api/mcp/asset/13982229-58bd-455b-9ccc-4db7dc48e436";
const imgTabDot =
  "https://www.figma.com/api/mcp/asset/ca7666d2-f537-43c0-a8a3-093cba8f2f48";
const imgCloseCard =
  "https://www.figma.com/api/mcp/asset/9fb86d8b-c603-4ac9-9cec-71ecc30bd1d5";
const imgEmailIcon =
  "https://www.figma.com/api/mcp/asset/4e17d098-d891-4d12-9893-56271baecb50";
const imgPhoneIcon =
  "https://www.figma.com/api/mcp/asset/85d68b94-69fe-4a80-9015-ff8a3cf9444e";

// Modal-specific assets (node 2:26647)
const imgModalHeatMap =
  "https://www.figma.com/api/mcp/asset/6bf8b2a8-b846-40cc-991b-99302d5ba431";
const imgModalChevronLeft =
  "https://www.figma.com/api/mcp/asset/b0434fdc-76b5-4126-ab24-17c05469b626";
const imgOpenInNew =
  "https://www.figma.com/api/mcp/asset/e42e8626-efb9-449b-aa7e-df0a6fcc60b7";
const imgModalClose =
  "https://www.figma.com/api/mcp/asset/36c5203d-f633-4d1c-a360-5cc48fd67496";
const imgBulletDot =
  "https://www.figma.com/api/mcp/asset/440975c9-4550-43a9-9a77-31dd50d53e85";
const imgDetailStorefront =
  "https://www.figma.com/api/mcp/asset/b1633532-4dd9-43f9-9269-e4378a2f18dc";
const imgDetailMapPin =
  "https://www.figma.com/api/mcp/asset/450e9fab-1dee-41c0-92a9-5c7e5d5cb932";
const imgDetailUsers =
  "https://www.figma.com/api/mcp/asset/77b9063c-de85-4631-941e-47da6281e871";
const imgDetailLeads =
  "https://www.figma.com/api/mcp/asset/e844cec2-5892-446c-8db9-bb33439b943a";
const imgDetailMap =
  "https://www.figma.com/api/mcp/asset/b9b67c21-618f-4f6d-b5f7-9332ceddbbdd";
const imgInfoCircle =
  "https://www.figma.com/api/mcp/asset/493d5a0e-012f-45ce-b0e2-db8809f9d2cb";
const imgLegendDotRed =
  "https://www.figma.com/api/mcp/asset/f35be57f-f92c-4a44-9248-4ab10f860f65";
const imgLegendDotOrange =
  "https://www.figma.com/api/mcp/asset/f8ef88f9-3dc0-4463-85f2-cb25050093c7";
const imgLegendDotBlue =
  "https://www.figma.com/api/mcp/asset/f2d1139d-502d-4142-8774-af087a5be5a1";
const imgLegendDotGreen =
  "https://www.figma.com/api/mcp/asset/fc9ac527-f48b-4424-bb6f-9c7718d22643";
const imgCarouselLeft =
  "https://www.figma.com/api/mcp/asset/79957661-de74-4f78-affb-245a5d4cc5f6";
const imgCarouselRight =
  "https://www.figma.com/api/mcp/asset/38b2687e-2a98-48cf-8094-143ce77098a3";
const imgCarouselChevronL =
  "https://www.figma.com/api/mcp/asset/65620a37-0345-4ba0-9382-a662c2f578a2";
const imgCarouselChevronR =
  "https://www.figma.com/api/mcp/asset/dbb32c5a-6482-4dcf-970e-8eeabd2c56be";
const imgSimilarClose =
  "https://www.figma.com/api/mcp/asset/1e1c4919-0be9-4314-82e3-0458ee15818b";

/* Map cluster markers (positions derived from Figma node 504:15758 inset values) */
const markerData = [
  { n: "20", top: "24.16%", left: "58.35%" },
  { n: "40", top: "31.78%", left: "38.72%" },
  { n: "40", top: "46.85%", left: "19.94%" },
  { n: "36", top: "22.19%", left: "18.87%" },
  { n: "32", top: "52.68%", left: "65.65%" },
  { n: "37", top: "48.67%", left: "54.06%" },
  { n: "38", top: "45.39%", left: "82.07%" },
  { n: "38", top: "26.80%", left: "97.41%" },
  { n: "40", top: "28.39%", left: "65.61%" },
  { n: "45", top: "42.96%", left: "61.36%" },
  { n: "45", top: "32.29%", left: "86.64%" },
  { n: "32", top: "37.50%", left: "76.81%" },
  { n: "36", top: "36.76%", left: "66.13%" },
  { n: "44", top: "52.25%", left: "42.18%" },
  { n: "32", top: "56.78%", left: "51.92%" },
  { n: "11", top: "35.79%", left: "51.49%" },
  { n: "40", top: "22.79%", left: "35.93%" },
  { n: "40", top: "41.02%", left: "32.28%" },
  { n: "42", top: "57.66%", left: "32.68%" },
  { n: "36", top: "39.56%", left: "24.45%" },
];

export default function OwnAFranchisePage() {
  const router = useRouter();
  const [isLotModalOpen, setIsLotModalOpen] = useState(false);
  const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);

  const openLotModal = () => setIsLotModalOpen(true);
  const closeLotModal = () => {
    setIsLotModalOpen(false);
    setIsInterestFormOpen(false);
  };
  const openInterestForm = () => setIsInterestFormOpen(true);
  const closeInterestForm = () => setIsInterestFormOpen(false);

  return (
    <main className={styles.page}>

      {/* ── Top blue navigation bar ─────────────────────────────── */}
      <header className={styles.topHeader}>
        <img src={imgSignalLogo} alt="Signal" className={styles.logo} />
        <div className={styles.topLinks}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <img src={imgLocationOn} alt="" width={16} height={16} style={{ objectFit: "contain" }} />
            Find a Location
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <img src={imgLocationOn} alt="" width={16} height={16} style={{ objectFit: "contain" }} />
            Login
            <img src={imgChevronDown} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
          </span>
        </div>
      </header>

      {/* ── White secondary nav ─────────────────────────────────── */}
      <nav className={styles.mainNav} aria-label="Primary">
        <ul>
          <li>
            <a href="/own-a-franchise" className={styles.activeLink}>
              OWN A FRANCHISE
              <img src={imgChevronDown} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
            </a>
          </li>
          <li>
            EXPLORE SECURITY SOLUTIONS
            <img src={imgChevronDown} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
          </li>
          <li>
            JOIN OUR TEAM
            <img src={imgChevronDown} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
          </li>
        </ul>
        <div className={styles.contactMeta}>
          <p style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <img src={imgEmailIcon} alt="" width={16} height={16} style={{ objectFit: "contain", filter: "brightness(0)" }} />
            lots@teamsignal.com
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <img src={imgPhoneIcon} alt="" width={16} height={16} style={{ objectFit: "contain", filter: "brightness(0)" }} />
            877.498.8494
          </p>
        </div>
      </nav>

      {/* ── Marketplace: sidebar + map ──────────────────────────── */}
      <section className={styles.marketWrap}>

        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHead}>
            <h1>Lots Marketplace</h1>
            <button type="button" className={styles.howItWorks}>
              How it Works
              <HelpOutlineIcon sx={{ fontSize: 24, color: "#146dff" }} />
            </button>
          </div>
          <p className={styles.subhead}>Explore lots and submit EOI - Expression of Interest form.</p>

          <div className={styles.filters}>
            <div className={styles.searchWrap}>
              <img src={imgSearch} alt="" className={styles.searchIcon} />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search lots"
                className={styles.searchInput}
              />
            </div>
            <button type="button" className={styles.priceBtn}>
              $ Price
              <img src={imgChevronDown} alt="" className={styles.priceChevron} />
            </button>
          </div>

          <div className={styles.stats}>
            <button type="button" className={`${styles.tab} ${styles.tabActive}`}>
              All
              <img src={imgTabDotActive} alt="" className={styles.tabDot} aria-hidden="true" />
              1000
            </button>
            <button type="button" className={styles.tab}>
              Available
              <img src={imgTabDot} alt="" className={styles.tabDot} aria-hidden="true" />
              260
            </button>
            <button type="button" className={styles.tab}>
              Pending
              <img src={imgTabDot} alt="" className={styles.tabDot} aria-hidden="true" />
              370
            </button>
            <button type="button" className={styles.tab}>
              Sold
              <img src={imgTabDot} alt="" className={styles.tabDot} aria-hidden="true" />
              370
            </button>
          </div>

          <div className={styles.cardList}>

            {/* Card 1 — available */}
            <article
              className={styles.lotCard}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={isLotModalOpen}
              onClick={openLotModal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLotModal(); }
              }}
            >
              <div className={styles.cardHeader}>
                <h2>Lot NB - 09</h2>
                <img src={imgCloseCard} alt="" className={styles.cardCloseIcon} aria-hidden="true" />
              </div>
              <div className={styles.priceLine}>
                <p className={styles.priceText}>
                  <span className={styles.priceLabel}>Available at </span>
                  <span className={styles.priceAmount}>$120,000</span>
                </p>
                <span className={styles.badgeBlue}>Available</span>
              </div>
              <div className={styles.statRows}>
                <div className={styles.statRow}>
                  <img src={imgArrowRange} alt="" className={styles.statIcon} />
                  <span>591,700/ year Lot opportunity</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgGroupIcon} alt="" className={styles.statIcon} />
                  <span>4.2M population</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgDistance} alt="" className={styles.statIcon} />
                  <span>30 zipcodes</span>
                </div>
              </div>
            </article>

            {/* Card 2 — in network */}
            <article className={styles.lotCard}>
              <div className={styles.cardHeader}>
                <h2>Lot KA - 05</h2>
                <img src={imgCloseCard} alt="" className={styles.cardCloseIcon} aria-hidden="true" />
              </div>
              <div className={styles.priceLine}>
                <p className={styles.priceText}>
                  <span className={styles.priceLabel}>Available at </span>
                  <span className={styles.priceAmount}>$120,000</span>
                </p>
                <span className={styles.badgeOrange}>In Network</span>
              </div>
              <div className={styles.statRows}>
                <div className={styles.statRow}>
                  <img src={imgArrowRange} alt="" className={styles.statIcon} />
                  <span>591,700/ year Lot opportunity</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgGroupIcon} alt="" className={styles.statIcon} />
                  <span>315,000 population</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgDistance} alt="" className={styles.statIcon} />
                  <span>10 zipcodes</span>
                </div>
              </div>
            </article>

            {/* Card 3 — sold / in network */}
            <article className={styles.lotCard}>
              <div className={styles.cardHeader}>
                <h2>Lot WY - 09 - 026</h2>
                <img src={imgCloseCard} alt="" className={styles.cardCloseIcon} aria-hidden="true" />
              </div>
              <div className={styles.priceLine}>
                <p className={styles.priceText}>
                  <span className={styles.priceLabel}>Last Sold at </span>
                  <span className={`${styles.priceAmount} ${styles.priceAmountSold}`}>$230,000</span>
                </p>
                <span className={styles.badgeOrange}>In Network</span>
              </div>
              <div className={styles.statRows}>
                <div className={styles.statRow}>
                  <img src={imgArrowRange} alt="" className={styles.statIcon} />
                  <span>591,700/ year Lot opportunity</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgGroupIcon} alt="" className={styles.statIcon} />
                  <span>315,000 population</span>
                </div>
                <div className={styles.statRow}>
                  <img src={imgDistance} alt="" className={styles.statIcon} />
                  <span>60 zipcodes</span>
                </div>
              </div>
            </article>

          </div>
        </aside>

        {/* Map panel */}
        <div className={styles.mapArea}>
          {/* Map background layers */}
          <img src={imgMapBase} alt="Lots map" className={styles.mapImage} />
          <div className={styles.mapOverlayLayer}>
            <img src={imgMapOverlay} alt="" className={styles.mapOverlayImg} aria-hidden="true" />
          </div>

          {/* Top bar: Full View + legend */}
          <div className={styles.mapTopBar}>
            <button type="button" className={styles.fullViewBtn}>
              <img src={imgFullViewIcon} alt="" className={styles.fullViewIcon} aria-hidden="true" style={{ transform: "rotate(180deg)" }} />
              Full View
            </button>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <img src={imgLegendDotAvailable} alt="" className={styles.legendDot} aria-hidden="true" />
                Available lots
              </span>
              <span className={styles.legendItem}>
                <img src={imgLegendDotPending} alt="" className={styles.legendDot} aria-hidden="true" />
                Pending lots
              </span>
              <span className={styles.legendItem}>
                <img src={imgLegendDotSoldMap} alt="" className={styles.legendDot} aria-hidden="true" />
                Sold lots
              </span>
            </div>
          </div>

          {/* Cluster markers */}
          {markerData.map((m, i) => (
            <span
              key={i}
              className={styles.marker}
              style={{ top: m.top, left: m.left }}
            >
              {m.n}
            </span>
          ))}

          {/* Interest card */}
          <aside className={styles.interestCard}>
            <button type="button" className={styles.closeBtn} aria-label="Close interest card">
              <img src={imgInterestClose} alt="" className={styles.closeBtnIcon} aria-hidden="true" />
            </button>
            <img src={imgMiniMap} alt="" className={styles.interestMapThumb} aria-hidden="true" />
            <h3>Interested in owning a region?</h3>
            <p>Submit an interest form if you want to become owner of a franchise.</p>
            <button
              type="button"
              className={styles.fillBtn}
              onClick={() => router.push("/onboarding")}
            >
              Fill the Form
            </button>
          </aside>

          {/* Zoom controls */}
          <div className={styles.zoomControls}>
            <button type="button" className={styles.zoomBtn} aria-label="Zoom in">
              <img src={imgZoomPlus} alt="" className={styles.zoomIcon} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Lot detail modal ──────────────────────────────────────── */}
      {isLotModalOpen && (
        <div className={styles.modalBackdrop} role="presentation" onClick={closeLotModal}>
          <section
            className={styles.lotModal}
            role="dialog"
            aria-modal="true"
            aria-label="Lot details"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <header className={styles.modalHeader}>
              <button type="button" className={styles.backLink} onClick={closeLotModal}>
                <img src={imgModalChevronLeft} alt="" className={styles.backChevron} style={{ transform: "rotate(180deg)" }} />
                Back to search
              </button>
              <div className={styles.modalHeaderLinks}>
                <a href="#" onClick={(e) => e.preventDefault()} className={styles.modalHeaderLink}>
                  Security Services
                  <img src={imgOpenInNew} alt="" className={styles.openInNewIcon} />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className={styles.modalHeaderLink}>
                  Employment Opportunities
                  <img src={imgOpenInNew} alt="" className={styles.openInNewIcon} />
                </a>
              </div>
              <button type="button" className={styles.modalCloseBtn} aria-label="Close" onClick={closeLotModal}>
                <img src={imgModalClose} alt="Close" width={14} height={14} />
              </button>
            </header>

            {/* Body */}
            <div className={styles.modalBody}>

              {/* ── Left sidebar ─────────────────────────────────── */}
              <aside className={styles.modalSidebar}>

                {/* Section 1: title + price + CTA */}
                <div className={styles.mSec1}>
                  <div className={styles.mTitleRow}>
                    <span className={styles.mLotName}>Lot NB - 001</span>
                    <span className={styles.badgeOrange}>In Network</span>
                  </div>
                  <p className={styles.mPrice}>$120,000</p>
                  <div className={styles.mCtaGroup}>
                    <p className={styles.mInterested}>Interested in this area?</p>
                    <button type="button" className={styles.submitInterestBtn} onClick={openInterestForm}>
                      Submit Your Interest
                    </button>
                  </div>
                </div>

                {/* Section 2: Why this Market */}
                <div className={styles.mSec2}>
                  <p className={styles.mSecHeading}>Why this Market?</p>
                  <p className={styles.mSecBody}>
                    This market is located in a dense urban area with strong infrastructure and business
                    accessibility. Demand is primarily driven by residential development and housing services.
                    Located in the Midwest, this area benefits from a central position and strong local networks.
                  </p>
                </div>

                {/* Section 3: Price History */}
                <div className={styles.mSec3}>
                  <p className={styles.mSecHeading}>Price History</p>
                  <div className={styles.mPriceHistoryList}>
                    <div className={styles.mPriceRow}>
                      <img src={imgBulletDot} alt="" className={styles.mBullet} />
                      <p>
                        <span className={styles.mPHMuted}>Bought for</span>
                        {" "}<span className={styles.mPHDark}>$98,000</span>
                        {" "}<span className={styles.mPHMuted}>on</span>
                        {" "}<span className={styles.mPHDark}>Jan 18, 2021.</span>
                      </p>
                    </div>
                    <div className={styles.mPriceRow}>
                      <img src={imgBulletDot} alt="" className={styles.mBullet} />
                      <p>
                        <span className={styles.mPHMuted}>Bought for</span>
                        {" "}<span className={styles.mPHDark}>$88,000</span>
                        {" "}<span className={styles.mPHMuted}>on</span>
                        {" "}<span className={styles.mPHDark}>Mar 28, 2020.</span>
                      </p>
                    </div>
                    <div className={styles.mPriceRow}>
                      <img src={imgBulletDot} alt="" className={styles.mBullet} />
                      <p>
                        <span className={styles.mPHMuted}>Bought for</span>
                        {" "}<span className={styles.mPHDark}>$62,000</span>
                        {" "}<span className={styles.mPHMuted}>on</span>
                        {" "}<span className={styles.mPHDark}>Jan 18, 2019.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* ── Right panel ──────────────────────────────────── */}
              <div className={styles.modalMain}>

                {/* Heat map section */}
                <div className={styles.mHeatmapWrap}>
                  <div className={styles.mMapContainer}>
                    {/* Toggle bar sits on top edge */}
                    <div className={styles.mToggleBar}>
                      <div className={styles.mShowLeads}>
                        <span className={styles.mShowLeadsLabel}>Show Leads</span>
                        <div className={styles.mToggleSwitch} aria-label="Show leads toggle">
                          <div className={styles.mToggleKnob} />
                        </div>
                      </div>
                      <div className={styles.mMapLegend}>
                        {[
                          { img: imgLegendDotRed, label: "Housing" },
                          { img: imgLegendDotOrange, label: "Distribution" },
                          { img: imgLegendDotBlue, label: "Industrial" },
                          { img: imgLegendDotGreen, label: "Commercial" },
                        ].map(({ img, label }) => (
                          <span key={label} className={styles.mLegendItem}>
                            <img src={img} alt="" className={styles.mLegendDot} />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <img src={imgModalHeatMap} alt="Heat map" className={styles.mHeatmapImage} />
                  </div>
                </div>

                {/* Lot Details */}
                <div className={styles.mLotDetails}>
                  <p className={styles.mSectionTitle}>Lot Details</p>
                  <div className={styles.mDetailGrid}>
                    <div className={styles.mDetailItem}>
                      <div className={styles.mDetailIconWrap}>
                        <img src={imgDetailStorefront} alt="" className={styles.mDetailIcon} />
                      </div>
                      <div className={styles.mDetailText}>
                        <span className={styles.mDetailLabel}>Market Type</span>
                        <span className={styles.mDetailValue}>Suburban</span>
                      </div>
                    </div>
                    <div className={styles.mDetailItem}>
                      <div className={styles.mDetailIconWrap}>
                        <img src={imgDetailMapPin} alt="" className={styles.mDetailIcon} />
                      </div>
                      <div className={styles.mDetailText}>
                        <span className={styles.mDetailLabelRow}>
                          Zip Codes
                          <img src={imgInfoCircle} alt="" className={styles.mInfoIcon} />
                        </span>
                        <span className={styles.mDetailValue}>32</span>
                      </div>
                    </div>
                    <div className={styles.mDetailItem}>
                      <div className={styles.mDetailIconWrap}>
                        <img src={imgDetailUsers} alt="" className={styles.mDetailIcon} />
                      </div>
                      <div className={styles.mDetailText}>
                        <span className={styles.mDetailLabel}>Population</span>
                        <span className={styles.mDetailValue}>4M</span>
                      </div>
                    </div>
                    <div className={styles.mDetailItem}>
                      <div className={styles.mDetailIconWrap}>
                        <img src={imgDetailLeads} alt="" className={styles.mDetailIcon} />
                      </div>
                      <div className={styles.mDetailText}>
                        <span className={styles.mDetailLabel}>Lead Volume</span>
                        <span className={styles.mDetailValue}>310</span>
                      </div>
                    </div>
                    <div className={styles.mDetailItem}>
                      <div className={styles.mDetailIconWrap}>
                        <img src={imgDetailMap} alt="" className={styles.mDetailIcon} />
                      </div>
                      <div className={styles.mDetailText}>
                        <span className={styles.mDetailLabel}>Serviceable Area</span>
                        <span className={styles.mDetailValue}>5,400 sq mi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Where the Opportunity Is */}
                <div className={styles.mOpportunity}>
                  <p className={styles.mSectionTitle}>Where the Opportunity Is</p>
                  <div className={styles.mOpportunityCard}>
                    {/* Numbers row above bars */}
                    <div className={styles.mOpportunityNums}>
                      <span style={{ flex: "82 0 0" }}>2,341</span>
                      <span style={{ flex: "433 0 0" }}>23,872</span>
                      <span style={{ flex: "127 0 0" }}>2,971</span>
                      <span style={{ flex: "47 0 0" }}>19</span>
                    </div>
                    {/* Bar row */}
                    <div className={styles.mOpportunityBarRow}>
                      <span className={styles.mOppLabel}>Lead %</span>
                      <div className={styles.mBars}>
                        <div className={styles.mBar} style={{ flex: "82 0 0", background: "#e43f32" }}>15%</div>
                        <div className={styles.mBar} style={{ flex: "433 0 0", background: "#ff9332" }}>36%</div>
                        <div className={styles.mBar} style={{ flex: "127 0 0", background: "#146dff" }}>20%</div>
                        <div className={styles.mBar} style={{ flex: "47 0 0", background: "#31a150" }}>3%</div>
                      </div>
                    </div>
                    {/* Legend row */}
                    <div className={styles.mOpportunityLegend}>
                      {[
                        { img: imgLegendDotRed, label: "Housing" },
                        { img: imgLegendDotOrange, label: "Distribution" },
                        { img: imgLegendDotBlue, label: "Industrial" },
                        { img: imgLegendDotGreen, label: "Commercial" },
                      ].map(({ img, label }) => (
                        <span key={label} className={styles.mLegendItem}>
                          <img src={img} alt="" className={styles.mLegendDot} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Similar Lots */}
                <div className={styles.mSimilarLots}>
                  <div className={styles.mSimilarHeader}>
                    <p className={styles.mSimilarTitle}>Similar Lots</p>
                    <div className={styles.mCarouselBtns}>
                      <button type="button" className={styles.mCarouselBtn} aria-label="Previous">
                        <img src={imgCarouselLeft} alt="" className={styles.mCarouselCircle} />
                        <img src={imgCarouselChevronL} alt="" className={styles.mCarouselChevron} style={{ transform: "rotate(180deg)" }} />
                      </button>
                      <button type="button" className={styles.mCarouselBtn} aria-label="Next">
                        <img src={imgCarouselRight} alt="" className={styles.mCarouselCircle} />
                        <img src={imgCarouselChevronR} alt="" className={styles.mCarouselChevron} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.mSimilarCards}>
                    {[
                      { name: "Lot KA - 05", range: "591,700/ year Lot opportunity", sub: "Similar Industry vertical distribution", subBlue: true },
                      { name: "Lot SA - 12", range: "267,790/ year Lot opportunity", sub: "289,000 population", subBlue: true },
                      { name: "Lot NB - 14", range: "289,700/ year Lot opportunity", sub: "279,000 population", subBlue: true },
                      { name: "Lot KA - 18", range: "998,700/ year Lot opportunity", sub: "Similar Industry vertical distribution", subBlue: true },
                    ].map((lot) => (
                      <div key={lot.name} className={styles.mSimilarCard}>
                        <div className={styles.mSimilarCardHead}>
                          <span className={styles.mSimilarName}>{lot.name}</span>
                          <img src={imgSimilarClose} alt="" className={styles.mSimilarClose} />
                        </div>
                        <div className={styles.mSimilarStats}>
                          <div className={styles.statRow}>
                            <img src={imgArrowRange} alt="" className={styles.statIcon} />
                            <span>{lot.range}</span>
                          </div>
                          <p className={styles.mSimilarSub}>{lot.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── EOI interest form modal ───────────────────────────────── */}
      {isInterestFormOpen && (
        <div className={styles.formModalBackdrop} role="presentation" onClick={closeInterestForm}>
          <section
            className={styles.interestFormModal}
            role="dialog"
            aria-modal="true"
            aria-label="Submit your interest"
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.interestFormHeader}>
              <div>
                <h2>Interested in owning this region?</h2>
                <p>Please submit your interest against this lot, Signal business team will review and get back to you.</p>
              </div>
              <button type="button" className={styles.interestFormClose} aria-label="Close" onClick={closeInterestForm}>
                ×
              </button>
            </header>

            <form
              className={styles.interestFormBody}
              onSubmit={(e) => {
                e.preventDefault();
                setIsInterestFormOpen(false);
                setIsLotModalOpen(false);
                router.push("/own-a-franchise");
              }}
            >
              <div className={styles.formField}>
                <label htmlFor="first-name">First Name<span>*</span></label>
                <input id="first-name" type="text" placeholder="e.g. John" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="last-name">Last Name<span>*</span></label>
                <input id="last-name" type="text" placeholder="e.g. William" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email-address">Email Address<span>*</span></label>
                <input id="email-address" type="email" placeholder="e.g. user@signalteam.com" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="phone-number">Phone Number<span>*</span></label>
                <input id="phone-number" type="text" placeholder="e.g. +34 428484" />
              </div>
              <div className={`${styles.formField} ${styles.fullWidthField}`}>
                <label htmlFor="street-address">Street<span>*</span></label>
                <input id="street-address" type="text" placeholder="e.g. 244 Street 2" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="city">City<span>*</span></label>
                <input id="city" type="text" placeholder="e.g. Lincoln" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="state">State<span>*</span></label>
                <input id="state" type="text" placeholder="e.g. Nebraska" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="zipcode">Zipcode<span>*</span></label>
                <input id="zipcode" type="text" placeholder="Enter zipcode" />
              </div>
              <div className={`${styles.formField} ${styles.fullWidthField}`}>
                <label>Which Best Describes Your Interest in Starting a Business?<span>*</span></label>
                <div className={styles.choiceList}>
                  <label className={styles.choiceRow}>
                    <input type="checkbox" defaultChecked />
                    <span>I currently own/operate a security business</span>
                  </label>
                  <label className={styles.choiceRow}>
                    <input type="checkbox" />
                    <span>Business with annual revenue below $500,000</span>
                  </label>
                  <label className={styles.choiceRow}>
                    <input type="checkbox" />
                    <span>Business with annual revenue above $500,000</span>
                  </label>
                </div>
              </div>
              <button type="submit" className={styles.submitFormBtn}>Submit Form</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
