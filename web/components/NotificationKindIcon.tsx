"use client";

import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import DonutLargeOutlined from "@mui/icons-material/DonutLargeOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import TimerOutlined from "@mui/icons-material/TimerOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import { oIcon } from "@/lib/muiIconSx";
import type { NotificationKind } from "@/lib/notificationsData";

const KIND_ICON: Record<
  NotificationKind,
  { Icon: typeof WarningAmberOutlined; color: string; boxClass: string }
> = {
  warning: {
    Icon: WarningAmberOutlined,
    color: "#d97706",
    boxClass: "app-notifications-dropdown__icon-box--warning",
  },
  reminder: {
    Icon: TimerOutlined,
    color: "#df372b",
    boxClass: "app-notifications-dropdown__icon-box--reminder",
  },
  info: {
    Icon: InfoOutlined,
    color: "#7c3aed",
    boxClass: "app-notifications-dropdown__icon-box--info",
  },
  error: {
    Icon: ErrorOutlineOutlined,
    color: "#df372b",
    boxClass: "app-notifications-dropdown__icon-box--error",
  },
  success: {
    Icon: CheckCircleOutlined,
    color: "#16a34a",
    boxClass: "app-notifications-dropdown__icon-box--success",
  },
  deal: {
    Icon: DonutLargeOutlined,
    color: "#146dff",
    boxClass: "app-notifications-dropdown__icon-box--deal",
  },
  privacy: {
    Icon: LockOutlined,
    color: "#6a6a70",
    boxClass: "app-notifications-dropdown__icon-box--privacy",
  },
};

export function NotificationKindIcon({ kind, size = 20 }: { kind: NotificationKind; size?: number }) {
  const { Icon, color, boxClass } = KIND_ICON[kind];
  return (
    <span className={`app-notifications-dropdown__icon-box ${boxClass}`} aria-hidden>
      <Icon sx={oIcon(size, { color })} />
    </span>
  );
}
