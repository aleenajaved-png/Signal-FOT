"use client";

import { useState } from "react";
import styles from "./page.module.css";

const powerBiLogo = "https://www.figma.com/api/mcp/asset/ae7d0d6f-0ada-4f24-a9a6-d26badd3316a";

const steps = [
  {
    step: "Step 1",
    title: "Compliance Form Setup",
    body: "A designated Admin creates a Compliance Type Form in the FO App, defines substages (Default, FO Compliance, Compliance), and attaches it to a Profile or directly to an Onboarding Deal.",
  },
  {
    step: "Step 2",
    title: "Compliance User Review",
    body: "The Compliance User fills the Compliance substages, reviews FO submissions, and verifies all required fields are complete and at least one Lot is assigned to the deal.",
  },
  {
    step: "Step 3",
    title: "Approve & Create Franchise",
    body: `The Compliance User clicks "Approve and Create Franchise", reviews the confirmation listing all associated Lots, and confirms to trigger Franchise creation.`,
  },
];

const slides = [
  {
    id: 1,
    content: (
      <div className={styles.slide01}>
        <header className={styles.slideHeader}>
          <div className={styles.logoWrap}>
            <img src={powerBiLogo} alt="Power BI" className={styles.powerBiIcon} />
            <span className={styles.powerBiLabel}>Power BI</span>
          </div>
        </header>

        <div className={styles.slideBody}>
          <h1 className={styles.slideTitle}>Franchise Onboarding Application</h1>

          <div className={styles.stepList}>
            {steps.map((s) => (
              <div key={s.step} className={styles.stepRow}>
                <div className={styles.stepMeta}>
                  <span className={styles.stepLabel}>{s.step}</span>
                  <strong className={styles.stepName}>{s.title}</strong>
                </div>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <a className={styles.workflowCta} href="/franchise-onboarding">
          <span>Work flow at FLC Power App</span>
          <span className={styles.ctaArrow}>›|</span>
        </a>
      </div>
    ),
  },
  /* future slides go here */
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className={styles.sliderWrap}>
      <div className={styles.slideTrack} style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slidePane}>
            {slide.content}
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className={styles.sliderControls}>
          <button type="button" className={styles.navBtn} onClick={prev} aria-label="Previous slide">
            ‹
          </button>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.navBtn} onClick={next} aria-label="Next slide">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
