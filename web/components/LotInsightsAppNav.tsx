"use client";

import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import Image from "next/image";
import Link from "next/link";
import { oIcon } from "@/lib/muiIconSx";
import { FIGMA_APP_NAV } from "@/lib/figma-app-nav-assets";

export type AppNavActive = "lots" | "franchises";

type LotInsightsAppNavProps = {
  active: AppNavActive;
  /** e.g. "Lot Insights" (lots) or "Franchise" (franchise screens) */
  brandLabel: string;
  brandHref?: string;
};

const navIco = 16;
const chev = 14;

/**
 * Top nav: SIGNAL (raster), divider, context title, Lots / Franchises, profile.
 * Nav icons: MUI Outlined, inherit `color` for active / inactive.
 */
export function LotInsightsAppNav({ active, brandLabel, brandHref = "/franchises" }: LotInsightsAppNavProps) {
  return (
    <nav className="app-top-nav" aria-label="Main">
      <Link href={brandHref} className="app-top-nav__brand" style={{ textDecoration: "none" }} prefetch>
        <span className="app-top-nav__logo-wrap">
          <Image
            src={FIGMA_APP_NAV.signalLogo}
            alt="SIGNAL"
            width={98}
            height={28}
            className="app-top-nav__logo"
            unoptimized
            priority
          />
        </span>
        <span className="app-top-nav__sep" aria-hidden />
        <span className="app-top-nav__context">{brandLabel}</span>
      </Link>

      <div className="app-top-nav__links">
        <Link
          href="/lots"
          className="app-top-nav__link"
          data-active={active === "lots" ? "true" : "false"}
          prefetch
          aria-current={active === "lots" ? "page" : undefined}
        >
          <LocationOnOutlined sx={oIcon(navIco)} className="app-top-nav__icon-svg" />
          <span className="app-top-nav__link-text">Lots</span>
        </Link>
        <Link
          href="/franchises"
          className="app-top-nav__link"
          data-active={active === "franchises" ? "true" : "false"}
          prefetch
          aria-current={active === "franchises" ? "page" : undefined}
        >
          <StorefrontOutlined sx={oIcon(navIco)} className="app-top-nav__icon-svg" />
          <span className="app-top-nav__link-text">Franchises</span>
        </Link>
      </div>

      <div className="app-top-nav__profile" data-name="profile-notifications">
        <div className="app-top-nav__avatar" data-name="Profile">
          <Image
            src={FIGMA_APP_NAV.profileAvatar}
            alt="Profile"
            width={32}
            height={32}
            className="app-top-nav__avatar-img"
            unoptimized
          />
        </div>
        <div className="app-top-nav__profile-row">
          <div className="app-top-nav__name-block">
            <p className="app-top-nav__name">Paul Smith</p>
            <p className="app-top-nav__role">Admin</p>
          </div>
          <div className="app-top-nav__chevron" aria-hidden>
            <KeyboardArrowDownOutlined sx={oIcon(chev)} className="app-top-nav__chevron-svg" />
          </div>
        </div>
      </div>
    </nav>
  );
}