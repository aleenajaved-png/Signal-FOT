"use client";

import React, { useState } from "react";
import AppsOutlined from "@mui/icons-material/AppsOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";

// Figma chart/icon assets
const imgChartGroup = "https://www.figma.com/api/mcp/asset/4012ac9c-eac2-4c17-b3eb-750f906d422e";
const imgDonutChart = "https://www.figma.com/api/mcp/asset/f0db4b68-5cab-4c39-b456-b973cb4b0bfa";
const imgAvatar = "https://www.figma.com/api/mcp/asset/19586b31-6e30-4279-91ce-b7715bdfd6ad";
const imgEllipse = "https://www.figma.com/api/mcp/asset/72944e27-2c41-4d9c-a84c-ca248ce3704d";
const imgUserAvatar = "https://www.figma.com/api/mcp/asset/0c004869-9095-44d4-950a-fd7e0019d858";

// Figma sidebar nav assets
const navLogo        = "https://www.figma.com/api/mcp/asset/6911ed2c-8e06-4872-a508-744918437f7d";
const navIcoDashboard= "https://www.figma.com/api/mcp/asset/e32321af-4723-4a07-a89b-241ad16b64bc";
const navIcoMap      = "https://www.figma.com/api/mcp/asset/f4e57d96-1610-4114-a747-d3a6b6cacc16";
const navIcoCodepen  = "https://www.figma.com/api/mcp/asset/297a38a6-1f58-4bc7-bfa9-02ac82651a3f";
const navIcoSites    = "https://www.figma.com/api/mcp/asset/a55c12de-a49b-490e-8bff-3ae313e2bab5";
const navIcoCalendar = "https://www.figma.com/api/mcp/asset/c624cabe-0da2-4d23-af45-ac10d77104b3";
const navIcoGit      = "https://www.figma.com/api/mcp/asset/2fb3e09e-54a0-45d5-ad89-950f96f40b32";
const navIcoDispatch = "https://www.figma.com/api/mcp/asset/f467c5b3-ce53-4fcc-ae8d-60d00b9ee8f5";
const navIcoClipboard= "https://www.figma.com/api/mcp/asset/d1adb37d-a71b-448b-919e-afa22df2d62e";
const navIcoUsers    = "https://www.figma.com/api/mcp/asset/93dc279b-e923-4fed-98c4-55968fff3769";
const navIcoAttend   = "https://www.figma.com/api/mcp/asset/5e39a9f1-5061-4a46-a93d-f56c7542f2b0";
const navIcoPayroll  = "https://www.figma.com/api/mcp/asset/4c0b3155-98df-468a-b59b-17fc91f41924";
const navIcoInvoice  = "https://www.figma.com/api/mcp/asset/1fdfbea0-fffe-4c38-ac40-9f8c57cc84a8";
const navIcoInsights = "https://www.figma.com/api/mcp/asset/e47c8b07-0b3a-44bc-9a6b-538db3813687";
const navIcoLeader   = "https://www.figma.com/api/mcp/asset/a2747743-8e32-4115-96b9-85a2a4c11887";
const navIcoDevices  = "https://www.figma.com/api/mcp/asset/b4366663-e970-44cf-8e70-c7b6632dcde3";
const navIcoCar      = "https://www.figma.com/api/mcp/asset/56b9f2ea-9f7c-43f2-957e-58d3f59458a0";
const navIcoSettings = "https://www.figma.com/api/mcp/asset/a2760ec0-a485-49a9-9016-d29191ad4c78";
const navIcoCollapse = "https://www.figma.com/api/mcp/asset/99f67d3f-0592-4419-9afa-83d550982efc";

// Live dot animation
function LiveDot() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
    </span>
  );
}


