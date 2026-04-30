"use client";

import { useState } from "react";

const imgIcon = "https://www.figma.com/api/mcp/asset/ba5715cb-519e-40d9-8c91-51d4fd573d21";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/05e2b8c1-6f56-4680-830a-44b2353c902e";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/c40fffb6-4549-448c-bd20-75c8d89940b5";
/** Donut graphic — Figma New Lots Linked expanded 539:15929 */
const imgLotsLinkedDonut539 = "https://www.figma.com/api/mcp/asset/066cd330-76b3-40b2-9f15-569641e039a5";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/c82d7704-88f8-4910-ad97-86d155760fc4";
const imgLine299 = "https://www.figma.com/api/mcp/asset/eb104204-a7c9-4693-beed-d35736c44d2e";
const imgGroup1000002987 = "https://www.figma.com/api/mcp/asset/ac9a564c-f956-41dd-ab53-19bf5ed1f0c8";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/1ab5594b-c3d9-42f8-9b43-e2cbfb784446";
const imgProperty1Ellipse = "https://www.figma.com/api/mcp/asset/b4977fc4-b307-4c2a-9089-e56f42bbad3d";
const imgLine272 = "https://www.figma.com/api/mcp/asset/a5f5637c-0413-440d-9610-59f67df92deb";
const imgMask = "https://www.figma.com/api/mcp/asset/2d56ee21-607c-4269-ae66-e63d4f263777";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/3a75be70-95a8-4e42-a23e-0e42c7929789";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/1f6c7d61-8e9e-44d6-8582-a486d3449991";
const imgVectorStroke = "https://www.figma.com/api/mcp/asset/80128320-0e82-4853-b181-b200533233a8";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/93494411-ed03-4ff4-bb34-3e885e6c8f0c";
const imgLine269 = "https://www.figma.com/api/mcp/asset/f85343ff-96a7-4b6b-9a3a-be3762b06964";
const imgLine276 = "https://www.figma.com/api/mcp/asset/a7de5c12-35eb-49c5-86cc-39e0a7d650c2";
const imgLine278 = "https://www.figma.com/api/mcp/asset/c3dfb3a3-1006-4b08-a879-99e154df3a18";
const imgLine301 = "https://www.figma.com/api/mcp/asset/7dca65d4-e4f0-44f0-b4b5-2550c7df2da9";
const imgGroup1000002984 = "https://www.figma.com/api/mcp/asset/c0d616b8-26ba-48d1-a548-329b32865d81";
const imgGroup289284 = "https://www.figma.com/api/mcp/asset/e9859944-cbf1-429e-99b7-33369b9dba6c";
const imgLine302 = "https://www.figma.com/api/mcp/asset/84d37c7b-9f06-4d4f-ae5f-4b475c6af85f";
const imgLine300 = "https://www.figma.com/api/mcp/asset/38b9e194-50fb-40b0-8d65-bcf32720fd26";
const imgFrame1000006923 = "https://www.figma.com/api/mcp/asset/3f5a9d62-e18b-49bb-b877-f50c1294ba9c";
const imgFrame1000007470 = "https://www.figma.com/api/mcp/asset/97824301-8ba8-4b5f-9964-af2c58819094";
const imgFrame1000007471 = "https://www.figma.com/api/mcp/asset/f0dab409-e795-45c9-b0e0-5b8a5f048912";
const imgFrame1000007473 = "https://www.figma.com/api/mcp/asset/af74cf5d-7be1-49ce-bfae-b329bd6c53a2";
const imgFrame1000007472 = "https://www.figma.com/api/mcp/asset/e85a3e3c-4e11-48ce-92fa-d9620d059f13";
const imgRectangle286 = "https://www.figma.com/api/mcp/asset/5c5723b6-3f43-4c93-b50f-521d41ac6d3d";
const imgRectangle287 = "https://www.figma.com/api/mcp/asset/a55303eb-1f30-4118-b35c-103e24db0d8f";
const imgEllipse755 = "https://www.figma.com/api/mcp/asset/afc87cd1-8e15-4325-8598-354b80cb6a77";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/9c8625e3-dd7a-4512-a676-17a07bede232";
const imgGroup289285 = "https://www.figma.com/api/mcp/asset/e97aff45-f8e9-4451-a034-5213f3f456c5";
const imgFrame1000005452 = "https://www.figma.com/api/mcp/asset/16c3d0ed-da54-4917-92b0-d73c6ba12f25";
const imgMask1 = "https://www.figma.com/api/mcp/asset/37d9c2bd-788c-49c8-a3ba-55153da734f5";
const imgVector = "https://www.figma.com/api/mcp/asset/2bdb0188-2a86-4c27-bfda-83921b15c631";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/db587553-40a1-4e77-8bc1-9815a51ca9d7";
const imgVector1 = "https://www.figma.com/api/mcp/asset/137903df-193e-4533-9cdf-be3a649a803c";
const imgVector2 = "https://www.figma.com/api/mcp/asset/b8f88ea7-6c94-4d86-b0fd-29b9a3e1886d";
const imgPublicFill0Wght400Grad0Opsz4811 = "https://www.figma.com/api/mcp/asset/88f39f39-4c79-43bf-bf8d-81c5a55aee3b";
const imgGroup = "https://www.figma.com/api/mcp/asset/8a25130e-5d04-41b1-916f-62394cd83de7";
const imgVector3 = "https://www.figma.com/api/mcp/asset/432e04c2-d6bc-4282-9cc2-fcf2abbddc98";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/7e8f4d46-f026-4983-92b5-3ee665060a47";
const imgVector4 = "https://www.figma.com/api/mcp/asset/2c09242c-e9bd-4e0e-989f-5841e9a24472";
const imgVector5 = "https://www.figma.com/api/mcp/asset/a405ed4a-149d-422d-841c-99a688cd5e04";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/f1013d8a-b815-4ba0-a3f0-295af88420ca";
const imgLastPageFill0Wght400Grad0Opsz481 = "https://www.figma.com/api/mcp/asset/7473c03d-fbe0-4eda-baaa-f94b6caf8e9a";

type ContainerProps = {
  className?: string;
};

