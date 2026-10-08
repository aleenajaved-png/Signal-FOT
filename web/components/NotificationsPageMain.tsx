"use client";

import AppsOutlined from "@mui/icons-material/AppsOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import Image from "next/image";
import { NotificationKindIcon } from "@/components/NotificationKindIcon";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { FIGMA_APP_NAV } from "@/lib/figma-app-nav-assets";
import { ALL_NOTIFICATIONS } from "@/lib/notificationsData";
import { oIcon } from "@/lib/muiIconSx";

export function NotificationsPageMain() {
  return (
    <div className="notifications-page">
      <header className="notifications-page__header">
        <div className="notifications-page__breadcrumb">
          <AppsOutlined sx={oIcon(16, { color: "#444446" })} aria-hidden />
          <span>Notifications</span>
        </div>

        <div className="notifications-page__header-actions">
          <div className="notifications-page__badges">
            <span className="notifications-page__pill">US Central Time</span>
            <span className="notifications-page__pill">ID: 1234</span>
            <button type="button" className="notifications-page__location">
              #709 Columbus, Georgia
              <KeyboardArrowDownOutlined sx={oIcon(14, { color: "#444446" })} aria-hidden />
            </button>
          </div>

          <div className="notifications-page__icons">
            <NotificationsDropdown />
            <button type="button" className="notifications-page__icon-btn" aria-label="Messages">
              <ChatBubbleOutlineOutlined sx={oIcon(20, { color: "#444446" })} />
            </button>
          </div>

          <div className="notifications-page__profile">
            <Image
              src={FIGMA_APP_NAV.notificationsProfileAvatar}
              alt="Aleena"
              width={32}
              height={32}
              className="notifications-page__avatar"
              unoptimized
            />
            <div className="notifications-page__profile-text">
              <span className="notifications-page__profile-name">Aleena</span>
              <span className="notifications-page__profile-role">Franchise Owner</span>
            </div>
            <KeyboardArrowDownOutlined sx={oIcon(14, { color: "#444446" })} aria-hidden />
          </div>
        </div>
      </header>

      <main className="notifications-page__main">
        <h1 className="notifications-page__title">Notifications</h1>

        <div className="notifications-page__card">
          <ul className="notifications-page__list">
            {ALL_NOTIFICATIONS.map((item) => (
              <li key={item.id}>
                <button type="button" className="notifications-page__row">
                  <NotificationKindIcon kind={item.kind} />
                  <span className="notifications-page__row-body">
                    <span className="notifications-page__row-title">{item.title}</span>
                    <span className="notifications-page__row-desc">{item.description}</span>
                  </span>
                  <span className="notifications-page__row-time">{item.timestamp}</span>
                  <ChevronRightOutlined
                    sx={oIcon(18, { color: "#aeaeb2" })}
                    className="notifications-page__row-chev"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
