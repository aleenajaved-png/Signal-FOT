import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import styles from "./page.module.css";

/* ── Figma asset URLs ─────────────────────────────────────────────── */
const imgSignalLogo =
  "https://www.figma.com/api/mcp/asset/8afb0407-c9e9-4397-98bb-46f73341ae8b";
const imgHero = "/franchise-hero.png";
const imgHeroOverlay = "/franchise-hero-overlay.png";
const imgContactBg =
  "https://www.figma.com/api/mcp/asset/a588ccac-e015-444b-b1f9-be37fda80f71";
const imgLocationOn =
  "https://www.figma.com/api/mcp/asset/6d55c9dc-a4fc-4c71-b317-8c5f33829fe3";
const imgLock =
  "https://www.figma.com/api/mcp/asset/6d55c9dc-a4fc-4c71-b317-8c5f33829fe3";
const imgChevronDown =
  "https://www.figma.com/api/mcp/asset/5cb85d28-5a10-45ac-a01b-1928a3a499c4";
const imgPersonIcon =
  "https://www.figma.com/api/mcp/asset/b835423e-b731-4e1d-9be1-ee6644c3b759";
const imgEmailIcon =
  "https://www.figma.com/api/mcp/asset/995f9a22-7df9-4ee1-bde6-817761acfc2f";
const imgPhoneIcon =
  "https://www.figma.com/api/mcp/asset/d997fe72-8f14-4315-9ed2-efe265182340";

export default function MarketplaceFlowPage() {
  return (
    <main className={styles.page}>

      {/* ── Top blue navigation bar ───────────────────────────────── */}
      <header className={styles.topHeader}>
        <div className={styles.logoWrap}>
          <img src={imgSignalLogo} alt="Signal" className={styles.logo} />
        </div>
        <div className={styles.topLinks}>
          <span className={styles.topLink}>
            <LocationOnOutlined style={{ fontSize: 16 }} className={styles.topLinkIcon} aria-hidden="true" />
            Find a Location
          </span>
          <span className={styles.topLink}>
            <LockOutlined style={{ fontSize: 16 }} className={styles.topLinkIcon} aria-hidden="true" />
            Login
            <KeyboardArrowDownOutlined style={{ fontSize: 16 }} className={styles.topLinkChevron} aria-hidden="true" />
          </span>
        </div>
      </header>

      {/* ── White secondary navigation bar ───────────────────────── */}
      <nav className={styles.mainNav} aria-label="Primary">
        <ul className={styles.navList}>
          <li>
            <a href="/own-a-franchise" className={styles.navItem}>
              OWN A FRANCHISE
              <KeyboardArrowDownOutlined style={{ fontSize: 16 }} className={styles.navChevron} aria-hidden="true" />
            </a>
          </li>
          <li>
            <span className={styles.navItem}>
              EXPLORE SECURITY SOLUTIONS
              <KeyboardArrowDownOutlined style={{ fontSize: 16 }} className={styles.navChevron} aria-hidden="true" />
            </span>
          </li>
          <li>
            <span className={styles.navItem}>
              JOIN OUR TEAM
              <KeyboardArrowDownOutlined style={{ fontSize: 16 }} className={styles.navChevron} aria-hidden="true" />
            </span>
          </li>
        </ul>
        <div className={styles.contactMeta}>
          <span className={styles.contactRow}>
            <EmailOutlined style={{ fontSize: 16 }} className={styles.contactIcon} aria-hidden="true" />
            lots@teamsignal.com
          </span>
          <span className={styles.contactRow}>
            <PhoneOutlined style={{ fontSize: 16 }} className={styles.contactIcon} aria-hidden="true" />
            877.498.8494
          </span>
        </div>
      </nav>

      {/* ── Hero banner ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img src={imgHero} alt="Start a security franchise" className={styles.heroImage} />
        <img src={imgHeroOverlay} alt="" className={styles.heroOverlay} aria-hidden="true" />
      </section>

      {/* ── Security partner section ──────────────────────────────── */}
      <section className={styles.partnerSection}>
        <h2 className={styles.partnerHeading}>A Security Partner You Can Trust</h2>
        <p className={styles.partnerBody}>
          At Signal, providing security goes beyond just service; it&apos;s an opportunity to
          make a lasting difference in your community. Whether you&apos;re looking to build a
          business, protect the spaces that matter most, or start a meaningful career, our
          approach is built on trust, respect, and proactive solutions. With Signal, you
          can trust in our commitment to delivering reliable, compassionate support every
          day, in every situation.
        </p>
      </section>

      {/* ── Contact / "Let's talk business" section ───────────────── */}
      <section className={styles.contactSection}>
        <img src={imgContactBg} alt="" aria-hidden="true" className={styles.contactBgImage} />
        <div className={styles.contactOverlay} />
        <h3 className={styles.contactHeading}>Lets talk business</h3>
        <form className={styles.form}>
          <div className={styles.inputRow}>
            <label className={styles.inputWrap}>
              <PersonOutlined style={{ fontSize: 16 }} className={styles.inputIcon} aria-hidden="true" />
              <input type="text" placeholder="Name" aria-label="Name" className={styles.input} />
            </label>
            <label className={styles.inputWrap}>
              <PersonOutlined style={{ fontSize: 16 }} className={styles.inputIcon} aria-hidden="true" />
              <input type="email" placeholder="Email" aria-label="Email" className={styles.input} />
            </label>
            <label className={styles.inputWrap}>
              <PersonOutlined style={{ fontSize: 16 }} className={styles.inputIcon} aria-hidden="true" />
              <input type="text" placeholder="Job Title" aria-label="Job Title" className={styles.input} />
            </label>
          </div>
          <label className={styles.inputWrap}>
            <PersonOutlined style={{ fontSize: 16 }} className={styles.inputIcon} aria-hidden="true" />
            <input type="text" placeholder="Query" aria-label="Query" className={styles.input} />
          </label>
          <button type="submit" className={styles.submitBtn}>Email</button>
        </form>
      </section>

    </main>
  );
}
