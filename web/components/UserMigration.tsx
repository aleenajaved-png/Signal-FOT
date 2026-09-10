"use client";

import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { oIcon } from "@/lib/muiIconSx";

export type MigrateUser = {
  id: string;
  name: string;
  email: string;
  /** When set, user cannot be selected and shows an error affordance. */
  disabledReason?: string;
};

const PAYROLL_NOT_REGISTERED =
  "User is not registered in the new franchise’s payroll system";

export const MIGRATE_USERS_MOCK: MigrateUser[] = [
  { id: "u1", name: "John Doe", email: "john.doe@signal.com", disabledReason: PAYROLL_NOT_REGISTERED },
  { id: "u2", name: "Jane Smith", email: "jane.smith@signal.com" },
  { id: "u3", name: "Alex Rivera", email: "alex.rivera@signal.com" },
  { id: "u4", name: "Maria Chen", email: "maria.chen@signal.com" },
  { id: "u5", name: "Sam Patel", email: "sam.patel@signal.com" },
  { id: "u6", name: "Taylor Brooks", email: "taylor.brooks@signal.com" },
  { id: "u7", name: "Casey Nguyen", email: "casey.nguyen@signal.com" },
  { id: "u8", name: "Riley Morgan", email: "riley.morgan@signal.com" },
  { id: "u9", name: "Jordan Lee", email: "jordan.lee@signal.com" },
  { id: "u10", name: "Avery Kim", email: "avery.kim@signal.com" },
  { id: "u11", name: "Cameron Diaz", email: "cameron.diaz@signal.com" },
  { id: "u12", name: "Quinn Harper", email: "quinn.harper@signal.com" },
  { id: "u13", name: "Blake Foster", email: "blake.foster@signal.com" },
  { id: "u14", name: "Morgan Ellis", email: "morgan.ellis@signal.com" },
  { id: "u15", name: "Reese Parker", email: "reese.parker@signal.com" },
  { id: "u16", name: "Drew Sullivan", email: "drew.sullivan@signal.com" },
  { id: "u17", name: "Jamie Ortega", email: "jamie.ortega@signal.com" },
  { id: "u18", name: "Skyler Bennett", email: "skyler.bennett@signal.com" },
  { id: "u19", name: "Peyton Cruz", email: "peyton.cruz@signal.com" },
  { id: "u20", name: "Hayden Scott", email: "hayden.scott@signal.com" },
  { id: "u21", name: "Finley Adams", email: "finley.adams@signal.com" },
  { id: "u22", name: "Rowan Bailey", email: "rowan.bailey@signal.com" },
  { id: "u23", name: "Emerson Cole", email: "emerson.cole@signal.com" },
  { id: "u24", name: "Sawyer Diaz", email: "sawyer.diaz@signal.com" },
  { id: "u25", name: "Dakota Evans", email: "dakota.evans@signal.com" },
  { id: "u26", name: "Parker Flores", email: "parker.flores@signal.com" },
  { id: "u27", name: "Charlie Grant", email: "charlie.grant@signal.com" },
  { id: "u28", name: "Logan Hayes", email: "logan.hayes@signal.com" },
  { id: "u29", name: "Sydney Irvin", email: "sydney.irvin@signal.com" },
  { id: "u30", name: "Cameron Jones", email: "cameron.jones@signal.com" },
];

function userInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function MigrateUsersControl({
  confirmedIds,
  onOpen,
}: {
  confirmedIds: Set<string>;
  onOpen: () => void;
}) {
  const confirmedUsers = useMemo(
    () => MIGRATE_USERS_MOCK.filter((u) => confirmedIds.has(u.id)),
    [confirmedIds],
  );
  const count = confirmedUsers.length;
  const preview = confirmedUsers.slice(0, 3);
  const overflowUsers = confirmedUsers.slice(3);

  const tooltipSlotProps = {
    popper: {
      sx: { zIndex: 2300 },
    },
    tooltip: {
      sx: {
        bgcolor: "#000",
        color: "#fff",
        fontSize: 12,
        lineHeight: 1.4,
        maxWidth: 280,
        p: 1.25,
      },
    },
  } as const;

  const linkBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "none",
    borderRadius: 2,
    padding: "8px 0",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "Inter, var(--fk), sans-serif",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "20px",
    color: "#0032a0",
  };

  if (count === 0) {
    return (
      <button type="button" onClick={onOpen} aria-pressed={false} style={linkBtnStyle}>
        Migrate users
        <ArrowForwardOutlined sx={oIcon(16, { color: "#0032a0" })} aria-hidden />
      </button>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        {preview.map((u, i) => (
          <Tooltip
            key={u.id}
            enterTouchDelay={0}
            slotProps={tooltipSlotProps}
            title={
              <span style={{ display: "block" }}>
                <span style={{ display: "block", fontWeight: 600 }}>{u.name}</span>
                <span style={{ display: "block", opacity: 0.85 }}>{u.email}</span>
              </span>
            }
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#e8eef8",
                color: "#0032a0",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 600,
                marginLeft: i === 0 ? 0 : -8,
                border: "2px solid #fff",
                boxSizing: "border-box",
                position: "relative",
                zIndex: preview.length - i,
                cursor: "default",
              }}
            >
              {userInitials(u.name)}
            </span>
          </Tooltip>
        ))}
        {count > 3 ? (
          <Tooltip
            enterTouchDelay={0}
            slotProps={tooltipSlotProps}
            title={
              <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {overflowUsers.map((u) => (
                  <span key={u.id} style={{ display: "block" }}>
                    <span style={{ display: "block", fontWeight: 600 }}>{u.name}</span>
                    <span style={{ display: "block", opacity: 0.85 }}>{u.email}</span>
                  </span>
                ))}
              </span>
            }
          >
            <span
              style={{
                marginLeft: 6,
                fontSize: 12,
                fontWeight: 500,
                color: "#6a6a70",
                lineHeight: "18px",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
            >
              +{count - 3} users selected
            </span>
          </Tooltip>
        ) : null}
      </div>
      <span
        aria-hidden
        style={{
          width: 1,
          height: 32,
          alignSelf: "center",
          background: "#d8dadc",
          flexShrink: 0,
        }}
      />
      <button type="button" onClick={onOpen} aria-pressed style={linkBtnStyle}>
        <EditOutlined sx={oIcon(16, { color: "#0032a0" })} aria-hidden />
        Edit selection
      </button>
    </div>
  );
}

