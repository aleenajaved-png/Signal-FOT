"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import AppsOutlined from "@mui/icons-material/AppsOutlined";
import BusinessOutlined from "@mui/icons-material/BusinessOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import ChecklistOutlined from "@mui/icons-material/ChecklistOutlined";
import ViewColumnOutlined from "@mui/icons-material/ViewColumnOutlined";
import TravelExploreOutlined from "@mui/icons-material/TravelExploreOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import { oIcon } from "@/lib/muiIconSx";

function NavItem({
  href,
  active,
  label,
  children,
}: {
  href?: string;
  active?: boolean;
  label: string;
  children: ReactNode;
}) {
  const className =
    `${active ? "bg-[#146dff]" : "bg-transparent hover:bg-white/10"} ` +
    "flex shrink-0 items-center justify-center rounded-[8px] p-3 transition-colors";

  const inner = <span className={className}>{children}</span>;

  if (href) {
    return (
      <Link href={href} className="block shrink-0" aria-label={label} aria-current={active ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className="block shrink-0 border-0 bg-transparent p-0" aria-label={label}>
      {inner}
    </button>
  );
}

const iconSx = { color: "#fff" } as const;

export function SetFranchiseSidebar({ active = "dashboard" }: { active?: "dashboard" | "contracts" }) {
  return (
    <aside
      className="sticky top-0 z-30 flex h-screen w-[76px] shrink-0 flex-col items-center bg-[#262527] px-2 py-4"
      data-name="HO - Navigation-update"
    >
      <Link href="/franchise-dashboard/set" className="relative mb-4 block h-[54px] w-[72px] shrink-0" aria-label="Signal home">
        <Image src="/signal-logo.svg" alt="Signal" fill className="object-contain" priority />
      </Link>

      <nav className="flex flex-col items-center gap-0" aria-label="Main navigation">
        <NavItem href="/franchise-dashboard/set" active={active === "dashboard"} label="Dashboard">
          <AppsOutlined sx={oIcon(14, iconSx)} />
        </NavItem>
        <NavItem label="Companies">
          <BusinessOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Map">
          <PlaceOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Deals">
          <HandshakeOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Contacts">
          <ContactsOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Signal map">
          <PublicOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Users">
          <PersonOutlineOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Checklist">
          <ChecklistOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Board">
          <ViewColumnOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Scouting">
          <TravelExploreOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
        <NavItem label="Settings">
          <SettingsOutlined sx={oIcon(20, iconSx)} />
        </NavItem>
      </nav>

      <button
        type="button"
        className="mt-auto flex size-7 rotate-180 items-center justify-center rounded text-white/70 hover:text-white"
        aria-label="Collapse navigation"
      >
        <ChevronRightOutlined sx={oIcon(20, iconSx)} />
      </button>
    </aside>
  );
}
