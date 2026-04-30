/**
 * Figma: nav (node 181-14784) — raster elements only. Icons use `AppNavIcons` SVGs.
 * Re-fetch if URLs expire (~7 days).
 * https://www.figma.com/design/j3NrSUOdtQXNoB2KhrQi9d/Franchise-Onboarding?node-id=181-14784&m=dev
 */
export const FIGMA_APP_NAV = {
  /** Male portrait for nav profile (RandomUser stock photo). */
  profileAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  // Use a local asset so it never expires / fails to load.
  signalLogo: "/signal-logo.svg",
} as const;
