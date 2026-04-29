"use client";

import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import Image from "next/image";
import { oIcon } from "@/lib/muiIconSx";

type ProfileMenuProps = { avatarImageUrl?: string; avatarAlt?: string };

export function ProfileMenu({ avatarImageUrl, avatarAlt = "Profile" }: ProfileMenuProps) {
  return (
    <div className="profile">
      {avatarImageUrl ? (
        <Image
          src={avatarImageUrl}
          alt={avatarAlt}
          width={32}
          height={32}
          className="profile-pic profile-pic--image"
          unoptimized
        />
      ) : (
        <div className="profile-pic">PS</div>
      )}
      <div className="profile-info">
        <span className="profile-name-text">Paul Smith</span>
        <span className="profile-role">Admin</span>
      </div>
      <KeyboardArrowDownOutlined sx={oIcon(14, { color: "#7d899b" })} style={{ marginTop: 4 }} aria-hidden />
    </div>
  );
}
