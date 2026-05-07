"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { proposalsFigmaAssets as A } from "./proposals-figma-assets";

function FilterList({ className }: { className?: string }) {
  return (
    <div className={className ?? "relative size-[20px] overflow-clip"} data-node-id="529:16692" data-name="filter_list">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgFilterList} />
      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-node-id="529:16694" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector} />
      </div>
    </div>
  );
}

const PROPOSAL_ROWS: {
  id: string;
  name: string;
  company: string;
  propertyName: string;
  assignee: string;
  assigneeAvatar: string;
  billing: string;
  payment: string;
  franchise: string;
}[] = [
  {
    id: "9274",
    name: "Zorinski Lake",
    company: "Zorinski",
    propertyName: "Zorinski",
    assignee: "Aleena",
    assigneeAvatar: A.imgImage7,
    billing: "Post bill",
    payment: "Credit Card",
    franchise: "#402 Zorinski",
  },
  {
    id: "7302",
    name: "Milwaukee Tools",
    company: "Milwaukee",
    propertyName: "Milwaukee",
    assignee: "Robert Fox",
    assigneeAvatar: A.imgAvatar,
    billing: "Pre bill",
    payment: "Cash",
    franchise: "Lennox",
  },
  {
    id: "3691",
    name: "Yearly Proposal",
    company: "American Standard",
    propertyName: "American Standard",
    assignee: "Bessie Cooper",
    assigneeAvatar: A.imgAvatar1,
    billing: "Post bill",
    payment: "Check",
    franchise: "American Standard",
  },
  {
    id: "1046",
    name: "Costco Contract",
    company: "Carrier",
    propertyName: "Carrier",
    assignee: "Courtney Henry",
    assigneeAvatar: A.imgAvatar2,
    billing: "Post bill",
    payment: "Bank Transfer",
    franchise: "Carrier",
  },
  {
    id: "5824",
    name: "Fujitsu ",
    company: "Fujitsu",
    propertyName: "Fujitsu",
    assignee: "Marvin McKinney",
    assigneeAvatar: A.imgAvatar3,
    billing: "Pre bill",
    payment: "Cash",
    franchise: "Fujitsu",
  },
  {
    id: "0982",
    name: "Mitsubishi Company Proposal",
    company: "Mitsubishi Electric",
    propertyName: "Mitsubishi Electric",
    assignee: "Floyd Miles",
    assigneeAvatar: A.imgAvatar4,
    billing: "Pre bill",
    payment: "Cash",
    franchise: "Mitsubishi Electric",
  },
  {
    id: "8539",
    name: "Goodman HVACs",
    company: "Goodman",
    propertyName: "Goodman",
    assignee: "Jacob Jones",
    assigneeAvatar: A.imgAvatar5,
    billing: "Post bill",
    payment: "Credit Card",
    franchise: "Goodman",
  },
];