export default function FranchiseDashboardPage() {
  const [activeTab, setActiveTab] = useState<"dedicated" | "patrol">("dedicated");
  const [showBanner, setShowBanner] = useState(true);

  const liveOps = [
    { label: "Contract Addendums", value: "0", alert: false },
    { label: "Unassigned Shifts", value: "0", alert: false },
    { label: "Non-functional Sites", value: "0", alert: false },
    { label: "Time off Requests", value: "0", alert: false },
    { label: "Officers on Time-Off", value: "0", alert: false },
    { label: "Officers Absent", value: "0", alert: false },
    { label: "Missed Hits", value: "0", alert: false },
    { label: "Dispatch New Alarms", value: "0", alert: false },
  ];

  const jobsNotStarted: { name: string; avatar: string; jobType: string; site: string; siteIcon: string; time: string }[] = [];

  return (
    <div className="flex h-screen bg-white overflow-hidden font-['Inter',sans-serif]">

      {/* ── Left Navigation Sidebar (Figma: FO Navigation 505:16657) ── */}
      <aside className="relative w-[76px] shrink-0 flex items-start justify-center">
        {/* Dark nav panel */}
        <div className="bg-[#262527] flex flex-col items-center justify-start w-full min-h-screen overflow-clip px-[8px] py-[16px] gap-[16px]">
          {/* Logo */}
          <div className="relative h-[54px] w-[72px] shrink-0">
            <img alt="Signal" className="absolute inset-0 w-full h-full object-contain" src={navLogo} />
          </div>

          {/* Nav items column */}
          <div className="relative flex flex-col items-center justify-center shrink-0">
            {/* Dashboard – active */}
            <button className="bg-[#146dff] flex items-center justify-center p-[12px] rounded-[8px] shrink-0">
              <div className="flex items-start p-[3px] shrink-0">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="" className="absolute inset-0 w-full h-full" src={navIcoDashboard} />
                </div>
              </div>
            </button>
            {/* Signal map */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="relative size-[20px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={navIcoMap} />
              </div>
            </button>
            {/* Codepen */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[8.33%] w-[83.4%] h-[83.4%]" src={navIcoCodepen} />
              </div>
            </button>
            {/* Sites */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="relative size-[20px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={navIcoSites} />
              </div>
            </button>
            {/* Calendar */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[8.33%_12.5%] w-[79.2%] h-[83.4%]" src={navIcoCalendar} />
              </div>
            </button>
            {/* Git pull-request */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[12.5%] w-[75%] h-[75%]" src={navIcoGit} />
              </div>
            </button>
            {/* Dispatch – with red live dot */}
            <button className="bg-[#262527] relative flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[0.78%_10.16%_16.41%_10.16%] w-[79.6%] h-[82.8%]" src={navIcoDispatch} />
              </div>
              {/* Red notification dot */}
              <span className="absolute top-[10px] right-[10px] flex h-[8px] w-[8px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e43f32] opacity-75" />
                <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-[#e43f32]" />
              </span>
            </button>
            {/* Clipboard */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[8.33%_16.67%] w-[66.6%] h-[83.4%]" src={navIcoClipboard} />
              </div>
            </button>
            {/* Users */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[15%_17.5%_12.5%_17.5%] w-[65%] h-[72.5%]" src={navIcoUsers} />
              </div>
            </button>
            {/* Attendance */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[5%_15%_7.5%_15%] w-[70%] h-[87.5%]" src={navIcoAttend} />
              </div>
            </button>
            {/* Payroll */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[12.49%_12.5%_12.51%_12.5%] w-[75%] h-[75%]" src={navIcoPayroll} />
              </div>
            </button>
            {/* Invoice */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[10%_10%_7.65%_15%] w-[75%] h-[82.4%]" src={navIcoInvoice} />
              </div>
            </button>
            {/* Insights */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="relative size-[20px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={navIcoInsights} />
              </div>
            </button>
            {/* Leaderboard */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[13.54%_9.38%_13.54%_9.37%] w-[81.3%] h-[72.9%]" src={navIcoLeader} />
              </div>
            </button>
            {/* Devices */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="relative size-[20px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={navIcoDevices} />
              </div>
            </button>
            {/* Car / Fleet */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[16.67%_12.5%_12.5%_12.5%] w-[75%] h-[70.8%]" src={navIcoCar} />
              </div>
            </button>
            {/* Settings */}
            <button className="bg-[#262527] flex items-center justify-center p-[12px] rounded-[8px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative size-[20px]">
                <img alt="" className="absolute inset-[4.17%] w-[91.7%] h-[91.7%]" src={navIcoSettings} />
              </div>
            </button>
          </div>
        </div>

        {/* Collapse toggle – sticks out to the right at mid-height */}
        <button
          className="absolute right-[-14px] top-[436px] z-10 flex items-center justify-center size-[28px] rotate-180 cursor-pointer"
          aria-label="Collapse navigation"
        >
          <img alt="" className="block w-full h-full" src={navIcoCollapse} />
        </button>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Top Header ── */}
        <header className="bg-white border-b border-[#E6E6E7] h-[60px] flex items-center justify-between px-8 shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <AppsOutlined sx={{ fontSize: 16, color: "#444446" }} />
            <span className="text-[14px] text-[#444446]">Dashboard</span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-5">
            {/* Badges */}
            <div className="flex items-center gap-3">
              <span className="bg-[#E5F6FF] text-[#146DFF] text-[12px] font-medium px-2 py-0.5 rounded-full">US Central Time</span>
              <span className="bg-[#E5F6FF] text-[#146DFF] text-[12px] font-medium px-2 py-0.5 rounded-full">ID: 0205</span>
              <button className="flex items-center gap-2 border border-[#E6E6E7] rounded-lg px-3.5 py-2 text-[14px] text-[#444446] font-medium bg-white hover:bg-gray-50">
                #709 Columbus, NE
                <KeyboardArrowDownOutlined sx={{ fontSize: 14 }} />
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <button className="text-[#444446] hover:text-gray-700">
                <NotificationsOutlined sx={{ fontSize: 20 }} />
              </button>
              <button className="text-[#444446] hover:text-gray-700">
                <ChatBubbleOutlineOutlined sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={imgUserAvatar} alt="Aleena" className="w-8 h-8 rounded-full object-cover" />
              <div className="flex flex-col leading-none">
                <span className="text-[14px] font-medium text-[#444446]">Aleena</span>
                <span className="text-[12px] text-[#86868B]">Franchise Owner</span>
              </div>
              <KeyboardArrowDownOutlined sx={{ fontSize: 14, color: "#444446" }} />
            </div>
          </div>
        </header>

        {/* ── Effective Date Banner ── */}
        {showBanner && (
          <div className="bg-[#FFFBEB] border-b border-[#FDE68A] px-8 py-2.5 flex items-center gap-3 shrink-0">
            <WarningAmberOutlined className="shrink-0" sx={{ fontSize: 18, color: "#D97706" }} />
            <p className="text-[13px] text-[#92400E] leading-5">
              Franchise operations will begin from <span className="font-semibold">Dec 25, 2026</span>.
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="ml-auto shrink-0 text-[#92400E] hover:text-[#78350F] transition-colors"
              aria-label="Dismiss banner"
            >
              <CloseOutlined sx={{ fontSize: 16 }} />
            </button>
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Main scrollable area ── */}
          <main className="flex-1 overflow-y-auto px-8 py-6 min-w-0">

            {/* Welcome + Date Picker */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-[22px] font-bold text-[#262527] leading-[30px]">
                  Hi Aleena, Welcome to Signal dashboard 👋
                </h1>
                <p className="text-[14px] text-[#5B5B5F] mt-1">Below are your franchise's insights</p>
              </div>
              <button className="flex items-center gap-1.5 border border-[#AEAEB2] rounded-lg px-3.5 py-2 text-[14px] text-[#444446] font-medium bg-white hover:bg-gray-50 shrink-0">
                01/14/2024 – 01/18/2024
                <CalendarTodayOutlined sx={{ fontSize: 16 }} />
              </button>
            </div>

            {/* KPI Stats Row */}
            <div className="flex items-center gap-0 border border-[#E6E6E7] rounded-xl bg-white mb-5 divide-x divide-[#E6E6E7]">
              {[
                { dot: "#FF9332", label: "Functional Sites", value: "0" },
                { dot: "#4CAF50", label: "Dedicated Shifts", value: "0" },
                { dot: "#146DFF", label: "Patrol Shifts", value: "0" },
                { dot: "#A142F5", label: "Dispatch Requests", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-1 items-center gap-3 px-5 py-4">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: stat.dot }} />
                  <div>
                    <p className="text-[14px] text-[#86868B] font-medium leading-5">{stat.label}</p>
                    <p className="text-[14px] font-bold text-[#262527] leading-normal">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle section: Total Contracts | Additional Services | Job Efficiency */}
            <div className="flex gap-0 border border-[#E6E6E7] rounded-xl bg-white mb-5 divide-x divide-[#E6E6E7]">

              {/* Total Contracts */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-[14px] font-bold text-[#262527]">Total Contracts</span>
                  <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-4">
                    {[
                      { color: "#146DFF", label: "Active 0%" },
                      { color: "#A9DEFF", label: "Expired 0%" },
                      { color: "#FECDCA", label: "Terminated 0%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-[12px] text-[#5B5B5F] font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-[120px] h-[120px] rounded-full border-[12px] border-[#E6E6E7] flex items-center justify-center shrink-0">
                    <span className="text-[11px] text-[#AEAEB2] font-medium">0</span>
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-[14px] font-bold text-[#262527]">Additional Services</span>
                  <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
                </div>
                {/* Bar chart */}
                <div className="flex items-end gap-8 h-[140px] px-4 pt-2">
                  {/* Y axis labels */}
                  <div className="flex flex-col justify-between h-full text-[10px] text-[#444446] text-right shrink-0 pb-5">
                    {["0","0","0","0","0"].map((v, i) => <span key={i}>{v}</span>)}
                  </div>
                  {/* Bars */}
                  <div className="flex items-end gap-4 flex-1 h-full">
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-[#A9DEFF] w-5 rounded-t" style={{ height: "2px" }} />
                      <span className="text-[12px] text-[#5B5B5F] font-medium">Extra Job</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-[#146DFF] w-5 rounded-t" style={{ height: "2px" }} />
                      <span className="text-[12px] text-[#5B5B5F] font-medium">Dispatch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Efficiency */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-1 mb-5">
                  <span className="text-[14px] font-bold text-[#262527]">Job Efficiency</span>
                  <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
                </div>
                <div className="flex flex-col gap-6">
                  {/* Patrol */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-[#5B5B5F]">Patrol</span>
                    <p className="text-[14px] font-medium text-[#262527]">0% <span className="text-[#5B5B5F]">Completion</span></p>
                    <div className="relative h-2 rounded-full bg-[#F5F5F6] w-full">
                      <div className="absolute left-0 top-0 h-2 rounded-full bg-[#146DFF]" style={{ width: "0%" }} />
                    </div>
                  </div>
                  {/* Dedicated */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-[#5B5B5F]">Dedicated</span>
                    <p className="text-[14px] font-medium text-[#262527]">0% <span className="text-[#5B5B5F]">Completion</span></p>
                    <div className="relative h-2 rounded-full bg-[#F5F5F6] w-full">
                      <div className="absolute left-0 top-0 h-2 rounded-full bg-[#A9DEFF]" style={{ width: "0%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Completion Chart */}
            <div className="border border-[#E6E6E7] rounded-xl bg-white p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-bold text-[#262527]">Job Completion</span>
                  <span className="text-[12px] font-medium text-[#86868B] ml-1">(Last 7 Days)</span>
                  <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
                </div>
                {/* Toggle */}
                <div className="flex items-center border border-[#E6E6E7] rounded-lg p-0.5 bg-white">
                  <button
                    onClick={() => setActiveTab("dedicated")}
                    className={`px-4 py-1 rounded-md text-[14px] font-medium transition-colors ${
                      activeTab === "dedicated" ? "bg-[#146DFF] text-white shadow-sm" : "text-[#6A6A70]"
                    }`}
                  >
                    Dedicated
                  </button>
                  <button
                    onClick={() => setActiveTab("patrol")}
                    className={`px-4 py-1 rounded-md text-[14px] font-medium transition-colors ${
                      activeTab === "patrol" ? "bg-[#146DFF] text-white shadow-sm" : "text-[#6A6A70]"
                    }`}
                  >
                    Patrol
                  </button>
                </div>
              </div>

              {/* Chart area */}
              <div className="relative h-[220px] w-full border border-[#E6E6E7] rounded-lg bg-[#FAFAFA] flex items-end">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-[180px] flex flex-col justify-between text-[10px] text-[#444446] font-medium pl-1">
                  {["0","0","0","0","0"].map((v, i) => <span key={i}>{v}</span>)}
                </div>
                {/* Flat baseline */}
                <div className="absolute bottom-5 left-8 right-2 h-px bg-[#E6E6E7]" />
                <div className="w-full flex items-center justify-center pb-6">
                  <span className="text-[12px] text-[#AEAEB2]">No data available</span>
                </div>
              </div>

              {/* X-axis + legend */}
              <div className="flex items-center justify-between mt-2 px-6">
                <div className="flex items-center gap-8 text-[12px] text-[#5B5B5F] font-medium">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-6 mt-3 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#146DFF]" />
                  <span className="text-[12px] text-[#5B5B5F] font-medium">Completed Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#F4780B]" />
                  <span className="text-[12px] text-[#5B5B5F] font-medium">Missed Hours</span>
                </div>
                <a href="#" className="ml-auto flex items-center gap-1 text-[12px] text-[#146DFF]">
                  Schedule
                  <ArrowForwardOutlined sx={{ fontSize: 16 }} />
                </a>
              </div>
            </div>
          </main>

          {/* ── Right Panel ── */}
          <aside className="w-[304px] shrink-0 border-l border-[#E6E6E7] bg-[rgba(246,246,246,0.6)] overflow-y-auto flex flex-col gap-6 px-5 py-6">

            {/* Live Operations */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <LiveDot />
                <span className="text-[14px] font-bold text-[#262527]">Live Operations</span>
                <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
              </div>

              <div className="flex flex-col gap-4">
                {liveOps.map((op) => (
                  <div key={op.label} className="flex items-center justify-between">
                    <span className="text-[14px] text-[#5B5B5F]">{op.label}</span>
                    <span
                      className="text-[14px] font-bold tracking-[0.25px]"
                      style={{ color: op.alert ? "#B32318" : "#0059FF" }}
                    >
                      {op.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E6E6E7]" />

            {/* Jobs Not Started */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-[#262527]">Jobs Not Started</span>
                  <span className="text-[14px] font-bold text-[#262527]">· 0</span>
                  <InfoOutlined sx={{ fontSize: 16, color: "#AEAEB2" }} />
                </div>
                <a href="#" className="flex items-center gap-1 text-[14px] text-[#146DFF] font-medium">
                  Schedule
                  <ArrowForwardOutlined sx={{ fontSize: 16 }} />
                </a>
              </div>

              <div className="flex flex-col gap-5">
                {jobsNotStarted.length === 0 && (
                  <p className="text-[12px] text-[#AEAEB2] text-center py-2">No jobs</p>
                )}
                {jobsNotStarted.map((job, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col gap-3">
                      {/* Officer row */}
                      <div className="flex items-center gap-1">
                        <img src={job.avatar} alt={job.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                        <span className="flex-1 text-[14px] font-medium text-[#262527] truncate">{job.name}</span>
                        <span className="text-[14px] text-[#444446] shrink-0">{job.jobType}</span>
                      </div>
                      {/* Site row */}
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-[#E6E6E7] flex items-center justify-center text-[10px] shrink-0">
                          {job.siteIcon || <PlaceOutlined sx={{ fontSize: 13, color: "#6A6A70" }} />}
                        </div>
                        <span className="text-[14px] font-medium text-[#262527] truncate">{job.site}</span>
                      </div>
                      {/* Time row */}
                      <div className="flex items-center gap-1.5">
                        <ScheduleOutlined sx={{ fontSize: 16, color: "#6A6A70" }} />
                        <span className="text-[12px] font-medium text-[#262527]">{job.time}</span>
                      </div>
                    </div>
                    {i < jobsNotStarted.length - 1 && <div className="h-px bg-[#E6E6E7]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
