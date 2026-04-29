"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const signalLogo = "https://www.figma.com/api/mcp/asset/15e62840-84c1-4d2b-ac0b-14896a874b77";
const mapBase = "https://www.figma.com/api/mcp/asset/aefe87e2-74ed-437e-aa1f-ca4d487cd490";
const miniMap = "https://www.figma.com/api/mcp/asset/cfe88b32-440d-4dc2-a26c-155830c17450";
const modalHeatMap = "https://www.figma.com/api/mcp/asset/002457d5-0e54-4b0c-a50f-42ca51f3fdd7";

const markerData = [
  { n: "40", top: "16%", left: "38%" },
  { n: "20", top: "18%", left: "57%" },
  { n: "38", top: "21%", left: "95%" },
  { n: "36", top: "30%", left: "18%" },
  { n: "40", top: "31%", left: "39%" },
  { n: "11", top: "38%", left: "49%" },
  { n: "36", top: "39%", left: "65%" },
  { n: "32", top: "38%", left: "76%" },
  { n: "45", top: "45%", left: "59%" },
  { n: "32", top: "52%", left: "74%" },
  { n: "44", top: "53%", left: "43%" },
  { n: "42", top: "58%", left: "35%" },
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
      <header className={styles.topHeader}>
        <img src={signalLogo} alt="Signal" className={styles.logo} />
        <div className={styles.topLinks}>
          <span>Find a Location</span>
          <span>Login</span>
        </div>
      </header>

      <nav className={styles.mainNav} aria-label="Primary">
        <ul>
          <li>
            <Link href="/own-a-franchise" className={styles.activeLink}>
              OWN A FRANCHISE <span aria-hidden="true">▾</span>
            </Link>
          </li>
          <li>
            EXPLORE SECURITY SOLUTIONS <span aria-hidden="true">▾</span>
          </li>
          <li>
            JOIN OUR TEAM <span aria-hidden="true">▾</span>
          </li>
        </ul>
        <div className={styles.contactMeta}>
          <p>lots@teamsignal.com</p>
          <p>877.498.8494</p>
        </div>
      </nav>

      <section className={styles.marketWrap}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHead}>
            <h1>Lots Marketplace</h1>
            <button type="button">How it Works ?</button>
          </div>
          <p className={styles.subhead}>Explore lots and submit EOI - Expression of Interest form.</p>

          <div className={styles.filters}>
            <input type="search" placeholder="Search" aria-label="Search lots" />
            <button type="button">$ Price ▾</button>
          </div>

          <div className={styles.stats}>
            <span className={styles.statActive}>All 1000</span>
            <span>Available 260</span>
            <span>Pending 370</span>
            <span>Sold 370</span>
          </div>

          <div className={styles.cardList}>
            <article
              className={styles.lotCard}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={isLotModalOpen}
              onClick={openLotModal}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLotModal();
                }
              }}
            >
              <h2>Lot NB - 09</h2>
              <p className={styles.priceLine}>
                Available at <strong>$120,000</strong> <span className={styles.badgeBlue}>Available</span>
              </p>
              <ul>
                <li>591,700/ year Lot opportunity</li>
                <li>4.2M population</li>
                <li>30 zipcodes</li>
              </ul>
            </article>

            <article className={styles.lotCard}>
              <h2>Lot KA - 05</h2>
              <p className={styles.priceLine}>
                Available at <strong>$120,000</strong> <span className={styles.badgeOrange}>In Network</span>
              </p>
              <ul>
                <li>591,700/ year Lot opportunity</li>
                <li>315,000 population</li>
                <li>10 zipcodes</li>
              </ul>
            </article>

            <article className={styles.lotCard}>
              <h2>Lot WY - 09 - 026</h2>
              <p className={styles.priceLine}>
                Last Sold at <strong>$230,000</strong> <span className={styles.badgeOrange}>In Network</span>
              </p>
              <ul>
                <li>591,700/ year Lot opportunity</li>
                <li>315,000 population</li>
                <li>60 zipcodes</li>
              </ul>
            </article>
          </div>
        </aside>

        <div className={styles.mapArea}>
          <img src={mapBase} alt="Lots map" className={styles.mapImage} />

          <div className={styles.mapTopBar}>
            <button type="button">◁ Full View</button>
            <div className={styles.legend}>
              <span>
                <i className={styles.dotAvailable} />
                Available lots
              </span>
              <span>
                <i className={styles.dotPending} />
                Pending lots
              </span>
              <span>
                <i className={styles.dotSold} />
                Sold lots
              </span>
            </div>
          </div>

          {markerData.map((marker) => (
            <span key={`${marker.n}-${marker.top}-${marker.left}`} className={styles.marker} style={{ top: marker.top, left: marker.left }}>
              {marker.n}
            </span>
          ))}

          <aside className={styles.interestCard}>
            <button type="button" className={styles.closeBtn} aria-label="Close">
              ×
            </button>
            <img src={miniMap} alt="" aria-hidden="true" />
            <h3>Interested in owning a region?</h3>
            <p>Submit an interest form if you want to become owner of a franchise.</p>
            <button type="button" className={styles.fillBtn} onClick={() => router.push("/onboarding")}>
              Fill the Form
            </button>
          </aside>
        </div>
      </section>

      {isLotModalOpen && (
        <div className={styles.modalBackdrop} role="presentation" onClick={closeLotModal}>
          <section
            className={styles.lotModal}
            role="dialog"
            aria-modal="true"
            aria-label="Lot details"
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <button type="button" className={styles.backLink} onClick={closeLotModal}>
                ← Back to search
              </button>
              <div className={styles.modalHeaderLinks}>
                <a href="#" onClick={(event) => event.preventDefault()}>
                  Security Services ↗
                </a>
                <a href="#" onClick={(event) => event.preventDefault()}>
                  Employment Opportunities ↗
                </a>
              </div>
              <button type="button" className={styles.modalClose} aria-label="Close" onClick={closeLotModal}>
                ×
              </button>
            </header>

            <div className={styles.modalBody}>
              <aside className={styles.modalSidebar}>
                <div className={styles.modalTitleRow}>
                  <h2>Lot NB - 001</h2>
                  <span className={styles.badgeOrange}>In Network</span>
                </div>
                <p className={styles.modalPrice}>$120,000</p>
                <p className={styles.modalQuestion}>Interested in this area?</p>
                <button type="button" className={styles.submitInterestBtn} onClick={openInterestForm}>
                  Submit Your Interest
                </button>

                <section className={styles.modalInfoSection}>
                  <h3>Why this Market?</h3>
                  <p>
                    This market is located in a dense urban area with strong infrastructure and business
                    accessibility. Demand is primarily driven by residential development and housing services.
                  </p>
                </section>

                <section className={styles.modalInfoSection}>
                  <h3>Price History</h3>
                  <ul>
                    <li>Bought for $98,000 on Jan 18, 2021.</li>
                    <li>Bought for $88,000 on Mar 28, 2020.</li>
                    <li>Bought for $62,000 on Jan 18, 2019.</li>
                  </ul>
                </section>
              </aside>

              <div className={styles.modalMain}>
                <div className={styles.heatMapWrap}>
                  <div className={styles.heatMapTop}>
                    <label className={styles.showLeads}>
                      <span>Show Leads</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <div className={styles.modalLegend}>
                      <span><i className={styles.dotHousing} />Housing</span>
                      <span><i className={styles.dotDistribution} />Distribution</span>
                      <span><i className={styles.dotIndustrial} />Industrial</span>
                      <span><i className={styles.dotCommercial} />Commercial</span>
                    </div>
                  </div>
                  <img src={modalHeatMap} alt="Lot demand heat map" className={styles.modalHeatMapImage} />
                </div>

                <section className={styles.detailSection}>
                  <h3>Lot Details</h3>
                  <div className={styles.detailGrid}>
                    <div><span>Market Type</span><strong>Suburban</strong></div>
                    <div><span>Zip Codes</span><strong>2</strong></div>
                    <div><span>Population</span><strong>4M</strong></div>
                    <div><span>Lead Volume</span><strong>310</strong></div>
                    <div><span>Serviceable Area</span><strong>5,400 sq mi</strong></div>
                  </div>
                </section>

                <section className={styles.detailSection}>
                  <h3>Where the Opportunity Is</h3>
                  <div className={styles.opportunityCard}>
                    <div className={styles.opportunityHead}>
                      <span>Lead %</span>
                      <div>
                        <span>15%</span>
                        <span>36%</span>
                        <span>20%</span>
                        <span>3%</span>
                      </div>
                    </div>
                    <div className={styles.opportunityBar}>
                      <span className={styles.housingBand}>15%</span>
                      <span className={styles.distributionBand}>36%</span>
                      <span className={styles.industrialBand}>20%</span>
                      <span className={styles.commercialBand}>3%</span>
                    </div>
                  </div>
                </section>

                <section className={styles.detailSection}>
                  <h3>Similar Lots</h3>
                  <div className={styles.similarGrid}>
                    <article className={styles.similarCard}>
                      <h4>Lot KA - 05</h4>
                      <p>597,100/year Lot opportunity</p>
                    </article>
                    <article className={styles.similarCard}>
                      <h4>Lot SA - 12</h4>
                      <p>289,000 population</p>
                    </article>
                    <article className={styles.similarCard}>
                      <h4>Lot NB - 14</h4>
                      <p>18 zipcodes</p>
                    </article>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      )}

      {isInterestFormOpen && (
        <div className={styles.formModalBackdrop} role="presentation" onClick={closeInterestForm}>
          <section
            className={styles.interestFormModal}
            role="dialog"
            aria-modal="true"
            aria-label="Submit your interest form"
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.interestFormHeader}>
              <div>
                <h2>Interested in owning this region?</h2>
                <p>Please submit your interest against this lot, signal business team will review this and get back to you</p>
              </div>
              <button type="button" className={styles.interestFormClose} aria-label="Close" onClick={closeInterestForm}>
                ×
              </button>
            </header>

            <form
              className={styles.interestFormBody}
              onSubmit={(event) => {
                event.preventDefault();
                setIsInterestFormOpen(false);
                setIsLotModalOpen(false);
                router.push("/own-a-franchise");
              }}
            >
              <div className={styles.formField}>
                <label htmlFor="first-name">
                  First Name<span>*</span>
                </label>
                <input id="first-name" type="text" placeholder="e.g. John" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="last-name">
                  Last Name<span>*</span>
                </label>
                <input id="last-name" type="text" placeholder="e.g. William" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email-address">
                  Email Address<span>*</span>
                </label>
                <input id="email-address" type="email" placeholder="e.g. user@signalteam.com" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="phone-number">
                  Phone Number<span>*</span>
                </label>
                <input id="phone-number" type="text" placeholder="e.g. +34 428484" />
              </div>
              <div className={`${styles.formField} ${styles.fullWidthField}`}>
                <label htmlFor="street-address">
                  Street<span>*</span>
                </label>
                <input id="street-address" type="text" placeholder="e.g. 244 Street 2" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="city">
                  City<span>*</span>
                </label>
                <input id="city" type="text" placeholder="e.g. Lincoln" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="state">
                  State<span>*</span>
                </label>
                <input id="state" type="text" placeholder="e.g. Nebraska" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="zipcode">
                  Zipcode<span>*</span>
                </label>
                <input id="zipcode" type="text" placeholder="Enter zipcode" />
              </div>
              <div className={`${styles.formField} ${styles.fullWidthField}`}>
                <label>
                  Which Best Describes Your Interest in Starting a Business? (Select all that apply)<span>*</span>
                </label>
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

              <button type="submit" className={styles.submitFormBtn}>
                Submit Form
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