/** New Lots Linked banner — collapsed (Variant3) vs expanded (Figma 539:15929) */
function Container({ className }: ContainerProps) {
  const [expanded, setExpanded] = useState(false);
  const collapsed = !expanded;

  const shell =
    `${className ?? ""} content-stretch relative flex w-full flex-col items-start border-b border-solid pb-px ` +
    (collapsed ? "border-[#e6e6e7] bg-[#f5f5f6]" : "border-white bg-[#fff7ed]");

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((v) => !v)}
      className={shell}
      id={collapsed ? "node-442_25435" : "node-442_24129"}
      data-name="New Lots Linked card"
    >
      <div
        className="relative flex h-[56px] w-full shrink-0 items-center justify-between px-[32px] py-[16px]"
        id={collapsed ? "node-442_25436" : "node-442_25395"}
        data-name="Button"
        data-node-id="539:15930"
      >
        <div className="relative h-[40px] w-[325.516px] shrink-0" id={collapsed ? "node-442_25437" : "node-442_25396"} data-name="Container">
          <div className="relative flex size-full items-center gap-3">
            <div
              className="relative size-[35px] shrink-0 rounded-[8.75px]"
              id={collapsed ? "node-442_25438" : "node-442_25397"}
              style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 147, 50) 0%, rgb(255, 122, 0) 100%)" }}
              data-name="Container"
            >
              <div className="relative flex size-full items-center justify-center px-[8.75px]">
                <div className="relative size-[17.5px] shrink-0" id={collapsed ? "node-442_25439" : "node-442_25398"} data-name="Icon">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgIcon} />
                </div>
              </div>
            </div>
            <div className="relative min-w-0 flex-1" id={collapsed ? "node-442_25442" : "node-442_25401"} data-name="Container">
              <div className="relative flex size-full flex-col items-start">
                <div className="relative h-6 w-full shrink-0" id={collapsed ? "node-442_25443" : "node-442_25402"} data-name="Heading 3">
                  <p
                    className="absolute left-0 top-[-1px] whitespace-nowrap text-left font-['Inter',sans-serif] text-[14px] font-semibold leading-6 text-[#262527]"
                    id={collapsed ? "node-442_25444" : "node-442_25403"}
                  >
                    New Lots Linked
                  </p>
                </div>
                <div className="relative h-4 w-full shrink-0" id={collapsed ? "node-442_25445" : "node-442_25404"} data-name="Paragraph">
                  <p
                    className="absolute left-0 top-[0.5px] whitespace-nowrap text-left font-['Inter',sans-serif] text-[12px] font-medium leading-4 text-[#86868b]"
                    id={collapsed ? "node-442_25446" : "node-442_25405"}
                  >
                    1 of 7 contracts signed · Deadline: May 15, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-5 w-[199.883px] shrink-0" id={collapsed ? "node-442_25447" : "node-442_25406"} data-name="Container">
          <div className="relative size-full">
            <div className="absolute left-0 top-0 flex h-5 w-[163.883px] items-center gap-2" id={collapsed ? "node-442_25448" : "node-442_25407"} data-name="Container">
              <div
                className={`relative min-w-0 flex-1 rounded-full ${collapsed ? "bg-white" : "bg-[#e6e6e7]"}`}
                id={collapsed ? "node-442_25552" : "node-442_25408"}
                data-name="Container"
              >
                <div className="relative h-2 w-full overflow-hidden rounded-[inherit]">
                  <div
                    className="h-2 rounded-full bg-[#146dff]"
                    id={collapsed ? "node-442_25553" : "node-442_25409"}
                    data-name="Container"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>
              <div className="relative h-5 w-[27.883px] shrink-0" id={collapsed ? "node-442_25451" : "node-442_25410"} data-name="Text">
                <p
                  className="absolute left-[14px] top-[0.5px] -translate-x-1/2 whitespace-nowrap text-center font-['Inter',sans-serif] text-[14px] font-semibold leading-5 text-[#262527]"
                  id={collapsed ? "node-442_25452" : "node-442_25411"}
                >
                  28%
                </p>
              </div>
            </div>
            {expanded && (
              <div className="absolute left-[179.88px] top-0 flex size-5 items-center justify-center">
                <div className="flex-none rotate-180">
                  <div className="relative size-5" data-node-id="539:15947" data-name="Icon">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgIcon1} />
                  </div>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="absolute left-[179.88px] top-0 size-5" data-node-id="442:25453" data-name="Icon">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgIcon3} />
              </div>
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <div
          className="relative flex w-full shrink-0 flex-wrap items-start justify-between gap-6 border-t border-solid border-[#e6e6e7] px-[32px] pb-5 pt-[21px] shadow-[0px_10px_32px_-8px_rgba(0,0,0,0.06)]"
          data-node-id="539:15949"
          data-name="Container"
        >
          <div className="relative min-w-0 max-w-[986px] flex-1" data-node-id="539:15950" data-name="Container">
            <div className="relative flex w-full flex-col items-start gap-4">
              <p
                className="w-full text-left font-['Inter',sans-serif] text-[14px] font-normal leading-[22.75px] text-[#5b5b5f]"
                data-node-id="539:15952"
              >
                Some lots have been assigned to your franchise. Complete all contract signings before the effective date to ensure a smooth
                transition.
              </p>
              <div className="relative flex h-12 w-full shrink-0 items-start gap-6" data-node-id="539:15953" data-name="Container">
                <div className="relative h-12 w-[86.984px] shrink-0" data-node-id="539:15954" data-name="Container">
                  <div className="relative flex size-full flex-col items-start gap-1">
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15956">
                      Leads
                    </p>
                    <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-7 text-[#262527]" data-node-id="539:15958">
                      3000
                    </p>
                  </div>
                </div>
                <div className="relative h-12 w-[86.984px] shrink-0" data-node-id="539:15959" data-name="Container">
                  <div className="relative flex size-full flex-col items-start gap-1">
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15961">
                      Total Contracts
                    </p>
                    <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-7 text-[#262527]" data-node-id="539:15963">
                      7
                    </p>
                  </div>
                </div>
                <div className="relative h-12 w-[39.273px] shrink-0" data-node-id="539:15964" data-name="Container">
                  <div className="relative flex size-full flex-col items-start gap-1">
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15966">
                      Signed
                    </p>
                    <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-7 text-[#146dff]" data-node-id="539:15968">
                      2
                    </p>
                  </div>
                </div>
                <div className="relative h-12 w-[46.195px] shrink-0" data-node-id="539:15969" data-name="Container">
                  <div className="relative flex size-full flex-col items-start gap-1">
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15971">
                      Pending
                    </p>
                    <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-7 text-[#ff9332]" data-node-id="539:15973">
                      5
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="relative flex h-[45px] w-[819px] shrink-0 flex-col items-start rounded-[10px] border border-solid border-[#ffe4b3] bg-[#fff4e6] px-[13px] pb-px pt-[13px]"
                data-node-id="539:15974"
                data-name="Container"
              >
                <div className="relative h-[19.5px] w-full shrink-0" data-node-id="539:15975" data-name="Container">
                  <div className="absolute left-0 top-0.5 size-4" data-node-id="539:15976" data-name="Icon">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgIcon2} />
                  </div>
                  <div className="absolute left-6 top-0 h-[19.5px] w-[769.898px]" data-node-id="539:15979" data-name="Container">
                    <p className="absolute left-0 top-[0.5px] whitespace-nowrap font-['Inter',sans-serif] text-[12px] font-semibold leading-[19.5px] text-[#262527]" data-node-id="539:15980">
                      <span>Effective date of this lot with the franchise is 15 May 2026.</span>
                      <span className="font-normal">{` All contracts must be signed before this date to ensure a smooth transition.`}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[120px] w-[228.781px] shrink-0" data-node-id="539:15981" data-name="Container">
            <div className="relative size-full">
              <div className="absolute left-0 top-0 size-[120px]" data-node-id="539:15984">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLotsLinkedDonut539} />
              </div>
              <div className="absolute left-[33px] top-9 flex w-[54.75px] flex-col items-center" data-node-id="539:15987">
                <p className="w-full text-left font-['Inter',sans-serif] text-[24px] font-bold leading-8 text-[#262527]" data-node-id="539:15989">
                  28%
                </p>
                <p className="w-full text-left font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15991">
                  Complete
                </p>
              </div>
              <div className="absolute left-[144px] top-[22px] flex h-[76px] w-[84.781px] flex-col items-start gap-3" data-node-id="539:15992" data-name="Container">
                <div className="relative flex h-8 w-full shrink-0 items-center gap-2" data-node-id="539:15993" data-name="Container">
                  <div className="size-3 shrink-0 rounded-md bg-[#146dff]" data-node-id="539:15994" data-name="Container" />
                  <div className="relative flex shrink-0 flex-col" data-node-id="539:15995" data-name="Container">
                    <p className="font-['Inter',sans-serif] text-[12px] font-medium leading-4 text-[#262527]" data-node-id="539:15997">
                      Signed
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:15999">
                      2 contracts
                    </p>
                  </div>
                </div>
                <div className="relative flex min-h-8 min-w-0 flex-1 items-center gap-2" data-node-id="539:16000" data-name="Container">
                  <div className="size-3 shrink-0 rounded-md bg-[#ff9332]" data-node-id="539:16001" data-name="Container" />
                  <div className="relative flex min-w-0 flex-1 flex-col" data-node-id="539:16002" data-name="Container">
                    <p className="font-['Inter',sans-serif] text-[12px] font-medium leading-4 text-[#262527]" data-node-id="539:16004">
                      Pending
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-4 text-[#86868b]" data-node-id="539:16006">
                      5 contracts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

type ContractsProps = {
  className?: string;
  property1?: "royalty";
};

function Contracts({ className, property1 = "royalty" }: ContractsProps) {
  return (
    <div className={className || "h-[156px] relative w-[842px]"} data-node-id="429:19845">
      <div className="absolute flex inset-[4.26%_0_95.74%_7.06%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-node-id="429:19846">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine299} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[31.21%_0_68.79%_7.06%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-node-id="429:19847">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine299} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[31.21%_0_68.79%_7.06%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-node-id="429:19848">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine299} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[58.16%_0_41.84%_7.06%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-node-id="429:19849">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine299} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[85.11%_0_14.89%_7.06%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-node-id="429:19850">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine299} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[9.93%] content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium items-center justify-between leading-[14px] left-[calc(50%-398.46px)] not-italic text-[#86868b] text-[10px] text-right top-0 whitespace-nowrap" data-node-id="429:19851" data-name="amount">
        <p className="relative shrink-0" data-node-id="429:19852">
          800
        </p>
        <p className="relative shrink-0" data-node-id="429:19853">
          600
        </p>
        <p className="relative shrink-0" data-node-id="429:19854">
          400
        </p>
        <p className="relative shrink-0" data-node-id="429:19855">
          200
        </p>
        <p className="relative shrink-0" data-node-id="429:19856">
          0
        </p>
      </div>
      <div className="absolute content-stretch flex font-['Inter:Medium',sans-serif] font-medium inset-[90.55%_0_0.48%_7.06%] items-start justify-between leading-[0] not-italic text-[#86868b] text-[8px] text-center whitespace-nowrap" data-node-id="429:19857">
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19858">
          <p className="leading-[14px]">Jan’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19859">
          <p className="leading-[14px]">Feb’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19860">
          <p className="leading-[14px]">Mar’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19861">
          <p className="leading-[14px]">Apr’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19862">
          <p className="leading-[14px]">May’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19863">
          <p className="leading-[14px]">Jun’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19864">
          <p className="leading-[14px]">Jul’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19865">
          <p className="leading-[14px]">Aug’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19866">
          <p className="leading-[14px]">Sep’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19867">
          <p className="leading-[14px]">Oct’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19868">
          <p className="leading-[14px]">Nov’ 23</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:19869">
          <p className="leading-[14px]">Dec’ 23</p>
        </div>
      </div>
      <div className="absolute h-[126px] left-[62.5px] top-[7px] w-[777.5px]" data-node-id="429:19870">
        <div className="absolute inset-[-0.79%_-0.13%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1000002987} />
        </div>
      </div>
    </div>
  );
}

type CostcoSecurityPlanProps = {
  className?: string;
  property1?: "Default";
};

function CostcoSecurityPlan({ className, property1 = "Default" }: CostcoSecurityPlanProps) {
  return (
    <div className={className || "content-stretch flex gap-[10px] h-[36px] items-center px-[8px] py-[4px] relative"} data-node-id="429:19828">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="429:19829">
        <p className="leading-[20px]">15 Sep, 2024</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="429:19830" data-name="calendar">
        <div className="absolute inset-[8.33%_12.5%]" data-node-id="I429:19830;495:87296" data-name="Icon">
          <div className="absolute inset-[-4.5%_-5%]">
            <img alt="" className="block max-w-none size-full" src={imgIcon4} />
          </div>
        </div>
      </div>
    </div>
  );
}

type AvatarProps = {
  className?: string;
  property1?: "ellipse";
};

function Avatar({ className, property1 = "ellipse" }: AvatarProps) {
  return (
    <div className={className || "relative size-[32px]"} data-node-id="429:20494">
      <img alt="" className="absolute block inset-0 max-w-none size-full" height="32" src={imgProperty1Ellipse} width="32" />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white relative min-h-screen min-w-[1440px] overflow-auto" data-node-id="429:20710" data-name="Dashboard">
      <div className="absolute flex h-[280px] items-center justify-center left-[76px] top-[144px] w-0">
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[280px]" data-node-id="429:20798">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine272} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border-[#e6e6e7] border-b border-solid content-stretch flex gap-[14px] h-[50px] items-center left-[76px] right-0 px-[32px] py-[13px] top-0" data-node-id="431:22474" data-name="header">
        <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-w-px relative" data-node-id="431:22475">
          <div className="h-[24px] relative shrink-0 w-[1075px]" data-node-id="431:22476" data-name=".breadcrumb">
            <div className="absolute content-stretch flex gap-[8px] items-center left-0 top-0" data-node-id="I431:22476;3572:77630">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="I431:22476;999:148047" data-name="breadcrumb">
                <div className="content-stretch flex items-center justify-center p-[10px] relative rounded-[4px] shrink-0 size-[24px]" data-node-id="I431:22476;999:147979" data-name="Icons">
                  <div className="content-stretch flex items-start p-[3px] relative shrink-0" data-node-id="I431:22476;999:148042" data-name="Dashboard">
                    <div className="relative shrink-0 size-[14px]" data-node-id="I431:22476;999:148042;999:147989" data-name="Mask">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMask} />
                    </div>
                  </div>
                </div>
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="I431:22476;999:147982">
                  Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e6e6e7] border-solid content-stretch flex gap-[8px] h-[36px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="431:22478" data-name="switcher">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="431:22479">
            United States
          </p>
          <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="431:22480" data-name="chevron-down">
            <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I431:22480;495:87128" data-name="Icon">
              <div className="absolute inset-[-16.7%_-8.35%]">
                <img alt="" className="block max-w-none size-full" src={imgIcon5} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="431:22481" data-name="profile-notifications">
          <div className="content-stretch flex items-start relative shrink-0" data-node-id="431:22482" data-name="notifications">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="431:22483" data-name="bell">
              <div className="absolute inset-[8.33%_12.5%_8.35%_12.5%]" data-node-id="I431:22483;495:86834" data-name="Icon">
                <div className="absolute inset-[-4.5%_-5%]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon6} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="431:22484" data-name="Profile">
            <Avatar className="relative shrink-0 size-[32px]" />
            <div className="content-stretch flex flex-row gap-[8px] items-center relative shrink-0" data-node-id="431:22486" data-name="Profile Name">
              <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-node-id="431:22487" data-name="client">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#444446] text-[14px]" data-node-id="431:22488">
                  Jeff Zolos
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#86868b] text-[12px]" data-node-id="431:22489">
                  BD Executive
                </p>
              </div>
              <div className="content-stretch flex items-center self-center relative shrink-0" data-node-id="431:22490">
                <div className="overflow-clip relative shrink-0 size-[14px]" data-node-id="431:22491" data-name="icon / chevron-down">
                  <div className="absolute inset-[33.75%_21.25%]" data-node-id="I431:22491;1983:10589" data-name="Vector (Stroke)">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVectorStroke} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[66px] top-[117px]" data-node-id="431:22523">
        <div className="absolute content-stretch flex gap-[8px] items-start right-[33px] top-[117px]" data-node-id="429:20711">
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20712" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20712;1385:6770" data-name="_Button base">
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5b5b5f] text-[0px] whitespace-nowrap" data-node-id="I429:20712;1385:6771">
                <p>
                  <span className="leading-[20px] text-[14px]">{`States `}</span>
                  <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[10px]">•</span>
                  <span className="leading-[20px] text-[14px]">{` All`}</span>
                </p>
              </div>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20712;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20712;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20713" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20713;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20713;1385:6771">
                Member
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20713;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20713;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CostcoSecurityPlan className="content-stretch flex gap-[10px] h-[36px] items-center px-[8px] py-[4px] relative shrink-0" />
        </div>
        <div className="absolute content-stretch flex gap-[8px] items-start right-[33px] top-[771px]" data-node-id="429:20715">
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20716" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20716;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20716;1385:6771">
                Contracts
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20716;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20716;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20717" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20717;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20717;1385:6771">
                Visits
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20717;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20717;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20718" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20718;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20718;1385:6771">
                Revenue
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20718;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20718;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20719" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20719;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20719;1385:6771">
                States • All
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20719;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20719;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-start relative rounded-[8px] shrink-0" data-node-id="429:20720" data-name="Button">
            <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[8px] shrink-0" data-node-id="I429:20720;1385:6770" data-name="_Button base">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#5b5b5f] text-[14px] whitespace-nowrap" data-node-id="I429:20720;1385:6771">
                Member
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:20720;1385:6772" data-name="chevron-down">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-node-id="I429:20720;1385:6772;495:87128" data-name="Icon">
                  <div className="absolute inset-[-18.75%_-9.38%]">
                    <img alt="" className="block max-w-none size-full" src={imgIcon7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CostcoSecurityPlan className="content-stretch flex gap-[10px] h-[36px] items-center px-[8px] py-[4px] relative shrink-0" />
        </div>
        <div className="absolute h-0 right-px top-[172px] w-[1364px]" data-node-id="429:20722">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine269} />
          </div>
        </div>
        <div className="absolute h-0 right-[455px] top-[453px] w-[910px]" data-node-id="429:20723">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine276} />
          </div>
        </div>
        <div className="absolute h-0 right-0 top-[733px] w-[1374px]" data-node-id="429:20724">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine278} />
          </div>
        </div>
        <div className="absolute h-0 right-0 top-[1253px] w-[1365px]" data-node-id="429:20725">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine301} />
          </div>
        </div>
        <div className="absolute h-0 right-0 top-[1631px] w-[1365px]" data-node-id="429:20726">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine301} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[107px] not-italic text-[#262527] text-[22px] top-[134px] whitespace-nowrap" data-node-id="429:20727">
          <p className="leading-[30px]">Sales Insights</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[108px] not-italic text-[#262527] text-[14px] top-[495px] whitespace-nowrap" data-node-id="429:20728">
          <p className="leading-[20px]">Sales Funnel</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[136px] not-italic text-[#262527] text-[36px] top-[866px] whitespace-nowrap" data-node-id="429:20729">
          <p className="leading-[normal]">🥇</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[136px] not-italic text-[#262527] text-[36px] top-[932px] whitespace-nowrap" data-node-id="429:20730">
          <p className="leading-[normal]">🥈</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[136px] not-italic text-[#262527] text-[36px] top-[995px] whitespace-nowrap" data-node-id="429:20731">
          <p className="leading-[normal]">🥉</p>
        </div>
        <div className="absolute left-[828.13px] size-[110.227px] top-[288.12px]" data-node-id="429:20732">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1000002984} />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[107px] top-[316px]" data-node-id="429:20734">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="429:20735">
            <div className="flex items-center justify-center relative shrink-0 size-[10px]">
              <div className="flex-none rotate-90">
                <div className="bg-[#a9deff] rounded-[2px] size-[10px]" data-node-id="429:20736" />
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20737">
              New
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-pre" data-node-id="429:20738">{` •  `}</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20739">
              13,000
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="429:20740">
            <div className="flex items-center justify-center relative shrink-0 size-[10px]">
              <div className="flex-none rotate-90">
                <div className="bg-[#ffa95b] rounded-[2px] size-[10px]" data-node-id="429:20741" />
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20742">
              Old
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-pre" data-node-id="429:20743">{` •  `}</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20744">
              12,000
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="429:20745">
            <div className="flex items-center justify-center relative shrink-0 size-[10px]">
              <div className="flex-none rotate-90">
                <div className="bg-[#146dff] rounded-[2px] size-[10px]" data-node-id="429:20746" />
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20747">
              Existing
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-pre" data-node-id="429:20748">{` •  `}</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20749">
              15,000
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="429:20750">
            <div className="flex items-center justify-center relative shrink-0 size-[10px]">
              <div className="flex-none rotate-90">
                <div className="bg-[#e43f32] rounded-[2px] size-[10px]" data-node-id="429:20751" />
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20752">
              Lost
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-pre" data-node-id="429:20753">{` •  `}</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:20754">
              12,000
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[32px] items-start leading-[0] left-[656px] top-[486px]" data-node-id="429:20755">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20756">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20757">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#146dff] rounded-[2px] size-[10px]" data-node-id="429:20758" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20759" style={{ fontVariationSettings: "'wdth' 100" }}>
                Visits
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20760">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20761">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#ffa95b] rounded-[2px] size-[10px]" data-node-id="429:20762" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20763" style={{ fontVariationSettings: "'wdth' 100" }}>
                Proposal
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20764">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20765">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#31a150] rounded-[2px] size-[10px]" data-node-id="429:20766" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20767" style={{ fontVariationSettings: "'wdth' 100" }}>
                Contracts
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20768">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20769">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#e43f32] rounded-[2px] size-[10px]" data-node-id="429:20770" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20771" style={{ fontVariationSettings: "'wdth' 100" }}>
                Lost
              </p>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[32px] items-start leading-[0] left-[calc(50%-1px)] top-[1206px]" data-node-id="429:20772">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20773">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20774">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#146dff] rounded-[2px] size-[10px]" data-node-id="429:20775" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20776" style={{ fontVariationSettings: "'wdth' 100" }}>
                Visits
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20777">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20778">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#ff9332] rounded-[2px] size-[10px]" data-node-id="429:20779" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20780" style={{ fontVariationSettings: "'wdth' 100" }}>
                Proposal
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20781">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20782">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#31a150] rounded-[2px] size-[10px]" data-node-id="429:20783" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20784" style={{ fontVariationSettings: "'wdth' 100" }}>
                Contracts
              </p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:20785">
            <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:20786">
              <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                <div className="flex-none rotate-90">
                  <div className="bg-[#e43f32] rounded-[2px] size-[10px]" data-node-id="429:20787" />
                </div>
              </div>
              <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:20788" style={{ fontVariationSettings: "'wdth' 100" }}>
                Lost
              </p>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[110px] not-italic text-[#262527] text-[14px] top-[214px] whitespace-nowrap" data-node-id="429:20789">
          <p className="leading-[20px]">Visits</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[110px] not-italic text-[#262527] text-[22px] top-[242px] whitespace-nowrap" data-node-id="429:20790">
          <p className="leading-[30px]">50,000</p>
        </div>
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[107px] not-italic text-[#5b5b5f] text-[10px] top-[288px] whitespace-nowrap" data-node-id="429:20791">
          Breakdown by Location type
        </p>
        <div className="absolute contents left-[356px] top-[285px]" data-node-id="429:20792">
          <div className="absolute left-[356px] size-[140px] top-[285px]" data-node-id="429:20793">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup289284} />
          </div>
        </div>
        <div className="absolute flex h-[280px] items-center justify-center left-[530px] top-[172px] w-0">
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[280px]" data-node-id="429:20799">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine272} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[280px] items-center justify-center left-[985px] top-[172px] w-0">
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[280px]" data-node-id="429:20800">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine272} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[378px] items-center justify-center left-[757px] top-[1253px] w-0">
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[378px]" data-node-id="429:20801">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine302} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[280px] items-center justify-center left-[985px] top-[453px] w-0">
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[280px]" data-node-id="429:20802">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine272} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[1010px] not-italic text-[#262527] text-[14px] top-[214px] whitespace-nowrap" data-node-id="429:20803">
          <p className="leading-[20px]">Key Metrics</p>
        </div>
        <Contracts className="absolute h-[156px] left-[107px] top-[549px] w-[855px]" />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[107px] not-italic text-[#262527] text-[14px] top-[779px] whitespace-nowrap" data-node-id="429:20805">
          Sales Insights - Individuals
        </p>
        <div className="-translate-x-1/2 absolute flex h-[81px] items-center justify-center left-[115px] top-[952px] w-[16px]">
          <div className="-rotate-90 flex-none">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative text-[#262527] text-[12px] text-center whitespace-nowrap" data-node-id="429:20806">
              Sales Persons
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[292px] items-start justify-between leading-[16px] left-[174px] not-italic text-[12px] top-[848px] whitespace-nowrap" data-node-id="429:20807">
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-node-id="429:20808">
            <p className="relative shrink-0 text-[#86868b]" data-node-id="429:20809">
              Abbie D.
            </p>
            <p className="relative shrink-0 text-[#262527]" data-node-id="429:20810">
              $32,534
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-node-id="429:20811">
            <p className="relative shrink-0 text-[#86868b]" data-node-id="429:20812">
              Areli H.
            </p>
            <p className="relative shrink-0 text-[#262527]" data-node-id="429:20813">
              $32,534
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-node-id="429:20814">
            <p className="relative shrink-0 text-[#86868b]" data-node-id="429:20815">
              Ashton T.
            </p>
            <p className="relative shrink-0 text-[#262527]" data-node-id="429:20816">
              $32,534
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-node-id="429:20817">
            <p className="relative shrink-0 text-[#86868b]" data-node-id="429:20818">
              Ben H.
            </p>
            <p className="relative shrink-0 text-[#262527]" data-node-id="429:20819">
              $32,534
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-node-id="429:20820">
            <p className="relative shrink-0 text-[#86868b]" data-node-id="429:20821">
              Catherine H.
            </p>
            <p className="relative shrink-0 text-[#262527]" data-node-id="429:20822">
              $32,534
            </p>
          </div>
        </div>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[257px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20823">
          0
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[360.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20824">
          100
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[458.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20825">
          200
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[558px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20826">
          300
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[659px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20827">
          400
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[759.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20828">
          500
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[860.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20829">
          600
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[961px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20830">
          700
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[1063.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20831">
          800
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[1162.5px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20832">
          900
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[1262px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20833">
          1000
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[1365px] not-italic text-[#6a6a70] text-[14px] text-center top-[1165px] whitespace-nowrap" data-node-id="429:20834">
          1100
        </p>
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[1463px] not-italic text-[#6a6a70] text-[14px] text-center top-[1145px] whitespace-nowrap" data-node-id="429:20835">
          1200
        </p>
        <div className="absolute h-0 left-[257px] top-[1157px] w-[1150px]" data-node-id="429:20836">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine300} />
          </div>
        </div>
        <div className="absolute h-[327px] left-[257px] top-[830px] w-[1182px]" data-node-id="429:20837">
          <div className="absolute inset-[0_-2.07%_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgFrame1000006923} />
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[288px] items-start justify-between left-[257px] top-[849px] w-[1124px]" data-node-id="429:20851">
          <div className="h-[28px] relative shrink-0 w-[1026px]" data-node-id="429:20852">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007470} />
          </div>
          <div className="h-[28px] relative shrink-0 w-[951px]" data-node-id="429:20857">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007471} />
          </div>
          <div className="h-[28px] relative shrink-0 w-[1086px]" data-node-id="429:20862">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007473} />
          </div>
          <div className="h-[28px] relative shrink-0 w-[951px]" data-node-id="429:20867">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007472} />
          </div>
          <div className="content-stretch flex h-[28px] items-start relative rounded-[10px] shrink-0 w-full" data-node-id="429:20872">
            <div className="bg-[#e43f32] flex-[1_0_0] h-full min-w-px" data-node-id="429:20873" />
            <div className="flex flex-[1_0_0] h-full items-center justify-center min-w-px relative" style={{ containerType: "size" }}>
              <div className="-scale-y-100 flex-none h-[100cqw] rotate-90 w-[100cqh]">
                <div className="relative size-full" data-node-id="429:20874">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle286} />
                </div>
              </div>
            </div>
            <div className="flex flex-[1_0_0] h-full items-center justify-center min-w-px relative" style={{ containerType: "size" }}>
              <div className="-scale-y-100 flex-none h-[100cqw] rotate-90 w-[100cqh]">
                <div className="relative size-full" data-node-id="429:20875">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle287} />
                </div>
              </div>
            </div>
            <div className="bg-[#146dff] h-[28px] rounded-br-[8px] rounded-tr-[8px] shrink-0 w-[671px]" data-node-id="429:20876" />
          </div>
        </div>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[107px] not-italic text-[#262527] text-[14px] top-[1293px] whitespace-nowrap" data-node-id="429:20877">
          Proposals Won
        </p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[799px] not-italic text-[#262527] text-[14px] top-[1293px] whitespace-nowrap" data-node-id="429:20878">
          Proposals Lost
        </p>
        <div className="absolute content-stretch flex h-[455px] items-start justify-between left-[1007px] top-[250px] w-[397px]" data-node-id="429:20879">
          <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full items-start justify-between leading-[0] not-italic relative shrink-0 text-[#86868b] text-[14px] w-[180px] whitespace-nowrap" data-node-id="429:20880">
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20881">
              <p className="leading-[24px]">Total Visits</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20882">
              <p className="leading-[24px]">Decision Maker Meetings</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20883">
              <p className="leading-[24px]">Proposals Sent</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20884">
              <p className="leading-[24px]">Proposals Won</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20885">
              <p className="leading-[24px]">Proposals Lost</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20886">
              <p className="leading-[24px]">Avg. Proposal Revenue</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20887">
              <p className="leading-[24px]">Contract Monthly Revenue</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20888">
              <p className="leading-[24px]">Avg. Contract Revenue</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20889">
              <p className="leading-[24px]">Visits per Proposal</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20890">
              <p className="leading-[24px]">Visits per Contract</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="429:20891">
              <p className="leading-[24px]">Sales Person / Intern</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0" data-node-id="429:20892">
            <div className="content-stretch flex items-start relative shrink-0" data-node-id="429:20893">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="429:20894">
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20895">
                  <p className="leading-[24px]">50,000</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-node-id="429:20896">
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20897">
                <p className="leading-[24px]">1000</p>
              </div>
              <div className="relative shrink-0 size-[3px]" data-node-id="429:20898">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse755} />
              </div>
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20899">
                <p className="leading-[24px]">25%</p>
              </div>
            </div>
            <div className="content-stretch flex items-start relative shrink-0" data-node-id="429:20900">
              <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-node-id="429:20901">
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20902">
                  <p className="leading-[24px]">2568</p>
                </div>
                <div className="relative shrink-0 size-[3px]" data-node-id="429:20903">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse755} />
                </div>
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20904">
                  <p className="leading-[24px]">20%</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-start relative shrink-0" data-node-id="429:20905">
              <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-node-id="429:20906">
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20907">
                  <p className="leading-[24px]">12,568</p>
                </div>
                <div className="relative shrink-0 size-[3px]" data-node-id="429:20908">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse755} />
                </div>
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20909">
                  <p className="leading-[24px]">20%</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-start relative shrink-0" data-node-id="429:20910">
              <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-node-id="429:20911">
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20912">
                  <p className="leading-[24px]">37,568</p>
                </div>
                <div className="relative shrink-0 size-[3px]" data-node-id="429:20913">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse755} />
                </div>
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20914">
                  <p className="leading-[24px]">80%</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20915">
              <p className="leading-[24px]">$3,135</p>
            </div>
            <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-node-id="429:20916">
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20917">
                <p className="leading-[24px]">$365</p>
              </div>
              <div className="relative shrink-0 size-[3px]" data-node-id="429:20918">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse755} />
              </div>
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20919">
                <p className="leading-[24px]">8%</p>
              </div>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20920">
              <p className="leading-[24px]">$2,568</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20921">
              <p className="leading-[24px]">15</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20922">
              <p className="leading-[24px]">26</p>
            </div>
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262527] text-[14px] whitespace-nowrap" data-node-id="429:20923">
              <p className="leading-[24px]">100</p>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-310px)] top-[1341px] w-[606px]" data-node-id="429:20924" data-name="Content">
          <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-node-id="429:20925" data-name="Content">
            <div className="content-stretch flex flex-[1_0_0] items-start min-w-px overflow-x-auto overflow-y-clip relative" data-node-id="429:20926">
              <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="429:20927" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20928" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:20928;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20928;1224:4556;1221:106889">
                      Location
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20929" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20930" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20930;22223:98755">
                    Kingston Cove
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20931" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20932" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20932;22223:98755">
                    Danish Village
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20933" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20934" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20934;22223:98755">
                    Stratford East
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20935" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20936" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20936;22223:98755">
                    Stratford West
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20937" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20938" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20938;22223:98755">
                    Pine Creek Apartments
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20939" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-node-id="429:20940" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20941" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:20941;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20941;1224:4556;1221:106889">
                      Proposal Date
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20942" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20943" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20943;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20944" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20945" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20945;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20946" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20947" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20947;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20948" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20949" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20949;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20950" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20951" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20951;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20952" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="429:20953" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20954" data-name="Table header cell">
                  <div className="content-stretch flex items-center relative shrink-0" data-node-id="I429:20954;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20954;1224:4556;1221:106781">
                      Amount
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20955" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20956" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20956;22223:98755">
                    $609.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20957" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20958" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20958;22223:98755">
                    $265.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20959" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20960" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20960;22223:98755">
                    $487.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20961" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20962" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20962;22223:98755">
                    $487.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20963" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20964" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20964;22223:98755">
                    $403.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20965" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-node-id="429:20966" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20967" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:20967;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20967;1224:4556;1221:106889">
                      Terms
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20968" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20969" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20969;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20970" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20971" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20971;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20972" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20973" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20973;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20974" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20975" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20975;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20976" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20977" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20977;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20978" data-name="Divider" />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%+385px)] top-[1341px] w-[612px]" data-node-id="429:20979" data-name="Content">
          <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-node-id="429:20980" data-name="Content">
            <div className="content-stretch flex flex-[1_0_0] items-start min-w-px overflow-x-auto overflow-y-clip relative" data-node-id="429:20981">
              <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="429:20982" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20983" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:20983;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20983;1224:4556;1221:106889">
                      Location
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20984" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20985" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20985;22223:98755">
                    Bradley Fair Shopping Center
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20986" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20987" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20987;22223:98755">
                    Bradley Fair Shopping Center
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20988" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20989" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20989;22223:98755">
                    Opportunity Drive Shelter
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20990" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20991" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20991;22223:98755">
                    Wichita OPCO LLC
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20992" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20993" data-name="Table cell">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#444446] text-[14px] whitespace-nowrap" data-node-id="I429:20993;22223:98755">
                    GracePoint Church
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20994" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-node-id="429:20995" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:20996" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:20996;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:20996;1224:4556;1221:106889">
                      Proposal Date
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20997" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:20998" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:20998;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:20999" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21000" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21000;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21001" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21002" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21002;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21003" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21004" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21004;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21005" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21006" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21006;22223:98755">
                    01/23/24
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21007" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="429:21008" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:21009" data-name="Table header cell">
                  <div className="content-stretch flex items-center relative shrink-0" data-node-id="I429:21009;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:21009;1224:4556;1221:106781">
                      Amount
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21010" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21011" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21011;22223:98755">
                    $609.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21012" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21013" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21013;22223:98755">
                    $265.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21014" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21015" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21015;22223:98755">
                    $487.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21016" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21017" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21017;22223:98755">
                    $487.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21018" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21019" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21019;22223:98755">
                    $403.00
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21020" data-name="Divider" />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-w-px relative" data-node-id="429:21021" data-name="Column">
                <div className="bg-white border-[#e6e6e7] border-solid border-t content-stretch flex h-[44px] items-center justify-end px-[24px] py-[12px] relative shrink-0 w-full" data-node-id="429:21022" data-name="Table header cell">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="I429:21022;1224:4556" data-name="Table header">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#5b5b5f] text-[12px] whitespace-nowrap" data-node-id="I429:21022;1224:4556;1221:106889">
                      Terms
                    </p>
                  </div>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21023" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21024" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21024;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21025" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21026" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21026;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21027" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21028" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21028;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21029" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21030" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21030;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21031" data-name="Divider" />
                <div className="content-stretch flex h-[48px] items-center justify-end px-[24px] py-[16px] relative shrink-0 w-full" data-node-id="429:21032" data-name="Table cell">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#86868b] text-[14px] whitespace-nowrap" data-node-id="I429:21032;22223:98755">
                    Monthly
                  </p>
                </div>
                <div className="bg-[#e6e6e7] h-px shrink-0 w-full" data-node-id="429:21033" data-name="Divider" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex items-start left-[1294px] top-[1205px]" data-node-id="429:21034" data-name="Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-node-id="I429:21034;1385:6791" data-name="_Button base">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#146dff] text-[14px] whitespace-nowrap" data-node-id="I429:21034;1385:6792">
              View All Users
            </p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:21034;1385:6793" data-name="chevron-right">
              <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="I429:21034;1385:6793;495:87242" data-name="Icon">
                <div className="absolute inset-[-9.38%_-18.75%]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon8} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex items-start left-[1337px] top-[1293px]" data-node-id="429:21035" data-name="Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-node-id="I429:21035;1385:6791" data-name="_Button base">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#146dff] text-[14px] whitespace-nowrap" data-node-id="I429:21035;1385:6792">{`View All `}</p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:21035;1385:6793" data-name="chevron-right">
              <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="I429:21035;1385:6793;495:87242" data-name="Icon">
                <div className="absolute inset-[-9.38%_-18.75%]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon8} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex items-start left-[645px] top-[1293px]" data-node-id="429:21036" data-name="Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-node-id="I429:21036;1385:6791" data-name="_Button base">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#146dff] text-[14px] whitespace-nowrap" data-node-id="I429:21036;1385:6792">{`View All `}</p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I429:21036;1385:6793" data-name="chevron-right">
              <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="I429:21036;1385:6793;495:87242" data-name="Icon">
                <div className="absolute inset-[-9.38%_-18.75%]">
                  <img alt="" className="block max-w-none size-full" src={imgIcon8} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[825px] size-[130px] top-[293px]" data-node-id="429:21037">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup289285} />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[31px] items-start left-[562px] top-[204px]" data-node-id="429:21041">
          <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold gap-[3px] items-start leading-[0] not-italic relative shrink-0 text-[#262527] whitespace-nowrap" data-node-id="429:21042">
            <div className="flex flex-col justify-center relative shrink-0 text-[14px]" data-node-id="429:21043">
              <p className="leading-[20px]">Contract Signed</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[22px]" data-node-id="429:21044">
              <p className="leading-[30px]">$1,634,011</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-node-id="429:21045">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#5b5b5f] text-[10px] whitespace-nowrap" data-node-id="429:21046">
              Breakdown by Deal stage
            </p>
            <div className="content-stretch flex gap-[20px] items-start leading-[0] relative shrink-0" data-node-id="429:21047">
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0" data-node-id="429:21048">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:21049">
                  <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:21050">
                    <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                      <div className="flex-none rotate-90">
                        <div className="bg-[#146dff] rounded-[2px] size-[10px]" data-node-id="429:21051" />
                      </div>
                    </div>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:21052">
                      Proposal in Draft
                    </p>
                  </div>
                  <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[16px] ml-[14px] mt-[17px] not-italic relative row-1 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:21053">
                    $2,133,542
                  </p>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:21054">
                  <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:21055">
                    <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                      <div className="flex-none rotate-90">
                        <div className="bg-[#ff9332] rounded-[2px] size-[10px]" data-node-id="429:21056" />
                      </div>
                    </div>
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:21057">{`Proposal in Review `}</p>
                  </div>
                  <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[16px] ml-[14px] mt-[17px] not-italic relative row-1 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:21058">
                    $1,034,011
                  </p>
                </div>
              </div>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="429:21059">
                <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-node-id="429:21060">
                  <div className="flex items-center justify-center relative shrink-0 size-[10px]">
                    <div className="flex-none rotate-90">
                      <div className="bg-[#31a150] rounded-[2px] size-[10px]" data-node-id="429:21061" />
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#86868b] text-[12px] whitespace-nowrap" data-node-id="429:21062">{`Contract Signed `}</p>
                </div>
                <p className="col-1 font-['Inter:Bold',sans-serif] font-bold leading-[16px] ml-[14px] mt-[17px] not-italic relative row-1 text-[#262527] text-[12px] whitespace-nowrap" data-node-id="429:21063">
                  $1,634,011
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="absolute left-[76px] right-0 top-[50px] flex cursor-pointer flex-col items-start" />
      <div className="absolute content-stretch flex h-[1619px] items-start left-0 top-0 w-[76px]" data-node-id="429:21065" data-name="HO - Navigation-update">
        <div className="bg-[#262527] content-stretch flex flex-[1_0_0] h-full items-start justify-center min-w-px overflow-clip px-[8px] py-[16px] relative" data-node-id="I429:21065;22223:97437">
          <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-node-id="I429:21065;22223:97438">
            <div className="h-[54px] relative shrink-0 w-[72px]" data-node-id="I429:21065;22223:97439">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000005452} />
            </div>
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-node-id="I429:21065;22223:97446">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I429:21065;22223:97447">
                <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1" data-node-id="I429:21065;22223:97448">
                  <div className="bg-[#146dff] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97449" data-name="dashboard_item">
                    <div className="content-stretch flex items-start p-[3px] relative shrink-0" data-node-id="I429:21065;22223:97449;1004:156616" data-name="Dashboard">
                      <div className="relative shrink-0 size-[14px]" data-node-id="I429:21065;22223:97449;1004:156616;999:147989" data-name="Mask">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMask1} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97450" data-name="dashboard_item">
                    <div className="relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97450;1004:156621" data-name="company">
                      <div className="absolute inset-[8.33%_8.33%_12.5%_8.33%]" data-node-id="I429:21065;22223:97450;1004:156621;4670:79714" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97451" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97451;1004:156621" data-name="map-pin">
                      <div className="absolute inset-[4.17%_12.5%]" data-node-id="I429:21065;22223:97451;1004:156621;495:86858" data-name="Icon">
                        <div className="absolute inset-[-4.09%_-5%]">
                          <img alt="" className="block max-w-none size-full" src={imgIcon9} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97452" data-name="dashboard_item">
                    <div className="relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97452;1004:156621" data-name="deal">
                      <div className="absolute inset-[6.46%]" data-node-id="I429:21065;22223:97452;1004:156621;4670:82038" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97453" data-name="dashboard_item">
                    <div className="relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97453;1004:156621" data-name="contact">
                      <div className="absolute inset-[10%]" data-node-id="I429:21065;22223:97453;1004:156621;4670:89534" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97454" data-name="dashboard_item">
                    <div className="content-stretch flex items-center relative shrink-0" data-node-id="I429:21065;22223:97454;1004:156621" data-name="Signal map">
                      <div className="relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97454;1004:156621;999:147994" data-name="public_FILL0_wght400_GRAD0_opsz48 (1) 1">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPublicFill0Wght400Grad0Opsz4811} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97455" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97455;1004:156621" data-name="Users">
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[20px] top-1/2" data-node-id="I429:21065;22223:97455;1004:156621;999:148009" data-name="lucide:user">
                        <div className="absolute inset-[12.5%_26.67%_17.5%_20.83%]" data-node-id="I429:21065;22223:97455;1004:156621;999:148010" data-name="Group">
                          <div className="absolute inset-[-5.36%_-7.14%]">
                            <img alt="" className="block max-w-none size-full" src={imgGroup} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;46336:170850" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;46336:170850;1004:156621" data-name="ChecklistRounded">
                      <div className="absolute inset-[18.1%_8.33%_22.53%_10.03%]" data-node-id="I429:21065;46336:170850;1004:156621;5013:90857" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97458" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97458;1004:156621" data-name="trello">
                      <div className="absolute inset-[12.5%]" data-node-id="I429:21065;22223:97458;1004:156621;495:87170" data-name="Icon">
                        <div className="absolute inset-[-4%]">
                          <img alt="" className="block max-w-none size-full" src={imgIcon10} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97456" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97456;1004:156621" data-name="Scouting">
                      <div className="absolute inset-[14.7%_5.22%_18.88%_5.21%]" data-node-id="I429:21065;22223:97456;1004:156621;1663:182570" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                      </div>
                      <div className="absolute inset-[51.42%_93.24%_40.51%_5.21%]" data-node-id="I429:21065;22223:97456;1004:156621;1663:182571" data-name="Vector">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#262527] content-stretch flex items-center justify-center p-[12px] relative rounded-[8px] shrink-0" data-node-id="I429:21065;22223:97459" data-name="dashboard_item">
                    <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="I429:21065;22223:97459;1004:156621" data-name="settings">
                      <div className="absolute inset-[4.17%]" data-node-id="I429:21065;22223:97459;1004:156621;495:86870" data-name="Icon">
                        <div className="absolute inset-[-3.55%]">
                          <img alt="" className="block max-w-none size-full" src={imgIcon11} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[62px] size-[28px] top-[436px]">
          <div className="flex-none rotate-180">
            <button className="block cursor-pointer relative size-[28px]" data-node-id="I429:21065;22223:97460" data-name="last_page_FILL0_wght400_GRAD0_opsz48 1">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLastPageFill0Wght400Grad0Opsz481} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}