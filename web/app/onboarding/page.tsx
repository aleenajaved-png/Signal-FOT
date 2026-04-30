"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const powerBiLogo = "/power-bi-logo.png";

const slide03Asset = {
  signalLogo: "/onboarding-slide03/signal-logo.svg",
  monitor: "/onboarding-slide03/icon-monitor.svg",
  smartphone: "/onboarding-slide03/icon-smartphone.svg",
  ctaArrow: "/onboarding-slide03/cta-arrow.svg",
} as const;

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
  {
    id: 2,
    content: (
      <div className={styles.slide02Placeholder}>
        <span className={styles.slide02PlaceholderText}>Slide 2</span>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className={styles.slide03}>
        <header className={styles.slide03Header}>
          <div className={styles.slide03Logo}>
            <img src={slide03Asset.signalLogo} alt="Signal" className={styles.slide03LogoImg} />
          </div>
          <div className={styles.slide03HeaderSpacer} aria-hidden />
        </header>

        <div className={styles.slide03Main}>
          <div className={styles.slide03PersonaRow}>
            <span className={styles.slide03PersonaLabel}>Persona&apos;s</span>
            <div className={styles.slide03Badge}>
              <p className={styles.slide03BadgeText}>Sales Rep</p>
            </div>
          </div>

          <p className={styles.slide03HeroTitle}>
            <span className={styles.slide03HeroBold}>Use Case</span>
            <span>{" - "}</span>
            <span>Sign Contracts</span>
          </p>

          <section className={`${styles.slide03Section} ${styles.slide03SectionDivider}`}>
            <h2 className={styles.slide03SectionTitle}>Problem Statement</h2>
            <p className={styles.slide03SectionBody}>
              After the transition of a lot with another existing franchise, the contracts are duplicated to the new franchise and needs to be
              re-signed before the effective date
            </p>
            <div className={styles.slide03SectionSpacer} aria-hidden />
          </section>

          <section className={styles.slide03Section}>
            <h2 className={styles.slide03SectionTitle}>Solution</h2>
            <p className={styles.slide03SectionBody}>
              We introduced a widget on SET - dashboard in which the sales person will see all the contracts that are to be signed before the effective
              date with the new franchise for smooth transition
            </p>
            <div className={styles.slide03SectionSpacer} aria-hidden />
          </section>

          <div className={styles.slide03Devices}>
            <button type="button" className={styles.slide03DeviceBtn} aria-label="Desktop view">
              <img src={slide03Asset.monitor} alt="" className={styles.slide03DeviceIcon} />
            </button>
            <button type="button" className={styles.slide03DeviceBtn} aria-label="Mobile view">
              <img src={slide03Asset.smartphone} alt="" className={styles.slide03DeviceIcon} />
            </button>
          </div>
        </div>

        <a className={styles.slide03Cta} href="/franchise-dashboard">
          <p className={styles.slide03CtaText}>Lets see SET Dashboard</p>
          <img src={slide03Asset.ctaArrow} alt="" className={styles.slide03CtaIcon} />
        </a>
      </div>
    ),
  },
];

function OnboardingSlider() {
  const searchParams = useSearchParams();
  const slideQs = searchParams.get("slide");
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (!slideQs) return;
    const n = parseInt(slideQs, 10);
    if (!Number.isFinite(n)) return;
    const idx = Math.min(Math.max(n - 1, 0), total - 1);
    setCurrent(idx);
  }, [slideQs, total]);

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

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={<div className={styles.sliderWrap} style={{ background: "#000", minHeight: "100vh" }} aria-hidden />}
    >
      <OnboardingSlider />
    </Suspense>
  );
}
