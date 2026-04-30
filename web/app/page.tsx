import { execSync } from "child_process";
import Link from "next/link";
import Badge from "@/components/Badge";
import NorthEastOutlined from "@mui/icons-material/NorthEastOutlined";
import styles from "./page.module.css";

function getLastUpdated(): string {
  try {
    const iso = execSync("git log -1 --format=%ci", { cwd: process.cwd() })
      .toString()
      .trim();
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Feb 17th, 2025";
  }
}

const signalLogo =
  "https://www.figma.com/api/mcp/asset/f302eb50-8c1d-4045-99a8-753bdea9e8a6";

const personas = ["Home Office", "Franchise Owner", "Compliance Team"];
const platformsRow1 = ["SET", "EDGE", "LOTs", "Leads"];
const platformsRow2 = ["PBX- HubSpot", "FLC"];

export default function Home() {
  const lastUpdated = getLastUpdated();
  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <img src={signalLogo} alt="Signal" className={styles.logo} />
      </header>

      {/* Main content */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          <strong>Use Case</strong>
          {" - Franchise Life Cycle"}
        </h1>

        <article className={styles.blockBordered}>
          <h2 className={styles.sectionHeading}>Problem Statement</h2>
          <p className={styles.bodyText}>
            Signal&apos;s Franchise data currently lives in HubSpot, an external system we
            do not control, requiring a migration of the source of truth to our own Lots
            platform. Additionally, the existing rule of &quot;one Lot, one Franchise&quot; needs
            to be extended to support the full Franchise lifecycle, while still ensuring
            only one Franchise is ever operational on a Lot at any given moment.{" "}
          </p>
        </article>

        <article className={styles.block}>
          <h2 className={styles.sectionHeading}>Solution</h2>
          <p className={styles.bodyText}>
            We have restructured the flows and system relationships by moving the
            Franchise object from Hubspot to LOTs platform.
          </p>
          <p className={styles.bodyText}>
            LOTS is now the single source of truth for franchise data.
          </p>
          <p className={styles.bodyText}>
            {" "}All franchise creation, edits, and updates must occur exclusively in LOTS,
            ensuring centralized control, data consistency, and system-wide alignment
          </p>
        </article>
      </section>

      {/* Meta — personas, platforms, updated date */}
      <section className={styles.meta}>
        <div className={styles.metaRow}>
          <div className={styles.metaGroup}>
            <p className={styles.groupLabel}>Persona&apos;s </p>
            <div className={styles.badges}>
              {personas.map((persona) => (
                <Badge key={persona}>{persona}</Badge>
              ))}
            </div>
          </div>

          <div className={styles.metaGroup}>
            <p className={styles.groupLabel}>Platform(s)</p>
            <div className={styles.badgeRows}>
              <div className={styles.badges}>
                {platformsRow1.map((p) => (
                  <Badge key={p}>{p}</Badge>
                ))}
              </div>
              <div className={styles.badges}>
                {platformsRow2.map((p) => (
                  <Badge key={p}>{p}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className={styles.updated}>Last updated: {lastUpdated}</p>
      </section>

      {/* CTA — Lots Marketplace Flow */}
      <Link href="/marketplace-flow" className={styles.cta}>
        <span className={styles.ctaLabel}>Lots Marketplace Flow</span>
        <span className={styles.ctaIcon} aria-hidden="true">
          <NorthEastOutlined style={{ fontSize: 24, color: "white" }} />
        </span>
      </Link>
    </main>
  );
}