export function UserMigrationDrawer({
  open,
  selectedIds,
  search,
  onSearchChange,
  onToggleUser,
  onSelectAll,
  onDeselectAll,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  selectedIds: Set<string>;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleUser: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: (ids: string[]) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MIGRATE_USERS_MOCK;
    return MIGRATE_USERS_MOCK.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [search]);

  const selectableFilteredUsers = useMemo(
    () => filteredUsers.filter((u) => !u.disabledReason),
    [filteredUsers],
  );

  const allFilteredSelected =
    selectableFilteredUsers.length > 0 &&
    selectableFilteredUsers.every((u) => selectedIds.has(u.id));

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(id);
    }
    setEntered(false);
    const t = window.setTimeout(() => setMounted(false), 280);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  const tooltipSlotProps = {
    popper: {
      sx: { zIndex: 2400 },
    },
    tooltip: {
      sx: {
        bgcolor: "#000",
        color: "#fff",
        fontSize: 12,
        lineHeight: 1.4,
        maxWidth: 280,
        p: 1.25,
      },
    },
  } as const;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2200,
        display: "flex",
        justifyContent: "flex-end",
      }}
      role="presentation"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          opacity: entered ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
        onClick={onCancel}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal
        aria-labelledby="user-migration-title"
        style={{
          position: "relative",
          width: "30vw",
          minWidth: 320,
          maxWidth: 480,
          height: "100%",
          background: "#fff",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, var(--fk), sans-serif",
          transform: entered ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #e6e6e7" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <h2
                id="user-migration-title"
                style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#272d37", lineHeight: "24px" }}
              >
                User Migration
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: 12, lineHeight: "18px", color: "#6a6a70" }}>
                Select users you want to migrate from current franchise to the new franchise
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              aria-label="Close"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
            >
              <CloseOutlined sx={oIcon(16, { color: "#444446" })} aria-hidden />
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 0 8px",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              margin: "0 24px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 40,
              padding: "0 12px",
              border: "1px solid #d8dadc",
              borderRadius: 2,
              background: "#fff",
              flexShrink: 0,
            }}
          >
            <SearchOutlined sx={oIcon(16, { color: "#86868b" })} aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search users"
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "Inter, var(--fk), sans-serif",
                fontSize: 13,
                color: "#262527",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 24px 8px",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              disabled={selectableFilteredUsers.length === 0}
              onClick={() => {
                const ids = selectableFilteredUsers.map((u) => u.id);
                if (allFilteredSelected) onDeselectAll(ids);
                else onSelectAll(ids);
              }}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: selectableFilteredUsers.length === 0 ? "default" : "pointer",
                fontFamily: "Inter, var(--fk), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: selectableFilteredUsers.length === 0 ? "#a0a0a5" : "#0032a0",
              }}
            >
              {allFilteredSelected ? "Deselect all" : "Select all"}
            </button>
          </div>
          {filteredUsers.length === 0 ? (
            <div style={{ padding: "24px", fontSize: 13, color: "#86868b" }}>No users found.</div>
          ) : (
            filteredUsers.map((user) => {
              const disabled = Boolean(user.disabledReason);
              const checked = !disabled && selectedIds.has(user.id);
              return (
                <label
                  key={user.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 24px",
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: checked ? "#f5f8ff" : "transparent",
                    opacity: disabled ? 0.72 : 1,
                  }}
                  onClick={(e) => {
                    if (disabled) e.preventDefault();
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: disabled ? "#ececed" : "#e8eef8",
                      color: disabled ? "#86868b" : "#0032a0",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {userInitials(user.name)}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: disabled ? "#86868b" : "#272d37",
                          lineHeight: "20px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.name}
                      </span>
                      {user.disabledReason ? (
                        <Tooltip
                          enterTouchDelay={0}
                          slotProps={tooltipSlotProps}
                          title={user.disabledReason}
                        >
                          <span
                            onClick={(e) => e.preventDefault()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              flexShrink: 0,
                              cursor: "default",
                            }}
                            aria-label={user.disabledReason}
                          >
                            <ErrorOutlineOutlined sx={oIcon(16, { color: "#df372b" })} aria-hidden />
                          </span>
                        </Tooltip>
                      ) : null}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#6a6a70",
                        lineHeight: "18px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => {
                      if (!disabled) onToggleUser(user.id);
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 0,
                      cursor: disabled ? "not-allowed" : "pointer",
                      accentColor: "#0032a0",
                      flexShrink: 0,
                    }}
                  />
                </label>
              );
            })
          )}
        </div>

        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e6e6e7",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              border: "1px solid #e6e6e7",
              borderRadius: 8,
              padding: "8px 18px",
              background: "#fff",
              cursor: "pointer",
              fontFamily: "Inter, var(--fk), sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#272d37",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              background: "#0032a0",
              cursor: "pointer",
              fontFamily: "Inter, var(--fk), sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#fff",
            }}
          >
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}
