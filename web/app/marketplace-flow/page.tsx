import Link from "next/link";
import styles from "./page.module.css";

const signalLogo = "https://www.figma.com/api/mcp/asset/697c9607-2cbc-4bde-bc65-66099d6b8fc5";
const heroImage = "https://www.figma.com/api/mcp/asset/e7d37978-31d0-4a2a-a6b9-b837968d498f";
const contactBackground =
  "https://www.figma.com/api/mcp/asset/244b11b3-f689-48a5-9ae1-2c98028d3f5d";

const menuItems = ["EXPLORE SECURITY SOLUTIONS", "JOIN OUR TEAM"];

export default function MarketplaceFlowPage() {
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
            <Link href="/own-a-franchise" className={styles.navCta}>
              OWN A FRANCHISE <span aria-hidden="true">▾</span>
            </Link>
          </li>
          {menuItems.map((item) => (
            <li key={item}>
              {item} <span aria-hidden="true">▾</span>
            </li>
          ))}
        </ul>
        <div className={styles.contactMeta}>
          <p>lots@teamsignal.com</p>
          <p>877.498.8494</p>
        </div>
      </nav>

      <section className={styles.hero}>
        <img src={heroImage} alt="Start a security franchise" className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <h1>START A SECURITY FRANCHISE</h1>
        <button className={styles.carouselArrow} aria-label="Previous slide">
          ‹
        </button>
        <button className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} aria-label="Next slide">
          ›
        </button>
        <div className={styles.carouselDots} aria-hidden="true">
          <span />
          <span className={styles.activeDot} />
          <span />
        </div>
      </section>

      <section className={styles.partnerSection}>
        <h2>A Security Partner You Can Trust</h2>
        <p>
          At Signal, having security that goes beyond just service is an opportunity to
          make a lasting difference in your community. Whether you&apos;re looking to build a
          business, protect the spaces that matter most, or start a meaningful career, our
          approach is built on trust, respect, and proactive solutions. With Signal, you
          can trust in our commitment to delivering reliable, compassionate support every
          day, in every situation.
        </p>
      </section>

      <section className={styles.contactSection}>
        <img src={contactBackground} alt="" aria-hidden="true" className={styles.contactBgImage} />
        <div className={styles.contactOverlay} />
        <h3>Lets talk business</h3>
        <form className={styles.form}>
          <div className={styles.row}>
            <input type="text" placeholder="Name" aria-label="Name" />
            <input type="email" placeholder="Email" aria-label="Email" />
            <input type="text" placeholder="Job Title" aria-label="Job Title" />
          </div>
          <textarea placeholder="Query" aria-label="Query" rows={4} />
          <button type="submit">Email</button>
        </form>
      </section>
    </main>
  );
}