function NavIconButton({
  href,
  active,
  children,
  "aria-label": ariaLabel,
}: {
  href?: string;
  active?: boolean;
  children: ReactNode;
  "aria-label": string;
}) {
  const className =
    `${active ? "bg-[#146dff]" : "bg-[#262527]"} ` +
    "relative flex shrink-0 items-center justify-center rounded-[8px] p-[12px]";

  const inner = <span className={className}>{children}</span>;

  if (href) {
    return (
      <Link href={href} className="block shrink-0" aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <div className="block shrink-0" aria-current={active ? "page" : undefined} aria-label={ariaLabel}>
      {inner}
    </div>
  );
}

export default function ProposalsContractsView() {
  return (
    <div className="flex min-h-screen bg-white font-['Inter',sans-serif]" data-node-id="529:18781" data-name="140">
      {/* Sidebar — Figma 529:19374 */}
      <div
        className="relative flex h-auto min-h-screen w-[76px] shrink-0 flex-col items-start"
        data-node-id="529:19374"
        data-name="HO - Navigation-update"
      >
        <div className="relative flex h-full min-h-screen w-[76px] flex-[1_0_0] items-start justify-center overflow-clip bg-[#262527] px-2 py-4">
          <div className="relative flex shrink-0 flex-col items-center gap-4">
            <Link href="/franchise-dashboard/set" className="relative block h-[54px] w-[72px] shrink-0" aria-label="Home">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgFrame1000005452} />
            </Link>
            <div className="relative flex shrink-0 flex-col items-center justify-center">
              <div className="relative inline-grid shrink-0 place-items-start leading-none">
                <div className="relative col-start-1 row-start-1 flex flex-col items-start">
                  <NavIconButton href="/franchise-dashboard/set" aria-label="Dashboard">
                    <span className="relative flex shrink-0 items-start p-[3px]" data-name="Dashboard">
                      <span className="relative size-[14px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgMask} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Companies">
                    <span className="relative size-[20px] shrink-0">
                      <span className="absolute inset-[8.33%_8.33%_12.5%_8.33%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector1} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Map">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute inset-[4.17%_12.5%]">
                        <span className="absolute inset-[-4.09%_-5%]">
                          <img alt="" className="block size-full max-w-none" src={A.imgIcon} />
                        </span>
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Deals">
                    <span className="relative size-[20px] shrink-0">
                      <span className="absolute inset-[6.46%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector2} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Contacts">
                    <span className="relative size-[20px] shrink-0">
                      <span className="absolute inset-[10%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector3} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton active aria-label="Contracts">
                    <span className="relative size-[20px] shrink-0 overflow-clip" data-name="file-text">
                      <span className="absolute inset-[8.33%_16.67%]">
                        <span className="absolute inset-[-4.2%_-5.25%]">
                          <img alt="" className="block size-full max-w-none" src={A.imgIcon1} />
                        </span>
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Signal map">
                    <span className="relative size-[20px] shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgPublicFill0Wght400Grad0Opsz4811} />
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Users">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute left-1/2 top-1/2 size-[20px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
                        <span className="absolute inset-[12.5%_26.67%_17.5%_20.83%]">
                          <span className="absolute inset-[-5.36%_-7.14%]">
                            <img alt="" className="block size-full max-w-none" src={A.imgGroup} />
                          </span>
                        </span>
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Checklist">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute inset-[18.1%_8.33%_22.53%_10.03%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector4} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Board">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute inset-[12.5%]">
                        <span className="absolute inset-[-4%]">
                          <img alt="" className="block size-full max-w-none" src={A.imgIcon2} />
                        </span>
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Scouting">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute inset-[14.7%_5.22%_18.88%_5.21%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector5} />
                      </span>
                      <span className="absolute inset-[51.42%_93.24%_40.51%_5.21%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVector6} />
                      </span>
                    </span>
                  </NavIconButton>
                  <NavIconButton aria-label="Settings">
                    <span className="relative size-[20px] shrink-0 overflow-clip">
                      <span className="absolute inset-[4.17%]">
                        <span className="absolute inset-[-3.55%]">
                          <img alt="" className="block size-full max-w-none" src={A.imgIcon3} />
                        </span>
                      </span>
                    </span>
                  </NavIconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-label="Collapse navigation"
          className="absolute left-[62px] top-[436px] flex size-[28px] items-center justify-center"
        >
          <span className="flex-none rotate-180">
            <span className="relative block size-[28px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgLastPageFill0Wght400Grad0Opsz481} />
            </span>
          </span>
        </button>
      </div>

      {/* Main — Figma 529:18812 */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col" data-node-id="529:18812">
        <header
          className="flex h-[50px] shrink-0 items-center gap-8 border-b border-solid border-[#e6e6e7] bg-white px-8 py-[9px]"
          data-node-id="529:18813"
          data-name="header"
        >
          <div className="relative flex min-w-0 flex-1 items-center gap-4">
            <div className="relative flex h-6 shrink-0 items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded p-2.5">
                <span className="relative size-5 shrink-0 overflow-clip" data-name="file-text">
                  <span className="absolute inset-[8.33%_16.67%]">
                    <span className="absolute inset-[-4.2%_-5.25%]">
                      <img alt="" className="block size-full max-w-none" src={A.imgIcon4} />
                    </span>
                  </span>
                </span>
              </span>
              <p className="shrink-0 whitespace-nowrap text-[14px] font-bold leading-5 text-[#262527]">Contracts</p>
            </div>
          </div>
          <div className="flex h-9 shrink-0 items-center justify-center gap-2 overflow-clip rounded-lg border border-solid border-[#e6e6e7] bg-white px-3.5 py-2">
            <p className="shrink-0 whitespace-nowrap text-[14px] font-medium leading-5 text-[#444446]">United States</p>
            <span className="relative size-5 shrink-0 overflow-clip" data-name="chevron-down">
              <span className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
                <span className="absolute inset-[-16.7%_-8.35%]">
                  <img alt="" className="block size-full max-w-none" src={A.imgIcon5} />
                </span>
              </span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4" data-name="profile-notifications">
            <span className="relative flex shrink-0 items-start" data-name="notifications">
              <span className="relative size-5 shrink-0 overflow-clip" data-name="bell">
                <span className="absolute inset-[8.33%_12.5%_8.35%_12.5%]">
                  <span className="absolute inset-[-4.5%_-5%]">
                    <img alt="" className="block size-full max-w-none" src={A.imgIcon6} />
                  </span>
                </span>
              </span>
            </span>
            <div className="flex shrink-0 items-center gap-2" data-name="Profile">
              <span className="relative size-8 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" height={32} width={32} src={A.imgProperty1Ellipse} />
              </span>
              <div className="flex shrink-0 items-start gap-1" data-name="Profile Name">
                <div className="relative inline-grid shrink-0 place-items-start whitespace-nowrap not-italic">
                  <p className="col-start-1 row-start-1 ml-0 mt-0 text-[14px] font-medium leading-5 text-[#444446]">Jeff Zolos</p>
                  <p className="col-start-1 row-start-1 ml-0 mt-[19px] text-[12px] font-normal leading-[18px] text-[#86868b]">BD Executive</p>
                </div>
                <span className="relative flex shrink-0 items-start pt-1">
                  <span className="relative size-3.5 shrink-0 overflow-clip">
                    <span className="absolute inset-[33.75%_21.25%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={A.imgVectorStroke} />
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Title row — 529:18814 */}
        <div className="flex w-full shrink-0 flex-col items-start px-8 py-2.5">
          <div className="flex w-full shrink-0 items-center justify-between">
            <p className="shrink-0 whitespace-nowrap text-[20px] font-bold leading-7 text-[#262527]">Contracts</p>
            <div className="flex shrink-0 rounded-lg border border-solid border-[#aeaeb2]" data-name="Button">
              <div className="flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid border-[#e6e6e7] bg-white px-3.5 py-2 overflow-hidden">
                <p className="shrink-0 whitespace-nowrap text-[14px] font-medium leading-5 text-[#444446]">01/14/2024 - 01/18/2024</p>
                <span className="relative size-4 shrink-0 overflow-clip">
                  <span className="absolute inset-[8.33%_12.5%]">
                    <span className="absolute inset-[-5.63%_-6.25%]">
                      <img alt="" className="block size-full max-w-none" src={A.imgIcon7} />
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions — 529:18818 */}
        <div className="flex w-full shrink-0 flex-col items-start px-8 pb-3">
          <div className="flex h-9 w-full shrink-0 items-center justify-between" data-node-id="529:18819" data-name="Actions">
            <div className="flex h-full shrink-0 items-start gap-2">
              <div className="flex h-9 w-[220px] shrink-0 flex-col items-start">
                <div className="flex min-h-0 w-full flex-1 flex-col items-start">
                  <div className="flex min-h-0 w-full flex-1 items-center rounded-lg border border-solid border-[#e6e6e7] bg-white px-3.5 py-2.5">
                    <div className="relative flex min-w-0 flex-1 items-center gap-2">
                      <span className="relative size-5 shrink-0 overflow-clip">
                        <span className="absolute inset-[12.5%]">
                          <span className="absolute inset-[-5.56%]">
                            <img alt="" className="block size-full max-w-none" src={A.imgIcon8} />
                          </span>
                        </span>
                      </span>
                      <label className="sr-only" htmlFor="contract-search">
                        Search by Contracts ID
                      </label>
                      <input
                        id="contract-search"
                        placeholder="Search by Contracts ID"
                        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px] font-medium leading-5 text-[#262527] outline-none placeholder:text-[#cccccc]"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-white px-3.5 py-2 whitespace-nowrap"
              >
                <span className="text-[14px] font-medium leading-5 text-[#262527]">Assigned to</span>
                <span className="relative size-5 shrink-0 overflow-clip">
                  <span className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
                    <span className="absolute inset-[-15%_-7.5%]">
                      <img alt="" className="block size-full max-w-none" src={A.imgIcon9} />
                    </span>
                  </span>
                </span>
              </button>
              <button type="button" className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-white px-3.5 py-2 whitespace-nowrap">
                <span className="text-[14px] font-medium leading-5 text-[#262527]">Company</span>
                <span className="relative size-5 shrink-0 overflow-clip">
                  <span className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
                    <span className="absolute inset-[-15%_-7.5%]">
                      <img alt="" className="block size-full max-w-none" src={A.imgIcon9} />
                    </span>
                  </span>
                </span>
              </button>
              <button type="button" className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-white px-3.5 py-2 whitespace-nowrap">
                <span className="text-[14px] font-medium leading-5 text-[#262527]">More Filters</span>
                <span className="flex w-3 shrink-0 flex-col items-center justify-center rounded-[75px] bg-[#e43f32] p-[1.5px]">
                  <span className="w-full text-center text-[7.5px] font-medium leading-none text-white">3</span>
                </span>
                <FilterList />
              </button>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-solid border-[#e6e6e7] bg-white px-3.5 py-2"
            >
              <span className="relative size-5 shrink-0 overflow-clip">
                <span className="absolute inset-[12.45%_4.15%_12.5%_4.13%]">
                  <span className="absolute inset-[-5.56%_-4.55%]">
                    <img alt="" className="block size-full max-w-none" src={A.imgIcon10} />
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap text-[14px] font-normal leading-5 text-[#444446]">Export</span>
            </button>
          </div>
        </div>

        {/* Table — 529:18856 */}
        <div className="flex min-w-0 flex-1 flex-col gap-[11px] px-8 pb-8">
          <div className="w-full shrink-0 overflow-x-auto overflow-y-clip">
            <div className="inline-flex shrink-0" data-node-id="529:18857">
              <ProposalTableColumns rows={PROPOSAL_ROWS} />
            </div>
          </div>
          {/* Pagination */}
          <div
            className="flex h-14 w-full shrink-0 flex-col items-center justify-center border-t border-solid border-[#e6e6e7] bg-white"
            data-node-id="529:19046"
            data-name="Pagination"
          >
            <div className="relative flex min-h-0 w-full flex-1 min-w-px items-center gap-6 px-6 py-2.5">
              <p className="relative min-w-px flex-[1_0_0] text-right text-[14px] font-normal leading-5 text-[#444446]">
                1-7 of 7
              </p>
              <div className="flex shrink-0 items-start gap-3" data-node-id="I529:19046;10324:142689" data-name="Actions">
                <button
                  type="button"
                  aria-label="Previous page"
                  className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[19px] border border-solid border-[#d0cfd2] bg-white p-2"
                >
                  <span className="relative size-5 shrink-0 overflow-clip">
                    <span className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4">
                      <span className="absolute inset-[-10%_-20%]">
                        <img alt="" className="block size-full max-w-none" src={A.imgIcon11} />
                      </span>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[19px] border border-solid border-[#d0cfd2] bg-white p-2"
                >
                  <span className="relative size-5 shrink-0 overflow-clip">
                    <span className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4">
                      <span className="absolute inset-[-10%_-20%]">
                        <img alt="" className="block size-full max-w-none" src={A.imgIcon12} />
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const th = "h-11 border-t border-solid border-[#e6e6e7] px-6 py-3 text-left align-middle";
const td = "border-t border-solid border-[#e6e6e7] px-6 py-4";
const thText = "whitespace-nowrap text-[12px] font-medium leading-[18px] text-[#5b5b5f]";
const tdMuted = "whitespace-nowrap text-[14px] font-normal leading-5 text-[#86868b]";
const tdStrong = "whitespace-nowrap text-[14px] font-medium leading-5 text-[#262527]";

function ProposalTableColumns({
  rows,
}: {
  rows: (typeof PROPOSAL_ROWS)[number][];
}) {
  return (
    <table className="w-max min-w-full border-collapse border-0">
      <thead>
        <tr>
          <th className={`${th} w-[132px] min-w-[132.4px]`}>
            <span className={thText}>Contracts ID</span>
          </th>
          <th className={`${th} w-[242px]`}>
            <span className={thText}>Contracts Name</span>
          </th>
          <th className={`${th} w-[177px]`}>
            <span className={thText}>Company</span>
          </th>
          <th className={`${th} w-[177px]`}>
            <span className={thText}>Property Name</span>
          </th>
          <th className={`${th} w-[219px]`}>
            <span className={thText}>Assigned to</span>
          </th>
          <th className={`${th} w-[132px]`}>
            <span className={thText}>Billing Type</span>
          </th>
          <th className={`${th} w-[132px]`}>
            <span className={thText}>Payment Method</span>
          </th>
          <th className={`${th} w-[177px]`}>
            <span className={thText}>Associated Franchise</span>
          </th>
          <th className={`${th} w-[132px]`}>
            <span className={thText}>Start Date</span>
          </th>
          <th className={`${th} w-[132px]`}>
            <span className={thText}>End Date</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td className={td}>
              <span className={tdStrong}>{row.id}</span>
            </td>
            <td className={td}>
              <span className={tdStrong}>{row.name.trimEnd()}</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>{row.company}</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>{row.propertyName}</span>
            </td>
            <td className={td}>
              <div className="flex w-[105px] max-w-[105px] items-center gap-2">
                <span className="relative size-6 shrink-0 overflow-hidden rounded-full">
                  <img alt="" className="pointer-events-none size-full object-cover" src={row.assigneeAvatar} />
                </span>
                <span className={tdMuted}>{row.assignee}</span>
              </div>
            </td>
            <td className={td}>
              <span className={tdMuted}>{row.billing}</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>{row.payment}</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>{row.franchise}</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>12/24/26</span>
            </td>
            <td className={td}>
              <span className={tdMuted}>1/24/27</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
