"use client";

import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NotificationKindIcon } from "@/components/NotificationKindIcon";
import { DROPDOWN_NOTIFICATIONS } from "@/lib/notificationsData";
import { oIcon } from "@/lib/muiIconSx";

const bellIco = 20;

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="app-top-nav__notifications-wrap" ref={rootRef}>
      <button
        type="button"
        className="app-top-nav__notifications"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <NotificationsOutlined sx={oIcon(bellIco, { color: "#444446" })} className="app-top-nav__notifications-svg" />
      </button>

      {open ? (
        <div className="app-notifications-dropdown" role="dialog" aria-label="Notifications">
          <div className="app-notifications-dropdown__header">Notifications</div>
          <ul className="app-notifications-dropdown__list">
            {DROPDOWN_NOTIFICATIONS.map((item) => (
              <li key={item.id}>
                <button type="button" className="app-notifications-dropdown__item">
                  <NotificationKindIcon kind={item.kind} />
                  <span className="app-notifications-dropdown__body">
                    <span className="app-notifications-dropdown__title-row">
                      <span className="app-notifications-dropdown__title">{item.title}</span>
                      <span className="app-notifications-dropdown__time">{item.timestamp}</span>
                    </span>
                    <span className="app-notifications-dropdown__desc">{item.description}</span>
                  </span>
                  <ChevronRightOutlined
                    sx={oIcon(18, { color: "#aeaeb2" })}
                    className="app-notifications-dropdown__chev"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="app-notifications-dropdown__footer">
            <Link
              href="/notifications"
              className="app-notifications-dropdown__view-all"
              onClick={() => setOpen(false)}
            >
              View all notifications
              <ChevronRightOutlined sx={oIcon(16, { color: "#146dff" })} aria-hidden />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
