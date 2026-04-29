import Link from "next/link";
import styles from "./page.module.css";

const signalLogo =
  "https://www.figma.com/api/mcp/asset/c01147ee-1020-4448-8245-558f07aee9a7";

const personas = ["Home Office", "Franchise Owner", "Sales Rep", "Compliance Team"];
const platforms = ["SET", "EDGE", "LOTs", "Leads", "PBX- HubSpot", "BPO- HubSpot"];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <img src={signalLogo} alt="Signal" className={styles.logo} />
      </header>

      <section className={styles.content}>
        <h1 className={styles.title}>
          <strong>Use Case</strong> - Franchise Onboarding
        </h1>

        <article className={styles.block}>
          <h2>Problem Statement</h2>
          <p>
            Signal&apos;s Franchise data currently lives in HubSpot, an external system we
            do not control, requiring a migration of the source of truth to our own Lots
            platform. Additionally, the existing rule of &quot;one Lot, one Franchise&quot; needs
            to be extended to support the full Franchise lifecycle, while still ensuring
            only one Franchise is ever operational on a Lot at any given moment.
          </p>
        </article>

        <article className={styles.block}>
          <h2>Solution</h2>
          <p>
            We have restructured the flows and system relationships by moving the
            Franchise object from HubSpot to LOTs platform.
          </p>
          <p>LOTS is now the single source of truth for franchise data.</p>
          <p>
            All franchise creation, edits, and updates must occur exclusively in LOTS,
            ensuring centralized control, data consistency, and system-wide alignment.
          </p>
        </article>
      </section>

      <section className={styles.meta}>
        <div className={styles.group}>
          <p className={styles.groupLabel}>Persona&apos;s</p>
          <div className={styles.badges}>
            {personas.map((persona) => (
              <span key={persona} className={styles.badge}>
                {persona}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupLabel}>Platform(s)</p>
          <div className={styles.badges}>
            {platforms.map((platform) => (
              <span key={platform} className={styles.badge}>
                {platform}
              </span>
            ))}
          </div>
        </div>

        <p className={styles.updated}>Last updated: Feb 17th, 2025</p>
      </section>

      <Link href="/marketplace-flow" className={styles.cta}>
        <span>Lots Marketplace Flow</span>
        <span className={styles.arrow} aria-hidden="true">
          &rsaquo;
        </span>
      </Link>
    </main>
  );
}
